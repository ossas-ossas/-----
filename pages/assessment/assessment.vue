<template>
	<view class="container">
		<!-- 年龄段和模式信息 -->
		<view class="age-info" v-if="currentAgeBand">
			<text class="age-text">{{ currentAgeBand.label }} 发育评估</text>
			<text class="mode-text" v-if="isCorrectedAge">（纠正后）</text>
			<view class="mode-switch">
				<button 
					class="mode-btn" 
					:class="{ active: assessmentMode === 'band' }"
					@click="switchMode('band')"
				>
					精准模式
				</button>
				<button 
					class="mode-btn" 
					:class="{ active: assessmentMode === 'cumulative' }"
					@click="switchMode('cumulative')"
				>
					累进模式
				</button>
			</view>
		</view>
		
		<!-- 进度信息 -->
		<view class="progress-container">
			<text class="progress-text">已完成 {{ checkedCount }} / {{ totalCount }} 题</text>
			<view class="progress-bar">
				<view class="progress-fill" :style="{ width: progressPercent + '%' }"></view>
			</view>
		</view>
		
		<!-- 领域分组题目 -->
		<view class="questions-container" v-if="totalCount > 0">
			<view 
				v-for="(list, domain) in formState" 
				:key="domain"
				class="domain-section"
			>
				<view class="domain-header" @click="toggleDomain(domain)">
					<text class="domain-title">{{ domain }}</text>
					<text class="domain-count">{{ list.length }} 题</text>
					<text class="domain-toggle">{{ expandedDomains[domain] ? '▼' : '▶' }}</text>
				</view>
				
				<view class="domain-questions" v-if="expandedDomains[domain]">
					<view 
						class="card"
						:class="{ 'selected': q.checked }"
						v-for="(q, idx) in list"
						:key="q.id"
					>
						<view class="card-hd">
							<text class="no">{{ idx + 1 }}</text>
							<text class="title">{{ q.text }}</text>
						</view>
						
						<checkbox-group @change="q.checked = !q.checked; onCheckChanged()">
							<label class="chk">
								<checkbox :value="q.id" :checked="q.checked" />
								<text>孩子能否完成此项目</text>
							</label>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 无题目提示 -->
		<view class="no-questions" v-else>
			<text class="no-questions-text">该年龄段暂无评估题目</text>
			<text class="no-questions-hint">请联系老师补充题库</text>
		</view>
		
		<!-- 底部按钮 -->
		<view class="button-container">
			<button 
				class="submit-button" 
				@click="submitAssessment" 
				:disabled="isSubmitting || totalCount === 0"
			>
				<text class="button-text">
					{{ isSubmitting ? '提交中...' : '提交评估' }}
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
	import { ageBands, questions, getAgeBandByMonths, pickQuestionsByAgeMonths } from '@/common/questionBank.js'
	
	export default {
		data() {
			return {
				childInfo: {},
				currentAgeBand: null,
				isCorrectedAge: false,
				assessmentMode: 'band', // 'band' 或 'cumulative'
				formState: {},
				expandedDomains: {},
				isSubmitting: false,
				totalCount: 0,
				checkedCount: 0
			}
		},
		computed: {
			progressPercent() {
				return this.totalCount > 0 ? Math.round((this.checkedCount / this.totalCount) * 100) : 0
			}
		},
		onLoad() {
			this.loadChildInfo()
			this.loadQuestions()
		},
		methods: {
			// 加载儿童信息
			loadChildInfo() {
				this.childInfo = uni.getStorageSync('childInfo') || {}
				console.log('=== 儿童信息 ===')
				console.log('儿童信息:', this.childInfo)
				
				if (!this.childInfo.name) {
					uni.showToast({
						title: '请先填写儿童信息',
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
					return
				}
				
				// 计算月龄
				const ageMonths = this.calculateAgeInMonths(this.childInfo.birthDate)
				console.log('出生日期:', this.childInfo.birthDate)
				console.log('计算月龄:', ageMonths)
				
				// 计算纠正月龄（如果是早产儿）
				if (this.childInfo.isPremature && this.childInfo.prematureWeeks) {
					const correctedAgeMonths = Math.max(0, ageMonths - Math.floor(this.childInfo.prematureWeeks / 4))
					console.log('早产周数:', this.childInfo.prematureWeeks)
					console.log('纠正月龄:', correctedAgeMonths)
					this.isCorrectedAge = true
					this.currentAgeBand = getAgeBandByMonths(correctedAgeMonths)
				} else {
					this.currentAgeBand = getAgeBandByMonths(ageMonths)
				}
				
				console.log('当前年龄段:', this.currentAgeBand)
			},
			
			// 加载题目
			loadQuestions() {
				if (!this.childInfo.birthDate) return
				
				const months = this.calculateAgeInMonths(this.childInfo.birthDate)
				const band = getAgeBandByMonths(months)
				const mode = this.assessmentMode
				
				console.log('[assessment] months=', months, 'band=', band, 'mode=', mode)
				
				const grouped = pickQuestionsByAgeMonths(months, mode)
				console.log('[assessment] picked:', { total: Object.values(grouped).reduce((n, arr) => n + arr.length, 0), domains: Object.keys(grouped) })
				
				// 标准化题库结构
				const normalize = (g) => {
					console.log('[assessment] normalize input:', Object.keys(g))
					const doms = ["粗大动作","精细动作","社会互动","认知","语言","感知觉","口腔动作"]
					const out = {}
					doms.forEach(d => out[d] = Array.isArray(g[d]) ? g[d] : [])
					Object.keys(g || {}).forEach(k => { 
						if(!out[k] && Array.isArray(g[k])) out["认知"] = out["认知"].concat(g[k])
					})
					console.log('[assessment] normalize output:', Object.keys(out), 'total:', Object.values(out).reduce((n,arr)=>n+arr.length,0))
					return out
				}
				// 使用Vue.set确保响应式更新
				this.$set(this, 'formState', normalize(grouped))
				
				// 计算统计
				this.totalCount = Object.values(this.formState).reduce((n, arr) => n + arr.length, 0)
				this.checkedCount = Object.values(this.formState).reduce((n, arr) => n + arr.filter(i => !!i.checked).length, 0)
				
				console.log('[assessment] final formState:', Object.keys(this.formState))
				console.log('[assessment] totalCount:', this.totalCount, 'checkedCount:', this.checkedCount)
				
				// 如果没有题目，自动切换到累进模式
				if (this.totalCount === 0 && this.assessmentMode === 'band') {
					console.log('精准模式无题目，切换到累进模式')
					this.assessmentMode = 'cumulative'
					this.loadQuestions()
					return
				}
				
				// 初始化领域展开状态
				this.initExpandedDomains()
				
				// 保存状态
				uni.setStorageSync('assessmentForm', this.formState)
				uni.setStorageSync('assessmentMode', this.assessmentMode)
				uni.setStorageSync('assessmentBand', band)
			},
			
			// 初始化领域展开状态
			initExpandedDomains() {
				const domains = Object.keys(this.formState)
				domains.forEach(domain => {
					this.$set(this.expandedDomains, domain, true) // 默认展开
				})
			},
			
			// 勾选变化处理
			onCheckChanged() {
				this.checkedCount = Object.values(this.formState).reduce((n, arr) => n + arr.filter(i => !!i.checked).length, 0)
				uni.setStorageSync('assessmentForm', this.formState)
			},
			
			// 切换评估模式
			switchMode(mode) {
				if (this.assessmentMode === mode) return
				
				this.assessmentMode = mode
				this.loadQuestions()
				
				uni.showToast({
					title: `已切换到${mode === 'band' ? '精准' : '累进'}模式`,
					icon: 'none'
				})
			},
			
			// 切换领域展开状态
			toggleDomain(domain) {
				this.$set(this.expandedDomains, domain, !this.expandedDomains[domain])
			},
			
			// 计算年龄（月）
			calculateAgeInMonths(birthDate) {
				if (!birthDate) return 0
				const birth = new Date(birthDate)
				const today = new Date()
				let ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12
				ageInMonths += today.getMonth() - birth.getMonth()
				
				// 如果日期还没到，减1个月
				if (today.getDate() < birth.getDate()) {
					ageInMonths--
				}
				
				return Math.max(0, ageInMonths)
			},
			
			// 提交评估
			submitAssessment() {
				if (this.isSubmitting || this.totalCount === 0) return
				
				this.isSubmitting = true
				
				console.log('=== 提交评估 ===')
				console.log('已完成题目:', this.checkedCount)
				console.log('总题目数:', this.totalCount)
				console.log('完成率:', this.progressPercent + '%')
				
				// 生成评估结果
				const assessmentResult = {
					childInfo: this.childInfo,
					ageBand: this.currentAgeBand,
					assessmentMode: this.assessmentMode,
					isCorrectedAge: this.isCorrectedAge,
					formState: this.formState,
					checkedCount: this.checkedCount,
					totalCount: this.totalCount,
					progressPercent: this.progressPercent,
					assessmentDate: new Date().toISOString()
				}
				
				// 保存评估结果
				uni.setStorageSync('assessmentResult', assessmentResult)
				
				// 延迟跳转
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/result/result'
					})
				}, 2000)
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
	
	/* 年龄段和模式信息 */
	.age-info {
		background: rgba(135, 206, 235, 0.1);
		border-radius: 15rpx;
		padding: 20rpx 30rpx;
		margin-bottom: 30rpx;
		text-align: center;
		border: 2rpx solid rgba(135, 206, 235, 0.3);
	}
	
	.age-text {
		font-size: 28rpx;
		color: #2C3E50;
		font-weight: bold;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.mode-text {
		font-size: 24rpx;
		color: #7F8C8D;
		margin-left: 10rpx;
	}
	
	.mode-switch {
		display: flex;
		gap: 20rpx;
		justify-content: center;
		margin-top: 15rpx;
	}
	
	.mode-btn {
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		border: 2rpx solid #87CEEB;
		background: #FFFFFF;
		color: #87CEEB;
		font-size: 24rpx;
		transition: all 0.3s ease;
	}
	
	.mode-btn.active {
		background: #87CEEB;
		color: #FFFFFF;
	}
	
	/* 进度信息 */
	.progress-container {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 25rpx 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.progress-text {
		text-align: center;
		font-size: 26rpx;
		color: #7F8C8D;
		font-weight: 500;
		margin-bottom: 15rpx;
	}
	
	.progress-bar {
		width: 100%;
		height: 12rpx;
		background: #E8F4FD;
		border-radius: 6rpx;
		overflow: hidden;
	}
	
	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #87CEEB, #98FB98);
		border-radius: 6rpx;
		transition: width 0.3s ease;
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
	
	.question-meta {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
		margin-top: 15rpx;
	}
	
	.question-category {
		display: inline-block;
		font-size: 24rpx;
		color: #87CEEB;
		background: rgba(135, 206, 235, 0.1);
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		font-weight: 500;
		align-self: flex-start;
	}
	
	.question-subcategory {
		font-size: 22rpx;
		color: #7F8C8D;
		background: rgba(127, 140, 141, 0.1);
		padding: 6rpx 12rpx;
		border-radius: 15rpx;
		align-self: flex-start;
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
	
	/* 评估选项 */
	.assessment-option {
		margin-top: 40rpx;
	}
	
	.option-box {
		display: flex;
		align-items: center;
		padding: 30rpx;
		background: rgba(255, 255, 255, 0.9);
		border: 3rpx solid #E8F4FD;
		border-radius: 20rpx;
		transition: all 0.3s ease;
	}
	
	.option-box.selected {
		background: rgba(135, 206, 235, 0.1);
		border-color: #87CEEB;
		box-shadow: 0 4rpx 20rpx rgba(135, 206, 235, 0.3);
	}
	
	.option-icon {
		font-size: 40rpx;
		margin-right: 20rpx;
		transition: all 0.3s ease;
	}
	
	.option-text {
		font-size: 28rpx;
		color: #2C3E50;
		font-weight: 500;
		flex: 1;
	}
	
	.option-box.selected .option-text {
		color: #87CEEB;
		font-weight: bold;
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
	}
	
	.submit-button {
		width: 100%;
		height: 80rpx;
		border-radius: 40rpx;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 80rpx;
		padding: 0;
		font-size: 28rpx;
		font-weight: 600;
		overflow: hidden;
		transition: all 0.3s;
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		color: #FFFFFF;
		box-shadow: 0 4rpx 15rpx rgba(135, 206, 235, 0.3);
	}
	
	.submit-button:disabled {
		background: #BDC3C7;
		box-shadow: none;
		opacity: 0.6;
	}
	
	button.submit-button::after {
		border: none;
	}
	
	.button-text {
		height: 100%;
		line-height: 80rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 0;
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
	
	/* 子分类头部 */
	.subcategory-header {
		background: rgba(135, 206, 235, 0.1);
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 20rpx;
		border-left: 6rpx solid #87CEEB;
	}
	
	.subcategory-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #2C3E50;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.subcategory-count {
		font-size: 24rpx;
		color: #7F8C8D;
	}
	
	/* 领域分组 */
	.domain-section {
		margin-bottom: 30rpx;
	}
	
	.domain-header {
		background: rgba(135, 206, 235, 0.1);
		padding: 20rpx 30rpx;
		border-radius: 15rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 15rpx;
		border-left: 6rpx solid #87CEEB;
	}
	
	.domain-title {
		font-size: 28rpx;
		font-weight: bold;
		color: #2C3E50;
		flex: 1;
	}
	
	.domain-count {
		font-size: 24rpx;
		color: #7F8C8D;
		margin-right: 20rpx;
	}
	
	.domain-toggle {
		font-size: 24rpx;
		color: #87CEEB;
		font-weight: bold;
	}
	
	.domain-questions {
		padding: 0 20rpx;
	}
	
	/* 题目列表容器 */
	.questions-container {
		padding: 0 20rpx;
		margin-bottom: 120rpx;
	}
	
	/* 无题目提示 */
	.no-questions {
		text-align: center;
		padding: 100rpx 30rpx;
	}
	
	.no-questions-text {
		font-size: 32rpx;
		color: #7F8C8D;
		display: block;
		margin-bottom: 20rpx;
	}
	
	.no-questions-hint {
		font-size: 24rpx;
		color: #BDC3C7;
	}
	
	/* 卡片样式 */
	.card {
		background: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
		transition: background-color 0.25s ease, border-color 0.25s ease;
		border: 1rpx solid #eef2f7;
	}
	
	.card.selected {
		background: #E8F5E9 !important;
		border-color: #4CAF50;
	}
	
	/* 卡片头部 */
	.card-hd {
		display: flex;
		align-items: flex-start;
		margin-bottom: 15rpx;
	}
	
	.no {
		color: #2196F3;
		margin-right: 8rpx;
		font-size: 24rpx;
		font-weight: bold;
		min-width: 40rpx;
	}
	
	.title {
		font-weight: 600;
		font-size: 28rpx;
		color: #2C3E50;
		line-height: 1.5;
		flex: 1;
	}
	
	/* 描述区域 */
	.desc {
		margin-bottom: 15rpx;
		padding: 15rpx;
		border-radius: 8rpx;
		font-size: 24rpx;
		color: #7F8C8D;
		line-height: 1.4;
	}
	
	.neutral-bg {
		background: transparent !important;
	}
	
	/* checkbox 样式 */
	.chk {
		display: flex;
		align-items: center;
		gap: 12rpx;
		margin-top: 12rpx;
		font-size: 26rpx;
		color: #2C3E50;
	}
</style>
