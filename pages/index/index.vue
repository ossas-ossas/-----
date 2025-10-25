<template>
	<view class="container">
		<!-- 头部区域 -->
		<view class="header">
			<view class="logo-container">
				<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
			</view>
			<view class="title">知动儿童综合发育测评</view>
			<view class="subtitle">填写信息，完成发育评估，生成综合分析报告</view>
		</view>
		
		<!-- 功能介绍区域 -->
		<view class="features">
			<view class="feature-item">
				<view class="feature-icon">📋</view>
				<view class="feature-text">专业量表</view>
			</view>
			<view class="feature-item">
				<view class="feature-icon">📊</view>
				<view class="feature-text">科学评估</view>
			</view>
			<view class="feature-item">
				<view class="feature-icon">📈</view>
				<view class="feature-text">详细报告</view>
			</view>
		</view>
		
		<!-- 开始评估按钮 -->
		<view class="action-area">
			<button class="start-btn" @click="startAssessment">开始评估</button>
		</view>
		
		<!-- 底部说明 -->
		<view class="footer">
			<text class="footer-text">为您的孩子提供专业的发育评估服务</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			// 开始评估 - 跳转到儿童信息页
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
		background: linear-gradient(135deg, #F5F9FA 0%, #E8F4F8 100%);
		padding: 40rpx 30rpx;
		display: flex;
		flex-direction: column;
	}
	
	.header {
		text-align: center;
		margin-bottom: 80rpx;
	}
	
	.logo-container {
		margin-bottom: 30rpx;
	}
	
	.logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		background-color: #A8D8EA;
		padding: 20rpx;
	}
	
	.title {
		font-size: 48rpx;
		font-weight: bold;
		color: #2C405A;
		margin-bottom: 20rpx;
		line-height: 1.3;
	}
	
	.subtitle {
		font-size: 28rpx;
		color: #666;
		line-height: 1.5;
		padding: 0 20rpx;
	}
	
	.features {
		display: flex;
		justify-content: space-around;
		margin-bottom: 100rpx;
		padding: 40rpx 20rpx;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(168, 216, 234, 0.2);
	}
	
	.feature-item {
		text-align: center;
		flex: 1;
	}
	
	.feature-icon {
		font-size: 60rpx;
		margin-bottom: 15rpx;
	}
	
	.feature-text {
		font-size: 24rpx;
		color: #555;
		font-weight: 500;
	}
	
	.action-area {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.start-btn {
		width: 500rpx;
		height: 100rpx;
		background: linear-gradient(135deg, #A8D8EA 0%, #7BC4D4 100%);
		color: white;
		font-size: 32rpx;
		font-weight: bold;
		border-radius: 50rpx;
		border: none;
		box-shadow: 0 8rpx 25rpx rgba(168, 216, 234, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.start-btn:active {
		transform: translateY(2rpx);
		box-shadow: 0 4rpx 15rpx rgba(168, 216, 234, 0.4);
	}
	
	.footer {
		text-align: center;
		margin-top: 60rpx;
	}
	
	.footer-text {
		font-size: 24rpx;
		color: #999;
		line-height: 1.5;
	}
</style>
