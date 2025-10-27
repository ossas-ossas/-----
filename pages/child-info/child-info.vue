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
								{{ formData.birthDate ? formData.birthDate : '请选择出生日期' }}
							</text>
							<text class="picker-icon">📅</text>
						</view>
					</picker>
				</view>
				
				<!-- 年龄显示 -->
				<view class="age-display" v-if="formData.birthDate">
					<text class="age-text">年龄：{{ calculatedAge }}</text>
					<text class="age-range-text">评估范围：{{ ageRangeText }}</text>
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
			
			<!-- 临床与行为信息 -->
			<view class="form-section">
				<view class="section-title">
					<text class="title-text">临床与行为信息</text>
				</view>
				
				<!-- 医疗诊断 -->
				<view class="form-item">
					<text class="label">医疗诊断</text>
					<view class="checkbox-group">
						<view 
							class="checkbox-item" 
							:class="{ active: clinical.medicalDiagnosis.includes('cerebralPalsy') }"
							@click="toggleDiagnosis('cerebralPalsy')"
						>
							<text class="checkbox-text">脑瘫</text>
						</view>
						<view 
							class="checkbox-item" 
							:class="{ active: clinical.medicalDiagnosis.includes('devDelay') }"
							@click="toggleDiagnosis('devDelay')"
						>
							<text class="checkbox-text">发育迟缓</text>
						</view>
						<view 
							class="checkbox-item" 
							:class="{ active: clinical.medicalDiagnosis.includes('autism') }"
							@click="toggleDiagnosis('autism')"
						>
							<text class="checkbox-text">孤独症</text>
						</view>
						<view 
							class="checkbox-item" 
							:class="{ active: clinical.medicalDiagnosis.includes('rare') }"
							@click="toggleDiagnosis('rare')"
						>
							<text class="checkbox-text">罕见疾病</text>
						</view>
					</view>
				</view>
				
				<!-- 行走时间 -->
				<view class="form-item">
					<text class="label">行走时间</text>
					<view class="radio-group">
						<view 
							class="radio-item" 
							:class="{ active: clinical.walkingTime === 'before18m' }"
							@click="pickWalkingTime('before18m')"
						>
							<text class="radio-text">1岁半以前</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.walkingTime === 'after18m' }"
							@click="pickWalkingTime('after18m')"
						>
							<text class="radio-text">1岁半以后</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.walkingTime === 'notyet' }"
							@click="pickWalkingTime('notyet')"
						>
							<text class="radio-text">目前还不会行走</text>
						</view>
					</view>
				</view>
				
				<!-- 爬行情况 -->
				<view class="form-item">
					<text class="label">爬行情况</text>
					<view class="radio-group column">
						<view 
							class="radio-item" 
							:class="{ active: clinical.crawlStatus === 'months' }"
							@click="pickCrawlStatus('months')"
						>
							<text class="radio-text">会爬行（{{ clinical.crawlMonths ? clinical.crawlMonths : '___' }}个月）</text>
						</view>
						<view class="input-row" v-if="clinical.crawlStatus === 'months'">
							<input 
								class="number-input" 
								v-model="clinical.crawlMonths" 
								placeholder="月份"
								placeholder-style="color: #BDC3C7"
								type="number"
							/>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.crawlStatus === 'nocrawl' }"
							@click="pickCrawlStatus('nocrawl')"
						>
							<text class="radio-text">不会爬行</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.crawlStatus === 'walkThenCrawl' }"
							@click="pickCrawlStatus('walkThenCrawl')"
						>
							<text class="radio-text">先行走后再会爬行</text>
						</view>
					</view>
				</view>
				
				<!-- 跪走情况 -->
				<view class="form-item">
					<text class="label">跪走情况</text>
					<view class="radio-group">
						<view 
							class="radio-item" 
							:class="{ active: clinical.kneelWalk === true }"
							@click="clinical.kneelWalk = true"
						>
							<text class="radio-text">会跪走</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.kneelWalk === false }"
							@click="clinical.kneelWalk = false"
						>
							<text class="radio-text">目前不会跪走</text>
						</view>
					</view>
				</view>
				
				<!-- 惯用手 -->
				<view class="form-item">
					<text class="label">惯用手</text>
					<view class="radio-group">
						<view 
							class="radio-item" 
							:class="{ active: clinical.handedness === 'left' }"
							@click="clinical.handedness = 'left'"
						>
							<text class="radio-text">左手</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.handedness === 'right' }"
							@click="clinical.handedness = 'right'"
						>
							<text class="radio-text">右手</text>
						</view>
					</view>
				</view>
				
				<!-- 视觉障碍 -->
				<view class="form-item">
					<text class="label">视觉障碍</text>
					<view class="radio-group column">
						<view 
							class="radio-item" 
							:class="{ active: clinical.vision.status === 'normal' }"
							@click="pickVision('normal')"
						>
							<text class="radio-text">常态</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.vision.status === 'amblyopia' }"
							@click="pickVision('amblyopia')"
						>
							<text class="radio-text">弱视</text>
						</view>
						<view class="checkbox-sub-group" v-if="clinical.vision.status === 'amblyopia'">
							<view 
								class="checkbox-sub-item" 
								:class="{ active: clinical.vision.sub.includes('myopia') }"
								@click="pickVisionSub('myopia')"
							>
								<text class="checkbox-text">近视</text>
							</view>
							<view 
								class="checkbox-sub-item" 
								:class="{ active: clinical.vision.sub.includes('astigmatism') }"
								@click="pickVisionSub('astigmatism')"
							>
								<text class="checkbox-text">散光</text>
							</view>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.vision.status === 'strabismus' }"
							@click="pickVision('strabismus')"
						>
							<text class="radio-text">斜视</text>
						</view>
					</view>
				</view>
				
				<!-- 听觉障碍 -->
				<view class="form-item">
					<text class="label">听觉障碍</text>
					<view class="radio-group column">
						<view 
							class="radio-item" 
							:class="{ active: clinical.hearing.status === 'normal' }"
							@click="pickHearing('normal')"
						>
							<text class="radio-text">常态</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.hearing.status === 'impaired' }"
							@click="pickHearing('impaired')"
						>
							<text class="radio-text">听障</text>
						</view>
						<view v-if="clinical.hearing.status === 'impaired'" class="inline">
							<text class="label-inline">左耳</text>
							<input 
								class="number-input" 
								v-model="clinical.hearing.dbLeft" 
								placeholder="dB"
								placeholder-style="color: #BDC3C7"
								type="number"
							/>
							<text class="label-inline">右耳</text>
							<input 
								class="number-input" 
								v-model="clinical.hearing.dbRight" 
								placeholder="dB"
								placeholder-style="color: #BDC3C7"
								type="number"
							/>
						</view>
					</view>
				</view>
				
				<!-- 癫痫症 -->
				<view class="form-item">
					<text class="label">癫痫症</text>
					<view class="radio-group column">
						<view 
							class="radio-item" 
							:class="{ active: clinical.epilepsy === 'none' }"
							@click="clinical.epilepsy = 'none'"
						>
							<text class="radio-text">无</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.epilepsy === 'medicated' }"
							@click="clinical.epilepsy = 'medicated'"
						>
							<text class="radio-text">有（服药中）</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.epilepsy === 'unmedicated' }"
							@click="clinical.epilepsy = 'unmedicated'"
						>
							<text class="radio-text">有（未服药）</text>
						</view>
					</view>
				</view>
				
				<!-- 提供视频 -->
				<view class="form-item">
					<text class="label">提供视频</text>
					<text class="sub-note">生活中，关于孩子衣食住行，吃喝玩乐，喜怒哀乐、行走活动及运动等各方面视频（最多6个）</text>
					<view class="video-list">
						<view 
							v-for="(video, index) in clinical.videos" 
							:key="index" 
							class="video-item"
							@click="removeVideo(index)"
						>
							<text>视频{{ index + 1 }}</text>
						</view>
						<view 
							class="video-item" 
							v-if="clinical.videos.length < 6"
							@click="chooseVideo"
						>
							<text>+ 添加视频</text>
						</view>
					</view>
				</view>
				
				<!-- 后续居家辅导 -->
				<view class="form-item">
					<text class="label">后续居家辅导</text>
					<view class="radio-group">
						<view 
							class="radio-item" 
							:class="{ active: clinical.homeGuide === true }"
							@click="clinical.homeGuide = true"
						>
							<text class="radio-text">需要</text>
						</view>
						<view 
							class="radio-item" 
							:class="{ active: clinical.homeGuide === false }"
							@click="clinical.homeGuide = false"
						>
							<text class="radio-text">不需要</text>
						</view>
					</view>
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
				clinical: {
					medicalDiagnosis: [],
					walkingTime: '',
					crawlStatus: '',
					crawlMonths: '',
					kneelWalk: null,
					handedness: '',
					vision: { status: 'normal', sub: [] },
					hearing: { status: 'normal', dbLeft: '', dbRight: '' },
					epilepsy: 'none',
					videos: [],
					homeGuide: null
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
			
			// 计算年龄段文本
			ageRangeText() {
				if (!this.formData.birthDate) return ''
				const ageInMonths = this.calculateAgeInMonths(this.formData.birthDate)
				return this.getAgeRangeText(ageInMonths)
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
			console.log('[child-info] page loaded')
			// 设置今天的日期作为最大可选日期
			const today = new Date()
			this.today = today.toISOString().split('T')[0]
		},
		methods: {
			// 计算年龄（月）
			calculateAgeInMonths(birthDate) {
				if (!birthDate) return 0
				const birth = new Date(birthDate)
				const today = new Date()
				let ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12
				ageInMonths += today.getMonth() - birth.getMonth()
				
				// 如果日期还没到，减1个月
				if (today.getDate() < birth.getDate()) {
					ageInMonths--
				}
				
				return Math.max(0, ageInMonths)
			},
			
			// 获取年龄段文本
			getAgeRangeText(ageInMonths) {
				if (ageInMonths < 3) return '1-3个月'
				if (ageInMonths < 6) return '3-6个月'
				if (ageInMonths < 9) return '6-9个月'
				if (ageInMonths < 12) return '9-12个月'
				if (ageInMonths < 18) return '1-1.5岁'
				if (ageInMonths < 24) return '1.5-2岁'
				if (ageInMonths < 30) return '2-2.5岁'
				if (ageInMonths < 36) return '2.5-3岁'
				if (ageInMonths < 48) return '3-4岁'
				if (ageInMonths < 60) return '4-5岁'
				return '5-6岁'
			},
			
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
			
			// 切换医疗诊断
			toggleDiagnosis(value) {
				const index = this.clinical.medicalDiagnosis.indexOf(value)
				if (index === -1) {
					this.clinical.medicalDiagnosis.push(value)
				} else {
					this.clinical.medicalDiagnosis.splice(index, 1)
				}
			},
			
			// 选择行走时间
			pickWalkingTime(value) {
				this.clinical.walkingTime = value
			},
			
			// 选择爬行情况
			pickCrawlStatus(value) {
				this.clinical.crawlStatus = value
				if (value !== 'months') {
					this.clinical.crawlMonths = ''
				}
			},
			
			// 选择视觉状态
			pickVision(value) {
				this.clinical.vision.status = value
				if (value !== 'amblyopia') {
					this.clinical.vision.sub = []
				}
			},
			
			// 选择视觉子项
			pickVisionSub(value) {
				const index = this.clinical.vision.sub.indexOf(value)
				if (index === -1) {
					this.clinical.vision.sub.push(value)
				} else {
					this.clinical.vision.sub.splice(index, 1)
				}
			},
			
			// 选择听觉状态
			pickHearing(value) {
				this.clinical.hearing.status = value
				if (value !== 'impaired') {
					this.clinical.hearing.dbLeft = ''
					this.clinical.hearing.dbRight = ''
				}
			},
			
			// 选择视频
			chooseVideo() {
				uni.chooseVideo({
					sourceType: ['album', 'camera'],
					maxDuration: 30,
					success: (res) => {
						if (this.clinical.videos.length >= 6) {
							uni.showToast({
								title: '最多只能上传6个视频',
								icon: 'none'
							})
							return
						}
						this.clinical.videos.push({
							tempFilePath: res.tempFilePath,
							size: res.size,
							duration: res.duration
						})
					},
					fail: (err) => {
						console.error('选择视频失败', err)
					}
				})
			},
			
			// 删除视频
			removeVideo(index) {
				this.clinical.videos.splice(index, 1)
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
				
				// 验证临床信息
				if (this.clinical.crawlStatus === 'months' && !this.clinical.crawlMonths) {
					uni.showToast({
						title: '请输入爬行月份',
						icon: 'none'
					})
					return
				}
				
				if (this.clinical.hearing.status === 'impaired' && (!this.clinical.hearing.dbLeft || !this.clinical.hearing.dbRight)) {
					uni.showToast({
						title: '请输入听力分贝',
						icon: 'none'
					})
					return
				}
				
				// 保存儿童信息到本地存储
				const childInfo = uni.getStorageSync('childInfo') || {}
				uni.setStorageSync('childInfo', {
					...childInfo,
					...this.formData,
					clinical: this.clinical
				})
				
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
		margin-bottom: 8rpx;
	}
	
	.age-range-text {
		font-size: 22rpx;
		color: #7F8C8D;
		background: rgba(127, 140, 141, 0.1);
		padding: 8rpx 16rpx;
		border-radius: 15rpx;
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
	
	/* 复选框组 */
	.checkbox-group {
		display: flex;
		flex-wrap: wrap;
		gap: 15rpx;
	}
	
	.checkbox-item {
		flex: 1;
		min-width: 140rpx;
		height: 70rpx;
		background: #F8F9FA;
		border-radius: 15rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2rpx solid transparent;
		transition: all 0.3s;
		position: relative;
	}
	
	.checkbox-item.active {
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		border-color: #87CEEB;
	}
	
	.checkbox-item.active::after {
		content: '✓';
		position: absolute;
		right: 15rpx;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 28rpx;
	}
	
	.checkbox-text {
		font-size: 26rpx;
		color: #2C3E50;
		font-weight: 500;
	}
	
	.checkbox-item.active .checkbox-text {
		color: #FFFFFF;
		font-weight: bold;
	}
	
	/* 单选框组垂直排列 */
	.radio-group.column {
		flex-direction: column;
	}
	
	.radio-group.column .radio-item {
		width: 100%;
		justify-content: flex-start;
		text-align: left;
		padding: 0 20rpx;
	}
	
	/* 输入行 */
	.input-row {
		margin-top: 15rpx;
		display: flex;
		align-items: center;
		gap: 10rpx;
	}
	
	.number-input {
		width: 160rpx;
		height: 64rpx;
		padding: 0 16rpx;
		background: #F8F9FA;
		border: 2rpx solid #E8F4FD;
		border-radius: 10rpx;
		font-size: 26rpx;
		color: #2C3E50;
	}
	
	.number-input:focus {
		border-color: #87CEEB;
		background: #FFFFFF;
	}
	
	.inline {
		display: flex;
		align-items: center;
		gap: 16rpx;
		margin-top: 15rpx;
	}
	
	.label-inline {
		font-size: 26rpx;
		color: #7F8C8D;
	}
	
	/* 子复选框组 */
	.checkbox-sub-group {
		display: flex;
		flex-wrap: wrap;
		gap: 10rpx;
		margin-top: 15rpx;
		padding-left: 40rpx;
	}
	
	.checkbox-sub-item {
		min-width: 100rpx;
		height: 60rpx;
		background: #F8F9FA;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2rpx solid transparent;
		transition: all 0.3s;
		position: relative;
		padding: 0 20rpx;
	}
	
	.checkbox-sub-item.active {
		background: linear-gradient(135deg, #87CEEB, #98FB98);
		border-color: #87CEEB;
	}
	
	.checkbox-sub-item.active::after {
		content: '✓';
		position: absolute;
		right: 8rpx;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 24rpx;
	}
	
	/* 辅助文字 */
	.sub-note {
		font-size: 22rpx;
		color: #7F8C8D;
		margin-top: 8rpx;
		line-height: 1.5;
	}
	
	/* 视频列表 */
	.video-list {
		margin-top: 12rpx;
		display: flex;
		flex-wrap: wrap;
		gap: 12rpx;
	}
	
	.video-item {
		width: 180rpx;
		height: 120rpx;
		border-radius: 10rpx;
		background: #F5F8FF;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #7F8C8D;
		font-size: 24rpx;
		border: 2rpx solid #E8F4FD;
		transition: all 0.3s;
	}
	
	.video-item:active {
		border-color: #87CEEB;
		background: #E8F4FD;
	}
</style>
