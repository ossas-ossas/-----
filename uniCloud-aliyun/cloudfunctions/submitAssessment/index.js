'use strict';

const db = uniCloud.database();
const { loadQuestionsByQids, aggregate, calculateLevel } = require('./calc.js');

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
  const uid = context.auth && context.auth.uid;
  if (!uid) {
    return { 
      code: 'NOT_LOGIN', 
      message: '未登录，请先登录' 
    };
  }

  try {
    // 1. 参数校验
    const { childId, answers } = event || {};

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
    console.log('[submitAssessment] 加载题目，答案数量:', answerKeys.length, '答案键示例:', answerKeys.slice(0, 5));
    const questions = await loadQuestionsByQids(answerKeys);
    console.log('[submitAssessment] 找到题目数量:', questions.length);
    if (questions.length === 0) {
      console.error('[submitAssessment] 未找到题目数据，可能原因：1.数据库中无对应qid 2.qid格式不匹配');
      console.error('[submitAssessment] 答案键示例（前10个）:', answerKeys.slice(0, 10));
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
          console.warn(`[submitAssessment] 答案值无效: qid=${qid}, value=${value}`);
        }
      } else {
        missingQuestions.push(qid);
      }
    });

    if (missingQuestions.length > 0) {
      console.warn(`[submitAssessment] 未找到题目数量: ${missingQuestions.length}，示例:`, missingQuestions.slice(0, 5));
    }

    if (Object.keys(validAnswers).length === 0) {
      console.error('[submitAssessment] 没有有效答案数据', {
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
