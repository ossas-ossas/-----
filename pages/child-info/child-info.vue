<template>
	<view class="container">
		<!-- 进度条 -->
		<view class="progress-container">
			<view class="progress-bar">
				<view class="progress-fill" style="width: 33.33%"></view>
			</view>
			<view class="progress-text">Step 1 of 3</view>
		</view>
		
		<!-- 页面标题 -->
		<view class="page-header">
			<view class="header-title">儿童基本信息</view>
			<view class="header-subtitle">请填写您孩子的基本信息，以便进行准确的发育评估</view>
		</view>
		
		<!-- 表单区域 -->
		<view class="form-container">
			<!-- 姓名 -->
			<view class="form-item">
				<view class="label">姓名 <text class="required">*</text></view>
				<input 
					class="input" 
					v-model="childInfo.name" 
					placeholder="请输入孩子姓名"
					maxlength="20"
				/>
			</view>
			
			<!-- 性别 -->
			<view class="form-item">
				<view class="label">性别 <text class="required">*</text></view>
				<view class="radio-group">
					<view 
						class="radio-item" 
						:class="{ active: childInfo.gender === 'male' }"
						@click="selectGender('male')"
					>
						<view class="radio-icon">👦</view>
						<text>男</text>
					</view>
					<view 
						class="radio-item" 
						:class="{ active: childInfo.gender === 'female' }"
						@click="selectGender('female')"
					>
						<view class="radio-icon">👧</view>
						<text>女</text>
					</view>
				</view>
			</view>
			
			<!-- 出生日期 -->
			<view class="form-item">
				<view class="label">出生日期 <text class="required">*</text></view>
				<picker 
					mode="date" 
					:value="childInfo.birthDate" 
					@change="onBirthDateChange"
					:end="today"
				>
					<view class="picker-input">
						<text v-if="childInfo.birthDate">{{ childInfo.birthDate }}</text>
						<text v-else class="placeholder">请选择出生日期</text>
						<text class="picker-arrow">></text>
					</view>
				</picker>
			</view>
			
			<!-- 当前年龄显示 -->
			<view class="form-item" v-if="childInfo.birthDate">
				<view class="label">当前年龄</view>
				<view class="age-display">{{ calculatedAge }}</view>
			</view>
			
			<!-- 诊断类型 -->
			<view class="form-item">
				<view class="label">诊断类型</view>
				<view class="checkbox-group">
					<view 
						class="checkbox-item" 
						:class="{ active: childInfo.diagnosisTypes.includes('developmental_delay') }"
						@click="toggleDiagnosisType('developmental_delay')"
					>
						<view class="checkbox-icon">⏰</view>
						<text>发育迟缓</text>
					</view>
					<view 
						class="checkbox-item" 
						:class="{ active: childInfo.diagnosisTypes.includes('cerebral_palsy') }"
						@click="toggleDiagnosisType('cerebral_palsy')"
					>
						<view class="checkbox-icon">🧠</view>
						<text>脑瘫</text>
					</view>
					<view 
						class="checkbox-item" 
						:class="{ active: childInfo.diagnosisTypes.includes('autism') }"
						@click="toggleDiagnosisType('autism')"
					>
						<view class="checkbox-icon">🌟</view>
						<text>孤独症</text>
					</view>
					<view 
						class="checkbox-item" 
						:class="{ active: childInfo.diagnosisTypes.includes('rare_disease') }"
						@click="toggleDiagnosisType('rare_disease')"
					>
						<view class="checkbox-icon">🔬</view>
						<text>罕见病</text>
					</view>
				</view>
			</view>
			
			<!-- 行走情况 -->
			<view class="form-item">
				<view class="label">行走情况</view>
				<view class="radio-group">
					<view 
						class="radio-item" 
						:class="{ active: childInfo.walkingStatus === 'before_18months' }"
						@click="selectWalkingStatus('before_18months')"
					>
						<view class="radio-icon">🚶</view>
						<text>1岁半前</text>
					</view>
					<view 
						class="radio-item" 
						:class="{ active: childInfo.walkingStatus === 'after_18months' }"
						@click="selectWalkingStatus('after_18months')"
					>
						<view class="radio-icon">🚶‍♂️</view>
						<text>1岁半后</text>
					</view>
					<view 
						class="radio-item" 
						:class="{ active: childInfo.walkingStatus === 'not_yet' }"
						@click="selectWalkingStatus('not_yet')"
					>
						<view class="radio-icon">🦽</view>
						<text>尚不会</text>
					</view>
				</view>
			</view>
			
			<!-- 爬行情况 -->
			<view class="form-item">
				<view class="label">爬行情况</view>
				<view class="radio-group">
					<view 
						class="radio-item" 
						:class="{ active: childInfo.crawlingStatus === 'can_crawl' }"
						@click="selectCrawlingStatus('can_crawl')"
					>
						<view class="radio-icon">🐛</view>
						<text>会</text>
					</view>
					<view 
						class="radio-item" 
						:class="{ active: childInfo.crawlingStatus === 'cannot_crawl' }"
						@click="selectCrawlingStatus('cannot_crawl')"
					>
						<view class="radio-icon">❌</view>
						<text>不会</text>
					</view>
					<view 
						class="radio-item" 
						:class="{ active: childInfo.crawlingStatus === 'walk_first' }"
						@click="selectCrawlingStatus('walk_first')"
					>
						<view class="radio-icon">🚶‍♀️</view>
						<text>先走后爬</text>
					</view>
				</view>
			</view>
			
			<!-- 惯用手 -->
			<view class="form-item">
				<view class="label">惯用手</view>
				<view class="radio-group">
					<view 
						class="radio-item" 
						:class="{ active: childInfo.handedness === 'left' }"
						@click="selectHandedness('left')"
					>
						<view class="radio-icon">👈</view>
						<text>左</text>
					</view>
					<view 
						class="radio-item" 
						:class="{ active: childInfo.handedness === 'right' }"
						@click="selectHandedness('right')"
					>
						<view class="radio-icon">👉</view>
						<text>右</text>
					</view>
				</view>
			</view>
			
			<!-- 视觉与听觉 -->
			<view class="form-item">
				<view class="label">视觉与听觉</view>
				<view class="radio-group">
					<view 
						class="radio-item" 
						:class="{ active: childInfo.sensoryStatus === 'normal' }"
						@click="selectSensoryStatus('normal')"
					>
						<view class="radio-icon">👁️👂</view>
						<text>常态</text>
					</view>
					<view 
						class="radio-item" 
						:class="{ active: childInfo.sensoryStatus === 'abnormal' }"
						@click="selectSensoryStatus('abnormal')"
					>
						<view class="radio-icon">⚠️</view>
						<text>异常</text>
					</view>
				</view>
			</view>
			
			<!-- 备注信息 -->
			<view class="form-item">
				<view class="label">备注</view>
				<textarea 
					class="textarea" 
					v-model="childInfo.notes" 
					placeholder="如有特殊情况或需要特别关注的地方，请在此说明"
					maxlength="200"
				></textarea>
			</view>
		</view>
		
		<!-- 底部按钮 -->
		<view class="footer-actions">
			<button class="btn-secondary" @click="goBack">返回</button>
			<button class="btn-primary" @click="nextStep" :disabled="!canProceed">保存并继续</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				childInfo: {
					name: '',
					gender: '',
					birthDate: '',
					diagnosisTypes: [],
					walkingStatus: '',
					crawlingStatus: '',
					handedness: '',
					sensoryStatus: '',
					notes: ''
				},
				today: ''
			}
		},
		computed: {
			// 计算年龄
			calculatedAge() {
				if (!this.childInfo.birthDate) return '';
				const birth = new Date(this.childInfo.birthDate);
				const today = new Date();
				const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + 
								   (today.getMonth() - birth.getMonth());
				
				if (ageInMonths < 12) {
					return `${ageInMonths}个月`;
				} else {
					const years = Math.floor(ageInMonths / 12);
					const months = ageInMonths % 12;
					return months > 0 ? `${years}岁${months}个月` : `${years}岁`;
				}
			},
			// 检查是否可以进入下一步
			canProceed() {
				return this.childInfo.name.trim() && 
					   this.childInfo.gender && 
					   this.childInfo.birthDate;
			}
		},
		onLoad() {
			// 设置今天的日期作为最大可选日期
			const today = new Date();
			this.today = today.toISOString().split('T')[0];
		},
		methods: {
			// 选择性别
			selectGender(gender) {
				this.childInfo.gender = gender;
			},
			
			// 出生日期改变
			onBirthDateChange(e) {
				this.childInfo.birthDate = e.detail.value;
			},
			
			// 切换诊断类型
			toggleDiagnosisType(type) {
				const index = this.childInfo.diagnosisTypes.indexOf(type);
				if (index > -1) {
					this.childInfo.diagnosisTypes.splice(index, 1);
				} else {
					this.childInfo.diagnosisTypes.push(type);
				}
			},
			
			// 选择行走情况
			selectWalkingStatus(status) {
				this.childInfo.walkingStatus = status;
			},
			
			// 选择爬行情况
			selectCrawlingStatus(status) {
				this.childInfo.crawlingStatus = status;
			},
			
			// 选择惯用手
			selectHandedness(hand) {
				this.childInfo.handedness = hand;
			},
			
			// 选择视觉与听觉状态
			selectSensoryStatus(status) {
				this.childInfo.sensoryStatus = status;
			},
			
			// 返回上一页
			goBack() {
				uni.navigateBack();
			},
			
			// 进入下一步
			nextStep() {
				// 表单验证
				if (!this.childInfo.name.trim()) {
					uni.showToast({
						title: '请输入孩子姓名',
						icon: 'none'
					});
					return;
				}
				
				if (!this.childInfo.gender) {
					uni.showToast({
						title: '请选择孩子性别',
						icon: 'none'
					});
					return;
				}
				
				if (!this.childInfo.birthDate) {
					uni.showToast({
						title: '请选择出生日期',
						icon: 'none'
					});
					return;
				}
				
				// 保存儿童信息到全局存储
				uni.setStorageSync('childInfo', this.childInfo);
				
				// 跳转到评估页面
				uni.navigateTo({
					url: '/pages/assessment/assessment'
				});
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
	
	/* 进度条样式 */
	.progress-container {
		background-color: white;
		border-radius: 15rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(168, 216, 234, 0.1);
	}
	
	.progress-bar {
		height: 8rpx;
		background-color: #E8F4F8;
		border-radius: 4rpx;
		overflow: hidden;
		margin-bottom: 15rpx;
	}
	
	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #A8D8EA 0%, #7BC4D4 100%);
		transition: width 0.3s ease;
	}
	
	.progress-text {
		text-align: center;
		font-size: 24rpx;
		color: #666;
		font-weight: 500;
	}
	
	.page-header {
		text-align: center;
		margin-bottom: 40rpx;
	}
	
	.header-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #2C405A;
		margin-bottom: 15rpx;
	}
	
	.header-subtitle {
		font-size: 28rpx;
		color: #666;
		line-height: 1.4;
	}
	
	.form-container {
		background-color: white;
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		margin-bottom: 40rpx;
		box-shadow: 0 4rpx 20rpx rgba(168, 216, 234, 0.1);
	}
	
	.form-item {
		margin-bottom: 50rpx;
	}
	
	.form-item:last-child {
		margin-bottom: 0;
	}
	
	.label {
		font-size: 32rpx;
		color: #333;
		margin-bottom: 25rpx;
		font-weight: 600;
	}
	
	.required {
		color: #FFB6C1;
		margin-left: 8rpx;
		font-size: 28rpx;
	}
	
	.input {
		width: 100%;
		height: 90rpx;
		border: 2rpx solid #E8F4F8;
		border-radius: 12rpx;
		padding: 0 25rpx;
		font-size: 32rpx;
		background-color: #FAFAFA;
		transition: all 0.3s ease;
	}
	
	.input:focus {
		border-color: #A8D8EA;
		background-color: white;
		box-shadow: 0 0 0 4rpx rgba(168, 216, 234, 0.1);
	}
	
	.radio-group {
		display: flex;
		gap: 20rpx;
		flex-wrap: wrap;
	}
	
	.radio-item {
		flex: 1;
		min-width: 150rpx;
		height: 110rpx;
		border: 2rpx solid #E8F4F8;
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #FAFAFA;
		transition: all 0.3s ease;
		cursor: pointer;
	}
	
	.radio-item.active {
		border-color: #A8D8EA;
		background-color: #E8F4F8;
		transform: translateY(-2rpx);
		box-shadow: 0 4rpx 15rpx rgba(168, 216, 234, 0.2);
	}
	
	.radio-icon {
		font-size: 45rpx;
		margin-bottom: 10rpx;
	}
	
	.radio-item text {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}
	
	.picker-input {
		height: 90rpx;
		border: 2rpx solid #E8F4F8;
		border-radius: 12rpx;
		padding: 0 25rpx;
		background-color: #FAFAFA;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32rpx;
		transition: all 0.3s ease;
	}
	
	.picker-input:active {
		border-color: #A8D8EA;
		background-color: white;
	}
	
	.placeholder {
		color: #999;
	}
	
	.picker-arrow {
		color: #A8D8EA;
		font-size: 28rpx;
		font-weight: bold;
	}
	
	.age-display {
		font-size: 32rpx;
		color: #A8D8EA;
		font-weight: bold;
		padding: 25rpx;
		background-color: #E8F4F8;
		border-radius: 12rpx;
		text-align: center;
		border: 2rpx solid #A8D8EA;
	}
	
	.checkbox-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20rpx;
	}
	
	.checkbox-item {
		height: 130rpx;
		border: 2rpx solid #E8F4F8;
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #FAFAFA;
		transition: all 0.3s ease;
		cursor: pointer;
	}
	
	.checkbox-item.active {
		border-color: #A8D8EA;
		background-color: #E8F4F8;
		transform: translateY(-2rpx);
		box-shadow: 0 4rpx 15rpx rgba(168, 216, 234, 0.2);
	}
	
	.checkbox-icon {
		font-size: 45rpx;
		margin-bottom: 10rpx;
	}
	
	.checkbox-item text {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}
	
	.textarea {
		width: 100%;
		min-height: 140rpx;
		border: 2rpx solid #E8F4F8;
		border-radius: 12rpx;
		padding: 25rpx;
		font-size: 32rpx;
		background-color: #FAFAFA;
		transition: all 0.3s ease;
		line-height: 1.5;
	}
	
	.textarea:focus {
		border-color: #A8D8EA;
		background-color: white;
		box-shadow: 0 0 0 4rpx rgba(168, 216, 234, 0.1);
	}
	
	.footer-actions {
		display: flex;
		gap: 20rpx;
		padding: 0 10rpx;
		margin-bottom: 30rpx;
	}
	
	.btn-secondary {
		flex: 1;
		height: 90rpx;
		background-color: white;
		color: #666;
		border: 2rpx solid #E8F4F8;
		border-radius: 45rpx;
		font-size: 32rpx;
		font-weight: 500;
		transition: all 0.3s ease;
	}
	
	.btn-secondary:active {
		background-color: #F5F9FA;
		border-color: #A8D8EA;
	}
	
	.btn-primary {
		flex: 2;
		height: 90rpx;
		background: linear-gradient(135deg, #A8D8EA 0%, #7BC4D4 100%);
		color: white;
		border: none;
		border-radius: 45rpx;
		font-size: 32rpx;
		font-weight: bold;
		box-shadow: 0 8rpx 25rpx rgba(168, 216, 234, 0.4);
		transition: all 0.3s ease;
	}
	
	.btn-primary:active {
		transform: translateY(2rpx);
		box-shadow: 0 4rpx 15rpx rgba(168, 216, 234, 0.4);
	}
	
	.btn-primary:disabled {
		background: #E8F4F8;
		color: #999;
		box-shadow: none;
		transform: none;
	}
</style>
