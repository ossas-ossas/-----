<template>
	<view class="container">
		<!-- 报告头部 -->
		<view class="report-header">
			<view class="header-icon">
				<text class="icon-text">📊</text>
			</view>
			<text class="report-title">发育评估报告</text>
			<text class="report-subtitle">{{ childInfo.name }} 的综合发育评估结果</text>
		</view>
		
		<!-- 总体评分 -->
		<view class="score-card">
			<view class="score-circle">
				<text class="score-number">{{ assessmentResult.scorePercent }}</text>
				<text class="score-unit">分</text>
			</view>
			<view class="score-info">
				<text class="score-title">{{ getScoreLevel(assessmentResult.scorePercent) }}</text>
				<text class="score-desc">{{ getScoreDescription(assessmentResult.scorePercent) }}</text>
			</view>
		</view>
		
		<!-- 详细分析 -->
		<view class="analysis-section">
			<view class="section-title">
				<text class="title-text">详细分析</text>
			</view>
			
			<!-- 各维度得分 -->
			<view class="dimensions-container">
				<view 
					class="dimension-item" 
					v-for="(dimension, index) in dimensionScores" 
					:key="index"
				>
					<view class="dimension-header">
						<text class="dimension-name">{{ dimension.name }}</text>
						<text class="dimension-score">{{ dimension.score }}/{{ dimension.maxScore }}</text>
					</view>
					<view class="dimension-bar">
						<view 
							class="dimension-fill" 
							:style="{ width: dimension.percent + '%' }"
							:class="getDimensionColor(dimension.percent)"
						></view>
					</view>
					<text class="dimension-desc">{{ dimension.description }}</text>
				</view>
			</view>
		</view>
		
		<!-- 建议指导 -->
		<view class="recommendations-section">
			<view class="section-title">
				<text class="title-text">建议指导</text>
			</view>
			
			<view class="recommendations-list">
				<view 
					class="recommendation-item" 
					v-for="(recommendation, index) in assessmentResult.recommendations" 
					:key="index"
				>
					<view class="recommendation-icon">
						<text class="icon-text">💡</text>
					</view>
					<text class="recommendation-text">{{ recommendation }}</text>
				</view>
			</view>
		</view>
		
		<!-- 评估详情 -->
		<view class="details-section">
			<view class="section-title">
				<text class="title-text">评估详情</text>
			</view>
			
			<view class="details-card">
				<view class="detail-item">
					<text class="detail-label">评估日期</text>
					<text class="detail-value">{{ formatDate(assessmentResult.assessmentDate) }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">儿童年龄</text>
					<text class="detail-value">{{ calculatedAge }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">总题数</text>
					<text class="detail-value">{{ assessmentResult.answers.length }} 题</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">总得分</text>
					<text class="detail-value">{{ assessmentResult.totalScore }}/{{ assessmentResult.maxScore }}</text>
				</view>
			</view>
		</view>
		
		<!-- 底部操作按钮 -->
		<view class="action-buttons">
			<button class="action-button secondary" @click="viewHistory">
				<text class="button-text">查看历史</text>
			</button>
			<button class="action-button primary" @click="startNewAssessment">
				<text class="button-text">重新评估</text>
			</button>
		</view>
		
		<!-- 免责声明 -->
		<view class="disclaimer">
			<text class="disclaimer-text">
				本评估结果仅供参考，不能替代专业医疗诊断。如有疑问，请咨询专业医生。
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				assessmentResult: {},
				childInfo: {},
				dimensionScores: []
			}
		},
		computed: {
			calculatedAge() {
				if (!this.childInfo.birthDate) return ''
				const birth = new Date(this.childInfo.birthDate)
				const today = new Date()
				let age = today.getFullYear() - birth.getFullYear()
				const monthDiff = today.getMonth() - birth.getMonth()
				
				if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
					age--
				}
				
				if (age < 1) {
					const months = Math.floor((today - birth) / (1000 * 60 * 60 * 24 * 30))
					return `${months}个月`
				}
				
				return `${age}岁`
			}
		},
		onLoad() {
			// 获取评估结果
			this.assessmentResult = uni.getStorageSync('assessmentResult') || {}
			this.childInfo = this.assessmentResult.childInfo || {}
			
			// 如果没有评估结果，返回首页
			if (!this.assessmentResult.answers) {
				uni.showToast({
					title: '暂无评估结果',
					icon: 'none'
				})
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}, 1500)
				return
			}
			
			// 计算各维度得分
			this.calculateDimensionScores()
		},
		methods: {
			// 计算各维度得分
			calculateDimensionScores() {
				const dimensions = {
					'大运动': { score: 0, maxScore: 0, questions: [] },
					'精细动作': { score: 0, maxScore: 0, questions: [] },
					'语言理解': { score: 0, maxScore: 0, questions: [] },
					'语言表达': { score: 0, maxScore: 0, questions: [] },
					'社交行为': { score: 0, maxScore: 0, questions: [] },
					'认知能力': { score: 0, maxScore: 0, questions: [] },
					'自理能力': { score: 0, maxScore: 0, questions: [] },
					'情绪调节': { score: 0, maxScore: 0, questions: [] }
				}
				
				// 模拟各维度的问题分配（实际应该根据问题ID映射）
				const questionMapping = {
					1: '大运动',
					2: '精细动作', 
					3: '语言理解',
					4: '语言表达',
					5: '社交行为',
					6: '认知能力',
					7: '自理能力',
					8: '情绪调节'
				}
				
				this.assessmentResult.answers.forEach(answer => {
					const dimension = questionMapping[answer.questionId]
					if (dimensions[dimension]) {
						dimensions[dimension].score += answer.score
						dimensions[dimension].maxScore += 3
						dimensions[dimension].questions.push(answer)
					}
				})
				
				// 转换为显示格式
				this.dimensionScores = Object.keys(dimensions).map(name => {
					const dim = dimensions[name]
					const percent = Math.round((dim.score / dim.maxScore) * 100)
					return {
						name: name,
						score: dim.score,
						maxScore: dim.maxScore,
						percent: percent,
						description: this.getDimensionDescription(name, percent)
					}
				})
			},
			
			// 获取维度描述
			getDimensionDescription(dimension, percent) {
				if (percent >= 80) {
					return `${dimension}发育良好，继续保持`
				} else if (percent >= 60) {
					return `${dimension}发育正常，有提升空间`
				} else {
					return `${dimension}需要重点关注和训练`
				}
			},
			
			// 获取评分等级
			getScoreLevel(score) {
				if (score >= 80) return '发育良好'
				if (score >= 60) return '发育正常'
				return '需要关注'
			},
			
			// 获取评分描述
			getScoreDescription(score) {
				if (score >= 80) return '孩子的各项发育指标都达到了相应年龄段的正常水平'
				if (score >= 60) return '孩子的基本发育正常，部分方面还有提升空间'
				return '建议及时关注孩子的发育情况，必要时寻求专业指导'
			},
			
			// 获取维度颜色
			getDimensionColor(percent) {
				if (percent >= 80) return 'color-good'
				if (percent >= 60) return 'color-normal'
				return 'color-attention'
			},
			
			// 格式化日期
			formatDate(dateString) {
				const date = new Date(dateString)
				return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
			},
			
			// 查看历史记录
			viewHistory() {
				uni.navigateTo({
					url: '/pages/history/history'
				})
			},
			
			// 重新评估
			startNewAssessment() {
				uni.showModal({
					title: '重新评估',
					content: '确定要开始新的评估吗？',
					success: (res) => {
						if (res.confirm) {
							uni.reLaunch({
								url: '/pages/index/index'
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
		text-align: center;
		margin-bottom: 40rpx;
	}
	
	.header-icon {
		width: 100rpx;
		height: 100rpx;
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		border-radius: 50%;
		margin: 0 auto 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 20rpx rgba(135, 206, 235, 0.3);
	}
	
	.icon-text {
		font-size: 50rpx;
	}
	
	.report-title {
		display: block;
		font-size: 40rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 10rpx;
	}
	
	.report-subtitle {
		display: block;
		font-size: 26rpx;
		color: #7F8C8D;
	}
	
	/* 评分卡片 */
	.score-card {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		display: flex;
		align-items: center;
	}
	
	.score-circle {
		width: 120rpx;
		height: 120rpx;
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-right: 30rpx;
		box-shadow: 0 4rpx 15rpx rgba(135, 206, 235, 0.3);
	}
	
	.score-number {
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 1;
	}
	
	.score-unit {
		font-size: 20rpx;
		color: #FFFFFF;
		margin-top: 5rpx;
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
		font-size: 24rpx;
		color: #7F8C8D;
		line-height: 1.4;
	}
	
	/* 分析区域 */
	.analysis-section, .recommendations-section, .details-section {
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
	
	/* 维度得分 */
	.dimensions-container {
		display: flex;
		flex-direction: column;
		gap: 25rpx;
	}
	
	.dimension-item {
		padding: 20rpx;
		background: #F8F9FA;
		border-radius: 15rpx;
	}
	
	.dimension-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
	}
	
	.dimension-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #2C3E50;
	}
	
	.dimension-score {
		font-size: 24rpx;
		color: #87CEEB;
		font-weight: bold;
	}
	
	.dimension-bar {
		width: 100%;
		height: 12rpx;
		background: #E8F4FD;
		border-radius: 6rpx;
		overflow: hidden;
		margin-bottom: 10rpx;
	}
	
	.dimension-fill {
		height: 100%;
		border-radius: 6rpx;
		transition: width 0.3s ease;
	}
	
	.dimension-fill.color-good {
		background: linear-gradient(90deg, #98FB98, #90EE90);
	}
	
	.dimension-fill.color-normal {
		background: linear-gradient(90deg, #87CEEB, #ADD8E6);
	}
	
	.dimension-fill.color-attention {
		background: linear-gradient(90deg, #FFB6C1, #FFA07A);
	}
	
	.dimension-desc {
		font-size: 24rpx;
		color: #7F8C8D;
		line-height: 1.4;
	}
	
	/* 建议列表 */
	.recommendations-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
	
	.recommendation-item {
		display: flex;
		align-items: flex-start;
		padding: 20rpx;
		background: rgba(135, 206, 235, 0.05);
		border-radius: 15rpx;
		border-left: 4rpx solid #87CEEB;
	}
	
	.recommendation-icon {
		width: 40rpx;
		height: 40rpx;
		background: rgba(135, 206, 235, 0.1);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15rpx;
		margin-top: 5rpx;
	}
	
	.recommendation-icon .icon-text {
		font-size: 20rpx;
	}
	
	.recommendation-text {
		flex: 1;
		font-size: 26rpx;
		color: #2C3E50;
		line-height: 1.5;
	}
	
	/* 详情卡片 */
	.details-card {
		background: #F8F9FA;
		border-radius: 15rpx;
		padding: 25rpx;
	}
	
	.detail-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15rpx 0;
		border-bottom: 1rpx solid #E8F4FD;
	}
	
	.detail-item:last-child {
		border-bottom: none;
	}
	
	.detail-label {
		font-size: 26rpx;
		color: #7F8C8D;
	}
	
	.detail-value {
		font-size: 26rpx;
		color: #2C3E50;
		font-weight: 500;
	}
	
	/* 操作按钮 */
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
	
	.button-text {
		font-size: 28rpx;
		font-weight: bold;
	}
	
	/* 免责声明 */
	.disclaimer {
		text-align: center;
		margin-top: 30rpx;
		padding: 20rpx;
	}
	
	.disclaimer-text {
		font-size: 22rpx;
		color: #BDC3C7;
		line-height: 1.4;
	}
</style>
