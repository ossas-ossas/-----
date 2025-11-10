<template>
	<view class="user-center">
		<!-- 用户信息卡片 -->
		<view class="user-card">
			<!-- 加载中的骨架屏 -->
			<view v-if="loading" class="skeleton-card">
				<view class="skeleton-avatar"></view>
				<view class="skeleton-info">
					<view class="skeleton-line skeleton-name"></view>
					<view class="skeleton-line skeleton-id"></view>
				</view>
			</view>
			
			<!-- 加载完成显示真实内容 -->
			<template v-else>
				<view class="user-avatar">
					<image v-if="userAvatar" :src="userAvatar" mode="aspectFill" />
					<image v-else src="/static/default-avatar.png" mode="aspectFill" />
				</view>
				<view class="user-info">
					<text class="user-name">{{ userInfo.nickname || userInfo.username || userInfo.mobile || '未设置昵称' }}</text>
					<text class="user-id">ID: {{ userId }}</text>
				</view>
				<view class="user-role-badge" v-if="isAdmin">
					<text class="badge-text">管理员</text>
				</view>
			</template>
		</view>

		<!-- 功能菜单 -->
		<view class="menu-section">
			<view class="menu-title">评估管理</view>
			<view class="menu-list">
				<view class="menu-item" @click="goToChildInfo">
					<view class="menu-item-icon">📝</view>
					<text class="menu-item-text">新建评估</text>
					<text class="menu-item-arrow">›</text>
				</view>
				<view class="menu-item" @click="goToHistory">
					<view class="menu-item-icon">📋</view>
					<text class="menu-item-text">历史记录</text>
					<text class="menu-item-arrow">›</text>
				</view>
			</view>
		</view>

		<!-- 管理员功能 -->
		<view class="menu-section" v-if="isAdmin">
			<view class="menu-title">管理员功能</view>
			<view class="menu-list">
				<view class="menu-item" @click="goToDashboard">
					<view class="menu-item-icon">👨‍💼</view>
					<text class="menu-item-text">管理员面板</text>
					<text class="menu-item-arrow">›</text>
				</view>
				<view class="menu-item" @click="goToInitQuestions">
					<view class="menu-item-icon">🔧</view>
					<text class="menu-item-text">初始化题目</text>
					<text class="menu-item-arrow">›</text>
				</view>
			</view>
		</view>

		<!-- 账号设置 -->
		<view class="menu-section">
			<view class="menu-title">账号设置</view>
			<view class="menu-list">
				<view class="menu-item" @click="goToUserInfo">
					<view class="menu-item-icon">👤</view>
					<text class="menu-item-text">个人资料</text>
					<text class="menu-item-arrow">›</text>
				</view>
				<view class="menu-item" @click="goToChangePwd">
					<view class="menu-item-icon">🔒</view>
					<text class="menu-item-text">修改密码</text>
					<text class="menu-item-arrow">›</text>
				</view>
			</view>
		</view>

		<!-- 退出登录按钮 -->
		<view class="logout-section">
			<button class="logout-button" @click="logout">退出登录</button>
		</view>

		<!-- 返回首页 -->
		<view class="back-home-section">
			<text class="back-home-text" @click="goHome">返回首页</text>
		</view>
	</view>
</template>

<script>
import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js'

export default {
	computed: {
		userInfo() {
			return store.userInfo || {}
		},
		// 获取头像 URL
		userAvatar() {
			const info = store.userInfo
			if (!info) return ''
			
			// 多种头像字段兼容
			if (info.avatar) return info.avatar
			if (info.avatar_file && info.avatar_file.url) return info.avatar_file.url
			if (info.avatarUrl) return info.avatarUrl
			
			return ''
		},
		// 获取用户 ID（简化显示）
		userId() {
			const info = store.userInfo
			if (!info || !info._id) return '-'
			return info._id.substring(0, 8) + '...'
		}
	},
	data() {
		return {
			isAdmin: false,
			loading: true
		}
	},
	onLoad() {
		this.checkLogin();
		// 立即尝试加载用户信息
		this.loadUserInfo();
	},
	onShow() {
		// 每次显示页面时刷新用户信息
		this.loadUserInfo();
	},
	methods: {
		// 检查登录状态
		checkLogin() {
			const token = uni.getStorageSync('uni_id_token');
			if (!token) {
				uni.showModal({
					title: '需要登录',
					content: '请先登录',
					showCancel: false,
					success: () => {
						uni.reLaunch({
							url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
						});
					}
				});
			}
		},
		
	// 加载用户信息
	async loadUserInfo() {
		try {
			this.loading = true;
			
			// 先从 token 解析基本信息（快速显示）
			const token = uni.getStorageSync('uni_id_token');
			if (token) {
				const tokenArr = token.split('.');
				if (tokenArr.length === 3) {
					try {
						const payload = JSON.parse(decodeURIComponent(escape(atob(tokenArr[1]))));
						const role = payload.role || [];
						this.isAdmin = Array.isArray(role) ? role.includes('admin') : role === 'admin';
						
						// Token 中如果有基本信息，可以先显示
						if (payload.uid) {
							console.log('[user-center] 从 token 获取到 uid:', payload.uid);
						}
					} catch (e) {
						console.warn('[user-center] 解析 token 失败:', e);
					}
				}
			}
			
			// 如果 store 中已有缓存数据，立即结束 loading
			if (store.userInfo && store.userInfo._id) {
				console.log('[user-center] 从缓存加载用户信息:', store.userInfo.nickname || store.userInfo.username);
				this.loading = false;
			}
			
			// 异步更新完整的用户信息
			await mutations.updateUserInfo();
			
			console.log('[user-center] 用户信息更新完成:', store.userInfo);
			
		} catch (error) {
			console.error('[user-center] 加载用户信息失败:', error);
			uni.showToast({
				title: '加载失败，请重试',
				icon: 'none',
				duration: 2000
			});
		} finally {
			this.loading = false;
		}
	},
		
		// 跳转到新建评估
		goToChildInfo() {
			uni.navigateTo({
				url: '/pages/child-info/child-info'
			});
		},
		
		// 跳转到历史记录
		goToHistory() {
			uni.navigateTo({
				url: '/pages/history/history'
			});
		},
		
		// 跳转到管理员面板
		goToDashboard() {
			uni.navigateTo({
				url: '/pages/admin/dashboard/dashboard'
			});
		},
		
		// 跳转到初始化题目
		goToInitQuestions() {
			uni.navigateTo({
				url: '/pages/admin/init-questions'
			});
		},
		
		// 跳转到个人资料
		goToUserInfo() {
			uni.navigateTo({
				url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
			});
		},
		
		// 跳转到修改密码
		goToChangePwd() {
			uni.navigateTo({
				url: '/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd'
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
						
						// 跳转到首页
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}
				}
			});
		},
		
		// 返回首页
		goHome() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
}
</script>

<style scoped>
.user-center {
	min-height: 100vh;
	background: linear-gradient(135deg, #E8F4FD 0%, #F0F8FF 100%);
	padding: 20rpx;
}

/* 用户信息卡片 */
.user-card {
	background: #fff;
	border-radius: 20rpx;
	padding: 40rpx 30rpx;
	margin-bottom: 30rpx;
	display: flex;
	align-items: center;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	position: relative;
	min-height: 120rpx;
}

/* 骨架屏 */
.skeleton-card {
	display: flex;
	align-items: center;
	width: 100%;
}

.skeleton-avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 60rpx;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: loading 1.5s ease-in-out infinite;
	margin-right: 30rpx;
}

.skeleton-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 15rpx;
}

.skeleton-line {
	height: 30rpx;
	border-radius: 15rpx;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: loading 1.5s ease-in-out infinite;
}

.skeleton-name {
	width: 60%;
}

.skeleton-id {
	width: 40%;
	height: 24rpx;
}

@keyframes loading {
	0% {
		background-position: 200% 0;
	}
	100% {
		background-position: -200% 0;
	}
}

.user-avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 60rpx;
	overflow: hidden;
	margin-right: 30rpx;
	background: #F5F8FF;
}

.user-avatar image {
	width: 100%;
	height: 100%;
}

.user-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.user-name {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.user-id {
	font-size: 24rpx;
	color: #999;
	font-family: monospace;
}

.user-role-badge {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	background: linear-gradient(135deg, #E93A8A 0%, #FF6B6B 100%);
	padding: 8rpx 20rpx;
	border-radius: 20rpx;
}

.badge-text {
	font-size: 22rpx;
	color: #fff;
	font-weight: 500;
}

/* 功能菜单 */
.menu-section {
	margin-bottom: 30rpx;
}

.menu-title {
	font-size: 28rpx;
	color: #666;
	padding: 0 20rpx 15rpx;
	font-weight: 500;
}

.menu-list {
	background: #fff;
	border-radius: 20rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 30rpx 25rpx;
	border-bottom: 1rpx solid #F0F0F0;
	transition: background-color 0.2s;
}

.menu-item:last-child {
	border-bottom: none;
}

.menu-item:active {
	background-color: #F8F9FA;
}

.menu-item-icon {
	font-size: 40rpx;
	margin-right: 20rpx;
}

.menu-item-text {
	flex: 1;
	font-size: 28rpx;
	color: #333;
}

.menu-item-arrow {
	font-size: 40rpx;
	color: #CCC;
	font-weight: 300;
}

/* 退出登录按钮 */
.logout-section {
	padding: 20rpx 0;
}

.logout-button {
	width: 100%;
	height: 90rpx;
	background: #fff;
	color: #E93A8A;
	border: 2rpx solid #E93A8A;
	border-radius: 45rpx;
	font-size: 30rpx;
	font-weight: 500;
	line-height: 90rpx;
}

.logout-button:active {
	background: #FFF0F5;
}

/* 返回首页 */
.back-home-section {
	text-align: center;
	padding: 30rpx 0;
}

.back-home-text {
	font-size: 26rpx;
	color: #999;
	text-decoration: underline;
}
</style>

