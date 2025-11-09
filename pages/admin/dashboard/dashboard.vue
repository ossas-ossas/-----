<template>
	<view class="admin-dashboard">
		<!-- 权限检查 -->
		<view v-if="!isAdmin" class="no-permission">
			<view class="permission-card">
				<text class="permission-title">权限不足</text>
				<text class="permission-desc">您没有管理员权限，无法访问此页面</text>
				<button class="permission-btn" @click="goBack">返回</button>
			</view>
		</view>

		<!-- 管理员面板 -->
		<view v-else class="dashboard-content">
			<!-- 顶部统计卡片 -->
			<view class="stats-cards">
				<view class="stat-card">
					<text class="stat-value">{{ profilesCount }}</text>
					<text class="stat-label">儿童档案</text>
				</view>
				<view class="stat-card">
					<text class="stat-value">{{ assessmentsCount }}</text>
					<text class="stat-label">评估记录</text>
				</view>
				<view class="stat-card">
					<text class="stat-value">{{ overallRatio }}%</text>
					<text class="stat-label">总体完成率</text>
				</view>
			</view>

			<!-- 数据加载状态 -->
			<view v-if="loading" class="loading-container">
				<uni-load-more status="loading" :content-text="loadingText"></uni-load-more>
			</view>

			<!-- 标签页 -->
			<view v-else class="tabs-container">
				<view class="tabs">
					<view 
						class="tab-item" 
						:class="{ active: activeTab === 'profiles' }"
						@click="activeTab = 'profiles'"
					>
						<text>儿童档案</text>
					</view>
					<view 
						class="tab-item" 
						:class="{ active: activeTab === 'assessments' }"
						@click="activeTab = 'assessments'"
					>
						<text>评估记录</text>
					</view>
					<view 
						class="tab-item" 
						:class="{ active: activeTab === 'stats' }"
						@click="activeTab = 'stats'"
					>
						<text>统计分析</text>
					</view>
				</view>

				<!-- 儿童档案列表 -->
				<view v-if="activeTab === 'profiles'" class="tab-content">
					<view class="list-header">
						<text class="header-title">儿童档案列表 ({{ profilesCount }})</text>
						<text class="refresh-btn" @click="loadData">刷新</text>
					</view>
					<view class="profile-list">
						<view 
							v-for="(profile, index) in profiles" 
							:key="profile._id || index"
							class="profile-item"
						>
							<view class="profile-header">
								<text class="profile-name">{{ profile.name }}</text>
								<text class="profile-gender">{{ profile.gender === 'male' ? '男' : '女' }}</text>
							</view>
							<view class="profile-info">
								<text class="info-item">出生日期：{{ formatDate(profile.birthDate) }}</text>
								<text class="info-item">创建时间：{{ formatTime(profile.createdAt) }}</text>
							</view>
							<view v-if="profile.diagnosis && profile.diagnosis.length > 0" class="profile-diagnosis">
								<text class="diagnosis-label">诊断：</text>
								<text 
									v-for="(diag, idx) in profile.diagnosis" 
									:key="idx"
									class="diagnosis-tag"
								>
									{{ getDiagnosisLabel(diag) }}
								</text>
							</view>
						</view>
						<view v-if="profiles.length === 0" class="empty-state">
							<text>暂无儿童档案</text>
						</view>
					</view>
				</view>

				<!-- 评估记录列表 -->
				<view v-if="activeTab === 'assessments'" class="tab-content">
					<view class="list-header">
						<text class="header-title">评估记录列表 ({{ assessmentsCount }})</text>
						<text class="refresh-btn" @click="loadData">刷新</text>
					</view>
					<view class="assessment-list">
						<view 
							v-for="(assessment, index) in assessments" 
							:key="assessment._id || index"
							class="assessment-item"
						>
							<view class="assessment-header">
								<text class="assessment-id">评估ID: {{ assessment._id ? assessment._id.substring(0, 8) : 'N/A' }}...</text>
								<text class="assessment-time">{{ formatTime(assessment.createdAt) }}</text>
							</view>
							<view v-if="assessment.stats && assessment.stats.overall" class="assessment-stats">
								<text class="stats-text">
									完成率: {{ formatRatio(assessment.stats.overall.ratio) }}% 
									({{ assessment.stats.overall.passed }}/{{ assessment.stats.overall.total }})
								</text>
							</view>
						</view>
						<view v-if="assessments.length === 0" class="empty-state">
							<text>暂无评估记录</text>
						</view>
					</view>
				</view>

				<!-- 统计分析 -->
				<view v-if="activeTab === 'stats'" class="tab-content">
					<view class="list-header">
						<text class="header-title">统计分析</text>
						<text class="refresh-btn" @click="loadData">刷新</text>
					</view>

					<!-- Age Bands 统计 -->
					<view class="stats-section">
						<text class="section-title">年龄段统计</text>
						<view class="stats-list">
							<view 
								v-for="(stats, ageBand) in ageBandsStats" 
								:key="ageBand"
								class="stats-item"
							>
								<view class="stats-header">
									<text class="stats-name">{{ getAgeBandLabel(ageBand) }}</text>
									<text class="stats-ratio">{{ formatRatio(stats.ratio) }}%</text>
								</view>
								<view class="stats-bar">
									<view 
										class="stats-bar-fill" 
										:style="{ width: getRatioPercent(stats.ratio) + '%' }"
									></view>
								</view>
								<view class="stats-detail">
									<text>通过: {{ stats.passed }} / 总数: {{ stats.total }} ({{ stats.count }}次评估)</text>
								</view>
							</view>
						</view>
					</view>

					<!-- Domains 统计 -->
					<view class="stats-section">
						<text class="section-title">领域统计</text>
						<view class="stats-list">
							<view 
								v-for="(stats, domain) in domainsStats" 
								:key="domain"
								class="stats-item"
							>
								<view class="stats-header">
									<text class="stats-name">{{ getDomainLabel(domain) }}</text>
									<text class="stats-ratio">{{ formatRatio(stats.ratio) }}%</text>
								</view>
								<view class="stats-bar">
									<view 
										class="stats-bar-fill" 
										:style="{ width: getRatioPercent(stats.ratio) + '%' }"
									></view>
								</view>
								<view class="stats-detail">
									<text>通过: {{ stats.passed }} / 总数: {{ stats.total }} ({{ stats.count }}次评估)</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// 标签映射函数
const getDiagnosisLabel = (diag) => {
	const map = {
		'cerebralPalsy': '脑瘫',
		'devDelay': '发育迟缓',
		'autism': '孤独症',
		'rare': '罕见疾病'
	};
	return map[diag] || diag;
};

const getAgeBandLabel = (ageBand) => {
	const map = {
		'1_3m': '1-3个月',
		'3_6m': '3-6个月',
		'6_9m': '6-9个月',
		'9_12m': '9-12个月',
		'12_18m': '12-18个月',
		'18_24m': '18-24个月',
		'24_30m': '24-30个月',
		'30_36m': '30-36个月',
		'36_48m': '36-48个月',
		'48_60m': '48-60个月',
		'60_72m': '60-72个月'
	};
	return map[ageBand] || ageBand;
};

const getDomainLabel = (domain) => {
	const map = {
		// 子领域映射
		'OSV': '视知觉',
		'OSH': '听知觉',
		'OST': '触知觉',
		'ISP': '本体运动知觉',
		'ISV': '前庭平衡知觉',
		'GM': '躯肢体粗大动作',
		'UEM': '双上肢粗大动作（视动协调）',
		'UES': '双上肢粗大动作（操作技能）',
		'FM': '精细动作',
		'OM': '口腔动作',
		'SIP': '社会互动（与人互动）',
		'SIE': '社会互动（与其他互动）',
		'SIS': '社会互动（情绪与自我）',
		'MAN': '认知（注意-非动作）',
		'MRN': '认知（记忆-非动作）',
		'MCN': '认知（概念-非动作）',
		'MIN': '认知（推理-非动作）',
		'MAY': '认知（注意-动作）',
		'MRY': '认知（记忆-动作）',
		'MCY': '认知（概念-动作）',
		'MIY': '认知（推理-动作）',
		'MLUY': '语言（口语理解）',
		'MLUN': '语言（非语言理解）',
		'MLEY': '语言（口语表达）',
		'MLEN': '语言（非语言表达）',
		// 领域映射（如果使用领域而非子领域）
		'gross': '粗大动作',
		'fine': '精细动作',
		'cog': '认知',
		'lang': '语言',
		'sens': '感知觉',
		'oral': '口腔动作',
		'social': '社会互动'
	};
	return map[domain] || domain;
};

export default {
	data() {
		return {
			isAdmin: false,
			loading: true,
			loadingText: {
				contentdown: '加载中...',
				contentrefresh: '加载中...',
				contentnomore: '没有更多数据了'
			},
			activeTab: 'profiles',
			profiles: [],
			assessments: [],
			profilesCount: 0,
			assessmentsCount: 0,
			ageBandsStats: {},
			domainsStats: {},
			overallRatio: 0
		}
	},
	onLoad() {
		this.checkAdminPermission();
	},
	onPullDownRefresh() {
		this.loadData().finally(() => {
			uni.stopPullDownRefresh();
		});
	},
	methods: {
		// 检查管理员权限
		async checkAdminPermission() {
			try {
				// 获取当前用户信息
				const userInfo = uniCloud.getCurrentUserInfo && uniCloud.getCurrentUserInfo();
				if (!userInfo || !userInfo.uid) {
					this.isAdmin = false;
					this.loading = false;
					return;
				}

				// 检查角色（uni-id-pages 的方式）
				const token = uni.getStorageSync('uni_id_token') || '';
				if (token) {
					const tokenArr = token.split('.');
					if (tokenArr.length === 3) {
						try {
							const payload = JSON.parse(decodeURIComponent(escape(atob(tokenArr[1]))));
							const role = payload.role || [];
							// 检查是否是管理员（role 是数组，包含 'admin'）
							this.isAdmin = Array.isArray(role) ? role.includes('admin') : role === 'admin';
						} catch (e) {
							console.warn('解析 token 失败:', e);
							this.isAdmin = false;
						}
					}
				}

				if (this.isAdmin) {
					await this.loadData();
				} else {
					this.loading = false;
				}
			} catch (error) {
				console.error('检查权限失败:', error);
				this.isAdmin = false;
				this.loading = false;
			}
		},

		// 加载数据
		async loadData() {
			if (!this.isAdmin) return;

			this.loading = true;
			try {
				// 获取 token 并传递给云函数
				const token = uni.getStorageSync('uni_id_token') || '';
				console.log('[dashboard] 调用云函数，token 存在:', !!token);
				
				const res = await uniCloud.callFunction({
					name: 'getAdminData',
					data: {
						type: 'all',
						uniIdToken: token  // 手动传递 token
						// 临时调试：如果需要，可以添加 _bypassAuth: true 来跳过权限检查（仅用于调试）
						// _bypassAuth: true
					}
				});

				console.log('[dashboard] 云函数返回结果:', res);
				
				if (res.result && res.result.code === 0) {
					const data = res.result.data;
					console.log('[dashboard] 获取到的数据:', {
						profilesCount: data.profilesCount,
						assessmentsCount: data.assessmentsCount,
						hasStats: !!data.stats
					});
					
					this.profiles = data.profiles || [];
					this.assessments = data.assessments || [];
					this.profilesCount = data.profilesCount || 0;
					this.assessmentsCount = data.assessmentsCount || 0;
					
					if (data.stats) {
						this.ageBandsStats = data.stats.ageBands || {};
						this.domainsStats = data.stats.domains || {};
						this.overallRatio = (data.stats && data.stats.overall && data.stats.overall.ratio ? (data.stats.overall.ratio * 100) : 0).toFixed(1);
					}
				} else {
					const errorMsg = res.result?.msg || res.errMsg || '获取数据失败';
					const debugInfo = res.result?.debug;
					console.error('[dashboard] 云函数返回错误:', res.result);
					
					// 显示详细的错误信息（包括调试信息）
					let fullErrorMsg = errorMsg;
					if (res.result?.code === 403 && debugInfo) {
						fullErrorMsg += `\n\n调试信息:\n角色: ${debugInfo.role}\nUID: ${debugInfo.uid || '未获取'}\ncontext.auth: ${JSON.stringify(debugInfo.contextAuth || {})}`;
					}
					
					uni.showModal({
						title: '获取数据失败',
						content: fullErrorMsg + (res.result?.code ? ` (错误码: ${res.result.code})` : ''),
						showCancel: false,
						confirmText: '我知道了'
					});
				}
			} catch (error) {
				console.error('加载数据失败:', error);
				const errorMsg = error.message || error.errMsg || '加载数据失败';
				console.error('[dashboard] 详细错误信息:', {
					error,
					result: error.result,
					code: error.code
				});
				uni.showModal({
					title: '加载失败',
					content: errorMsg + (error.code ? ` (错误码: ${error.code})` : ''),
					showCancel: false
				});
			} finally {
				this.loading = false;
			}
		},

		// 格式化日期
		formatDate(dateStr) {
			if (!dateStr) return '-';
			return dateStr;
		},

		// 格式化时间戳
		formatTime(timestamp) {
			if (!timestamp) return '-';
			const date = new Date(timestamp);
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
		},

		// 格式化比例（转换为百分比并保留1位小数，返回字符串）
		formatRatio(ratio) {
			if (ratio === undefined || ratio === null) return '0.0';
			return (ratio * 100).toFixed(1);
		},

		// 获取百分比数值（用于样式绑定）
		getRatioPercent(ratio) {
			if (ratio === undefined || ratio === null) return 0;
			return ratio * 100;
		},

		// 获取诊断标签
		getDiagnosisLabel(diag) {
			return getDiagnosisLabel(diag);
		},

		// 获取年龄段标签
		getAgeBandLabel(ageBand) {
			return getAgeBandLabel(ageBand);
		},

		// 获取领域标签
		getDomainLabel(domain) {
			return getDomainLabel(domain);
		},

		// 返回
		goBack() {
			uni.navigateBack();
		}
	}
}
</script>

<style scoped>
.admin-dashboard {
	min-height: 100vh;
	background: #F8F9FA;
	padding: 20rpx;
}

/* 权限不足提示 */
.no-permission {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 80vh;
}

.permission-card {
	background: #fff;
	border-radius: 20rpx;
	padding: 60rpx 40rpx;
	text-align: center;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.permission-title {
	display: block;
	font-size: 36rpx;
	font-weight: bold;
	color: #E93A8A;
	margin-bottom: 20rpx;
}

.permission-desc {
	display: block;
	font-size: 28rpx;
	color: #7F8C8D;
	margin-bottom: 40rpx;
}

.permission-btn {
	background: #E93A8A;
	color: #fff;
	border-radius: 10rpx;
	padding: 20rpx 60rpx;
}

/* 统计卡片 */
.stats-cards {
	display: flex;
	gap: 20rpx;
	margin-bottom: 30rpx;
}

.stat-card {
	flex: 1;
	background: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	text-align: center;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.stat-value {
	display: block;
	font-size: 48rpx;
	font-weight: bold;
	color: #E93A8A;
	margin-bottom: 10rpx;
}

.stat-label {
	display: block;
	font-size: 24rpx;
	color: #7F8C8D;
}

/* 加载状态 */
.loading-container {
	padding: 100rpx 0;
}

/* 标签页 */
.tabs-container {
	background: #fff;
	border-radius: 20rpx;
	overflow: hidden;
}

.tabs {
	display: flex;
	background: #F5F8FF;
	border-bottom: 2rpx solid #E8F4FD;
}

.tab-item {
	flex: 1;
	padding: 30rpx 0;
	text-align: center;
	font-size: 28rpx;
	color: #7F8C8D;
	position: relative;
}

.tab-item.active {
	color: #E93A8A;
	font-weight: bold;
}

.tab-item.active::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 60rpx;
	height: 4rpx;
	background: #E93A8A;
	border-radius: 2rpx;
}

.tab-content {
	padding: 30rpx;
}

/* 列表头部 */
.list-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30rpx;
}

.header-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.refresh-btn {
	font-size: 24rpx;
	color: #E93A8A;
	padding: 10rpx 20rpx;
}

/* 档案列表 */
.profile-list, .assessment-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.profile-item, .assessment-item {
	background: #F8F9FA;
	border-radius: 15rpx;
	padding: 30rpx;
	border-left: 6rpx solid #E93A8A;
}

.profile-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15rpx;
}

.profile-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.profile-gender {
	font-size: 24rpx;
	color: #7F8C8D;
	background: #E8F4FD;
	padding: 5rpx 15rpx;
	border-radius: 10rpx;
}

.profile-info {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	margin-bottom: 15rpx;
}

.info-item {
	font-size: 24rpx;
	color: #7F8C8D;
}

.profile-diagnosis {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
	align-items: center;
}

.diagnosis-label {
	font-size: 24rpx;
	color: #7F8C8D;
}

.diagnosis-tag {
	font-size: 22rpx;
	color: #E93A8A;
	background: #FFF0F5;
	padding: 5rpx 15rpx;
	border-radius: 10rpx;
}

.assessment-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15rpx;
}

.assessment-id {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
}

.assessment-time {
	font-size: 24rpx;
	color: #7F8C8D;
}

.assessment-stats {
	margin-top: 10rpx;
}

.stats-text {
	font-size: 24rpx;
	color: #7F8C8D;
}

/* 统计分析 */
.stats-section {
	margin-bottom: 40rpx;
}

.section-title {
	display: block;
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 30rpx;
}

.stats-list {
	display: flex;
	flex-direction: column;
	gap: 25rpx;
}

.stats-item {
	background: #F8F9FA;
	border-radius: 15rpx;
	padding: 25rpx;
}

.stats-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15rpx;
}

.stats-name {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
}

.stats-ratio {
	font-size: 28rpx;
	font-weight: bold;
	color: #E93A8A;
}

.stats-bar {
	width: 100%;
	height: 12rpx;
	background: #E8F4FD;
	border-radius: 6rpx;
	overflow: hidden;
	margin-bottom: 15rpx;
}

.stats-bar-fill {
	height: 100%;
	background: linear-gradient(90deg, #E93A8A, #FF6BA8);
	border-radius: 6rpx;
	transition: width 0.3s;
}

.stats-detail {
	font-size: 24rpx;
	color: #7F8C8D;
}

/* 空状态 */
.empty-state {
	text-align: center;
	padding: 100rpx 0;
	color: #7F8C8D;
	font-size: 28rpx;
}
</style>

