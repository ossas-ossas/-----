<template>
	<view class="container">
		<!-- 页面标题 -->
		<view class="page-header">
			<text class="page-title">儿童基本信息</text>
			<text class="page-subtitle">请填写孩子的详细信息，以便进行准确的发育评估</text>
		</view>
		
		<!-- 表单区域 -->
		<view class="form-container">
			<!-- 基本信息 -->
			<view class="form-section">
				<view class="section-title">
					<text class="title-text">基本信息</text>
				</view>
				
				<!-- 姓名 -->
				<view class="form-item">
					<text class="label">姓名</text>
					<input 
						class="input" 
						v-model="formData.name" 
						placeholder="请输入孩子姓名"
						placeholder-style="color: #BDC3C7"
					/>
				</view>
				
				<!-- 性别 -->
				<view class="form-item">
					<text class="label">性别</text>
					<view class="radio-group">
						<view 
							class="radio-item" 
							:class="{ active: formData.gender === 'male' }"
							@click="selectGender('male')"
						>
							<text class="radio-text">男</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: formData.gender === 'female' }"
							@click="selectGender('female')"
						>
							<text class="radio-text">女</text>
						</view>
					</view>
				</view>
				
				<!-- 出生日期 -->
				<view class="form-item">
					<text class="label">出生日期</text>
					<picker 
						mode="date" 
						:value="formData.birthDate" 
						@change="onBirthDateChange"
						:end="today"
					>
						<view class="picker-view">
							<text class="picker-text" :class="{ placeholder: !formData.birthDate }">
								{{ formData.birthDate || '请选择出生日期' }}
							</text>
							<text class="picker-icon">📅</text>
						</view>
					</picker>
				</view>
				
				<!-- 年龄显示 -->
				<view class="age-display" v-if="formData.birthDate">
					<text class="age-text">年龄：{{ calculatedAge }}</text>
				</view>
			</view>
			
			<!-- 家庭信息 -->
			<view class="form-section">
				<view class="section-title">
					<text class="title-text">家庭信息</text>
				</view>
				
				<!-- 主要照顾者 -->
				<view class="form-item">
					<text class="label">主要照顾者</text>
					<view class="radio-group">
						<view 
							class="radio-item" 
							:class="{ active: formData.caregiver === 'mother' }"
							@click="selectCaregiver('mother')"
						>
							<text class="radio-text">母亲</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: formData.caregiver === 'father' }"
							@click="selectCaregiver('father')"
						>
							<text class="radio-text">父亲</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: formData.caregiver === 'grandparent' }"
							@click="selectCaregiver('grandparent')"
						>
							<text class="radio-text">祖父母</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: formData.caregiver === 'other' }"
							@click="selectCaregiver('other')"
						>
							<text class="radio-text">其他</text>
						</view>
					</view>
				</view>
				
				<!-- 联系电话 -->
				<view class="form-item">
					<text class="label">联系电话</text>
					<input 
						class="input" 
						v-model="formData.phone" 
						placeholder="请输入联系电话"
						placeholder-style="color: #BDC3C7"
						type="number"
					/>
				</view>
			</view>
			
			<!-- 发育相关 -->
			<view class="form-section">
				<view class="section-title">
					<text class="title-text">发育相关</text>
				</view>
				
				<!-- 是否有发育迟缓史 -->
				<view class="form-item">
					<text class="label">是否有发育迟缓史</text>
					<view class="radio-group">
						<view 
							class="radio-item" 
							:class="{ active: formData.hasDelayHistory === 'no' }"
							@click="selectDelayHistory('no')"
						>
							<text class="radio-text">无</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: formData.hasDelayHistory === 'yes' }"
							@click="selectDelayHistory('yes')"
						>
							<text class="radio-text">有</text>
						</view>
					</view>
				</view>
				
				<!-- 备注 -->
				<view class="form-item">
					<text class="label">备注信息</text>
					<textarea 
						class="textarea" 
						v-model="formData.notes" 
						placeholder="如有其他需要说明的情况，请在此填写"
						placeholder-style="color: #BDC3C7"
						maxlength="200"
					/>
					<text class="char-count">{{ formData.notes.length }}/200</text>
				</view>
			</view>
		</view>
		
		<!-- 底部按钮 -->
		<view class="button-container">
			<button class="next-button" @click="goToAssessment" :disabled="!isFormValid">
				<text class="button-text">开始评估</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					name: '',
					gender: '',
					birthDate: '',
					caregiver: '',
					phone: '',
					hasDelayHistory: '',
					notes: ''
				},
				today: ''
			}
		},
		computed: {
			// 计算年龄
			calculatedAge() {
				if (!this.formData.birthDate) return ''
				const birth = new Date(this.formData.birthDate)
				const today = new Date()
				let age = today.getFullYear() - birth.getFullYear()
				const monthDiff = today.getMonth() - birth.getMonth()
				
				if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
					age--
				}
				
				if (age < 1) {
					const months = Math.floor((today - birth) / (1000 * 60 * 60 * 24 * 30))
					return `${months}个月`
				}
				
				return `${age}岁`
			},
			
			// 表单验证
			isFormValid() {
				return this.formData.name && 
					   this.formData.gender && 
					   this.formData.birthDate && 
					   this.formData.caregiver && 
					   this.formData.phone
			}
		},
		onLoad() {
			// 设置今天的日期作为最大可选日期
			const today = new Date()
			this.today = today.toISOString().split('T')[0]
		},
		methods: {
			// 选择性别
			selectGender(gender) {
				this.formData.gender = gender
			},
			
			// 选择主要照顾者
			selectCaregiver(caregiver) {
				this.formData.caregiver = caregiver
			},
			
			// 选择是否有发育迟缓史
			selectDelayHistory(hasDelay) {
				this.formData.hasDelayHistory = hasDelay
			},
			
			// 出生日期改变
			onBirthDateChange(e) {
				this.formData.birthDate = e.detail.value
			},
			
			// 跳转到评估页面
			goToAssessment() {
				if (!this.isFormValid) {
					uni.showToast({
						title: '请完善必填信息',
						icon: 'none'
					})
					return
				}
				
				// 保存儿童信息到本地存储
				uni.setStorageSync('childInfo', this.formData)
				
				// 跳转到评估页面
				uni.navigateTo({
					url: '/pages/assessment/assessment'
				})
			}
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		background: linear-gradient(135deg, #E8F4FD 0%, #F0F8FF 100%);
		padding: 30rpx;
	}
	
	/* 页面标题 */
	.page-header {
		text-align: center;
		margin-bottom: 40rpx;
	}
	
	.page-title {
		display: block;
		font-size: 40rpx;
		font-weight: bold;
		color: #2C3E50;
		margin-bottom: 15rpx;
	}
	
	.page-subtitle {
		display: block;
		font-size: 26rpx;
		color: #7F8C8D;
		line-height: 1.5;
	}
	
	/* 表单容器 */
	.form-container {
		margin-bottom: 120rpx;
	}
	
	/* 表单分组 */
	.form-section {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.section-title {
		margin-bottom: 30rpx;
		padding-bottom: 15rpx;
		border-bottom: 2rpx solid #E8F4FD;
	}
	
	.title-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #34495E;
	}
	
	/* 表单项 */
	.form-item {
		margin-bottom: 30rpx;
	}
	
	.form-item:last-child {
		margin-bottom: 0;
	}
	
	.label {
		display: block;
		font-size: 28rpx;
		color: #2C3E50;
		margin-bottom: 15rpx;
		font-weight: 500;
	}
	
	/* 输入框 */
	.input {
		width: 100%;
		height: 80rpx;
		background: #F8F9FA;
		border-radius: 15rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		color: #2C3E50;
		border: 2rpx solid transparent;
		transition: all 0.3s;
	}
	
	.input:focus {
		border-color: #87CEEB;
		background: #FFFFFF;
	}
	
	/* 单选框组 */
	.radio-group {
		display: flex;
		flex-wrap: wrap;
		gap: 15rpx;
	}
	
	.radio-item {
		flex: 1;
		min-width: 120rpx;
		height: 70rpx;
		background: #F8F9FA;
		border-radius: 15rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2rpx solid transparent;
		transition: all 0.3s;
	}
	
	.radio-item.active {
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		border-color: #87CEEB;
	}
	
	.radio-text {
		font-size: 26rpx;
		color: #2C3E50;
		font-weight: 500;
	}
	
	.radio-item.active .radio-text {
		color: #FFFFFF;
		font-weight: bold;
	}
	
	/* 日期选择器 */
	.picker-view {
		width: 100%;
		height: 80rpx;
		background: #F8F9FA;
		border-radius: 15rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 2rpx solid transparent;
		transition: all 0.3s;
	}
	
	.picker-view:active {
		border-color: #87CEEB;
		background: #FFFFFF;
	}
	
	.picker-text {
		font-size: 28rpx;
		color: #2C3E50;
	}
	
	.picker-text.placeholder {
		color: #BDC3C7;
	}
	
	.picker-icon {
		font-size: 24rpx;
	}
	
	/* 年龄显示 */
	.age-display {
		text-align: center;
		margin-top: 15rpx;
	}
	
	.age-text {
		font-size: 26rpx;
		color: #87CEEB;
		font-weight: bold;
		background: rgba(135, 206, 235, 0.1);
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
	}
	
	/* 文本域 */
	.textarea {
		width: 100%;
		min-height: 120rpx;
		background: #F8F9FA;
		border-radius: 15rpx;
		padding: 20rpx;
		font-size: 28rpx;
		color: #2C3E50;
		border: 2rpx solid transparent;
		transition: all 0.3s;
	}
	
	.textarea:focus {
		border-color: #87CEEB;
		background: #FFFFFF;
	}
	
	.char-count {
		display: block;
		text-align: right;
		font-size: 22rpx;
		color: #BDC3C7;
		margin-top: 10rpx;
	}
	
	/* 底部按钮 */
	.button-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30rpx;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10rpx);
		border-top: 1rpx solid #E8F4FD;
	}
	
	.next-button {
		width: 100%;
		height: 90rpx;
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		border-radius: 45rpx;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 25rpx rgba(135, 206, 235, 0.4);
		transition: all 0.3s;
	}
	
	.next-button:disabled {
		background: #BDC3C7;
		box-shadow: none;
	}
	
	.button-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
</style>
