<template>
	<view class="container">
		<!-- 进度条 -->
		<view class="progress-container">
			<view class="progress-bar">
				<view class="progress-fill" :style="{ width: progressPercent + '%' }"></view>
			</view>
			<text class="progress-text">{{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</text>
		</view>
		
		<!-- 问题卡片 -->
		<view class="question-card" v-if="currentQuestion">
			<!-- 问题标题 -->
			<view class="question-header">
				<text class="question-title">{{ currentQuestion.title }}</text>
				<text class="question-category">{{ currentQuestion.category }}</text>
			</view>
			
			<!-- 问题描述 -->
			<view class="question-description" v-if="currentQuestion.description">
				<text class="description-text">{{ currentQuestion.description }}</text>
			</view>
			
			<!-- 选项列表 -->
			<view class="options-container">
				<view 
					class="option-item" 
					v-for="(option, index) in currentQuestion.options" 
					:key="index"
					:class="{ 
						active: selectedAnswer === option.value,
						disabled: isSubmitting
					}"
					@click="selectOption(option.value)"
				>
					<view class="option-icon">
						<text class="icon-text">{{ option.icon }}</text>
					</view>
					<view class="option-content">
						<text class="option-text">{{ option.text }}</text>
						<text class="option-score" v-if="option.score !== undefined">得分：{{ option.score }}</text>
					</view>
					<view class="option-check" v-if="selectedAnswer === option.value">
						<text class="check-icon">✓</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部按钮 -->
		<view class="button-container">
			<button 
				class="prev-button" 
				@click="previousQuestion" 
				:disabled="currentQuestionIndex === 0 || isSubmitting"
			>
				<text class="button-text">上一题</text>
			</button>
			
			<button 
				class="next-button" 
				@click="nextQuestion" 
				:disabled="!selectedAnswer || isSubmitting"
			>
				<text class="button-text">
					{{ currentQuestionIndex === totalQuestions - 1 ? '完成评估' : '下一题' }}
				</text>
			</button>
		</view>
		
		<!-- 加载遮罩 -->
		<view class="loading-mask" v-if="isSubmitting">
			<view class="loading-content">
				<view class="loading-spinner"></view>
				<text class="loading-text">正在生成报告...</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentQuestionIndex: 0,
				selectedAnswer: null,
				isSubmitting: false,
				answers: [],
				childInfo: {},
				// 评估问题数据
				questions: [
					{
						id: 1,
						category: '大运动',
						title: '孩子能否独立坐稳？',
						description: '请观察孩子在没有支撑的情况下能否保持坐姿',
						options: [
							{ value: 'yes', text: '能够独立坐稳', icon: '✅', score: 3 },
							{ value: 'partial', text: '需要轻微支撑', icon: '⚠️', score: 2 },
							{ value: 'no', text: '无法独立坐稳', icon: '❌', score: 1 }
						]
					},
					{
						id: 2,
						category: '精细动作',
						title: '孩子能否用拇指和食指捏取小物品？',
						description: '观察孩子是否能精确地抓取小颗粒物品',
						options: [
							{ value: 'yes', text: '能够精确捏取', icon: '✅', score: 3 },
							{ value: 'partial', text: '动作不够精确', icon: '⚠️', score: 2 },
							{ value: 'no', text: '无法完成动作', icon: '❌', score: 1 }
						]
					},
					{
						id: 3,
						category: '语言理解',
						title: '孩子能否理解简单的指令？',
						description: '测试孩子对"过来"、"坐下"等简单指令的理解',
						options: [
							{ value: 'yes', text: '完全理解并执行', icon: '✅', score: 3 },
							{ value: 'partial', text: '部分理解', icon: '⚠️', score: 2 },
							{ value: 'no', text: '不理解指令', icon: '❌', score: 1 }
						]
					},
					{
						id: 4,
						category: '语言表达',
						title: '孩子能否说出简单的词语？',
						description: '观察孩子是否能主动说出"妈妈"、"爸爸"等词语',
						options: [
							{ value: 'yes', text: '能说多个词语', icon: '✅', score: 3 },
							{ value: 'partial', text: '能说少量词语', icon: '⚠️', score: 2 },
							{ value: 'no', text: '不会说话', icon: '❌', score: 1 }
						]
					},
					{
						id: 5,
						category: '社交行为',
						title: '孩子是否会主动与人互动？',
						description: '观察孩子是否会主动寻求关注或与他人互动',
						options: [
							{ value: 'yes', text: '主动互动频繁', icon: '✅', score: 3 },
							{ value: 'partial', text: '偶尔主动互动', icon: '⚠️', score: 2 },
							{ value: 'no', text: '很少主动互动', icon: '❌', score: 1 }
						]
					},
					{
						id: 6,
						category: '认知能力',
						title: '孩子能否模仿简单的动作？',
						description: '测试孩子是否能模仿拍手、挥手等简单动作',
						options: [
							{ value: 'yes', text: '模仿能力强', icon: '✅', score: 3 },
							{ value: 'partial', text: '能模仿部分动作', icon: '⚠️', score: 2 },
							{ value: 'no', text: '不会模仿', icon: '❌', score: 1 }
						]
					},
					{
						id: 7,
						category: '自理能力',
						title: '孩子能否自己进食？',
						description: '观察孩子是否能独立使用餐具进食',
						options: [
							{ value: 'yes', text: '完全独立进食', icon: '✅', score: 3 },
							{ value: 'partial', text: '需要部分帮助', icon: '⚠️', score: 2 },
							{ value: 'no', text: '完全需要喂食', icon: '❌', score: 1 }
						]
					},
					{
						id: 8,
						category: '情绪调节',
						title: '孩子情绪是否稳定？',
						description: '观察孩子日常情绪变化和调节能力',
						options: [
							{ value: 'yes', text: '情绪稳定', icon: '✅', score: 3 },
							{ value: 'partial', text: '偶尔情绪波动', icon: '⚠️', score: 2 },
							{ value: 'no', text: '情绪波动较大', icon: '❌', score: 1 }
						]
					}
				]
			}
		},
		computed: {
			currentQuestion() {
				return this.questions[this.currentQuestionIndex]
			},
			totalQuestions() {
				return this.questions.length
			},
			progressPercent() {
				return ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100
			}
		},
		onLoad() {
			// 获取儿童信息
			this.childInfo = uni.getStorageSync('childInfo') || {}
			
			// 如果没有儿童信息，返回上一页
			if (!this.childInfo.name) {
				uni.showToast({
					title: '请先填写儿童信息',
					icon: 'none'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}
		},
		methods: {
			// 选择选项
			selectOption(value) {
				if (this.isSubmitting) return
				this.selectedAnswer = value
			},
			
			// 下一题
			nextQuestion() {
				if (!this.selectedAnswer || this.isSubmitting) return
				
				// 保存当前答案
				this.answers.push({
					questionId: this.currentQuestion.id,
					answer: this.selectedAnswer,
					score: this.currentQuestion.options.find(opt => opt.value === this.selectedAnswer).score
				})
				
				// 如果是最后一题，完成评估
				if (this.currentQuestionIndex === this.totalQuestions - 1) {
					this.completeAssessment()
					return
				}
				
				// 进入下一题
				this.currentQuestionIndex++
				this.selectedAnswer = null
			},
			
			// 上一题
			previousQuestion() {
				if (this.currentQuestionIndex === 0 || this.isSubmitting) return
				
				// 移除上一题的答案
				this.answers.pop()
				
				this.currentQuestionIndex--
				this.selectedAnswer = null
			},
			
			// 完成评估
			completeAssessment() {
				this.isSubmitting = true
				
				// 计算总分
				const totalScore = this.answers.reduce((sum, answer) => sum + answer.score, 0)
				const maxScore = this.totalQuestions * 3
				const scorePercent = Math.round((totalScore / maxScore) * 100)
				
				// 生成评估结果
				const assessmentResult = {
					childInfo: this.childInfo,
					answers: this.answers,
					totalScore: totalScore,
					maxScore: maxScore,
					scorePercent: scorePercent,
					assessmentDate: new Date().toISOString(),
					recommendations: this.generateRecommendations(scorePercent)
				}
				
				// 保存评估结果
				uni.setStorageSync('assessmentResult', assessmentResult)
				
				// 保存到历史记录
				this.saveToHistory(assessmentResult)
				
				// 延迟跳转，显示加载效果
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/result/result'
					})
				}, 2000)
			},
			
			// 生成建议
			generateRecommendations(scorePercent) {
				if (scorePercent >= 80) {
					return [
						'孩子发育状况良好，继续保持',
						'建议定期进行发育监测',
						'可以适当增加一些挑战性活动'
					]
				} else if (scorePercent >= 60) {
					return [
						'孩子发育基本正常，有提升空间',
						'建议加强薄弱环节的训练',
						'可以寻求专业指导'
					]
				} else {
					return [
						'建议及时咨询专业医生',
						'进行详细的发育评估',
						'制定个性化的干预计划'
					]
				}
			},
			
			// 保存到历史记录
			saveToHistory(result) {
				let history = uni.getStorageSync('assessmentHistory') || []
				history.unshift(result)
				
				// 只保留最近10次记录
				if (history.length > 10) {
					history = history.slice(0, 10)
				}
				
				uni.setStorageSync('assessmentHistory', history)
			}
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		background: linear-gradient(135deg, #E8F4FD 0%, #F0F8FF 100%);
		padding: 30rpx;
		position: relative;
	}
	
	/* 进度条 */
	.progress-container {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 25rpx 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.progress-bar {
		width: 100%;
		height: 12rpx;
		background: #E8F4FD;
		border-radius: 6rpx;
		overflow: hidden;
		margin-bottom: 15rpx;
	}
	
	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #87CEEB, #98FB98);
		border-radius: 6rpx;
		transition: width 0.3s ease;
	}
	
	.progress-text {
		text-align: center;
		font-size: 26rpx;
		color: #7F8C8D;
		font-weight: 500;
	}
	
	/* 问题卡片 */
	.question-card {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		margin-bottom: 120rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.question-header {
		margin-bottom: 30rpx;
	}
	
	.question-title {
		display: block;
		font-size: 36rpx;
		font-weight: bold;
		color: #2C3E50;
		line-height: 1.4;
		margin-bottom: 15rpx;
	}
	
	.question-category {
		display: inline-block;
		font-size: 24rpx;
		color: #87CEEB;
		background: rgba(135, 206, 235, 0.1);
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		font-weight: 500;
	}
	
	.question-description {
		margin-bottom: 40rpx;
		padding: 20rpx;
		background: rgba(135, 206, 235, 0.05);
		border-radius: 15rpx;
		border-left: 4rpx solid #87CEEB;
	}
	
	.description-text {
		font-size: 26rpx;
		color: #7F8C8D;
		line-height: 1.5;
	}
	
	/* 选项容器 */
	.options-container {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
	
	.option-item {
		display: flex;
		align-items: center;
		padding: 25rpx 20rpx;
		background: #F8F9FA;
		border-radius: 15rpx;
		border: 2rpx solid transparent;
		transition: all 0.3s;
		position: relative;
	}
	
	.option-item.active {
		background: linear-gradient(135deg, rgba(135, 206, 235, 0.1), rgba(152, 251, 152, 0.1));
		border-color: #87CEEB;
		transform: translateY(-2rpx);
		box-shadow: 0 4rpx 15rpx rgba(135, 206, 235, 0.2);
	}
	
	.option-item.disabled {
		opacity: 0.6;
	}
	
	.option-icon {
		width: 60rpx;
		height: 60rpx;
		background: rgba(135, 206, 235, 0.1);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}
	
	.option-item.active .option-icon {
		background: linear-gradient(135deg, #87CEEB, #98FB98);
	}
	
	.icon-text {
		font-size: 28rpx;
	}
	
	.option-content {
		flex: 1;
	}
	
	.option-text {
		display: block;
		font-size: 28rpx;
		color: #2C3E50;
		font-weight: 500;
		margin-bottom: 5rpx;
	}
	
	.option-score {
		font-size: 22rpx;
		color: #7F8C8D;
	}
	
	.option-check {
		width: 40rpx;
		height: 40rpx;
		background: #87CEEB;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.check-icon {
		font-size: 24rpx;
		color: #FFFFFF;
		font-weight: bold;
	}
	
	/* 底部按钮 */
	.button-container {
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
	
	.prev-button, .next-button {
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
	
	.prev-button {
		background: #F8F9FA;
		color: #7F8C8D;
	}
	
	.prev-button:disabled {
		opacity: 0.5;
	}
	
	.next-button {
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		color: #FFFFFF;
		box-shadow: 0 4rpx 15rpx rgba(135, 206, 235, 0.3);
	}
	
	.next-button:disabled {
		background: #BDC3C7;
		box-shadow: none;
	}
	
	.button-text {
		font-size: 28rpx;
		font-weight: bold;
	}
	
	/* 加载遮罩 */
	.loading-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}
	
	.loading-content {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20rpx;
		padding: 60rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.2);
	}
	
	.loading-spinner {
		width: 60rpx;
		height: 60rpx;
		border: 4rpx solid #E8F4FD;
		border-top: 4rpx solid #87CEEB;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 30rpx;
	}
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	.loading-text {
		font-size: 28rpx;
		color: #2C3E50;
		font-weight: 500;
	}
</style>
