'use strict';

/**
 * 清理重复题目数据
 * 对于每个重复的 qid，只保留第一条记录，删除其他重复记录
 */

const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    console.log('[cleanDuplicateQuestions] ========== 开始清理重复题目 ==========');
    
    // 1. 统计当前总数
    const totalCount = await db.collection('questions_master').count();
    console.log(`[cleanDuplicateQuestions] 当前题目总数: ${totalCount.total}`);
    
    // 2. 查找所有重复的 qid（使用更简单的方法：先获取所有数据，然后在内存中分组）
    // 由于 uniCloud 聚合查询语法可能不同，使用更可靠的方法
    console.log('[cleanDuplicateQuestions] 开始加载所有题目数据...');
    const allQuestions = await db.collection('questions_master')
      .field({ _id: true, qid: true }) // 只查询 _id 和 qid，减少数据传输
      .get();
    
    console.log(`[cleanDuplicateQuestions] 加载完成，共 ${allQuestions.data.length} 条记录`);
    
    // 在内存中按 qid 分组，找出重复的
    const qidMap = new Map(); // qid -> [_id1, _id2, ...]
    allQuestions.data.forEach(q => {
      const qid = q.qid;
      if (!qidMap.has(qid)) {
        qidMap.set(qid, []);
      }
      qidMap.get(qid).push(q._id);
    });
    
    // 找出所有重复的 qid（count > 1）
    const duplicateGroups = [];
    let totalDuplicateRecords = 0;
    qidMap.forEach((ids, qid) => {
      if (ids.length > 1) {
        duplicateGroups.push({
          _id: qid,
          count: ids.length,
          ids: ids
        });
        totalDuplicateRecords += (ids.length - 1); // 每个重复组需要删除 count-1 条
      }
    });
    
    const duplicateCount = duplicateGroups.length;
    console.log(`[cleanDuplicateQuestions] 找到 ${duplicateCount} 个重复的 qid，共 ${totalDuplicateRecords} 条重复记录需要删除`);
    
    if (duplicateCount === 0) {
      return {
        success: true,
        msg: '没有发现重复题目',
        total: totalCount.total,
        deleted: 0,
        remaining: totalCount.total
      };
    }
    
    // 3. 统计需要删除的总数
    let totalToDelete = 0;
    duplicateGroups.forEach(group => {
      totalToDelete += (group.count - 1); // 每个重复组保留1条，删除 count-1 条
    });
    console.log(`[cleanDuplicateQuestions] 预计删除 ${totalToDelete} 条重复记录`);
    
    // 4. 分批删除重复记录（避免一次删除太多）
    let totalDeleted = 0;
    const batchSize = 100; // 每批处理100个重复组
    
    for (let i = 0; i < duplicateGroups.length; i += batchSize) {
      const batch = duplicateGroups.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(duplicateGroups.length / batchSize);
      
      console.log(`[cleanDuplicateQuestions] 处理批次 ${batchNum}/${totalBatches}，数量: ${batch.length}`);
      
      for (const group of batch) {
        const ids = group.ids;
        // 保留第一条（第一个 _id），删除其他的
        const idsToDelete = ids.slice(1);
        
        if (idsToDelete.length > 0) {
          try {
            const deleteResult = await db.collection('questions_master')
              .where({
                _id: db.command.in(idsToDelete)
              })
              .remove();
            
            const deleted = deleteResult.deleted || 0;
            totalDeleted += deleted;
            console.log(`[cleanDuplicateQuestions] qid ${group._id}: 删除 ${deleted} 条重复记录（共 ${group.count} 条）`);
          } catch (error) {
            console.error(`[cleanDuplicateQuestions] 删除失败 (qid: ${group._id}):`, error);
          }
        }
      }
      
      // 短暂延迟，避免请求过快
      if (i + batchSize < duplicateGroups.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    // 5. 统计清理后的总数
    const finalCount = await db.collection('questions_master').count();
    
    // 6. 统计唯一 qid 数量（使用 Map 统计）
    const uniqueQidSet = new Set();
    const remainingQuestions = await db.collection('questions_master')
      .field({ qid: true })
      .get();
    
    remainingQuestions.data.forEach(q => {
      if (q.qid) {
        uniqueQidSet.add(q.qid);
      }
    });
    
    const uniqueCount = uniqueQidSet.size;
    
    console.log('[cleanDuplicateQuestions] ========== 清理完成 ==========');
    console.log(`[cleanDuplicateQuestions] 清理前: ${totalCount.total} 条`);
    console.log(`[cleanDuplicateQuestions] 删除: ${totalDeleted} 条重复记录`);
    console.log(`[cleanDuplicateQuestions] 清理后: ${finalCount.total} 条`);
    console.log(`[cleanDuplicateQuestions] 唯一 qid 数量: ${uniqueCount} 条`);
    
    return {
      success: true,
      msg: `清理完成：删除了 ${totalDeleted} 条重复记录，剩余 ${finalCount.total} 条（唯一 qid: ${uniqueCount}）`,
      before: totalCount.total,
      deleted: totalDeleted,
      remaining: finalCount.total,
      uniqueQids: uniqueCount,
      duplicateGroups: duplicateCount
    };
  } catch (error) {
    console.error('[cleanDuplicateQuestions] ========== 清理异常 ==========');
    console.error('[cleanDuplicateQuestions] 错误:', error);
    console.error('[cleanDuplicateQuestions] 错误堆栈:', error.stack);
    return {
      success: false,
      msg: '清理失败：' + error.message,
      error: error.message,
      stack: error.stack
    };
  }
};

