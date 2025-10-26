#!/usr/bin/env node

/**
 * 修复编译后的 app.json 文件，添加缺失的 appid 字段
 * 使用方法：node fix-appid.js
 */

const fs = require('fs');
const path = require('path');

const APP_ID = '__UNI__F50B1BC';
const APP_JSON_PATH = './unpackage/dist/dev/mp-weixin/app.json';

function fixAppJson() {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(APP_JSON_PATH)) {
      console.log('❌ app.json 文件不存在:', APP_JSON_PATH);
      return false;
    }

    // 读取文件内容
    const appJsonContent = fs.readFileSync(APP_JSON_PATH, 'utf8');
    const appJson = JSON.parse(appJsonContent);

    // 检查是否已经有 appid
    if (appJson.appid) {
      console.log('✅ app.json 已包含 appid:', appJson.appid);
      return true;
    }

    // 添加 appid
    appJson.appid = APP_ID;

    // 写回文件
    fs.writeFileSync(APP_JSON_PATH, JSON.stringify(appJson, null, 2), 'utf8');
    
    console.log('✅ 已成功添加 appid 到 app.json:', APP_ID);
    return true;

  } catch (error) {
    console.error('❌ 修复 app.json 时出错:', error.message);
    return false;
  }
}

// 执行修复
if (require.main === module) {
  fixAppJson();
}

module.exports = { fixAppJson };
