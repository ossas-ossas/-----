<template>
	<view class="container">
		<!-- 顶部装饰 -->
		<view class="header-decoration">
			<view class="decoration-circle circle-1"></view>
			<view class="decoration-circle circle-2"></view>
			<view class="decoration-circle circle-3"></view>
		</view>
		
		<!-- 主标题区域 -->
		<view class="title-section">
			<view class="app-icon">
				<text class="icon-text">👶</text>
			</view>
			<text class="main-title">知动儿童综合发育测评</text>
			<text class="subtitle">科学评估 · 专业指导 · 健康成长</text>
		</view>
		
		<!-- 功能介绍卡片 -->
		<view class="feature-card">
			<view class="feature-item">
				<view class="feature-icon">📝</view>
				<text class="feature-text">填写儿童基本信息</text>
			</view>
			<view class="feature-item">
				<view class="feature-icon">📊</view>
				<text class="feature-text">完成专业发育评估</text>
			</view>
			<view class="feature-item">
				<view class="feature-icon">📋</view>
				<text class="feature-text">获得详细分析报告</text>
			</view>
		</view>
		
		<!-- 描述文字 -->
		<view class="description">
			<text class="desc-text">填写信息，完成发育评估，生成综合分析报告</text>
			<text class="desc-subtext">帮助家长了解孩子的发育状况，提供科学的成长建议</text>
		</view>
		
		<!-- 开始评估按钮 -->
		<view class="button-section">
			<button class="start-button" @click="startAssessment">
				<text class="button-text">开始评估</text>
				<text class="button-icon">→</text>
			</button>
		</view>
		
		<!-- 底部说明 -->
		<view class="footer-info">
			<text class="footer-text">本测评基于专业发育量表，仅供参考</text>
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
			// 页面加载时的初始化
		},
		methods: {
			// 开始评估按钮点击事件
			startAssessment() {
				uni.navigateTo({
					url: '/pages/child-info/child-info'
				})
			}
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		background: linear-gradient(135deg, #E8F4FD 0%, #F0F8FF 100%);
		padding: 40rpx 30rpx;
		position: relative;
		overflow: hidden;
	}
	
	/* 顶部装饰圆圈 */
	.header-decoration {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 200rpx;
		z-index: 1;
	}
	
	.decoration-circle {
		position: absolute;
		border-radius: 50%;
		opacity: 0.1;
	}
	
	.circle-1 {
		width: 120rpx;
		height: 120rpx;
		background-color: #87CEEB;
		top: 20rpx;
		right: 60rpx;
	}
	
	.circle-2 {
		width: 80rpx;
		height: 80rpx;
		background-color: #98FB98;
		top: 80rpx;
		right: 20rpx;
	}
	
	.circle-3 {
		width: 60rpx;
		height: 60rpx;
		background-color: #FFB6C1;
		top: 40rpx;
		right: 120rpx;
	}
	
	/* 标题区域 */
	.title-section {
		text-align: center;
		margin-top: 80rpx;
		margin-bottom: 60rpx;
		position: relative;
		z-index: 2;
	}
	
	.app-icon {
		width: 120rpx;
		height: 120rpx;
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		border-radius: 50%;
		margin: 0 auto 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 20rpx rgba(135, 206, 235, 0.3);
	}
	
	.icon-text {
		font-size: 60rpx;
	}
	
	.main-title {
		display: block;
		font-size: 48rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 20rpx;
		line-height: 1.3;
	}
	
	.subtitle {
		display: block;
		font-size: 28rpx;
		color: #7F8C8D;
		font-weight: 300;
	}
	
	/* 功能介绍卡片 */
	.feature-card {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		margin-bottom: 50rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		backdrop-filter: blur(10rpx);
	}
	
	.feature-item {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.feature-item:last-child {
		margin-bottom: 0;
	}
	
	.feature-icon {
		width: 60rpx;
		height: 60rpx;
		background: linear-gradient(135deg, #FFB6C1, #FFA07A);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
		font-size: 28rpx;
	}
	
	.feature-text {
		font-size: 32rpx;
		color: #34495E;
		font-weight: 500;
	}
	
	/* 描述文字 */
	.description {
		text-align: center;
		margin-bottom: 80rpx;
	}
	
	.desc-text {
		display: block;
		font-size: 32rpx;
		color: #2C3E50;
		line-height: 1.6;
		margin-bottom: 20rpx;
		font-weight: 500;
	}
	
	.desc-subtext {
		display: block;
		font-size: 26rpx;
		color: #7F8C8D;
		line-height: 1.5;
	}
	
	/* 按钮区域 */
	.button-section {
		text-align: center;
		margin-bottom: 60rpx;
	}
	
	.start-button {
		width: 400rpx;
		height: 100rpx;
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		border-radius: 50rpx;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 25rpx rgba(135, 206, 235, 0.4);
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
		color: #FFFFFF;
		margin-right: 10rpx;
	}
	
	.button-icon {
		font-size: 32rpx;
		color: #FFFFFF;
		font-weight: bold;
	}
	
	/* 底部说明 */
	.footer-info {
		text-align: center;
		position: absolute;
		bottom: 40rpx;
		left: 30rpx;
		right: 30rpx;
	}
	
	.footer-text {
		font-size: 24rpx;
		color: #BDC3C7;
		line-height: 1.4;
	}
</style>
