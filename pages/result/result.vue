<template>
  <view class="result-page">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">评估结果报告</text>
      <text class="page-subtitle">基于您的评估结果生成的专业分析报告</text>
    </view>

    <!-- 总体概览 -->
    <view class="overview-section">
      <view class="overview-card">
        <view class="overview-title">
          <text class="title-text">总体发育水平</text>
          <text class="title-subtitle">{{ overallLevel }}</text>
        </view>
        <view class="overview-stats">
          <view class="stat-item">
            <text class="stat-number">{{ overallScore }}%</text>
            <text class="stat-label">综合得分</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">{{ completedDomains }}</text>
            <text class="stat-label">已评估领域</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">{{ totalQuestions }}</text>
            <text class="stat-label">评估题目</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 领域评估结果 -->
    <view class="domains-section">
      <view class="section-title">
        <text class="title-text">各领域评估结果</text>
      </view>
      
      <view class="domains-list">
        <view 
          v-for="(result, domain) in domainResults" 
          :key="domain"
          class="domain-card"
          :class="getDomainCardClass(result.level)"
        >
          <view class="domain-header">
            <text class="domain-name">{{ domain }}</text>
            <view class="domain-badge" :class="'level-' + result.level">
              <text class="badge-text">{{ result.levelText }}</text>
            </view>
          </view>
          
          <view class="domain-stats">
            <view class="stat-row">
              <text class="stat-label">完成度</text>
              <text class="stat-value">{{ result.numerator }}/{{ result.denominator }}</text>
            </view>
            <view class="stat-row">
              <text class="stat-label">比例</text>
              <text class="stat-value">{{ result.percentage }}%</text>
            </view>
          </view>
          
          <view class="domain-progress">
            <view class="progress-bar">
              <view 
                class="progress-fill" 
                :style="{ 
                  width: result.percentage + '%',
                  backgroundColor: result.color
                }"
              ></view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 分析结论 -->
    <view class="conclusion-section">
      <view class="section-title">
        <text class="title-text">专业分析</text>
      </view>
      
      <view class="conclusion-card">
        <view class="conclusion-header">
          <text class="conclusion-title">发育评估结论</text>
        </view>
        
        <view class="conclusion-content">
          <view class="conclusion-item" v-if="strengthDomains.length > 0">
            <view class="conclusion-label strength">
              <text class="label-text">优势领域</text>
            </view>
            <text class="conclusion-text">{{ strengthSummary }}</text>
          </view>
          
          <view class="conclusion-item" v-if="weaknessDomains.length > 0">
            <view class="conclusion-label weakness">
              <text class="label-text">需提升领域</text>
            </view>
            <text class="conclusion-text">{{ weaknessSummary }}</text>
          </view>
          
          <view class="conclusion-item">
            <view class="conclusion-label recommendation">
              <text class="label-text">建议</text>
            </view>
            <text class="conclusion-text">{{ recommendationText }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 图表展示 -->
    <view class="chart-section">
      <view class="section-title">
        <text class="title-text">可视化分析</text>
      </view>
      
      <view class="chart-container">
        <!-- 柱状图 -->
        <view class="chart-card">
          <view class="chart-header">
            <text class="chart-title">各领域完成度对比</text>
          </view>
          <view class="chart-placeholder" id="barChart">
            <text class="placeholder-text">柱状图占位</text>
            <text class="placeholder-desc">可集成 ECharts 或 uCharts</text>
          </view>
        </view>
        
        <!-- 雷达图 -->
        <view class="chart-card">
          <view class="chart-header">
            <text class="chart-title">发育能力雷达图</text>
          </view>
          <view class="chart-placeholder" id="radarChart">
            <text class="placeholder-text">雷达图占位</text>
            <text class="placeholder-desc">可集成 ECharts 或 uCharts</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作区 -->
    <view class="action-section">
      <view class="button-group">
        <button class="btn-secondary" @click="goBack">
          返回评估
        </button>
        <button class="btn-warning" @click="restartAssessment">
          重新评估
        </button>
        <button class="btn-primary" @click="exportReport">
          导出报告
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Result',
  data() {
    return {
      formState: {},
      domainResults: {},
      chartOptions: {
        bar: null,
        radar: null
      }
    }
  },
  
  computed: {
    // 总体得分
    overallScore() {
      const validResults = Object.values(this.domainResults).filter(result => result.hasData)
      if (validResults.length === 0) return 0
      
      const scores = validResults.map(result => result.percentage)
      return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    },
    
    // 总体等级
    overallLevel() {
      const score = this.overallScore
      if (score === 100) return '常态'
      if (score >= 67) return '良好'
      if (score >= 50) return '普通'
      return '差'
    },
    
    // 已完成的领域数
    completedDomains() {
      return Object.values(this.domainResults).filter(result => result.hasData).length
    },
    
    // 总题目数
    totalQuestions() {
      return Object.values(this.domainResults).reduce((total, result) => total + result.denominator, 0)
    },
    
    // 优势领域
    strengthDomains() {
      return Object.entries(this.domainResults)
        .filter(([domain, result]) => result.hasData && (result.level === 'normal' || result.level === 'good'))
        .map(([domain]) => domain)
    },
    
    // 需提升领域
    weaknessDomains() {
      return Object.entries(this.domainResults)
        .filter(([domain, result]) => result.hasData && (result.level === 'fail' || result.level === 'poor'))
        .map(([domain]) => domain)
    },
    
    // 优势领域摘要
    strengthSummary() {
      if (this.strengthDomains.length === 0) return '暂无明显的优势领域'
      if (this.strengthDomains.length === 1) {
        return `${this.strengthDomains[0]}领域表现优秀，建议继续保持并进一步强化。`
      }
      return `${this.strengthDomains.join('、')}等领域表现良好，是孩子的优势发展领域。`
    },
    
    // 需提升领域摘要
    weaknessSummary() {
      if (this.weaknessDomains.length === 0) return '所有领域表现良好'
      if (this.weaknessDomains.length === 1) {
        return `${this.weaknessDomains[0]}领域需要重点关注和针对性训练。`
      }
      return `${this.weaknessDomains.join('、')}等领域需要加强训练，建议制定个性化干预计划。`
    },
    
    // 建议文本
    recommendationText() {
      const score = this.overallScore
      if (score >= 80) {
        return '整体发育水平良好，建议继续保持现有训练强度，可适当增加挑战性活动。'
      } else if (score >= 60) {
        return '发育水平中等，建议在保持优势领域的同时，重点加强薄弱环节的训练。'
      } else {
        return '建议寻求专业康复师指导，制定系统性的训练计划，定期评估进展。'
      }
    }
  },
  
  onLoad() {
    this.loadAssessmentData()
    this.calculateResults()
    this.generateChartOptions()
  },
  
  methods: {
    // 加载评估数据
    loadAssessmentData() {
      try {
        const savedData = uni.getStorageSync('assessmentForm')
        if (savedData) {
          this.formState = JSON.parse(savedData)
          console.log('已加载评估数据')
        } else {
          uni.showToast({
            title: '未找到评估数据',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            uni.navigateBack()
          }, 2000)
        }
      } catch (error) {
        console.error('加载评估数据失败:', error)
        uni.showToast({
          title: '数据加载失败',
          icon: 'error',
          duration: 2000
        })
      }
    },
    
    // 计算各领域结果
    calculateResults() {
      this.domainResults = {}
      
      Object.entries(this.formState).forEach(([domain, questions]) => {
        // 空值处理：检查题目数组是否存在且有效
        if (!questions || !Array.isArray(questions) || questions.length === 0) {
          console.warn(`领域 ${domain} 无有效题目数据`)
          return
        }
        
        const numerator = questions.filter(q => q && q.answer === '已具备').length
        const denominator = questions.length
        const percentage = denominator > 0 ? Math.round((numerator / denominator) * 100) : 0
        
        const result = {
          numerator,
          denominator,
          percentage,
          level: this.getLevel(percentage),
          levelText: this.getLevelText(percentage),
          color: this.getLevelColor(percentage),
          hasData: denominator > 0 // 标记是否有有效数据
        }
        
        this.domainResults[domain] = result
      })
      
      console.log('计算结果:', this.domainResults)
    },
    
    // 获取等级
    getLevel(percentage) {
      if (percentage === 100) return 'normal'
      if (percentage >= 67) return 'good'
      if (percentage >= 50) return 'fail'
      return 'poor'
    },
    
    // 获取等级文本
    getLevelText(percentage) {
      if (percentage === 100) return '常态'
      if (percentage >= 67) return '良好'
      if (percentage >= 50) return '普通'
      return '差'
    },
    
    // 获取等级颜色
    getLevelColor(percentage) {
      if (percentage === 100) return '#2196F3'  // 蓝色
      if (percentage >= 67) return '#4CAF50'    // 绿色
      if (percentage >= 50) return '#FFC107'    // 黄色
      return '#F44336'                          // 红色
    },
    
    // 获取领域卡片样式类
    getDomainCardClass(level) {
      return `level-${level}`
    },
    
    // 生成图表配置
    generateChartOptions() {
      // 柱状图配置
      this.chartOptions.bar = {
        title: {
          text: '各领域完成度对比'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: Object.keys(this.domainResults)
        },
        yAxis: {
          type: 'value',
          max: 100
        },
        series: [{
          data: Object.values(this.domainResults).map(result => ({
            value: result.percentage,
            itemStyle: {
              color: result.color
            }
          })),
          type: 'bar',
          barWidth: '60%'
        }]
      }
      
      // 雷达图配置
      this.chartOptions.radar = {
        title: {
          text: '发育能力雷达图'
        },
        radar: {
          indicator: Object.keys(this.domainResults).map(domain => ({
            name: domain,
            max: 100
          }))
        },
        series: [{
          name: '发育水平',
          type: 'radar',
          data: [{
            value: Object.values(this.domainResults).map(result => result.percentage),
            name: '当前水平',
            itemStyle: {
              color: '#A8D8EA'
            },
            areaStyle: {
              color: 'rgba(168, 216, 234, 0.3)'
            }
          }]
        }]
      }
      
      console.log('图表配置已生成:', this.chartOptions)
    },
    
    // 返回评估页面
    goBack() {
      uni.navigateBack()
    },
    
    // 重新评估
    restartAssessment() {
      uni.showModal({
        title: '重新评估',
        content: '确定要清除当前评估数据并重新开始评估吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除本地存储的评估数据
            uni.removeStorageSync('assessmentForm')
            
            uni.showToast({
              title: '已清除评估数据',
              icon: 'success',
              duration: 1500
            })
            
            // 延迟跳转到评估页面
            setTimeout(() => {
              uni.navigateTo({
                url: '/pages/assessment/assessment'
              })
            }, 1500)
          }
        }
      })
    },
    
    // 导出报告
    exportReport() {
      uni.showModal({
        title: '导出报告',
        content: '即将导出 Excel 格式的评估报告，是否继续？',
        success: (res) => {
          if (res.confirm) {
            this.handleExport()
          }
        }
      })
    },
    
    // 处理导出
    handleExport() {
      uni.showLoading({
        title: '正在生成报告...'
      })
      
      // 模拟导出过程
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '报告导出成功',
          icon: 'success',
          duration: 2000
        })
        
        // 这里可以集成实际的导出功能
        // 例如：调用后端API生成Excel文件
        console.log('导出数据:', {
          formState: this.formState,
          domainResults: this.domainResults,
          overallScore: this.overallScore,
          overallLevel: this.overallLevel
        })
      }, 2000)
    }
  }
}
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  background-color: #F5F9FA;
  padding-bottom: 120rpx;
}

/* 页面标题 */
.page-header {
  background: linear-gradient(135deg, #A8D8EA 0%, #B8E6B8 100%);
  padding: 60rpx 40rpx 40rpx;
  text-align: center;
}

.page-title {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20rpx;
}

.page-subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
}

/* 总体概览 */
.overview-section {
  padding: 40rpx;
}

.overview-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 24rpx rgba(168, 216, 234, 0.15);
}

.overview-title {
  text-align: center;
  margin-bottom: 40rpx;
}

.title-text {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: #333;
  margin-bottom: 10rpx;
}

.title-subtitle {
  font-size: 28rpx;
  color: #666;
}

.overview-stats {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  color: #A8D8EA;
  margin-bottom: 10rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
}

/* 区域标题 */
.section-title {
  padding: 40rpx 40rpx 20rpx;
}

/* 领域评估结果 */
.domains-section {
  padding: 0 40rpx;
}

.domains-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.domain-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(168, 216, 234, 0.1);
  border-left: 8rpx solid #E8F4F8;
}

.domain-card.level-normal {
  border-left-color: #2196F3;
}

.domain-card.level-good {
  border-left-color: #4CAF50;
}

.domain-card.level-fail {
  border-left-color: #FFC107;
}

.domain-card.level-poor {
  border-left-color: #F44336;
}

.domain-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.domain-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.domain-badge {
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.domain-badge.level-normal {
  background-color: #E3F2FD;
}

.domain-badge.level-good {
  background-color: #E8F5E8;
}

.domain-badge.level-fail {
  background-color: #FFF8E1;
}

.domain-badge.level-poor {
  background-color: #FFEBEE;
}

.badge-text {
  font-weight: 600;
}

.domain-badge.level-normal .badge-text {
  color: #2196F3;
}

.domain-badge.level-good .badge-text {
  color: #4CAF50;
}

.domain-badge.level-fail .badge-text {
  color: #FFC107;
}

.domain-badge.level-poor .badge-text {
  color: #F44336;
}

.domain-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.stat-row {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 5rpx;
}

.stat-value {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.domain-progress {
  margin-top: 20rpx;
}

.progress-bar {
  height: 8rpx;
  background-color: #E8F4F8;
  border-radius: 4rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4rpx;
  transition: width 0.3s ease;
}

/* 分析结论 */
.conclusion-section {
  padding: 40rpx;
}

.conclusion-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 24rpx rgba(168, 216, 234, 0.15);
}

.conclusion-header {
  margin-bottom: 30rpx;
}

.conclusion-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #333;
}

.conclusion-content {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.conclusion-item {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
}

.conclusion-label {
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  align-self: flex-start;
}

.conclusion-label.strength {
  background-color: #E8F5E8;
}

.conclusion-label.weakness {
  background-color: #FFEBEE;
}

.conclusion-label.recommendation {
  background-color: #E3F2FD;
}

.label-text {
  font-size: 24rpx;
  font-weight: 600;
}

.conclusion-label.strength .label-text {
  color: #4CAF50;
}

.conclusion-label.weakness .label-text {
  color: #F44336;
}

.conclusion-label.recommendation .label-text {
  color: #2196F3;
}

.conclusion-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
}

/* 图表展示 */
.chart-section {
  padding: 40rpx;
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.chart-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(168, 216, 234, 0.1);
}

.chart-header {
  margin-bottom: 20rpx;
}

.chart-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.chart-placeholder {
  height: 300rpx;
  background-color: #F5F9FA;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2rpx dashed #A8D8EA;
}

.placeholder-text {
  font-size: 28rpx;
  color: #A8D8EA;
  font-weight: 600;
  margin-bottom: 10rpx;
}

.placeholder-desc {
  font-size: 24rpx;
  color: #999;
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

.btn-warning {
  flex: 1;
  height: 88rpx;
  background-color: #FF9800;
  color: #fff;
  border: none;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: 600;
}
</style>