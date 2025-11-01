'use strict';

const db = uniCloud.database();

/**
 * 保存或更新儿童档案
 * 
 * 输入参数：
 * - name: 儿童姓名（必填）
 * - gender: 性别 male/female（必填）
 * - birthDate: 出生日期 YYYY-MM-DD（必填）
 * - ownerUid: 用户UID（必填，从 context 获取）
 * - diagnosis: 医疗诊断数组（可选）
 * - habits: 行为习惯对象（可选）
 * - vision: 视觉障碍信息（可选）
 * - hearing: 听觉障碍信息（可选）
 * - epilepsy: 癫痫症（可选）
 * - caregiver: 主要照顾者（可选）
 * - phone: 联系电话（可选）
 * - videos: 视频列表（可选）
 * - homeGuide: 居家辅导需求（可选）
 * - notes: 备注信息（可选）
 * - childId: 儿童档案ID（可选，如果提供则更新，否则创建新档案）
 * 
 * 返回：
 * - code: 0 成功
 * - data.id: 儿童档案 _id
 */
exports.main = async (event, context) => {
  try {
    // 1. 参数校验
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
      videos,
      homeGuide,
      notes,
      childId
    } = event || {};

    // 必填字段校验
    if (!name || !gender || !birthDate) {
      return {
        code: 400,
        msg: '缺少必填字段: name, gender, birthDate'
      };
    }

    // 获取用户UID（支持多种方式）
    let ownerUid = context.uid || event.ownerUid;
    
    // 如果没有用户ID，尝试从其他途径获取或生成临时ID
    if (!ownerUid) {
      // 尝试从 context 的其他属性获取
      if (context.APPID) {
        // 开发环境或未登录状态，可以使用临时标识
        // 在实际生产环境中，应该要求用户登录
        ownerUid = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        console.warn('[saveChildProfile] 未获取到用户ID，使用临时ID:', ownerUid);
      } else {
        return {
          code: 401,
          msg: '未获取到用户身份，请先登录'
        };
      }
    }

    // 2. 准备数据
    const now = Date.now();
    const profileData = {
      name: String(name).trim(),
      gender: gender,
      birthDate: String(birthDate).trim(),
      ownerUid: ownerUid,
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

    if (videos && Array.isArray(videos)) {
      // 处理视频：如果只是临时文件，需要上传到云存储
      profileData.videos = videos.map(video => {
        if (typeof video === 'string') {
          return { tempFilePath: video };
        }
        return video;
      });
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
      const updateResult = await db.collection('child_profiles')
        .doc(childId)
        .update({
          ...profileData,
          updatedAt: now
        });

      if (updateResult.updated === 0) {
        return {
          code: 404,
          msg: '未找到对应的儿童档案'
        };
      }

      result = {
        id: childId,
        isNew: false
      };
    } else {
      // 创建新档案
      profileData.createdAt = now;
      
      const insertResult = await db.collection('child_profiles').add(profileData);
      result = {
        id: insertResult.id,
        isNew: true
      };
    }

    console.log('[saveChildProfile] 成功保存儿童档案', {
      childId: result.id,
      name,
      ownerUid,
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

