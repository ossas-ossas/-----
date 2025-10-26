/**
 * 儿童发育评估题库
 * 支持3-6个月和6-9个月年龄段
 */

// 年龄段定义
export const ageBands = [
  { key: '1_3m', label: '1-3个月', ageMinMonths: 1, ageMaxMonths: 3 },
  { key: '3_6m', label: '3-6个月', ageMinMonths: 3, ageMaxMonths: 6 },
  { key: '6_9m', label: '6-9个月', ageMinMonths: 6, ageMaxMonths: 9 },
  { key: '9_12m', label: '9-12个月', ageMinMonths: 9, ageMaxMonths: 12 },
  { key: '12_18m', label: '12-18个月', ageMinMonths: 12, ageMaxMonths: 18 },
  { key: '18_24m', label: '18-24个月', ageMinMonths: 18, ageMaxMonths: 24 },
  { key: '24_30m', label: '24-30个月', ageMinMonths: 24, ageMaxMonths: 30 },
  { key: '30_36m', label: '30-36个月', ageMinMonths: 30, ageMaxMonths: 36 },
  { key: '36_48m', label: '36-48个月', ageMinMonths: 36, ageMaxMonths: 48 },
  { key: '48_60m', label: '48-60个月', ageMinMonths: 48, ageMaxMonths: 60 },
  { key: '60_72m', label: '60-72个月', ageMinMonths: 60, ageMaxMonths: 72 }
];

// 题目数据
export const questions = [
  // 1-3个月题目
  // 视知觉(OSV)功能发育
  { id: '1_3m-OSV-001', text: '视力为0.1,可见30公分内距离的物体,注视距离为1.5米', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-002', text: '会注视看30公分对他讲话的人脸', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-003', text: '注视距离为4~7米', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-004', text: '对亮与暗有视觉反应', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-005', text: '对快速到来的物体会眨眼睛', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-006', text: '偏好扫视轮廓而非内部(注视大方格，人脸)', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-007', text: '认识长期照顾自己的人(妈)', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-008', text: '对他吐舌数次模仿类似的动作', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-009', text: '扫描物体内部', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-010', text: '视觉注视5秒', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-011', text: '注视移动中的物体约1-3秒', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-012', text: '主动搜寻视觉刺激，好奇看', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-013', text: '目光从一个物体移向另一物体', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-014', text: '注视自己的手，看手中抓的物品', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-015', text: '仰躺时眼睛横向幅度约90度追视', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSV-016', text: '眼睛横向180度追视', domain: '感知觉', subdomain: 'OSV', ageBandKey: '1_3m', type: 'check', checked: false },

  // 听知觉(OSH)功能发育
  { id: '1_3m-OSH-001', text: '注意1000到3000赫兹(偏于听高频)的声音,(听阈值60-70DB)', domain: '感知觉', subdomain: 'OSH', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSH-002', text: '听到突发大声响引发惊吓反应(惊跳或闭眼)', domain: '感知觉', subdomain: 'OSH', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSH-003', text: '听阈值50-70分贝(DB)', domain: '感知觉', subdomain: 'OSH', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSH-004', text: '听到温柔声音，安静下来', domain: '感知觉', subdomain: 'OSH', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSH-005', text: '辨别不同的语调有不同的反应(高兴、生气)', domain: '感知觉', subdomain: 'OSH', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSH-006', text: '头转向发出声音的声源处听', domain: '感知觉', subdomain: 'OSH', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSH-007', text: '对他说话时会回应', domain: '感知觉', subdomain: 'OSH', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSH-008', text: '对他说话时，会以注视微笑、发声等响应', domain: '感知觉', subdomain: 'OSH', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSH-009', text: '感受不同方向发声并且向声源方向转头', domain: '感知觉', subdomain: 'OSH', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OSH-010', text: '音乐声知觉', domain: '感知觉', subdomain: 'OSH', ageBandKey: '1_3m', type: 'check', checked: false },

  // 触知觉(OST)功能发育
  { id: '1_3m-OST-001', text: '新生儿受到刺激时触觉敏感反射', domain: '感知觉', subdomain: 'OST', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OST-002', text: '碰到嘴边有吸吮反射', domain: '感知觉', subdomain: 'OST', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OST-003', text: '头转向被触碰的脸颊方向', domain: '感知觉', subdomain: 'OST', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OST-004', text: '碰到手心时会自动抓握', domain: '感知觉', subdomain: 'OST', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OST-005', text: '手背被抚摸,手掌短暂打开', domain: '感知觉', subdomain: 'OST', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OST-006', text: '唇部触觉发展', domain: '感知觉', subdomain: 'OST', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OST-007', text: '用嘴来感觉周围环境', domain: '感知觉', subdomain: 'OST', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OST-008', text: '手抓到任何东西都会放入口中(如安抚奶嘴)', domain: '感知觉', subdomain: 'OST', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OST-009', text: '吸吮自己双手(拳头、手指头)', domain: '感知觉', subdomain: 'OST', ageBandKey: '1_3m', type: 'check', checked: false },

  // 本体运动知觉(ISP)功能发育
  { id: '1_3m-ISP-001', text: '趴着时会有爬的动作', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-002', text: '抱直立时，脚触及平面出现踏步反射', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-003', text: '刺激嘴边，有吸吮反射', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-004', text: '刺激眼、额头，有双眼紧闭', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-005', text: '刺激手掌，有握拳', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-006', text: '刺激脚底，有缩脚', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-007', text: '会注意自己的双手', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-008', text: '感受自己身体和重力的感觉(身体歪斜会拉回来，并可以维持平衡寻找支点)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-009', text: '会抓握物品(摇铃)维持15到30秒，但抓放不自如', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-010', text: '手通常张开，手碰到东西会抓握，不能主动放松', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-011', text: '双手抓物品放入口中', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISP-012', text: '欲伸手抓面前物体时，能准确触摸', domain: '感知觉', subdomain: 'ISP', ageBandKey: '1_3m', type: 'check', checked: false },

  // 前庭平衡知觉(ISV)功能发育
  { id: '1_3m-ISV-001', text: '新生儿对于被忽然移动有明显的感觉并出现反射动作', domain: '感知觉', subdomain: 'ISV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISV-002', text: '感受到自己身体顺应重力刺激的抗拒感觉(偏离身体重力中线时)出现不自主的保护性反射动作', domain: '感知觉', subdomain: 'ISV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISV-003', text: '平稳且节律性的摇晃动作感到舒服', domain: '感知觉', subdomain: 'ISV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISV-004', text: '对于被动扶持的上、下摇晃动作感到兴奋', domain: '感知觉', subdomain: 'ISV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISV-005', text: '仰躺时，抗地心抬头45度约1-3秒', domain: '感知觉', subdomain: 'ISV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISV-006', text: '趴姿下，抗地心抬头', domain: '感知觉', subdomain: 'ISV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISV-007', text: '翻身时会抬头、挺胸', domain: '感知觉', subdomain: 'ISV', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-ISV-008', text: '扶持双肩坐立时，头颈可直立(不垂头)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '1_3m', type: 'check', checked: false },

  // 躯肢体粗大动作(GM)功能发育
  { id: '1_3m-GM-001', text: '仰卧摆位时，可情境诱导自主双手、双脚中线不停乱踢3下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-GM-002', text: '扶持双肩坐立摆位下，可情境诱导自主头颈中线直立(不垂头)2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '1_3m', type: 'check', checked: false },

  // 双上肢粗大动作(UE)功能发育 - 视动协调(UEM)
  { id: '1_3m-UEM-001', text: '手因抓握反射而握拳', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-UEM-002', text: '抚摩手背，手掌会短暂打开', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-UEM-003', text: '手拿到嘴里吸', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-UEM-004', text: '可维持较长抓握', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-UEM-005', text: '手掌大致都张开，抓握反射消失', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-UEM-006', text: '两手在中线碰在一起', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '1_3m', type: 'check', checked: false },

  // 精细动作(FM)功能发育
  { id: '1_3m-FM-001', text: '眼睛会注视手', domain: '精细动作', subdomain: 'FM', ageBandKey: '1_3m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与人互动(SIP)
  { id: '1_3m-SIP-001', text: '当被抱起时会安静或停止哭闹', domain: '社会互动', subdomain: 'SIP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIP-002', text: '注视的人离开会哭', domain: '社会互动', subdomain: 'SIP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIP-003', text: '对人无差别反应', domain: '社会互动', subdomain: 'SIP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIP-004', text: '用哭、微笑、咿呀语等来获取父母或照顾者的亲近', domain: '社会互动', subdomain: 'SIP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIP-005', text: '听到说话或摇晃时，会安静', domain: '社会互动', subdomain: 'SIP', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIP-006', text: '对陌生人退缩', domain: '社会互动', subdomain: 'SIP', ageBandKey: '1_3m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与其他互动(SIE)
  { id: '1_3m-SIE-001', text: '拍打镜中影像', domain: '社会互动', subdomain: 'SIE', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIE-002', text: '当看到、摸到奶瓶时会安静', domain: '社会互动', subdomain: 'SIE', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIE-003', text: '会用不同的哭来表达需求', domain: '社会互动', subdomain: 'SIE', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIE-004', text: '会注视别人', domain: '社会互动', subdomain: 'SIE', ageBandKey: '1_3m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 情绪与自我(SIS)
  { id: '1_3m-SIS-001', text: '只有两种反应：兴奋，安静', domain: '社会互动', subdomain: 'SIS', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIS-002', text: '会自发的微笑', domain: '社会互动', subdomain: 'SIS', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIS-003', text: '会哭(惊吓、痛)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIS-004', text: '发展出两种情绪：愉快、痛苦', domain: '社会互动', subdomain: 'SIS', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIS-005', text: '会笑出声', domain: '社会互动', subdomain: 'SIS', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIS-006', text: '对人感兴趣，特别是婴儿', domain: '社会互动', subdomain: 'SIS', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-SIS-007', text: '开始区分自己的身体与他人的身体', domain: '社会互动', subdomain: 'SIS', ageBandKey: '1_3m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MAN) - 非动作认知(MN)
  { id: '1_3m-MAN-001', text: '倾向与大而显眼的图案', domain: '认知', subdomain: 'MAN', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MAN-002', text: '对红色移动物体比较敏感', domain: '认知', subdomain: 'MAN', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MAN-003', text: '除了自发的微笑外，还容易被逗笑', domain: '认知', subdomain: 'MAN', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MAN-004', text: '能注视到面前的新鲜事物，并且目光会随其移动', domain: '认知', subdomain: 'MAN', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MAN-005', text: '会用眼睛追随走来走去的人', domain: '认知', subdomain: 'MAN', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MAN-006', text: '会认真听别人与自己讲话', domain: '认知', subdomain: 'MAN', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MAN-007', text: '能持久注视物体', domain: '认知', subdomain: 'MAN', ageBandKey: '1_3m', type: 'check', checked: false },

  // 认知(M)功能发育 - 记忆(MRN) - 非动作认知(MN)
  { id: '1_3m-MRN-001', text: '能够记住妈妈脸的轮廓', domain: '认知', subdomain: 'MRN', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MRN-002', text: '当凝视的物品从眼前消失时会用眼睛去寻找', domain: '认知', subdomain: 'MRN', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MRN-003', text: '能记住家人脸的模样', domain: '认知', subdomain: 'MRN', ageBandKey: '1_3m', type: 'check', checked: false },

  // 认知(M)功能发育 - 推理(MIN) - 非动作认知(MN)
  { id: '1_3m-MIN-001', text: '能区分不同性质的声音并寻找声源', domain: '认知', subdomain: 'MIN', ageBandKey: '1_3m', type: 'check', checked: false },

  // 口腔动作(OM)功能发育
  { id: '1_3m-OM-001', text: '能有节奏吸吮你的手指头或乳头', domain: '口腔动作', subdomain: 'OM', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OM-002', text: '用手指头或乳头触碰脸颊，头会随着转动', domain: '口腔动作', subdomain: 'OM', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OM-003', text: '舌头、嘴巴、下巴一起动', domain: '口腔动作', subdomain: 'OM', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OM-004', text: '舌头简单伸出和收回反射动作进食', domain: '口腔动作', subdomain: 'OM', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-OM-005', text: '舌头以"前后动"的方式来运动，吸一口吞一口', domain: '口腔动作', subdomain: 'OM', ageBandKey: '1_3m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语理解(听)(MLUY)
  { id: '1_3m-MLUY-001', text: '注意单音及语调的类型,观察对方嘴巴(对语调反应)', domain: '语言', subdomain: 'MLUY', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MLUY-002', text: '偏爱音乐声、人声', domain: '语言', subdomain: 'MLUY', ageBandKey: '1_3m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语表达(说)(MLEY)
  { id: '1_3m-MLEY-001', text: '哭声，对大噪音有反应（如眨眼、停止一个动作、眼睛到处移动或是一个惊惧的反应）', domain: '语言', subdomain: 'MLEY', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MLEY-002', text: '不同型式的哭声、单一音ɑi、ei、ou', domain: '语言', subdomain: 'MLEY', ageBandKey: '1_3m', type: 'check', checked: false },
  { id: '1_3m-MLEY-003', text: '成人逗引时会咿呀发音，笑出声', domain: '语言', subdomain: 'MLEY', ageBandKey: '1_3m', type: 'check', checked: false },

  // 3-6个月题目
  // 视知觉(OSV)功能发育
  { id: '3_6m-OSV-001', text: '看到东西会伸手拿', domain: '感知觉', subdomain: 'OSV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSV-002', text: '看不到人时会哭，看到人时停止哭', domain: '感知觉', subdomain: 'OSV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSV-003', text: '对四大类别色彩光谱有感觉(红、蓝、绿、黄)', domain: '感知觉', subdomain: 'OSV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSV-004', text: '看30公分距离外，上下左右移动物品', domain: '感知觉', subdomain: 'OSV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSV-005', text: '到陌生地方会好奇四处张望', domain: '感知觉', subdomain: 'OSV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSV-006', text: '拿玩具给他显得高兴活泼起来', domain: '感知觉', subdomain: 'OSV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSV-007', text: '寻找掉落的东西', domain: '感知觉', subdomain: 'OSV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSV-008', text: '出现玩躲猫猫的游戏', domain: '感知觉', subdomain: 'OSV', ageBandKey: '3_6m', type: 'check', checked: false },

  // 听知觉(OSH)功能发育
  { id: '3_6m-OSH-001', text: '听阈值40-50分贝(DB)', domain: '感知觉', subdomain: 'OSH', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSH-002', text: '对他的名字有回应', domain: '感知觉', subdomain: 'OSH', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSH-003', text: '辨识父母的声音', domain: '感知觉', subdomain: 'OSH', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSH-004', text: '听到逐渐接近的脚步声而兴奋', domain: '感知觉', subdomain: 'OSH', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSH-005', text: '可听出熟悉声音中的改变', domain: '感知觉', subdomain: 'OSH', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSH-006', text: '头会迅速转向声源', domain: '感知觉', subdomain: 'OSH', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSH-007', text: '对他说话时，尝试模仿发音反应', domain: '感知觉', subdomain: 'OSH', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OSH-008', text: '听到叫自己名字有反应', domain: '感知觉', subdomain: 'OSH', ageBandKey: '3_6m', type: 'check', checked: false },

  // 触知觉(OST)功能发育
  { id: '3_6m-OST-001', text: '双手与嘴共同来感觉周围环境', domain: '感知觉', subdomain: 'OST', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OST-002', text: '口腔接受半流质的食物', domain: '感知觉', subdomain: 'OST', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OST-003', text: '双手愿意各自抓住物品，并放入口中感觉', domain: '感知觉', subdomain: 'OST', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OST-004', text: '双手互相的搓、捏着玩、吸吮双手', domain: '感知觉', subdomain: 'OST', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OST-005', text: '吃手吃脚', domain: '感知觉', subdomain: 'OST', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OST-006', text: '可吃软食、饼干等', domain: '感知觉', subdomain: 'OST', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OST-007', text: '出现伸手拿玩具玩', domain: '感知觉', subdomain: 'OST', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OST-008', text: '触摸不同形状、不同质感的物品', domain: '感知觉', subdomain: 'OST', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OST-009', text: '咬玩具', domain: '感知觉', subdomain: 'OST', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OST-010', text: '出现将玩具放入口中', domain: '感知觉', subdomain: 'OST', ageBandKey: '3_6m', type: 'check', checked: false },

  // 本体运动知觉(ISP)功能发育
  { id: '3_6m-ISP-001', text: '玩手、玩脚', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-002', text: '口腔爱咬玩具', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-003', text: '手、嘴和眼睛相互配合探索自己的身体、玩具、周围环境', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-004', text: '双手抱住自己的脚', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-005', text: '尝试蠕爬,原地打转', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-006', text: '双手各自自主的张开手拿玩具', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-007', text: '手中握玩具15秒', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-008', text: '双手握杯自己喝奶', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-009', text: '吸奶时不会漏奶(双唇力气)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-010', text: '拍手时双手能在中线互碰', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-011', text: '手的旁边放有物品，会去拿(如：摇铃)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-012', text: '放下手中之物，换拿另一物', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISP-013', text: '一手握有物品，会用另一手去拿另一物品', domain: '感知觉', subdomain: 'ISP', ageBandKey: '3_6m', type: 'check', checked: false },

  // 前庭平衡知觉(ISV)功能发育
  { id: '3_6m-ISV-001', text: '看到东西会伸手拿(与空间概念有关连)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISV-002', text: '趴着时，会一手撑上半身重量，另一手伸向玩具，玩玩具', domain: '感知觉', subdomain: 'ISV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISV-003', text: '拿着玩具敲敲打打，会摇铃', domain: '感知觉', subdomain: 'ISV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISV-004', text: '撑住他的背部，头部直立并可以转头', domain: '感知觉', subdomain: 'ISV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISV-005', text: '俯趴摆位，双手肘协同支撑观看前方喜好物品或视频', domain: '感知觉', subdomain: 'ISV', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-ISV-006', text: '俯趴摆位，双上肢协同支撑观看前方喜好物品或视频', domain: '感知觉', subdomain: 'ISV', ageBandKey: '3_6m', type: 'check', checked: false },

  // 躯肢体粗大动作(GM)功能发育
  { id: '3_6m-GM-001', text: '俯趴摆位下，可情境诱导自主从俯趴姿势至仰躺姿势翻身1下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-GM-002', text: '仰卧摆位下，可情境诱导自主从仰躺姿势至俯趴姿势翻身1下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-GM-003', text: '俯趴摆位下，可情境诱导双手肘协同支撑地面2秒观看前方喜好物品或视频的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-GM-004', text: '腹部及下半身俯趴楔形垫摆位下，可情境诱导双上肢协同支撑地面2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '3_6m', type: 'check', checked: false },

  // 双上肢粗大动作(UE)功能发育 - 视动协调(UEM)
  { id: '3_6m-UEM-001', text: '看手抓东西，取物入口', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-UEM-002', text: '用无名指、小指和手掌抓住东西', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-UEM-003', text: '两手可各自抓物', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-UEM-004', text: '用姆指以外的四指和手掌抓住东西', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-UEM-005', text: '会敲打玩具', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-UEM-006', text: '用姆指、食指、中指和手掌抓住较大的东西', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-UEM-007', text: '手抓脚放在口中', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '3_6m', type: 'check', checked: false },

  // 精细动作(FM)功能发育
  { id: '3_6m-FM-001', text: '看物伸手触摸', domain: '精细动作', subdomain: 'FM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-FM-002', text: '伸出手时会准确的碰触物体', domain: '精细动作', subdomain: 'FM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-FM-003', text: '物体在视野内会跨中线取物', domain: '精细动作', subdomain: 'FM', ageBandKey: '3_6m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与人互动(SIP)
  { id: '3_6m-SIP-001', text: '婴儿会相互注视甚至触摸，但视人如物且更喜欢物体', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-002', text: '主动伸手要喜欢的人抱', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-003', text: '看到人有反应(如高兴、笑、出声等)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-004', text: '有人靠近会表现出很高兴', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-005', text: '听到熟悉人的脚步声会减少哭', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-006', text: '对人有不同的反应', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-007', text: '会注视与其说话的人', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-008', text: '听到大人生气的声音会哭', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-009', text: '会和同伴相互触摸、观望', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-010', text: '会分辨父母与其他人', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-011', text: '会对熟悉的人伸出手', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-012', text: '抓痒、抱或语言游戏时会笑', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-013', text: '对大人的笑脸会以笑回应', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-014', text: '注视大人离开或房间走动', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-015', text: '对熟悉的人比对陌生人有更多的反应', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-016', text: '会制造声音、笑、眼神接触或身体语言来吸引注意', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-017', text: '听到说话会转向说话者', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-018', text: '对熟悉人较常出声笑及要求抱', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-019', text: '期待有人与他亲近(如：抱他)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-020', text: '做出吸引别人注意的事', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-021', text: '会比大人先笑', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-022', text: '婴儿间彼此微笑和发出"呀呀"声音', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-023', text: '会主动摸熟悉大人的脸', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIP-024', text: '此时最爱与人交往', domain: '社会互动', subdomain: 'SIP', ageBandKey: '3_6m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与其他互动(SIE)
  { id: '3_6m-SIE-001', text: '个人或在陌生环境时会哭', domain: '社会互动', subdomain: 'SIE', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIE-002', text: '会对镜子中的影像笑', domain: '社会互动', subdomain: 'SIE', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIE-003', text: '会注意其他孩子的存在', domain: '社会互动', subdomain: 'SIE', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIE-004', text: '会用注视、抓或语言表达对玩具或物品的兴趣', domain: '社会互动', subdomain: 'SIE', ageBandKey: '3_6m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 情绪与自我(SIS)
  { id: '3_6m-SIS-001', text: '能根据外界事物作出相应的表情', domain: '社会互动', subdomain: 'SIS', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIS-002', text: '会转移专注力以调节情绪', domain: '社会互动', subdomain: 'SIS', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIS-003', text: '会主动笑', domain: '社会互动', subdomain: 'SIS', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIS-004', text: '发展出担忧的情绪', domain: '社会互动', subdomain: 'SIS', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIS-005', text: '痛苦的情绪会发展出，有害怕，厌恶，愤怒，悲伤，恐惧', domain: '社会互动', subdomain: 'SIS', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIS-006', text: '听懂自己名字', domain: '社会互动', subdomain: 'SIS', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIS-007', text: '自我意识开始发展', domain: '社会互动', subdomain: 'SIS', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-SIS-008', text: '会自己拿饼干吃', domain: '社会互动', subdomain: 'SIS', ageBandKey: '3_6m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 非动作认知(MAN)
  { id: '3_6m-MAN-001', text: '对周围玩具和物品会表示出浓厚的兴趣', domain: '认知', subdomain: 'MAN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MAN-002', text: '开始出现主动的视觉集中', domain: '认知', subdomain: 'MAN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MAN-003', text: '手中玩具掉了会寻找', domain: '认知', subdomain: 'MAN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MAN-004', text: '听到妈妈叫自己会努力的用眼睛去寻找', domain: '认知', subdomain: 'MAN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MAN-005', text: '会模仿爸爸妈妈的表情', domain: '认知', subdomain: 'MAN', ageBandKey: '3_6m', type: 'check', checked: false },

  // 认知(M)功能发育 - 记忆(MR) - 非动作认知(MRN)
  { id: '3_6m-MRN-001', text: '能识别妈妈和面容熟悉的人以及经常玩的玩具', domain: '认知', subdomain: 'MRN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MRN-002', text: '能够记住父母的行为方式，并会受到不良刺激的影响', domain: '认知', subdomain: 'MRN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MRN-003', text: '能觉察到玩具被别人拿走(而4-5个月时不能觉察少什么)', domain: '认知', subdomain: 'MRN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MRN-004', text: '能逐渐记住简单的事情，不提醒也可以重复相同的步骤', domain: '认知', subdomain: 'MRN', ageBandKey: '3_6m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 非动作认知(MCN)
  { id: '3_6m-MCN-001', text: '对物体开始有完整的概念，当他看到一只手从沙发后伸出来时，就知道沙发后有人', domain: '认知', subdomain: 'MCN', ageBandKey: '3_6m', type: 'check', checked: false },

  // 认知(M)功能发育 - 推理(MI) - 非动作认知(MIN)
  { id: '3_6m-MIN-001', text: '对生气或大声有反应(如：会哭)', domain: '认知', subdomain: 'MIN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MIN-002', text: '辨别陌生人能力加强', domain: '认知', subdomain: 'MIN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MIN-003', text: '有东西挡着自己视线时会试着拿开', domain: '认知', subdomain: 'MIN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MIN-004', text: '能理解大人对自己说话的态度', domain: '认知', subdomain: 'MIN', ageBandKey: '3_6m', type: 'check', checked: false },

  // 口腔动作(OM)功能发育
  { id: '3_6m-OM-001', text: '脸颊与嘴唇的肌肉控制能力有明显进步', domain: '口腔动作', subdomain: 'OM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OM-002', text: '舌头仍以前后动为主，咀嚼动作仍不成熟', domain: '口腔动作', subdomain: 'OM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OM-003', text: '看汤匙进入口中，舌头会吮动', domain: '口腔动作', subdomain: 'OM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OM-004', text: '吸奶、吞咽还不行，有时会吐', domain: '口腔动作', subdomain: 'OM', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-OM-005', text: '口腔动作仍是反射动作—流口水、牛奶溢出、哽呛动作不协调', domain: '口腔动作', subdomain: 'OM', ageBandKey: '3_6m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语理解(听)(MLUY)
  { id: '3_6m-MLUY-001', text: '对他人的语音有回应', domain: '语言', subdomain: 'MLUY', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MLUY-002', text: '对他人语调的变化有反应(如：愤怒、嘻笑、悲伤)', domain: '语言', subdomain: 'MLUY', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MLUY-003', text: '对自己的名字有反应', domain: '语言', subdomain: 'MLUY', ageBandKey: '3_6m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言理解(MLUN)
  { id: '3_6m-MLUN-001', text: '认得妈妈', domain: '语言', subdomain: 'MLUN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MLUN-002', text: '对友善的脸报以微笑', domain: '语言', subdomain: 'MLUN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MLUN-003', text: '注视物品', domain: '语言', subdomain: 'MLUN', ageBandKey: '3_6m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语表达(说)(MLEY)
  { id: '3_6m-MLEY-001', text: '自我仿音，能用不同的声音来表达需求', domain: '语言', subdomain: 'MLEY', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MLEY-002', text: '夜间哭声减少', domain: '语言', subdomain: 'MLEY', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MLEY-003', text: '进入呀呀学语阶段，能将辅音和元音结合连续发出（如辅音b和元音a结合连续发出形成bɑ-bɑ-bɑ，mɑ-mɑ-mɑ）类似爸、妈的单音节语音', domain: '语言', subdomain: 'MLEY', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MLEY-004', text: '看见熟人、玩具能发出声音', domain: '语言', subdomain: 'MLEY', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MLEY-005', text: '会喃喃儿语', domain: '语言', subdomain: 'MLEY', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MLEY-006', text: '白天哭声减少', domain: '语言', subdomain: 'MLEY', ageBandKey: '3_6m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言表达(MLEN)
  { id: '3_6m-MLEN-001', text: '用眼睛寻找', domain: '语言', subdomain: 'MLEN', ageBandKey: '3_6m', type: 'check', checked: false },
  { id: '3_6m-MLEN-002', text: '以动作表情与人打招呼', domain: '语言', subdomain: 'MLEN', ageBandKey: '3_6m', type: 'check', checked: false },

  // 6-9个月题目
  // 视知觉(OSV)功能发育
  { id: '6_9m-OSV-001', text: '认识家人(主要照顾的几人)', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-002', text: '可从大照片中认出妈妈', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-003', text: '开始对陌生人出现怕生害羞的反应', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-004', text: '随着大人的视线或手势，而注意某人或物', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-005', text: '会用手指要去的方向', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-006', text: '会找藏在手帕正下的玩具', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-007', text: '面对陌生人会害羞、害怕', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-008', text: '会主动拿着手帕玩躲猫猫的游戏', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-009', text: '仰躺抬头巡视四周', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-010', text: '前方有玩具会准确伸手取拿(实物)', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-011', text: '看到喂食时有张口期待的反应', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-012', text: '以各种可能的移位方式，到达目的拿自己想要的东西', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-013', text: '能跟别人一起玩滚球、拍气球等', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-014', text: '挥手表示再见(动作模仿)', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSV-015', text: '面对陌生大人会害羞怕', domain: '感知觉', subdomain: 'OSV', ageBandKey: '6_9m', type: 'check', checked: false },

  // 听知觉(OSH)功能发育
  { id: '6_9m-OSH-001', text: '听阈值35-40分贝(DB)', domain: '感知觉', subdomain: 'OSH', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSH-002', text: '会模仿发某些音', domain: '感知觉', subdomain: 'OSH', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSH-003', text: '寻找侧面、下面的声源', domain: '感知觉', subdomain: 'OSH', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSH-004', text: '放在耳边较少声音会寻找', domain: '感知觉', subdomain: 'OSH', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSH-005', text: '对动物叫声、车声、下雨声表示关心', domain: '感知觉', subdomain: 'OSH', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSH-006', text: '隔壁传来声或远处呼唤他的名字可立即转头', domain: '感知觉', subdomain: 'OSH', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSH-007', text: '无意听到某种声会尝试模仿发音', domain: '感知觉', subdomain: 'OSH', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSH-008', text: '听到熟悉的声音、语汇会反应(人物、吃的、玩具等)', domain: '感知觉', subdomain: 'OSH', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OSH-009', text: '模仿发简单熟悉的声音', domain: '感知觉', subdomain: 'OSH', ageBandKey: '6_9m', type: 'check', checked: false },

  // 触知觉(OST)功能发育
  { id: '6_9m-OST-001', text: '身体、双手与嘴共同感觉周围环境', domain: '感知觉', subdomain: 'OST', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OST-002', text: '出现四处爬行感觉', domain: '感知觉', subdomain: 'OST', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OST-003', text: '出现手掌到处探索摸、玩', domain: '感知觉', subdomain: 'OST', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OST-004', text: '出现手握挤、转物品感觉', domain: '感知觉', subdomain: 'OST', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OST-005', text: '触觉感觉，用手指指尖操作(夹、捡、撕等活动)', domain: '感知觉', subdomain: 'OST', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OST-006', text: '区分冷热(吃过冷与过热的奶、水时会哭)', domain: '感知觉', subdomain: 'OST', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OST-007', text: '尿湿时会哭(区分干湿)', domain: '感知觉', subdomain: 'OST', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-OST-008', text: '对轻拍或拥抱等安抚性刺激，会表现愉悦的感觉', domain: '感知觉', subdomain: 'OST', ageBandKey: '6_9m', type: 'check', checked: false },

  // 本体运动知觉(ISP)功能发育
  { id: '6_9m-ISP-001', text: '出现扶着跪，腿有力的跪立', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-002', text: '手腕会旋转', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-003', text: '会抓放东西(用力、方向适当)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-004', text: '能自如的释放手中之物或掷出手中之物', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-005', text: '能自己拿东西吃', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-006', text: '会把简单的东西组合起来', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-007', text: '一手支撑一手拿东西，双手做不一样动作', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-008', text: '手部协调活动，交换拿东西', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-009', text: '双手拿物品互相敲击', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-010', text: '双手双膝支撑(四点)爬行', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-011', text: '用手指着远方物体，想办法移动身体去拿', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-012', text: '模仿做简单的动作', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-013', text: '手腕与手指独立动作', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-014', text: '配合穿衣。(9个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISP-015', text: '肢体表达：手指、手遮、手挥。(9个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '6_9m', type: 'check', checked: false },

  // 前庭平衡知觉(ISV)功能发育
  { id: '6_9m-ISV-001', text: '灵活由仰卧转换成俯卧姿', domain: '感知觉', subdomain: 'ISV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISV-002', text: '灵活的翻滚动身体达到移位的目的', domain: '感知觉', subdomain: 'ISV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISV-003', text: '灵活从躺姿翻转成坐姿', domain: '感知觉', subdomain: 'ISV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISV-004', text: '灵活爬行移位拿东西', domain: '感知觉', subdomain: 'ISV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISV-005', text: '灵活从仰或俯卧姿翻身坐起，转换趴姿或爬姿', domain: '感知觉', subdomain: 'ISV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISV-006', text: '坐左右晃的电动车保持头直立', domain: '感知觉', subdomain: 'ISV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISV-007', text: '失去平衡时出现自我保护反应，会伸手预防自己倒下', domain: '感知觉', subdomain: 'ISV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISV-008', text: '由背后往后拉倾斜，会将头及手向前以取得身体平衡', domain: '感知觉', subdomain: 'ISV', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-ISV-009', text: '坐姿双手玩玩具时，能维持坐姿平衡', domain: '感知觉', subdomain: 'ISV', ageBandKey: '6_9m', type: 'check', checked: false },

  // 躯肢体粗大动作(GM)功能发育
  { id: '6_9m-GM-001', text: '盘坐姿势摆位下，可情境诱导双上肢协同支撑地面2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-002', text: '跪坐姿势摆位下，可情境诱导双上肢协同支撑地面2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-003', text: '可情境诱导独立维持中线平面椅具(无靠背)坐立姿2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-004', text: '下半身俯趴楔形垫及双上肢支撑地面摆位下，可情境诱导双上肢交替玩弄物品3下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-005', text: '双手部被动扶持摆位下，可情境诱导维持中线站立姿2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-006', text: '双手部被动扶持摆位下，可情境诱导维持中线高跪姿2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-007', text: '双手部被动扶持摆位下，可情境诱导维持中线向前跪走3步的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-008', text: '俯趴地面摆位下，可情境诱导双上肢交替支撑地面并向后坐立起1下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-009', text: '可情境诱导独立维持中线跪坐姿(双手无保护性支撑地面)2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-010', text: '俯趴摆位下，可情境诱导维持中线四点支撑爬姿2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-011', text: '独立跪坐姿摆位下，可情境诱导双上肢交替玩弄前方物品3下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-GM-012', text: '双手保护性扶持抓握物品摆位下，可情境诱导中线高跪姿2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '6_9m', type: 'check', checked: false },

  // 双上肢粗大动作(UE)功能发育 - 视动协调(UEM)
  { id: '6_9m-UEM-001', text: '具备手眼协调能力', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-002', text: '将玩具由一手移至另一手', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-003', text: '用拇指、食指、中指和手掌抓住较小东西', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-004', text: '自己拿饼干吃', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-005', text: '用拇指、食指和中指抓拿东西', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-006', text: '能控制释放手中物，掷出手中物', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-007', text: '用姆指和食指的内侧面取物', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-008', text: '手指和手腕能独立做动作', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-009', text: '双手各自玩玩具，相互敲打', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-010', text: '手腕可稍向上翘', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-011', text: '连续拍掌3次', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },
  { id: '6_9m-UEM-012', text: '能依物品重量大小调整抓握能力', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '6_9m', type: 'check', checked: false },

  // 双上肢粗大动作(UE)功能发育 - 操作技能(UES)
  { id: '6_9m-UES-001', text: '用一手抓纸揉成一团', domain: '粗大动作', subdomain: 'UES', ageBandKey: '6_9m', type: 'check', checked: false },

  // 精细动作(FM)功能发育
  { id: '6_9m-FM-001', text: '在知道物体的方向，不用眼看可拿到物', domain: '精细动作', subdomain: 'FM', ageBandKey: '6_9m', type: 'check', checked: false },

  // 9-12个月题目
  // 视知觉(OSV)功能发育
  { id: '9_12m-OSV-001', text: '视觉对比敏感度，达到成人水平', domain: '感知觉', subdomain: 'OSV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OSV-002', text: '会持续注视物品的去向', domain: '感知觉', subdomain: 'OSV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OSV-003', text: '能将图形积木放入积木凹槽内', domain: '感知觉', subdomain: 'OSV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OSV-004', text: '当他的面把东西藏起来，会去寻找', domain: '感知觉', subdomain: 'OSV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OSV-005', text: '在注视下把玩具藏起来，过一阵会去寻找(14个月)', domain: '感知觉', subdomain: 'OSV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OSV-006', text: '能记住东西摆放的位置(14个月)', domain: '感知觉', subdomain: 'OSV', ageBandKey: '9_12m', type: 'check', checked: false },

  // 听知觉(OSH)功能发育
  { id: '9_12m-OSH-001', text: '听阈值25-35分贝(DB)', domain: '感知觉', subdomain: 'OSH', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OSH-002', text: '听到叫别人的名字会反应', domain: '感知觉', subdomain: 'OSH', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OSH-003', text: '听到大部分物品的名称会反应', domain: '感知觉', subdomain: 'OSH', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OSH-004', text: '听到叫他时会过来(包含滚动、爬行、跪走、走路)', domain: '感知觉', subdomain: 'OSH', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OSH-005', text: '会遵照听到的指令拿玩具给某人', domain: '感知觉', subdomain: 'OSH', ageBandKey: '9_12m', type: 'check', checked: false },

  // 触知觉(OST)功能发育
  { id: '9_12m-OST-001', text: '把玩具放入口中的机率逐渐减少', domain: '感知觉', subdomain: 'OST', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OST-002', text: '触觉和其他感觉联系在一起使用，通过看、听、摸顺利的完成任务', domain: '感知觉', subdomain: 'OST', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OST-003', text: '能感觉到或粗略指出被触碰的身体部位', domain: '感知觉', subdomain: 'OST', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OST-004', text: '通过不断的触摸，简单理解物品的用法和玩法', domain: '感知觉', subdomain: 'OST', ageBandKey: '9_12m', type: 'check', checked: false },

  // 本体运动知觉(ISP)功能发育
  { id: '9_12m-ISP-001', text: '闭眼后会粗略指出身体部位(头、脚、手等)(12个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-002', text: '扶家具可站立起和行走取物(10个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-003', text: '站立时，脚支撑与平衡身体(11个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-004', text: '把玩具粗略地放入指定的位置', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-005', text: '动作模仿-用肢体表示喝水、吃饭(正确使用日常物品)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-006', text: '指尖有力，可撕纸(10个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-007', text: '双侧同向动作敲打，举手', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-008', text: '食指伸直按开关，其余手指弯曲', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-009', text: '模仿连续拍手', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-010', text: '双侧协同灵活操作(用力得当、方向准确)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-011', text: '指尖用力可脱下袜子', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISP-012', text: '会自己喂食', domain: '感知觉', subdomain: 'ISP', ageBandKey: '9_12m', type: 'check', checked: false },

  // 前庭平衡知觉(ISV)功能发育
  { id: '9_12m-ISV-001', text: '熟练爬行保持身体的平衡', domain: '感知觉', subdomain: 'ISV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISV-002', text: '自由转移姿势(坐、站、爬等)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISV-003', text: '可攀物可站起来', domain: '感知觉', subdomain: 'ISV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISV-004', text: '站立跨出1步，扑入大人怀中', domain: '感知觉', subdomain: 'ISV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISV-005', text: '可跨步行走姿态(用双脚来支撑与维持平衡身体)(12个月)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISV-006', text: '由前方将他向后推45度，一或双手向后支撑不致跌倒', domain: '感知觉', subdomain: 'ISV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISV-007', text: '转身拿背后的玩具不会失去平衡', domain: '感知觉', subdomain: 'ISV', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-ISV-008', text: '独立站立姿1分钟不会失去平衡', domain: '感知觉', subdomain: 'ISV', ageBandKey: '9_12m', type: 'check', checked: false },

  // 躯肢体粗大动作(GM)功能发育
  { id: '9_12m-GM-001', text: '可情境诱导独立维持中线爬行3步的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-GM-002', text: '双手自主扶持高位固定物品摆位下，可情境诱导维持中线高跪姿2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-GM-003', text: '可情境诱导维持中线站立姿2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-GM-004', text: '可情境诱导维持中线向前行走3步的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '9_12m', type: 'check', checked: false },

  // 双上肢粗大动作(UE)功能发育 - 视动协调(UEM)
  { id: '9_12m-UEM-001', text: '约略出惯用手(10个月)', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-UEM-002', text: '一手握有一物后再拿第二物', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-UEM-003', text: '会旋转手腕', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-UEM-004', text: '用一手抓两样物品', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-UEM-005', text: '能丢东西', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '9_12m', type: 'check', checked: false },

  // 双上肢粗大动作(UE)功能发育 - 操作技能(UES)
  { id: '9_12m-UES-001', text: '适当的握住蜡笔', domain: '粗大动作', subdomain: 'UES', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-UES-002', text: '模仿拿笔乱涂鸦(12个月)', domain: '粗大动作', subdomain: 'UES', ageBandKey: '9_12m', type: 'check', checked: false },

  // 精细动作(FM)功能发育
  { id: '9_12m-FM-001', text: '会翻厚书一次一页(12个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-FM-002', text: '会推玩小汽车', domain: '精细动作', subdomain: 'FM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-FM-003', text: '指尖可持续用力', domain: '精细动作', subdomain: 'FM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-FM-004', text: '会悬腕用拇食指取物', domain: '精细动作', subdomain: 'FM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-FM-005', text: '会用姆指及食指尖抓小物品', domain: '精细动作', subdomain: 'FM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-FM-006', text: '把东西放在容器里', domain: '精细动作', subdomain: 'FM', ageBandKey: '9_12m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与人互动(SIP)
  { id: '9_12m-SIP-001', text: '会跟着别人的动作，以单纯会的动作或简单的声音做反应', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-002', text: '会相互微笑', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-003', text: '学走时怕与母亲分开', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-004', text: '会模仿成人一些简单手势和语言', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-005', text: '当别人笑时，会重复表演(如：敲东西)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-006', text: '能和大人挥手再见', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-007', text: '会对别人的警告而抑制自己行为', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-008', text: '会学习其他儿童的行为和声音', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-009', text: '对大人的逗弄会点头、动嘴、伸舌及摆动身体', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-010', text: '见陌生人会害羞', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-011', text: '会和其他小孩一起玩', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-012', text: '见到陌生人不再惊恐，会依大人吩咐拍手、再见', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-013', text: '会牙牙学语回应父母的话', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-014', text: '会想动手触摸对方', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-015', text: '会在要求下把物品给人', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-016', text: '会用情绪与大人沟通(如：用发脾气表达想睡觉)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-017', text: '会出现互动的行为(如：大笑、打手势、模仿)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIP-018', text: '开始与大人玩平衡游戏', domain: '社会互动', subdomain: 'SIP', ageBandKey: '9_12m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与其他互动(SIE)
  { id: '9_12m-SIE-001', text: '会抓别人衣服、玩具', domain: '社会互动', subdomain: 'SIE', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIE-002', text: '没人管时，会做自己的事', domain: '社会互动', subdomain: 'SIE', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIE-003', text: '会以手指出要去的地方或东西', domain: '社会互动', subdomain: 'SIE', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIE-004', text: '会抓汤匙', domain: '社会互动', subdomain: 'SIE', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIE-005', text: '可拉下头上的帽子', domain: '社会互动', subdomain: 'SIE', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIE-006', text: '会抱怨失去玩具或与大人分开', domain: '社会互动', subdomain: 'SIE', ageBandKey: '9_12m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 情绪与自我(SIS)
  { id: '9_12m-SIS-001', text: '理解大人脸上的表情是高兴还是生气', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIS-002', text: '快乐又可以分为是高兴还是喜欢', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIS-003', text: '会逃避或接近来调节情绪', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIS-004', text: '感情更丰富，初步有害怕、生气、喜爱、忌妒等情感', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIS-005', text: '能解读他人情绪的讯息以决定自己的行为', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIS-006', text: '移情出现:能对他人的情绪有所认识而共鸣或响应(如：安慰他人)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIS-007', text: '对镜子感兴趣但对镜中的自我不感兴趣', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIS-008', text: '会通过动作和身体的一致性认出自己', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIS-009', text: '会认识自己是永久存在的，具有稳定、连续的特征', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIS-010', text: '听到名字时，会知道有反应(如：停止活动注意听)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-SIS-011', text: '对镜中自我形象很感兴趣', domain: '社会互动', subdomain: 'SIS', ageBandKey: '9_12m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 非动作认知(MAN)
  { id: '9_12m-MAN-001', text: '对感兴趣的事物会长时间的观察', domain: '认知', subdomain: 'MAN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MAN-002', text: '能准确判断声源的方向，并用两眼看声源', domain: '认知', subdomain: 'MAN', ageBandKey: '9_12m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 动作认知(MAY)
  { id: '9_12m-MAY-001', text: '出现摆弄物品', domain: '认知', subdomain: 'MAY', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MAY-002', text: '在听到一段音乐之后能模仿一些事，包括模仿动物的叫声', domain: '认知', subdomain: 'MAY', ageBandKey: '9_12m', type: 'check', checked: false },

  // 认知(M)功能发育 - 记忆(MR) - 非动作认知(MRN)
  { id: '9_12m-MRN-001', text: '能认识属于自己的玩具、衣物', domain: '认知', subdomain: 'MRN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MRN-002', text: '能找到家里的常见东西(如：电视机在哪里？)', domain: '认知', subdomain: 'MRN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MRN-003', text: '能记住短小的故事，但往往是机械式的无意识记忆', domain: '认知', subdomain: 'MRN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MRN-004', text: '能记得几天前的事', domain: '认知', subdomain: 'MRN', ageBandKey: '9_12m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 非动作认知(MCN)
  { id: '9_12m-MCN-001', text: '大约能听懂20个字左右', domain: '认知', subdomain: 'MCN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MCN-002', text: '能将词音与具体事物联系起来', domain: '认知', subdomain: 'MCN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MCN-003', text: '能准确分辨"红、绿、黄、蓝"四色', domain: '认知', subdomain: 'MCN', ageBandKey: '9_12m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 动作认知(MCY)
  { id: '9_12m-MCY-001', text: '知道常见物品的名称并会指认', domain: '认知', subdomain: 'MCY', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MCY-002', text: '能听懂"拿""坐""给"等动词', domain: '认知', subdomain: 'MCY', ageBandKey: '9_12m', type: 'check', checked: false },

  // 认知(M)功能发育 - 推理(MI) - 非动作认知(MIN)
  { id: '9_12m-MIN-001', text: '能够寻找隐藏起来的物品', domain: '认知', subdomain: 'MIN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MIN-002', text: '开始建立时间、空间和因果关系(如：看到倒水盆里就知道等待洗澡)', domain: '认知', subdomain: 'MIN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MIN-003', text: '可以用类推来解决问题(即取得来自一个问题的策略然后把它应用于其他相关的问题)', domain: '认知', subdomain: 'MIN', ageBandKey: '9_12m', type: 'check', checked: false },

  // 认知(M)功能发育 - 推理(MI) - 动作认知(MIY)
  { id: '9_12m-MIY-001', text: '拿掉积木的盒子玩积木', domain: '认知', subdomain: 'MIY', ageBandKey: '9_12m', type: 'check', checked: false },

  // 口腔动作(OM)功能发育
  { id: '9_12m-OM-001', text: '舌头有旋转动作', domain: '口腔动作', subdomain: 'OM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OM-002', text: '咀嚼能力增强', domain: '口腔动作', subdomain: 'OM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OM-003', text: '吸奶、吞咽、呼吸配合进步，咬软食控制好些', domain: '口腔动作', subdomain: 'OM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OM-004', text: '嘴唇闭合能力成熟维持紧闭', domain: '口腔动作', subdomain: 'OM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OM-005', text: '稳定地控制喝水速度', domain: '口腔动作', subdomain: 'OM', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-OM-006', text: '喝水有进步，因下颌的稳定性仍不够，要么就张口很大要喝水，要么就是口腔开合困难不好喝水(喝水依然漏水或咬杯子)', domain: '口腔动作', subdomain: 'OM', ageBandKey: '9_12m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语理解(听)(MLUY)
  { id: '9_12m-MLUY-001', text: '听懂常见物及人的名称(10个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MLUY-002', text: '叫他时会过来(包含滚动、爬行、跪走、走路)', domain: '语言', subdomain: 'MLUY', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MLUY-003', text: '听得懂不可以、不行、不要等意思', domain: '语言', subdomain: 'MLUY', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MLUY-004', text: '向他索取东西时，知道给(12个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '9_12m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言理解(MLUN)
  { id: '9_12m-MLUN-001', text: '认识常见物(10个月)', domain: '语言', subdomain: 'MLUN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MLUN-002', text: '能看懂一些简单的动作或手势，而有所反应', domain: '语言', subdomain: 'MLUN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MLUN-003', text: '可以看图认字活动', domain: '语言', subdomain: 'MLUN', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MLUN-004', text: '可从书中认识图画和颜色', domain: '语言', subdomain: 'MLUN', ageBandKey: '9_12m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语表达(说)(MLEY)
  { id: '9_12m-MLEY-001', text: '能发出同一音节的不同音调即二声、三声、四声', domain: '语言', subdomain: 'MLEY', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MLEY-002', text: '能模仿发音(10个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MLEY-003', text: '语音和具体物链接有一定意思', domain: '语言', subdomain: 'MLEY', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MLEY-004', text: '能模仿动物的叫声(11个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '9_12m', type: 'check', checked: false },
  { id: '9_12m-MLEY-005', text: '有意识的发几个字音，出现难懂的话', domain: '语言', subdomain: 'MLEY', ageBandKey: '9_12m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言表达(MLEN)
  { id: '9_12m-MLEN-001', text: '能用食指指物(10个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '9_12m', type: 'check', checked: false },

  // 12-18个月题目
  // 本体运动知觉(ISP)功能发育
  { id: '12_18m-ISP-001', text: '优势手出现(13个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-ISP-002', text: '手肘弯曲往前用力掷出小球给对方', domain: '感知觉', subdomain: 'ISP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-ISP-003', text: '自己拿杯子喝水，汤勺进食', domain: '感知觉', subdomain: 'ISP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-ISP-004', text: '能了解并做出一般社交性的动作，如：亲亲、抱抱的', domain: '感知觉', subdomain: 'ISP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-ISP-005', text: '知道自己身体的位置及身体各部位的功能(14个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-ISP-006', text: '双侧做不同方向动作', domain: '感知觉', subdomain: 'ISP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-ISP-007', text: '会想办法拿物品', domain: '感知觉', subdomain: 'ISP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-ISP-008', text: '两侧协同分工合作完成操作(主手、副手)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-ISP-009', text: '小跑步时协调(已具备稳定的行走姿态)(18个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '12_18m', type: 'check', checked: false },

  // 前庭平衡知觉(ISV)功能发育
  { id: '12_18m-ISV-001', text: '双手、双膝爬阶梯两阶(出现攀爬)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-ISV-002', text: '长坐姿转头可维持平衡', domain: '感知觉', subdomain: 'ISV', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-ISV-003', text: '手伸到头上方掷出小球，能维持身体平衡', domain: '感知觉', subdomain: 'ISV', ageBandKey: '12_18m', type: 'check', checked: false },

  // 躯肢体粗大动作(GM)功能发育
  { id: '12_18m-GM-001', text: '跪坐姿摆位下，可情境诱导独立维持中线高跪姿2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '12_18m', type: 'check', checked: false },

  // 双上肢粗大动作(UE)功能发育 - 操作技能(UES)
  { id: '12_18m-UES-001', text: '掷小皮球给对方(13个月)', domain: '粗大动作', subdomain: 'UES', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-UES-002', text: '拿杯子喝水(14个月)', domain: '粗大动作', subdomain: 'UES', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-UES-003', text: '抓握笔涂鸦(15个月)', domain: '粗大动作', subdomain: 'UES', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-UES-004', text: '抓握笔画直线(16个月)', domain: '粗大动作', subdomain: 'UES', ageBandKey: '12_18m', type: 'check', checked: false },

  // 双上肢粗大动作(UE)功能发育 - 视动协调(UEM)
  { id: '12_18m-UEM-001', text: '同时在中线使用双手(17个月)', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-UEM-002', text: '一手拿东西一手操作(17个月)', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '12_18m', type: 'check', checked: false },

  // 精细动作(FM)功能发育
  { id: '12_18m-FM-001', text: '反复放置同一根插棒(13个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-FM-002', text: '将三根小木棍插入有孔板中(13个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-FM-003', text: '将圆形、正方形积木放在相同形状的凹洞(13个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-FM-004', text: '会打开盒子(13个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-FM-005', text: '能伸手到容器内取物(13个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-FM-006', text: '能将2块积木迭高(14个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-FM-007', text: '能将3块积木迭高(15个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-FM-008', text: '能将4块积木迭高(16个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-FM-009', text: '将正方形几何积木嵌入洞内(17个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-FM-010', text: '可将物品放入横向的洞(18个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-FM-011', text: '可穿3个珠珠(18个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '12_18m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与人互动(SIP)
  { id: '12_18m-SIP-001', text: '会主动拿物品给人', domain: '社会互动', subdomain: 'SIP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIP-002', text: '对同伴的动作或口语有反应(如：会停止活动或注意)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIP-003', text: '会接近大人', domain: '社会互动', subdomain: 'SIP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIP-004', text: '能给大人一个吻', domain: '社会互动', subdomain: 'SIP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIP-005', text: '加入小孩群体中时会很高兴', domain: '社会互动', subdomain: 'SIP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIP-006', text: '能辨别父母脸上认可或不认可的表情(如：父母皱眉头表示不行)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIP-007', text: '会寻找不见的父母(如：会一直问父母在哪里)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIP-008', text: '偶而在集体中玩，会等待不吵闹', domain: '社会互动', subdomain: 'SIP', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIP-009', text: '会对睡觉抗拒，怕与大人分开', domain: '社会互动', subdomain: 'SIP', ageBandKey: '12_18m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与其他互动(SIE)
  { id: '12_18m-SIE-001', text: '坚持要自己吃东西', domain: '社会互动', subdomain: 'SIE', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIE-002', text: '会短暂离开大人视线', domain: '社会互动', subdomain: 'SIE', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIE-003', text: '散步时能注意路上东西', domain: '社会互动', subdomain: 'SIE', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIE-004', text: '睡觉要抱心爱玩具(或其他喜好物品)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '12_18m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 情绪与自我(SIS)
  { id: '12_18m-SIS-001', text: '痛苦又可分化发展出嫉妒', domain: '社会互动', subdomain: 'SIS', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIS-002', text: '能用单词(或发音)表达情绪', domain: '社会互动', subdomain: 'SIS', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIS-003', text: '发展出害羞和挑战', domain: '社会互动', subdomain: 'SIS', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIS-004', text: '知道他人的情绪可能和自己情绪有所不同', domain: '社会互动', subdomain: 'SIS', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-SIS-005', text: '会对自己有正向性评价', domain: '社会互动', subdomain: 'SIS', ageBandKey: '12_18m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 非动作认知(MAN)
  { id: '12_18m-MAN-001', text: '有趣事物的注意力可达5-8分钟', domain: '认知', subdomain: 'MAN', ageBandKey: '12_18m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 动作认知(MAY)
  { id: '12_18m-MAY-001', text: '能模仿翻书页', domain: '认知', subdomain: 'MAY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MAY-002', text: '能模仿做游戏和擦桌子，可以和大人边做事边玩', domain: '认知', subdomain: 'MAY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MAY-003', text: '能模仿拍手、踏脚、学鸟飞等动作', domain: '认知', subdomain: 'MAY', ageBandKey: '12_18m', type: 'check', checked: false },

  // 认知(M)功能发育 - 记忆(MR) - 非动作认知(MRN)
  { id: '12_18m-MRN-001', text: '能记住日常接触的动物、人、玩具的名称，包括亲人的名字', domain: '认知', subdomain: 'MRN', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MRN-002', text: '能记住动画片中的部分内容(记得最清楚的是人物的名字)', domain: '认知', subdomain: 'MRN', ageBandKey: '12_18m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 非动作认知(MCN)
  { id: '12_18m-MCN-001', text: '能听懂近50个常用词(如：车、船、房子、花、鸟、树等)', domain: '认知', subdomain: 'MCN', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MCN-002', text: '能分辨狗和猫的差异，卡车和公共汽车的差异', domain: '认知', subdomain: 'MCN', ageBandKey: '12_18m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 动作认知(MCY)
  { id: '12_18m-MCY-001', text: '认识并正确指认经常接触的动物、玩具,以及自己的五官和四肢', domain: '认知', subdomain: 'MCY', ageBandKey: '12_18m', type: 'check', checked: false },

  // 认知(M)功能发育 - 推理(MI) - 动作认知(MIY)
  { id: '12_18m-MIY-001', text: '能依物体性质进行活动尝试错误，并积累经验减少错误', domain: '认知', subdomain: 'MIY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MIY-002', text: '能够根据物品的用途给物品配对', domain: '认知', subdomain: 'MIY', ageBandKey: '12_18m', type: 'check', checked: false },

  // 口腔动作(OM)功能发育
  { id: '12_18m-OM-001', text: '舌头可舔唇上的食物', domain: '口腔动作', subdomain: 'OM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-OM-002', text: '可咀嚼煮得很烂的肉', domain: '口腔动作', subdomain: 'OM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-OM-003', text: '可能会咬住杯子保持下颌稳定', domain: '口腔动作', subdomain: 'OM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-OM-004', text: '吸奶、吞咽、呼吸配合很好', domain: '口腔动作', subdomain: 'OM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-OM-005', text: '咀嚼时上下唇可以闭住不打开', domain: '口腔动作', subdomain: 'OM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-OM-006', text: '下颌稳定度发展，随食物软硬控制咬的力量', domain: '口腔动作', subdomain: 'OM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-OM-007', text: '可用汤匙或手吃的津津有味，成熟的咀嚼动作可软硬都吃', domain: '口腔动作', subdomain: 'OM', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-OM-008', text: '舌头、嘴唇可以独立动作', domain: '口腔动作', subdomain: 'OM', ageBandKey: '12_18m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语理解(听)(MLUY)
  { id: '12_18m-MLUY-001', text: '了解50个单字(理解但不能主动说出)(13个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLUY-002', text: '知道大部份物品的名称(14个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLUY-003', text: '在要求下，会指出熟悉的东西', domain: '语言', subdomain: 'MLUY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLUY-004', text: '会遵从简单的指示(16个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLUY-005', text: '了解一般动作(如：亲亲/抱抱)(17个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '12_18m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言理解(MLUN)
  { id: '12_18m-MLUN-001', text: '指认常见物(13个月)', domain: '语言', subdomain: 'MLUN', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLUN-002', text: '能指认4种动作图片', domain: '语言', subdomain: 'MLUN', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLUN-003', text: '在图片中指出并说出熟悉的物体', domain: '语言', subdomain: 'MLUN', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLUN-004', text: '认出照片中的自己(17个月)', domain: '语言', subdomain: 'MLUN', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLUN-005', text: '能指实物，辨识图形(圆/方)', domain: '语言', subdomain: 'MLUN', ageBandKey: '12_18m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语表达(说)(MLEY)
  { id: '12_18m-MLEY-001', text: '以手势+动作+单字来表达(12~18个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLEY-002', text: '开始说出有意义的单词,多用同一迭词在不同的情境表示几种不同的意思', domain: '语言', subdomain: 'MLEY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLEY-003', text: '单音重迭一词多义以词代句', domain: '语言', subdomain: 'MLEY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLEY-004', text: '名词多,动词少', domain: '语言', subdomain: 'MLEY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLEY-005', text: '会模仿听过的声音/话语', domain: '语言', subdomain: 'MLEY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLEY-006', text: '能说出自己的名字(不带姓)(15个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLEY-007', text: '会哼哼唱唱(17个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '12_18m', type: 'check', checked: false },
  { id: '12_18m-MLEY-008', text: '主动说出50-100个左右的词(17个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '12_18m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言表达(MLEN)
  { id: '12_18m-MLEN-001', text: '模仿日常动作以动作反应', domain: '语言', subdomain: 'MLEN', ageBandKey: '12_18m', type: 'check', checked: false },

  // 18-24个月题目
  // 本体运动知觉(ISP)功能发育
  { id: '18_24m-ISP-001', text: '蹲站交替动作时不需他人协助(24个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '18_24m', type: 'check', checked: false },

  // 前庭平衡知觉(ISV)功能发育
  { id: '18_24m-ISV-001', text: '灵活小跑步(利用18个月时出现的常态行走姿态)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-ISV-002', text: '原地双脚跳(21个月)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-ISV-003', text: '沿直线跪走3步(23个月)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-ISV-004', text: '半跪姿双手可掷出小球(24个月)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '18_24m', type: 'check', checked: false },

  // 躯肢体粗大动作(GM)功能发育
  { id: '18_24m-GM-001', text: '独立高跪姿摆位下，可情境诱导自主维持中线向前跪走3步的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '18_24m', type: 'check', checked: false },

  // 双上肢粗大动作(UE)功能发育 - 操作技能(UES)
  { id: '18_24m-UES-001', text: '用双手转门把(21个月)', domain: '粗大动作', subdomain: 'UES', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-UES-002', text: '脱下未扣扣子的外套(22个月)', domain: '粗大动作', subdomain: 'UES', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-UES-003', text: '用一手转门把(23个月)', domain: '粗大动作', subdomain: 'UES', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-UES-004', text: '脱下裤子(23个月)', domain: '粗大动作', subdomain: 'UES', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-UES-005', text: '可一页一页的翻薄书(24个月)', domain: '粗大动作', subdomain: 'UES', ageBandKey: '18_24m', type: 'check', checked: false },

  // 双上肢粗大动作(UE)功能发育 - 视动协调(UEM)
  { id: '18_24m-UEM-001', text: '惯用手已形成(24个月)', domain: '粗大动作', subdomain: 'UEM', ageBandKey: '18_24m', type: 'check', checked: false },

  // 精细动作(FM)功能发育
  { id: '18_24m-FM-001', text: '能将5块积木迭高(19个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-FM-002', text: '能将6块积木迭高(21个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-FM-003', text: '能将7块积木迭高(23个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-FM-004', text: '可上下左右涂圈圈(19个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-FM-005', text: '模仿画圆形线条(20个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-FM-006', text: '将三角形嵌入洞内', domain: '精细动作', subdomain: 'FM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-FM-007', text: '上玩具发条', domain: '精细动作', subdomain: 'FM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-FM-008', text: '拉下拉链', domain: '精细动作', subdomain: 'FM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-FM-009', text: '剥开糖果包装纸', domain: '精细动作', subdomain: 'FM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-FM-010', text: '照样本,画横线(24个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '18_24m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与人互动(SIP)
  { id: '18_24m-SIP-001', text: '被欺负时会设法抵抗或还手', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-002', text: '对其他孩子会表示同情或安慰', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-003', text: '会有时黏着大人，有时推开大人不要大人管', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-004', text: '会为其他人表演', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-005', text: '和其他孩子牵手或自动到外面玩', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-006', text: '会拒绝喂食的协助', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-007', text: '与人对话时转换注视(会随着说话人转换注视的方向)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-008', text: '会笑自己或别人的好笑动作', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-009', text: '发怪声或做奇怪的动作引别人笑', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-010', text: '会自发与同伴分享物品或食物', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-011', text: '会表达感谢', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-012', text: '会主动和大人互动', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-013', text: '会在要求下捡玩具', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-014', text: '会愿意与人合作', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-015', text: '会表达要或不要', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-016', text: '模仿做家事', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-017', text: '在探索环境时，会用口语或其他方式(如：拉大人)寻求大人协助', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-018', text: '用口语来表达饥饿或口渴等生理需求', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIP-019', text: '会用抓住大人手或其他方式，要求大人注意', domain: '社会互动', subdomain: 'SIP', ageBandKey: '18_24m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与其他互动(SIE)
  { id: '18_24m-SIE-001', text: '当觉得安全时，会探索一个新的环境', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIE-002', text: '会用一个字(或发音)表达情绪', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIE-003', text: '会帮忙做一些简单家事', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIE-004', text: '会选择要的玩具', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIE-005', text: '有简单是非观念', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIE-006', text: '能短暂等待不哭闹', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIE-007', text: '知道在某些地方从事某活动', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIE-008', text: '知道家庭每天固定的作息(生活常规的建立)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIE-009', text: '会用手势表达需要', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIE-010', text: '能在两样物品中做出选择', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIE-011', text: '能观察同伴(如：看别的小朋友玩)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '18_24m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 情绪与自我(SIS)
  { id: '18_24m-SIS-001', text: '有被伤害的意识', domain: '社会互动', subdomain: 'SIS', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIS-002', text: '出现最初的憎恨和爱', domain: '社会互动', subdomain: 'SIS', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIS-003', text: '可通过一些外部特征认出自己(年龄、性别)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIS-004', text: '当被问到是谁(孩子的名字)时，会指向自己', domain: '社会互动', subdomain: 'SIS', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIS-005', text: '意识到自己和他人不同', domain: '社会互动', subdomain: 'SIS', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIS-006', text: '会摸镜中自己的形象', domain: '社会互动', subdomain: 'SIS', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIS-007', text: '会正确描述自己身体部位', domain: '社会互动', subdomain: 'SIS', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-SIS-008', text: '参与小朋友游戏和对环境探索意愿增高', domain: '社会互动', subdomain: 'SIS', ageBandKey: '18_24m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 非动作认知(MAN)
  { id: '18_24m-MAN-001', text: '能集中注意看电视15分钟左右,且已无意识注意为主', domain: '认知', subdomain: 'MAN', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MAN-002', text: '能发现并注意到身边的新物品，对周围事物兴趣进一步增强', domain: '认知', subdomain: 'MAN', ageBandKey: '18_24m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 动作认知(MAY)
  { id: '18_24m-MAY-001', text: '能模仿划船等更复杂的动作', domain: '认知', subdomain: 'MAY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MAY-002', text: '能模仿大人画出线条、圆圈、尽管画得不到位', domain: '认知', subdomain: 'MAY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MAY-003', text: '能独立玩玩具(或其他喜好物品)15分钟', domain: '认知', subdomain: 'MAY', ageBandKey: '18_24m', type: 'check', checked: false },

  // 认知(M)功能发育 - 记忆(MR) - 非动作认知(MRN)
  { id: '18_24m-MRN-001', text: '能听讲熟悉的故事，唱熟悉的儿歌', domain: '认知', subdomain: 'MRN', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MRN-002', text: '能记住生活中东西放的地方', domain: '认知', subdomain: 'MRN', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MRN-003', text: '看到熟悉的图片(如：小鸭子、小兔子、苹果等能叫出名字)', domain: '认知', subdomain: 'MRN', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MRN-004', text: '能记住自己床的位置以及厕所的位置', domain: '认知', subdomain: 'MRN', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MRN-005', text: '能记住5个步骤的顺序', domain: '认知', subdomain: 'MRN', ageBandKey: '18_24m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 非动作认知(MCN)
  { id: '18_24m-MCN-001', text: '认识日常吃的食物、所用的餐具、玩具以及常用的交通工具', domain: '认知', subdomain: 'MCN', ageBandKey: '18_24m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 动作认知(MCY)
  { id: '18_24m-MCY-001', text: '能用"你、我、他"这些人称代词', domain: '认知', subdomain: 'MCY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MCY-002', text: '能用副词"现在""一点儿""特别"来更准确的表达自己的意思', domain: '认知', subdomain: 'MCY', ageBandKey: '18_24m', type: 'check', checked: false },

  // 认知(M)功能发育 - 推理(MI) - 非动作认知(MIN)
  { id: '18_24m-MIN-001', text: '能解决简单的因果关系问题', domain: '认知', subdomain: 'MIN', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MIN-002', text: '找到在看不见的时候移走的物体', domain: '认知', subdomain: 'MIN', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MIN-003', text: '能从环境线索来推论一件事(如:看到妈妈拿起包时，就知道妈妈要出去了)', domain: '认知', subdomain: 'MIN', ageBandKey: '18_24m', type: 'check', checked: false },

  // 口腔动作(OM)功能发育
  { id: '18_24m-OM-001', text: '会自己吃、喝、吸管喝水(24个月)', domain: '口腔动作', subdomain: 'OM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-OM-002', text: '舌头舔嘴唇(24个月)', domain: '口腔动作', subdomain: 'OM', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-OM-003', text: '不流口水(24个月)', domain: '口腔动作', subdomain: 'OM', ageBandKey: '18_24m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语理解(听)(MLUY)
  { id: '18_24m-MLUY-001', text: '能理解一般问话(如：那是什么？)(20~21个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLUY-002', text: '了解动词+名词的句子(如：丢球)', domain: '语言', subdomain: 'MLUY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLUY-003', text: '理解"我"并会用', domain: '语言', subdomain: 'MLUY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLUY-004', text: '知道玩伴的名字(22~24个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLUY-005', text: '能听懂最简单的故事', domain: '语言', subdomain: 'MLUY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLUY-006', text: '会按指示办事(连续的3件)(简单的指令听从能力)', domain: '语言', subdomain: 'MLUY', ageBandKey: '18_24m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言理解(MLUN)
  { id: '18_24m-MLUN-001', text: '在照片中可指认熟识的人(22~24个月)', domain: '语言', subdomain: 'MLUN', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLUN-002', text: '认得出电视上常见之物(22~24个月)', domain: '语言', subdomain: 'MLUN', ageBandKey: '18_24m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语表达(说)(MLEY)
  { id: '18_24m-MLEY-001', text: '开始出现了由双词或三词组合在一起的语句(即：电报句)(18~24个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLEY-002', text: '会说谢谢，会用言语要求别人做什么', domain: '语言', subdomain: 'MLEY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLEY-003', text: '说出身体部位(2-3个)', domain: '语言', subdomain: 'MLEY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLEY-004', text: '会回答最简单的问题', domain: '语言', subdomain: 'MLEY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLEY-005', text: '会用在人、食物、玩具上的形容词、副词', domain: '语言', subdomain: 'MLEY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLEY-006', text: '会重复句子的最后两个字(22~24个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLEY-007', text: '会说3-5个字句子', domain: '语言', subdomain: 'MLEY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLEY-008', text: '会回答生活上的问题', domain: '语言', subdomain: 'MLEY', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLEY-009', text: '听完故事后，能说出讲的是什么人、什么事', domain: '语言', subdomain: 'MLEY', ageBandKey: '18_24m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言表达(MLEN)
  { id: '18_24m-MLEN-001', text: '示范下模仿画直线(18个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '18_24m', type: 'check', checked: false },
  { id: '18_24m-MLEN-002', text: '示范下模仿画横线(24个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '18_24m', type: 'check', checked: false },

  // 24-30个月题目
  // 本体运动知觉(ISP)功能发育
  { id: '24_30m-ISP-001', text: '踢球(29个月)', domain: '感知觉', subdomain: 'ISP', ageBandKey: '24_30m', type: 'check', checked: false },

  // 前庭平衡知觉(ISV)功能发育
  { id: '24_30m-ISV-001', text: '灵活原地双脚跳(利用21个月时出现的常态原地双脚跳姿态)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-ISV-002', text: '灵活沿直线跪走(利用23个月时出现的常态沿直线跪走姿态)', domain: '感知觉', subdomain: 'ISV', ageBandKey: '24_30m', type: 'check', checked: false },

  // 躯肢体粗大动作(GM)功能发育
  { id: '24_30m-GM-001', text: '双手被动扶持及高跪姿摆位下，可任务诱导(镜像模仿)双下肢交替半跪3下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-GM-002', text: '各单手被动扶持及高跪姿摆位下，可任务诱导(镜像模仿)双下肢交替半跪3下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-GM-003', text: '双手携持物品及高跪姿摆位下，可任务诱导(镜像模仿)独立向前跪走3步的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-GM-004', text: '双手携持物品及高跪姿摆位下，可任务诱导(镜像模仿)独立向后跪走3步的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '24_30m', type: 'check', checked: false },

  // 精细动作(FM)功能发育
  { id: '24_30m-FM-001', text: '使用剪刀，可剪断15公分的纸(25个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-FM-002', text: '能将8块积木迭高(25个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-FM-003', text: '能将9块积木迭高', domain: '精细动作', subdomain: 'FM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-FM-004', text: '会旋开瓶盖', domain: '精细动作', subdomain: 'FM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-FM-005', text: '脱下内裤', domain: '精细动作', subdomain: 'FM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-FM-006', text: '穿上没有鞋带的鞋子(27个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-FM-007', text: '用粗绳子穿木珠(29个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-FM-008', text: '穿袜子', domain: '精细动作', subdomain: 'FM', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-FM-009', text: '可以接住一个大球(30个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '24_30m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与人互动(SIP)
  { id: '24_30m-SIP-001', text: '能主动问候熟悉的人', domain: '社会互动', subdomain: 'SIP', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIP-002', text: '主动找小朋友玩但不会合作', domain: '社会互动', subdomain: 'SIP', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIP-003', text: '对幼小孩子会保护', domain: '社会互动', subdomain: 'SIP', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIP-004', text: '无法继续玩玩具(或无法继续读绘本)或参与活动会哭', domain: '社会互动', subdomain: 'SIP', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIP-005', text: '当被问到谁是(孩子的名字)时会指认镜子中的自己', domain: '社会互动', subdomain: 'SIP', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIP-006', text: '会告状', domain: '社会互动', subdomain: 'SIP', ageBandKey: '24_30m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与其他互动(SIE)
  { id: '24_30m-SIE-001', text: '能在两个不感兴趣的活动中做出选择', domain: '社会互动', subdomain: 'SIE', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIE-002', text: '逐渐希望得到父母喜爱', domain: '社会互动', subdomain: 'SIE', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIE-003', text: '能忍受饥饿或口渴等生理需求', domain: '社会互动', subdomain: 'SIE', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIE-004', text: '知道自己的年龄', domain: '社会互动', subdomain: 'SIE', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIE-005', text: '能注意性别的不同', domain: '社会互动', subdomain: 'SIE', ageBandKey: '24_30m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 情绪与自我(SIS)
  { id: '24_30m-SIS-001', text: '快乐也可以分化发展出喜悦', domain: '社会互动', subdomain: 'SIS', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIS-002', text: '对他人的情感做出反应', domain: '社会互动', subdomain: 'SIS', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIS-003', text: '当被问到你叫什么名字时,会回答(认识自我)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-SIS-004', text: '能正确描述自己(了解自我)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '24_30m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 非动作认知(MAN)
  { id: '24_30m-MAN-001', text: '能注意到内心思想与外部事件的差异(知道别人不见了是去别的地方，而不是消失)', domain: '认知', subdomain: 'MAN', ageBandKey: '24_30m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 动作认知(MAY)
  { id: '24_30m-MAY-001', text: '能专注与游戏5-10分钟', domain: '认知', subdomain: 'MAY', ageBandKey: '24_30m', type: 'check', checked: false },

  // 认知(M)功能发育 - 记忆(MR) - 非动作认知(MRN)
  { id: '24_30m-MRN-001', text: '能记住家里(或手机)的电话号码', domain: '认知', subdomain: 'MRN', ageBandKey: '24_30m', type: 'check', checked: false },

  // 认知(M)功能发育 - 记忆(MR) - 动作认知(MRY)
  { id: '24_30m-MRY-001', text: '能唱一些儿歌，试着背一些简单的唐诗', domain: '认知', subdomain: 'MRY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MRY-002', text: '出现背诵，能熟练地背1-2首唐诗', domain: '认知', subdomain: 'MRY', ageBandKey: '24_30m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 非动作认知(MCN)
  { id: '24_30m-MCN-001', text: '理解一些礼貌用语(如:谢谢、你好、再见)', domain: '认知', subdomain: 'MCN', ageBandKey: '24_30m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 动作认知(MCY)
  { id: '24_30m-MCY-001', text: '知道"大"、"小"知道圆、方、三角形', domain: '认知', subdomain: 'MCY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MCY-002', text: '知道大人和小孩的区别，也知道小盒子可以放在大盒子里', domain: '认知', subdomain: 'MCY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MCY-003', text: '对多和少的概念非常明确了', domain: '认知', subdomain: 'MCY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MCY-004', text: '知道"上、下"，比较多少、长短', domain: '认知', subdomain: 'MCY', ageBandKey: '24_30m', type: 'check', checked: false },

  // 认知(M)功能发育 - 推理(MI) - 动作认知(MIY)
  { id: '24_30m-MIY-001', text: '有简单的是非观念，知道打人不好', domain: '认知', subdomain: 'MIY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MIY-002', text: '能在游戏中实验因果关系(如：玩踩气球时，球会破)', domain: '认知', subdomain: 'MIY', ageBandKey: '24_30m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语理解(听)(MLUY)
  { id: '24_30m-MLUY-001', text: '了解"上""下""里面""旁边"等位置观念(25~27个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MLUY-002', text: '知道在什么场合通常做什么事', domain: '语言', subdomain: 'MLUY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MLUY-003', text: '理解常用词汇300个左右', domain: '语言', subdomain: 'MLUY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MLUY-004', text: '知道"明天"指的不是"现在"(28~30个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MLUY-005', text: '会回答"谁在做什么"的问句', domain: '语言', subdomain: 'MLUY', ageBandKey: '24_30m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语表达(说)(MLEY)
  { id: '24_30m-MLEY-001', text: '发展出完整句(简单句→复杂句→复合句)(25~30个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MLEY-002', text: '会问"这是什么？"', domain: '语言', subdomain: 'MLEY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MLEY-003', text: '会问"谁"、"哪里"、"做什么"等句子(28~30个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '24_30m', type: 'check', checked: false },
  { id: '24_30m-MLEY-004', text: '会用且说"这个""那个"等句子', domain: '语言', subdomain: 'MLEY', ageBandKey: '24_30m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言表达(指)(MLEN)
  { id: '24_30m-MLEN-001', text: '能在指定范围内涂鸦(24~30个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '24_30m', type: 'check', checked: false },

  // 30-36个月题目
  // 本体运动知觉(ISP)功能发育
  { id: '30_36m-ISP-001', text: '会适当用力', domain: '感知觉', subdomain: 'ISP', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-ISP-002', text: '会漱口', domain: '感知觉', subdomain: 'ISP', ageBandKey: '30_36m', type: 'check', checked: false },

  // 前庭平衡知觉(ISV)功能发育
  { id: '30_36m-ISV-001', text: '小凳子上跳下', domain: '感知觉', subdomain: 'ISV', ageBandKey: '30_36m', type: 'check', checked: false },

  // 躯肢体粗大动作(GM)功能发育
  { id: '30_36m-GM-001', text: '简单任务指令要求下，可自主模仿独立交替半跪3下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-GM-002', text: '任务指令要求及高跪姿摆位下，可自主模仿维持各单脚半跪姿及诱导搭配覆诵发音数数(1~10)的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-GM-003', text: '任务指令要求下，可自主完成独立交替半跪(1~10下)活动及同时搭配自主发音数数的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '30_36m', type: 'check', checked: false },

  // 精细动作(FM)功能发育
  { id: '30_36m-FM-001', text: '解开外套的大扣子(31个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-FM-002', text: '扣上外套的大扣子(33个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-FM-003', text: '穿内裤(33个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-FM-004', text: '用粗线穿洞洞板(36个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-FM-005', text: '用毛巾檫脸(36个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-FM-006', text: '模仿画圆形(36个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-FM-007', text: '在线上描绘(36个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '30_36m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与人互动(SIP)
  { id: '30_36m-SIP-001', text: '能根据性别年龄来称呼人，关注别人对自己的态度', domain: '社会互动', subdomain: 'SIP', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIP-002', text: '能协助大人清扫或擦桌子', domain: '社会互动', subdomain: 'SIP', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIP-003', text: '能和熟悉的大人互动，并维持互动', domain: '社会互动', subdomain: 'SIP', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIP-004', text: '能正确回答是男孩还是女孩', domain: '社会互动', subdomain: 'SIP', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIP-005', text: '会响应同伴的社会行为(如问好)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIP-006', text: '遵守简单有关礼貌方面的规则(建立简单学习常规与社交能力)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIP-007', text: '会找借口以逃避责罚', domain: '社会互动', subdomain: 'SIP', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIP-008', text: '有分离焦虑', domain: '社会互动', subdomain: 'SIP', ageBandKey: '30_36m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与其他互动(SIE)
  { id: '30_36m-SIE-001', text: '自己能去邻居小朋友家玩', domain: '社会互动', subdomain: 'SIE', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIE-002', text: '能耐心等大人为他做事，不觉得不耐烦', domain: '社会互动', subdomain: 'SIE', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIE-003', text: '遵守简单和吃有关的规则', domain: '社会互动', subdomain: 'SIE', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIE-004', text: '知道自己性别', domain: '社会互动', subdomain: 'SIE', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIE-005', text: '对固定的作息有所回应(如：吃饭时会主动坐到桌边)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIE-006', text: '能和宠物正向互动(如：摸它)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIE-007', text: '能说某些情境应遵守的规则(了解学习常规)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '30_36m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 情绪与自我(SIS)
  { id: '30_36m-SIS-001', text: '当其他孩子受伤或受挫时表现出难过(发展同理心)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIS-002', text: '对参与活动感到愉快(有自主学习意愿)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIS-003', text: '会用语言(或发音)来表达情绪(有自主表达意愿)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIS-004', text: '对自己的成就感到骄傲(有学习自信)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIS-005', text: '有自我感受', domain: '社会互动', subdomain: 'SIS', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIS-006', text: '能说出及指出照片中的自己', domain: '社会互动', subdomain: 'SIS', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-SIS-007', text: '说出身体部位的名称', domain: '社会互动', subdomain: 'SIS', ageBandKey: '30_36m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 非动作认知(MAN)
  { id: '30_36m-MAN-001', text: '能记得几周前发生的事', domain: '认知', subdomain: 'MAN', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MAN-002', text: '能记得并重复听到的三个字的句子(如：你好吗?)', domain: '认知', subdomain: 'MAN', ageBandKey: '30_36m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 动作认知(MAY)
  { id: '30_36m-MAY-001', text: '能注意周围环境中的变化并和认识过程结合起来(有意义的注意开始出现)', domain: '认知', subdomain: 'MAY', ageBandKey: '30_36m', type: 'check', checked: false },

  // 认知(M)功能发育 - 记忆(MR) - 动作认知(MRY)
  { id: '30_36m-MRY-001', text: '可以流利的说出家人的姓名和职业', domain: '认知', subdomain: 'MRY', ageBandKey: '30_36m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 非动作认知(MCN)
  { id: '30_36m-MCN-001', text: '能够认识5种以上的颜色', domain: '认知', subdomain: 'MCN', ageBandKey: '30_36m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 动作认知(MCY)
  { id: '30_36m-MCY-001', text: '开始理解复数名词(如:我们、你们、他们)', domain: '认知', subdomain: 'MCY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MCY-002', text: '有了多项选择能力，比如：妈妈说"把红色的皮球给我"(在之前他只知道拿红色的球却不一定是皮的)', domain: '认知', subdomain: 'MCY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MCY-003', text: '能按物品用途分类，如：吃的、穿的、玩的', domain: '认知', subdomain: 'MCY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MCY-004', text: '懂得"里、外"', domain: '认知', subdomain: 'MCY', ageBandKey: '30_36m', type: 'check', checked: false },

  // 认知(M)功能发育 - 推理(MI) - 动作认知(MIY)
  { id: '30_36m-MIY-001', text: '开始有了自我感受，但这种感受非常直接(如：妈妈骂了他，就会认为妈妈不喜欢他)', domain: '认知', subdomain: 'MIY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MIY-002', text: '热衷于搞清楚周围的人际关系', domain: '认知', subdomain: 'MIY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MIY-003', text: '能够根据性别和年龄来称呼别人(如：叔叔、阿姨等)', domain: '认知', subdomain: 'MIY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MIY-004', text: '开始关注周围人对自己的态度', domain: '认知', subdomain: 'MIY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MIY-005', text: '能用一物代替另一物当玩具(如：将筷子当成箭在射击)', domain: '认知', subdomain: 'MIY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MIY-006', text: '能依眼睛看到的资料为基础，猜出物品的名称(如：告诉孩子动物的特征，让其猜出是什么动物)', domain: '认知', subdomain: 'MIY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MIY-007', text: '能用相同的物品达到不同的功能', domain: '认知', subdomain: 'MIY', ageBandKey: '30_36m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语理解(听)(MLUY)
  { id: '30_36m-MLUY-001', text: '能听懂有关位置、所有权及数量的问话(31~33个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLUY-002', text: '理解故事主要情节', domain: '语言', subdomain: 'MLUY', ageBandKey: '30_36m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言理解(视)(MLUN)
  { id: '30_36m-MLUN-001', text: '能说出100张(或多张)左右图片名称(31~33个月)', domain: '语言', subdomain: 'MLUN', ageBandKey: '30_36m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语表达(说)(MLEY)
  { id: '30_36m-MLEY-001', text: '会正确使用"我们"、"您们"、"他们"(31~33个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEY-002', text: '会用"还"、"也"、"以后"、"只好"等词句', domain: '语言', subdomain: 'MLEY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEY-003', text: '会接熟悉的语句或故事', domain: '语言', subdomain: 'MLEY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEY-004', text: '会说1000个(或多个)左右的词', domain: '语言', subdomain: 'MLEY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEY-005', text: '能说出15种(或多种)颜色名称', domain: '语言', subdomain: 'MLEY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEY-006', text: '所有孕母在3岁前已发展出来', domain: '语言', subdomain: 'MLEY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEY-007', text: '声母b、p、m、d、t、n、g、k、h已发展出来', domain: '语言', subdomain: 'MLEY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEY-008', text: '会说6-8个(或多个)字的句子(30~36个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEY-009', text: '会用几个"形容词"', domain: '语言', subdomain: 'MLEY', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEY-010', text: '会说出物品的用途', domain: '语言', subdomain: 'MLEY', ageBandKey: '30_36m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言表达(指)(MLEN)
  { id: '30_36m-MLEN-001', text: '示范下模仿画圆形(30个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEN-002', text: '示范下模仿画十字(36个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '30_36m', type: 'check', checked: false },
  { id: '30_36m-MLEN-003', text: '出示图片表示需求(36个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '30_36m', type: 'check', checked: false },

  // 36-48个月题目
  // 躯肢体粗大动作(GM)功能发育
  { id: '36_48m-GM-001', text: '任务指令要求下，可自主独立完成正确交替半跪抬脚数量概念(1~10下)的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-GM-002', text: '半跪姿摆位下，可自主独立完成各单脚半跪姿站立起1下的活动与姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-GM-003', text: '高跪姿摆位下，可自主独立完成正确交替半跪及对侧上肢抬手与数数(1~10下)的多样性活动与姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-GM-004', text: '任务指令要求下，可自主双手扶地维持中线蹲姿2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-GM-005', text: '任务指令要求下，可自主独立维持中线蹲姿2秒的姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-GM-006', text: '任务指令要求下，可自主独立完成连续动态全蹲站2下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-GM-007', text: '任务指令要求下，可自主独立完成扶地向前蹲走3步的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-GM-008', text: '任务指令要求下，可自主独立完成向前蹲走3步活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-GM-009', text: '任务指令要求下，可自主独立完成向后蹲走3步活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '36_48m', type: 'check', checked: false },

  // 精细动作(FM)功能发育
  { id: '36_48m-FM-001', text: '穿长裤(39个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-002', text: '脱衣套头衫', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-003', text: '模仿画＋字(39个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-004', text: '沿直线剪纸', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-005', text: '拿筷子扒饭(42个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-006', text: '脱下衬衫', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-007', text: '扣暗扣', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-008', text: '模仿画×(45个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-009', text: '穿上衬衫(45个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-010', text: '刷牙', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-011', text: '模仿画正方形', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-012', text: '剪圆形', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-FM-013', text: '连点成线(48个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '36_48m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与人互动(SIP)
  { id: '36_48m-SIP-001', text: '与其他小孩在游戏中比赛(玩参与性游戏)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-002', text: '希望别人注意自己的表演', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-003', text: '会知道如何给小朋友一些暗示', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-004', text: '能试着安慰他人', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-005', text: '能和同伴玩简单游戏', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-006', text: '会道歉(如：做错事时会说"对不起")', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-007', text: '有一位要好的同伴(能区分好朋友和普通朋友)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-008', text: '遵守大人要求玩玩具或游戏规则', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-009', text: '在遭遇困难的情景，能主动要求协助', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-010', text: '会袒护、安慰朋友', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-011', text: '当要求某些物品时，会以比较适当的行为代替哭、闹的方式', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIP-012', text: '在拿物品或玩玩具时，会寻求许可及赞同', domain: '社会互动', subdomain: 'SIP', ageBandKey: '36_48m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与其他互动(SIE)
  { id: '36_48m-SIE-001', text: '自己过斑马线或过街', domain: '社会互动', subdomain: 'SIE', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIE-002', text: '在熟悉的环境(如：幼儿园)中能和父母分离', domain: '社会互动', subdomain: 'SIE', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIE-003', text: '能在食物、衣服及活动中做出选择', domain: '社会互动', subdomain: 'SIE', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIE-004', text: '在学习时，能主动参与不强迫', domain: '社会互动', subdomain: 'SIE', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIE-005', text: '对不熟悉的人或新的环境不觉得害怕', domain: '社会互动', subdomain: 'SIE', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIE-006', text: '能说出自己常做的活动', domain: '社会互动', subdomain: 'SIE', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIE-007', text: '有性别角色认识', domain: '社会互动', subdomain: 'SIE', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIE-008', text: '能扮演自己喜欢做的事', domain: '社会互动', subdomain: 'SIE', ageBandKey: '36_48m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 情绪与自我(SIS)
  { id: '36_48m-SIS-001', text: '发展出爱、骄傲、内疚情绪', domain: '社会互动', subdomain: 'SIS', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIS-002', text: '产生出同情的感情', domain: '社会互动', subdomain: 'SIS', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIS-003', text: '能说出自己的全名', domain: '社会互动', subdomain: 'SIS', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIS-004', text: '自尊心特强', domain: '社会互动', subdomain: 'SIS', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIS-005', text: '记忆的自我，以自述方式出现', domain: '社会互动', subdomain: 'SIS', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIS-006', text: '自我概念强调特征、经历情感', domain: '社会互动', subdomain: 'SIS', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIS-007', text: '能了解自己的感觉', domain: '社会互动', subdomain: 'SIS', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIS-008', text: '能分辨自己和他人的物品', domain: '社会互动', subdomain: 'SIS', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-SIS-009', text: '能说出6种以上身体部位的名称', domain: '社会互动', subdomain: 'SIS', ageBandKey: '36_48m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 非动作认知(MAN)
  { id: '36_48m-MAN-001', text: '注意力变得更加持久和有计划性', domain: '认知', subdomain: 'MAN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MAN-002', text: '能在课堂活动中适当转换注意力(如：由听转至看)', domain: '认知', subdomain: 'MAN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MAN-003', text: '能注意故事中的变化', domain: '认知', subdomain: 'MAN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MAN-004', text: '能专注于小组活动20-25分钟', domain: '认知', subdomain: 'MAN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MAN-005', text: '注意力集中，能在注意转移之前专心玩游戏或者连续看20分钟电视', domain: '认知', subdomain: 'MAN', ageBandKey: '36_48m', type: 'check', checked: false },

  // 认知(M)功能发育 - 记忆(MR) - 非动作认知(MRN)
  { id: '36_48m-MRN-001', text: '能回忆仅看过一次的10-15个物体中的4个', domain: '认知', subdomain: 'MRN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MRN-002', text: '能记得并重复包含形容词的四个字的句子(如：你好漂亮)', domain: '认知', subdomain: 'MRN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MRN-003', text: '能在提示下，记起刚才看过故事中的一到二个重点', domain: '认知', subdomain: 'MRN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MRN-004', text: '短期记忆改进：可通过反复诵读，记住短诗和电话号码', domain: '认知', subdomain: 'MRN', ageBandKey: '36_48m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 非动作认知(MCN)
  { id: '36_48m-MCN-001', text: '开始理解介词的意思，知道切一半会变成两块', domain: '认知', subdomain: 'MCN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MCN-002', text: '能唱数1-10', domain: '认知', subdomain: 'MCN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MCN-003', text: '数量概念形成的最佳时期(这时宝宝已经掌握了10以内数的概念)', domain: '认知', subdomain: 'MCN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MCN-004', text: '能理解简单的时间概念(如：白天、晚上、四季)', domain: '认知', subdomain: 'MCN', ageBandKey: '36_48m', type: 'check', checked: false },

  // 认知(M)功能发育 - 推理(MI) - 非动作认知(MIN)
  { id: '36_48m-MIN-001', text: '能注意到并转换逆向思维，理解很多因果关系', domain: '认知', subdomain: 'MIN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MIN-002', text: '能区分表像和现实', domain: '认知', subdomain: 'MIN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MIN-003', text: '因果推理能力发展的快速期', domain: '认知', subdomain: 'MIN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MIN-004', text: '知道加东西会使一堆物品变多', domain: '认知', subdomain: 'MIN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MIN-005', text: '知道拿走东西会使一堆物品变少', domain: '认知', subdomain: 'MIN', ageBandKey: '36_48m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语理解(听)(MLUY)
  { id: '36_48m-MLUY-001', text: '了解"大小""上下""前后""里外"(37~42个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLUY-002', text: '能回答"这是谁的""为什么"等问题', domain: '语言', subdomain: 'MLUY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLUY-003', text: '能回答"有多少""多久"的问题(43~48个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLUY-004', text: '了解"昨天""今天"的意义', domain: '语言', subdomain: 'MLUY', ageBandKey: '36_48m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言理解(视)(MLUN)
  { id: '36_48m-MLUN-001', text: '能看图说话(42~48个月)', domain: '语言', subdomain: 'MLUN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLUN-002', text: '能指认黑白相片中的物品', domain: '语言', subdomain: 'MLUN', ageBandKey: '36_48m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语表达(说)(MLEY)
  { id: '36_48m-MLEY-001', text: '会用否定命令句，如：不要做…(37~42个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLEY-002', text: '会用"这是…"来表达', domain: '语言', subdomain: 'MLEY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLEY-003', text: '会用"什么时候…"的句子', domain: '语言', subdomain: 'MLEY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLEY-004', text: '可解释简单图画(42~48个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLEY-005', text: '会说1600个(多个)左右的词', domain: '语言', subdomain: 'MLEY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLEY-006', text: '会说5-8个(多个)反义词', domain: '语言', subdomain: 'MLEY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLEY-007', text: '说出自己的性别', domain: '语言', subdomain: 'MLEY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLEY-008', text: '说出一周包括哪七天', domain: '语言', subdomain: 'MLEY', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLEY-009', text: '声母f、j、zh、ch、sh、z、c', domain: '语言', subdomain: 'MLEY', ageBandKey: '36_48m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言表达(指)(MLEN)
  { id: '36_48m-MLEN-001', text: '示范下模仿画x形(42个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '36_48m', type: 'check', checked: false },
  { id: '36_48m-MLEN-002', text: '照着图仿画方形(48个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '36_48m', type: 'check', checked: false },

  // 48-60个月题目
  // 躯肢体粗大动作(GM)功能发育
  { id: '48_60m-GM-001', text: '四点爬姿摆位下，可自主独立完成正确对侧交替抬脚、抬手并能倒数数(10~1下)的多样性活动与姿势发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-GM-002', text: '双手协同携物及蹲姿摆位下，可自主独立完成向前蹲跳2下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-GM-003', text: '双手协同携物及蹲姿摆位下，可自主独立完成向后蹲跳2下的活动发育', domain: '粗大动作', subdomain: 'GM', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿精细动作(FM)功能发育
  { id: '48_60m-FM-001', text: '穿套头衫', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-FM-002', text: '解开小扣子', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-FM-003', text: '画正方形', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-FM-004', text: '剪正方形', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-FM-005', text: '将纸对折', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-FM-006', text: '扣上小扣子', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-FM-007', text: '在线条范围内着色', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-FM-008', text: '画三角形', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-FM-009', text: '仿写数字，拼音', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-FM-010', text: '用筷子夹食物', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-FM-011', text: '将黏土揉成小球', domain: '精细动作', subdomain: 'FM', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿社会性(SI)互动功能发育 - 与人互动(SIP)
  { id: '48_60m-SIP-001', text: '能和同伴玩团体游戏', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-002', text: '能和同伴交谈', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-003', text: '能自发的轮流及分享玩具', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-004', text: '会在游戏中称赞或批评别的小朋友行为', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-005', text: '能主动和同伴合作', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-006', text: '能独立和同伴交朋友', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-007', text: '在小组活动或其他教学情境时能适当响应(如：对教学内容或指令有响应)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-008', text: '能在适当时机用请、谢谢或不客气等用语', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-009', text: '在全新的游戏情境下，能与人分享物品及器材', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-010', text: '会把周遭的人及孩子当成朋友', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-011', text: '交谈时，会注意听别人说话', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-012', text: '在使用别人正在使用的物品时，会征求同意', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIP-013', text: '能和同伴计划将来要玩什么', domain: '社会互动', subdomain: 'SIP', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿社会性(SI)互动功能发育 - 与其他互动(SIE)
  { id: '48_60m-SIE-001', text: '能避免一般危险(如：破碎物品或危险的动物)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIE-002', text: '能先试着独立完成工作几分钟，而不急着寻求协助', domain: '社会互动', subdomain: 'SIE', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIE-003', text: '能完成一件工作(如：画图、拼图)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIE-004', text: '能在不同的学习区选择喜欢的活动', domain: '社会互动', subdomain: 'SIE', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIE-005', text: '小心使用他人物品', domain: '社会互动', subdomain: 'SIE', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIE-006', text: '能说出男人和女人的区别', domain: '社会互动', subdomain: 'SIE', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIE-007', text: '能分辨适当或不适当的行为', domain: '社会互动', subdomain: 'SIE', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIE-008', text: '能选择适当的行为，以替代不适当的行为', domain: '社会互动', subdomain: 'SIE', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIE-009', text: '能扮演不同的角色', domain: '社会互动', subdomain: 'SIE', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿社会性(SI)互动功能发育 - 情绪与自我(SIS)
  { id: '48_60m-SIS-001', text: '会对奇怪的问题或好笑的图片笑', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-002', text: '开始判断各种情况产生的原因', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-003', text: '表达情绪的行为更为准确、复杂', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-004', text: '随着语言发展，移情反应更深思熟虑', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-005', text: '能用较抽象的方式(如：唱歌)来表达自己的情绪', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-006', text: '可以把一些行为和道德规范相互比较，产生相应的情绪', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-007', text: '能具体描述自己的感觉(如：我累了)', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-008', text: '能说出自己喜欢的事或活动', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-009', text: '能说出眼耳鼻是做什么用的', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-010', text: '希望有独处或一个人的时候', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-011', text: '能回答关于如何保持清洁的方法', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-012', text: '能在游戏或学习时说出最喜欢哪一部分', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-013', text: '能说出婴儿是从哪里来', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-014', text: '能说出对某些事物的感觉', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-015', text: '能说出自己的愿望', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-016', text: '能正面看待自己，谈自己兴趣', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-017', text: '能说出自己在某时最喜欢做的事', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-SIS-018', text: '能对自己喜欢某些事物提出理解', domain: '社会互动', subdomain: 'SIS', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿认知(M)功能发育 - 注意(MAN)
  { id: '48_60m-MAN-001', text: '能注意事件中的细节', domain: '认知', subdomain: 'MAN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MAN-002', text: '能注意故事或事件中抽象的状况', domain: '认知', subdomain: 'MAN', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿认知(M)功能发育 - 记忆(MRN)
  { id: '48_60m-MRN-001', text: '能用语言描述电视中的故事情节', domain: '认知', subdomain: 'MRN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MRN-002', text: '能记得并重复听到的5-6个字的句子，且顺序正确(如：太阳出来了)', domain: '认知', subdomain: 'MRN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MRN-003', text: '在一次性呈现后,能再现10个熟悉物品中,能够记住4-5个', domain: '认知', subdomain: 'MRN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MRN-004', text: '再现10个不熟悉物品中,也能够大约记住2-3个', domain: '认知', subdomain: 'MRN', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿认知(M)功能发育 - 概念(MCN)
  { id: '48_60m-MCN-001', text: '能理解一样多的概念，并将2个、4个、6个及8个物品分成二堆，每堆(或每人)一样多', domain: '认知', subdomain: 'MCN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MCN-002', text: '能根据声音的特性进行分类(如：机器和人的声音)', domain: '认知', subdomain: 'MCN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MCN-003', text: '能理解过去、现在、将来。可能知道一星期各天的名称，但可能不清楚它们的顺序', domain: '认知', subdomain: 'MCN', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿认知(M)功能发育 - 推理(MIN)
  { id: '48_60m-MIN-001', text: '开始具备传递性推理能力，即对元素排列次序关系的一种推理（如，由A>B，B>C，推出A>C）', domain: '认知', subdomain: 'MIN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MIN-002', text: '具备因果推理能力(且许多儿童已经基本上具有了思维的可逆性)', domain: '认知', subdomain: 'MIN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MIN-003', text: '能够进行逆向的果→因推理', domain: '认知', subdomain: 'MIN', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿语言(ML)功能发育 - 口语理解(听)(MLUY)
  { id: '48_60m-MLUY-001', text: '了解"多远"', domain: '语言', subdomain: 'MLUY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLUY-002', text: '会区分相同或不同形状', domain: '语言', subdomain: 'MLUY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLUY-003', text: '懂得"多加一点"及"减少一点"', domain: '语言', subdomain: 'MLUY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLUY-004', text: '会在要求下指出一系列东西中，第几个是哪一个', domain: '语言', subdomain: 'MLUY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLUY-005', text: '懂得较复杂情节的故事', domain: '语言', subdomain: 'MLUY', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿语言(ML)功能发育 - 非语言理解(视)(MLUN)
  { id: '48_60m-MLUN-001', text: '能看图片说故事', domain: '语言', subdomain: 'MLUN', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿语言(ML)功能发育 - 口语表达(说)(MLEY)
  { id: '48_60m-MLEY-001', text: '已能和成人自由交谈', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-002', text: '声母l,s,zh.ch.sh.r', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-003', text: '会说钱币名称', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-004', text: '正确使用"为什么"', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-005', text: '为引起别人的注意，会用夸张的语调及简单语句', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-006', text: '至少能唱完一首完整的儿歌', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-007', text: '用"和"靠近"在…旁边"', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-008', text: '会用"一个"，会说出简单相反词', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-009', text: '会由1数到10或以上', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-010', text: '会解释字义', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-011', text: '能明确表示自己的思想', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-012', text: '能说出几种东西是什么做成的', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEY-013', text: '能描述下一步是什么', domain: '语言', subdomain: 'MLEY', ageBandKey: '48_60m', type: 'check', checked: false },

  // 一般儿语言(ML)功能发育 - 非语言表达(指)(MLEN)
  { id: '48_60m-MLEN-001', text: '照着图仿画三角形', domain: '语言', subdomain: 'MLEN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEN-002', text: '照着写数字', domain: '语言', subdomain: 'MLEN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEN-003', text: '能绘画简单的图形', domain: '语言', subdomain: 'MLEN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEN-004', text: '照着图仿画菱形', domain: '语言', subdomain: 'MLEN', ageBandKey: '48_60m', type: 'check', checked: false },
  { id: '48_60m-MLEN-005', text: '听写数字', domain: '语言', subdomain: 'MLEN', ageBandKey: '48_60m', type: 'check', checked: false },

  // 60-72个月题目
  // 躯肢体粗大动作(GM)功能发育
  { id: '60_72m-GM-001', text: '双手协同携物及单脚站立姿摆位下，可自主独立完成正确各单脚维持中线站立5秒并慢速数数1~5下的姿势控制', domain: '粗大动作', subdomain: 'GM', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-GM-002', text: '四点爬姿摆位下，可自主独立完成正确对侧交替抬脚、抬手及维持中线姿势控制10秒并能倒数第几回及正数数1~10秒活动与姿势控制(例如:10，1~10；9，1~10；~1，1~10)', domain: '粗大动作', subdomain: 'GM', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-GM-003', text: '各单脚站立摆位下，可自主独立完成正确单脚原地连续跳5下，及期间各维持5秒单脚站立姿势并能配合正数第几回及正数数1~5秒活动与姿势控制(例如:1，1~5；2，1~5；~5，1~5)', domain: '粗大动作', subdomain: 'GM', ageBandKey: '60_72m', type: 'check', checked: false },

  // 精细动作(FM)功能发育
  { id: '60_72m-FM-001', text: '穿衣(63个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-FM-002', text: '在牙刷上挤牙膏', domain: '精细动作', subdomain: 'FM', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-FM-003', text: '用筷子夹物(63个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-FM-004', text: '将纸对折再对折(66个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-FM-005', text: '画菱形', domain: '精细动作', subdomain: 'FM', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-FM-006', text: '会写一写字(66个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-FM-007', text: '使用刀子(72个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-FM-008', text: '能用铅笔写字或画', domain: '精细动作', subdomain: 'FM', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-FM-009', text: '会系鞋带(72个月)', domain: '精细动作', subdomain: 'FM', ageBandKey: '60_72m', type: 'check', checked: false },

  // 认知(M)功能发育 - 注意(MA) - 非动作认知(MAN)
  { id: '60_72m-MAN-001', text: '观察逐渐转变为一个相互独立的，有目的、有组织的过程(并开始逐步形成有方向的，自觉的观察力)', domain: '认知', subdomain: 'MAN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MAN-002', text: '有意识注意明显增强，能按活动的目的和成人的要求进行', domain: '认知', subdomain: 'MAN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MAN-003', text: '能照着示范者排列的顺序，将字排列成句子', domain: '认知', subdomain: 'MAN', ageBandKey: '60_72m', type: 'check', checked: false },

  // 认知(M)功能发育 - 记忆(MR) - 非动作认知(MRN)
  { id: '60_72m-MRN-001', text: '已有意识记忆，能接受家长和老师的要求，进行有目的的记忆', domain: '认知', subdomain: 'MRN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MRN-002', text: '10个熟悉物品中能够记住6-7个，不熟悉物品中也能记住4-5个', domain: '认知', subdomain: 'MRN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MRN-003', text: '能懂得应用一些记忆方法', domain: '认知', subdomain: 'MRN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MRN-004', text: '会把某些归类，建立起逻辑联系来提高记忆', domain: '认知', subdomain: 'MRN', ageBandKey: '60_72m', type: 'check', checked: false },

  // 认知(M)功能发育 - 概念(MC) - 非动作认知(MCN)
  { id: '60_72m-MCN-001', text: '能理解几种水果、蔬菜、花，并说出它们的用途', domain: '认知', subdomain: 'MCN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MCN-002', text: '能区分几种常见的树', domain: '认知', subdomain: 'MCN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MCN-003', text: '能说出水陆上的交通工具、常见家具的名称', domain: '认知', subdomain: 'MCN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MCN-004', text: '能说出四个季节的特征', domain: '认知', subdomain: 'MCN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MCN-005', text: '本体运动知觉发育成熟,有重量概念', domain: '认知', subdomain: 'MCN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MCN-006', text: '初步理解了"真实""虚构"', domain: '认知', subdomain: 'MCN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MCN-007', text: '知道一年12个月的名称', domain: '认知', subdomain: 'MCN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MCN-008', text: '时间概念比较准确可以看钟表', domain: '认知', subdomain: 'MCN', ageBandKey: '60_72m', type: 'check', checked: false },

  // 认知(M)功能发育 - 推理(MI) - 非动作认知(MIN)
  { id: '60_72m-MIN-001', text: '对自己的行为做初步评价', domain: '认知', subdomain: 'MIN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MIN-002', text: '有一定的道德感和责任感', domain: '认知', subdomain: 'MIN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MIN-003', text: '能对未来作出推论(如：车子会越来越多)', domain: '认知', subdomain: 'MIN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MIN-004', text: '能预期幻想结果(如：在下雪的时候应该穿什么衣服)', domain: '认知', subdomain: 'MIN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MIN-005', text: '能解决有顺序推论问题', domain: '认知', subdomain: 'MIN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MIN-006', text: '能解决有逻辑推理问题(如：根据三个图形的关系找出第四个图形)', domain: '认知', subdomain: 'MIN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MIN-007', text: '能准确判断自己能做什么，不能做什么', domain: '认知', subdomain: 'MIN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MIN-008', text: '会通过改变自己的行为来使同伴满意', domain: '认知', subdomain: 'MIN', ageBandKey: '60_72m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语理解(听)(MLUY)
  { id: '60_72m-MLUY-001', text: '会区分"最接近"、"最远"、"整个"、"一半"(61~66个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLUY-002', text: '能依要求正确找出1-10所要的数字', domain: '语言', subdomain: 'MLUY', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLUY-003', text: '了解"以前"、"以后"，区分"左右"(67~72个月)', domain: '语言', subdomain: 'MLUY', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLUY-004', text: '能猜10个左右谜语', domain: '语言', subdomain: 'MLUY', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLUY-005', text: '能较好地理解被动语句', domain: '语言', subdomain: 'MLUY', ageBandKey: '60_72m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言理解(视)(MLUN)
  { id: '60_72m-MLUN-001', text: '能读拼音及一些汉字(67~72个月)', domain: '语言', subdomain: 'MLUN', ageBandKey: '60_72m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 口语表达(说)(MLEY)
  { id: '60_72m-MLEY-001', text: '连词数量迅速增加(60~72个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLEY-002', text: '会说有因果转折、条件假设等关系的连词的句子（如"为了""结果""要不然"…）', domain: '语言', subdomain: 'MLEY', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLEY-003', text: '也会说成对连词的句子（如"没有…只有…""如果…就"）', domain: '语言', subdomain: 'MLEY', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLEY-004', text: '能很流利地表达复杂的句型，会讲较复杂的故事(67~72个月)', domain: '语言', subdomain: 'MLEY', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLEY-005', text: '会说量词，但还不能很正确地遵从"数词+量词+名词"，(如：一辆自行车)', domain: '语言', subdomain: 'MLEY', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLEY-006', text: '能讲出四季的名称和主要特点', domain: '语言', subdomain: 'MLEY', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLEY-007', text: '会说时间字汇：早上、中午、晚上', domain: '语言', subdomain: 'MLEY', ageBandKey: '60_72m', type: 'check', checked: false },

  // 语言(ML)功能发育 - 非语言表达(指)(MLEN)
  { id: '60_72m-MLEN-001', text: '照着写拼音、简单汉字(66个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLEN-002', text: '能仿写合体字(67~72个月)', domain: '语言', subdomain: 'MLEN', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-MLEN-003', text: '自行写出一些汉字', domain: '语言', subdomain: 'MLEN', ageBandKey: '60_72m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与人互动(SIP)
  { id: '60_72m-SIP-001', text: '在大人协助下，能和同伴玩简单的规则性游戏(如：五子棋)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-002', text: '能参与表决', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-003', text: '能遵守团体的规定', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-004', text: '会适当的回话(电话)，传达知道的讯息', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-005', text: '能参加集体活动，自我评价', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-006', text: '出现合作意识', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-007', text: '会选择要好的朋友', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-008', text: '在游戏中有些性别区分', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-009', text: '在大人监督下，独自到店里买简单物品', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-010', text: '在游戏中会遵守公平及规则', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-011', text: '能观察出游戏规则，与人轮流', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-012', text: '在学习中，与人合作', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-013', text: '会和同伴分享秘密(不告诉大人)', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIP-014', text: '努力使团体、老师满意，遵守团体规范', domain: '社会互动', subdomain: 'SIP', ageBandKey: '60_72m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 与其他互动(SIE)
  { id: '60_72m-SIE-001', text: '在大人监督下，在自己住家附近玩，而不会乱跑到马路上去', domain: '社会互动', subdomain: 'SIE', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIE-002', text: '能为家务事负责(主动不须监督就做好)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIE-003', text: '能表现出适当行为(如：在图书馆看书时知道小声讲话)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIE-004', text: '能完成一长期工作(如：浇花)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIE-005', text: '在日常生活中，能分辨现实和幻想', domain: '社会互动', subdomain: 'SIE', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIE-006', text: '能照着刚订定的计划执行', domain: '社会互动', subdomain: 'SIE', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIE-007', text: '能遵守自己的未来计划', domain: '社会互动', subdomain: 'SIE', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIE-008', text: '独立完成数件或复杂长久的工作', domain: '社会互动', subdomain: 'SIE', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIE-009', text: '能将作息内容和时间配对', domain: '社会互动', subdomain: 'SIE', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIE-010', text: '会玩简单桌上游戏(如：扑克牌)', domain: '社会互动', subdomain: 'SIE', ageBandKey: '60_72m', type: 'check', checked: false },

  // 社会性(SI)互动功能发育 - 情绪与自我(SIS)
  { id: '60_72m-SIS-001', text: '能采取积极的策略和认知策略，进行自我情绪控制', domain: '社会互动', subdomain: 'SIS', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIS-002', text: '遵守情绪表达规则，尽量表现积极情绪', domain: '社会互动', subdomain: 'SIS', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIS-003', text: '回答关于如何照顾自己的方法', domain: '社会互动', subdomain: 'SIS', ageBandKey: '60_72m', type: 'check', checked: false },
  { id: '60_72m-SIS-004', text: '知道自己观点，意识不到别人的观点', domain: '社会互动', subdomain: 'SIS', ageBandKey: '60_72m', type: 'check', checked: false }
];

// 工具函数：根据月龄获取年龄段
export function getAgeBandByMonths(ageMonths) {
  return ageBands.find(band => 
    ageMonths >= band.ageMinMonths && ageMonths <= band.ageMaxMonths
  ) || null;
}

// 工具函数：根据月龄和模式获取题目
export function pickQuestionsByAgeMonths(ageMonths, mode = 'band') {
  console.log(`=== 获取题目 ===`);
  console.log(`月龄: ${ageMonths}, 模式: ${mode}`);
  
  let targetAgeBands = [];
  
  if (mode === 'band') {
    // 精准模式：仅当前年龄段
    const currentBand = getAgeBandByMonths(ageMonths);
    if (currentBand) {
      targetAgeBands = [currentBand];
      console.log(`精准模式 - 当前年龄段: ${currentBand.label}`);
    }
  } else if (mode === 'cumulative') {
    // 累进模式：<= 当前月龄的所有段
    targetAgeBands = ageBands.filter(band => ageMonths >= band.ageMinMonths);
    console.log(`累进模式 - 年龄段: ${targetAgeBands.map(b => b.label).join(', ')}`);
  }
  
  if (targetAgeBands.length === 0) {
    console.log('未找到匹配的年龄段');
    return {};
  }
  
  // 获取目标年龄段的题目
  const targetKeys = targetAgeBands.map(band => band.key);
  const filteredQuestions = questions.filter(q => targetKeys.includes(q.ageBandKey));
  
  console.log(`找到题目数量: ${filteredQuestions.length}`);
  
  // 按领域分组
  const groupedQuestions = {};
  filteredQuestions.forEach(question => {
    const domain = question.domain;
    if (!groupedQuestions[domain]) {
      groupedQuestions[domain] = [];
    }
    groupedQuestions[domain].push({
      id: question.id,
      text: question.text,
      checked: question.checked,
      domain: question.domain,
      subdomain: question.subdomain,
      ageBandKey: question.ageBandKey
    });
  });
  
  console.log(`分组结果:`, Object.keys(groupedQuestions).map(domain => 
    `${domain}: ${groupedQuestions[domain].length}题`
  ).join(', '));
  
  return groupedQuestions;
}

// 兼容旧题库的转换函数
export function convertOldQuestions(oldQuestions) {
  return oldQuestions.map(q => {
    if (q.options && Array.isArray(q.options)) {
      // 旧格式：有options数组
      const hasDeveloped = q.options.some(opt => opt.value === '已具备' && opt.selected);
      return {
        ...q,
        type: 'check',
        checked: hasDeveloped
      };
    } else if (q.answer) {
      // 旧格式：有answer字段
      return {
        ...q,
        type: 'check',
        checked: q.answer === 'yes' || q.answer === true
      };
    } else {
      // 已经是新格式
      return q;
    }
  });
}
