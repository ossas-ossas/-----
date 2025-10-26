<template>
	<view class="container">
		<!-- 报告头部 -->
		<view class="report-header">
			<view class="header-icon">
				<text class="icon-text">📊</text>
			</view>
			<text class="report-title">发育评估报告</text>
			<text class="report-subtitle">{{ childInfo.name }} 的综合发育评估结果</text>
			<text class="report-age-range" v-if="ageBand">{{ ageBand.label }} 年龄段评估</text>
			<text class="report-mode" v-if="assessmentMode">（{{ assessmentMode === 'band' ? '精准' : '累进' }}模式）</text>
		</view>
		
		<!-- 总体评分 -->
		<view class="score-card">
			<view class="score-circle">
				<text class="score-number">{{ overallCompletionRate }}</text>
				<text class="score-unit">%</text>
			</view>
			<view class="score-info">
				<text class="score-title">{{ getCompletionLevel(overallCompletionRate) }}</text>
				<text class="score-desc">{{ getCompletionDescription(overallCompletionRate) }}</text>
			</view>
		</view>
		
		<!-- 详细分析 -->
		<view class="analysis-section">
			<view class="section-title">
				<text class="title-text">详细分析</text>
			</view>
			
			<!-- 各领域得分表格 -->
			<view class="score-table">
				<view class="table-header">
					<text class="header-cell">领域</text>
					<text class="header-cell">分子</text>
					<text class="header-cell">分母</text>
					<text class="header-cell">比例</text>
					<text class="header-cell">等级</text>
				</view>
				<view 
					class="table-row" 
					v-for="(stats, domain) in domainStats" 
					:key="domain"
				>
					<text class="table-cell domain-name">{{ domain }}</text>
					<text class="table-cell">{{ stats.passed }}</text>
					<text class="table-cell">{{ stats.total }}</text>
					<text class="table-cell">{{ Math.round(stats.ratio * 100) }}%</text>
					<view class="table-cell">
						<view 
							class="level-badge" 
							:class="getLevelClass(stats.level)"
						>
							{{ getLevelText(stats.level) }}
						</view>
					</view>
				</view>
			</view>
			
			<!-- 雷达图占位 -->
			<view class="chart-container" v-if="hasData">
				<text class="chart-title">各领域发育水平</text>
				<view class="chart-placeholder">
					<text class="chart-text">雷达图显示各领域比例</text>
					<view class="chart-bars">
						<view 
							class="chart-bar" 
							v-for="(stats, domain) in domainStats" 
							:key="domain"
						>
							<view 
								class="bar-fill" 
								:style="{ height: stats.ratio * 100 + '%' }"
								:class="getLevelClass(stats.level)"
							></view>
							<text class="bar-label">{{ domain }}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 无数据提示 -->
			<view class="no-data" v-else>
				<text class="no-data-text">暂无评估数据</text>
				<text class="no-data-hint">请先完成评估</text>
			</view>
		</view>
		
		<!-- 专业建议 -->
		<view class="recommendations-section" v-if="recommendations.length > 0">
			<view class="section-title">
				<text class="title-text">专业建议</text>
			</view>
			<view class="recommendations-list">
				<view 
					class="recommendation-item" 
					v-for="(rec, index) in recommendations" 
					:key="index"
				>
					<text class="rec-number">{{ index + 1 }}</text>
					<text class="rec-text">{{ rec }}</text>
				</view>
			</view>
		</view>
		
		<!-- 底部操作 -->
		<view class="action-buttons">
			<button class="action-btn secondary" @click="viewHistory">
				<text class="btn-text">查看历史</text>
			</button>
			<button class="action-btn primary" @click="newAssessment">
				<text class="btn-text">重新评估</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				childInfo: {},
				ageBand: null,
				assessmentMode: '',
				isCorrectedAge: false,
				domainStats: {},
				overallCompletionRate: 0,
				recommendations: [],
				hasData: false
			}
		},
		onLoad() {
			this.loadAssessmentResult()
		},
		methods: {
			// 加载评估结果
			loadAssessmentResult() {
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
				
				this.childInfo = result.childInfo || {}
				this.ageBand = result.ageBand
				this.assessmentMode = result.assessmentMode || 'band'
				this.isCorrectedAge = result.isCorrectedAge || false
				
				// 计算领域统计
				this.calculateDomainStats(result)
				
				// 生成建议
				this.generateRecommendations()
				
				console.log('=== 统计结果 ===')
				console.log('领域统计:', this.domainStats)
				console.log('总体完成率:', this.overallCompletionRate)
			},
			
			// 计算领域统计
			calculateDomainStats(result) {
				const stats = {}
				let totalPassed = 0
				let totalQuestions = 0
				
				// 按领域统计
				Object.keys(result.groupedQuestions).forEach(domain => {
					const questions = result.groupedQuestions[domain]
					const passed = questions.filter(q => result.questionAnswers[q.id] === true).length
					const total = questions.length
					const ratio = total > 0 ? passed / total : 0
					
					stats[domain] = {
						passed: passed,
						total: total,
						ratio: ratio,
						level: this.getLevelFromRatio(ratio)
					}
					
					totalPassed += passed
					totalQuestions += total
				})
				
				this.domainStats = stats
				this.overallCompletionRate = totalQuestions > 0 ? Math.round((totalPassed / totalQuestions) * 100) : 0
				this.hasData = totalQuestions > 0
				
				console.log('计算完成 - 总题目:', totalQuestions, '已完成:', totalPassed, '完成率:', this.overallCompletionRate + '%')
			},
			
			// 根据比例获取等级
			getLevelFromRatio(ratio) {
				if (ratio >= 1) return 'normal'    // 常态 (蓝)
				if (ratio >= 2/3) return 'good'    // 良好 (绿)
				if (ratio >= 1/2) return 'fair'     // 普通 (黄)
				return 'poor'                      // 差 (红)
			},
			
			// 获取等级样式类
			getLevelClass(level) {
				return {
					'level-normal': level === 'normal',
					'level-good': level === 'good',
					'level-fair': level === 'fair',
					'level-poor': level === 'poor'
				}
			},
			
			// 获取等级文本
			getLevelText(level) {
				const levelMap = {
					'normal': '常态',
					'good': '良好',
					'fair': '普通',
					'poor': '差'
				}
				return levelMap[level] || '未知'
			},
			
			// 获取完成等级
			getCompletionLevel(rate) {
				if (rate >= 100) return '优秀'
				if (rate >= 80) return '良好'
				if (rate >= 60) return '一般'
				if (rate >= 40) return '需关注'
				return '需干预'
			},
			
			// 获取完成描述
			getCompletionDescription(rate) {
				if (rate >= 100) return '各项指标完全达标'
				if (rate >= 80) return '大部分指标达标，发育良好'
				if (rate >= 60) return '基本达标，部分方面需加强'
				if (rate >= 40) return '部分达标，建议重点关注'
				return '达标率较低，建议及时干预'
			},
			
			// 生成专业建议
			generateRecommendations() {
				const recommendations = []
				
				// 分析各领域表现
				const poorDomains = []
				const fairDomains = []
				const goodDomains = []
				const normalDomains = []
				
				Object.keys(this.domainStats).forEach(domain => {
					const stats = this.domainStats[domain]
					if (stats.level === 'poor') poorDomains.push(domain)
					else if (stats.level === 'fair') fairDomains.push(domain)
					else if (stats.level === 'good') goodDomains.push(domain)
					else if (stats.level === 'normal') normalDomains.push(domain)
				})
				
				// 根据总体表现给出建议
				if (this.overallCompletionRate >= 80) {
					recommendations.push('孩子发育状况良好，各项指标达到相应年龄段正常水平')
					recommendations.push('建议继续保持良好的养育环境和互动方式')
					recommendations.push('可以适当增加一些挑战性活动，促进进一步发展')
				} else if (this.overallCompletionRate >= 60) {
					recommendations.push('孩子发育基本正常，部分方面还有提升空间')
					recommendations.push('建议重点关注得分较低的发育维度')
					recommendations.push('可以寻求专业康复师的指导和建议')
				} else {
					recommendations.push('建议及时咨询专业医生或康复师')
					recommendations.push('进行更详细的发育评估和诊断')
					recommendations.push('制定个性化的早期干预计划')
				}
				
				// 针对具体领域给出建议
				if (poorDomains.length > 0) {
					recommendations.push(`${poorDomains.join('、')}方面需要重点关注和训练`)
				}
				if (fairDomains.length > 0) {
					recommendations.push(`${fairDomains.join('、')}方面有提升空间，建议加强练习`)
				}
				if (goodDomains.length > 0) {
					recommendations.push(`${goodDomains.join('、')}方面表现良好，可以继续保持`)
				}
				if (normalDomains.length > 0) {
					recommendations.push(`${normalDomains.join('、')}方面完全达标，是孩子的优势领域`)
				}
				
				// 添加通用建议
				recommendations.push('定期进行发育评估，追踪进步情况')
				recommendations.push('保持耐心和积极的态度，每个孩子都有自己的发育节奏')
				
				this.recommendations = recommendations
			},
			
			// 查看历史记录
			viewHistory() {
				uni.navigateTo({
					url: '/pages/history/history'
				})
			},
			
			// 重新评估
			newAssessment() {
				uni.showModal({
					title: '重新评估',
					content: '确定要开始新的评估吗？当前评估结果将被覆盖。',
					success: (res) => {
						if (res.confirm) {
							// 清除当前评估数据
							uni.removeStorageSync('assessmentForm')
							uni.removeStorageSync('assessmentResult')
							
							// 跳转到儿童信息页
							uni.redirectTo({
								url: '/pages/child-info/child-info'
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
	
	/* 报告头部 */
	.report-header {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		margin-bottom: 30rpx;
		text-align: center;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.header-icon {
		margin-bottom: 20rpx;
	}
	
	.icon-text {
		font-size: 60rpx;
	}
	
	.report-title {
		display: block;
		font-size: 36rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 10rpx;
	}
	
	.report-subtitle {
		display: block;
		font-size: 28rpx;
		color: #7F8C8D;
		margin-bottom: 10rpx;
	}
	
	.report-age-range {
		display: block;
		font-size: 24rpx;
		color: #87CEEB;
		font-weight: 500;
	}
	
	.report-mode {
		display: block;
		font-size: 22rpx;
		color: #BDC3C7;
		margin-top: 5rpx;
	}
	
	/* 总体评分 */
	.score-card {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.score-circle {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 30rpx;
		position: relative;
	}
	
	.score-number {
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	
	.score-unit {
		font-size: 24rpx;
		color: #FFFFFF;
		margin-left: 5rpx;
	}
	
	.score-info {
		flex: 1;
	}
	
	.score-title {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 10rpx;
	}
	
	.score-desc {
		display: block;
		font-size: 26rpx;
		color: #7F8C8D;
		line-height: 1.4;
	}
	
	/* 分析区域 */
	.analysis-section {
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
		color: #2C3E50;
	}
	
	/* 得分表格 */
	.score-table {
		margin-bottom: 30rpx;
	}
	
	.table-header {
		display: flex;
		background: #F8F9FA;
		border-radius: 10rpx 10rpx 0 0;
		padding: 20rpx 0;
	}
	
	.table-row {
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #E8F4FD;
	}
	
	.table-row:last-child {
		border-bottom: none;
		border-radius: 0 0 10rpx 10rpx;
	}
	
	.header-cell, .table-cell {
		flex: 1;
		text-align: center;
		font-size: 24rpx;
	}
	
	.header-cell {
		font-weight: bold;
		color: #2C3E50;
	}
	
	.domain-name {
		text-align: left !important;
		color: #2C3E50;
		font-weight: 500;
	}
	
	.table-cell {
		color: #7F8C8D;
	}
	
	/* 等级徽章 */
	.level-badge {
		display: inline-block;
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		font-size: 22rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	
	.level-normal {
		background: #2196F3;
	}
	
	.level-good {
		background: #4CAF50;
	}
	
	.level-fair {
		background: #FF9800;
	}
	
	.level-poor {
		background: #F44336;
	}
	
	/* 图表区域 */
	.chart-container {
		margin-top: 30rpx;
	}
	
	.chart-title {
		display: block;
		font-size: 28rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 20rpx;
		text-align: center;
	}
	
	.chart-placeholder {
		background: #F8F9FA;
		border-radius: 15rpx;
		padding: 30rpx;
		text-align: center;
	}
	
	.chart-text {
		display: block;
		font-size: 24rpx;
		color: #7F8C8D;
		margin-bottom: 20rpx;
	}
	
	.chart-bars {
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		height: 200rpx;
		margin-top: 20rpx;
	}
	
	.chart-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		margin: 0 5rpx;
	}
	
	.bar-fill {
		width: 100%;
		min-height: 20rpx;
		border-radius: 10rpx 10rpx 0 0;
		margin-bottom: 10rpx;
		transition: height 0.3s ease;
	}
	
	.bar-label {
		font-size: 20rpx;
		color: #7F8C8D;
		text-align: center;
		word-break: break-all;
	}
	
	/* 无数据提示 */
	.no-data {
		text-align: center;
		padding: 60rpx 30rpx;
	}
	
	.no-data-text {
		display: block;
		font-size: 28rpx;
		color: #7F8C8D;
		margin-bottom: 15rpx;
	}
	
	.no-data-hint {
		font-size: 24rpx;
		color: #BDC3C7;
	}
	
	/* 建议区域 */
	.recommendations-section {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.recommendations-list {
		margin-top: 20rpx;
	}
	
	.recommendation-item {
		display: flex;
		align-items: flex-start;
		margin-bottom: 20rpx;
		padding: 20rpx;
		background: rgba(135, 206, 235, 0.05);
		border-radius: 15rpx;
		border-left: 4rpx solid #87CEEB;
	}
	
	.rec-number {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: #87CEEB;
		color: #FFFFFF;
		font-size: 24rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
		flex-shrink: 0;
	}
	
	.rec-text {
		flex: 1;
		font-size: 26rpx;
		color: #2C3E50;
		line-height: 1.5;
	}
	
	/* 底部操作按钮 */
	.action-buttons {
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
	
	.action-btn {
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
	
	.action-btn.secondary {
		background: #F8F9FA;
		color: #7F8C8D;
		border: 2rpx solid #E8F4FD;
	}
	
	.action-btn.primary {
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		color: #FFFFFF;
		box-shadow: 0 4rpx 15rpx rgba(135, 206, 235, 0.3);
	}
	
	.btn-text {
		font-size: 28rpx;
		font-weight: bold;
	}
</style>