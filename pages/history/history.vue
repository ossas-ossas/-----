<template>
	<view class="container">
	<!-- 页面标题 -->
	<view class="page-header">
		<text class="page-title">评估历史记录</text>
		<text class="page-subtitle">查看过往的评估记录和发育趋势</text>
	</view>
	
	<!-- 加载中 -->
	<view v-if="loading" class="loading-container">
		<view class="loading-spinner"></view>
		<text class="loading-text">加载中...</text>
	</view>
	
	<!-- 有数据时显示 -->
	<template v-else-if="assessmentHistory.length > 0">
		<!-- 统计概览 -->
		<view class="stats-container">
			<view class="stat-item">
				<text class="stat-number">{{ assessmentHistory.length }}</text>
				<text class="stat-label">总评估次数</text>
			</view>
			<view class="stat-item">
				<text class="stat-number">{{ latestScore }}</text>
				<text class="stat-label">最新得分</text>
			</view>
			<view class="stat-item">
				<text class="stat-number">{{ averageScore }}</text>
				<text class="stat-label">平均得分</text>
			</view>
		</view>
		
		<!-- 历史记录列表 -->
		<view class="history-container">
			<view 
				class="history-item" 
				v-for="(record, index) in assessmentHistory" 
				:key="index"
				@click="viewRecord(record)"
			>
				<view class="record-header">
					<view class="record-info">
						<text class="child-name">{{ record.childInfo.name }}</text>
						<text class="record-date">{{ formatDate(record.assessmentDate) }}</text>
					</view>
					<view class="score-badge" :class="record.scorePercent >= 80 ? 'score-good' : (record.scorePercent >= 60 ? 'score-normal' : 'score-attention')">
						<text class="score-text">{{ record.scorePercent }}分</text>
					</view>
				</view>
				
				<view class="record-details">
					<view class="detail-row">
						<text class="detail-label">年龄：</text>
						<text class="detail-value">{{ calculateAge(record.childInfo.birthDate, record.assessmentDate) }}</text>
					</view>
				<view class="detail-row">
					<text class="detail-label">评估等级：</text>
					<text class="detail-value" :class="record.scorePercent >= 80 ? 'score-good' : (record.scorePercent >= 60 ? 'score-normal' : 'score-attention')">
						{{ getScoreLevel(record.scorePercent) }}
					</text>
				</view>
				</view>
				
				<view class="record-footer">
					<text class="view-text">点击查看详情 →</text>
				</view>
		</view>
	</view>
		
		<!-- 趋势分析 -->
		<view class="trend-section" v-if="assessmentHistory.length > 1">
			<view class="section-title">
				<text class="title-text">发育趋势</text>
			</view>
			
			<view class="trend-chart">
				<view class="chart-container">
					<view 
						class="trend-point" 
						v-for="(record, index) in assessmentHistory.slice(0, 5)" 
						:key="index"
						:style="{ 
							left: (index / (Math.min(assessmentHistory.length, 5) - 1)) * 100 + '%',
							bottom: (record.scorePercent / 100) * 200 + 'rpx'
						}"
					>
						<view class="point-circle" :class="record.scorePercent >= 80 ? 'score-good' : (record.scorePercent >= 60 ? 'score-normal' : 'score-attention')"></view>
						<text class="point-score">{{ record.scorePercent }}</text>
					</view>
					
					<!-- 趋势线 -->
					<view class="trend-line"></view>
				</view>
				
				<view class="chart-labels">
					<text class="label-text">最早</text>
					<text class="label-text">最新</text>
				</view>
			</view>
		</view>
		
	<!-- 操作按钮 -->
	<view class="action-container">
		<button class="action-button primary" @click="startAssessment">
			<text class="button-text">新的评估</text>
		</button>
	</view>
	</template>
	
	<!-- 空状态 -->
	<view class="empty-state" v-else>
		<view class="empty-icon">
			<text class="icon-text">📋</text>
		</view>
		<text class="empty-title">暂无评估记录</text>
		<text class="empty-desc">开始第一次评估，记录孩子的成长历程</text>
		<button class="start-button" @click="startAssessment">
			<text class="button-text">开始评估</text>
		</button>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				assessmentHistory: [],
				loading: true
			}
		},
		computed: {
			// 最新得分
			latestScore() {
				if (this.assessmentHistory.length === 0) return 0
				const latest = this.assessmentHistory[0]
				// 支持多种数据格式
				return latest.scorePercent || Math.round((latest.stats?.ratio || 0) * 100) || 0
			},
			
			// 平均得分
			averageScore() {
				if (this.assessmentHistory.length === 0) return 0
				const sum = this.assessmentHistory.reduce((total, record) => {
					const score = record.scorePercent || Math.round((record.stats?.ratio || 0) * 100) || 0
					return total + score
				}, 0)
				return Math.round(sum / this.assessmentHistory.length)
			}
		},
		onLoad() {
			this.loadHistory()
		},
		onShow() {
			// 每次显示页面时重新加载数据
			this.loadHistory()
		},
		methods: {
			// 加载历史记录（从云数据库）
			async loadHistory() {
				this.loading = true
				
				try {
					// 获取当前用户 ID
					const token = uni.getStorageSync('uni_id_token')
					if (!token) {
						console.warn('[history] 未登录，无法加载历史记录')
						this.assessmentHistory = []
						return
					}
					
					// 从 token 获取 uid
					const tokenArr = token.split('.')
					let uid = ''
					if (tokenArr.length === 3) {
						try {
							const payload = JSON.parse(decodeURIComponent(escape(atob(tokenArr[1]))))
							uid = payload.uid
						} catch (e) {
							console.error('[history] 解析 token 失败:', e)
						}
					}
					
					if (!uid) {
						console.warn('[history] 无法获取用户 ID')
						this.assessmentHistory = []
						return
					}
					
				console.log('[history] 从云数据库加载评估记录，用户 ID:', uid)
				
				// 1. 查询评估记录
				const db = uniCloud.database()
				const res = await db.collection('assessments')
					.where({
						ownerUid: uid,  // ✅ 修正：字段名是 ownerUid
						source: 'submit'
					})
					.orderBy('createdAt', 'desc')  // ✅ 修正：按创建时间排序
					.limit(50)
					.get()
				
				console.log('[history] 查询到的评估记录数:', res.result?.data?.length || 0)
					
				if (res.result && res.result.data && res.result.data.length > 0) {
					// 2. 获取所有唯一的 childId
					const childIds = [...new Set(res.result.data.map(r => r.childId).filter(Boolean))]
					console.log('[history] 需要查询的儿童档案 ID:', childIds)
					
					// 3. 批量查询儿童档案信息
					let childProfiles = {}
					if (childIds.length > 0) {
						try {
							const dbCmd = db.command
							const profilesRes = await db.collection('child_profiles')
								.where({
									_id: dbCmd.in(childIds)
								})
								.field({ _id: true, name: true, birthDate: true, gender: true })
								.get()
							
							// 将儿童信息转换为 map，方便查找
							if (profilesRes.result && profilesRes.result.data) {
								profilesRes.result.data.forEach(profile => {
									childProfiles[profile._id] = profile
								})
								console.log('[history] 查询到的儿童档案数:', Object.keys(childProfiles).length)
							}
						} catch (profileError) {
							console.error('[history] 查询儿童档案失败:', profileError)
						}
					}
					
					// 4. 转换数据格式，关联儿童信息
					this.assessmentHistory = res.result.data.map(record => {
						// 计算得分百分比
						const ratio = record.stats?.overall?.ratio || record.stats?.ratio || 0
						const scorePercent = record.scorePercent || Math.round(ratio * 100)
						
						// 关联儿童信息
						const childProfile = childProfiles[record.childId] || {}
						
						return {
							...record,
							scorePercent,
							assessmentDate: record.createdAt || Date.now(),  // ✅ 使用 createdAt
							childInfo: {
								name: childProfile.name || '未知',
								birthDate: childProfile.birthDate || '',
								gender: childProfile.gender || ''
							}
						}
					})
					
					console.log('[history] 加载了 ' + this.assessmentHistory.length + ' 条记录')
					if (this.assessmentHistory.length > 0) {
						console.log('[history] 第一条记录示例:', {
							scorePercent: this.assessmentHistory[0].scorePercent,
							childName: this.assessmentHistory[0].childInfo.name,
							createdAt: new Date(this.assessmentHistory[0].assessmentDate).toLocaleString()
						})
					}
				} else {
					this.assessmentHistory = []
					console.log('[history] 没有找到评估记录')
				}
					
				} catch (error) {
					console.error('[history] 加载历史记录失败:', error)
					uni.showToast({
						title: '加载失败',
						icon: 'none'
					})
					this.assessmentHistory = []
				} finally {
					this.loading = false
				}
			},
			
			// 格式化日期
			formatDate(dateString) {
				const date = new Date(dateString)
				const now = new Date()
				const diffTime = now - date
				const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
				
				if (diffDays === 0) {
					return '今天'
				} else if (diffDays === 1) {
					return '昨天'
				} else if (diffDays < 7) {
					return `${diffDays}天前`
				} else {
					return `${date.getMonth() + 1}月${date.getDate()}日`
				}
			},
			
			// 计算年龄
			calculateAge(birthDate, assessmentDate) {
				const birth = new Date(birthDate)
				const assessment = new Date(assessmentDate)
				let age = assessment.getFullYear() - birth.getFullYear()
				const monthDiff = assessment.getMonth() - birth.getMonth()
				
				if (monthDiff < 0 || (monthDiff === 0 && assessment.getDate() < birth.getDate())) {
					age--
				}
				
				if (age < 1) {
					const months = Math.floor((assessment - birth) / (1000 * 60 * 60 * 24 * 30))
					return `${months}个月`
				}
				
				return `${age}岁`
			},
			
			// 获取评分等级
			getScoreLevel(score) {
				if (score >= 80) return '发育良好'
				if (score >= 60) return '发育正常'
				return '需要关注'
			},
			
			// 获取评分样式类
			getScoreClass(score) {
				if (score >= 80) return 'score-good'
				if (score >= 60) return 'score-normal'
				return 'score-attention'
			},
			
		// 查看记录详情
		viewRecord(record) {
			console.log('[history] 查看评估详情')
			console.log('[history] 记录 ID:', record._id)
			console.log('[history] 得分:', record.scorePercent)
			console.log('[history] stats 结构:', {
				hasStats: !!record.stats,
				hasOverall: !!(record.stats && record.stats.overall),
				hasDomains: !!(record.stats && record.stats.domains),
				hasSubdomains: !!(record.stats && record.stats.subdomains)
			})
			
			// 保存当前记录到本地存储
			uni.setStorageSync('assessmentResult', record)
			
			// 跳转到结果页面
			uni.navigateTo({
				url: '/pages/result/result'
			})
		},
			
		// 开始评估
		startAssessment() {
			uni.navigateTo({
				url: '/pages/child-info/child-info'
			})
		}
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		background: linear-gradient(135deg, #E8F4FD 0%, #F0F8FF 100%);
		padding: 30rpx;
		padding-bottom: 120rpx;
		position: relative;
		overflow: hidden;
	}
	
	/* 移除背景图装饰，微信小程序不支持 WXSS 中使用本地图片 */
	
/* 页面标题 */
.page-header {
	text-align: center;
	margin-bottom: 40rpx;
}

/* 加载状态 */
.loading-container {
	text-align: center;
	padding: 100rpx 0;
}

.loading-spinner {
	width: 60rpx;
	height: 60rpx;
	margin: 0 auto 20rpx;
	border: 4rpx solid #E8F4FD;
	border-top-color: #E93A8A;
	border-radius: 50%;
	animation: spin 0.8s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

.loading-text {
	display: block;
	font-size: 26rpx;
	color: #999;
}
	
	.page-title {
		display: block;
		font-size: 40rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 15rpx;
	}
	
	.page-subtitle {
		display: block;
		font-size: 26rpx;
		color: #7F8C8D;
		line-height: 1.5;
	}
	
	/* 统计概览 */
	.stats-container {
		display: flex;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.stat-item {
		flex: 1;
		text-align: center;
	}
	
	.stat-number {
		display: block;
		font-size: 36rpx;
		font-weight: bold;
		color: #87CEEB;
		margin-bottom: 10rpx;
	}
	
	.stat-label {
		font-size: 24rpx;
		color: #7F8C8D;
	}
	
	/* 历史记录 */
	.history-container {
		margin-bottom: 30rpx;
	}
	
	.history-item {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		transition: all 0.3s;
	}
	
	.history-item:active {
		transform: translateY(-2rpx);
		box-shadow: 0 6rpx 25rpx rgba(0, 0, 0, 0.12);
	}
	
	.record-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}
	
	.record-info {
		flex: 1;
	}
	
	.child-name {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 8rpx;
	}
	
	.record-date {
		font-size: 24rpx;
		color: #7F8C8D;
	}
	
	.score-badge {
		padding: 12rpx 20rpx;
		border-radius: 20rpx;
		min-width: 80rpx;
		text-align: center;
	}
	
	.score-badge.score-good {
		background: rgba(152, 251, 152, 0.2);
		color: #27AE60;
	}
	
	.score-badge.score-normal {
		background: rgba(135, 206, 235, 0.2);
		color: #3498DB;
	}
	
	.score-badge.score-attention {
		background: rgba(255, 182, 193, 0.2);
		color: #E74C3C;
	}
	
	.score-text {
		font-size: 26rpx;
		font-weight: bold;
	}
	
	.record-details {
		margin-bottom: 20rpx;
	}
	
	.detail-row {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}
	
	.detail-row:last-child {
		margin-bottom: 0;
	}
	
	.detail-label {
		font-size: 26rpx;
		color: #7F8C8D;
		margin-right: 10rpx;
	}
	
	.detail-value {
		font-size: 26rpx;
		color: #2C3E50;
		font-weight: 500;
	}
	
	.detail-value.score-good {
		color: #27AE60;
	}
	
	.detail-value.score-normal {
		color: #3498DB;
	}
	
	.detail-value.score-attention {
		color: #E74C3C;
	}
	
	.record-footer {
		text-align: right;
		padding-top: 15rpx;
		border-top: 1rpx solid #E8F4FD;
	}
	
	.view-text {
		font-size: 24rpx;
		color: #87CEEB;
		font-weight: 500;
	}
	
	/* 空状态 */
	.empty-state {
		text-align: center;
		padding: 100rpx 30rpx;
	}
	
	.empty-icon {
		width: 120rpx;
		height: 120rpx;
		background: rgba(135, 206, 235, 0.1);
		border-radius: 50%;
		margin: 0 auto 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.empty-icon .icon-text {
		font-size: 60rpx;
	}
	
	.empty-title {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 15rpx;
	}
	
	.empty-desc {
		display: block;
		font-size: 26rpx;
		color: #7F8C8D;
		line-height: 1.5;
		margin-bottom: 40rpx;
	}
	
	.start-button {
		width: 300rpx;
		height: 80rpx;
		background: linear-gradient(135deg, #E93A8A, #009FC2);
		border-radius: 40rpx;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4rpx 15rpx rgba(135, 206, 235, 0.3);
	}
	
	.button-text {
		font-size: 28rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	
	/* 趋势分析 */
	.trend-section {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.section-title {
		margin-bottom: 30rpx;
		padding-bottom: 15rpx;
		border-bottom: 2rpx solid #E8F4FD;
	}
	
	.title-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #34495E;
	}
	
	.trend-chart {
		position: relative;
		height: 250rpx;
		margin-bottom: 20rpx;
	}
	
	.chart-container {
		position: relative;
		width: 100%;
		height: 200rpx;
		background: #F8F9FA;
		border-radius: 15rpx;
		padding: 20rpx;
	}
	
	.trend-point {
		position: absolute;
		transform: translateX(-50%);
	}
	
	.point-circle {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		margin: 0 auto 5rpx;
	}
	
	.point-circle.score-good {
		background: #98FB98;
	}
	
	.point-circle.score-normal {
		background: #87CEEB;
	}
	
	.point-circle.score-attention {
		background: #FFB6C1;
	}
	
	.point-score {
		display: block;
		font-size: 20rpx;
		color: #7F8C8D;
		text-align: center;
		font-weight: bold;
	}
	
	.trend-line {
		position: absolute;
		top: 50%;
		left: 20rpx;
		right: 20rpx;
		height: 2rpx;
		background: linear-gradient(90deg, #E93A8A, #009FC2);
		opacity: 0.6;
	}
	
	.chart-labels {
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
	}
	
	.label-text {
		font-size: 22rpx;
		color: #BDC3C7;
	}
	
	/* 操作按钮 */
	.action-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30rpx;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10rpx);
		border-top: 1rpx solid #E8F4FD;
		display: flex;
		gap: 20rpx;
	}
	
	.action-button {
		flex: 1;
		height: 80rpx;
		border-radius: 40rpx;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: bold;
		transition: all 0.3s;
	}
	
	.action-button.secondary {
		background: #F8F9FA;
		color: #7F8C8D;
		border: 2rpx solid #E8F4FD;
	}
	
	.action-button.primary {
		background: linear-gradient(135deg, #E93A8A, #009FC2);
		color: #FFFFFF;
		box-shadow: 0 4rpx 15rpx rgba(233, 58, 138, 0.3);
	}
</style>
