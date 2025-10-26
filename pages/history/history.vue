<template>
	<view class="container">
		<!-- 页面标题 -->
		<view class="page-header">
			<text class="page-title">评估历史记录</text>
			<text class="page-subtitle">查看过往的评估记录和发育趋势</text>
		</view>
		
		<!-- 统计概览 -->
		<view class="stats-container" v-if="assessmentHistory.length > 0">
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
		<view class="history-container" v-if="assessmentHistory.length > 0">
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
					<view class="score-badge" :class="getScoreClass(record.scorePercent)">
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
						<text class="detail-value" :class="getScoreClass(record.scorePercent)">
							{{ getScoreLevel(record.scorePercent) }}
						</text>
					</view>
				</view>
				
				<view class="record-footer">
					<text class="view-text">点击查看详情 →</text>
				</view>
			</view>
		</view>
		
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
						<view class="point-circle" :class="getScoreClass(record.scorePercent)"></view>
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
		<view class="action-container" v-if="assessmentHistory.length > 0">
			<button class="action-button secondary" @click="clearHistory">
				<text class="button-text">清空记录</text>
			</button>
			<button class="action-button primary" @click="startAssessment">
				<text class="button-text">新的评估</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				assessmentHistory: []
			}
		},
		computed: {
			// 最新得分
			latestScore() {
				if (this.assessmentHistory.length === 0) return 0
				return this.assessmentHistory[0].scorePercent
			},
			
			// 平均得分
			averageScore() {
				if (this.assessmentHistory.length === 0) return 0
				const sum = this.assessmentHistory.reduce((total, record) => total + record.scorePercent, 0)
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
			// 加载历史记录
			loadHistory() {
				this.assessmentHistory = uni.getStorageSync('assessmentHistory') || []
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
			},
			
			// 清空历史记录
			clearHistory() {
				uni.showModal({
					title: '清空记录',
					content: '确定要清空所有评估记录吗？此操作不可恢复。',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('assessmentHistory')
							this.assessmentHistory = []
							uni.showToast({
								title: '记录已清空',
								icon: 'success'
							})
						}
					}
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
	}
	
	/* 页面标题 */
	.page-header {
		text-align: center;
		margin-bottom: 40rpx;
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
		background: linear-gradient(135deg, #87CEEB, #98FB98);
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
		background: linear-gradient(90deg, #87CEEB, #98FB98);
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
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		color: #FFFFFF;
		box-shadow: 0 4rpx 15rpx rgba(135, 206, 235, 0.3);
	}
</style>
