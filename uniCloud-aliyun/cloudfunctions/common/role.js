/**
 * 角色检测工具
 * 简化版角色检测：允许从 context.auth 或 event._mockRole 读取
 * （便于开发阶段调试）
 */

/**
 * 获取当前用户角色
 * @param {Object} context - uniCloud 上下文
 * @param {Object} event - 事件参数
 * @returns {string} - 角色：'parent' | 'teacher' | 'admin'
 */
function getRole(context, event) {
  // 生产建议使用 uni-id 获取 uid->roles
  const mock = event && event._mockRole;
  if (mock) return mock;

  // 从 context.auth 读取
  const r = context && context.auth && context.auth.role;
  return r || 'parent';
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


