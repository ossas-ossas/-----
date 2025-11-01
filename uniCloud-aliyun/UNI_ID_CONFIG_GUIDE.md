# uni-id 配置文件设置指南

## ✅ 配置文件已创建

配置文件位置：
```
uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json
```

## 📝 当前配置文件内容

```json
{
  "passwordSecret": "dev_password_secret_change_me_please",
  "tokenSecret": "dev_token_secret_change_me_please",
  "tokenExpiresIn": 2592000,
  "tokenExpiresThreshold": 43200,
  "mp-weixin": {
    "appid": "wx6c208f4a7597776e",
    "appsecret": "请填写你的微信小程序AppSecret"
  }
}
```

## 🔧 必须完成的配置步骤

### 1. 填写微信小程序 AppSecret

1. 登录微信公众平台：https://mp.weixin.qq.com
2. 进入：开发 → 开发管理 → 开发设置
3. 查看并复制 "AppSecret(小程序密钥)"
4. 编辑 `uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json`
5. 将 `"请填写你的微信小程序AppSecret"` 替换为你的实际 AppSecret

### 2. 更换生产环境密钥（可选但强烈推荐）

**开发环境可以暂时使用默认密钥，但生产环境必须更换！**

生成强随机密钥的方法：
- 使用在线工具：https://www.uuidgenerator.net/
- 或使用 Node.js：`require('crypto').randomBytes(32).toString('hex')`

替换：
- `passwordSecret`: 用于密码加密（至少32位随机字符串）
- `tokenSecret`: 用于 Token 签名（至少32位随机字符串）

## 📤 上传部署步骤

### 方法1：通过 HBuilderX 上传（推荐）

1. **上传公共模块**：
   - 右键点击 `uni_modules/uni-config-center` 目录
   - 选择：上传公共模块
   - 等待上传完成

2. **上传测试云函数**（可选，用于验证配置）：
   - 右键点击 `uniCloud-aliyun/cloudfunctions/testConfig`
   - 选择：上传部署云函数
   - 在 HBuilderX 控制台或 uniCloud 控制台调用 `testConfig` 云函数
   - 查看返回结果，确认配置已正确加载

### 方法2：通过 uniCloud Web 控制台

1. 登录 https://unicloud.dcloud.net.cn
2. 进入你的云服务空间（evaldemo）
3. 云函数 → 公共模块 → 上传
4. 选择 `uni_modules/uni-config-center` 目录

## ✅ 验证配置是否生效

### 方法1：使用测试云函数

1. 上传 `testConfig` 云函数
2. 在小程序前端调用：
```javascript
uniCloud.callFunction({
  name: 'testConfig',
  success: (res) => {
    console.log('配置检查结果:', res.result)
  }
})
```

### 方法2：查看日志

1. 尝试登录（触发 uni-id-co）
2. 如果配置正确，不会出现 "Invalid uni-id config file" 错误
3. 如果仍有错误，查看 uniCloud Web 控制台的云函数日志

### 方法3：检查配置路径

uni-id-co 会尝试从以下路径加载配置：
```
common/uni-config-center/uni-id/config.json
```

确保你的配置文件路径完全匹配：
```
uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json
```

## 🔍 常见问题排查

### 问题1：仍然提示 "Invalid uni-id config file"

**可能原因：**
1. 公共模块未上传到云端
2. 配置文件 JSON 格式错误（缺少逗号、引号等）
3. 路径不正确

**解决方法：**
1. 确认已上传 `uni-config-center` 公共模块
2. 验证 JSON 格式（可以使用在线 JSON 验证器）
3. 检查文件路径是否正确

### 问题2：多个 uni-config-center 副本

**检查清单：**
- ✅ 项目中只有一个 `uni_modules/uni-config-center` 目录
- ✅ `manifest.json` 中 `uniCloud.spaceId` 指向正确的云空间
- ✅ 上传的公共模块版本与本地一致

### 问题3：配置不生效

**可能原因：**
- 云函数缓存：需要重新部署相关云函数
- 公共模块版本不一致：确保云端和本地版本一致

**解决方法：**
1. 重新上传公共模块
2. 重新部署 `uni-id-co` 云对象（如果存在）
3. 清除浏览器缓存，重新编译小程序

## 📋 最小可用配置示例

如果要快速测试，可以使用以下最小配置：

```json
{
  "passwordSecret": "dev_password_secret_change_me",
  "tokenSecret": "dev_token_secret_change_me",
  "tokenExpiresIn": 2592000,
  "mp-weixin": {
    "appid": "wx6c208f4a7597776e",
    "appsecret": "你的实际AppSecret"
  }
}
```

**注意：** `tokenExpiresThreshold` 字段如果缺失会使用默认值 43200。

## 🎯 最终检查清单

- [ ] 配置文件已创建在正确路径
- [ ] 已填写真实的微信小程序 AppSecret
- [ ] JSON 格式正确（可以使用在线工具验证）
- [ ] 已上传 `uni-config-center` 公共模块到云端
- [ ] 测试云函数调用成功，配置被正确读取
- [ ] 登录功能可以正常使用

## 📞 如果问题依然存在

1. 查看 uniCloud Web 控制台的云函数日志
2. 检查 uni-id-co 的详细错误信息
3. 确认云服务空间关联正确（manifest.json 中的 spaceId）

