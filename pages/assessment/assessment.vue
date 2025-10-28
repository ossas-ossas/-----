<template>
	<view class="container">
		<!-- 顶部工具条（吸顶） -->
		<view class="top-bar">
			<view class="top-header">
				<text class="page-title">发育评估</text>
				<text class="global-stats">{{ derivedStats.global.selected }}/{{ derivedStats.global.total }} ({{ derivedStats.global.ratio }}%)</text>
			</view>
			
			<!-- 搜索框 -->
			<view class="search-box">
				<input
					class="search-input"
					v-model="filters.keyword"
					placeholder="搜索题目..."
					@input="applyFilters"
				/>
				<text class="search-icon">🔍</text>
		</view>
		
			<!-- 筛选开关 -->
			<view class="filter-switch">
				<switch :checked="filters.onlyUnfinished" @change="onUnfinishedToggle" />
				<text class="switch-label">仅看未完成</text>
			</view>
		</view>
		
		<!-- 主列表 -->
		<view class="questions-container">
			<!-- 按 domain 分组 -->
			<template v-for="domain in allDomains">
				<view v-if="hasMatchingQuestionsInDomain(domain)" :key="domain" class="domain-section">
					<!-- domain 头部 -->
				<view class="domain-header" @click="toggleDomain(domain)">
						<text class="domain-title">{{ getDomainLabel(domain) }}</text>
						<text class="domain-stats" v-if="getDomainStats(domain)">
							{{ getDomainStats(domain).selected }}/{{ getDomainStats(domain).total }}
							({{ getDomainStats(domain).ratio }}%)
						</text>
						<view class="domain-actions">
							<text class="action-btn" @click.stop="selectAllInDomain(domain)">全选</text>
							<text class="action-btn" @click.stop="clearDomain(domain)">清空</text>
						</view>
						<text class="domain-toggle">
							{{ expandedDomains[domain] ? '▼' : '▶' }}
						</text>
				</view>
				
				<!-- subdomain 列表（仅当 domain 展开时渲染） -->
				<view v-if="expandedDomains[domain]" class="domain-content">
					<template v-for="subdomain in getSubdomainsInDomain(domain)">
					<view 
							v-if="hasMatchingQuestionsInSubdomain(domain, subdomain)"
							:key="`${domain}::${subdomain}`"
							class="subdomain-section"
						>
							<!-- subdomain 头部 -->
							<view class="subdomain-header" @click="toggleSubdomain(`${domain}::${subdomain}`)">
								<text class="subdomain-title">{{ getSubdomainLabel(subdomain) }}</text>
								<text class="subdomain-stats" v-if="getSubdomainStats(domain, subdomain)">
									{{ getSubdomainStats(domain, subdomain).selected }}/{{ getSubdomainStats(domain, subdomain).total }}
									({{ getSubdomainStats(domain, subdomain).ratio }}%)
								</text>
								<view class="subdomain-actions">
									<text class="action-btn" @click.stop="selectAllInSubdomain(domain, subdomain)">全选</text>
									<text class="action-btn" @click.stop="clearSubdomain(domain, subdomain)">清空</text>
								</view>
								<text class="subdomain-toggle">
									{{ expandedSubdomains[`${domain}::${subdomain}`] ? '▼' : '▶' }}
								</text>
						</view>
						
							<!-- 题目列表（仅当 subdomain 展开时渲染） -->
							<view v-if="expandedSubdomains[`${domain}::${subdomain}`]" class="subdomain-questions">
								<view
									class="question-card"
									:class="{ selected: answers[q.id] === 1 }"
									v-for="q in getVisibleQuestions(domain, subdomain)"
									:key="q.id"
									@click="toggleAnswer(q.id)"
								>
									<view class="question-content">
										<checkbox-group>
											<label class="question-label">
												<checkbox :value="q.id" :checked="answers[q.id] === 1" />
												<text class="question-text">{{ q.text }}</text>
							</label>
						</checkbox-group>
					</view>
				</view>
			</view>
						</view>
					</template>
				</view>
			</view>
		</template>
		</view>
		
		<!-- 底部操作条（吸底） -->
		<view class="bottom-bar">
			<view class="progress-bar-container">
				<text class="progress-text">{{ derivedStats.global.selected }}/{{ derivedStats.global.total }}</text>
				<view class="progress-bar">
					<view class="progress-fill" :style="{ width: derivedStats.global.ratio + '%' }"></view>
				</view>
		</view>
		
			<view class="bottom-actions">
				<button class="action-btn" @click="saveDraft">
					<text>保存草稿</text>
				</button>
				<button class="action-btn primary" @click="submitAssessment" :disabled="isSubmitting">
					<text>{{ isSubmitting ? '提交中...' : '提交评估' }}</text>
				</button>
				<button class="action-btn" @click="scrollToTop">
					<text>回到顶部</text>
			</button>
			</view>
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
import { questions } from '@/common/questionBank.js'

// 领域标签映射
const domainLabels = {
	'感知觉': '感知觉',
	'粗大动作': '粗大动作',
	'精细动作': '精细动作',
	'认知': '认知',
	'语言': '语言',
	'社会情绪': '社会情绪',
	'社会互动': '社会互动'
}

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
			// 题目数据（按 domain -> subdomain 分组）
			questionsByDomain: {},
			
			// 展开状态
				expandedDomains: {},
			expandedSubdomains: {},
			
			// 答案（1=完成，0=未完成）
			answers: {},
			
			// 筛选器
			filters: {
				keyword: '',
				domains: [],
				onlyUnfinished: false
			},
			
			// 提交状态
				isSubmitting: false,
			
			// 儿童信息
			childInfo: {}
			}
		},
		computed: {
		// 所有领域
		allDomains() {
			const domains = new Set()
			questions.forEach(q => {
				if (q.domain) domains.add(q.domain)
			})
			return Array.from(domains).sort()
		},
		
		// 统计信息
		derivedStats() {
			const stats = {
				global: { selected: 0, total: 0, ratio: 0 },
				byDomain: {}
			}
			
			// 统计全局
			const totalQs = Object.values(this.questionsByDomain).reduce((sum, subdomains) => {
				return sum + Object.values(subdomains).reduce((s, qs) => s + qs.length, 0)
			}, 0)
			
			const selectedQs = Object.values(this.answers).filter(v => v === 1).length
			
			stats.global.total = totalQs
			stats.global.selected = selectedQs
			if (totalQs > 0) {
				stats.global.ratio = Math.round((selectedQs / totalQs) * 100)
			}
			
			// 统计每个 domain
			this.allDomains.forEach(domain => {
				const domainQs = this.getQuestionsInDomain(domain)
				const selected = domainQs.filter(q => this.answers[q.id] === 1).length
				stats.byDomain[domain] = {
					selected,
					total: domainQs.length,
					ratio: domainQs.length > 0 ? Math.round((selected / domainQs.length) * 100) : 0
				}
			})
			
			return stats
			}
		},
		onLoad() {
		console.log('[assessment] onLoad start')
			this.loadChildInfo()
		const draft = uni.getStorageSync('assessmentDraft')
		const hasDraft = draft && Object.keys(draft).length > 0
		
		this.initData()
		
		if (!hasDraft) {
			// 首次进入：只展开第一个 domain 的第一个 subdomain
			this.allDomains.forEach((domain, idx) => {
				if (idx === 0 && this.hasQuestionsInDomain(domain)) {
					this.$set(this.expandedDomains, domain, true)
					const subdomains = this.getSubdomainsInDomain(domain)
					if (subdomains.length > 0) {
						this.$set(this.expandedSubdomains, `${domain}::${subdomains[0]}`, true)
					}
				} else {
					this.$set(this.expandedDomains, domain, false)
				}
			})
		}
		
		this.loadDraft()
		
		// 对于没有草稿答案的题目，初始化为0
		questions.forEach(q => {
			if (this.answers[q.id] === undefined) {
				this.answers[q.id] = 0
			}
		})
		
		console.log('[assessment] onLoad end')
	},
	beforeDestroy() {
		this.saveDraft()
		},
		methods: {
		// 初始化数据
		initData() {
			console.log('[assessment] initData start, questions count:', questions.length)
			
			// 按 domain -> subdomain 分组题目
			this.questionsByDomain = {}
			questions.forEach(q => {
				const domain = q.domain || '认知'
				if (!this.questionsByDomain[domain]) {
					this.questionsByDomain[domain] = {}
				}
				const subdomain = q.subdomain || 'other'
				if (!this.questionsByDomain[domain][subdomain]) {
					this.questionsByDomain[domain][subdomain] = []
				}
				this.questionsByDomain[domain][subdomain].push(q)
			})
			
			console.log('[assessment] grouped by domain, keys:', Object.keys(this.questionsByDomain))
			console.log('[assessment] initData end')
		},
		
			// 加载儿童信息
			loadChildInfo() {
				this.childInfo = uni.getStorageSync('childInfo') || {}
		},
		
		// 加载草稿
		loadDraft() {
			const draft = uni.getStorageSync('assessmentDraft')
			if (draft) {
				if (draft.answers) this.answers = draft.answers
				if (draft.expandedDomains) this.expandedDomains = draft.expandedDomains
				if (draft.expandedSubdomains) this.expandedSubdomains = draft.expandedSubdomains
				if (draft.filters) this.filters = draft.filters
			}
		},
		
		// 保存草稿
		saveDraft() {
			uni.setStorageSync('assessmentDraft', {
				answers: this.answers,
				expandedDomains: this.expandedDomains,
				expandedSubdomains: this.expandedSubdomains,
				filters: this.filters
			})
		},
		
		// 切换 domain
		toggleDomain(domain) {
			this.$set(this.expandedDomains, domain, !this.expandedDomains[domain])
			this.saveDraft()
		},
		
		// 切换 subdomain
		toggleSubdomain(key) {
			this.$set(this.expandedSubdomains, key, !this.expandedSubdomains[key])
			this.saveDraft()
		},
		
		// 获取 domain 中的题目
		getQuestionsInDomain(domain) {
			const questions = []
			Object.values(this.questionsByDomain[domain] || {}).forEach(list => {
				questions.push(...list)
			})
			return questions
		},
		
		// 获取 domain 中的 subdomains
		getSubdomainsInDomain(domain) {
			return Object.keys(this.questionsByDomain[domain] || {}).sort()
		},
		
		// 检查 domain 是否有题目
		hasQuestionsInDomain(domain) {
			return this.questionsByDomain[domain] && Object.keys(this.questionsByDomain[domain]).length > 0
		},
		
		// 获取领域统计
		getDomainStats(domain) {
			const questions = this.getQuestionsInDomain(domain)
			const selected = questions.filter(q => this.answers[q.id] === 1).length
			return {
				selected,
				total: questions.length,
				ratio: questions.length > 0 ? Math.round((selected / questions.length) * 100) : 0
			}
		},
		
		// 获取子领域统计
		getSubdomainStats(domain, subdomain) {
			const questions = this.questionsByDomain[domain]?.[subdomain] || []
			const selected = questions.filter(q => this.answers[q.id] === 1).length
			return {
				selected,
				total: questions.length,
				ratio: questions.length > 0 ? Math.round((selected / questions.length) * 100) : 0
			}
		},
		
		// 获取领域标签
		getDomainLabel(domain) {
			return domainLabels[domain] || domain
		},
		
		// 获取子领域标签
		getSubdomainLabel(subdomain) {
			return subdomainLabels[subdomain] || subdomain
		},
		
		// 检查 domain 是否有匹配的题目
		hasMatchingQuestionsInDomain(domain) {
			if (!this.hasQuestionsInDomain(domain)) return false
			
			// 如果没有搜索条件，返回 true
			if (!this.filters.keyword && this.filters.domains.length === 0 && !this.filters.onlyUnfinished) {
				return true
			}
			
			// 检查是否有匹配的题目
			const questions = this.getQuestionsInDomain(domain)
			return this.applyFiltersToQuestions(questions).length > 0
		},
		
		// 检查 subdomain 是否有匹配的题目
		hasMatchingQuestionsInSubdomain(domain, subdomain) {
			const questions = this.questionsByDomain[domain]?.[subdomain] || []
			if (questions.length === 0) return false
			
			// 如果没有搜索条件，返回 true
			if (!this.filters.keyword && this.filters.domains.length === 0 && !this.filters.onlyUnfinished) {
				return true
			}
			
			// 检查是否有匹配的题目
			return this.applyFiltersToQuestions(questions).length > 0
		},
		
		// 获取可见的题目（应用筛选）
		getVisibleQuestions(domain, subdomain) {
			let questions = this.questionsByDomain[domain]?.[subdomain] || []
			
			// 应用筛选
			return this.applyFiltersToQuestions(questions)
		},
		
		// 对题目应用筛选
		applyFiltersToQuestions(questions) {
			return questions.filter(q => {
				// 关键词筛选
				if (this.filters.keyword) {
					const keyword = this.filters.keyword.toLowerCase()
					if (!q.text.toLowerCase().includes(keyword)) {
						return false
					}
				}
				
				// 领域筛选
				if (this.filters.domains.length > 0 && !this.filters.domains.includes(q.domain)) {
					return false
				}
				
				// 仅看未完成
				if (this.filters.onlyUnfinished && this.answers[q.id] === 1) {
					return false
				}
				
				return true
			})
		},
		
		// 切换答案
		toggleAnswer(qid) {
			this.$set(this.answers, qid, this.answers[qid] === 1 ? 0 : 1)
			this.saveDraft()
		},
		
		// 领域筛选切换
		toggleDomainFilter(domain) {
			const idx = this.filters.domains.indexOf(domain)
			if (idx >= 0) {
				this.filters.domains.splice(idx, 1)
			} else {
				this.filters.domains.push(domain)
			}
			this.saveDraft()
		},
		
		// 仅看未完成开关
		onUnfinishedToggle(e) {
			this.filters.onlyUnfinished = e.detail.value
			this.saveDraft()
		},
		
		// 应用筛选（搜索时）
		applyFilters() {
			// 如果有搜索关键词，自动展开包含匹配题目的 domain 和 subdomain
			if (this.filters.keyword) {
				this.allDomains.forEach(domain => {
					if (this.hasMatchingQuestionsInDomain(domain)) {
						// 展开 domain
						this.$set(this.expandedDomains, domain, true)
						
						// 展开有匹配题目的 subdomain
						const subdomains = this.getSubdomainsInDomain(domain)
						subdomains.forEach(subdomain => {
							if (this.hasMatchingQuestionsInSubdomain(domain, subdomain)) {
								this.$set(this.expandedSubdomains, `${domain}::${subdomain}`, true)
							}
						})
					}
				})
				this.saveDraft()
			}
			
			this.$forceUpdate()
		},
		
		// 全选本领域
		selectAllInDomain(domain) {
			const questions = this.getQuestionsInDomain(domain)
			questions.forEach(q => {
				this.$set(this.answers, q.id, 1)
			})
			this.saveDraft()
		},
		
		// 清空本领域
		clearDomain(domain) {
			const questions = this.getQuestionsInDomain(domain)
			questions.forEach(q => {
				this.$set(this.answers, q.id, 0)
			})
			this.saveDraft()
		},
		
		// 全选本子领域
		selectAllInSubdomain(domain, subdomain) {
			const questions = this.questionsByDomain[domain]?.[subdomain] || []
			questions.forEach(q => {
				this.$set(this.answers, q.id, 1)
			})
			this.saveDraft()
		},
		
		// 清空本子领域
		clearSubdomain(domain, subdomain) {
			const questions = this.questionsByDomain[domain]?.[subdomain] || []
			questions.forEach(q => {
				this.$set(this.answers, q.id, 0)
			})
			this.saveDraft()
			},
			
			// 提交评估
			submitAssessment() {
			if (this.isSubmitting) return
				
				this.isSubmitting = true
				
				// 生成评估结果
				const assessmentResult = {
					childInfo: this.childInfo,
				answers: this.answers,
				formState: this.formatFormState(),
				checkedCount: this.derivedStats.global.selected,
				totalCount: this.derivedStats.global.total,
				progressPercent: this.derivedStats.global.ratio,
					assessmentDate: new Date().toISOString()
				}
				
				// 保存评估结果
				uni.setStorageSync('assessmentResult', assessmentResult)
			
			// 清除草稿
			uni.removeStorageSync('assessmentDraft')
				
				// 延迟跳转
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/result/result'
					})
			}, 1000)
		},
		
		// 格式化 formState（兼容旧格式）
		formatFormState() {
			const formState = {}
			Object.keys(this.questionsByDomain).forEach(domain => {
				formState[domain] = []
				Object.values(this.questionsByDomain[domain]).forEach(list => {
					list.forEach(q => {
						formState[domain].push({
							...q,
							checked: this.answers[q.id] === 1
						})
					})
				})
			})
			return formState
		},
		
		// 回到顶部
		scrollToTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			})
			}
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		background: linear-gradient(180deg, #fff 0%, #F5F9FC 100%);
		padding-bottom: 180rpx;
		position: relative;
		overflow: hidden;
	}
	
	.container::before {
		content: '';
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 300%;
		height: 300%;
		background: url('/static/logo.png') center center / contain no-repeat;
		filter: blur(40rpx);
		opacity: 0.15;
		z-index: 0;
		pointer-events: none;
	}

/* 顶部工具条（吸顶） */
.top-bar {
	position: sticky;
	top: 0;
	z-index: 100;
	background: rgba(255, 255, 255, 0.98);
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(233, 58, 138, 0.1);
	backdrop-filter: blur(10rpx);
}

.top-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.page-title {
	font-size: 36rpx;
		font-weight: bold;
		color: #2C3E50;
}

.global-stats {
	font-size: 28rpx;
	color: #87CEEB;
	font-weight: 600;
}

.search-box {
	position: relative;
	margin-bottom: 20rpx;
}

.search-input {
	width: 100%;
	height: 70rpx;
	background: #F8F9FA;
	border-radius: 35rpx;
	padding: 0 70rpx 0 30rpx;
	font-size: 26rpx;
}

.search-icon {
	position: absolute;
	right: 30rpx;
	top: 50%;
	transform: translateY(-50%);
	font-size: 28rpx;
}

.domain-chips {
		display: flex;
	flex-wrap: wrap;
	gap: 15rpx;
	margin-bottom: 20rpx;
}

.chip {
	padding: 8rpx 20rpx;
	background: #F8F9FA;
	border: 2rpx solid #E8F4FD;
	border-radius: 30rpx;
		font-size: 24rpx;
		color: #7F8C8D;
	}
	
.chip.active {
		background: #87CEEB;
		color: #FFFFFF;
	border-color: #87CEEB;
}

.filter-switch {
	display: flex;
	align-items: center;
	gap: 15rpx;
}

.switch-label {
		font-size: 26rpx;
	color: #2C3E50;
}

/* 主列表 */
.questions-container {
	padding: 20rpx;
	position: relative;
	z-index: 1;
}

.domain-section {
		margin-bottom: 30rpx;
	}
	
.domain-header {
	background: linear-gradient(135deg, #87CEEB, #98FB98);
	padding: 25rpx 30rpx;
	border-radius: 15rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
		margin-bottom: 15rpx;
	}
	
.domain-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #FFFFFF;
}

.domain-stats {
	font-size: 26rpx;
	color: #FFFFFF;
	margin: 0 15rpx;
}

.domain-actions {
		display: flex;
	gap: 20rpx;
}

.action-btn {
		font-size: 22rpx;
	color: #FFFFFF;
	padding: 5rpx 15rpx;
	border: 1rpx solid rgba(255,255,255,0.5);
	border-radius: 10rpx;
	background: rgba(255,255,255,0.2);
}

.domain-toggle {
	font-size: 28rpx;
	color: #FFFFFF;
}

.domain-content {
	padding-left: 20rpx;
}

.subdomain-section {
	margin-bottom: 20rpx;
}

.subdomain-header {
	background: #E8F4FD;
	padding: 20rpx 25rpx;
	border-radius: 12rpx;
		display: flex;
		align-items: center;
	justify-content: space-between;
	margin-bottom: 10rpx;
}

.subdomain-title {
	font-size: 28rpx;
	font-weight: 600;
	color: #2C3E50;
}

.subdomain-stats {
	font-size: 24rpx;
	color: #87CEEB;
	margin-left: 15rpx;
}

.subdomain-actions {
	display: flex;
	gap: 20rpx;
	margin-left: auto;
}

.subdomain-toggle {
	font-size: 24rpx;
	color: #7F8C8D;
	margin-left: 15rpx;
}

.subdomain-questions {
	padding: 0 10rpx;
}

.question-card {
	background: #FFFFFF;
	padding: 20rpx;
	margin-bottom: 15rpx;
	border-radius: 12rpx;
	border: 2rpx solid transparent;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	transition: all 0.3s;
}

.question-card.selected {
	background: #F0F8FF;
	border-color: #87CEEB;
}

.question-content {
	line-height: 1.5;
}

.question-label {
		display: flex;
	align-items: flex-start;
	gap: 15rpx;
}

.question-text {
	font-size: 26rpx;
	color: #2C3E50;
	flex: 1;
}

.show-more-btn {
	text-align: center;
	padding: 20rpx;
	color: #87CEEB;
	font-size: 26rpx;
	background: #F0F8FF;
	border-radius: 12rpx;
}

/* 底部操作条（吸底） */
.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	background: #FFFFFF;
	padding: 20rpx;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
	z-index: 99;
}

.progress-bar-container {
	margin-bottom: 20rpx;
}

.progress-text {
	font-size: 24rpx;
	color: #7F8C8D;
	margin-bottom: 10rpx;
	display: block;
}

.progress-bar {
		width: 100%;
	height: 8rpx;
	background: #F0F0F0;
	border-radius: 4rpx;
		overflow: hidden;
}

.progress-fill {
	height: 100%;
	background: linear-gradient(90deg, #87CEEB, #98FB98);
	transition: width 0.3s;
}

.bottom-actions {
	display: flex;
	gap: 15rpx;
}

.bottom-actions .action-btn {
	flex: 1;
		height: 80rpx;
	background: #F8F9FA;
	border: 2rpx solid #E8F4FD;
		border-radius: 40rpx;
	font-size: 28rpx;
	color: #2C3E50;
		display: flex;
		align-items: center;
		justify-content: center;
}

.bottom-actions .action-btn.primary {
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		color: #FFFFFF;
		border: none;
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
	z-index: 999;
	}
	
	.loading-content {
	background: #FFFFFF;
	padding: 40rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	gap: 20rpx;
	}
	
	.loading-spinner {
		width: 60rpx;
		height: 60rpx;
		border: 4rpx solid #E8F4FD;
	border-top-color: #87CEEB;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
	
	@keyframes spin {
	to { transform: rotate(360deg); }
	}
	
	.loading-text {
		font-size: 28rpx;
		color: #2C3E50;
	}
</style>
