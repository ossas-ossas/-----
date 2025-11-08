'use strict';

/**
 * 清空所有题目数据
 * 警告：此操作会删除所有题目，不可恢复！
 * 建议在重新初始化之前使用
 */

const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    console.log('[clearAllQuestions] ========== 开始清空所有题目 ==========');
    
    // 1. 统计当前总数
    const totalCount = await db.collection('questions_master').count();
    console.log(`[clearAllQuestions] 当前题目总数: ${totalCount.total}`);
    
    if (totalCount.total === 0) {
      return {
        success: true,
        msg: '数据库已经是空的，无需清空',
        deleted: 0
      };
    }
    
    // 2. 删除所有记录
    // 注意：uniCloud 的 remove 操作需要 where 条件
    // 由于需要删除所有记录，我们分批删除，每次删除一批
    let totalDeleted = 0;
    const batchSize = 500; // 每批删除 500 条
    
    while (true) {
      // 获取一批记录的 _id
      const batch = await db.collection('questions_master')
        .limit(batchSize)
        .field({ _id: true })
        .get();
      
      if (!batch.data || batch.data.length === 0) {
        break; // 没有更多记录了
      }
      
      const ids = batch.data.map(q => q._id);
      
      // 删除这批记录
      const deleteResult = await db.collection('questions_master')
        .where({
          _id: db.command.in(ids)
        })
        .remove();
      
      const deleted = deleteResult.deleted || 0;
      totalDeleted += deleted;
      
      console.log(`[clearAllQuestions] 已删除 ${totalDeleted} 条记录...`);
      
      // 如果删除的数量少于批次大小，说明已经删除完了
      if (deleted < batchSize) {
        break;
      }
      
      // 短暂延迟，避免请求过快
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('[clearAllQuestions] ========== 清空完成 ==========');
    console.log(`[clearAllQuestions] 删除了 ${totalDeleted} 条记录`);
    
    // 3. 验证是否清空成功
    const verifyCount = await db.collection('questions_master').count();
    
    return {
      success: true,
      msg: `清空完成：删除了 ${totalDeleted} 条记录，剩余 ${verifyCount.total} 条`,
      deleted: totalDeleted,
      remaining: verifyCount.total
    };
  } catch (error) {
    console.error('[clearAllQuestions] ========== 清空异常 ==========');
    console.error('[clearAllQuestions] 错误:', error);
    console.error('[clearAllQuestions] 错误堆栈:', error.stack);
    return {
      success: false,
      msg: '清空失败：' + error.message,
      error: error.message,
      stack: error.stack
    };
  }
};

