<template>
	<view class="result-container">
		<!-- 1️⃣ 报告头部 -->
		<view class="header">
			<image src="/static/logo.png" class="logo" mode="aspectFit" />
		<view class="child-info">
			<text class="name">{{ childInfo.name || '未填写' }}</text>
			<text class="meta">{{ childInfo.ageBand || '' }}</text>
		</view>
		<view class="score-box">
			<text class="score">{{ summary.overallScore }}%</text>
			<text class="level">{{ summary.level }}</text>
		</view>
		</view>

		<!-- 2️⃣ 柱状图 -->
		<view class="chart-section">
			<text class="section-title">各领域发育完成率</text>
			
			<!-- 各领域汇总柱状图 -->
			<view class="domain-overview" v-for="(domainData, domain) in summary.domains" :key="domain">
				<text class="domain-title">{{ domain }}</text>
				<text class="domain-score">{{ Math.round(domainData.ratio * 100) }}%</text>
				
				<!-- 子领域详细柱状图 -->
				<view class="chart" v-if="domainData.subdomains">
					<view class="chart-bars">
						<view 
							class="chart-bar" 
							v-for="(subData, subdomain) in domainData.subdomains" 
							:key="subdomain"
						>
						<view class="bar-container">
							<view 
								class="bar-fill" 
								:style="{ height: (subData.ratio * 280) + 'rpx' }"
								:class="subData.ratio >= 0.8 ? 'bar-excellent' : (subData.ratio >= 0.6 ? 'bar-good' : (subData.ratio >= 0.4 ? 'bar-fair' : 'bar-poor'))"
							></view>
						</view>
							<text class="bar-label">{{ getSubdomainLabel(subdomain) }}</text>
							<text class="bar-value">{{ Math.round(subData.ratio * 100) }}%</text>
							<text class="bar-count">{{ subData.passed }}/{{ subData.total }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 3️⃣ 未达标明细（仅教师可见） -->
		<view v-if="role === 'teacher'" class="table-section">
			<text class="section-title">未达标项目</text>
			<view v-if="notAchieved.length > 0">
				<view class="table-header">
					<text class="col-domain">领域</text>
					<text class="col-title">项目</text>
					<text class="col-age">年龄段</text>
				</view>
				<view 
					v-for="(item, index) in notAchieved" 
					:key="index" 
					class="table-row"
				>
					<text class="col-domain">{{ item.domain }}</text>
					<text class="col-title">{{ item.title }}</text>
					<text class="col-age">{{ item.ageBand }}</text>
				</view>
			</view>
			<view v-else class="empty-state">
				<text class="empty-text">所有项目均已达标</text>
			</view>
		</view>

	<!-- 4️⃣ 操作按钮 -->
	<view class="footer-buttons">
		<button class="btn secondary" @click="goToUserCenter">个人中心</button>
		<button class="btn primary" @click="startNew">重新评估</button>
	</view>
	</view>
</template>

<script>
// 子领域标签映射
const subdomainLabels = {
	'OSV': '视知觉',
	'OSH': '听知觉',
	'OST': '触知觉',
	'ISP': '本体运动知觉',
	'ISV': '前庭平衡知觉',
	'GM': '躯肢体粗大动作',
	'UEM': '双上肢粗大动作',
	'FM': '精细动作',
	'SIP': '社会互动',
	'SIE': '社会情绪',
	'COG': '认知',
	'LANG': '语言',
	'OM': '口腔动作'
}

	export default {
		data() {
			return {
				role: 'parent', // 'parent' 或 'teacher' - 用于控制界面显示
				childInfo: {
					name: '',
					ageBand: '',
					gender: ''
				},
				summary: {
					overallScore: 0,
					level: '',
					domains: {} // { '认知': { ratio: 0.8 }, '语言': { ratio: 0.65 }, ... }
				},
				notAchieved: [] // [{domain, title, ageBand}] - 仅教师端可见
			}
		},
		onLoad(options) {
			// TODO: 后续对接云函数
			// if (options.id) {
			//   this.loadFromCloud(options.id)
			// } else {
			//   this.loadFromLocal()
			// }
			
			// 临时：从本地存储加载
			this.loadFromLocal()
		},
		methods: {
	// 从本地存储加载数据
	loadFromLocal() {
		const result = uni.getStorageSync('assessmentResult')
		console.log('=== 加载评估结果 ===')
		console.log('评估结果:', result)
		
		if (!result) {
			uni.showToast({
				title: '未找到评估结果',
				icon: 'none'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
			return
		}
		
		// 设置基本信息
		this.childInfo = {
			name: result.childInfo?.name || result.childName || '',
			ageBand: result.childInfo?.ageBand || '',
			gender: result.childInfo?.gender || result.gender || ''
		}
		
		// ✅ 优先使用云数据库返回的 stats 数据
		if (result.stats && result.stats.overall) {
			console.log('=== 使用云数据库统计数据 ===')
			this.loadFromCloudData(result)
		} else {
			// 兜底：使用 formState 重新计算（旧数据格式）
			console.log('=== 使用 formState 计算统计数据 ===')
			this.calculateSummary(result)
		}
		
		// TODO: 教师端还需要计算 notAchieved
		// this.notAchieved = this.calculateNotAchieved(result)
	},
	
	// 从云数据库数据加载（新增）
	loadFromCloudData(result) {
		const stats = result.stats
		
		console.log('=== 云数据详情 ===')
		console.log('stats.overall:', stats.overall)
		console.log('stats.domains keys:', stats.domains ? Object.keys(stats.domains) : [])
		console.log('stats.subdomains keys:', stats.subdomains ? Object.keys(stats.subdomains).slice(0, 10) : [])
		
		// 计算总得分
		const overallScore = result.scorePercent || Math.round((stats.overall?.ratio || 0) * 100)
		console.log('计算得分:', overallScore, '来源:', result.scorePercent ? 'scorePercent' : 'stats.overall.ratio')
		
		// 转换 domains 格式
		const domains = {}
		
		// 处理 domains 统计
		if (stats.domains) {
			Object.keys(stats.domains).forEach(domainKey => {
				const domainStats = stats.domains[domainKey]
				console.log(`领域 ${domainKey}:`, domainStats)
				
				domains[domainKey] = {
					ratio: domainStats.ratio || 0,
					subdomains: {}
				}
			})
		}
		
		// 处理 subdomains 统计
		if (stats.subdomains) {
			Object.keys(stats.subdomains).forEach(subdomainKey => {
				// subdomainKey 格式: "domain::subdomain"
				const parts = subdomainKey.split('::')
				if (parts.length !== 2) {
					console.warn('子领域 key 格式不正确:', subdomainKey)
					return
				}
				
				const [domain, subdomain] = parts
				const subdomainStats = stats.subdomains[subdomainKey]
				
				// 如果 domain 不存在，创建它
				if (!domains[domain]) {
					console.log(`创建缺失的领域: ${domain}`)
					domains[domain] = {
						ratio: 0,
						subdomains: {}
					}
				}
				
				domains[domain].subdomains[subdomain] = {
					passed: subdomainStats.passed,
					total: subdomainStats.total,
					ratio: subdomainStats.ratio
				}
			})
		}
		
		this.summary = {
			overallScore,
			level: result.level || this.getLevelText(overallScore),
			domains
		}
		
		console.log('=== 加载完成 ===')
		console.log('完成率:', overallScore + '%')
		console.log('等级:', this.summary.level)
		console.log('领域数量:', Object.keys(domains).length)
		console.log('领域列表:', Object.keys(domains))
		
		// 输出每个领域的子领域数量
		Object.keys(domains).forEach(domain => {
			const subdomainCount = Object.keys(domains[domain].subdomains).length
			console.log(`  ${domain}: ${subdomainCount} 个子领域, 完成率: ${(domains[domain].ratio * 100).toFixed(1)}%`)
		})
	},
			
		// 计算汇总数据
		calculateSummary(result) {
			// 从结果中获取数据
			const answers = result.answers || {}
			const formState = result.formState || {}
			
			console.log('=== 计算统计 ===')
			console.log('answers:', answers)
			console.log('formState keys:', Object.keys(formState))
			
			const domains = {}
			let totalPassed = 0
			let totalQuestions = 0
			
			// 按领域统计（从 formState 或 answers 获取）
			Object.keys(formState).forEach(domain => {
				const domainQuestions = formState[domain] || []
				const domainPassed = domainQuestions.filter(q => q.checked === true || answers[q.id] === 1).length
				const domainTotal = domainQuestions.length
				const domainRatio = domainTotal > 0 ? domainPassed / domainTotal : 0
				
				// 按 subdomain 分组统计
				const subdomains = {}
				domainQuestions.forEach(question => {
					const subdomain = question.subdomain || '未分类'
					if (!subdomains[subdomain]) {
						subdomains[subdomain] = { total: 0, passed: 0 }
					}
					subdomains[subdomain].total++
					// 检查是否通过
					if (question.checked === true || answers[question.id] === 1) {
						subdomains[subdomain].passed++
					}
				})
				
				// 计算各子领域的比例
				Object.keys(subdomains).forEach(subdomain => {
					const subStats = subdomains[subdomain]
					subStats.ratio = subStats.total > 0 ? subStats.passed / subStats.total : 0
				})
				
				domains[domain] = {
					ratio: domainRatio,
					subdomains
				}
				
				totalPassed += domainPassed
				totalQuestions += domainTotal
			})
			
			const overallScore = totalQuestions > 0 ? Math.round((totalPassed / totalQuestions) * 100) : 0
			
			this.summary = {
				overallScore,
				level: this.getLevelText(overallScore),
				domains
			}
			
			console.log('计算完成 - 完成率:', overallScore + '%')
			console.log('领域统计:', domains)
		},
			
		// 获取子领域中文标签
		getSubdomainLabel(subdomain) {
			return subdomainLabels[subdomain] || subdomain
		},
		
		// 获取柱状图颜色类
		getBarColorClass(ratio) {
			if (ratio >= 0.8) return 'bar-excellent'     // 优秀（蓝）
			if (ratio >= 0.6) return 'bar-good'          // 良好（绿）
			if (ratio >= 0.4) return 'bar-fair'          // 普通（黄）
			return 'bar-poor'                             // 需关注（橙）
		},
			
			// 获取等级文本
			getLevelText(score) {
				if (score >= 90) return '优秀'
				if (score >= 75) return '良好'
				if (score >= 60) return '正常'
				if (score >= 40) return '需关注'
				return '需干预'
			},
			
		// 跳转到个人中心
		goToUserCenter() {
			uni.navigateTo({
				url: '/pages/user-center/user-center'
			})
		},
			
			// 重新评估
			startNew() {
				uni.showModal({
					title: '重新评估',
					content: '确定要开始新的评估吗？',
					success: (res) => {
						if (res.confirm) {
							// 清除评估数据
							uni.removeStorageSync('assessmentForm')
							uni.removeStorageSync('assessmentResult')
							
							// 跳转到儿童信息页
							uni.redirectTo({
								url: '/pages/child-info/child-info'
							})
						}
					}
				})
			},
			
			// TODO: 对接云函数 - 家长端
			loadFromCloudForParent(assessmentId) {
				// 示例代码
				uniCloud.callFunction({
					name: 'getAssessmentForParent',
					data: { assessmentId }
				}).then(res => {
					this.summary = res.result.data.stats
					this.childInfo = res.result.data.childInfo
				})
			},
			
			// TODO: 对接云函数 - 教师端
			loadFromCloudForTeacher(assessmentId) {
				// 示例代码
				uniCloud.callFunction({
					name: 'getAssessmentForTeacher',
					data: { assessmentId }
				}).then(res => {
					Object.assign(this, res.result.data)
				})
			}
		}
	}
</script>

<style scoped>
	.result-container {
		background: #f9fbfe;
		min-height: 100vh;
		padding: 20rpx;
		padding-bottom: 150rpx;
	}

	/* ========== 1. Header 头部 ========== */
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.logo {
		width: 160rpx;
		height: 160rpx;
		margin-bottom: 20rpx;
	}

	.child-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.name {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}

	.meta {
		font-size: 26rpx;
		color: #888;
	}

	.score-box {
		background: #e9f5ff;
		border-radius: 16rpx;
		padding: 16rpx 40rpx;
		text-align: center;
		min-width: 200rpx;
	}

	.score {
		display: block;
		font-size: 60rpx;
		color: #007aff;
		font-weight: 600;
		line-height: 1.2;
	}

	.level {
		display: block;
		font-size: 28rpx;
		color: #666;
		margin-top: 5rpx;
	}

	/* ========== 2. Chart 柱状图 ========== */
	.chart-section {
		margin-top: 20rpx;
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.section-title {
		display: block;
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 30rpx;
	}

	.domain-overview {
		margin-bottom: 40rpx;
		background: #f8f9fa;
		border-radius: 15rpx;
		padding: 20rpx;
	}

	.domain-overview:last-child {
		margin-bottom: 0;
	}

	.domain-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 8rpx;
		display: block;
	}

	.domain-score {
		font-size: 24rpx;
		color: #007aff;
		font-weight: 500;
		margin-bottom: 20rpx;
		display: block;
	}

	.chart {
		width: 100%;
	}

	.chart-bars {
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		height: 400rpx;
		padding: 0 10rpx;
	}

	.chart-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		margin: 0 5rpx;
	}

	.bar-container {
		width: 100%;
		height: 280rpx;
		background: #f0f0f0;
		border-radius: 10rpx;
		position: relative;
		margin-bottom: 15rpx;
		overflow: hidden;
	}

	.bar-fill {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		min-height: 20rpx;
		border-radius: 10rpx 10rpx 0 0;
		transition: height 0.5s ease;
	}

	.bar-excellent {
		background: linear-gradient(180deg, #007aff 0%, #4da3ff 100%);
	}

	.bar-good {
		background: linear-gradient(180deg, #28a745 0%, #5dd875 100%);
	}

	.bar-fair {
		background: linear-gradient(180deg, #ffc107 0%, #ffeb3b 100%);
	}

	.bar-poor {
		background: linear-gradient(180deg, #ff9800 0%, #ffb74d 100%);
	}

	.bar-label {
		font-size: 22rpx;
		color: #666;
		margin-top: 10rpx;
		word-break: keep-all;
		text-align: center;
	}

	.bar-value {
		font-size: 22rpx;
		color: #007aff;
		font-weight: 500;
		margin-top: 5rpx;
	}

	.bar-count {
		font-size: 18rpx;
		color: #999;
		margin-top: 3rpx;
	}

	/* ========== 3. Table 未达标明细 ========== */
	.table-section {
		margin-top: 20rpx;
		background: #fff;
		border-radius: 20rpx;
		padding: 20rpx 30rpx;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.table-header {
		display: flex;
		padding: 15rpx 0;
		border-bottom: 2rpx solid #e5e5e5;
		margin-bottom: 15rpx;
	}

	.table-header .col-domain,
	.table-header .col-title,
	.table-header .col-age {
		font-weight: 600;
		font-size: 26rpx;
		color: #333;
	}

	.table-row {
		display: flex;
		padding: 15rpx 0;
		border-bottom: 1rpx solid #eee;
	}

	.table-row:last-child {
		border-bottom: none;
	}

	.col-domain {
		width: 120rpx;
		font-size: 24rpx;
		color: #007aff;
		font-weight: 500;
	}

	.col-title {
		flex: 1;
		margin: 0 20rpx;
		font-size: 24rpx;
		color: #333;
		line-height: 1.4;
	}

	.col-age {
		width: 120rpx;
		font-size: 24rpx;
		color: #999;
		text-align: right;
	}

	.empty-state {
		text-align: center;
		padding: 60rpx 0;
	}

	.empty-text {
		font-size: 26rpx;
		color: #999;
	}

	/* ========== 4. Footer Buttons 按钮 ========== */
	.footer-buttons {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30rpx;
		background: #fff;
		border-top: 1rpx solid #eee;
		display: flex;
		gap: 20rpx;
		box-shadow: 0 -4rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.btn {
		flex: 1;
		height: 80rpx;
		border-radius: 40rpx;
		border: none;
		font-size: 28rpx;
		font-weight: 600;
	}

	.btn.secondary {
		background: #e5e5e5;
		color: #333;
	}

	.btn.primary {
		background: #007aff;
		color: #fff;
	}
</style>