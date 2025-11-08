'use strict';

const db = uniCloud.database();
const { loadQuestionsByQids, aggregate } = require('./calc.js');

// 尝试导入 jsonwebtoken 模块（如果可用）
let jwt = null;
try {
  jwt = require('jsonwebtoken');
} catch (e) {
  console.warn('[saveAssessment] jsonwebtoken 模块不可用，将使用手动解析');
}

// 尝试导入 uni-id-common（如果可用）
let uniIdCommon = null;
try {
  uniIdCommon = uniCloud.importObject('uni-id-co');
} catch (e) {
  console.warn('[saveAssessment] 无法导入 uni-id-co，尝试手动解析 token');
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
      console.warn('[saveAssessment] uni-id-co 验证失败:', e.message);
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
        console.warn('[saveAssessment] 无法获取 tokenSecret，使用默认值');
      }

      const decoded = jwt.verify(token, tokenSecret);
      if (decoded && decoded.uid) {
        return decoded.uid;
      }
    } catch (e) {
      console.warn('[saveAssessment] jsonwebtoken 验证失败:', e.message);
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
        console.error('[saveAssessment] Token 已过期:', { exp: payload.exp, now });
        return null;
      }
      
      if (payload.uid) {
        return payload.uid;
      }
    }
  } catch (e) {
    console.error('[saveAssessment] 手动解析 token 失败:', e);
  }

  return null;
}

/**
 * 保存评估草稿（Upsert）
 * 
 * 输入参数：
 * - childId: 儿童档案ID（必填）
 * - answers: 作答数据 { qid: 0|1 }（必填）
 * 
 * 注意：需要用户已登录，uid 从 context.auth.uid 获取
 * 
 * 行为：
 * - 计算最小统计信息（passed/total per domain/ageBand）
 * - 对每个 childId，upsert 一条 source='draft' 的记录
 * - 更新 updatedAt = now
 * 
 * 返回：
 * - ok: true
 * - childId: 儿童档案ID
 * - stats.overall.ratio: 总体完成率
 */
exports.main = async (event, context) => {
  // 强制登录验证
  // 优先从 context 获取 uid（uniCloud 自动解析）
  let uid = (context.auth && context.auth.uid) || context.uid;
  
  // 如果 context 中没有 uid，则尝试从前端 token 解析
  if (!uid) {
    const token = (event && event.uniIdToken) || (event && event.args && event.args.uniIdToken);
    
    if (token) {
      console.log('[saveAssessment] 尝试从 token 解析 uid');
      try {
        uid = await parseTokenToUid(token);
        if (uid) {
          console.log('[saveAssessment] Token 解析成功，uid:', uid);
        } else {
          console.error('[saveAssessment] Token 解析失败或已过期');
          return { 
            code: 30202, 
            msg: '登录已失效，请重新登录' 
          };
        }
      } catch (e) {
        console.error('[saveAssessment] Token 验证出错:', e);
        return { 
          code: 30202, 
          msg: '登录已失效，请重新登录' 
        };
      }
    }
  }
  
  if (!uid) {
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

    // 5. 加载题目数据
    console.log('[saveAssessment] 加载题目，答案数量:', answerKeys.length, '答案键示例:', answerKeys.slice(0, 5));
    const questions = await loadQuestionsByQids(answerKeys);
    console.log('[saveAssessment] 找到题目数量:', questions.length);
    if (questions.length === 0) {
      console.error('[saveAssessment] 未找到题目数据，可能原因：1.数据库中无对应qid 2.qid格式不匹配');
      console.error('[saveAssessment] 答案键示例（前10个）:', answerKeys.slice(0, 10));
      return {
        ok: false,
        code: 404,
        msg: `未找到对应的题目数据，答案数量：${answerKeys.length}，请检查题目ID是否正确`
      };
    }

    // 6. 过滤有效答案（只处理实际存在的题目）
    const validAnswers = {};
    const missingQuestions = [];
    answerKeys.forEach(qid => {
      const question = questions.find(q => q.qid === qid);
      if (question) {
        const value = answers[qid];
        // 确保答案为 0 或 1
        if (value === 0 || value === 1) {
          validAnswers[qid] = value;
        } else {
          console.warn(`[saveAssessment] 答案值无效: qid=${qid}, value=${value}`);
        }
      } else {
        missingQuestions.push(qid);
      }
    });

    if (missingQuestions.length > 0) {
      console.warn(`[saveAssessment] 未找到题目数量: ${missingQuestions.length}，示例:`, missingQuestions.slice(0, 5));
    }

    if (Object.keys(validAnswers).length === 0) {
      console.error('[saveAssessment] 没有有效答案数据', {
        totalAnswers: answerKeys.length,
        foundQuestions: questions.length,
        missingQuestions: missingQuestions.length
      });
      return {
        ok: false,
        code: 400,
        msg: `没有有效的答案数据（有效：${Object.keys(validAnswers).length}/${answerKeys.length}）`
      };
    }

    // 7. 计算最小统计信息
    const stats = aggregate(validAnswers, questions);

    // 8. 准备草稿数据
    const now = Date.now();
    const draftData = {
      childId: String(childId),
      ownerUid: uid,
      answers: validAnswers,
      stats: {
        domains: stats.domains,
        ageBands: stats.ageBands,
        overall: stats.overall
      },
      source: 'draft',
      updatedAt: now
    };

    // 9. 查找现有草稿（需要同时匹配 ownerUid 和 childId，避免跨用户冲突）
    const existingDraft = await db.collection('assessments')
      .where({
        childId: String(childId),
        ownerUid: uid,
        source: 'draft'
      })
      .get();

    let result;
    try {
      if (existingDraft.data && existingDraft.data.length > 0) {
        // 检查数据是否真的变化了（减少不必要的更新）
        const existingAnswers = existingDraft.data[0].answers || {};
        const newAnswers = draftData.answers || {};
        const existingAnswersStr = JSON.stringify(existingAnswers);
        const newAnswersStr = JSON.stringify(newAnswers);
        
        if (existingAnswersStr === newAnswersStr) {
          // 答案未变化，不需要更新数据库
          console.log('[saveAssessment] 答案未变化，跳过数据库更新');
          return {
            ok: true,
            childId: String(childId),
            stats: {
              overall: {
                ratio: stats.overall.ratio
              }
            },
            skipped: true // 标记为跳过更新
          };
        }
        
        // 更新现有草稿
        const draftId = existingDraft.data[0]._id;
        console.log('[saveAssessment] 更新现有草稿，ID:', draftId);
        await db.collection('assessments')
          .doc(draftId)
          .update(draftData);

        result = {
          id: draftId,
          isNew: false
        };
      } else {
        // 创建新草稿（确保包含 createdAt，这是 required 字段）
        draftData.createdAt = now;
        console.log('[saveAssessment] 创建新草稿，数据字段:', Object.keys(draftData));
        const insertResult = await db.collection('assessments').add(draftData);
        if (!insertResult || !insertResult.id) {
          throw new Error('数据库插入失败：未返回记录ID');
        }
        result = {
          id: insertResult.id,
          isNew: true
        };
      }
    } catch (dbError) {
      console.error('[saveAssessment] 数据库写入失败:', dbError);
      console.error('[saveAssessment] 尝试写入的数据摘要:', {
        childId: draftData.childId,
        ownerUid: draftData.ownerUid,
        answersCount: Object.keys(draftData.answers).length,
        hasCreatedAt: !!draftData.createdAt
      });
      return {
        ok: false,
        code: 500,
        msg: '数据库写入失败：' + (dbError.message || String(dbError))
      };
    }

    console.log('[saveAssessment] 成功保存草稿', {
      childId,
      assessmentId: result.id,
      isNew: result.isNew,
      ratio: stats.overall.ratio
    });

    return {
      ok: true,
      childId: String(childId),
      stats: {
        overall: {
          ratio: stats.overall.ratio
        }
      }
    };

  } catch (err) {
    console.error('[saveAssessment] 错误:', err);
    return {
      ok: false,
      code: 500,
      msg: '服务器内部错误',
      error: err.message
    };
  }
};
