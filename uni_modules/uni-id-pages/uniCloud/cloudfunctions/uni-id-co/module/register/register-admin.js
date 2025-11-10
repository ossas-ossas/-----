const {
  userCollection
} = require('../../common/constants')
const {
  ERROR
} = require('../../common/error')
const {
  preRegisterWithPassword,
  postRegister
} = require('../../lib/utils/register')

/**
 * 注册管理员
 * @tutorial https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#register-admin
 * @param {Object} params
 * @param {String} params.username   用户名
 * @param {String} params.password   密码
 * @param {String} params.nickname   昵称
 * @returns
 */
module.exports = async function (params = {}) {
  const schema = {
    username: 'username',
    password: 'password',
    nickname: {
      type: 'nickname',
      required: false
    }
  }
  this.middleware.validate(params, schema)
  const {
    username,
    password,
    nickname
  } = params
  // 查询当前管理员数量（最多允许5个）
  const getAdminRes = await userCollection.where({
    role: 'admin'
  }).get()
  
  // 检查管理员数量是否已达上限
  if (getAdminRes.data.length >= 5) {
    return {
      errCode: ERROR.ADMIN_EXISTS,
      errMsg: `管理员数量已达上限（当前${getAdminRes.data.length}个，最多5个）`
    }
  }
  
  // 如果有管理员，检查应用权限（保留原有逻辑）
  if (getAdminRes.data.length > 0) {
    const appId = this.getUniversalClientInfo().appId
    const hasAdminInCurrentApp = getAdminRes.data.some(admin => {
      return !admin.dcloud_appid || (admin.dcloud_appid && admin.dcloud_appid.includes(appId))
    })
    
    // 注释掉这个检查，允许同一应用创建多个管理员
    // if (hasAdminInCurrentApp) {
    //   return {
    //     errCode: ERROR.ADMIN_EXISTS,
    //     errMsg: this.t('uni-id-admin-exists')
    //   }
    // }
  }
  const {
    user,
    extraData
  } = await preRegisterWithPassword.call(this, {
    user: {
      username
    },
    password
  })
  return postRegister.call(this, {
    user,
    extraData: {
      ...extraData,
      nickname,
      role: ['admin']
    }
  })
}
