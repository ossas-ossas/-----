<template>
	<view class="container">
		<!-- Logo 和品牌标语区域 -->
		<view class="logo-section">
			<view class="logo-wrapper">
				<image class="logo" src="/static/logo.png" mode="aspectFit" />
			</view>
			<text class="brand-name">睿智全纳融合教育</text>
			<text class="brand-sub-slogan">科学评估 · 专业指导 · 健康成长</text>
		</view>
		
		<!-- 主标题区域 -->
		<view class="title-section">
			<text class="main-title">知动儿童综合发育测评</text>
			<text class="subtitle">科学评估，专业指导</text>
		</view>
		
		<!-- 步骤卡片 -->
		<view class="steps-section">
			<!-- 步骤1 -->
			<view class="step-card">
				<view class="step-indicator"></view>
				<view class="step-content">
					<view class="step-number">01</view>
					<text class="step-title">填写儿童信息</text>
					<text class="step-desc">录入基本信息与临床数据</text>
				</view>
			</view>
			
			<!-- 步骤2 -->
			<view class="step-card">
				<view class="step-indicator"></view>
				<view class="step-content">
					<view class="step-number">02</view>
					<text class="step-title">完成发育评估</text>
					<text class="step-desc">多维度专业测评工具</text>
				</view>
			</view>
			
			<!-- 步骤3 -->
			<view class="step-card">
				<view class="step-indicator"></view>
				<view class="step-content">
					<view class="step-number">03</view>
					<text class="step-title">获取分析报告</text>
					<text class="step-desc">个性化成长建议与指导</text>
				</view>
			</view>
		</view>
		
	<!-- 按钮区域 -->
	<view class="button-section">
		<!-- 已登录：显示开始评估按钮 -->
		<button v-if="isLoggedIn" class="start-button" @click="startAssessment">
			<text class="button-text">开始评估</text>
		</button>
		
		<!-- 未登录：显示大号登录按钮 -->
		<button v-if="!isLoggedIn" class="login-button-primary" @click="goLogin">
			<text class="button-text">登录 / 注册</text>
		</button>
		
		<!-- 已登录：显示次要的个人中心按钮 -->
		<button v-if="isLoggedIn" class="login-button-secondary" @click="goLogin">
			<text class="login-button-text">个人中心</text>
		</button>
	</view>
		
		<!-- 版权信息 -->
		<view class="footer">
			<text class="footer-text">© 2024 睿智全纳融合教育</text>
			<text class="footer-subtext">本测评基于专业发育量表，仅供参考</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '知动儿童综合发育测评',
			isLoggedIn: false
		}
	},
	onLoad() {
		console.log('[index] page loaded');
	},
	
	onShow() {
		// 检查登录状态
		this.checkLoginStatus();
	},
	methods: {
		// 检查登录状态
		checkLoginStatus() {
			try {
				const token = uni.getStorageSync('uni_id_token');
				console.log('[index] 检查登录状态, token存在:', !!token);
				
				this.isLoggedIn = !!token;
				
				if (token) {
					// 已登录，检查是否是管理员
					this.checkAdminAndRedirect();
				}
			} catch (error) {
				console.error('[index] 检查登录状态失败:', error);
				this.isLoggedIn = false;
			}
		},
		
	// ✅ 优化：检查是否是管理员并智能跳转
	checkAdminAndRedirect() {
		try {
			// 检查是否已登录
			const userInfo = uniCloud.getCurrentUserInfo && uniCloud.getCurrentUserInfo();
			if (!userInfo || !userInfo.uid) {
				return; // 未登录，不处理
			}

			// 检查角色（从 token 中解析）
			const token = uni.getStorageSync('uni_id_token') || '';
			if (!token) {
				return; // 没有 token，不处理
			}
			
			const tokenArr = token.split('.');
			if (tokenArr.length === 3) {
				try {
					// 解码 token payload
					const payload = JSON.parse(decodeURIComponent(escape(atob(tokenArr[1]))));
					const role = payload.role || [];
					// 检查是否是管理员（role 是数组，包含 'admin'）
					const isAdmin = Array.isArray(role) ? role.includes('admin') : role === 'admin';
					
					if (isAdmin) {
						// 检查当前页面路径，避免重复跳转
						const pages = getCurrentPages();
						const currentPage = pages[pages.length - 1];
						if (currentPage && currentPage.route === 'pages/admin/dashboard/dashboard') {
							return; // 已经在管理员面板，不跳转
						}
						
						// ✅ 优化：检查是否在本次会话中已经自动跳转过
						const hasAutoRedirected = uni.getStorageSync('admin_auto_redirected_' + payload.uid);
						if (hasAutoRedirected) {
							console.log('[index] 本次会话已自动跳转过，不再重复跳转');
							return;
						}
						
						// ✅ 优化：显示提示，让管理员选择是否跳转
						uni.showModal({
							title: '管理员权限检测',
							content: '检测到您是管理员，是否跳转到管理员面板？',
							confirmText: '跳转',
							cancelText: '留在首页',
							success: (res) => {
								if (res.confirm) {
									// 标记已自动跳转（本次会话有效）
									uni.setStorageSync('admin_auto_redirected_' + payload.uid, true);
									
									// 跳转到管理员面板
									uni.reLaunch({
										url: '/pages/admin/dashboard/dashboard'
									})
								} else {
									// 用户选择留在首页，也标记已询问过
									uni.setStorageSync('admin_auto_redirected_' + payload.uid, true);
									console.log('[index] 管理员选择留在首页');
								}
							}
						});
					}
				} catch (e) {
					console.warn('[index] 解析 token 失败:', e);
				}
			}
		} catch (error) {
			console.warn('[index] 检查管理员权限失败:', error);
		}
	},
		
	// 开始评估（已登录后才显示此按钮）
	startAssessment() {
		// 进入儿童信息页
		uni.navigateTo({
			url: '/pages/child-info/child-info'
		});
	},
		
		// 跳转到登录/用户中心
		goLogin() {
			const token = uni.getStorageSync('uni_id_token');
			
			if (token) {
				// 已登录，跳转到用户中心
				uni.navigateTo({
					url: '/pages/user-center/user-center'
				});
			} else {
				// 未登录，跳转到登录页
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
				});
			}
		}
	}
}
</script>

<style scoped>
.container {
	min-height: 100vh;
	background: linear-gradient(180deg, #fff 0%, #F5F9FC 100%);
	padding: 60rpx 40rpx 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	overflow: hidden;
}

/* 移除背景图装饰，微信小程序不支持 WXSS 中使用本地图片 */

/* Logo 和品牌标语区域 */
.logo-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 50rpx;
}

.logo-wrapper {
	width: 320rpx;
	height: 320rpx;
	background: #fff;
	border-radius: 32rpx;
	box-shadow: 0 12rpx 40rpx rgba(233, 58, 138, 0.15);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 24rpx;
	transition: all 0.3s ease;
	overflow: hidden;
}

.logo-wrapper:hover {
	transform: scale(1.05);
	box-shadow: 0 16rpx 48rpx rgba(233, 58, 138, 0.25);
}

.logo {
	width: 280rpx;
	height: 280rpx;
}

.brand-name {
	font-size: 38rpx;
	font-weight: bold;
	color: #E93A8A;
	margin-bottom: 12rpx;
	text-align: center;
}

.brand-sub-slogan {
	font-size: 26rpx;
	color: #999;
	line-height: 1.6;
	text-align: center;
}

/* 主标题区域 */
.title-section {
	text-align: center;
	margin-bottom: 60rpx;
}

.main-title {
	display: block;
	font-size: 44rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 16rpx;
	line-height: 1.4;
}

.subtitle {
	display: block;
	font-size: 28rpx;
	color: #999;
	line-height: 1.5;
}

/* 步骤卡片区域 */
.steps-section {
	width: 100%;
	margin-bottom: 60rpx;
}

.step-card {
	background: #fff;
	border-radius: 16rpx;
	margin-bottom: 24rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
	position: relative;
	overflow: hidden;
}

.step-indicator {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 8rpx;
	background: linear-gradient(180deg, #E93A8A, #FF6BA8);
}

.step-content {
	display: flex;
	flex-direction: column;
}

.step-number {
	display: inline-block;
	width: 56rpx;
	height: 56rpx;
	line-height: 56rpx;
	text-align: center;
	background: linear-gradient(135deg, #E93A8A, #009FC2);
	border-radius: 12rpx;
	font-size: 24rpx;
	font-weight: bold;
	color: #fff;
	margin-bottom: 16rpx;
	box-shadow: 0 4rpx 12rpx rgba(233, 58, 138, 0.3);
}

.step-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 8rpx;
	line-height: 1.4;
}

.step-desc {
	font-size: 26rpx;
	color: #999;
	line-height: 1.5;
}

/* 按钮区域 */
.button-section {
	width: 100%;
	margin-bottom: 40rpx;
}

.start-button {
	width: 100%;
	height: 96rpx;
	background: linear-gradient(135deg, #E93A8A, #009FC2);
	border-radius: 48rpx;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8rpx 30rpx rgba(233, 58, 138, 0.4);
	position: relative;
	overflow: hidden;
}

.start-button::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
	transition: left 0.5s;
}

.start-button:active::before {
	left: 100%;
}

.button-text {
	font-size: 36rpx;
	font-weight: bold;
	color: #fff;
}

/* 未登录时的主要登录按钮（大号） */
.login-button-primary {
	width: 100%;
	height: 96rpx;
	background: linear-gradient(135deg, #E93A8A, #009FC2);
	border-radius: 48rpx;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8rpx 30rpx rgba(233, 58, 138, 0.4);
	position: relative;
	overflow: hidden;
}

.login-button-primary::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
	transition: left 0.5s;
}

.login-button-primary:active::before {
	left: 100%;
}

/* 已登录后的次要个人中心按钮（小号） */
.login-button-secondary {
	width: 100%;
	height: 80rpx;
	background: #fff;
	border-radius: 40rpx;
	border: 2rpx solid #E93A8A;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20rpx;
	box-shadow: 0 4rpx 12rpx rgba(233, 58, 138, 0.2);
}

.login-button-secondary:active {
	background: #F5F9FC;
}

.login-button-text {
	font-size: 28rpx;
	font-weight: 500;
	color: #E93A8A;
}

/* 版权信息 */
.footer {
	text-align: center;
	margin-top: auto;
	padding-top: 40rpx;
}

.footer-text {
	display: block;
	font-size: 24rpx;
	color: #999;
	margin-bottom: 8rpx;
	line-height: 1.5;
}

.footer-subtext {
	display: block;
	font-size: 22rpx;
	color: #ccc;
	line-height: 1.5;
}

/* 移动端适配 */
@media screen and (max-width: 750px) {
	.container {
		padding: 40rpx 30rpx 30rpx;
	}
	
	.logo-wrapper {
		width: 260rpx;
		height: 260rpx;
	}
	
	.logo {
		width: 230rpx;
		height: 230rpx;
	}
	
	.brand-name {
		font-size: 34rpx;
	}
	
	.main-title {
		font-size: 40rpx;
	}
	
	.step-card {
		padding: 24rpx;
	}
	
	.step-title {
		font-size: 30rpx;
	}
	
	.step-desc {
		font-size: 24rpx;
	}
	
	.start-button {
		height: 88rpx;
	}
	
	.button-text {
		font-size: 34rpx;
	}
}
</style>