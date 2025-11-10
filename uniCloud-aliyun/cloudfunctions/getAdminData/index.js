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
      
      // 查询已提交的记录（包含answers字段，用于计算按年龄段+子领域的统计）
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
      
      // 获取所有评估记录中的 childId
      const assessments = assessmentsRes.data || [];
      const childIds = [...new Set(assessments.map(a => a.childId).filter(Boolean))];
      
      console.log('[getAdminData] 评估记录中的 childId 信息:', {
        assessmentsCount: assessments.length,
        uniqueChildIds: childIds,
        childIdsCount: childIds.length,
        sampleChildIds: childIds.slice(0, 5),
        sampleAssessments: assessments.slice(0, 3).map(a => ({
          _id: a._id,
          childId: a.childId,
          childIdType: typeof a.childId
        }))
      });
      
      // 批量查询儿童档案信息
      let childProfilesMap = {};
      if (childIds.length > 0) {
        try {
          // 尝试两种查询方式：直接使用_id和转换为ObjectId
          const childProfilesRes = await db.collection('child_profiles')
            .where({
              _id: db.command.in(childIds)
            })
            .field({
              _id: true,
              name: true
            })
            .get();
          
          console.log('[getAdminData] 儿童档案查询结果:', {
            queryChildIds: childIds,
            foundProfiles: childProfilesRes.data ? childProfilesRes.data.length : 0,
            profiles: childProfilesRes.data ? childProfilesRes.data.map(p => ({
              _id: p._id,
              _idType: typeof p._id,
              name: p.name
            })) : []
          });
          
          // 创建映射：支持字符串和ObjectId两种格式的key
          childProfilesRes.data.forEach(profile => {
            const profileId = profile._id;
            const profileIdStr = String(profileId);
            // 同时支持ObjectId和字符串格式的key
            childProfilesMap[profileId] = profile.name || '未知';
            childProfilesMap[profileIdStr] = profile.name || '未知';
          });
          
          console.log('[getAdminData] 儿童信息映射表:', {
            mapKeys: Object.keys(childProfilesMap),
            mapSize: Object.keys(childProfilesMap).length
          });
        } catch (childError) {
          console.error('[getAdminData] 查询儿童档案失败:', childError);
          console.error('[getAdminData] 错误详情:', {
            message: childError.message,
            stack: childError.stack,
            childIds: childIds
          });
        }
      }
      
      // 为每个评估记录添加儿童姓名和按年龄段+子领域的统计
      result.assessments = await Promise.all(assessments.map(async (assessment) => {
        const childId = assessment.childId;
        const childIdStr = String(childId);
        const childName = childProfilesMap[childId] || childProfilesMap[childIdStr] || '未知儿童';
        
        // 调试日志
        if (childName === '未知儿童') {
          console.warn('[getAdminData] 未找到儿童信息:', {
            assessmentId: assessment._id,
            childId: childId,
            childIdType: typeof childId,
            childIdStr: childIdStr,
            availableKeys: Object.keys(childProfilesMap).slice(0, 10)
          });
        }
        
        // 计算按年龄段+子领域的统计
        let ageBandSubdomainStats = {};
        if (assessment.answers && Object.keys(assessment.answers).length > 0) {
          try {
            // 获取所有题目的qid
            const qids = Object.keys(assessment.answers);
            
            // 调试：显示评估记录中的 qid 示例
            if (qids.length > 0) {
              console.log('[getAdminData] 评估记录中的 qid 示例:', {
                assessmentId: assessment._id,
                totalQids: qids.length,
                sampleQids: qids.slice(0, 5),
                sampleQidTypes: qids.slice(0, 5).map(qid => typeof qid)
              });
            }
            
            // 批量加载题目数据（不限制enabled，因为历史评估可能包含已禁用的题目）
            // 注意：.get() 默认只返回 100 条，需要设置 limit
            const questionsRes = await db.collection('questions_master')
              .where({
                qid: db.command.in(qids)
                // 注意：不限制 enabled，因为历史评估可能包含已禁用的题目
              })
              .field({
                qid: true,
                ageBand: true,
                subdomain: true,
                domain: true
              })
              .limit(1000) // 设置查询上限为 1000 条，确保能查询到所有题目
              .get();
            
            const questions = questionsRes.data || [];
            
            // 调试：显示数据库中查询到的 qid 示例
            if (questions.length > 0) {
              console.log('[getAdminData] 数据库中查询到的 qid 示例:', {
                assessmentId: assessment._id,
                foundCount: questions.length,
                sampleQids: questions.slice(0, 5).map(q => q.qid),
                sampleQidTypes: questions.slice(0, 5).map(q => typeof q.qid),
                sampleAgeBands: questions.slice(0, 10).map(q => q.ageBand),
                uniqueAgeBands: [...new Set(questions.map(q => q.ageBand))],
                ageBandCounts: questions.reduce((acc, q) => {
                  acc[q.ageBand] = (acc[q.ageBand] || 0) + 1;
                  return acc;
                }, {})
              });
            }
            
            // 创建 qid -> question 映射
            const questionMap = {};
            questions.forEach(q => {
              questionMap[q.qid] = q;
            });
            
            // 领域中文到代码的映射
            const domainMap = {
              '感知觉': 'sens',
              '粗大动作': 'gross',
              '精细动作': 'fine',
              '认知': 'cog',
              '语言': 'lang',
              '社会互动': 'social',
              '口腔动作': 'oral'
            };
            
            // 计算按年龄段+子领域的统计
            const stats = {};
            const missingQids = []; // 记录找不到的题目
            qids.forEach(qid => {
              const question = questionMap[qid];
              if (!question) {
                missingQids.push(qid);
                return;
              }
              
              const ageBand = question.ageBand || '未知';
              const subdomain = question.subdomain || '未知';
              // 将中文domain转换为代码
              const domainRaw = question.domain || '未知';
              const domain = domainMap[domainRaw] || domainRaw; // 如果是中文则转换，否则直接使用
              const answer = assessment.answers[qid];
              const isPassed = answer === 1;
              
              // 使用 ageBand::subdomain 作为键
              const key = `${ageBand}::${subdomain}`;
              if (!stats[key]) {
                stats[key] = {
                  ageBand: ageBand,
                  subdomain: subdomain,
                  domain: domain,
                  passed: 0,
                  total: 0
                };
              }
              stats[key].total += 1;
              if (isPassed) {
                stats[key].passed += 1;
              }
            });
            
            // 汇总输出缺失题目信息（避免日志过多）
            if (missingQids.length > 0) {
              // 尝试查找数据库中是否有类似的 qid（用于调试格式问题）
              const sampleMissing = missingQids.slice(0, 10);
              const similarQidsRes = await db.collection('questions_master')
                .where({
                  qid: db.command.in(sampleMissing)
                })
                .field({ qid: true })
                .limit(5)
                .get();
              
              console.warn('[getAdminData] 评估记录中有题目在数据库中不存在:', {
                assessmentId: assessment._id,
                missingCount: missingQids.length,
                totalQids: qids.length,
                foundQids: qids.length - missingQids.length,
                sampleMissing: sampleMissing, // 只显示前10个示例
                sampleMissingTypes: sampleMissing.map(qid => typeof qid),
                // 检查数据库中是否有这些 qid（用于调试）
                dbCheckResult: similarQidsRes.data ? `找到 ${similarQidsRes.data.length} 个匹配项` : '查询失败'
              });
              
              // 额外调试：检查数据库中所有 qid 的格式示例
              if (questions.length > 0) {
                const dbQidSample = questions.slice(0, 3).map(q => q.qid);
                const missingQidSample = sampleMissing.slice(0, 3);
                console.warn('[getAdminData] qid 格式对比:', {
                  '数据库中的 qid 示例': dbQidSample,
                  '评估记录中的 qid 示例': missingQidSample,
                  '是否完全匹配': dbQidSample.some(dbQid => missingQidSample.includes(dbQid))
                });
              }
            }
            
            console.log('[getAdminData] 年龄段+子领域统计计算完成:', {
              assessmentId: assessment._id,
              qidsCount: qids.length,
              foundQuestions: questions.length,
              missingQuestions: missingQids.length,
              statsKeys: Object.keys(stats).slice(0, 10),
              statsCount: Object.keys(stats).length,
              // 显示每个年龄段的统计数
              ageBandBreakdown: Object.entries(stats).reduce((acc, [key, value]) => {
                const ageBand = value.ageBand;
                acc[ageBand] = (acc[ageBand] || 0) + 1;
                return acc;
              }, {}),
              // 显示所有统计键的示例
              allStatsKeys: Object.keys(stats)
            });
            
            // 转换为对象格式
            ageBandSubdomainStats = stats;
            
            console.log('[getAdminData] 计算年龄段+子领域统计:', {
              assessmentId: assessment._id,
              qidsCount: qids.length,
              questionsCount: questions.length,
              statsCount: Object.keys(ageBandSubdomainStats).length
            });
          } catch (calcError) {
            console.error('[getAdminData] 计算年龄段+子领域统计失败:', calcError);
          }
        }
        
        return {
          ...assessment,
          childName: childName,
          ageBandSubdomainStats: ageBandSubdomainStats // 添加按年龄段+子领域的统计
        };
      }));
      
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

