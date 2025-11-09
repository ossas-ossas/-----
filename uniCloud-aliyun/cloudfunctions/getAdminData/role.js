/**
 * 角色检测工具
 * 简化版角色检测：允许从 context.auth 或 event._mockRole 读取
 * （便于开发阶段调试）
 */

/**
 * 从 token 中解析用户信息
 * @param {string} token - JWT token
 * @returns {Object|null} - { uid: string, role: array }，解析失败返回 null
 */
function parseToken(token) {
  if (!token || typeof token !== 'string') {
    return null;
  }
  
  try {
    const tokenArr = token.split('.');
    if (tokenArr.length !== 3) {
      return null;
    }
    
    // 解码 payload
    const payload = JSON.parse(decodeURIComponent(escape(atob(tokenArr[1]))));
    return {
      uid: payload.uid || payload._id || null,
      role: payload.role || []
    };
  } catch (error) {
    console.warn('[role] Token 解析失败:', error.message);
    return null;
  }
}

/**
 * 获取当前用户角色
 * @param {Object} context - uniCloud 上下文
 * @param {Object} event - 事件参数
 * @returns {Promise<string>} - 角色：'parent' | 'teacher' | 'admin'
 */
async function getRole(context, event) {
  // 生产建议使用 uni-id 获取 uid->roles
  const mock = event && event._mockRole;
  if (mock) {
    console.log('[role] 使用模拟角色:', mock);
    return mock;
  }

  // 获取用户ID和角色
  let uid = (context && context.auth && context.auth.uid) || context.uid;
  let roleFromContext = context && context.auth && context.auth.role;
  
  // 如果 context 中没有 uid，尝试从 token 解析
  let tokenData = null;
  if (!uid || !roleFromContext) {
    const token = (event && event.uniIdToken) || (event && event.args && event.args.uniIdToken);
    if (token) {
      console.log('[role] context.auth 为空或不完整，尝试从 token 解析');
      tokenData = parseToken(token);
      if (tokenData) {
        if (!uid && tokenData.uid) {
          uid = tokenData.uid;
          console.log('[role] 从 token 解析成功，uid:', uid);
        }
        if (!roleFromContext && tokenData.role) {
          roleFromContext = tokenData.role;
          console.log('[role] 从 token 解析成功，role:', roleFromContext);
        }
      }
    }
  }
  
  console.log('[role] getRole 被调用，uid:', uid, 'roleFromContext:', roleFromContext, 'context.auth:', JSON.stringify(context.auth || {}));
  
  // 优先从 context.auth.role 或 token 中的 role 读取
  if (roleFromContext) {
    console.log('[role] 从 context.auth.role 或 token 获取角色:', roleFromContext, '类型:', typeof roleFromContext, '是否为数组:', Array.isArray(roleFromContext));
    
    if (Array.isArray(roleFromContext)) {
      if (roleFromContext.includes('admin')) {
        console.log('[role] 识别为 admin');
        return 'admin';
      }
      if (roleFromContext.includes('teacher')) {
        console.log('[role] 识别为 teacher');
        return 'teacher';
      }
      console.log('[role] 角色数组不包含 admin 或 teacher，返回 parent');
      return 'parent';
    }
    if (roleFromContext === 'admin' || roleFromContext === 'teacher') {
      console.log('[role] 识别为:', roleFromContext);
      return roleFromContext;
    }
  }
  
  if (!uid) {
    console.warn('[role] 无法获取用户UID，默认为parent');
    return 'parent'; // 未登录，默认为家长
  }

  // 如果 context.auth.role 不存在，从数据库查询
  console.log('[role] context.auth.role 不存在或为空，从数据库查询用户角色，UID:', uid);
  try {
    const db = uniCloud.database();
    
    // 尝试使用 doc(uid) 查询
    let userRes;
    try {
      userRes = await db.collection('uni-id-users')
        .doc(uid)
        .field({
          role: true,
          _id: true
        })
        .get();
      
      console.log('[role] 使用 doc(uid) 查询结果:', {
        hasData: !!userRes.data,
        dataLength: userRes.data ? userRes.data.length : 0
      });
    } catch (docError) {
      console.warn('[role] 使用 doc(uid) 查询失败，尝试使用 where 查询:', docError.message);
      // 如果 doc 查询失败，尝试使用 where 查询
      userRes = await db.collection('uni-id-users')
        .where({
          _id: uid
        })
        .field({
          role: true,
          _id: true
        })
        .limit(1)
        .get();
      
      console.log('[role] 使用 where 查询结果:', {
        hasData: !!userRes.data,
        dataLength: userRes.data ? userRes.data.length : 0
      });
    }
    
    console.log('[role] 数据库查询完整结果:', {
      hasData: !!userRes.data,
      dataLength: userRes.data ? userRes.data.length : 0,
      data: userRes.data ? JSON.stringify(userRes.data) : 'null'
    });
    
    if (userRes.data && userRes.data.length > 0) {
      const userRole = userRes.data[0].role;
      console.log('[role] 从数据库查询到用户角色:', userRole, '类型:', typeof userRole, '是否为数组:', Array.isArray(userRole));
      
      if (userRole) {
        if (Array.isArray(userRole)) {
          if (userRole.includes('admin')) {
            console.log('[role] 从数据库识别为 admin');
            return 'admin';
          }
          if (userRole.includes('teacher')) {
            console.log('[role] 从数据库识别为 teacher');
            return 'teacher';
          }
          console.log('[role] 数据库角色数组不包含 admin 或 teacher，返回 parent');
          return 'parent';
        }
        if (userRole === 'admin' || userRole === 'teacher') {
          console.log('[role] 从数据库识别为:', userRole);
          return userRole;
        }
      } else {
        console.warn('[role] 数据库查询到的用户角色为空或未定义');
      }
    } else {
      console.warn('[role] 数据库查询未找到用户数据，UID:', uid);
      // 尝试查询所有用户，看看是否能找到
      try {
        const allUsersRes = await db.collection('uni-id-users')
          .field({
            _id: true,
            role: true
          })
          .limit(5)
          .get();
        console.log('[role] 调试：查询前5个用户:', {
          count: allUsersRes.data ? allUsersRes.data.length : 0,
          users: allUsersRes.data ? allUsersRes.data.map(u => ({ _id: u._id, role: u.role })) : []
        });
      } catch (debugError) {
        console.warn('[role] 调试查询失败:', debugError.message);
      }
    }
  } catch (error) {
    console.error('[role] 查询用户角色失败:', error);
    console.error('[role] 错误详情:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
  }

  console.log('[role] 未能识别用户角色，默认为parent');
  return 'parent'; // 默认角色
}

/**
 * 断言当前用户为教师或管理员
 * @param {string} role - 用户角色
 * @throws {Error} - 如果角色不是 teacher 或 admin
 */
function assertTeacher(role) {
  if (role !== 'teacher' && role !== 'admin') {
    const err = new Error('forbidden: 仅教师和管理员可访问');
    err.code = 403;
    err.message = 'forbidden';
    throw err;
  }
}

/**
 * 断言当前用户为管理员
 * @param {string} role - 用户角色
 * @throws {Error} - 如果角色不是 admin
 */
function assertAdmin(role) {
  if (role !== 'admin') {
    const err = new Error('forbidden: 仅管理员可访问');
    err.code = 403;
    err.message = 'forbidden';
    throw err;
  }
}

/**
 * 检查是否为家长角色
 * @param {string} role - 用户角色
 * @returns {boolean}
 */
function isParent(role) {
  return role === 'parent';
}

/**
 * 检查是否为教师角色
 * @param {string} role - 用户角色
 * @returns {boolean}
 */
function isTeacher(role) {
  return role === 'teacher' || role === 'admin';
}

module.exports = {
  getRole,
  assertTeacher,
  assertAdmin,
  isParent,
  isTeacher
};

