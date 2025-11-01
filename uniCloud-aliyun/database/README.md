# 数据库 Schema 说明文档

本文档说明知动儿童发育测评系统的数据库表结构与字段约束。

---

## 📋 集合清单

本系统使用 **uniCloud 服务空间**，位于 `uniCloud-aliyun/database/` 目录。

### 1. child_profiles（儿童档案）
**文件**: `child_profiles.schema.json`  
**用途**: 存储儿童基本信息和临床数据，每位儿童对应一位家长用户

**关键字段**:
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `_id` | ObjectId | ✅ | 主键 |
| `name` | string | ✅ | 儿童姓名 |
| `gender` | string | ✅ | 性别：`male` / `female` |
| `birthDate` | string | ✅ | 出生日期 (YYYY-MM-DD) |
| `ownerUid` | string | ✅ | 所属家长 uid |
| `diagnosis` | array<string> | ❌ | 医疗诊断：脑瘫/发育迟缓/孤独症/罕见疾病 |
| `habits` | object | ❌ | 行为习惯：walkTime, crawl, kneel, hand |
| `vision` | object | ❌ | 视觉障碍信息：status, sub |
| `hearing` | object | ❌ | 听觉障碍信息：status, dbLeft, dbRight |
| `epilepsy` | string | ❌ | 癫痫症：none/medicated/unmedicated |
| `caregiver` | string | ❌ | 主要照顾者：mother/father/grandparent/other |
| `phone` | string | ❌ | 联系电话 |
| `videos` | array | ❌ | 视频列表（最多6个） |
| `homeGuide` | bool | ❌ | 后续居家辅导需求 |
| `notes` | string | ❌ | 备注信息 |
| `createdAt` | long | ✅ | 创建时间戳(ms) |
| `updatedAt` | long | ❌ | 更新时间戳(ms) |

**索引**:
```json
{
  "idx_ownerUid": { "fields": ["ownerUid"] },
  "idx_createdAt": { "fields": ["createdAt"] }
}
```

**数据保留规则**: 
- 用户删除账号时，关联的儿童档案自动删除
- 建议保留历史数据至少 5 年

---

### 2. questions_master（题目主表）
**文件**: `questions_master.schema.json`  
**用途**: 存储所有评估题目，支持按领域、年龄段查询

**关键字段**:
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `_id` | ObjectId | ✅ | 主键 |
| `qid` | string | ✅ | **题目唯一ID**（唯一索引） |
| `domain` | string | ✅ | 领域代码（感知觉/粗大动作/精细动作/社会互动/认知/语言/口腔动作） |
| `subdomain` | string | ❌ | 子领域代码（如：OSV/OSH/OST/ISP/ISV等） |
| `ageBand` | string | ✅ | 年龄段代码（1-3M, 3-6M, 6-9M, 9-12M, 1-1.5Y, 1.5-2Y, 2-2.5Y, 2.5-3Y, 3-4Y, 4-5Y, 5-6Y） |
| `title` | string | ✅ | 题目标题 |
| `text` | string | ❌ | 题目详细内容 |
| `weight` | int | ❌ | 权重(1-10)，默认1 |
| `enabled` | bool | ❌ | 是否启用，默认true |
| `order` | int | ❌ | 显示顺序 |
| `createdAt` | long | ❌ | 创建时间戳(ms) |
| `updatedAt` | long | ❌ | 更新时间戳(ms) |

**索引**:
```json
{
  "idx_qid": { "fields": ["qid"], "unique": true },
  "idx_domain": { "fields": ["domain"] },
  "idx_ageBand": { "fields": ["ageBand"] },
  "idx_enabled": { "fields": ["enabled"] },
  "idx_domain_ageBand": { "fields": ["domain", "ageBand"] }
}
```

**⚠️ 主键约束**: `qid` 必须全局唯一，格式建议：`{ageBand}-{subdomain}-{序号}`  
例如：`1-3M-OSV-001`、`3-6M-OSH-002`

**数据保留规则**: 
- 题目数据为系统基础数据，不允许删除
- 可通过 `enabled: false` 禁用题目
- 历史题目保留用于数据分析

---

### 3. assessments（评估结果）
**文件**: `assessments.schema.json`  
**用途**: 存储每次评估的作答数据与统计结果  
**注意**: 集合名是 `assessments`（复数），不是 `assessment`（单数）

**关键字段**:
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `_id` | ObjectId | ✅ | 主键 |
| `childId` | string | ✅ | 关联 child_profiles._id |
| `ownerUid` | string | ✅ | 所有者UID（家长用户ID） |
| `answers` | object | ✅ | 作答数据 `{ [qid]: 0\|1 }` |
| `stats` | object | ✅ | **聚合统计（用于图表展示）** |
| `notAchieved` | array | ❌ | **未达标明细（仅教师可见）** |
| `scorePercent` | int | ❌ | 得分百分比(0-100) |
| `level` | string | ❌ | 发育等级：优秀/良好/正常/需关注/需干预 |
| `source` | string | ❌ | 数据来源：draft（草稿）/submit（已提交），默认draft |
| `createdAt` | long | ✅ | 创建时间戳(ms)，**建议降序索引** |
| `updatedAt` | long | ❌ | 更新时间戳(ms) |

**stats 结构**:
```json
{
  "stats": {
    "domains": {
      "感知觉": {
        "passed": 22,
        "total": 26,
        "ratio": 0.846
      },
      "粗大动作": {
        "passed": 18,
        "total": 24,
        "ratio": 0.75
      }
    },
    "ageBands": {
      "1-3M": {
        "passed": 10,
        "total": 12,
        "ratio": 0.833
      }
    },
    "overall": {
      "passed": 150,
      "total": 200,
      "ratio": 0.75
    }
  }
}
```

**notAchieved 结构**:
```json
{
  "notAchieved": [
    {
      "qid": "1-3M-OSV-001",
      "domain": "感知觉",
      "ageBand": "1-3M",
      "title": "视力为0.1,可见30公分内距离的物体"
    }
  ]
}
```

**索引**:
```json
{
  "idx_childId": { "fields": ["childId"] },
  "idx_ownerUid": { "fields": ["ownerUid"] },
  "idx_createdAt": { 
    "fields": ["createdAt"],
    "description": "建议设为降序",
    "sort": "desc"
  },
  "idx_childId_createdAt": { 
    "fields": ["childId", "createdAt"],
    "unique": false
  },
  "idx_source": {
    "fields": ["source"],
    "description": "用于区分草稿和已提交"
  }
}
```

**数据保留规则**: 
- 已提交的评估数据永久保留
- 草稿（source: 'draft'）超过 30 天未提交可自动清理
- 建议定期备份重要评估数据

---

## 🔐 安全策略

### 权限控制

**child_profiles**:
- 用户只能访问自己创建的儿童档案（`ownerUid == auth.uid`）
- 只能创建、更新、删除自己的档案

**questions_master**:
- 所有用户只读访问（用于评估时查询题目）
- 只有管理员可通过云函数管理题目

**assessments**:
- 用户只能访问自己创建的评估（`ownerUid == auth.uid`）
- 只能创建评估，不能更新或删除
- **⚠️ 重要**: 客户端禁止直接读取 assessments 集合，必须通过云函数

### ⚠️ 重要说明

**客户端禁止直接读取 assessments 集合！**

必须通过云函数对数据进行裁剪：

**家长端接口** (示例):
```javascript
// uniCloud/cloudfunctions/getAssessmentForParent/index.js
exports.main = async (event, context) => {
  const { assessmentId } = event;
  
  // 1. 只返回 stats 中的必要字段（供柱状图展示）
  // 2. 不返回 notAchieved 字段
  // 3. 不返回敏感信息
  
  const result = await db.collection('assessments')
    .doc(assessmentId)
    .field({
      _id: true,
      childId: true,
      stats: true,
      scorePercent: true,
      level: true,
      createdAt: true
      // 不返回 answers、notAchieved
    })
    .get();
    
  return result.data;
};
```

**教师端接口** (示例):
```javascript
// uniCloud/cloudfunctions/getAssessmentForTeacher/index.js
exports.main = async (event, context) => {
  // 教师可查看完整信息，包括 notAchieved
  const result = await db.collection('assessments')
    .doc(assessmentId)
    .get();
    
  return result.data;
};
```

---

## 📊 数据关系

```
child_profiles (儿童档案)
    ↓ 1:N
assessments (评估结果)
    ↓ M:N (通过 qid 关联)
questions_master (题目主表)
```

**数据流向**:
1. 家长创建儿童档案 → `child_profiles` 插入
2. 开始评估 → 从 `questions_master` 查询题目（按 ageBand 过滤）
3. 保存草稿 → `assessments` 插入（source: 'draft'）
4. 提交评估 → `assessments` 更新（source: 'submit'），计算 stats + notAchieved
5. 查看结果 → 云函数返回裁剪后的 `assessments` 数据

---

## 🎯 字段约束总结

| 集合 | 主键唯一约束 | 重要索引 | 权限控制 |
|------|------------|---------|---------|
| `child_profiles` | `_id` | ownerUid, createdAt | ownerUid 匹配 |
| `questions_master` | **`qid` 唯一** | domain, ageBand, enabled | 只读 |
| `assessments` | `_id` | childId, ownerUid, **createdAt(降序)**, source | ownerUid 匹配 |

---

## 🔗 前端对接预留

### 云函数接口设计

**创建/更新儿童档案**:
```javascript
uniCloud.callFunction({
  name: 'saveChildProfile',
  data: {
    name: 'xxx',
    gender: 'male',
    birthDate: '2020-01-01',
    diagnosis: ['devDelay'],
    habits: { walkTime: 'after18m', ... },
    vision: { status: 'normal' },
    hearing: { status: 'normal' },
    epilepsy: 'none',
    ...
  }
});
```

**提交评估**:
```javascript
uniCloud.callFunction({
  name: 'submitAssessment',
  data: {
    childId: 'xxx',
    answers: { '1-3M-OSV-001': 1, '1-3M-OSV-002': 0, ... },
    source: 'submit' // 或 'draft'
  }
});
```

**家长查看结果**:
```javascript
uniCloud.callFunction({
  name: 'getAssessmentForParent',
  data: { assessmentId: 'xxx' }
});
// 返回: { stats, scorePercent, level } // 不包含 notAchieved
```

**教师查看结果**:
```javascript
uniCloud.callFunction({
  name: 'getAssessmentForTeacher',
  data: { assessmentId: 'xxx' }
});
// 返回: { stats, scorePercent, level, notAchieved } // 包含完整信息
```

---

## ✅ 部署检查清单

- [ ] 执行 uniCloud 数据库初始化
- [ ] 验证 `questions_master.qid` 唯一索引创建成功
- [ ] 验证 `assessments.createdAt` 降序索引创建成功
- [ ] 验证 `assessments.source` 索引创建成功
- [ ] 确认客户端无直读 assessments 的逻辑
- [ ] 云函数实现字段裁剪逻辑
- [ ] 权限校验逻辑测试通过
- [ ] 数据保留策略已配置

---

## 📝 版本历史

- **v2.0** (2024): 对齐前端表单字段，添加诊断、习惯、视觉、听觉、癫痫等字段；assessments 添加 source 字段区分草稿和已提交
- **v1.0**: 初始版本
