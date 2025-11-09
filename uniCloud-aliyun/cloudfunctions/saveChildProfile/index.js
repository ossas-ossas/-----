'use strict';

const db = uniCloud.database();

// 尝试导入 jsonwebtoken 模块（如果可用）
let jwt = null;
try {
  jwt = require('jsonwebtoken');
} catch (e) {
  // jsonwebtoken 模块不可用，将使用手动解析方式
  console.warn('[saveChildProfile] jsonwebtoken 模块不可用，将使用手动解析');
}

// 尝试导入 uni-id-common（如果可用）
let uniIdCommon = null;
try {
  uniIdCommon = uniCloud.importObject('uni-id-co');
} catch (e) {
  console.warn('[saveChildProfile] 无法导入 uni-id-co，尝试手动解析 token');
}

/**
 * 从 token 中解析 uid（增强版，支持多种方式）
 * @param {string} token - JWT token
 * @returns {string|null} - 用户ID，解析失败返回 null
 */
async function parseTokenToUid(token) {
  if (!token || typeof token !== 'string') {
    return null;
  }

  // 方法1：尝试使用 uni-id-co 验证（最可靠）
  if (uniIdCommon) {
    try {
      const payload = await uniIdCommon.checkToken(token);
      if (payload && payload.uid && !payload.errCode) {
        return payload.uid;
      }
    } catch (e) {
      console.warn('[saveChildProfile] uni-id-co 验证失败:', e.message);
    }
  }

  // 方法2：尝试使用 jsonwebtoken 模块验证
  if (jwt) {
    try {
      // 尝试从 uni-config-center 获取 tokenSecret
      let tokenSecret = 'dev_token_secret_change_me_please'; // 默认值
      try {
        const createConfig = require('uni-config-center');
        const uniIdConfig = createConfig({ pluginId: 'uni-id' });
        tokenSecret = uniIdConfig.config('tokenSecret') || tokenSecret;
      } catch (e) {
        // 如果获取配置失败，使用默认值
        console.warn('[saveChildProfile] 无法获取 tokenSecret，使用默认值');
      }

      const decoded = jwt.verify(token, tokenSecret);
      if (decoded && decoded.uid) {
        return decoded.uid;
      }
    } catch (e) {
      console.warn('[saveChildProfile] jsonwebtoken 验证失败:', e.message);
    }
  }

  // 方法3：手动解析 JWT token（兜底方案）
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payloadJson = Buffer.from(parts[1], 'base64').toString('utf-8');
      const payload = JSON.parse(payloadJson);
      const now = Math.floor(Date.now() / 1000);
      
      // 检查是否过期
      if (payload.exp && payload.exp <= now) {
        console.error('[saveChildProfile] Token 已过期:', { exp: payload.exp, now });
        return null;
      }
      
      if (payload.uid) {
        return payload.uid;
      }
    }
  } catch (e) {
    console.error('[saveChildProfile] 手动解析 token 失败:', e);
  }

  return null;
}

/**
 * 保存或更新儿童档案
 * 
 * 输入参数：
 * - name: 儿童姓名（必填）
 * - gender: 性别 male/female（必填）
 * - birthDate: 出生日期 YYYY-MM-DD（必填）
 * 
 * 注意：需要用户已登录，uid 从 context.auth.uid 获取
 * - diagnosis: 医疗诊断数组（可选）
 * - habits: 行为习惯对象（可选）
 * - vision: 视觉障碍信息（可选）
 * - hearing: 听觉障碍信息（可选）
 * - epilepsy: 癫痫症（可选）
 * - caregiver: 主要照顾者（可选）
 * - phone: 联系电话（可选）
 * - homeGuide: 居家辅导需求（可选）
 * - notes: 备注信息（可选）
 * - childId: 儿童档案ID（可选，如果提供则更新，否则创建新档案）
 * 
 * 返回：
 * - code: 0 成功
 * - data.id: 儿童档案 _id
 */
exports.main = async (event, context) => {
  // 强制登录验证
  // 优先从 context 获取 uid（uniCloud 自动解析）
  let uid = (context.auth && context.auth.uid) || context.uid;
  
  // 如果 context 中没有 uid，则尝试从前端 token 解析
  if (!uid) {
    const token = (event && event.uniIdToken) || (event && event.args && event.args.uniIdToken);
    
    if (token) {
      console.log('[saveChildProfile] 尝试从 token 解析 uid');
      try {
        uid = await parseTokenToUid(token);
        if (uid) {
          console.log('[saveChildProfile] Token 解析成功，uid:', uid);
        } else {
          console.error('[saveChildProfile] Token 解析失败或已过期');
          return { 
            code: 30202, 
            msg: '登录已失效，请重新登录' 
          };
        }
      } catch (e) {
        console.error('[saveChildProfile] Token 验证出错:', e);
        return { 
          code: 30202, 
          msg: '登录已失效，请重新登录' 
        };
      }
    }
  }
  
  console.log('[saveChildProfile] 登录验证:', {
    hasContextAuth: !!context.auth,
    authUid: context.auth?.uid,
    contextUid: context.uid,
    hasEventToken: !!(event?.uniIdToken || event?.args?.uniIdToken),
    tokenLocation: event?.uniIdToken ? 'event.uniIdToken' : (event?.args?.uniIdToken ? 'event.args.uniIdToken' : 'none'),
    finalUid: uid,
    contextKeys: Object.keys(context || {})
  });
  
  if (!uid) {
    console.error('[saveChildProfile] 未登录，context:', {
      auth: context.auth,
      uid: context.uid,
      hasToken: !!event?.uniIdToken,
      allKeys: Object.keys(context || {})
    });
    return { 
      code: 30202, 
      msg: '未登录或 token 无效' 
    };
  }

  try {
    // 1. 参数校验
    // 注意：参数可能在 event 或 event.args 中（取决于调用方式）
    const eventData = event.args || event;
    const {
      name,
      gender,
      birthDate,
      diagnosis,
      habits,
      vision,
      hearing,
      epilepsy,
      caregiver,
      phone,
      homeGuide,
      notes,
      childId
    } = eventData || {};

    // 必填字段校验
    if (!name || !gender || !birthDate) {
      return {
        code: 400,
        msg: '缺少必填字段: name, gender, birthDate'
      };
    }

    // 2. 准备数据
    const now = Date.now();
    const profileData = {
      name: String(name).trim(),
      gender: gender,
      birthDate: String(birthDate).trim(),
      ownerUid: uid,
      updatedAt: now
    };

    // 可选字段
    if (diagnosis && Array.isArray(diagnosis)) {
      profileData.diagnosis = diagnosis;
    }

    if (habits && typeof habits === 'object') {
      profileData.habits = {
        walkTime: habits.walkTime || habits.walkingTime || '',
        crawl: habits.crawl || habits.crawlStatus || '',
        crawlMonths: habits.crawlMonths || '',
        kneel: habits.kneel || habits.kneelWalk || null,
        hand: habits.hand || habits.handedness || ''
      };
    }

    if (vision && typeof vision === 'object') {
      profileData.vision = {
        status: vision.status || 'normal',
        sub: Array.isArray(vision.sub) ? vision.sub : []
      };
    }

    if (hearing && typeof hearing === 'object') {
      profileData.hearing = {
        status: hearing.status || 'normal',
        dbLeft: hearing.dbLeft || '',
        dbRight: hearing.dbRight || ''
      };
    }

    if (epilepsy) {
      profileData.epilepsy = epilepsy;
    }

    if (caregiver) {
      profileData.caregiver = caregiver;
    }

    if (phone) {
      profileData.phone = String(phone).trim();
    }

    if (homeGuide !== undefined && homeGuide !== null) {
      profileData.homeGuide = Boolean(homeGuide);
    }

    if (notes) {
      profileData.notes = String(notes).trim();
    }

    let result;

    // 3. 判断是新增还是更新
    if (childId) {
      // 更新现有档案
      console.log('[saveChildProfile] 更新现有档案，childId:', childId);
      try {
        // 检查数据大小（避免数据过大导致写入失败）
        const updateData = {
          ...profileData,
          updatedAt: now
        };
        const dataSize = JSON.stringify(updateData).length;
        if (dataSize > 1000000) { // 1MB
          console.warn('[saveChildProfile] 更新数据较大:', dataSize, 'bytes');
        }
        
        const updateResult = await db.collection('child_profiles')
          .doc(childId)
          .update(updateData);

        if (updateResult.updated === 0) {
          console.warn('[saveChildProfile] 更新失败：未找到对应的儿童档案，childId:', childId);
          return {
            code: 404,
            msg: '未找到对应的儿童档案'
          };
        }

        result = {
          id: childId,
          isNew: false
        };
      } catch (updateError) {
        console.error('[saveChildProfile] 更新数据库失败:', updateError);
        const errorMsg = updateError.message || String(updateError);
        
        // 检查是否是资源耗尽错误
        if (errorMsg.includes('resource exhausted') || errorMsg.includes('资源耗尽') || errorMsg.includes('db write action failed')) {
          console.error('[saveChildProfile] 数据库资源耗尽错误');
          return {
            code: 503,
            msg: '数据库暂时繁忙，请稍后重试',
            error: 'resource_exhausted'
          };
        }
        
        return {
          code: 500,
          msg: '更新儿童档案失败：' + errorMsg
        };
      }
    } else {
      // 创建新档案
      profileData.createdAt = now;
      console.log('[saveChildProfile] 创建新档案，数据字段:', Object.keys(profileData));
      console.log('[saveChildProfile] 必填字段检查:', {
        name: !!profileData.name,
        gender: !!profileData.gender,
        birthDate: !!profileData.birthDate,
        ownerUid: !!profileData.ownerUid,
        createdAt: !!profileData.createdAt
      });
      
      try {
        // 检查数据大小（避免数据过大导致写入失败）
        const dataSize = JSON.stringify(profileData).length;
        if (dataSize > 1000000) { // 1MB
          console.warn('[saveChildProfile] 数据较大:', dataSize, 'bytes');
        }
        
        const insertResult = await db.collection('child_profiles').add(profileData);
        if (!insertResult || !insertResult.id) {
          throw new Error('数据库插入失败：未返回记录ID');
        }
        result = {
          id: insertResult.id,
          isNew: true
        };
      } catch (insertError) {
        console.error('[saveChildProfile] 插入数据库失败:', insertError);
        const errorMsg = insertError.message || String(insertError);
        
        // 检查是否是资源耗尽错误
        if (errorMsg.includes('resource exhausted') || errorMsg.includes('资源耗尽') || errorMsg.includes('db write action failed')) {
          console.error('[saveChildProfile] 数据库资源耗尽错误');
          return {
            code: 503,
            msg: '数据库暂时繁忙，请稍后重试',
            error: 'resource_exhausted'
          };
        }
        
        console.error('[saveChildProfile] 尝试插入的数据摘要:', {
          name: profileData.name,
          gender: profileData.gender,
          birthDate: profileData.birthDate,
          ownerUid: profileData.ownerUid,
          hasCreatedAt: !!profileData.createdAt,
          dataSize: JSON.stringify(profileData).length
        });
        return {
          code: 500,
          msg: '创建儿童档案失败：' + errorMsg
        };
      }
    }

    console.log('[saveChildProfile] 成功保存儿童档案', {
      childId: result.id,
      name,
      ownerUid: uid,
      isNew: result.isNew
    });

    return {
      code: 0,
      msg: 'success',
      data: result
    };

  } catch (err) {
    console.error('[saveChildProfile] 错误:', err);
    return {
      code: 500,
      msg: '服务器内部错误',
      error: err.message
    };
  }
};

