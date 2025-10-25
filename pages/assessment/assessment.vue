<template>
  <view class="assessment-page">
    <!-- 进度条 -->
    <view class="progress-section">
      <view class="step-info">
        <text class="step-text">Step 2 of 3</text>
        <text class="progress-text">{{ progressText }}</text>
      </view>
      <view class="progress-bar">
        <view class="progress-fill" :style="{ width: progressPercentage + '%' }"></view>
      </view>
    </view>

    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">评估量表</text>
      <text class="page-subtitle">请根据孩子的实际情况选择最符合的选项</text>
    </view>

    <!-- 评估表单 -->
    <view class="assessment-form">
      <uni-collapse>
        <uni-collapse-item 
          v-for="(questions, domain) in formState" 
          :key="domain"
          :title="domain"
          :subtitle="`${getAnsweredCount(domain)}/${questions.length} 题已答`"
          :open="expandedDomains.includes(domain)"
          @change="onCollapseChange(domain, $event)"
        >
          <view class="questions-container">
            <view 
              v-for="(question, index) in questions" 
              :key="question.id"
              class="question-item"
            >
              <view class="question-header">
                <text class="question-number">{{ question.id }}</text>
                <text class="question-text">{{ question.text }}</text>
              </view>
              
              <radio-group 
                :name="`${domain}-${question.id}`"
                @change="onAnswerChange(domain, index, $event)"
              >
                <label 
                  v-for="option in question.options" 
                  :key="option"
                  class="option-item"
                  :class="{ 'selected': question.answer === option }"
                >
                  <radio 
                    :value="option" 
                    :checked="question.answer === option"
                    color="#A8D8EA"
                  />
                  <text class="option-text">{{ option }}</text>
                </label>
              </radio-group>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>

    <!-- 底部操作区 -->
    <view class="action-section">
      <view class="progress-summary">
        <text class="summary-text">已完成 {{ answeredCount }} / {{ totalCount }} 题</text>
        <text class="summary-percentage">{{ Math.round(progressPercentage) }}%</text>
      </view>
      
      <view class="button-group">
        <button 
          class="btn-secondary" 
          @click="goBack"
        >
          返回
        </button>
        <!-- 开发态演示按钮 -->
        <button 
          v-if="isDevMode" 
          class="btn-demo" 
          @click="fillDemoData"
        >
          演示填充
        </button>
        <button 
          class="btn-primary" 
          :class="{ 'disabled': !canSubmit }"
          :disabled="!canSubmit"
          @click="submitAssessment"
        >
          提交评估
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import questionData from '@/static/questionData.js'

export default {
  name: 'Assessment',
  data() {
    return {
      formState: {},
      expandedDomains: ['感知觉'], // 默认展开第一个领域
      saveTimer: null,
      isDevMode: false // 开发模式标识
    }
  },
  computed: {
    // 总题数
    totalCount() {
      return Object.values(this.formState).reduce((total, questions) => total + questions.length, 0)
    },
    
    // 已答题数
    answeredCount() {
      return Object.values(this.formState).reduce((total, questions) => {
        return total + questions.filter(q => q.answer !== '').length
      }, 0)
    },
    
    // 进度百分比
    progressPercentage() {
      return this.totalCount > 0 ? (this.answeredCount / this.totalCount) * 100 : 0
    },
    
    // 进度文本
    progressText() {
      return `${this.answeredCount}/${this.totalCount} 题已答 (${Math.round(this.progressPercentage)}%)`
    },
    
    // 是否可以提交
    canSubmit() {
      return this.answeredCount > 0 && this.answeredCount === this.totalCount
    }
  },
  
  onLoad() {
    this.initFormState()
    this.loadSavedData()
    this.detectDevMode()
  },
  
  onUnload() {
    // 页面卸载时保存数据
    this.saveData()
  },
  
  methods: {
    // 初始化表单状态
    initFormState() {
      // 深拷贝题库数据
      this.formState = JSON.parse(JSON.stringify(questionData))
    },
    
    // 加载保存的数据
    loadSavedData() {
      try {
        const savedData = uni.getStorageSync('assessmentForm')
        if (savedData) {
          this.formState = JSON.parse(savedData)
          console.log('已加载保存的评估数据')
        }
      } catch (error) {
        console.error('加载保存数据失败:', error)
      }
    },
    
    // 保存数据到本地存储
    saveData() {
      try {
        uni.setStorageSync('assessmentForm', JSON.stringify(this.formState))
        console.log('评估数据已保存')
      } catch (error) {
        console.error('保存数据失败:', error)
      }
    },
    
    // 节流保存
    throttledSave() {
      if (this.saveTimer) {
        clearTimeout(this.saveTimer)
      }
      this.saveTimer = setTimeout(() => {
        this.saveData()
      }, 1000) // 1秒后保存
    },
    
    // 折叠面板变化
    onCollapseChange(domain, isOpen) {
      if (isOpen) {
        if (!this.expandedDomains.includes(domain)) {
          this.expandedDomains.push(domain)
        }
      } else {
        const index = this.expandedDomains.indexOf(domain)
        if (index > -1) {
          this.expandedDomains.splice(index, 1)
        }
      }
    },
    
    // 答案选择变化
    onAnswerChange(domain, questionIndex, event) {
      const selectedValue = event.detail.value
      this.formState[domain][questionIndex].answer = selectedValue
      
      // 触发节流保存
      this.throttledSave()
      
      // 显示选择反馈
      uni.showToast({
        title: '已保存',
        icon: 'success',
        duration: 1000
      })
    },
    
    // 获取某个领域的已答数量
    getAnsweredCount(domain) {
      return this.formState[domain].filter(q => q.answer !== '').length
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 演示填充数据（仅开发模式）
    fillDemoData() {
      const options = ['未发展', '萌芽', '已具备']
      
      Object.keys(this.formState).forEach(domain => {
        this.formState[domain].forEach(question => {
          // 随机选择答案
          const randomIndex = Math.floor(Math.random() * options.length)
          question.answer = options[randomIndex]
        })
      })
      
      // 保存到本地存储
      this.saveToStorage()
      
      uni.showToast({
        title: '演示数据已填充',
        icon: 'success',
        duration: 2000
      })
    },
    
    // 检测开发模式
    detectDevMode() {
      // 在开发环境中显示演示按钮
      // #ifdef H5
      this.isDevMode = process.env.NODE_ENV === 'development'
      // #endif
      // #ifdef MP-WEIXIN
      this.isDevMode = true // 微信小程序开发环境
      // #endif
    },
    
    // 提交评估
    submitAssessment() {
      if (!this.canSubmit) {
        uni.showToast({
          title: '请完成所有题目',
          icon: 'none',
          duration: 2000
        })
        return
      }
      
      // 确认提交
      uni.showModal({
        title: '确认提交',
        content: `您已完成 ${this.totalCount} 道题目，确定要提交评估吗？`,
        success: (res) => {
          if (res.confirm) {
            this.handleSubmit()
          }
        }
      })
    },
    
    // 处理提交
    handleSubmit() {
      try {
        // 保存最终数据
        uni.setStorageSync('assessmentForm', JSON.stringify(this.formState))
        uni.setStorageSync('assessmentCompleted', true)
        
        // 显示提交成功
        uni.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500
        })
        
        // 跳转到结果页
        setTimeout(() => {
          uni.redirectTo({
            url: '/pages/result/result'
          })
        }, 1500)
        
      } catch (error) {
        console.error('提交失败:', error)
        uni.showToast({
          title: '提交失败，请重试',
          icon: 'error',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style scoped>
.assessment-page {
  min-height: 100vh;
  background-color: #F5F9FA;
  padding-bottom: 120rpx;
}

/* 进度条区域 */
.progress-section {
  background: linear-gradient(135deg, #A8D8EA 0%, #B8E6B8 100%);
  padding: 30rpx 40rpx;
  margin-bottom: 20rpx;
}

.step-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.step-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
}

.progress-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
}

.progress-bar {
  height: 8rpx;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #fff;
  border-radius: 4rpx;
  transition: width 0.3s ease;
}

/* 页面标题 */
.page-header {
  padding: 40rpx;
  text-align: center;
}

.page-title {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  color: #333;
  margin-bottom: 20rpx;
}

.page-subtitle {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
}

/* 评估表单 */
.assessment-form {
  padding: 0 40rpx;
}

.questions-container {
  padding: 20rpx 0;
}

.question-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(168, 216, 234, 0.1);
}

.question-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30rpx;
}

.question-number {
  font-size: 28rpx;
  font-weight: 600;
  color: #A8D8EA;
  background-color: #E8F4F8;
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
  min-width: 60rpx;
  text-align: center;
}

.question-text {
  flex: 1;
  font-size: 30rpx;
  color: #333;
  line-height: 1.6;
}

/* 选项样式 */
.option-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  transition: all 0.3s ease;
}

.option-item:last-child {
  border-bottom: none;
}

.option-item.selected {
  background-color: #E8F4F8;
  border-radius: 12rpx;
  padding: 20rpx;
  margin: 0 -10rpx;
}

.option-text {
  font-size: 28rpx;
  color: #333;
  margin-left: 20rpx;
}

.option-item.selected .option-text {
  color: #A8D8EA;
  font-weight: 600;
}

/* 底部操作区 */
.action-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 30rpx 40rpx;
  box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.progress-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
  padding: 20rpx;
  background-color: #F5F9FA;
  border-radius: 12rpx;
}

.summary-text {
  font-size: 28rpx;
  color: #666;
}

.summary-percentage {
  font-size: 32rpx;
  font-weight: 600;
  color: #A8D8EA;
}

.button-group {
  display: flex;
  gap: 20rpx;
}

.btn-secondary {
  flex: 1;
  height: 88rpx;
  background-color: #f8f8f8;
  color: #666;
  border: none;
  border-radius: 12rpx;
  font-size: 32rpx;
  font-weight: 600;
}

.btn-primary {
  flex: 2;
  height: 88rpx;
  background: linear-gradient(135deg, #A8D8EA 0%, #B8E6B8 100%);
  color: #fff;
  border: none;
  border-radius: 12rpx;
  font-size: 32rpx;
  font-weight: 600;
}

.btn-primary.disabled {
  background: #ccc;
  color: #999;
}

.btn-demo {
  flex: 1;
  height: 88rpx;
  background-color: #FF9800;
  color: #fff;
  border: none;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: 600;
}

/* uni-collapse 样式覆盖 */
/deep/ .uni-collapse-item__title {
  font-size: 32rpx !important;
  font-weight: 600 !important;
  color: #333 !important;
  padding: 30rpx 0 !important;
}

/deep/ .uni-collapse-item__content {
  padding: 0 !important;
}

/deep/ .uni-collapse-item__title-box {
  border-bottom: 2rpx solid #E8F4F8 !important;
}

/deep/ .uni-collapse-item__title-box--active {
  border-bottom-color: #A8D8EA !important;
}
</style>