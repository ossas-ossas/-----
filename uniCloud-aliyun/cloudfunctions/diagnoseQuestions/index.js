'use strict';

/**
 * 诊断题目数据
 * 检查数据库中的题目数据，分析 qid 格式、年龄段分布等
 */

const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    console.log('[diagnoseQuestions] ========== 开始诊断 ==========');
    
    // 1. 统计总数
    const totalCount = await db.collection('questions_master').count();
    console.log(`[diagnoseQuestions] 总记录数: ${totalCount.total}`);
    
    // 2. 获取所有题目的 qid 和 ageBand
    const allQuestions = await db.collection('questions_master')
      .field({ _id: true, qid: true, ageBand: true, domain: true, subdomain: true })
      .get();
    
    console.log(`[diagnoseQuestions] 实际加载: ${allQuestions.data.length} 条`);
    
    // 3. 按 ageBand 分组统计
    const ageBandMap = new Map();
    const domainMap = new Map();
    const qidFormatMap = new Map(); // 统计 qid 格式模式
    
    allQuestions.data.forEach(q => {
      // 统计年龄段
      const ageBand = q.ageBand || '未知';
      ageBandMap.set(ageBand, (ageBandMap.get(ageBand) || 0) + 1);
      
      // 统计领域
      const domain = q.domain || '未知';
      domainMap.set(domain, (domainMap.get(domain) || 0) + 1);
      
      // 分析 qid 格式
      if (q.qid) {
        // 检查 qid 格式：是否包含 "-" 分隔符
        const hasDash = q.qid.includes('-');
        const format = hasDash ? '标准格式(含-)' : '非标准格式(不含-)';
        qidFormatMap.set(format, (qidFormatMap.get(format) || 0) + 1);
        
        // 检查是否以年龄段开头
        const ageBandPrefixes = ['1_3m', '3_6m', '6_9m', '9_12m', '12_18m', '18_24m', '24_36m', '36_48m', '48_60m', '60_72m'];
        const startsWithAgeBand = ageBandPrefixes.some(prefix => q.qid.startsWith(prefix));
        if (!startsWithAgeBand) {
          qidFormatMap.set('非标准前缀', (qidFormatMap.get('非标准前缀') || 0) + 1);
        }
      }
    });
    
    // 4. 检查是否有重复的 qid（统计每个 qid 出现的次数）
    const qidMap = new Map(); // qid -> count
    const duplicateQidList = []; // 存储所有重复的 qid（用于显示）
    let totalDuplicateRecords = 0; // 总重复记录数
    
    allQuestions.data.forEach(q => {
      if (q.qid) {
        const currentCount = qidMap.get(q.qid) || 0;
        qidMap.set(q.qid, currentCount + 1);
        
        // 如果这是第二次出现，记录这个 qid
        if (currentCount === 1) {
          duplicateQidList.push(q.qid);
        }
      }
    });
    
    // 计算总重复记录数（每个 qid 的 count - 1 的总和）
    qidMap.forEach((count, qid) => {
      if (count > 1) {
        totalDuplicateRecords += (count - 1);
      }
    });
    
    // 5. 统计唯一 qid 数量
    const uniqueQidCount = qidMap.size;
    
    // 6. 检查 qid 长度分布
    const qidLengthMap = new Map();
    allQuestions.data.forEach(q => {
      if (q.qid) {
        const len = q.qid.length;
        const range = len < 10 ? '短(<10)' : len < 20 ? '中(10-19)' : '长(>=20)';
        qidLengthMap.set(range, (qidLengthMap.get(range) || 0) + 1);
      }
    });
    
    // 7. 采样一些 qid 示例
    const sampleQids = allQuestions.data
      .filter(q => q.qid)
      .slice(0, 20)
      .map(q => q.qid);
    
    // 8. 按年龄段统计详细数据
    const ageBandStats = {};
    ageBandMap.forEach((count, ageBand) => {
      ageBandStats[ageBand] = count;
    });
    
    // 9. 按领域统计详细数据
    const domainStats = {};
    domainMap.forEach((count, domain) => {
      domainStats[domain] = count;
    });
    
    console.log('[diagnoseQuestions] ========== 诊断完成 ==========');
    console.log(`[diagnoseQuestions] 总记录数: ${totalCount.total}`);
    console.log(`[diagnoseQuestions] 唯一 qid 数: ${uniqueQidCount}`);
    console.log(`[diagnoseQuestions] 重复 qid 数: ${duplicateQids.length}`);
    console.log(`[diagnoseQuestions] 年龄段分布:`, ageBandStats);
    console.log(`[diagnoseQuestions] 领域分布:`, domainStats);
    console.log(`[diagnoseQuestions] qid 格式分布:`, Object.fromEntries(qidFormatMap));
    console.log(`[diagnoseQuestions] qid 长度分布:`, Object.fromEntries(qidLengthMap));
    console.log(`[diagnoseQuestions] qid 示例:`, sampleQids);
    
    return {
      success: true,
      summary: {
        total: totalCount.total,
        uniqueQids: uniqueQidCount,
        duplicateQidCount: duplicateQidList.length, // 有多少个 qid 是重复的
        totalDuplicateRecords: totalDuplicateRecords, // 总共有多少条重复记录
        duplicateQidList: duplicateQidList.slice(0, 20) // 只返回前20个重复的 qid
      },
      ageBandStats: ageBandStats,
      domainStats: domainStats,
      qidFormatStats: Object.fromEntries(qidFormatMap),
      qidLengthStats: Object.fromEntries(qidLengthMap),
      sampleQids: sampleQids,
      analysis: {
        hasDuplicates: duplicateQids.length > 0,
        expectedCount: 995, // questionBank.js 中的题目数
        difference: totalCount.total - 995,
        possibleReasons: totalCount.total > 995 ? [
          '可能多次初始化导致数据重复',
          '可能有历史数据或测试数据',
          '可能 qid 格式不一致导致无法识别为重复'
        ] : []
      }
    };
  } catch (error) {
    console.error('[diagnoseQuestions] ========== 诊断异常 ==========');
    console.error('[diagnoseQuestions] 错误:', error);
    console.error('[diagnoseQuestions] 错误堆栈:', error.stack);
    return {
      success: false,
      msg: '诊断失败：' + error.message,
      error: error.message,
      stack: error.stack
    };
  }
};

