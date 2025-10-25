<template>
	<view class="container">
		<!-- 页面标题 -->
		<view class="page-header">
			<view class="header-title">评估历史记录</view>
			<view class="header-subtitle">查看您孩子的历史评估记录</view>
		</view>
		
		<!-- 历史记录列表 -->
		<view class="history-list" v-if="historyList.length > 0">
			<view 
				class="history-item" 
				v-for="(record, index) in historyList" 
				:key="index"
				@click="viewRecord(record)"
			>
				<view class="record-header">
					<view class="child-info">
						<text class="child-name">{{ record.childInfo.name }}</text>
						<text class="record-date">{{ formatDate(record.assessmentDate) }}</text>
					</view>
					<view class="score-badge" :class="getScoreClass(record.scorePercentage)">
						{{ Math.round(record.scorePercentage) }}分
					</view>
				</view>
				
				<view class="record-content">
					<view class="assessment-types">
						<text 
							class="type-tag" 
							v-for="type in record.assessmentTypes" 
							:key="type"
						>
							{{ getTypeLabel(type) }}
						</text>
					</view>
					
					<view class="record-summary">
						<text class="summary-text">{{ getRecordSummary(record) }}</text>
					</view>
				</view>
				
				<view class="record-footer">
					<view class="record-age">
						评估时年龄：{{ calculateAgeAtAssessment(record) }}
					</view>
					<view class="view-btn">
						<text>查看详情 ></text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-else>
			<view class="empty-icon">📊</view>
			<view class="empty-title">暂无评估记录</view>
			<view class="empty-description">
				您还没有进行过任何评估<br/>
				点击下方按钮开始第一次评估
			</view>
			<button class="start-assessment-btn" @click="startNewAssessment">
				开始评估
			</button>
		</view>
		
		<!-- 底部操作 -->
		<view class="footer-actions" v-if="historyList.length > 0">
			<button class="btn-secondary" @click="clearHistory">清空记录</button>
			<button class="btn-primary" @click="startNewAssessment">新的评估</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList: [],
				typeLabels: {
					motor: '运动发育',
					language: '语言发育',
					cognitive: '认知发育',
					social: '社交发育'
				}
			}
		},
		onLoad() {
			this.loadHistory();
		},
		onShow() {
			// 每次显示页面时重新加载历史记录
			this.loadHistory();
		},
		methods: {
			// 加载历史记录
			loadHistory() {
				this.historyList = uni.getStorageSync('assessmentHistory') || [];
			},
			
			// 查看记录详情
			viewRecord(record) {
				// 将选中的记录设置为当前结果
				uni.setStorageSync('assessmentResult', record);
				
				// 跳转到结果页面
				uni.navigateTo({
					url: '/pages/result/result'
				});
			},
			
			// 开始新评估
			startNewAssessment() {
				uni.navigateTo({
					url: '/pages/child-info/child-info'
				});
			},
			
			// 清空历史记录
			clearHistory() {
				uni.showModal({
					title: '清空记录',
					content: '确定要清空所有历史记录吗？此操作不可恢复。',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('assessmentHistory');
							this.historyList = [];
							uni.showToast({
								title: '记录已清空',
								icon: 'success'
							});
						}
					}
				});
			},
			
			// 格式化日期
			formatDate(dateString) {
				const date = new Date(dateString);
				const now = new Date();
				const diffTime = now - date;
				const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
				
				if (diffDays === 0) {
					return '今天';
				} else if (diffDays === 1) {
					return '昨天';
				} else if (diffDays < 7) {
					return `${diffDays}天前`;
				} else {
					return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
				}
			},
			
			// 获取类型标签
			getTypeLabel(type) {
				return this.typeLabels[type] || type;
			},
			
			// 获取评分样式类
			getScoreClass(percentage) {
				if (percentage >= 80) return 'excellent';
				if (percentage >= 60) return 'good';
				if (percentage >= 40) return 'average';
				return 'concern';
			},
			
			// 获取记录摘要
			getRecordSummary(record) {
				const percentage = record.scorePercentage;
				if (percentage >= 80) {
					return '发育水平优秀，各项能力发展良好';
				} else if (percentage >= 60) {
					return '发育水平良好，符合年龄标准';
				} else if (percentage >= 40) {
					return '发育水平一般，有提升空间';
				} else {
					return '发育水平需要关注，建议专业咨询';
				}
			},
			
			// 计算评估时的年龄
			calculateAgeAtAssessment(record) {
				if (!record.childInfo || !record.childInfo.birthDate) return '';
				
				const birth = new Date(record.childInfo.birthDate);
				const assessmentDate = new Date(record.assessmentDate);
				const ageInMonths = (assessmentDate.getFullYear() - birth.getFullYear()) * 12 + 
								   (assessmentDate.getMonth() - birth.getMonth());
				
				if (ageInMonths < 12) {
					return `${ageInMonths}个月`;
				} else {
					const years = Math.floor(ageInMonths / 12);
					const months = ageInMonths % 12;
					return months > 0 ? `${years}岁${months}个月` : `${years}岁`;
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		background-color: #F5F9FA;
		padding: 30rpx;
	}
	
	.page-header {
		text-align: center;
		margin-bottom: 40rpx;
	}
	
	.header-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #2C405A;
		margin-bottom: 15rpx;
	}
	
	.header-subtitle {
		font-size: 26rpx;
		color: #666;
		line-height: 1.4;
	}
	
	.history-list {
		margin-bottom: 40rpx;
	}
	
	.history-item {
		background-color: white;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(168, 216, 234, 0.1);
		transition: transform 0.2s ease;
	}
	
	.history-item:active {
		transform: scale(0.98);
	}
	
	.record-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}
	
	.child-info {
		flex: 1;
	}
	
	.child-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #2C405A;
		margin-right: 20rpx;
	}
	
	.record-date {
		font-size: 24rpx;
		color: #999;
	}
	
	.score-badge {
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: white;
	}
	
	.score-badge.excellent {
		background: linear-gradient(135deg, #B8E6B8 0%, #90D490 100%);
	}
	
	.score-badge.good {
		background: linear-gradient(135deg, #A8D8EA 0%, #7BC4D4 100%);
	}
	
	.score-badge.average {
		background: linear-gradient(135deg, #FFE4B5 0%, #FFD700 100%);
	}
	
	.score-badge.concern {
		background: linear-gradient(135deg, #FFB6C1 0%, #FFA0B4 100%);
	}
	
	.record-content {
		margin-bottom: 20rpx;
	}
	
	.assessment-types {
		margin-bottom: 15rpx;
	}
	
	.type-tag {
		display: inline-block;
		background-color: #E8F4F8;
		color: #A8D8EA;
		padding: 8rpx 16rpx;
		border-radius: 15rpx;
		font-size: 22rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}
	
	.record-summary {
		margin-bottom: 15rpx;
	}
	
	.summary-text {
		font-size: 26rpx;
		color: #666;
		line-height: 1.4;
	}
	
	.record-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		border-top: 1rpx solid #E8F4F8;
	}
	
	.record-age {
		font-size: 24rpx;
		color: #999;
	}
	
	.view-btn {
		color: #A8D8EA;
		font-size: 24rpx;
	}
	
	.empty-state {
		text-align: center;
		padding: 100rpx 40rpx;
	}
	
	.empty-icon {
		font-size: 120rpx;
		margin-bottom: 40rpx;
		opacity: 0.6;
	}
	
	.empty-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #2C405A;
		margin-bottom: 20rpx;
	}
	
	.empty-description {
		font-size: 26rpx;
		color: #666;
		line-height: 1.5;
		margin-bottom: 60rpx;
	}
	
	.start-assessment-btn {
		width: 400rpx;
		height: 80rpx;
		background: linear-gradient(135deg, #A8D8EA 0%, #7BC4D4 100%);
		color: white;
		border: none;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-weight: bold;
	}
	
	.footer-actions {
		display: flex;
		gap: 20rpx;
		padding: 0 10rpx;
	}
	
	.btn-secondary {
		flex: 1;
		height: 80rpx;
		background-color: white;
		color: #666;
		border: 2rpx solid #E8F4F8;
		border-radius: 40rpx;
		font-size: 28rpx;
	}
	
	.btn-primary {
		flex: 2;
		height: 80rpx;
		background: linear-gradient(135deg, #A8D8EA 0%, #7BC4D4 100%);
		color: white;
		border: none;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-weight: bold;
	}
</style>
