'use strict';

/**
 * 测试配置文件是否被正确加载
 * 用于验证 uni-id 配置文件路径和内容
 * 该函数会打印详细的路径和配置信息，帮助定位问题
 */
exports.main = async (event, context) => {
  const fs = require('fs')
  const path = require('path')
  
  const result = {
    code: 0,
    message: '配置检查完成',
    data: {
      checkTime: new Date().toISOString(),
      paths: {},
      configs: {},
      errors: {}
    }
  }
  
  try {
    // ========== 步骤1: 检查 uni-config-center 模块是否存在 ==========
    let uniConfigCenterExists = false
    let uniConfigCenterError = null
    try {
      require.resolve('uni-config-center')
      uniConfigCenterExists = true
    } catch (e) {
      uniConfigCenterError = e.message
    }
    result.data.paths.uniConfigCenterModule = {
      exists: uniConfigCenterExists,
      error: uniConfigCenterError
    }
    
    // ========== 步骤2: 尝试直接 require（uni-id-co 使用的方式） ==========
    let directRequireConfig = null
    let directRequireError = null
    let directRequirePath = null
    try {
      // uni-id-co 使用的加载方式
      directRequireConfig = require('uni-config-center/uni-id/config.json')
      
      // 尝试获取实际文件路径
      try {
        const resolvedPath = require.resolve('uni-config-center/uni-id/config.json')
        directRequirePath = resolvedPath
        // 检查文件是否存在
        result.data.paths.directRequire = {
          success: true,
          resolvedPath: resolvedPath,
          fileExists: fs.existsSync(resolvedPath),
          fileSize: fs.existsSync(resolvedPath) ? fs.statSync(resolvedPath).size : 0
        }
      } catch (pathError) {
        result.data.paths.directRequire = {
          success: true,
          resolvedPath: '无法解析路径',
          pathError: pathError.message
        }
      }
    } catch (e) {
      directRequireError = e.message
      result.data.paths.directRequire = {
        success: false,
        error: directRequireError,
        errorDetails: {
          message: e.message,
          code: e.code
        }
      }
    }
    
    // ========== 步骤3: 使用 uni-config-center API 读取配置 ==========
    let uniConfigCenterConfig = null
    let uniConfigCenterPath = null
    let uniConfigCenterError2 = null
    try {
      const createConfig = require('uni-config-center')
      const uniIdConfig = createConfig({
        pluginId: 'uni-id',
        defaultConfig: {}
      })
      uniConfigCenterConfig = uniIdConfig.config()
      uniConfigCenterPath = uniIdConfig.resolve('config.json')
      
      result.data.paths.uniConfigCenterAPI = {
        success: true,
        resolvedPath: uniConfigCenterPath,
        fileExists: fs.existsSync(uniConfigCenterPath),
        fileSize: fs.existsSync(uniConfigCenterPath) ? fs.statSync(uniConfigCenterPath).size : 0
      }
    } catch (e) {
      uniConfigCenterError2 = e.message
      result.data.paths.uniConfigCenterAPI = {
        success: false,
        error: uniConfigCenterError2
      }
    }
    
    // ========== 步骤4: 验证配置内容 ==========
    const configToCheck = directRequireConfig || uniConfigCenterConfig || {}
    
    result.data.configs.validation = {
      hasConfig: !!configToCheck && Object.keys(configToCheck).length > 0,
      hasPasswordSecret: !!configToCheck.passwordSecret,
      hasTokenSecret: !!configToCheck.tokenSecret,
      hasTokenExpiresIn: typeof configToCheck.tokenExpiresIn === 'number',
      hasMpWeixin: !!configToCheck['mp-weixin'],
      mpWeixin: {
        hasAppid: !!configToCheck['mp-weixin']?.appid,
        appid: configToCheck['mp-weixin']?.appid || null,
        hasAppsecret: !!configToCheck['mp-weixin']?.appsecret,
        appsecretIsPlaceholder: configToCheck['mp-weixin']?.appsecret === '请填写你的微信小程序AppSecret',
        appsecretLength: configToCheck['mp-weixin']?.appsecret?.length || 0
      }
    }
    
    // ========== 步骤5: 配置预览（隐藏敏感信息） ==========
    result.data.configs.preview = {
      passwordSecret: configToCheck.passwordSecret ? '***已配置***' : '❌ 未配置',
      tokenSecret: configToCheck.tokenSecret ? '***已配置***' : '❌ 未配置',
      tokenExpiresIn: configToCheck.tokenExpiresIn || '未配置',
      'mp-weixin': {
        appid: configToCheck['mp-weixin']?.appid || '❌ 未配置',
        appsecret: configToCheck['mp-weixin']?.appsecret 
          ? (configToCheck['mp-weixin'].appsecret === '请填写你的微信小程序AppSecret' 
              ? '⚠️ 未配置（仍是占位符）' 
              : '✅ 已配置')
          : '❌ 未配置'
      }
    }
    
    // ========== 步骤6: 诊断和建议 ==========
    const diagnostics = []
    const recommendations = []
    
    if (!uniConfigCenterExists) {
      diagnostics.push('❌ uni-config-center 模块未找到')
      recommendations.push('1. 检查 uni_modules/uni-config-center 目录是否存在')
      recommendations.push('2. 在 HBuilderX 中右键 uni-config-center 目录，选择"上传公共模块"')
    }
    
    if (directRequireError) {
      diagnostics.push(`❌ 直接 require 失败: ${directRequireError}`)
      recommendations.push('1. 确认配置文件路径: uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json')
      recommendations.push('2. 确认文件内容为有效的 JSON 格式')
      recommendations.push('3. 重新上传 uni-config-center 公共模块')
    }
    
    if (!configToCheck || Object.keys(configToCheck).length === 0) {
      diagnostics.push('❌ 配置内容为空')
      recommendations.push('1. 检查 config.json 文件内容是否正确')
      recommendations.push('2. 重新上传 uni-config-center 公共模块')
    }
    
    if (configToCheck?.['mp-weixin']?.appsecret === '请填写你的微信小程序AppSecret') {
      diagnostics.push('⚠️ AppSecret 仍然是占位符，需要填写真实值')
      recommendations.push('1. 登录微信公众平台: https://mp.weixin.qq.com')
      recommendations.push('2. 获取 AppSecret: 开发 → 开发管理 → 开发设置')
      recommendations.push('3. 更新 config.json 中的 appsecret 字段')
      recommendations.push('4. 重新上传 uni-config-center 公共模块')
    }
    
    if (diagnostics.length === 0) {
      diagnostics.push('✅ 配置检查通过')
    }
    
    result.data.diagnostics = diagnostics
    result.data.recommendations = recommendations
    
    return result
    
  } catch (error) {
    result.code = 500
    result.message = '配置检查异常'
    result.data.errors = {
      message: error.message,
      stack: error.stack,
      name: error.name
    }
    return result
  }
}

