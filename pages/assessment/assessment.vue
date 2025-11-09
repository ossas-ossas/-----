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
						<text class="domain-stats" v-if="derivedStats.byDomain[domain]">
							{{ derivedStats.byDomain[domain].selected }}/{{ derivedStats.byDomain[domain].total }}
							({{ derivedStats.byDomain[domain].ratio }}%)
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
								<text class="subdomain-stats" v-if="derivedStats.bySubdomain[domain] && derivedStats.bySubdomain[domain][subdomain]">
									{{ derivedStats.bySubdomain[domain][subdomain].selected }}/{{ derivedStats.bySubdomain[domain][subdomain].total }}
									({{ derivedStats.bySubdomain[domain][subdomain].ratio }}%)
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
			
			// 答案更新计数器（用于强制 computed 重新计算）
			answersVersion: 0,
			
			// 筛选器
			filters: {
				keyword: '',
				domains: [],
				onlyUnfinished: false
			},
			
			// 提交状态
				isSubmitting: false,
			
			// 儿童信息
			childInfo: {},
			
			// 防抖和智能保存相关
			saveDraftTimer: null, // 防抖定时器
			lastSavedAnswers: null // 记录上次保存的答案，用于判断是否需要更新
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
			// 依赖 answersVersion 来强制重新计算
			const version = this.answersVersion
			
			const stats = {
				global: { selected: 0, total: 0, ratio: 0 },
				byDomain: {},
				bySubdomain: {} // 添加子领域统计
			}
			
			// 统计全局
			const totalQs = Object.values(this.questionsByDomain).reduce((sum, subdomains) => {
				return sum + Object.values(subdomains).reduce((s, qs) => s + qs.length, 0)
			}, 0)
			
			// 访问 answers 的所有值来触发依赖收集
			const answersKeys = Object.keys(this.answers)
			let selectedQs = 0
			answersKeys.forEach(k => {
				if (this.answers[k] === 1) {
					selectedQs++
				}
			})
			
			stats.global.total = totalQs
			stats.global.selected = selectedQs
			if (totalQs > 0) {
				stats.global.ratio = Math.round((selectedQs / totalQs) * 100)
			}
			
			// 统计每个 domain 和 subdomain
			this.allDomains.forEach(domain => {
				const domainQs = this.getQuestionsInDomain(domain)
				let selected = 0
				domainQs.forEach(q => {
					// 确保访问 answers[q.id] 以触发依赖
					if (this.answers[q.id] === 1) {
						selected++
					}
				})
				stats.byDomain[domain] = {
					selected,
					total: domainQs.length,
					ratio: domainQs.length > 0 ? Math.round((selected / domainQs.length) * 100) : 0
				}
				
				// 统计每个 subdomain
				if (!stats.bySubdomain[domain]) {
					stats.bySubdomain[domain] = {}
				}
				const subdomains = this.getSubdomainsInDomain(domain)
				subdomains.forEach(subdomain => {
					const subdomainQs = this.questionsByDomain[domain]?.[subdomain] || []
					let subdomainSelected = 0
					subdomainQs.forEach(q => {
						// 确保访问 answers[q.id] 以触发依赖
						if (this.answers[q.id] === 1) {
							subdomainSelected++
						}
					})
					stats.bySubdomain[domain][subdomain] = {
						selected: subdomainSelected,
						total: subdomainQs.length,
						ratio: subdomainQs.length > 0 ? Math.round((subdomainSelected / subdomainQs.length) * 100) : 0
					}
				})
			})
			
			return stats
			}
		},
		onShow() {
			// 登录守卫：检查是否已登录
			const token = uni.getStorageSync('uni_id_token')
			if (!token) {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
				})
				return
			}
			
			// 每次页面显示时重新加载儿童信息（确保从 child-info 页面返回后能获取最新数据）
			this.loadChildInfo();
			
			console.log('[assessment] onShow: 重新加载儿童信息后', {
				hasChildId: !!(this.childInfo?.childId || this.childInfo?._id),
				childId: this.childInfo?.childId || this.childInfo?._id
			});
		},
		onLoad() {
		console.log('[assessment] onLoad start')
			this.loadChildInfo()
		
		// 检查是否需要清除旧草稿
		const draft = uni.getStorageSync('assessmentDraft')
		const currentChildId = this.childInfo?.childId || this.childInfo?._id
		const draftChildId = draft?.childId
		
		// 如果 childId 不匹配，说明是新评估，清除旧草稿
		if (draft && draftChildId && currentChildId && draftChildId !== currentChildId) {
			console.log('[assessment] 检测到新的 childId，清除旧草稿')
			uni.removeStorageSync('assessmentDraft')
			uni.removeStorageSync('assessmentResult')
		}
		
		const hasDraft = draft && Object.keys(draft).length > 0 && (!currentChildId || draftChildId === currentChildId)
		
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
		
		// 加载儿童信息（兼容用户专属存储和普通存储）
		loadChildInfo() {
			// 尝试从多个位置读取，优先用户专属存储
			let userKey = null;
			let foundChildInfo = null;
			
			try {
				// 尝试导入 getUserStorageKey（如果可用）
				const authModule = require('@/common/auth.js');
				if (authModule && authModule.getUserStorageKey) {
					userKey = authModule.getUserStorageKey('childInfo');
					foundChildInfo = uni.getStorageSync(userKey);
				}
			} catch (e) {
				console.warn('[assessment] 无法导入 auth 模块:', e);
			}
			
			// 如果用户专属存储没有找到，尝试普通存储
			if (!foundChildInfo || Object.keys(foundChildInfo).length === 0) {
				foundChildInfo = uni.getStorageSync('childInfo');
			}
			
			// 如果还是没有找到，尝试搜索所有可能的用户专属存储键
			if (!foundChildInfo || Object.keys(foundChildInfo).length === 0) {
				try {
					const authModule = require('@/common/auth.js');
					if (authModule && authModule.getCurrentUserId) {
						const userId = authModule.getCurrentUserId();
						if (userId) {
							// 尝试所有可能的键名格式
							const possibleKeys = [
								`childInfo_${userId}`,
								`childInfo_${userId}_`,
								`childInfo_user_${userId}`
							];
							for (const key of possibleKeys) {
								const data = uni.getStorageSync(key);
								if (data && Object.keys(data).length > 0) {
									foundChildInfo = data;
									userKey = key;
									break;
								}
							}
						}
					}
				} catch (e) {
					console.warn('[assessment] 搜索用户专属存储失败:', e);
				}
			}
			
			// 设置 childInfo，确保不为空
			this.childInfo = foundChildInfo || {};
			
			// 调试日志
			console.log('[assessment] 加载儿童信息:', {
				hasChildInfo: Object.keys(this.childInfo).length > 0,
				childId: this.childInfo?.childId || this.childInfo?._id,
				childName: this.childInfo?.name,
				userKey: userKey,
				fromUserStorage: !!userKey && !!uni.getStorageSync(userKey),
				fromLegacyStorage: !!uni.getStorageSync('childInfo'),
				childInfoKeys: Object.keys(this.childInfo || {})
			});
		},
		
		// 加载草稿
		loadDraft() {
			const draft = uni.getStorageSync('assessmentDraft')
			const currentChildId = this.childInfo?.childId || this.childInfo?._id
			const draftChildId = draft?.childId
			
			// 只加载匹配当前 childId 的草稿
			if (draft && (!currentChildId || !draftChildId || draftChildId === currentChildId)) {
				if (draft.answers) {
					// 使用 $set 逐个设置答案，确保响应式
					Object.keys(this.answers).forEach(k => {
						delete this.answers[k]
					})
					Object.keys(draft.answers).forEach(k => {
						this.$set(this.answers, k, draft.answers[k])
					})
					// 更新版本号，强制 computed 重新计算
					this.answersVersion++
				}
				if (draft.expandedDomains) this.expandedDomains = draft.expandedDomains
				if (draft.expandedSubdomains) this.expandedSubdomains = draft.expandedSubdomains
				if (draft.filters) this.filters = draft.filters
				// 强制更新视图
				this.$nextTick(() => {
					this.$forceUpdate()
				})
			}
		},
		
		// 保存草稿（优化：添加防抖和智能保存）
		async saveDraft(saveToCloud = true) {
			const currentChildId = this.childInfo?.childId || this.childInfo?._id
			
			// 总是保存到本地（快速响应）
			uni.setStorageSync('assessmentDraft', {
				childId: currentChildId,
				answers: this.answers,
				expandedDomains: this.expandedDomains,
				expandedSubdomains: this.expandedSubdomains,
				filters: this.filters
			})
			
			// 如果没有 childId，只保存到本地
			if (!currentChildId || !saveToCloud) {
				return
			}
			
			// 检查答案是否真的变化了（减少不必要的数据库写入）
			const answersStr = JSON.stringify(this.answers);
			if (this.lastSavedAnswers === answersStr) {
				// 答案未变化，不需要更新数据库
				console.log('[saveDraft] 答案未变化，跳过云端保存');
				return;
			}
			
			// 清除之前的定时器（防抖）
			if (this.saveDraftTimer) {
				clearTimeout(this.saveDraftTimer);
			}
			
			// 设置防抖：3秒后才真正保存到云端（减少写入频率）
			this.saveDraftTimer = setTimeout(async () => {
				try {
					const result = await uniCloud.callFunction({
						name: 'saveAssessment',
						data: {
							childId: currentChildId,
							answers: this.answers
						}
					})
					
					if (result.result && !result.result.ok) {
						console.error('[saveDraft] 云端保存失败:', result.result.msg)
					} else {
						console.log('[saveDraft] 云端保存成功')
						// 记录已保存的答案
						this.lastSavedAnswers = JSON.stringify(this.answers);
					}
				} catch (error) {
					console.error('[saveDraft] 云端保存异常:', error)
					// 静默失败，不影响用户体验
				}
				this.saveDraftTimer = null;
			}, 3000); // 3秒防抖
		},
		
		// 切换 domain
		toggleDomain(domain) {
			this.$set(this.expandedDomains, domain, !this.expandedDomains[domain])
			// 只保存到本地，不触发云端保存（减少数据库写入）
			this.saveDraft(false)
		},
		
		// 切换 subdomain
		toggleSubdomain(key) {
			this.$set(this.expandedSubdomains, key, !this.expandedSubdomains[key])
			// 只保存到本地，不触发云端保存（减少数据库写入）
			this.saveDraft(false)
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
			const newValue = this.answers[qid] === 1 ? 0 : 1
			// 使用 $set 确保响应式
			this.$set(this.answers, qid, newValue)
			// 更新版本号，强制 computed 重新计算
			this.answersVersion++
			this.saveDraft()
			// 强制更新视图
			this.$forceUpdate()
		},
		
		// 领域筛选切换
		toggleDomainFilter(domain) {
			const idx = this.filters.domains.indexOf(domain)
			if (idx >= 0) {
				this.filters.domains.splice(idx, 1)
			} else {
				this.filters.domains.push(domain)
			}
			// 筛选变化只保存到本地，不触发云端保存
			this.saveDraft(false)
		},
		
		// 仅看未完成开关
		onUnfinishedToggle(e) {
			this.filters.onlyUnfinished = e.detail.value
			// 筛选变化只保存到本地，不触发云端保存
			this.saveDraft(false)
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
				// 筛选变化只保存到本地，不触发云端保存
				this.saveDraft(false)
			}
			
			this.$forceUpdate()
		},
		
		// 全选本领域
		selectAllInDomain(domain) {
			const questions = this.getQuestionsInDomain(domain)
			// 批量更新答案，使用 $set 确保响应式
			questions.forEach(q => {
				this.$set(this.answers, q.id, 1)
			})
			// 更新版本号，强制 computed 重新计算
			this.answersVersion++
			this.saveDraft()
			// 强制更新视图，确保统计信息立即刷新
			this.$forceUpdate()
		},
		
		// 清空本领域
		clearDomain(domain) {
			const questions = this.getQuestionsInDomain(domain)
			// 批量更新答案，使用 $set 确保响应式
			questions.forEach(q => {
				this.$set(this.answers, q.id, 0)
			})
			// 更新版本号，强制 computed 重新计算
			this.answersVersion++
			this.saveDraft()
			// 强制更新视图，确保统计信息立即刷新
			this.$forceUpdate()
		},
		
		// 全选本子领域
		selectAllInSubdomain(domain, subdomain) {
			const questions = this.questionsByDomain[domain]?.[subdomain] || []
			// 批量更新答案，使用 $set 确保响应式
			questions.forEach(q => {
				this.$set(this.answers, q.id, 1)
			})
			// 更新版本号，强制 computed 重新计算
			this.answersVersion++
			this.saveDraft()
			// 强制更新视图，确保统计信息立即刷新
			this.$forceUpdate()
		},
		
		// 清空本子领域
		clearSubdomain(domain, subdomain) {
			const questions = this.questionsByDomain[domain]?.[subdomain] || []
			// 批量更新答案，使用 $set 确保响应式
			questions.forEach(q => {
				this.$set(this.answers, q.id, 0)
			})
			// 更新版本号，强制 computed 重新计算
			this.answersVersion++
			this.saveDraft()
			// 强制更新视图，确保统计信息立即刷新
			this.$forceUpdate()
		},
			
			// 提交评估
			async submitAssessment() {
			if (this.isSubmitting) return
				
				// 提交前重新加载儿童信息，确保获取最新数据
				this.loadChildInfo();
				
				let currentChildId = this.childInfo?.childId || this.childInfo?._id;
				
				console.log('[assessment] 提交前检查儿童信息:', {
					hasChildInfo: Object.keys(this.childInfo).length > 0,
					childId: currentChildId,
					childName: this.childInfo?.name,
					childInfoKeys: Object.keys(this.childInfo || {}),
					storageCheck: {
						legacy: !!uni.getStorageSync('childInfo'),
						legacyChildId: uni.getStorageSync('childInfo')?.childId || uni.getStorageSync('childInfo')?._id
					}
				});
				
				// 如果没有 childId，尝试多种方式获取
				if (!currentChildId) {
					console.warn('[assessment] 缺少 childId，尝试从多个位置查找');
					
					// 尝试1: 直接读取普通存储
					const directChildInfo = uni.getStorageSync('childInfo');
					const directChildId = directChildInfo?.childId || directChildInfo?._id;
					
					if (directChildId) {
						console.log('[assessment] 从普通存储找到 childId:', directChildId);
						this.childInfo = directChildInfo;
						currentChildId = directChildId;
					} else {
						// 尝试2: 搜索所有用户专属存储
						try {
							const authModule = require('@/common/auth.js');
							if (authModule && authModule.getCurrentUserId) {
								const userId = authModule.getCurrentUserId();
								if (userId) {
									const possibleKeys = [
										`childInfo_${userId}`,
										`childInfo_${userId}_`,
										`childInfo_user_${userId}`
									];
									for (const key of possibleKeys) {
										const data = uni.getStorageSync(key);
										if (data) {
											const id = data.childId || data._id;
											if (id) {
												console.log('[assessment] 从用户专属存储找到 childId:', id, 'key:', key);
												this.childInfo = data;
												currentChildId = id;
												break;
											}
										}
									}
								}
							}
						} catch (e) {
							console.warn('[assessment] 搜索用户专属存储失败:', e);
						}
					}
					
					// 如果仍然没有 childId，但数据存在，尝试重新保存获取 childId
					if (!currentChildId && this.childInfo && Object.keys(this.childInfo).length > 0) {
						// 检查是否有必要的字段（姓名、性别、出生日期等）
						const hasRequiredFields = this.childInfo.name && 
						                          this.childInfo.gender && 
						                          this.childInfo.birthDate;
						
						if (hasRequiredFields) {
							console.log('[assessment] 数据完整但缺少 childId，尝试重新保存获取 childId');
							uni.showLoading({ title: '正在保存儿童信息...', mask: true });
							
							try {
								// 准备数据（与 child-info.vue 中的格式一致）
								const clinical = this.childInfo.clinical || {};
								const diagnosis = clinical.medicalDiagnosis || [];
								const habits = {
									walkTime: clinical.walkingTime || '',
									crawl: clinical.crawlStatus || '',
									crawlMonths: clinical.crawlMonths || '',
									kneel: clinical.kneelWalk,
									hand: clinical.handedness || ''
								};
								
								const saveResult = await uniCloud.callFunction({
									name: 'saveChildProfile',
									data: {
										name: this.childInfo.name,
										gender: this.childInfo.gender,
										birthDate: this.childInfo.birthDate,
										diagnosis: diagnosis,
										habits: habits,
										vision: clinical.vision || { status: 'normal', sub: [] },
										hearing: clinical.hearing || { status: 'normal', dbLeft: '', dbRight: '' },
										epilepsy: clinical.epilepsy || 'none',
										caregiver: this.childInfo.caregiver || '',
										phone: this.childInfo.phone || '',
										homeGuide: clinical.homeGuide,
										notes: this.childInfo.notes || ''
									}
								});
								
								uni.hideLoading();
								
								// 尝试从返回结果中提取 childId
								const result = saveResult.result || {};
								const newChildId = result.data?.id || 
								                  result.data?._id || 
								                  result.id || 
								                  result.childId;
								
								if (newChildId) {
									console.log('[assessment] 重新保存成功，获取到 childId:', newChildId);
									// 更新 childInfo
									this.childInfo.childId = newChildId;
									currentChildId = newChildId;
									
									// 保存更新后的 childInfo
									try {
										const authModule = require('@/common/auth.js');
										if (authModule && authModule.getUserStorageKey) {
											const userKey = authModule.getUserStorageKey('childInfo');
											uni.setStorageSync(userKey, this.childInfo);
										}
										uni.setStorageSync('childInfo', this.childInfo);
									} catch (e) {
										console.warn('[assessment] 保存更新后的 childInfo 失败:', e);
									}
								} else {
									console.error('[assessment] 重新保存失败，未获取到 childId');
									uni.showModal({
										title: '保存失败',
										content: '无法保存儿童信息，请返回重新填写儿童信息。',
										confirmText: '返回填写',
										cancelText: '取消',
										success: (res) => {
											if (res.confirm) {
												uni.navigateTo({
													url: '/pages/child-info/child-info'
												});
											}
										}
									});
									return;
								}
							} catch (error) {
								uni.hideLoading();
								console.error('[assessment] 重新保存儿童信息异常:', error);
								uni.showModal({
									title: '保存失败',
									content: '无法保存儿童信息：' + (error.message || '网络错误') + '。请返回重新填写儿童信息。',
									confirmText: '返回填写',
									cancelText: '取消',
									success: (res) => {
										if (res.confirm) {
											uni.navigateTo({
												url: '/pages/child-info/child-info'
											});
										}
									}
								});
								return;
							}
						} else {
							// 数据不完整，提示用户返回填写
							uni.showModal({
								title: '缺少儿童信息',
								content: '儿童信息不完整，请返回重新填写完整的儿童信息。',
								confirmText: '返回填写',
								cancelText: '取消',
								success: (res) => {
									if (res.confirm) {
										uni.navigateTo({
											url: '/pages/child-info/child-info'
										});
									}
								}
							});
							return;
						}
					} else if (!currentChildId) {
						// 确实没有数据，提示用户
						uni.showModal({
							title: '缺少儿童信息',
							content: '未找到儿童信息，请先填写儿童信息。',
							confirmText: '去填写',
							cancelText: '取消',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/child-info/child-info'
									});
								}
							}
						});
						return;
					}
				}
				
				// 确保使用最新的 childId
				const finalChildId = this.childInfo?.childId || this.childInfo?._id || currentChildId;
				if (!finalChildId) {
					console.error('[assessment] 最终仍然没有 childId');
					uni.showToast({
						title: '缺少儿童信息，无法提交',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				
				this.isSubmitting = true
				uni.showLoading({ title: '提交中...', mask: true })
				
				try {
					// 清理答案数据：只保留值为 0 或 1 的答案
					const cleanAnswers = {};
					let invalidCount = 0;
					Object.keys(this.answers).forEach(qid => {
						const value = this.answers[qid];
						// 确保答案为数字 0 或 1
						if (value === 0 || value === 1 || value === '0' || value === '1') {
							cleanAnswers[qid] = value === '0' ? 0 : (value === '1' ? 1 : value);
						} else {
							invalidCount++;
							console.warn(`[assessment] 跳过无效答案: qid=${qid}, value=${value} (类型: ${typeof value})`);
						}
					});
					
					if (invalidCount > 0) {
						console.warn(`[assessment] 清理了 ${invalidCount} 个无效答案`);
					}
					
					console.log('[assessment] 提交答案统计:', {
						总数: Object.keys(this.answers).length,
						有效答案: Object.keys(cleanAnswers).length,
						无效答案: invalidCount
					});
					
					// 检查是否有有效答案
					if (Object.keys(cleanAnswers).length === 0) {
						uni.hideLoading();
						uni.showModal({
							title: '提交失败',
							content: '没有有效的答案数据，请至少完成一道题目后再提交。',
							showCancel: false,
							confirmText: '确定'
						});
						this.isSubmitting = false;
						return;
					}
					
					// 调用云函数提交到数据库（使用最终确定的 childId）
					const submitResult = await uniCloud.callFunction({
						name: 'submitAssessment',
						data: {
							childId: finalChildId,
							answers: cleanAnswers
						}
					})
					
					uni.hideLoading()
					
					// 检查返回结果
					if (!submitResult || !submitResult.result) {
						console.error('[assessment] 提交返回结果异常:', submitResult);
						uni.showToast({
							title: '提交失败：服务器返回异常',
							icon: 'none',
							duration: 3000
						});
						this.isSubmitting = false;
						return;
					}
					
					if (!submitResult.result.ok) {
						const errorMsg = submitResult.result?.msg || '提交失败，请重试';
						const errorCode = submitResult.result?.code;
						
						console.error('[assessment] 提交失败:', {
							code: errorCode,
							msg: errorMsg,
							result: submitResult.result
						});
						
						// 根据错误码显示不同的提示
						let userMsg = errorMsg;
						if (errorCode === 404) {
							userMsg = '未找到对应的题目数据，可能是题目数据未初始化。请联系管理员。';
						} else if (errorCode === 500) {
							userMsg = '服务器错误：' + errorMsg;
						}
						
						uni.showModal({
							title: '提交失败',
							content: userMsg,
							showCancel: false,
							confirmText: '确定'
						});
						this.isSubmitting = false;
						return;
					}
					
					// 生成评估结果（包含云端返回的数据）
					const assessmentResult = {
						childInfo: this.childInfo,
						answers: this.answers,
						formState: this.formatFormState(),
						checkedCount: this.derivedStats.global.selected,
						totalCount: this.derivedStats.global.total,
						progressPercent: this.derivedStats.global.ratio,
						assessmentDate: new Date().toISOString(),
						assessmentId: submitResult.result.assessmentId,
						scorePercent: submitResult.result.scorePercent,
						level: submitResult.result.level
					}
					
					// 保存评估结果到本地
					uni.setStorageSync('assessmentResult', assessmentResult)
					
					// 清除草稿
					uni.removeStorageSync('assessmentDraft')
					
					uni.showToast({
						title: '提交成功',
						icon: 'success',
						duration: 1000
					})
					
					// 延迟跳转
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/result/result'
						})
					}, 1000)
				} catch (error) {
					uni.hideLoading()
					console.error('[submitAssessment] 提交异常:', error)
					uni.showToast({
						title: '提交失败：' + (error.message || '网络错误'),
						icon: 'none',
						duration: 2000
					})
					this.isSubmitting = false
				}
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
		background: #F8F9FA;
		padding-bottom: 180rpx;
		position: relative;
		overflow: hidden;
	}
	
	/* 移除背景图装饰，微信小程序不支持 WXSS 中使用本地图片 */

/* 顶部工具条（吸顶） */
.top-bar {
	position: sticky;
	top: 0;
	z-index: 100;
	background: #FFFFFF;
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
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
	background: #E93A8A;
	color: #FFFFFF;
	border-color: #E93A8A;
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
}

.domain-section {
		margin-bottom: 30rpx;
	}
	
.domain-header {
	background: linear-gradient(135deg, #E93A8A, #009FC2);
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
	background: linear-gradient(90deg, #E93A8A, #009FC2);
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
		background: linear-gradient(135deg, #E93A8A, #009FC2);
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
