# 云函数说明文档

## 云函数列表

### 1. saveChildProfile
保存或更新儿童档案到 `child_profiles` 集合。

### 2. saveAssessment
保存评估草稿（Upsert模式）。

**功能**：
- 对每个 `childId`，只保留一条 `source='draft'` 的记录
- 如果已存在草稿，则更新；否则创建新草稿
- 计算最小统计信息（domains, ageBands, overall）
- 不包含 `notAchieved`（未达标明细）

**输入**：
```javascript
{
  childId: "xxx",
  ownerUid: "xxx", // 可选，从 context 获取
  answers: { "qid1": 1, "qid2": 0, ... }
}
```

**返回**：
```javascript
{
  ok: true,
  childId: "xxx",
  stats: {
    overall: {
      ratio: 0.75
    }
  }
}
```

### 3. submitAssessment
提交最终评估（创建新记录）。

**功能**：
- 创建新的评估记录（不覆盖草稿）
- 计算完整统计信息（domains, ageBands, overall, notAchieved）
- 计算得分百分比和发育等级（A/B/C）
- `source='submit'`

**输入**：
```javascript
{
  childId: "xxx",
  ownerUid: "xxx", // 可选，从 context 获取
  answers: { "qid1": 1, "qid2": 0, ... }
}
```

**返回**：
```javascript
{
  ok: true,
  assessmentId: "xxx",
  scorePercent: 75,
  level: "B"
}
```

## 共享工具

### common/calc.js

提供以下函数：

1. **loadQuestionsByQids(qids)**: 根据 qid 数组加载题目数据
2. **aggregate(answers, questionDocs)**: 聚合统计计算
   - 返回：`{ domains, ageBands, overall, notAchieved }`
3. **calculateLevel(scorePercent)**: 计算发育等级（A/B/C）
   - >=85 -> 'A'
   - 70-84 -> 'B'
   - else -> 'C'

## 安全特性

1. **用户身份验证**：
   - 优先从 `context.uid` 获取用户ID
   - 支持从参数传入 `ownerUid`
   - 验证用户身份匹配

2. **负载大小限制**：
   - `answers` 的键数量限制为 1500

3. **数据验证**：
   - 验证答案值为 0 或 1
   - 验证题目存在性
   - 验证必填参数

## 数据流程

```
保存草稿：
  saveAssessment(childId, answers)
    → 加载题目数据
    → 计算统计信息（不含 notAchieved）
    → Upsert draft 记录

最终提交：
  submitAssessment(childId, answers)
    → 加载题目数据
    → 计算完整统计信息（含 notAchieved）
    → 计算得分和等级
    → 创建新 submit 记录（不覆盖草稿）
```

## 测试要点

1. **草稿 Upsert**：
   - 调用 `saveAssessment` 两次相同 `childId`，应该更新同一条记录

2. **最终提交**：
   - 调用 `submitAssessment` 创建新记录（`source='submit'`）
   - 草稿记录保持不变

3. **notAchieved**：
   - 包含所有 `answer=0` 的题目
   - 每个项目包含：`qid`, `domain`, `ageBand`, `title`

## 备份文件

- `saveAssessment/index.prev.js` - 原始版本备份
- `submitAssessment/index.prev.js` - 原始版本备份

