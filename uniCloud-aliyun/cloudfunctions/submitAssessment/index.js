'use strict';

const db = uniCloud.database();
const { loadQuestionsByQids, aggregate, calculateLevel } = require('./calc.js');

// 尝试导入 jsonwebtoken 模块（如果可用）
let jwt = null;
try {
  jwt = require('jsonwebtoken');
} catch (e) {
  console.warn('[submitAssessment] jsonwebtoken 模块不可用，将使用手动解析');
}

// 尝试导入 uni-id-common（如果可用）
let uniIdCommon = null;
try {
  uniIdCommon = uniCloud.importObject('uni-id-co');
} catch (e) {
  console.warn('[submitAssessment] 无法导入 uni-id-co，尝试手动解析 token');
}

/**
 * 从 token 中解析 uid（增强版，支持多种方式）
 * @param {string} token - JWT token
 * @returns {string|null} - 用户ID，解析失败返回 null
 */
async function parseTokenToUid(token) {
  if (!token || typeof token !== 'string') {
    return null;
  }

  // 方法1：尝试使用 uni-id-co 验证（最可靠）
  if (uniIdCommon) {
    try {
      const payload = await uniIdCommon.checkToken(token);
      if (payload && payload.uid && !payload.errCode) {
        return payload.uid;
      }
    } catch (e) {
      console.warn('[submitAssessment] uni-id-co 验证失败:', e.message);
    }
  }

  // 方法2：尝试使用 jsonwebtoken 模块验证
  if (jwt) {
    try {
      let tokenSecret = 'dev_token_secret_change_me_please';
      try {
        const createConfig = require('uni-config-center');
        const uniIdConfig = createConfig({ pluginId: 'uni-id' });
        tokenSecret = uniIdConfig.config('tokenSecret') || tokenSecret;
      } catch (e) {
        console.warn('[submitAssessment] 无法获取 tokenSecret，使用默认值');
      }

      const decoded = jwt.verify(token, tokenSecret);
      if (decoded && decoded.uid) {
        return decoded.uid;
      }
    } catch (e) {
      console.warn('[submitAssessment] jsonwebtoken 验证失败:', e.message);
    }
  }

  // 方法3：手动解析 JWT token（兜底方案）
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payloadJson = Buffer.from(parts[1], 'base64').toString('utf-8');
      const payload = JSON.parse(payloadJson);
      const now = Math.floor(Date.now() / 1000);
      
      if (payload.exp && payload.exp <= now) {
        console.error('[submitAssessment] Token 已过期:', { exp: payload.exp, now });
        return null;
      }
      
      if (payload.uid) {
        return payload.uid;
      }
    }
  } catch (e) {
    console.error('[submitAssessment] 手动解析 token 失败:', e);
  }

  return null;
}

/**
 * 提交评估（最终提交）
 * 
 * 输入参数：
 * - childId: 儿童档案ID（必填）
 * - answers: 作答数据 { qid: 0|1 }（必填）
 * 
 * 注意：需要用户已登录，uid 从 context.auth.uid 获取
 * 
 * 行为：
 * - 重新计算完整统计信息：
 *   - domains / ageBands / overall
 *   - notAchieved 数组 = 所有 answer=0 的题目，包含 qid, domain, ageBand, title
 * - scorePercent = Math.round(overall.ratio * 100)
 * - level 映射：
 *   - >=85 -> 'A'
 *   - 70-84 -> 'B'
 *   - else -> 'C'
 * - 写入新记录（不覆盖草稿）source='submit', createdAt = now
 * 
 * 返回：
 * - ok: true
 * - assessmentId: 评估记录ID
 * - scorePercent: 得分百分比
 * - level: 发育等级
 */
exports.main = async (event, context) => {
  // 强制登录验证
  // 优先从 context 获取 uid（uniCloud 自动解析）
  let uid = (context.auth && context.auth.uid) || context.uid;
  
  // 如果 context 中没有 uid，则尝试从前端 token 解析
  if (!uid) {
    const token = (event && event.uniIdToken) || (event && event.args && event.args.uniIdToken);
    
    if (token) {
      console.log('[submitAssessment] 尝试从 token 解析 uid');
      try {
        uid = await parseTokenToUid(token);
        if (uid) {
          console.log('[submitAssessment] Token 解析成功，uid:', uid);
        } else {
          console.error('[submitAssessment] Token 解析失败或已过期');
          return { 
            code: 30202, 
            msg: '登录已失效，请重新登录' 
          };
        }
      } catch (e) {
        console.error('[submitAssessment] Token 验证出错:', e);
        return { 
          code: 30202, 
          msg: '登录已失效，请重新登录' 
        };
      }
    }
  }
  
  if (!uid) {
    console.error('[submitAssessment] 未登录，context:', {
      auth: context.auth,
      uid: context.uid
    });
    return { 
      code: 30202, 
      msg: '未登录或 token 无效' 
    };
  }

  try {
    // 1. 参数校验
    // 注意：参数可能在 event 或 event.args 中（取决于调用方式）
    const eventData = event.args || event;
    const { childId, answers } = eventData || {};

    if (!childId) {
      return {
        ok: false,
        code: 400,
        msg: '缺少参数: childId'
      };
    }

    if (!answers || typeof answers !== 'object') {
      return {
        ok: false,
        code: 400,
        msg: '缺少参数: answers'
      };
    }

    // 4. 负载大小校验（answers keys <= 1500）
    const answerKeys = Object.keys(answers);
    if (answerKeys.length > 1500) {
      return {
        ok: false,
        code: 400,
        msg: '答案数量超过限制（最多1500题）'
      };
    }

    // 5. 获取儿童信息，根据出生日期计算年龄段
    let childAgeBand = null;
    try {
      const childProfile = await db.collection('child_profiles')
        .doc(childId)
        .field({ birthDate: true, ageBand: true })
        .get();
      
      if (childProfile.data && childProfile.data.length > 0) {
        const profile = childProfile.data[0];
        
        // 优先使用已有的 ageBand 字段
        if (profile.ageBand) {
          childAgeBand = profile.ageBand;
        } else if (profile.birthDate) {
          // 根据出生日期计算年龄段
          const birthDate = new Date(profile.birthDate);
          const now = new Date();
          const ageMonths = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24 * 30));
          
          // 根据月龄确定年龄段（与 questionBank.js 中的定义一致）
          if (ageMonths >= 60) childAgeBand = '60_72m';
          else if (ageMonths >= 48) childAgeBand = '48_60m';
          else if (ageMonths >= 36) childAgeBand = '36_48m';
          else if (ageMonths >= 30) childAgeBand = '30_36m';
          else if (ageMonths >= 24) childAgeBand = '24_30m';
          else if (ageMonths >= 18) childAgeBand = '18_24m';
          else if (ageMonths >= 12) childAgeBand = '12_18m';
          else if (ageMonths >= 9) childAgeBand = '9_12m';
          else if (ageMonths >= 6) childAgeBand = '6_9m';
          else if (ageMonths >= 3) childAgeBand = '3_6m';
          else childAgeBand = '1_3m';
        }
        
        console.log('[submitAssessment] 儿童年龄段:', childAgeBand);
      }
    } catch (childError) {
      console.warn('[submitAssessment] 获取儿童信息失败:', childError);
    }
    
    // 6. 加载题目数据
    console.log('[submitAssessment] 加载题目，答案数量:', answerKeys.length);
    console.log('[submitAssessment] 答案键示例（前10个）:', answerKeys.slice(0, 10));
    
    // 先检查数据库中是否有题目数据
    try {
      const totalQuestionsCount = await db.collection('questions_master')
        .where({ enabled: true })
        .count();
      console.log('[submitAssessment] 数据库中启用的题目总数:', totalQuestionsCount.total);
      
      if (totalQuestionsCount.total === 0) {
        console.error('[submitAssessment] 数据库中没有任何题目数据，需要初始化题目数据');
        return {
          ok: false,
          code: 500,
          msg: '数据库中没有任何题目数据，请联系管理员初始化题目数据'
        };
      }
    } catch (countError) {
      console.warn('[submitAssessment] 检查题目总数失败:', countError);
    }
    
    // **重要修改**：始终加载所有启用的题目（不论年龄段）
    // 这样可以确保统计包含所有领域和年龄段，题目总数应为995题
    let questions = [];
    try {
      // 始终加载所有启用的题目，不按年龄段过滤
      // 注意：uniCloud 的 .get() 默认最多返回 100 条，需要显式设置 limit
      const allQuestionsResult = await db.collection('questions_master')
        .where({ enabled: true })
        .limit(1000) // 设置足够大的 limit 以获取所有995题
        .get();
      questions = allQuestionsResult.data || [];
      console.log(`[submitAssessment] 加载所有启用的题目，数量:`, questions.length);
      
      // 验证题目数量（应为995题）
      const expectedCount = 995;
      if (questions.length !== expectedCount) {
        console.warn(`[submitAssessment] 题目数量不匹配！期望: ${expectedCount}，实际: ${questions.length}`);
        if (questions.length === 0) {
          throw new Error('未找到任何启用的题目');
        }
      } else {
        console.log(`[submitAssessment] 题目数量验证通过: ${questions.length}题`);
      }
    } catch (allQuestionsError) {
      console.warn('[submitAssessment] 加载所有题目失败，回退到按答案加载:', allQuestionsError);
      // 回退到原来的方式
      questions = await loadQuestionsByQids(answerKeys);
      if (questions.length === 0) {
        throw allQuestionsError;
      }
    }
    
    console.log('[submitAssessment] 最终找到题目数量:', questions.length);
    
    // 如果找到的题目数量为0，记录详细信息
    if (questions.length === 0) {
      console.error('[submitAssessment] 未找到题目数据，可能原因：1.数据库中无对应qid 2.qid格式不匹配');
      console.error('[submitAssessment] 答案键示例（前20个）:', answerKeys.slice(0, 20));
      
      // 尝试查询数据库中的一些题目，看看格式是否匹配
      try {
        const sampleQuestions = await db.collection('questions_master')
          .where({ enabled: true })
          .limit(5)
          .get();
        console.log('[submitAssessment] 数据库中的题目示例（前5个）:', 
          sampleQuestions.data.map(q => ({ qid: q.qid, domain: q.domain, ageBand: q.ageBand }))
        );
      } catch (e) {
        console.warn('[submitAssessment] 查询示例题目失败:', e);
      }
      
      return {
        ok: false,
        code: 404,
        msg: `未找到对应的题目数据，答案数量：${answerKeys.length}。可能原因：1.题目数据未初始化 2.题目ID格式不匹配。请检查题目数据是否正确导入数据库。`
      };
    }

    // 6. 过滤有效答案（只处理实际存在的题目）
    const validAnswers = {};
    const missingQuestions = [];
    const invalidAnswers = [];
    
    answerKeys.forEach(qid => {
      const question = questions.find(q => q.qid === qid);
      if (question) {
        const value = answers[qid];
        // 确保答案为 0 或 1
        if (value === 0 || value === 1) {
          validAnswers[qid] = value;
        } else {
          invalidAnswers.push({ qid, value });
          console.warn(`[submitAssessment] 答案值无效: qid=${qid}, value=${value} (类型: ${typeof value})`);
        }
      } else {
        missingQuestions.push(qid);
      }
    });

    // 记录详细信息
    if (missingQuestions.length > 0) {
      console.warn(`[submitAssessment] 未找到题目数量: ${missingQuestions.length}/${answerKeys.length}`);
      console.warn(`[submitAssessment] 未找到的题目ID示例（前10个）:`, missingQuestions.slice(0, 10));
      
      // 检查是否是因为 qid 格式问题
      const foundQids = questions.map(q => q.qid);
      const sampleFoundQid = foundQids[0];
      const sampleMissingQid = missingQuestions[0];
      if (sampleFoundQid && sampleMissingQid) {
        console.warn(`[submitAssessment] 格式对比 - 找到的qid示例: "${sampleFoundQid}", 缺失的qid示例: "${sampleMissingQid}"`);
      }
    }
    
    if (invalidAnswers.length > 0) {
      console.warn(`[submitAssessment] 无效答案数量: ${invalidAnswers.length}，示例:`, invalidAnswers.slice(0, 5));
    }

    // 如果有效答案太少，返回错误
    const validRatio = Object.keys(validAnswers).length / answerKeys.length;
    if (Object.keys(validAnswers).length === 0) {
      console.error('[submitAssessment] 没有有效答案数据', {
        totalAnswers: answerKeys.length,
        foundQuestions: questions.length,
        missingQuestions: missingQuestions.length,
        invalidAnswers: invalidAnswers.length
      });
      return {
        ok: false,
        code: 400,
        msg: `没有有效的答案数据（有效：${Object.keys(validAnswers).length}/${answerKeys.length}，缺失：${missingQuestions.length}，无效值：${invalidAnswers.length}）`
      };
    }
    
    // 如果有效答案比例太低，给出警告但继续处理
    if (validRatio < 0.5) {
      console.warn(`[submitAssessment] 有效答案比例较低: ${(validRatio * 100).toFixed(1)}% (${Object.keys(validAnswers).length}/${answerKeys.length})`);
    }
    
    console.log(`[submitAssessment] 有效答案统计: 总数=${answerKeys.length}, 有效=${Object.keys(validAnswers).length}, 缺失=${missingQuestions.length}, 无效值=${invalidAnswers.length}`);

    // 7. 重新计算完整统计信息
    const stats = aggregate(validAnswers, questions);

    // 8. 计算得分百分比
    const scorePercent = Math.round(stats.overall.ratio * 100);

    // 9. 计算发育等级（符合数据库 schema：优秀/良好/正常/需关注/需干预）
    const level = calculateLevel(scorePercent);

    // 10. 准备提交数据
    const now = Date.now();
    const submitData = {
      childId: String(childId),
      ownerUid: uid,
      answers: validAnswers,
      stats: {
        domains: stats.domains,
        ageBands: stats.ageBands,
        overall: stats.overall
      },
      notAchieved: stats.notAchieved, // 包含 qid, domain, ageBand, title
      scorePercent: scorePercent,
      level: level,
      source: 'submit',
      createdAt: now,
      updatedAt: now
    };

    // 11. 写入新记录（不覆盖草稿）
    console.log('[submitAssessment] 准备写入数据库，数据字段:', Object.keys(submitData));
    let insertResult;
    try {
      insertResult = await db.collection('assessments').add(submitData);
      if (!insertResult || !insertResult.id) {
        throw new Error('数据库插入失败：未返回记录ID');
      }
    } catch (dbError) {
      console.error('[submitAssessment] 数据库写入失败:', dbError);
      console.error('[submitAssessment] 尝试写入的数据摘要:', {
        childId: submitData.childId,
        ownerUid: submitData.ownerUid,
        answersCount: Object.keys(submitData.answers).length,
        scorePercent: submitData.scorePercent,
        level: submitData.level
      });
      return {
        ok: false,
        code: 500,
        msg: '数据库写入失败：' + (dbError.message || String(dbError))
      };
    }

    console.log('[submitAssessment] 成功提交评估', {
      childId,
      assessmentId: insertResult.id,
      scorePercent,
      level,
      totalQuestions: stats.overall.total,
      passedQuestions: stats.overall.passed,
      notAchievedCount: stats.notAchieved.length
    });

    return {
      ok: true,
      assessmentId: insertResult.id,
      scorePercent: scorePercent,
      level: level
    };

  } catch (err) {
    console.error('[submitAssessment] 错误:', err);
    return {
      ok: false,
      code: 500,
      msg: '服务器内部错误',
      error: err.message
    };
  }
};
