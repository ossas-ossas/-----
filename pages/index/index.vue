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
		
		<!-- 开始评估按钮 -->
		<view class="button-section">
			<button class="start-button" @click="startAssessment">
				<text class="button-text">开始评估</text>
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
			title: '知动儿童综合发育测评'
		}
	},
	onLoad() {
		console.log('[index] page loaded')
	},
	methods: {
		startAssessment() {
			uni.navigateTo({
				url: '/pages/child-info/child-info'
			})
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

/* Logo 和品牌标语区域 */
.logo-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 50rpx;
	position: relative;
	z-index: 1;
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
	position: relative;
	z-index: 1;
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
	position: relative;
	z-index: 1;
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
	position: relative;
	z-index: 1;
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

/* 版权信息 */
.footer {
	text-align: center;
	margin-top: auto;
	padding-top: 40rpx;
	position: relative;
	z-index: 1;
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