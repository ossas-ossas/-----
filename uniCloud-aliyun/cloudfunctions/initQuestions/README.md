# 初始化题目数据

此云函数用于将题目数据从 `common/questionBank.js` 导入到数据库 `questions_master` 集合。

## 使用方法

### 方法1：通过云函数调用（推荐）

在前端或云函数中调用：

```javascript
// 导入题目数据
import { questions } from '@/common/questionBank.js';

// 调用云函数初始化
const result = await uniCloud.callFunction({
  name: 'initQuestions',
  data: {
    questions: questions // 传入完整的题目数组
  }
});

console.log('初始化结果:', result);
```

### 方法2：直接修改云函数代码

1. 在 `index.js` 中导入题目数据
2. 将题目数据赋值给 `questionsData` 变量
3. 调用云函数（不需要传参）

## 注意事项

1. **权限设置**：确保数据库 schema 允许创建操作，或者临时修改权限
2. **数据格式**：题目数据需要包含以下字段：
   - `id`: 题目唯一ID（将作为 `qid` 存储）
   - `text`: 题目内容（将作为 `title` 和 `text` 存储）
   - `domain`: 领域代码
   - `subdomain`: 子领域代码
   - `ageBandKey` 或 `ageBand`: 年龄段代码

3. **去重处理**：函数会自动检查已存在的题目，避免重复插入

4. **批量插入**：每次最多插入500条，自动分批处理

## 返回结果

```javascript
{
  success: true,
  msg: "初始化完成：插入 995 条，已存在 0 条，失败 0 条",
  total: 995,
  existing: 0,
  inserted: 995,
  failed: 0
}
```



