/**
 * 评分聚合工具
 * 用于计算评估结果的统计信息
 */

/**
 * 聚合评估结果
 * @param {Array} questions - 题目数组，每个题目包含 { qid, domain, subdomain, ageBand }
 * @param {Object} answers - 作答数据 { qid: 0|1 }
 * @returns {Object} - 聚合统计结果
 */
function aggregate(questions, answers) {
  const domains = {};
  const subdomains = {}; // 新增：子领域统计
  const ageBands = {};
  let total = 0;
  let passed = 0;

  // 遍历所有题目进行统计
  for (const q of questions) {
    const ok = answers[q.qid] === 1; // 1=已完成，0=未完成
    total += 1;
    if (ok) passed += 1;

    // 按领域统计
    const d = q.domain;
    if (!domains[d]) {
      domains[d] = { passed: 0, total: 0 };
    }
    domains[d].total++;
    if (ok) domains[d].passed++;

    // 按年龄段统计
    const a = q.ageBand;
    if (!ageBands[a]) {
      ageBands[a] = { passed: 0, total: 0 };
    }
    ageBands[a].total++;
    if (ok) ageBands[a].passed++;

    // 按子领域统计（用于柱状图展示）
    const subdomain = q.subdomain || '未分类';
    if (!subdomains[d]) {
      subdomains[d] = {};
    }
    if (!subdomains[d][subdomain]) {
      subdomains[d][subdomain] = { passed: 0, total: 0 };
    }
    subdomains[d][subdomain].total++;
    if (ok) subdomains[d][subdomain].passed++;
  }

  // 标准化：计算比例并保留4位小数
  const norm = (m) =>
    Object.fromEntries(
      Object.entries(m).map(([k, v]) => [
        k,
        {
          passed: v.passed,
          total: v.total,
          ratio: v.total ? +(v.passed / v.total).toFixed(4) : 0
        }
      ])
    );

  // 标准化子领域统计（包含在 domains 中）
  const normSubdomains = {};
  Object.keys(subdomains).forEach(domain => {
    normSubdomains[domain] = norm(subdomains[domain]);
  });

  // 合并 domain 统计和 subdomain 统计
  const domainStats = norm(domains);
  Object.keys(normSubdomains).forEach(domain => {
    if (domainStats[domain]) {
      domainStats[domain].subdomains = normSubdomains[domain];
    }
  });

  // 计算总体得分百分比
  const scorePercent = total ? Math.round((passed / total) * 100) : 0;

  return {
    stats: {
      domains: domainStats,
      ageBands: norm(ageBands),
      overall: {
        passed,
        total,
        ratio: total ? +(passed / total).toFixed(4) : 0
      }
    },
    scorePercent
  };
}

/**
 * 计算发育等级
 * @param {number} scorePercent - 得分百分比 (0-100)
 * @returns {string} - 等级：优秀/良好/正常/需关注/需干预
 */
function calculateLevel(scorePercent) {
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
  aggregate,
  calculateLevel,
  getBarColorClass
};


