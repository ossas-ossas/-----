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
			<!-- 顶部标题栏 -->
			<view class="dashboard-header">
				<text class="dashboard-title">管理员面板</text>
				<view class="header-actions">
					<text class="action-btn" @click="goToInitQuestions">初始化题目</text>
					<text class="action-btn" @click="logout">退出登录</text>
				</view>
			</view>
			
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
						:key="profile._id ? profile._id : 'profile_' + index"
						class="profile-item"
					>
							<!-- 基本信息卡片 -->
							<view class="profile-section">
								<view class="section-header">
									<text class="section-title">基本信息</text>
								</view>
								<view class="profile-basic-info">
									<view class="info-row">
										<text class="info-label">姓名：</text>
										<text class="info-value">{{ profile.name || '-' }}</text>
									</view>
									<view class="info-row">
										<text class="info-label">性别：</text>
										<text class="info-value">{{ profile.gender === 'male' ? '男' : (profile.gender === 'female' ? '女' : '-') }}</text>
									</view>
									<view class="info-row">
										<text class="info-label">出生日期：</text>
										<text class="info-value">{{ formatDate(profile.birthDate) }}</text>
									</view>
									<view class="info-row">
										<text class="info-label">档案ID：</text>
										<text class="info-value info-id">{{ profile._id ? profile._id.substring(0, 12) + '...' : '-' }}</text>
									</view>
								</view>
							</view>

							<!-- 医疗诊断 -->
							<view v-if="profile.diagnosis && profile.diagnosis.length > 0" class="profile-section">
								<view class="section-header">
									<text class="section-title">医疗诊断</text>
								</view>
								<view class="diagnosis-tags">
									<text 
										v-for="(diag, idx) in profile.diagnosis" 
										:key="idx"
										class="diagnosis-tag"
									>
										{{ getDiagnosisLabel(diag) }}
									</text>
								</view>
							</view>

							<!-- 行为习惯 -->
							<view v-if="profile.habits" class="profile-section">
								<view class="section-header">
									<text class="section-title">行为习惯</text>
								</view>
								<view class="profile-detail-info">
									<view v-if="profile.habits.walkTime" class="info-row">
										<text class="info-label">行走时间：</text>
										<text class="info-value">{{ getWalkTimeLabel(profile.habits.walkTime) }}</text>
									</view>
									<view v-if="profile.habits.crawl" class="info-row">
										<text class="info-label">爬行情况：</text>
										<text class="info-value">{{ getCrawlLabel(profile.habits.crawl, profile.habits.crawlMonths) }}</text>
									</view>
									<view v-if="profile.habits.kneel !== undefined && profile.habits.kneel !== null" class="info-row">
										<text class="info-label">跪走：</text>
										<text class="info-value">{{ profile.habits.kneel ? '会' : '不会' }}</text>
									</view>
									<view v-if="profile.habits.hand" class="info-row">
										<text class="info-label">惯用手：</text>
										<text class="info-value">{{ profile.habits.hand === 'left' ? '左手' : (profile.habits.hand === 'right' ? '右手' : '-') }}</text>
									</view>
								</view>
							</view>

							<!-- 视觉障碍 -->
							<view v-if="profile.vision" class="profile-section">
								<view class="section-header">
									<text class="section-title">视觉障碍</text>
								</view>
								<view class="profile-detail-info">
									<view v-if="profile.vision.status" class="info-row">
										<text class="info-label">视觉状态：</text>
										<text class="info-value">{{ getVisionStatusLabel(profile.vision.status) }}</text>
									</view>
									<view v-if="profile.vision.sub && profile.vision.sub.length > 0" class="info-row">
										<text class="info-label">视觉子项：</text>
										<text class="info-value">{{ profile.vision.sub.map(s => getVisionSubLabel(s)).join('、') }}</text>
									</view>
								</view>
							</view>

							<!-- 听觉障碍 -->
							<view v-if="profile.hearing" class="profile-section">
								<view class="section-header">
									<text class="section-title">听觉障碍</text>
								</view>
								<view class="profile-detail-info">
									<view v-if="profile.hearing.status" class="info-row">
										<text class="info-label">听觉状态：</text>
										<text class="info-value">{{ profile.hearing.status === 'normal' ? '正常' : '听障' }}</text>
									</view>
									<view v-if="profile.hearing.status === 'impaired' && (profile.hearing.dbLeft || profile.hearing.dbRight)" class="info-row">
										<text class="info-label">听力分贝：</text>
										<text class="info-value">
											左耳：{{ profile.hearing.dbLeft || '-' }}dB / 
											右耳：{{ profile.hearing.dbRight || '-' }}dB
										</text>
									</view>
								</view>
							</view>

							<!-- 癫痫症 -->
							<view v-if="profile.epilepsy" class="profile-section">
								<view class="section-header">
									<text class="section-title">癫痫症</text>
								</view>
								<view class="profile-detail-info">
									<view class="info-row">
										<text class="info-label">状态：</text>
										<text class="info-value">{{ getEpilepsyLabel(profile.epilepsy) }}</text>
									</view>
								</view>
							</view>

							<!-- 联系信息 -->
							<view class="profile-section">
								<view class="section-header">
									<text class="section-title">联系信息</text>
								</view>
								<view class="profile-detail-info">
									<view v-if="profile.caregiver" class="info-row">
										<text class="info-label">主要照顾者：</text>
										<text class="info-value">{{ getCaregiverLabel(profile.caregiver) }}</text>
									</view>
									<view v-if="profile.phone" class="info-row">
										<text class="info-label">联系电话：</text>
										<text class="info-value info-phone">{{ profile.phone }}</text>
									</view>
									<view v-if="profile.homeGuide !== undefined && profile.homeGuide !== null" class="info-row">
										<text class="info-label">居家辅导需求：</text>
										<text class="info-value">{{ profile.homeGuide ? '是' : '否' }}</text>
									</view>
								</view>
							</view>

							<!-- 备注信息 -->
							<view v-if="profile.notes" class="profile-section">
								<view class="section-header">
									<text class="section-title">备注信息</text>
								</view>
								<view class="profile-notes">
									<text class="notes-text">{{ profile.notes }}</text>
								</view>
							</view>

							<!-- 时间信息 -->
							<view class="profile-section profile-meta">
								<view class="info-row">
									<text class="info-label">创建时间：</text>
									<text class="info-value">{{ formatTime(profile.createdAt) }}</text>
								</view>
								<view v-if="profile.updatedAt && profile.updatedAt !== profile.createdAt" class="info-row">
									<text class="info-label">更新时间：</text>
									<text class="info-value">{{ formatTime(profile.updatedAt) }}</text>
								</view>
								<view v-if="profile.ownerUid" class="info-row">
									<text class="info-label">家长UID：</text>
									<text class="info-value info-id">{{ profile.ownerUid.substring(0, 12) }}...</text>
								</view>
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
						<view class="header-actions">
							<text class="view-toggle-btn" :class="{ active: assessmentViewMode === 'chart' }" @click="assessmentViewMode = 'chart'">图表</text>
							<text class="view-toggle-btn" :class="{ active: assessmentViewMode === 'table' }" @click="assessmentViewMode = 'table'">表格</text>
							<text class="refresh-btn" @click="loadData">刷新</text>
						</view>
					</view>
				<view class="assessment-list">
					<view 
						v-for="(assessment, index) in assessments" 
						:key="assessment._id ? assessment._id : 'assessment_' + index"
						class="assessment-item"
					>
							<!-- 评估基本信息 -->
							<view class="assessment-header">
								<text class="assessment-child-name">{{ assessment.childName || '未知儿童' }}</text>
								<text class="assessment-time">{{ formatTime(assessment.createdAt) }}</text>
							</view>
							<view v-if="assessment.stats && assessment.stats.overall" class="assessment-stats">
								<text class="stats-text">
									总体完成率: {{ formatRatio(assessment.stats.overall.ratio) }}% 
									({{ assessment.stats.overall.passed }}/{{ assessment.stats.overall.total }})
								</text>
							</view>

							<!-- 表格视图 -->
							<view v-if="assessmentViewMode === 'table' && assessment.stats && assessment.stats.subdomains" class="assessment-table-view">
								<view class="table-container">
									<view class="table-title">综合能力检测分析图（细项分析）</view>
									<scroll-view scroll-x="true" class="table-scroll">
										<view class="data-table-flex">
											<!-- 表头容器 -->
											<view class="table-header-container">
												<!-- 固定列：发育时间（跨两行） -->
												<view class="header-fixed-column">
													<view class="header-cell-rowspan">发育时间</view>
												</view>
												
												<!-- 右侧表头内容 -->
												<view class="header-content-column">
													<!-- 表头：第一行 - 大领域 -->
													<view class="header-domains-row">
														<!-- 五大感知觉发展 -->
														<view 
															v-if="getSubdomainCount(assessment.stats.subdomains, 'sens') > 0"
															class="domain-header" 
															:style="{ width: (getSubdomainCount(assessment.stats.subdomains, 'sens') * 100) + 'rpx' }"
														>
															五大感知觉发展
														</view>
														<!-- 动作 -->
														<view 
															v-if="getActionSubdomainCount(assessment.stats.subdomains) > 0"
															class="domain-header" 
															:style="{ width: (getActionSubdomainCount(assessment.stats.subdomains) * 100) + 'rpx' }"
														>
															动作
														</view>
														<!-- 社会互动 -->
														<view 
															v-if="getSubdomainCount(assessment.stats.subdomains, 'social') > 0"
															class="domain-header" 
															:style="{ width: (getSubdomainCount(assessment.stats.subdomains, 'social') * 100) + 'rpx' }"
														>
															社会互动
														</view>
														<!-- 认知 -->
														<view 
															v-if="getSubdomainCount(assessment.stats.subdomains, 'cog') > 0"
															class="domain-header" 
															:style="{ width: (getSubdomainCount(assessment.stats.subdomains, 'cog') * 100) + 'rpx' }"
														>
															认知
														</view>
														<!-- 语言 -->
														<view 
															v-if="getSubdomainCount(assessment.stats.subdomains, 'lang') > 0"
															class="domain-header" 
															:style="{ width: (getSubdomainCount(assessment.stats.subdomains, 'lang') * 100) + 'rpx' }"
														>
															语言
														</view>
														<!-- 口腔动作 -->
														<view 
															v-if="getSubdomainCount(assessment.stats.subdomains, 'oral') > 0"
															class="domain-header" 
															:style="{ width: (getSubdomainCount(assessment.stats.subdomains, 'oral') * 100) + 'rpx' }"
														>
															口腔动作
														</view>
													</view>
													
													<!-- 表头：第二行 - 子领域 -->
													<view class="header-subdomains-row">
														<view class="header-subdomains-container">
													<!-- 感知觉子领域 -->
													<view 
														v-for="subdomain in getSubdomainsByDomainOrdered(assessment.stats.subdomains, 'sens')" 
														:key="subdomain.key"
														class="subdomain-header"
													>
														{{ getSubdomainLabel(subdomain.subdomain) }}
													</view>
													<!-- 动作子领域 -->
													<view 
														v-for="subdomain in getActionSubdomainsOrdered(assessment.stats.subdomains)" 
														:key="subdomain.key"
														class="subdomain-header"
													>
														{{ getSubdomainLabel(subdomain.subdomain) }}
													</view>
													<!-- 社会互动子领域 -->
													<view 
														v-for="subdomain in getSubdomainsByDomainOrdered(assessment.stats.subdomains, 'social')" 
														:key="subdomain.key"
														class="subdomain-header"
													>
														{{ getSubdomainLabel(subdomain.subdomain) }}
													</view>
													<!-- 认知子领域 -->
													<view 
														v-for="subdomain in getSubdomainsByDomainOrdered(assessment.stats.subdomains, 'cog')" 
														:key="subdomain.key"
														class="subdomain-header"
													>
														{{ getSubdomainLabel(subdomain.subdomain) }}
													</view>
													<!-- 语言子领域 -->
													<view 
														v-for="subdomain in getSubdomainsByDomainOrdered(assessment.stats.subdomains, 'lang')" 
														:key="subdomain.key"
														class="subdomain-header"
													>
														{{ getSubdomainLabel(subdomain.subdomain) }}
													</view>
													<!-- 口腔动作子领域 -->
													<view 
														v-for="subdomain in getSubdomainsByDomainOrdered(assessment.stats.subdomains, 'oral')" 
														:key="subdomain.key"
														class="subdomain-header"
													>
														{{ getSubdomainLabel(subdomain.subdomain) }}
													</view>
														</view>
													</view>
												</view>
											</view>
											
											<!-- 数据行：按年龄段显示子领域统计 -->
											<view 
												v-for="ageBand in getAllAgeBands()" 
												:key="ageBand"
												class="table-data-row-flex"
											>
												<view class="data-cell fixed-cell">{{ getAgeBandLabel(ageBand) }}</view>
												<view class="data-cells-container">
													<!-- 感知觉子领域数据 -->
													<view 
														v-for="subdomain in getSubdomainsByDomainOrdered(assessment.stats.subdomains, 'sens')" 
														:key="subdomain.key"
														class="data-cell"
													>
														{{ getAgeBandSubdomainValue(assessment.ageBandSubdomainStats, ageBand, subdomain.subdomain) }}
													</view>
													
													<!-- 动作子领域数据 -->
													<view 
														v-for="subdomain in getActionSubdomainsOrdered(assessment.stats.subdomains)" 
														:key="subdomain.key"
														class="data-cell"
													>
														{{ getAgeBandSubdomainValue(assessment.ageBandSubdomainStats, ageBand, subdomain.subdomain) }}
													</view>
													
													<!-- 社会互动子领域数据 -->
													<view 
														v-for="subdomain in getSubdomainsByDomainOrdered(assessment.stats.subdomains, 'social')" 
														:key="subdomain.key"
														class="data-cell"
													>
														{{ getAgeBandSubdomainValue(assessment.ageBandSubdomainStats, ageBand, subdomain.subdomain) }}
													</view>
													
													<!-- 认知子领域数据 -->
													<view 
														v-for="subdomain in getSubdomainsByDomainOrdered(assessment.stats.subdomains, 'cog')" 
														:key="subdomain.key"
														class="data-cell"
													>
														{{ getAgeBandSubdomainValue(assessment.ageBandSubdomainStats, ageBand, subdomain.subdomain) }}
													</view>
													
													<!-- 语言子领域数据 -->
													<view 
														v-for="subdomain in getSubdomainsByDomainOrdered(assessment.stats.subdomains, 'lang')" 
														:key="subdomain.key"
														class="data-cell"
													>
														{{ getAgeBandSubdomainValue(assessment.ageBandSubdomainStats, ageBand, subdomain.subdomain) }}
													</view>
													
													<!-- 口腔动作子领域数据 -->
													<view 
														v-for="subdomain in getSubdomainsByDomainOrdered(assessment.stats.subdomains, 'oral')" 
														:key="subdomain.key"
														class="data-cell"
													>
														{{ getAgeBandSubdomainValue(assessment.ageBandSubdomainStats, ageBand, subdomain.subdomain) }}
													</view>
												</view>
											</view>
										</view>
									</scroll-view>
								</view>
								
								<!-- 未完成题目列表 -->
								<view v-if="assessment.notAchieved && assessment.notAchieved.length > 0" class="not-achieved-section">
									<!-- 标题栏（可点击折叠/展开） -->
									<view 
										class="section-title-bar" 
										@click="toggleNotAchieved(assessment._id || index)"
									>
										<view class="section-title">
											<text class="title-icon">{{ isNotAchievedExpanded(assessment._id || index) ? '▼' : '▶' }}</text>
											<text>未完成题目 ({{ assessment.notAchieved.length }}题)</text>
										</view>
										<view class="section-summary">
											点击{{ isNotAchievedExpanded(assessment._id || index) ? '收起' : '展开' }}查看详情
										</view>
									</view>
									
									<!-- 统计摘要（始终显示） -->
									<view class="not-achieved-summary">
										<view class="summary-item">
											<text class="summary-label">按领域统计：</text>
											<view class="summary-tags">
												<view 
													v-for="(count, domain) in getNotAchievedByDomain(assessment.notAchieved)" 
													:key="domain"
													class="summary-tag"
												>
													{{ getDomainLabel(domain) }}: {{ count }}题
												</view>
											</view>
										</view>
										<view class="summary-item">
											<text class="summary-label">按年龄段统计：</text>
											<view class="summary-tags">
												<view 
													v-for="(count, ageBand) in getNotAchievedByAgeBand(assessment.notAchieved)" 
													:key="ageBand"
													class="summary-tag"
												>
													{{ getAgeBandLabel(ageBand) }}: {{ count }}题
												</view>
											</view>
										</view>
									</view>
									
									<!-- 详细列表（折叠/展开） -->
									<view v-if="isNotAchievedExpanded(assessment._id || index)" class="not-achieved-detail">
										<!-- 筛选器 -->
										<view class="filter-bar">
											<view class="filter-item">
												<text class="filter-label">领域：</text>
												<view class="filter-options">
													<text 
														class="filter-option"
														:class="{ active: getNotAchievedFilter(assessment._id || index, 'domain') === 'all' }"
														@click="setNotAchievedFilter(assessment._id || index, 'domain', 'all')"
													>
														全部
													</text>
													<text 
														v-for="domain in Object.keys(getNotAchievedByDomain(assessment.notAchieved))"
														:key="domain"
														class="filter-option"
														:class="{ active: getNotAchievedFilter(assessment._id || index, 'domain') === domain }"
														@click="setNotAchievedFilter(assessment._id || index, 'domain', domain)"
													>
														{{ getDomainLabel(domain) }}
													</text>
												</view>
											</view>
										</view>
										
										<!-- 题目列表 -->
										<view class="not-achieved-list">
											<view 
												v-for="(item, itemIndex) in getFilteredNotAchieved(assessment._id || index, assessment.notAchieved)" 
												:key="itemIndex"
												class="not-achieved-item"
											>
												<view class="item-header">
													<text class="item-badge age-badge">{{ getAgeBandLabel(item.ageBand) }}</text>
													<text class="item-badge domain-badge">{{ getDomainLabel(item.domain) }}</text>
													<text class="item-badge subdomain-badge">{{ getSubdomainLabel(item.subdomain) }}</text>
												</view>
												<text class="item-content">{{ item.title }}</text>
											</view>
											
											<!-- 显示数量提示 -->
											<view v-if="getFilteredNotAchieved(assessment._id || index, assessment.notAchieved).length === 0" class="empty-filter">
												<text>该筛选条件下没有未完成题目</text>
											</view>
										</view>
									</view>
								</view>
							</view>

							<!-- 领域统计柱状图（可点击展开子领域） -->
							<view v-if="assessmentViewMode === 'chart' && assessment.stats && assessment.stats.domains" class="assessment-charts">
								<view class="chart-section">
									<view class="chart-title">领域统计（点击展开子领域）</view>
									<view class="chart-container">
										<view 
											v-for="(domainStats, domain) in assessment.stats.domains" 
											:key="domain"
											class="chart-item chart-item-domain"
											:class="{ 'chart-item-expanded': isDomainExpanded(assessment._id || index, domain) }"
										>
											<view 
												class="chart-label-row chart-label-row-clickable" 
												@click.stop="toggleDomain(assessment._id || index, domain)"
											>
												<view class="chart-label-with-icon">
													<text class="chart-expand-icon" :class="{ 'chart-expand-icon-expanded': isDomainExpanded(assessment._id || index, domain) }">▶</text>
													<text class="chart-label">{{ getDomainLabel(domain) }}</text>
												</view>
												<text class="chart-value">{{ formatRatio(domainStats.ratio) }}%</text>
											</view>
										<view class="chart-bar-container">
											<view 
												class="chart-bar" 
												:class="[domainStats.ratio >= 0.8 ? 'bar-excellent' : domainStats.ratio >= 0.6 ? 'bar-good' : domainStats.ratio >= 0.4 ? 'bar-fair' : 'bar-poor']"
												:style="{ width: getRatioPercent(domainStats.ratio) + '%' }"
											></view>
										</view>
											<view class="chart-detail">
												<text>{{ domainStats.passed }}/{{ domainStats.total }}</text>
											</view>
											
											<!-- 子领域展开区域 - 垂直柱状图 -->
											<view 
												v-if="isDomainExpanded(assessment._id || index, domain) && assessment.stats.subdomains" 
												class="subdomain-expanded"
											>
												<view class="subdomain-chart-container">
													<view class="subdomain-chart-bars">
														<view 
															v-for="(subdomainStats, subdomainKey) in getSubdomainsByDomain(assessment.stats.subdomains, domain)" 
															:key="subdomainKey"
															class="subdomain-chart-bar"
														>
														<view class="subdomain-bar-container">
															<view 
																class="subdomain-bar-fill" 
																:class="[subdomainStats.ratio >= 0.8 ? 'bar-excellent' : subdomainStats.ratio >= 0.6 ? 'bar-good' : subdomainStats.ratio >= 0.4 ? 'bar-fair' : 'bar-poor']"
																:style="{ height: getRatioPercent(subdomainStats.ratio) + '%' }"
															></view>
														</view>
															<text class="subdomain-bar-label">{{ getSubdomainLabel(subdomainStats.subdomain) }}</text>
															<text class="subdomain-bar-value">{{ formatRatio(subdomainStats.ratio) }}%</text>
															<text class="subdomain-bar-count">{{ subdomainStats.passed }}/{{ subdomainStats.total }}</text>
														</view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view v-if="assessments.length === 0" class="empty-state">
							<text>暂无评估记录</text>
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
		// 领域映射
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

const getSubdomainLabel = (subdomain) => {
	const map = {
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
		'MLEN': '语言（非语言表达）'
	};
	return map[subdomain] || subdomain;
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
			expandedDomains: {}, // 存储展开的领域 { assessmentId_domain: true }
			assessmentViewMode: 'chart', // 'chart' | 'table' - 评估记录视图模式
			expandedNotAchieved: {}, // 记录哪些评估的未完成题目已展开
			notAchievedFilters: {} // 记录每个评估的筛选条件
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
						assessmentsCount: data.assessmentsCount
					});
					
					this.profiles = data.profiles || [];
					this.assessments = data.assessments || [];
					this.profilesCount = data.profilesCount || 0;
					this.assessmentsCount = data.assessmentsCount || 0;
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

		// 获取子领域标签
		getSubdomainLabel(subdomain) {
			return getSubdomainLabel(subdomain);
		},

		// 从子领域数据中提取所有领域
		getDomainsFromSubdomains(subdomains) {
			if (!subdomains || typeof subdomains !== 'object') return [];
			const domains = new Set();
			Object.values(subdomains).forEach(stats => {
				if (stats.domain) {
					domains.add(stats.domain);
				}
			});
			return Array.from(domains).sort();
		},

		// 获取指定领域下的所有子领域
		getSubdomainsByDomain(subdomains, domain) {
			if (!subdomains || typeof subdomains !== 'object') {
				return {};
			}
			const result = {};
			// 支持domain代码和中文两种格式
			const domainMap = {
				'感知觉': 'sens',
				'粗大动作': 'gross',
				'精细动作': 'fine',
				'认知': 'cog',
				'语言': 'lang',
				'社会互动': 'social',
				'口腔动作': 'oral'
			};
			const domainCode = domainMap[domain] || domain;
			
			Object.entries(subdomains).forEach(([key, stats]) => {
				if (stats) {
					const statsDomain = stats.domain || '';
					const statsDomainCode = domainMap[statsDomain] || statsDomain;
					// 匹配domain代码或中文
					if (statsDomainCode === domainCode || statsDomain === domain) {
						result[key] = stats;
					}
				}
			});
			return result;
		},

		// 获取指定领域下的所有子领域（有序数组）
		getSubdomainsByDomainOrdered(subdomains, domain) {
			const subdomainsObj = this.getSubdomainsByDomain(subdomains, domain);
			// 定义子领域显示顺序
			const orderMap = {
				'sens': ['OSV', 'OSH', 'OST', 'ISP', 'ISV'],
				'gross': ['GM', 'UEM', 'UES'],
				'fine': ['FM'],
				'social': ['SIP', 'SIE', 'SIS'],
				'cog': ['MAN', 'MRN', 'MCN', 'MIN', 'MAY', 'MRY', 'MCY', 'MIY'],
				'lang': ['MLUY', 'MLUN', 'MLEY', 'MLEN'],
				'oral': ['OM']
			};
			const order = orderMap[domain] || [];
			const result = [];
			// 先按顺序添加
			order.forEach(subdomainCode => {
				Object.entries(subdomainsObj).forEach(([key, stats]) => {
					if (stats.subdomain === subdomainCode) {
						result.push({ key, ...stats });
					}
				});
			});
			// 添加未在顺序中的子领域
			Object.entries(subdomainsObj).forEach(([key, stats]) => {
				if (!order.includes(stats.subdomain)) {
					result.push({ key, ...stats });
				}
			});
			return result;
		},

		// 获取动作相关的子领域（有序）
		getActionSubdomainsOrdered(subdomains) {
			const gross = this.getSubdomainsByDomainOrdered(subdomains, 'gross');
			const fine = this.getSubdomainsByDomainOrdered(subdomains, 'fine');
			return [...gross, ...fine];
		},

		// 获取动作子领域数量
		getActionSubdomainCount(subdomains) {
			return this.getActionSubdomainsOrdered(subdomains).length;
		},

		// 检查领域是否有子领域
		hasSubdomainInDomain(subdomains, domain) {
			return this.getSubdomainCount(subdomains, domain) > 0;
		},

		// 获取领域下的子领域数量
		getSubdomainCount(subdomains, domain) {
			return this.getSubdomainsByDomainOrdered(subdomains, domain).length;
		},

		// 获取所有年龄段（按顺序）
		getAllAgeBands() {
			return ['60_72m', '48_60m', '36_48m', '30_36m', '24_30m', '18_24m', '12_18m', '9_12m', '6_9m', '3_6m', '1_3m'];
		},

		// 获取指定年龄段和子领域的统计值
		getAgeBandSubdomainValue(ageBandSubdomainStats, ageBand, subdomain) {
			if (!ageBandSubdomainStats || typeof ageBandSubdomainStats !== 'object') {
				return '0/0';
			}
			
			// 查找匹配的统计：ageBand::subdomain
			const key = `${ageBand}::${subdomain}`;
			const stats = ageBandSubdomainStats[key];
			
			if (stats && stats.total !== undefined) {
				return `${stats.passed || 0}/${stats.total}`;
			}
			
			return '0/0';
		},

		// 获取柱状图颜色类
		getBarColorClass(ratio) {
			if (ratio >= 0.8) return 'bar-excellent';
			if (ratio >= 0.6) return 'bar-good';
			if (ratio >= 0.4) return 'bar-fair';
			return 'bar-poor';
		},
		
		// === 未完成题目相关方法 ===
		
		// 切换未完成题目的展开/折叠
		toggleNotAchieved(assessmentId) {
			const key = String(assessmentId);
			this.expandedNotAchieved[key] = !this.expandedNotAchieved[key];
			this.$forceUpdate();
		},
		
		// 检查未完成题目是否已展开
		isNotAchievedExpanded(assessmentId) {
			return !!this.expandedNotAchieved[String(assessmentId)];
		},
		
		// 按领域统计未完成题目
		getNotAchievedByDomain(notAchieved) {
			if (!notAchieved || !Array.isArray(notAchieved)) return {};
			const result = {};
			notAchieved.forEach(item => {
				const domain = item.domain || '未知';
				result[domain] = (result[domain] || 0) + 1;
			});
			return result;
		},
		
		// 按年龄段统计未完成题目
		getNotAchievedByAgeBand(notAchieved) {
			if (!notAchieved || !Array.isArray(notAchieved)) return {};
			const result = {};
			notAchieved.forEach(item => {
				const ageBand = item.ageBand || '未知';
				result[ageBand] = (result[ageBand] || 0) + 1;
			});
			return result;
		},
		
		// 设置筛选条件
		setNotAchievedFilter(assessmentId, filterType, value) {
			const key = String(assessmentId);
			if (!this.notAchievedFilters[key]) {
				this.notAchievedFilters[key] = {};
			}
			this.notAchievedFilters[key][filterType] = value;
			this.$forceUpdate();
		},
		
		// 获取筛选条件
		getNotAchievedFilter(assessmentId, filterType) {
			const key = String(assessmentId);
			if (!this.notAchievedFilters[key]) {
				return 'all';
			}
			return this.notAchievedFilters[key][filterType] || 'all';
		},
		
		// 获取筛选后的未完成题目
		getFilteredNotAchieved(assessmentId, notAchieved) {
			if (!notAchieved || !Array.isArray(notAchieved)) return [];
			
			const domainFilter = this.getNotAchievedFilter(assessmentId, 'domain');
			
			let filtered = notAchieved;
			
			// 按领域筛选
			if (domainFilter !== 'all') {
				filtered = filtered.filter(item => item.domain === domainFilter);
			}
			
			return filtered;
		},

		// 切换领域展开/折叠
		toggleDomain(assessmentId, domain) {
			// assessmentId 可能是 _id 或 index，都支持
			const key = `${String(assessmentId)}_${domain}`;
			const currentState = !!this.expandedDomains[key];
			const newState = !currentState;
			this.$set(this.expandedDomains, key, newState);
			console.log('[toggleDomain] 切换领域展开状态:', {
				assessmentId,
				domain,
				key,
				oldState: currentState,
				newState: newState
			});
		},

		// 检查领域是否展开
		isDomainExpanded(assessmentId, domain) {
			const key = `${String(assessmentId)}_${domain}`;
			return !!this.expandedDomains[key];
		},

		// 获取行走时间标签
		getWalkTimeLabel(walkTime) {
			const map = {
				'before18m': '18个月前',
				'after18m': '18个月后',
				'notyet': '尚未行走'
			};
			return map[walkTime] || walkTime;
		},

		// 获取爬行情况标签
		getCrawlLabel(crawl, crawlMonths) {
			const map = {
				'months': crawlMonths ? `${crawlMonths}个月` : '有爬行',
				'nocrawl': '无爬行',
				'walkThenCrawl': '先走再爬'
			};
			return map[crawl] || crawl;
		},

		// 获取视觉状态标签
		getVisionStatusLabel(status) {
			const map = {
				'normal': '正常',
				'amblyopia': '弱视',
				'strabismus': '斜视'
			};
			return map[status] || status;
		},

		// 获取视觉子项标签
		getVisionSubLabel(sub) {
			const map = {
				'myopia': '近视',
				'astigmatism': '散光'
			};
			return map[sub] || sub;
		},

		// 获取癫痫症标签
		getEpilepsyLabel(epilepsy) {
			const map = {
				'none': '无',
				'medicated': '已用药',
				'unmedicated': '未用药'
			};
			return map[epilepsy] || epilepsy;
		},

		// 获取照顾者标签
		getCaregiverLabel(caregiver) {
			const map = {
				'mother': '母亲',
				'father': '父亲',
				'grandparent': '祖父母',
				'other': '其他'
			};
			return map[caregiver] || caregiver;
		},

		// 返回
		goBack() {
			uni.navigateBack();
		},
		
		// 跳转到初始化题目页面
		goToInitQuestions() {
			uni.navigateTo({
				url: '/pages/admin/init-questions'
			});
		},
		
		// 退出登录
		logout() {
			uni.showModal({
				title: '确认退出',
				content: '确定要退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						// 清除登录信息
						uni.removeStorageSync('uni_id_token');
						uni.removeStorageSync('uni_id_token_expired');
						
						// 跳转到登录页
						uni.reLaunch({
							url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
						});
					}
				}
			});
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

/* 顶部标题栏 */
.dashboard-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx 20rpx;
	background: linear-gradient(135deg, #E93A8A 0%, #009FC2 100%);
	border-radius: 20rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 4rpx 20rpx rgba(233, 58, 138, 0.3);
}

.dashboard-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #FFF;
}

.dashboard-header .header-actions {
	display: flex;
	gap: 15rpx;
}

.action-btn {
	font-size: 24rpx;
	color: #FFF;
	padding: 12rpx 24rpx;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 20rpx;
	border: 1rpx solid rgba(255, 255, 255, 0.3);
	cursor: pointer;
	transition: all 0.3s;
}

.action-btn:active {
	background: rgba(255, 255, 255, 0.3);
	transform: scale(0.95);
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

.header-actions {
	display: flex;
	align-items: center;
	gap: 15rpx;
}

.view-toggle-btn {
	font-size: 24rpx;
	color: #7F8C8D;
	padding: 8rpx 16rpx;
	border-radius: 8rpx;
	border: 1rpx solid #E8E8E8;
	background: #fff;
}

.view-toggle-btn.active {
	color: #E93A8A;
	border-color: #E93A8A;
	background: #FFE8F0;
	font-weight: 500;
}

/* 档案列表 */
.profile-list, .assessment-list {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}

.profile-item, .assessment-item {
	background: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
	border: 1rpx solid #E8E8E8;
}

/* 档案区块 */
.profile-section {
	margin-bottom: 30rpx;
}

.profile-section:last-child {
	margin-bottom: 0;
}

.profile-section.profile-meta {
	padding-top: 20rpx;
	border-top: 1rpx solid #F0F0F0;
	margin-top: 20rpx;
}

.section-header {
	margin-bottom: 20rpx;
	padding-bottom: 10rpx;
	border-bottom: 2rpx solid #E93A8A;
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #E93A8A;
}

/* 基本信息 */
.profile-basic-info, .profile-detail-info {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.info-row {
	display: flex;
	align-items: flex-start;
	font-size: 26rpx;
	line-height: 1.6;
}

.info-label {
	color: #7F8C8D;
	min-width: 160rpx;
	flex-shrink: 0;
}

.info-value {
	color: #333;
	flex: 1;
	word-break: break-all;
}

.info-value.info-id {
	font-family: monospace;
	font-size: 22rpx;
	color: #999;
}

.info-value.info-phone {
	color: #E93A8A;
	font-weight: 500;
}

/* 诊断标签 */
.diagnosis-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
}

.profile-diagnosis {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
	align-items: center;
}

.diagnosis-tag {
	font-size: 24rpx;
	color: #E93A8A;
	background: #FFE8F0;
	padding: 8rpx 16rpx;
	border-radius: 8rpx;
	border: 1rpx solid #FFB6D9;
}

/* 备注信息 */
.profile-notes {
	background: #F8F9FA;
	border-radius: 12rpx;
	padding: 20rpx;
	border-left: 4rpx solid #E93A8A;
}

.notes-text {
	font-size: 26rpx;
	color: #555;
	line-height: 1.8;
	white-space: pre-wrap;
	word-break: break-all;
}

.assessment-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15rpx;
}

.assessment-child-name {
	font-size: 30rpx;
	font-weight: bold;
	color: #E93A8A;
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

/* 评估图表 */
.assessment-charts {
	margin-top: 30rpx;
}

.chart-section {
	margin-bottom: 40rpx;
}

.chart-section:last-child {
	margin-bottom: 0;
}

.chart-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #E93A8A;
	margin-bottom: 20rpx;
	padding-bottom: 10rpx;
	border-bottom: 2rpx solid #E93A8A;
}

.chart-container {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.chart-item {
	background: #F8F9FA;
	border-radius: 12rpx;
	padding: 20rpx;
}

.chart-item-domain {
	transition: all 0.3s ease;
}

.chart-item-domain.chart-item-expanded {
	background: #fff;
	border: 2rpx solid #E93A8A;
}

.chart-item-subdomain {
	background: #fff;
	margin-left: 30rpx;
	border-left: 3rpx solid #E93A8A;
	margin-top: 15rpx;
}

.chart-label-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12rpx;
}

.chart-label-row-clickable {
	cursor: pointer;
	user-select: none;
	padding: 5rpx 0;
}

.chart-label-row-clickable:active {
	opacity: 0.7;
}

.chart-label-with-icon {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.chart-expand-icon {
	font-size: 20rpx;
	color: #E93A8A;
	transition: transform 0.3s ease;
	display: inline-block;
}

.chart-expand-icon-expanded {
	transform: rotate(90deg);
}

.chart-label {
	font-size: 26rpx;
	color: #333;
	font-weight: 500;
}

.chart-label-subdomain {
	font-size: 24rpx;
	color: #666;
}

.chart-value {
	font-size: 26rpx;
	font-weight: bold;
	color: #E93A8A;
}

.chart-bar-container {
	width: 100%;
	height: 24rpx;
	background: #E8E8E8;
	border-radius: 12rpx;
	overflow: hidden;
	margin-bottom: 8rpx;
}

.chart-bar {
	height: 100%;
	border-radius: 12rpx;
	transition: width 0.3s ease;
	min-width: 2rpx;
}

.chart-bar-subdomain {
	height: 18rpx;
}

.chart-detail {
	font-size: 22rpx;
	color: #7F8C8D;
}

/* 柱状图颜色 */
.bar-excellent {
	background: linear-gradient(180deg, #52C41A, #73D13D);
}

.bar-good {
	background: linear-gradient(180deg, #1890FF, #40A9FF);
}

.bar-fair {
	background: linear-gradient(180deg, #FAAD14, #FFC53D);
}

.bar-poor {
	background: linear-gradient(180deg, #FF4D4F, #FF7875);
}

/* 子领域展开区域 */
.subdomain-expanded {
	margin-top: 20rpx;
	padding-top: 20rpx;
	border-top: 1rpx dashed #E8E8E8;
	animation: slideDown 0.3s ease;
}

@keyframes slideDown {
	from {
		opacity: 0;
		transform: translateY(-10rpx);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* 子领域垂直柱状图 */
.subdomain-chart-container {
	width: 100%;
	margin-top: 20rpx;
}

.subdomain-chart-bars {
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	height: 300rpx;
	padding: 0 10rpx;
}

.subdomain-chart-bar {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	margin: 0 5rpx;
}

.subdomain-bar-container {
	width: 100%;
	height: 250rpx;
	background: #F0F0F0;
	border-radius: 8rpx;
	position: relative;
	margin-bottom: 12rpx;
	overflow: hidden;
	display: flex;
	align-items: flex-end;
}

.subdomain-bar-fill {
	width: 100%;
	min-height: 8rpx;
	border-radius: 8rpx 8rpx 0 0;
	transition: height 0.5s ease;
	position: absolute;
	bottom: 0;
	left: 0;
}

.subdomain-bar-label {
	font-size: 20rpx;
	color: #666;
	margin-top: 8rpx;
	word-break: keep-all;
	text-align: center;
	line-height: 1.2;
}

.subdomain-bar-value {
	font-size: 22rpx;
	color: #E93A8A;
	font-weight: 500;
	margin-top: 5rpx;
}

.subdomain-bar-count {
	font-size: 18rpx;
	color: #999;
	margin-top: 3rpx;
}

/* 表格视图 - 使用Flexbox布局 */
.assessment-table-view {
	margin-top: 30rpx;
}

.table-container {
	background: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	border: 1rpx solid #E8E8E8;
}

.table-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	text-align: center;
}

.table-scroll {
	width: 100%;
}

/* Flexbox表格容器 */
.data-table-flex {
	display: flex;
	flex-direction: column;
	min-width: 800rpx;
	border: 1rpx solid #D0D0D0;
}

/* 表头容器 */
.table-header-container {
	display: flex;
	border-bottom: 2rpx solid #D0D0D0;
}

/* 固定列容器（跨两行） */
.header-fixed-column {
	width: 120rpx;
	min-width: 120rpx;
	flex-shrink: 0;
	position: sticky;
	left: 0;
	z-index: 10;
	background: #E8F4FD;
	border-right: 1rpx solid #D0D0D0;
	min-height: 120rpx;  /* 确保能够容纳两行的高度 */
}

/* 跨行的发育时间单元格 */
.header-cell-rowspan {
	width: 100%;
	min-height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	color: #333;
	padding: 15rpx 10rpx;
	text-align: center;
	box-sizing: border-box;
	font-size: 24rpx;
}

/* 右侧表头内容列 */
.header-content-column {
	display: flex;
	flex-direction: column;
	flex: 1;
}

/* 大领域行 */
.header-domains-row {
	display: flex;
	background: #E8F4FD;
	border-bottom: 1rpx solid #D0D0D0;
	min-height: 60rpx;
}

/* 子领域行 */
.header-subdomains-row {
	display: flex;
	background: #F5F8FF;
	min-height: 60rpx;
}

/* 数据行 */
.table-data-row-flex {
	display: flex;
	background: #fff;
	border-bottom: 1rpx solid #E0E0E0;
}

.table-data-row-flex:nth-child(even) {
	background: #F8F9FA;
}

.fixed-cell {
	width: 120rpx;
	min-width: 120rpx;
	flex-shrink: 0;
	background: #F0F7FF;
	font-weight: 500;
	color: #333;
	position: sticky;
	left: 0;
	z-index: 5;
	border-right: 1rpx solid #D0D0D0;
	padding: 12rpx 8rpx;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

/* 大领域单元格 - 使用固定宽度计算 */
.domain-header {
	background: #D0E8FF;
	border-right: 1rpx solid #D0D0D0;
	padding: 10rpx 5rpx;
	text-align: center;
	font-weight: bold;
	color: #333;
	font-size: 22rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: normal;  /* 允许换行 */
	word-break: break-all;  /* 强制换行 */
	line-height: 1.3;
	flex-shrink: 0;
	box-sizing: border-box;
	margin: 0;  /* 清除边距 */
	letter-spacing: 0;  /* 清除字间距 */
}

.domain-header:last-child {
	border-right: none;
}

/* 子领域容器 */
.header-subdomains-container {
	display: flex;
	flex: 1;
}

/* 子领域单元格 - 固定宽度 */
.subdomain-header {
	width: 100rpx;
	min-width: 100rpx;
	max-width: 100rpx;
	flex-shrink: 0;
	border-right: 1rpx solid #D0D0D0;
	padding: 10rpx 4rpx;
	text-align: center;
	font-size: 20rpx;
	color: #666;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	word-break: break-all;
	line-height: 1.2;
	box-sizing: border-box;
	overflow: hidden;
	margin: 0;
	letter-spacing: 0;
}

.subdomain-header:last-child {
	border-right: none;
}

/* 数据单元格容器 */
.data-cells-container {
	display: flex;
	flex: 1;
}

/* 数据单元格 - 固定宽度与子领域一致 */
.data-cell {
	width: 100rpx;
	min-width: 100rpx;
	max-width: 100rpx;
	flex-shrink: 0;
	padding: 10rpx 4rpx;
	text-align: center;
	border-right: 1rpx solid #E0E0E0;
	font-size: 22rpx;
	color: #333;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	overflow: hidden;
	margin: 0;
	letter-spacing: 0;
}

.data-cell:last-child {
	border-right: none;
}


/* 空状态 */
.empty-state {
	text-align: center;
	padding: 100rpx 0;
	color: #7F8C8D;
	font-size: 28rpx;
}

/* 未完成题目列表样式 - 优化版 */
.not-achieved-section {
	margin-top: 30rpx;
	background: #FFF;
	border-radius: 20rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	border: 2rpx solid #FFE5E5;
}

/* 标题栏 */
.section-title-bar {
	padding: 25rpx 30rpx;
	background: linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 100%);
	cursor: pointer;
	transition: background-color 0.2s;
	border-bottom: 1rpx solid #FFD5D5;
}

.section-title-bar:hover {
	background: linear-gradient(135deg, #FFD5D5 0%, #FFE5E5 100%);
}

.section-title {
	display: flex;
	align-items: center;
	font-size: 32rpx;
	font-weight: bold;
	color: #E74C3C;
	margin-bottom: 8rpx;
}

.title-icon {
	margin-right: 10rpx;
	font-size: 24rpx;
	transition: transform 0.2s;
}

.section-summary {
	font-size: 24rpx;
	color: #999;
}

/* 统计摘要 */
.not-achieved-summary {
	padding: 20rpx 30rpx;
	background: #FFFBFB;
	border-bottom: 1rpx solid #FFE5E5;
}

.summary-item {
	margin-bottom: 15rpx;
}

.summary-item:last-child {
	margin-bottom: 0;
}

.summary-label {
	font-size: 26rpx;
	color: #666;
	font-weight: 500;
	display: inline-block;
	margin-bottom: 8rpx;
}

.summary-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.summary-tag {
	display: inline-block;
	padding: 8rpx 16rpx;
	background: linear-gradient(135deg, #FFE5E5 0%, #FFF0F0 100%);
	color: #E74C3C;
	font-size: 24rpx;
	border-radius: 20rpx;
	border: 1rpx solid #FFD5D5;
}

/* 详细列表 */
.not-achieved-detail {
	padding: 20rpx 30rpx 30rpx;
	background: #FFF;
}

/* 筛选栏 */
.filter-bar {
	margin-bottom: 20rpx;
	padding: 20rpx;
	background: #F8F9FA;
	border-radius: 12rpx;
}

.filter-item {
	margin-bottom: 15rpx;
}

.filter-item:last-child {
	margin-bottom: 0;
}

.filter-label {
	font-size: 26rpx;
	color: #666;
	display: block;
	margin-bottom: 10rpx;
	font-weight: 500;
}

.filter-options {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.filter-option {
	padding: 8rpx 20rpx;
	background: #FFF;
	color: #666;
	font-size: 24rpx;
	border-radius: 20rpx;
	border: 1rpx solid #DDD;
	cursor: pointer;
	transition: all 0.2s;
}

.filter-option:hover {
	background: #F0F0F0;
}

.filter-option.active {
	background: linear-gradient(135deg, #E74C3C 0%, #FF6B6B 100%);
	color: #FFF;
	border-color: #E74C3C;
	font-weight: 500;
}

/* 题目列表 */
.not-achieved-list {
	max-height: 800rpx;
	overflow-y: auto;
}

.not-achieved-item {
	margin-bottom: 20rpx;
	padding: 20rpx;
	background: #FFFBFB;
	border-radius: 12rpx;
	border-left: 4rpx solid #E74C3C;
	transition: all 0.2s;
}

.not-achieved-item:hover {
	background: #FFF5F5;
	box-shadow: 0 2rpx 12rpx rgba(231, 76, 60, 0.1);
	transform: translateX(4rpx);
}

.not-achieved-item:last-child {
	margin-bottom: 0;
}

.item-header {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
	margin-bottom: 12rpx;
}

.item-badge {
	padding: 6rpx 12rpx;
	font-size: 22rpx;
	border-radius: 6rpx;
	font-weight: 500;
}

.age-badge {
	background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
	color: #FFF;
}

.domain-badge {
	background: linear-gradient(135deg, #F093FB 0%, #F5576C 100%);
	color: #FFF;
}

.subdomain-badge {
	background: linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%);
	color: #FFF;
}

.item-content {
	font-size: 26rpx;
	color: #333;
	line-height: 1.6;
	display: block;
}

.empty-filter {
	text-align: center;
	padding: 60rpx 0;
	color: #999;
	font-size: 26rpx;
}
</style>

