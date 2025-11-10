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
 * @returns {Object} - { domains, subdomains, ageBands, overall, notAchieved }
 */
function aggregate(answers, questionDocs) {
  const domains = {};
  const subdomains = {}; // 添加子领域统计
  const ageBands = {};
  const notAchieved = [];
  let total = 0;
  let passed = 0;

  // 创建 qid -> question 映射
  const questionMap = {};
  questionDocs.forEach(q => {
    questionMap[q.qid] = q;
  });

  // **重要修改**：统计所有题目，而不仅仅是答案中的题目
  // 这样可以确保所有领域和年龄段都被统计，即使没有答案
  questionDocs.forEach(question => {
    const qid = question.qid;
    const answer = answers[qid];
    
    // 对于没有答案的题目，默认为 0（未完成）
    const answerValue = (answer === 0 || answer === 1) ? answer : 0;
    const isPassed = answerValue === 1;
    
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

    // 按子领域统计（按 domain + subdomain 组合）
    const subdomain = question.subdomain || '未知';
    const subdomainKey = `${domain}::${subdomain}`; // 使用 domain::subdomain 作为键
    if (!subdomains[subdomainKey]) {
      subdomains[subdomainKey] = { 
        passed: 0, 
        total: 0,
        domain: domain,
        subdomain: subdomain
      };
    }
    subdomains[subdomainKey].total += 1;
    if (isPassed) {
      subdomains[subdomainKey].passed += 1;
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

    // 收集未达标题目（answer === 0 或没有答案）
    if (!isPassed) {
      notAchieved.push({
        qid: question.qid || qid,
        domain: domain,
        subdomain: subdomain,
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
          ratio: value.total > 0 ? +(value.passed / value.total).toFixed(4) : 0,
          // 保留 domain 和 subdomain 信息（如果存在）
          ...(value.domain && { domain: value.domain }),
          ...(value.subdomain && { subdomain: value.subdomain })
        }
      ])
    );
  };

  return {
    domains: normalize(domains),
    subdomains: normalize(subdomains), // 添加子领域统计
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
 * 计算发育等级（符合数据库 schema：优秀/良好/正常/需关注/需干预）
 * @param {number} scorePercent - 得分百分比 (0-100)
 * @returns {string} - 等级
 */
function calculateLevel(scorePercent) {
  if (scorePercent >= 90) return '优秀';
  if (scorePercent >= 75) return '良好';
  if (scorePercent >= 60) return '正常';
  if (scorePercent >= 40) return '需关注';
  return '需干预';
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

