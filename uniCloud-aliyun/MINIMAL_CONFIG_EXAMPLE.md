# uni-id 最小化配置示例（本地测试用）

## 配置文件路径
```
uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json
```

## 最小化配置（仅支持用户名/手机/邮箱登录）

```json
{
  "passwordSecret": "dev_password_secret_change_me_please",
  "tokenSecret": "dev_token_secret_change_me_please",
  "tokenExpiresIn": 2592000,
  "tokenExpiresThreshold": 43200
}
```

## 完整配置（包含微信，生产环境用）

```json
{
  "passwordSecret": "dev_password_secret_change_me_please",
  "tokenSecret": "dev_token_secret_change_me_please",
  "tokenExpiresIn": 2592000,
  "tokenExpiresThreshold": 43200,
  "mp-weixin": {
    "appid": "wx6c208f4a7597776e",
    "appsecret": "4855fcb04dbb6c4a7171cf4b6a812c65"
  }
}
```

## 配置说明

- `passwordSecret`: 密码加密密钥（开发环境可随意填写，生产环境需使用强密钥）
- `tokenSecret`: Token 签名密钥（开发环境可随意填写，生产环境需使用强密钥）
- `tokenExpiresIn`: Token 过期时间（秒），2592000 = 30天
- `tokenExpiresThreshold`: Token 过期阈值（秒），43200 = 12小时
- `mp-weixin`: 微信小程序配置（已禁用微信登录时可删除此字段）

## 当前配置状态

当前配置文件已包含 `mp-weixin` 配置，但由于 `uni-id-pages/config.js` 中已禁用微信登录，该配置不会被使用。

**建议**：本地测试时保持当前配置即可（包含 mp-weixin 不影响功能）。

