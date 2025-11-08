'use strict';

/**
 * 初始化题目数据到 questions_master 集合
 * 从 common/questionBank.js 导入题目数据
 * 
 * 注意：此云函数需要管理员权限，建议在首次部署时运行一次
 */

const db = uniCloud.database();

// 题目数据（从 questionBank.js 复制，格式：{ id, text, domain, subdomain, ageBandKey }）
// 注意：这里只包含部分示例，实际使用时需要导入完整的题目数据
const questionsData = [
  // 示例：1-3个月题目
  { id: '1_3m-OSV-001', text: '视力为0.1,可见30公分内距离的物体,注视距离为1.5米', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m' },
  { id: '1_3m-OSV-002', text: '会注视看30公分对他讲话的人脸', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m' },
  // ... 更多题目数据需要从 questionBank.js 导入
];

/**
 * 将前端题目数据转换为数据库格式
 * @param {Array} questions - 前端题目数组
 * @returns {Array} 数据库格式的题目数组
 */
function convertQuestionsToDbFormat(questions) {
  const now = Date.now();
  return questions.map((q, index) => ({
    qid: q.id, // 使用 id 作为 qid
    domain: q.domain || '未知',
    subdomain: q.subdomain || '',
    ageBand: q.ageBandKey || q.ageBand || '未知',
    title: q.text || q.title || '', // 使用 text 作为 title
    text: q.text || '', // 题目详细内容
    weight: q.weight || 1,
    enabled: q.enabled !== false, // 默认启用
    order: q.order || index,
    createdAt: now,
    updatedAt: now
  }));
}

/**
 * 批量检查已存在的题目（分批查询，避免参数过多）
 * @param {Array<string>} qids - 题目ID数组
 * @returns {Promise<Set<string>>} 已存在的题目ID集合
 */
async function checkExistingQuestions(qids) {
  const existingQidSet = new Set();
  const checkBatchSize = 200; // 每次检查200个，避免查询参数过多
  
  for (let i = 0; i < qids.length; i += checkBatchSize) {
    const batch = qids.slice(i, i + checkBatchSize);
    try {
      const result = await db.collection('questions_master')
        .where({
          qid: db.command.in(batch)
        })
        .field({ qid: true }) // 只查询 qid 字段，提高性能
        .get();
      
      result.data.forEach(q => existingQidSet.add(q.qid));
      console.log(`[initQuestions] 检查批次 ${Math.floor(i / checkBatchSize) + 1}，已存在: ${result.data.length}/${batch.length}`);
    } catch (error) {
      console.error(`[initQuestions] 检查批次失败:`, error);
      // 检查失败时，假设都不存在，继续插入（可能会因为重复而失败，但会在插入时处理）
    }
  }
  
  return existingQidSet;
}

/**
 * 批量插入题目数据（改进版：更好的错误处理和重试机制）
 * @param {Array} questions - 题目数组
 * @returns {Promise<Object>} 插入结果
 */
async function batchInsertQuestions(questions) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return { success: false, msg: '题目数据为空' };
  }

  try {
    // 转换为数据库格式
    const dbQuestions = convertQuestionsToDbFormat(questions);
    console.log(`[initQuestions] 转换完成，共 ${dbQuestions.length} 条题目`);
    
    // 检查是否已存在题目（分批检查）
    const existingQids = dbQuestions.map(q => q.qid);
    console.log(`[initQuestions] 开始检查已存在的题目...`);
    const existingQidSet = await checkExistingQuestions(existingQids);
    console.log(`[initQuestions] 检查完成，已存在 ${existingQidSet.size} 条题目`);
    
    // 过滤出需要插入的新题目
    const newQuestions = dbQuestions.filter(q => !existingQidSet.has(q.qid));
    console.log(`[initQuestions] 需要插入的新题目: ${newQuestions.length} 条`);
    
    if (newQuestions.length === 0) {
      return {
        success: true,
        msg: '所有题目已存在，无需插入',
        total: dbQuestions.length,
        existing: existingQidSet.size,
        inserted: 0,
        failed: 0
      };
    }
    
    // 批量插入（每次最多200条，避免单次插入过多导致超时）
    const batchSize = 200;
    let insertedCount = 0;
    let errorCount = 0;
    const failedBatches = [];
    
    for (let i = 0; i < newQuestions.length; i += batchSize) {
      const batch = newQuestions.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(newQuestions.length / batchSize);
      
      try {
        // 尝试插入批次
        const result = await db.collection('questions_master').add(batch);
        
        // 验证插入结果
        if (result && result.ids && result.ids.length === batch.length) {
          insertedCount += batch.length;
          console.log(`[initQuestions] 批次 ${batchNum}/${totalBatches} 插入成功，数量: ${batch.length}`);
        } else {
          // 插入结果异常，尝试逐条插入
          console.warn(`[initQuestions] 批次 ${batchNum} 插入结果异常，尝试逐条插入`);
          for (const question of batch) {
            try {
              await db.collection('questions_master').add(question);
              insertedCount++;
            } catch (singleError) {
              // 如果是重复错误，忽略；其他错误记录
              if (!singleError.message || !singleError.message.includes('duplicate')) {
                console.error(`[initQuestions] 单条插入失败 (qid: ${question.qid}):`, singleError);
                errorCount++;
                failedBatches.push({ qid: question.qid, error: singleError.message });
              } else {
                // 重复插入，算作已存在
                insertedCount++;
                existingQidSet.add(question.qid);
              }
            }
          }
        }
      } catch (batchError) {
        console.error(`[initQuestions] 批次 ${batchNum} 插入失败:`, batchError);
        
        // 如果是重复错误，尝试逐条插入以找出哪些是重复的
        if (batchError.message && batchError.message.includes('duplicate')) {
          console.log(`[initQuestions] 批次 ${batchNum} 检测到重复，尝试逐条插入`);
          for (const question of batch) {
            try {
              await db.collection('questions_master').add(question);
              insertedCount++;
            } catch (singleError) {
              if (!singleError.message || !singleError.message.includes('duplicate')) {
                console.error(`[initQuestions] 单条插入失败 (qid: ${question.qid}):`, singleError);
                errorCount++;
                failedBatches.push({ qid: question.qid, error: singleError.message });
              } else {
                // 重复，算作已存在
                existingQidSet.add(question.qid);
              }
            }
          }
        } else {
          // 其他错误，记录整个批次失败
          errorCount += batch.length;
          failedBatches.push({ 
            batch: batchNum, 
            count: batch.length, 
            error: batchError.message || String(batchError) 
          });
        }
      }
    }
    
    // 最终统计
    const finalExisting = existingQidSet.size;
    const finalInserted = insertedCount;
    const finalFailed = errorCount;
    
    console.log(`[initQuestions] 初始化完成统计:`, {
      总数: dbQuestions.length,
      已存在: finalExisting,
      新插入: finalInserted,
      失败: finalFailed
    });
    
    return {
      success: true,
      msg: `初始化完成：插入 ${finalInserted} 条，已存在 ${finalExisting} 条，失败 ${finalFailed} 条`,
      total: dbQuestions.length,
      existing: finalExisting,
      inserted: finalInserted,
      failed: finalFailed,
      failedBatches: failedBatches.length > 0 ? failedBatches.slice(0, 10) : [] // 只返回前10个失败记录
    };
  } catch (error) {
    console.error('[initQuestions] 插入失败:', error);
    return {
      success: false,
      msg: '插入失败：' + error.message,
      error: error
    };
  }
}

exports.main = async (event, context) => {
  // 检查权限（可选：只允许管理员调用）
  // const uid = (context.auth && context.auth.uid) || context.uid;
  // if (!uid) {
  //   return { success: false, msg: '需要登录' };
  // }
  
  try {
    // 从 event 中获取题目数据，如果没有则使用默认数据
    const questions = event.questions || questionsData;
    
    if (!Array.isArray(questions) || questions.length === 0) {
      return {
        success: false,
        msg: '请提供题目数据数组'
      };
    }
    
    console.log(`[initQuestions] ========== 开始初始化 ==========`);
    console.log(`[initQuestions] 接收到的题目数量: ${questions.length}`);
    
    // 验证题目数据格式
    const invalidQuestions = questions.filter(q => !q.id || !q.text);
    if (invalidQuestions.length > 0) {
      console.warn(`[initQuestions] 发现 ${invalidQuestions.length} 条无效题目（缺少 id 或 text）`);
      console.warn(`[initQuestions] 无效题目示例:`, invalidQuestions.slice(0, 3));
    }
    
    // 检查是否有重复的 id
    const qidMap = new Map();
    const duplicateQids = [];
    questions.forEach((q, index) => {
      if (q.id) {
        if (qidMap.has(q.id)) {
          duplicateQids.push({ qid: q.id, indices: [qidMap.get(q.id), index] });
        } else {
          qidMap.set(q.id, index);
        }
      }
    });
    
    if (duplicateQids.length > 0) {
      console.warn(`[initQuestions] 发现 ${duplicateQids.length} 个重复的题目ID`);
      console.warn(`[initQuestions] 重复ID示例:`, duplicateQids.slice(0, 5));
    }
    
    const result = await batchInsertQuestions(questions);
    
    console.log('[initQuestions] ========== 初始化完成 ==========');
    console.log('[initQuestions] 最终结果:', JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.error('[initQuestions] ========== 初始化异常 ==========');
    console.error('[initQuestions] 错误:', error);
    console.error('[initQuestions] 错误堆栈:', error.stack);
    return {
      success: false,
      msg: '初始化失败：' + error.message,
      error: error.message,
      stack: error.stack
    };
  }
};

