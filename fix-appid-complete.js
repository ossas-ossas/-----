#!/usr/bin/env node

/**
 * 彻底解决微信小程序 appid missing 问题
 * 使用方法：node fix-appid-complete.js
 */

const fs = require('fs');
const path = require('path');

const APP_ID = '__UNI__F50B1BC';
const PROJECT_NAME = '知动儿童综合发育测评';

// 需要检查和修复的文件路径
const FILES_TO_CHECK = [
  './unpackage/dist/dev/mp-weixin/app.json',
  './unpackage/dist/dev/mp-weixin/project.config.json',
  './manifest.json',
  './project.config.json'
];

function checkAndFixFile(filePath, isManifest = false) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`❌ 文件不存在: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    let needsUpdate = false;
    
    if (isManifest) {
      // 检查 manifest.json
      if (!data['mp-weixin'] || !data['mp-weixin'].appid) {
        console.log(`❌ manifest.json 缺少 mp-weixin.appid`);
        if (!data['mp-weixin']) {
          data['mp-weixin'] = {};
        }
        data['mp-weixin'].appid = APP_ID;
        needsUpdate = true;
      }
    } else {
      // 检查其他配置文件
      if (!data.appid) {
        console.log(`❌ ${filePath} 缺少 appid`);
        data.appid = APP_ID;
        needsUpdate = true;
      }
      
      // 更新项目名称
      if (data.projectname && data.projectname !== PROJECT_NAME) {
        console.log(`❌ ${filePath} 项目名称不正确: ${data.projectname}`);
        data.projectname = PROJECT_NAME;
        needsUpdate = true;
      }
    }
    
    if (needsUpdate) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✅ 已修复: ${filePath}`);
      return true;
    } else {
      console.log(`✅ 检查通过: ${filePath}`);
      return true;
    }
    
  } catch (error) {
    console.error(`❌ 处理文件 ${filePath} 时出错:`, error.message);
    return false;
  }
}

function main() {
  console.log('=== 开始彻底修复 appid missing 问题 ===\n');
  
  let allSuccess = true;
  
  // 检查所有文件
  FILES_TO_CHECK.forEach(filePath => {
    const isManifest = filePath.includes('manifest.json');
    const success = checkAndFixFile(filePath, isManifest);
    if (!success) {
      allSuccess = false;
    }
  });
  
  console.log('\n=== 修复结果 ===');
  if (allSuccess) {
    console.log('✅ 所有文件检查通过！');
    console.log('\n📋 下一步操作：');
    console.log('1. 完全关闭微信开发者工具');
    console.log('2. 重新打开微信开发者工具');
    console.log('3. 重新导入项目：');
    console.log(`   - 项目目录: ${path.resolve('./unpackage/dist/dev/mp-weixin')}`);
    console.log(`   - AppID: ${APP_ID}`);
    console.log(`   - 项目名称: ${PROJECT_NAME}`);
    console.log('4. 如果仍有问题，请清除微信开发者工具的缓存');
  } else {
    console.log('❌ 部分文件修复失败，请检查错误信息');
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkAndFixFile, main };
