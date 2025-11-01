// Backup created at: 2024-12-19
// Original submitAssessment function (before refactor)

'use strict';

const REQUIRED_FIELDS = ['parentName', 'contact', 'answers'];

exports.main = async (event, context) => {
  const db = uniCloud.database();
  const collection = db.collection('assessment');

  try {
    // 1) 取参与基础校验
    const {
      parentName,     // 家长姓名（必填）
      contact,        // 联系方式：手机号/微信/邮箱（必填）
      childName,      // 儿童姓名（可选）
      ageMonths,      // 月龄（可选，Number）
      mode,           // 评估模式：band/cumulative（可选）
      bands,          // 命中的年龄段数组（可选）
      answers,        // 测试数据：题目与作答（必填，Object 或 Array）
      domainScores    // 各领域统计（可选）
    } = event || {};

    for (const k of REQUIRED_FIELDS) {
      if (event[k] === undefined || event[k] === null || event[k] === '') {
        return { code: 400, msg: `缺少必填字段：${k}` };
      }
    }

    // 2) 规范化联系方式与最小脱敏（可按需调整）
    const normContact = String(contact).trim();

    // 3) 写入数据库
    const now = Date.now();
    const doc = {
      parentName: String(parentName).trim(),
      contact: normContact,
      childName: childName ? String(childName).trim() : '',
      ageMonths: Number.isFinite(ageMonths) ? Math.floor(ageMonths) : null,
      mode: mode || 'cumulative',
      bands: Array.isArray(bands) ? bands : [],
      answers,              // 建议前端按 { domainKey: [ {id, text, answer: true/false}, ... ] } 的结构传入
      domainScores: domainScores || null,
      createdAt: now,
      clientIP: context.CLIENTIP || '',
      clientUA: context.CLIENTUA || ''
    };

    const res = await collection.add(doc);
    return { code: 0, msg: 'ok', id: res.id, createdAt: now };
  } catch (err) {
    console.error('submitAssessment error:', err);
    return { code: 500, msg: 'server error', error: String(err && err.message || err) };
  }
};

