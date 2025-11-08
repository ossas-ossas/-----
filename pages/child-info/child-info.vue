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
			
			<!-- 备注信息 -->
			<view class="form-section">
				<view class="section-title">
					<text class="title-text">备注信息</text>
				</view>
				
				<!-- 备注 -->
				<view class="form-item">
					<text class="label">其他需要说明的情况</text>
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
	import { checkLoginStatus, requireLogin, handleLoginError, canCallCloudFunction, getUserStorageKey, clearUserData, getCurrentUserId } from '@/common/auth.js';
	
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
		methods: {
			
			// 恢复本地保存的数据（登录成功后使用，使用用户专属存储）
			restoreLocalData() {
				// 先尝试从用户专属存储读取
				const userKey = getUserStorageKey('childInfo');
				const savedChildInfo = uni.getStorageSync(userKey) || uni.getStorageSync('childInfo')
				if (savedChildInfo && Object.keys(savedChildInfo).length > 0) {
					console.log('[child-info] 恢复本地保存的数据')
					// 恢复基本信息
					if (savedChildInfo.name) this.formData.name = savedChildInfo.name
					if (savedChildInfo.gender) this.formData.gender = savedChildInfo.gender
					if (savedChildInfo.birthDate) this.formData.birthDate = savedChildInfo.birthDate
					if (savedChildInfo.caregiver) this.formData.caregiver = savedChildInfo.caregiver
					if (savedChildInfo.phone) this.formData.phone = savedChildInfo.phone
					if (savedChildInfo.notes) this.formData.notes = savedChildInfo.notes
					
					// 恢复临床信息
					if (savedChildInfo.clinical) {
						this.clinical = { ...this.clinical, ...savedChildInfo.clinical }
					}
					
					uni.showToast({
						title: '已恢复之前填写的数据',
						icon: 'success',
						duration: 1500
					})
				}
			},
			
			// 选择性别
			selectGender(gender) {
				this.formData.gender = gender
			},
			
			// 选择主要照顾者
			selectCaregiver(caregiver) {
				this.formData.caregiver = caregiver
			},
			
			
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
			async goToAssessment() {
				// 先验证表单完整性
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
				
				// 检查登录状态（使用统一的登录检查工具）
				if (!canCallCloudFunction({ showToast: false })) {
					// 保存数据到本地，避免丢失（使用用户专属存储）
					// 注意：不在这里声明 childInfo，避免作用域冲突
					const loginChildInfo = {
						...this.formData,
						clinical: this.clinical
					}
					// 提示登录
					requireLogin({
						redirectUrl: '/pages/child-info/child-info',
						saveData: true,
						dataToSave: loginChildInfo
					})
					return
				}
				
				// 检查是否已有 childId 且数据未变化，直接跳转
				const existingChildId = this.formData.childId || this.clinical.childId;
				if (existingChildId) {
					// 检查数据是否有变化（简单比较关键字段）
					const userKey = getUserStorageKey('childInfo');
					const savedChildInfo = uni.getStorageSync(userKey) || uni.getStorageSync('childInfo');
					
					if (savedChildInfo && savedChildInfo.childId === existingChildId) {
						const dataChanged = 
							savedChildInfo.name !== this.formData.name ||
							savedChildInfo.gender !== this.formData.gender ||
							savedChildInfo.birthDate !== this.formData.birthDate ||
							savedChildInfo.caregiver !== this.formData.caregiver ||
							savedChildInfo.phone !== this.formData.phone;
						
						if (!dataChanged) {
							// 数据未变化，直接跳转，不保存
							console.log('[child-info] 数据未变化，跳过保存，直接跳转');
							const childInfo = {
								...this.formData,
								clinical: this.clinical,
								childId: existingChildId
							}
							uni.setStorageSync(userKey, childInfo);
							uni.setStorageSync('childInfo', childInfo);
							
							// 清除旧草稿
							const draftKey = getUserStorageKey('assessmentDraft');
							uni.removeStorageSync(draftKey);
							uni.removeStorageSync('assessmentDraft');
							
							uni.navigateTo({
								url: '/pages/assessment/assessment'
							})
							return
						}
					}
				}
				
				// 显示加载提示
				uni.showLoading({
					title: '保存中...',
					mask: true
				})
				
				try {
					// 准备数据
					const clinical = this.clinical
					
					// 转换诊断数据格式
					const diagnosis = clinical.medicalDiagnosis || []
					
					// 准备 habits 对象
					const habits = {
						walkTime: clinical.walkingTime || '',
						crawl: clinical.crawlStatus || '',
						crawlMonths: clinical.crawlMonths || '',
						kneel: clinical.kneelWalk,
						hand: clinical.handedness || ''
					}
					
					// 优化视频数据：只保留必要信息，不传输大文件
					// 视频文件应该先上传到云存储，这里只保存引用
					const optimizedVideos = (clinical.videos || []).map(video => {
						if (typeof video === 'string') {
							return { url: video };
						}
						// 如果是临时文件，只保留路径，不传输完整文件数据
						if (video.tempFilePath) {
							return { tempFilePath: video.tempFilePath };
						}
						// 如果已有云存储URL，只保留URL
						if (video.url) {
							return { url: video.url };
						}
						return video;
					});
					
					// 提前声明存储键，避免在条件分支中重复声明
					let userKey = null;
					
					// 准备保存数据（排除大文件）
					const saveData = {
						name: this.formData.name,
						gender: this.formData.gender,
						birthDate: this.formData.birthDate,
						diagnosis: diagnosis,
						habits: habits,
						vision: clinical.vision || { status: 'normal', sub: [] },
						hearing: clinical.hearing || { status: 'normal', dbLeft: '', dbRight: '' },
						epilepsy: clinical.epilepsy || 'none',
						caregiver: this.formData.caregiver || '',
						phone: this.formData.phone || '',
						videos: optimizedVideos, // 使用优化后的视频数据
						homeGuide: clinical.homeGuide,
						notes: this.formData.notes || ''
					}
					
					// 如果有 childId，添加到保存数据中（用于更新而不是创建）
					if (existingChildId) {
						saveData.childId = existingChildId;
					}
					
					// 调用云函数保存到数据库（带重试机制）
					let saveResult;
					let retryCount = 0;
					const maxRetries = 2;
					
					while (retryCount <= maxRetries) {
						try {
							saveResult = await uniCloud.callFunction({
								name: 'saveChildProfile',
								data: saveData
							})
							break; // 成功则退出循环
						} catch (error) {
							retryCount++;
							const errorMsg = error.message || String(error);
							
							// 检查是否是资源耗尽错误
							if (errorMsg.includes('resource exhausted') || errorMsg.includes('资源耗尽')) {
								if (retryCount <= maxRetries) {
									console.warn(`[child-info] 数据库资源耗尽，等待 ${retryCount * 2} 秒后重试 (${retryCount}/${maxRetries})`);
									// 等待后重试
									await new Promise(resolve => setTimeout(resolve, retryCount * 2000));
									continue;
								} else {
									// 重试次数用完，保存到本地
									console.error('[child-info] 数据库资源耗尽，保存到本地');
									uni.hideLoading();
									
									const childInfo = {
										...this.formData,
										clinical: this.clinical,
										childId: existingChildId || null
									}
									userKey = getUserStorageKey('childInfo');
									uni.setStorageSync(userKey, childInfo);
									uni.setStorageSync('childInfo', childInfo);
									
									uni.showModal({
										title: '保存失败',
										content: '数据库暂时繁忙，数据已保存到本地。您可以稍后重试，或直接开始评估（数据会在后台同步）。',
										showCancel: true,
										confirmText: '继续评估',
										cancelText: '稍后重试',
										success: (res) => {
											if (res.confirm) {
												// 清除旧草稿
												const draftKey = getUserStorageKey('assessmentDraft');
												uni.removeStorageSync(draftKey);
												uni.removeStorageSync('assessmentDraft');
												
												uni.navigateTo({
													url: '/pages/assessment/assessment'
												})
											}
										}
									});
									return;
								}
							} else {
								// 其他错误，直接抛出
								throw error;
							}
						}
					}
					
					uni.hideLoading()
					
					// 检查返回结果
					if (!saveResult || !saveResult.result) {
						console.error('[child-info] 保存返回结果异常:', saveResult);
						// 保存到本地并提示
						const childInfo = {
							...this.formData,
							clinical: this.clinical,
							childId: existingChildId || null
						}
						userKey = getUserStorageKey('childInfo');
						uni.setStorageSync(userKey, childInfo);
						uni.setStorageSync('childInfo', childInfo);
						
						uni.showModal({
							title: '保存异常',
							content: '服务器返回异常，数据已保存到本地。您可以继续评估，或稍后重试保存。',
							showCancel: true,
							confirmText: '继续评估',
							cancelText: '取消',
							success: (res) => {
								if (res.confirm) {
									const draftKey = getUserStorageKey('assessmentDraft');
									uni.removeStorageSync(draftKey);
									uni.removeStorageSync('assessmentDraft');
									
									uni.navigateTo({
										url: '/pages/assessment/assessment'
									})
								}
							}
						});
						return;
					}
					
					// 调试：打印完整响应
					console.log('[child-info] 保存结果:', saveResult)
					console.log('[child-info] success:', saveResult.success)
					console.log('[child-info] errCode:', saveResult.errCode)
					// 详细打印响应结构
					console.log('[child-info] result:', saveResult.result)
					console.log('[child-info] result.code:', saveResult.result?.code)
					console.log('[child-info] result.msg:', saveResult.result?.msg)
					console.log('[child-info] result.data:', saveResult.result?.data)
					
					// 判断成功条件：
					// 1. uniCloud调用成功：success为true且errCode为0
					// 2. 云函数返回成功：result.code为0或不存在，且不是错误码
					// 3. 有返回数据：尝试从多个位置提取childId
					const cloudCallSuccess = saveResult.success === true && saveResult.errCode === 0;
					
					const result = saveResult.result || {};
					
					// 首先尝试从多个位置提取 childId（更宽松的策略）
					// 云函数返回格式可能是：
					// 1. { code: 0, msg: 'success', data: { id: 'xxx', isNew: true } }
					// 2. { code: 0, data: { id: 'xxx' } }
					// 3. { id: 'xxx' } （直接在 result 下）
					const childIdFromDataId = result.data?.id;
					const childIdFromData_id = result.data?._id;
					const childIdFromResultId = result.id;
					const childIdFromResultChildId = result.childId;
					
					// 尝试所有可能的位置
					const possibleChildId = childIdFromDataId || 
					                        childIdFromData_id || 
					                        childIdFromResultId || 
					                        childIdFromResultChildId;
					
					// 判断是否成功：
					// 1. uniCloud 调用成功
					// 2. 云函数没有返回明确的错误码（code 为 0 或不存在，且 msg 不是错误信息）
					// 3. 或者找到了 childId（即使其他判断失败，只要有 childId 就认为成功）
					const hasErrorCode = result.code !== undefined && result.code !== null;
					const hasErrorMsg = result.msg && 
					                    result.msg !== 'success' && 
					                    !result.msg.includes('成功') &&
					                    (result.msg.includes('失败') || result.msg.includes('错误') || result.msg.includes('无效'));
					
					// 如果有明确的错误码且不是 0，或者有错误消息，则失败
					const hasExplicitError = (hasErrorCode && result.code !== 0) || hasErrorMsg;
					
					// 成功判断：调用成功 + 没有明确错误 + 有 childId
					const isSuccess = cloudCallSuccess && !hasExplicitError && !!possibleChildId;
					
					console.log('[child-info] 判断结果:', {
						cloudCallSuccess,
						hasExplicitError,
						possibleChildId,
						isSuccess,
						hasErrorCode,
						hasErrorMsg,
						resultCode: result.code,
						resultMsg: result.msg,
						resultData: result.data,
						childIdSources: {
							dataId: childIdFromDataId,
							data_id: childIdFromData_id,
							resultId: childIdFromResultId,
							resultChildId: childIdFromResultChildId
						},
						fullResult: JSON.stringify(result, null, 2)
					});
					
					if (isSuccess) {
						const childId = possibleChildId;
						
						// 保存儿童信息到本地存储（包含 childId，用于评估页面，使用用户专属存储）
						const childInfo = {
							...this.formData,
							clinical: this.clinical,
							childId: childId // 保存数据库返回的ID
						}
						userKey = getUserStorageKey('childInfo');
						uni.setStorageSync(userKey, childInfo);
						uni.setStorageSync('childInfo', childInfo); // 兼容旧数据
						
						// 清除本地备份数据（已成功保存到云端，不再需要备份）
						// 注意：不要清除 childInfo，因为评估页面需要使用 childId
						
						uni.showToast({
							title: '保存成功',
							icon: 'success'
						})
						
						// 清除旧草稿（新评估开始，使用用户专属存储）
						const draftKey = getUserStorageKey('assessmentDraft');
						uni.removeStorageSync(draftKey);
						uni.removeStorageSync('assessmentDraft'); // 兼容旧数据
						
						// 跳转到评估页面
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/assessment/assessment'
							})
						}, 500)
					} else {
						// 保存失败，使用统一的错误处理
						console.error('[child-info] 保存失败:', saveResult)
						
						// 检查是否是资源耗尽错误
						const errorMsg = saveResult.result?.msg || saveResult.result?.error || '';
						const isResourceExhausted = errorMsg.includes('resource exhausted') || 
						                           errorMsg.includes('资源耗尽') ||
						                           errorMsg.includes('db write action failed');
						
						if (isResourceExhausted) {
							console.error('[child-info] 数据库资源耗尽错误');
							// 保存到本地并提示
							const childInfo = {
								...this.formData,
								clinical: this.clinical,
								childId: existingChildId || null
							}
							userKey = getUserStorageKey('childInfo');
							uni.setStorageSync(userKey, childInfo);
							uni.setStorageSync('childInfo', childInfo);
							
							uni.showModal({
								title: '数据库繁忙',
								content: '数据库暂时繁忙，数据已保存到本地。您可以继续评估，系统会在后台自动重试保存。',
								showCancel: true,
								confirmText: '继续评估',
								cancelText: '稍后重试',
								success: (res) => {
									if (res.confirm) {
										const draftKey = getUserStorageKey('assessmentDraft');
										uni.removeStorageSync(draftKey);
										uni.removeStorageSync('assessmentDraft');
										
										uni.navigateTo({
											url: '/pages/assessment/assessment'
										})
									}
								}
							});
							return;
						}
						
						console.error('[child-info] 失败原因分析:', {
							cloudCallSuccess,
							hasExplicitError,
							possibleChildId,
							isSuccess,
							resultExists: !!saveResult.result,
							dataExists: !!saveResult.result?.data,
							dataContent: saveResult.result?.data,
							errorMsg: errorMsg
						});
						
						// 如果调用成功但没有明确错误，再次尝试深度搜索 childId（兼容不同的返回格式）
						if (cloudCallSuccess && !hasExplicitError && !possibleChildId) {
							console.warn('[child-info] 云函数调用成功但未找到 childId，尝试深度搜索');
							console.warn('[child-info] result 完整内容:', JSON.stringify(saveResult.result, null, 2));
							console.warn('[child-info] saveResult 完整内容:', JSON.stringify(saveResult, null, 2));
							
							// 深度搜索 childId（可能在嵌套的对象中）
							const deepSearchChildId = (
								saveResult.result?.data?.id ||
								saveResult.result?.data?._id ||
								saveResult.result?.data?.childId ||
								saveResult.result?.id ||
								saveResult.result?._id ||
								saveResult.result?.childId ||
								saveResult.id ||
								saveResult._id ||
								saveResult.childId
							);
							
							if (deepSearchChildId) {
								// 找到了ID，继续处理
								console.log('[child-info] 深度搜索找到 childId:', deepSearchChildId);
								const childInfo = {
									...this.formData,
									clinical: this.clinical,
									childId: deepSearchChildId
								}
								const userKey = getUserStorageKey('childInfo');
								uni.setStorageSync(userKey, childInfo);
								uni.setStorageSync('childInfo', childInfo);
								
								uni.showToast({
									title: '保存成功',
									icon: 'success'
								});
								
								const draftKey = getUserStorageKey('assessmentDraft');
								uni.removeStorageSync(draftKey);
								uni.removeStorageSync('assessmentDraft');
								
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/assessment/assessment'
									})
								}, 500);
								return;
							}
						}
						
						// 准备数据（统一使用，避免重复声明）
						const childInfo = {
							...this.formData,
							clinical: this.clinical
						}
						
						// 检查是否是登录错误，统一处理
						// 传入完整的 saveResult，让 handleLoginError 判断
						// 注意：即使 uniCloud 调用成功，如果云函数返回 NOT_LOGIN，也应该当作登录错误
						if (handleLoginError(saveResult, {
							redirectUrl: '/pages/child-info/child-info',
							saveData: true,
							dataToSave: childInfo
						})) {
							// 已处理登录错误，直接返回
							return
						}
						
						// 其他错误，保存到本地并提示（使用用户专属存储）
						// 使用已声明的 errorMsg，如果没有则使用默认值
						const finalErrorMsg = errorMsg || saveResult.result?.message || '保存失败'
						userKey = getUserStorageKey('childInfo');
						uni.setStorageSync(userKey, childInfo);
						uni.setStorageSync('childInfo', childInfo); // 兼容旧数据
						
						uni.showToast({
							title: finalErrorMsg + '，已保存到本地',
							icon: 'none',
							duration: 3000
						})
						
						// 清除旧草稿（新评估开始，使用用户专属存储）
						const draftKey = getUserStorageKey('assessmentDraft');
						uni.removeStorageSync(draftKey);
						uni.removeStorageSync('assessmentDraft'); // 兼容旧数据
						
						// 即使失败也允许继续，因为已保存到本地
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/assessment/assessment'
							})
						}, 2000)
					}
				} catch (error) {
					uni.hideLoading()
					console.error('[child-info] 保存儿童信息异常:', error)
					
					const errorMsg = error.message || String(error);
					const isResourceExhausted = errorMsg.includes('resource exhausted') || 
					                           errorMsg.includes('资源耗尽') ||
					                           errorMsg.includes('db write action failed');
					
					// 出错时仍保存到本地存储（使用用户专属存储）
					const existingChildId = this.formData.childId || this.clinical.childId;
					const childInfo = {
						...this.formData,
						clinical: this.clinical,
						childId: existingChildId || null
					}
					const errorUserKey = getUserStorageKey('childInfo');
					uni.setStorageSync(errorUserKey, childInfo);
					uni.setStorageSync('childInfo', childInfo); // 兼容旧数据
					
					if (isResourceExhausted) {
						uni.showModal({
							title: '数据库繁忙',
							content: '数据库暂时繁忙，数据已保存到本地。您可以继续评估，或稍后重试保存。',
							showCancel: true,
							confirmText: '继续评估',
							cancelText: '稍后重试',
							success: (res) => {
								if (res.confirm) {
									const draftKey = getUserStorageKey('assessmentDraft');
									uni.removeStorageSync(draftKey);
									uni.removeStorageSync('assessmentDraft');
									
									uni.navigateTo({
										url: '/pages/assessment/assessment'
									})
								}
							}
						});
					} else {
						uni.showToast({
							title: '网络错误，已保存到本地',
							icon: 'none',
							duration: 2000
						})
						
						// 清除旧草稿（新评估开始）
						const draftKey = getUserStorageKey('assessmentDraft');
						uni.removeStorageSync(draftKey);
						uni.removeStorageSync('assessmentDraft');
						
						// 允许继续使用本地数据
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/assessment/assessment'
							})
						}, 1500)
					}
				}
			}
		},
		onLoad() {
			console.log('[child-info] page loaded')
			
			// 设置今天的日期作为最大可选日期
			const today = new Date()
			this.today = today.toISOString().split('T')[0]
			
			// 登录守卫：页面加载时检查，只在确实需要时跳转
			const loginStatus = checkLoginStatus();
			console.log('[child-info] 登录状态:', loginStatus);
			
			if (!requireLogin({
				redirectUrl: '/pages/child-info/child-info'
			})) {
				return // 未登录，已跳转到登录页
			}
			
			// 检查是否是新用户登录（通过比较当前用户ID和本地存储的用户ID）
			// 只在用户切换时才清除数据，避免同一用户多次创建 child profile 时丢失数据
			const currentUserId = getCurrentUserId();
			const lastUserId = uni.getStorageSync('lastUserId');
			
			if (currentUserId && currentUserId !== lastUserId) {
				// 检测到用户切换，清除旧用户的数据
				console.log('[child-info] 检测到用户切换，清除旧用户数据');
				clearUserData();
				// 保存当前用户ID
				uni.setStorageSync('lastUserId', currentUserId);
			} else if (!currentUserId) {
				// 未登录，清除所有数据
				clearUserData();
			} else {
				// 同一用户，不清除数据（允许用户创建多个 child profile）
				console.log('[child-info] 同一用户，保留现有数据');
			}
			
			// 尝试恢复当前用户保存的本地数据
			this.restoreLocalData()
			
			// 如果是从结果页返回（重新评估），检查是否有 childId
			// 如果有 childId，说明是重新评估，不需要重新保存
			const userKey = getUserStorageKey('childInfo');
			const savedChildInfo = uni.getStorageSync(userKey) || uni.getStorageSync('childInfo');
			if (savedChildInfo && savedChildInfo.childId) {
				// 恢复 childId 到表单数据中
				this.formData.childId = savedChildInfo.childId;
				this.clinical.childId = savedChildInfo.childId;
				console.log('[child-info] 检测到已有 childId，重新评估模式:', savedChildInfo.childId);
			}
		},
		onShow() {
			// 静默检查登录状态，不打断用户操作
			// 只在 token 确实失效时记录日志，等用户操作时再提示
			const status = checkLoginStatus();
			if (!status.isLoggedIn) {
				console.warn('[child-info] Token 已失效，保存时将提示登录');
			}
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		background: linear-gradient(135deg, #E8F4FD 0%, #F0F8FF 100%);
		padding: 30rpx;
		position: relative;
		overflow: hidden;
	}
	
	/* 移除背景图装饰，微信小程序不支持 WXSS 中使用本地图片 */
	
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
		border-color: #E93A8A;
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
		background: linear-gradient(135deg, #E93A8A, #009FC2);
		border-color: #E93A8A;
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
		border-color: #E93A8A;
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
		color: #E93A8A;
		font-weight: bold;
		background: rgba(233, 58, 138, 0.1);
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
		border-color: #E93A8A;
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
		background: linear-gradient(135deg, #E93A8A, #009FC2);
		border-radius: 45rpx;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 30rpx rgba(233, 58, 138, 0.4);
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
		background: linear-gradient(135deg, #E93A8A, #009FC2);
		border-color: #E93A8A;
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
		border-color: #E93A8A;
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
		background: linear-gradient(135deg, #E93A8A, #009FC2);
		border-color: #E93A8A;
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
		border-color: #E93A8A;
		background: #FFF0F5;
	}
</style>
