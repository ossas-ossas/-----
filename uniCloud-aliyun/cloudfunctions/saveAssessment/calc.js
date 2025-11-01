/**
 * 评估计算工具
 * 提供题目加载、统计聚合等功能
 */

const db = uniCloud.database();

/**
 * 根据 qid 数组加载题目数据
 * @param {Array<string>} qids - 题目ID数组
 * @returns {Promise<Array>} 题目文档数组
 */
async function loadQuestionsByQids(qids) {
  if (!Array.isArray(qids) || qids.length === 0) {
    return [];
  }

  try {
    const result = await db.collection('questions_master')
      .where({
        qid: db.command.in(qids),
        enabled: true // 只加载启用的题目
      })
      .get();

    return result.data || [];
  } catch (error) {
    console.error('[loadQuestionsByQids] 错误:', error);
    return [];
  }
}

/**
 * 聚合评估结果
 * @param {Object} answers - 作答数据 { qid: 0|1 }
 * @param {Array} questionDocs - 题目文档数组，每个包含 { qid, domain, subdomain, ageBand, title }
 * @returns {Object} - { domains, ageBands, overall, notAchieved }
 */
function aggregate(answers, questionDocs) {
  const domains = {};
  const ageBands = {};
  const notAchieved = [];
  let total = 0;
  let passed = 0;

  // 创建 qid -> question 映射
  const questionMap = {};
  questionDocs.forEach(q => {
    questionMap[q.qid] = q;
  });

  // 遍历答案进行统计
  Object.keys(answers).forEach(qid => {
    const answer = answers[qid];
    // 只处理 0 或 1 的答案
    if (answer !== 0 && answer !== 1) {
      return;
    }

    const question = questionMap[qid];
    if (!question) {
      // 忽略不存在的题目
      return;
    }

    const isPassed = answer === 1;
    total += 1;
    if (isPassed) {
      passed += 1;
    }

    // 按领域统计
    const domain = question.domain || '未知';
    if (!domains[domain]) {
      domains[domain] = { passed: 0, total: 0 };
    }
    domains[domain].total += 1;
    if (isPassed) {
      domains[domain].passed += 1;
    }

    // 按年龄段统计
    const ageBand = question.ageBand || '未知';
    if (!ageBands[ageBand]) {
      ageBands[ageBand] = { passed: 0, total: 0 };
    }
    ageBands[ageBand].total += 1;
    if (isPassed) {
      ageBands[ageBand].passed += 1;
    }

    // 收集未达标题目（answer === 0）
    // 注意：notAchieved 只在完整统计时生成，草稿保存时不包含
    if (!isPassed) {
      notAchieved.push({
        qid: question.qid || qid,
        domain: domain,
        ageBand: ageBand,
        title: question.title || question.text || ''
      });
    }
  });

  // 计算比例并标准化
  const normalize = (stats) => {
    return Object.fromEntries(
      Object.entries(stats).map(([key, value]) => [
        key,
        {
          passed: value.passed,
          total: value.total,
          ratio: value.total > 0 ? +(value.passed / value.total).toFixed(4) : 0
        }
      ])
    );
  };

  return {
    domains: normalize(domains),
    ageBands: normalize(ageBands),
    overall: {
      passed,
      total,
      ratio: total > 0 ? +(passed / total).toFixed(4) : 0
    },
    notAchieved
  };
}

/**
 * 计算发育等级（新标准：A/B/C）
 * @param {number} scorePercent - 得分百分比 (0-100)
 * @returns {string} - 等级：A/B/C
 */
function calculateLevel(scorePercent) {
  if (scorePercent >= 85) return 'A';
  if (scorePercent >= 70) return 'B';
  return 'C';
}

/**
 * 计算发育等级（旧标准：优秀/良好/正常/需关注/需干预）
 * @param {number} scorePercent - 得分百分比 (0-100)
 * @returns {string} - 等级
 */
function calculateLevelOld(scorePercent) {
  if (scorePercent >= 90) return '优秀';
  if (scorePercent >= 75) return '良好';
  if (scorePercent >= 60) return '正常';
  if (scorePercent >= 40) return '需关注';
  return '需干预';
}

/**
 * 获取柱状图颜色类
 * @param {number} ratio - 完成率 (0-1)
 * @returns {string} - 颜色类名
 */
function getBarColorClass(ratio) {
  if (ratio >= 0.8) return 'bar-excellent';
  if (ratio >= 0.6) return 'bar-good';
  if (ratio >= 0.4) return 'bar-fair';
  return 'bar-poor';
}

module.exports = {
  loadQuestionsByQids,
  aggregate,
  calculateLevel,
  calculateLevelOld,
  getBarColorClass
};

