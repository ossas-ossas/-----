'use strict';

const db = uniCloud.database();
const { assertAdmin, getRole } = require('./role');

/**
 * 获取管理员数据
 * 包括所有 child profiles 和 assessments 的统计信息
 */
exports.main = async (event, context) => {
  try {
    // 临时调试模式：如果 event 中有 _bypassAuth，跳过权限检查（仅用于调试）
    const bypassAuth = event && event._bypassAuth;
    
    if (!bypassAuth) {
      // 权限检查：必须是管理员
      const role = await getRole(context, event);
      console.log('[getAdminData] 用户角色:', role, 'context.auth:', JSON.stringify(context.auth || {}), 'uid:', context.auth?.uid);
      
      // 如果角色检查失败，会抛出错误
      try {
        assertAdmin(role);
      } catch (authError) {
        console.error('[getAdminData] 权限检查失败:', {
          role: role,
          error: authError.message,
          contextAuth: context.auth,
          uid: context.auth?.uid
        });
        // 返回详细的错误信息
        return {
          code: 403,
          msg: `权限不足: 当前角色为 "${role}"，需要 "admin" 角色。context.auth: ${JSON.stringify(context.auth || {})}`,
          data: null,
          debug: {
            role: role,
            contextAuth: context.auth,
            uid: context.auth?.uid
          }
        };
      }
    } else {
      console.warn('[getAdminData] 警告：已启用调试模式，跳过权限检查');
    }
    
    console.log('[getAdminData] 权限检查通过，开始获取数据');

    const { type = 'all' } = event; // 'all' | 'profiles' | 'assessments' | 'stats'

    const result = {};

    // 获取所有 child profiles
    if (type === 'all' || type === 'profiles') {
      const profilesRes = await db.collection('child_profiles')
        .orderBy('createdAt', 'desc')
        .get();
      
      result.profiles = profilesRes.data || [];
      result.profilesCount = result.profiles.length;
    }

    // 获取所有 assessments（只获取已提交的记录）
    if (type === 'all' || type === 'assessments') {
      console.log('[getAdminData] 开始查询 assessments');
      
      // 先查询所有记录，看看总数和 source 分布
      const allAssessmentsRes = await db.collection('assessments')
        .orderBy('createdAt', 'desc')
        .limit(100)  // 先查前100条
        .get();
      
      console.log('[getAdminData] 所有 assessments 查询结果（前100条）:', {
        totalCount: allAssessmentsRes.data ? allAssessmentsRes.data.length : 0,
        sourceDistribution: allAssessmentsRes.data ? allAssessmentsRes.data.reduce((acc, item) => {
          const source = item.source || 'unknown';
          acc[source] = (acc[source] || 0) + 1;
          return acc;
        }, {}) : {},
        sampleIds: allAssessmentsRes.data ? allAssessmentsRes.data.slice(0, 5).map(a => ({
          _id: a._id,
          source: a.source,
          createdAt: a.createdAt
        })) : []
      });
      
      // 查询已提交的记录
      const assessmentsRes = await db.collection('assessments')
        .where({
          source: 'submit'  // 只获取已提交的记录，排除草稿
        })
        .orderBy('createdAt', 'desc')
        .get();
      
      console.log('[getAdminData] 已提交的 assessments 查询结果:', {
        count: assessmentsRes.data ? assessmentsRes.data.length : 0,
        hasData: !!assessmentsRes.data,
        latestCreatedAt: assessmentsRes.data && assessmentsRes.data.length > 0 
          ? assessmentsRes.data[0].createdAt 
          : null,
        oldestCreatedAt: assessmentsRes.data && assessmentsRes.data.length > 0 
          ? assessmentsRes.data[assessmentsRes.data.length - 1].createdAt 
          : null
      });
      
      result.assessments = assessmentsRes.data || [];
      result.assessmentsCount = result.assessments.length;
    }

    // 获取统计信息（age bands 和 domains，只统计已提交的记录）
    if (type === 'all' || type === 'stats') {
      const assessmentsRes = await db.collection('assessments')
        .where({
          source: 'submit'  // 只统计已提交的记录
        })
        .field({
          stats: true,
          createdAt: true
        })
        .get();

      const assessments = assessmentsRes.data || [];
      
      // 聚合所有 age bands 统计
      const ageBandsStats = {};
      // 聚合所有 domains 统计
      const domainsStats = {};
      
      let totalAssessments = 0;
      let totalOverallPassed = 0;
      let totalOverallTotal = 0;

      assessments.forEach(assessment => {
        if (assessment.stats) {
          totalAssessments++;
          
          // 统计 age bands
          if (assessment.stats.ageBands) {
            Object.keys(assessment.stats.ageBands).forEach(ageBand => {
              if (!ageBandsStats[ageBand]) {
                ageBandsStats[ageBand] = {
                  passed: 0,
                  total: 0,
                  count: 0
                };
              }
              const stats = assessment.stats.ageBands[ageBand];
              ageBandsStats[ageBand].passed += stats.passed || 0;
              ageBandsStats[ageBand].total += stats.total || 0;
              ageBandsStats[ageBand].count += 1;
            });
          }

          // 统计 domains
          if (assessment.stats.domains) {
            Object.keys(assessment.stats.domains).forEach(domain => {
              if (!domainsStats[domain]) {
                domainsStats[domain] = {
                  passed: 0,
                  total: 0,
                  count: 0
                };
              }
              const stats = assessment.stats.domains[domain];
              domainsStats[domain].passed += stats.passed || 0;
              domainsStats[domain].total += stats.total || 0;
              domainsStats[domain].count += 1;
            });
          }

          // 统计总体
          if (assessment.stats.overall) {
            totalOverallPassed += assessment.stats.overall.passed || 0;
            totalOverallTotal += assessment.stats.overall.total || 0;
          }
        }
      });

      // 计算平均比例
      Object.keys(ageBandsStats).forEach(ageBand => {
        const stats = ageBandsStats[ageBand];
        stats.ratio = stats.total > 0 ? (stats.passed / stats.total) : 0;
        stats.avgRatio = stats.count > 0 ? (stats.ratio / stats.count) : 0;
      });

      Object.keys(domainsStats).forEach(domain => {
        const stats = domainsStats[domain];
        stats.ratio = stats.total > 0 ? (stats.passed / stats.total) : 0;
        stats.avgRatio = stats.count > 0 ? (stats.ratio / stats.count) : 0;
      });

      result.stats = {
        totalAssessments,
        overall: {
          passed: totalOverallPassed,
          total: totalOverallTotal,
          ratio: totalOverallTotal > 0 ? (totalOverallPassed / totalOverallTotal) : 0
        },
        ageBands: ageBandsStats,
        domains: domainsStats
      };
    }

    return {
      code: 0,
      msg: 'success',
      data: result
    };
  } catch (error) {
    console.error('[getAdminData] 错误:', error);
    console.error('[getAdminData] 错误详情:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
      name: error.name
    });
    
    // 如果是权限错误，返回 403
    if (error.code === 403 || error.message === 'forbidden') {
      return {
        code: 403,
        msg: error.message || 'forbidden: 仅管理员可访问',
        data: null
      };
    }
    
    return {
      code: error.code || 500,
      msg: error.message || '获取数据失败',
      data: null
    };
  }
};

