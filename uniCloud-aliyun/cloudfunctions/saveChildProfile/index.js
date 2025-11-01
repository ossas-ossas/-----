'use strict';

const db = uniCloud.database();

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
  // 强制登录验证
  const uid = context.auth && context.auth.uid;
  if (!uid) {
    console.error('[saveChildProfile] 未登录，context.auth:', context.auth);
    return { 
      code: 401, 
      msg: '未登录，请先登录' 
    };
  }

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
      console.log('[saveChildProfile] 更新现有档案，childId:', childId);
      try {
        const updateResult = await db.collection('child_profiles')
          .doc(childId)
          .update({
            ...profileData,
            updatedAt: now
          });

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
        return {
          code: 500,
          msg: '更新儿童档案失败：' + (updateError.message || String(updateError))
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
        console.error('[saveChildProfile] 尝试插入的数据摘要:', {
          name: profileData.name,
          gender: profileData.gender,
          birthDate: profileData.birthDate,
          ownerUid: profileData.ownerUid,
          hasCreatedAt: !!profileData.createdAt
        });
        return {
          code: 500,
          msg: '创建儿童档案失败：' + (insertError.message || String(insertError))
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

