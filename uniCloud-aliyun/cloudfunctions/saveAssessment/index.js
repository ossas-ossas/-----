'use strict';

const db = uniCloud.database();
const { aggregate, calculateLevel } = require('../common/calc.js');

/**
 * 保存评估结果
 * 
 * 输入参数：
 * - childId: 儿童档案ID（必填）
 * - answers: 作答数据 { qid: 0|1 }（必填）
 * - createdByUid: 创建者UID（可选）
 * 
 * 返回：
 * - code: 0 成功
 * - id: 评估记录 _id
 */
exports.main = async (event, context) => {
  try {
    // 1. 参数校验
    const { childId, answers, createdByUid } = event || {};

    if (!childId) {
      return { code: 400, msg: '缺少参数: childId' };
    }

    if (!answers || typeof answers !== 'object') {
      return { code: 400, msg: '缺少参数: answers' };
    }

    // 2. 获取所有答题的 qid
    const qids = Object.keys(answers);
    if (qids.length === 0) {
      return { code: 400, msg: 'answers 不能为空' };
    }

    // 3. 从 questions_master 查询题目信息
    const questionsResult = await db.collection('questions_master')
      .where({
        qid: db.command.in(qids)
      })
      .get();

    const questions = questionsResult.data || [];
    
    if (questions.length === 0) {
      return { code: 404, msg: '未找到对应的题目数据' };
    }

    // 创建 qid -> question 的映射
    const questionMap = {};
    questions.forEach(q => {
      questionMap[q.qid] = q;
    });

    // 4. 过滤有效答案（只处理实际存在的题目）
    const validAnswers = {};
    qids.forEach(qid => {
      if (questionMap[qid]) {
        const value = answers[qid];
        // 确保答案为 0 或 1
        if (value === 0 || value === 1) {
          validAnswers[qid] = value;
        }
      }
      // 忽略未知 qid
    });

    if (Object.keys(validAnswers).length === 0) {
      return { code: 400, msg: '没有有效的答案数据' };
    }

    // 5. 使用 calc.aggregate 计算统计信息
    const result = aggregate(questions, validAnswers);

    // 6. 生成 notAchieved（未达标项目）
    const notAchieved = [];
    Object.keys(validAnswers).forEach(qid => {
      if (validAnswers[qid] === 0) {
        const question = questionMap[qid];
        if (question) {
          notAchieved.push({
            qid: question.qid || qid,
            domain: question.domain || '未知',
            subdomain: question.subdomain || '未分类',
            ageBand: question.ageBand || '未知',
            title: question.title || question.text || ''
          });
        }
      }
    });

    // 7. 计算发育等级
    const level = calculateLevel(result.scorePercent);

    // 8. 获取当前用户 UID（从 context 或参数）
    const uid = context.APPID ? 
      (createdByUid || (context.CLIENTIP ? 'anonymous' : '')) : 
      createdByUid || '';

    // 9. 准备写入数据
    const assessmentData = {
      childId: String(childId),
      answers: validAnswers,
      stats: result.stats,
      notAchieved: notAchieved,
      scorePercent: result.scorePercent,
      level: level,
      createdAt: Date.now(),
      createdByUid: uid
    };

    // 10. 写入 assessments 集合
    const insertResult = await db.collection('assessments').add(assessmentData);

    console.log('[saveAssessment] 成功保存评估结果', {
      childId,
      scorePercent: result.scorePercent,
      level,
      assessmentId: insertResult.id
    });

    return {
      code: 0,
      msg: 'success',
      data: {
        id: insertResult.id,
        childId: childId,
        scorePercent: result.scorePercent,
        level: level,
        totalQuestions: result.stats.overall.total,
        passedQuestions: result.stats.overall.passed
      }
    };

  } catch (err) {
    console.error('[saveAssessment] 错误:', err);
    return {
      code: 500,
      msg: '服务器内部错误',
      error: err.message
    };
  }
};

