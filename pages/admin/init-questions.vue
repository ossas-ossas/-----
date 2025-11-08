<template>
	<view class="container">
		<view class="header">
			<text class="title">初始化题目数据</text>
			<text class="subtitle">将题目数据导入到数据库</text>
		</view>
		
		<view class="content">
			<view class="info-card">
				<text class="info-title">题目数据信息</text>
				<view class="info-item">
					<text class="info-label">题目总数：</text>
					<text class="info-value">{{ questionsCount }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">状态：</text>
					<text class="info-value" :class="statusClass">{{ statusText }}</text>
				</view>
			</view>
			
			<view class="result-card" v-if="result">
				<text class="result-title">初始化结果</text>
				<view class="result-content">
					<text class="result-text">{{ result.msg }}</text>
					<view class="result-stats" v-if="result.total">
						<text class="stat-item">总数：{{ result.total }}</text>
						<text class="stat-item">已存在：{{ result.existing || 0 }}</text>
						<text class="stat-item">新插入：{{ result.inserted || 0 }}</text>
						<text class="stat-item" v-if="result.failed > 0" style="color: #E74C3C;">失败：{{ result.failed }}</text>
					</view>
					<view class="result-warning" v-if="result.failed > 0">
						<text class="warning-text">⚠️ 部分题目插入失败，请检查控制台日志或重新运行初始化</text>
					</view>
					<view class="result-success" v-if="result.success && result.failed === 0 && result.inserted + result.existing === result.total">
						<text class="success-text">✅ 所有题目已成功初始化！</text>
					</view>
				</view>
			</view>
			
			<view class="button-group">
				<button 
					class="init-button" 
					:disabled="isInitializing"
					@click="initQuestions"
				>
					<text>{{ isInitializing ? '初始化中...' : '开始初始化' }}</text>
				</button>
				
				<button 
					class="clean-button" 
					:disabled="isCleaning"
					@click="cleanDuplicates"
				>
					<text>{{ isCleaning ? '清理中...' : '清理重复题目' }}</text>
				</button>
				
				<button 
					class="diagnose-button" 
					:disabled="isDiagnosing"
					@click="diagnoseQuestions"
				>
					<text>{{ isDiagnosing ? '诊断中...' : '诊断题目数据' }}</text>
				</button>
				
				<button 
					class="clear-button" 
					:disabled="isClearing"
					@click="clearAllQuestions"
				>
					<text>{{ isClearing ? '清空中...' : '清空所有题目（危险）' }}</text>
				</button>
			</view>
			
			<view class="tips">
				<text class="tips-title">注意事项：</text>
				<text class="tips-item">1. 初始化过程可能需要几分钟，请耐心等待</text>
				<text class="tips-item">2. 已存在的题目不会重复插入</text>
				<text class="tips-item">3. 初始化完成后，可以正常使用评估功能</text>
			</view>
		</view>
	</view>
</template>

<script>
import { questions } from '@/common/questionBank.js'

export default {
		data() {
			return {
			questionsCount: questions.length,
			isInitializing: false,
			isCleaning: false,
			isDiagnosing: false,
			isClearing: false,
			result: null,
			diagnosisResult: null,
			statusText: '未初始化',
			statusClass: 'status-pending'
			}
		},
	onLoad() {
		// 检查登录状态
		const token = uni.getStorageSync('uni_id_token')
		if (!token) {
			uni.showModal({
				title: '需要登录',
				content: '初始化题目数据需要登录，请先登录',
				showCancel: false,
				success: () => {
					uni.navigateBack()
				}
			})
			return
		}
	},
	methods: {
		async initQuestions() {
			if (this.isInitializing) return
			
			// 确认操作
			const confirmResult = await new Promise((resolve) => {
				uni.showModal({
					title: '确认初始化',
					content: `即将初始化 ${this.questionsCount} 条题目数据，是否继续？`,
					success: (res) => resolve(res.confirm),
					fail: () => resolve(false)
				})
			})
			
			if (!confirmResult) return
			
			this.isInitializing = true
			this.statusText = '初始化中...'
			this.statusClass = 'status-loading'
			this.result = null
			
			uni.showLoading({
				title: '初始化中...',
				mask: true
			})
			
			try {
				console.log('[init-questions] 开始初始化，题目数量:', this.questionsCount)
				
				// **优化**：分批传递题目数据，避免数据过大导致调用失败
				// uniCloud 调用限制约为 1MB，如果题目数据太大，需要分批处理
				const batchSize = 500; // 每批500题
				let totalInserted = 0;
				let totalExisting = 0;
				let totalFailed = 0;
				const allFailedBatches = [];
				
				// 检查数据大小
				const dataSize = JSON.stringify(questions).length;
				console.log('[init-questions] 题目数据大小:', dataSize, 'bytes (', (dataSize / 1024).toFixed(2), 'KB)');
				
				if (dataSize > 800 * 1024) { // 超过 800KB，分批处理
					console.log('[init-questions] 数据较大，分批处理');
					
					for (let i = 0; i < questions.length; i += batchSize) {
						const batch = questions.slice(i, i + batchSize);
						const batchNum = Math.floor(i / batchSize) + 1;
						const totalBatches = Math.ceil(questions.length / batchSize);
						
						uni.showLoading({
							title: `初始化中... (${batchNum}/${totalBatches})`,
							mask: true
						});
						
						console.log(`[init-questions] 处理批次 ${batchNum}/${totalBatches}，数量: ${batch.length}`);
						
						try {
							const result = await uniCloud.callFunction({
								name: 'initQuestions',
								data: {
									questions: batch
								}
							});
							
							if (result.result && result.result.success) {
								totalInserted += (result.result.inserted || 0);
								totalExisting += (result.result.existing || 0);
								totalFailed += (result.result.failed || 0);
								if (result.result.failedBatches) {
									allFailedBatches.push(...result.result.failedBatches);
								}
								console.log(`[init-questions] 批次 ${batchNum} 完成: 插入 ${result.result.inserted}, 已存在 ${result.result.existing}, 失败 ${result.result.failed}`);
							} else {
								console.error(`[init-questions] 批次 ${batchNum} 失败:`, result.result);
								totalFailed += batch.length;
							}
						} catch (batchError) {
							console.error(`[init-questions] 批次 ${batchNum} 异常:`, batchError);
							totalFailed += batch.length;
							allFailedBatches.push({ batch: batchNum, error: batchError.message || String(batchError) });
						}
						
						// 短暂延迟，避免请求过快
						if (i + batchSize < questions.length) {
							await new Promise(resolve => setTimeout(resolve, 500));
						}
					}
					
					// 汇总结果
					this.result = {
						success: totalFailed === 0,
						msg: `初始化完成：插入 ${totalInserted} 条，已存在 ${totalExisting} 条，失败 ${totalFailed} 条`,
						total: questions.length,
						existing: totalExisting,
						inserted: totalInserted,
						failed: totalFailed,
						failedBatches: allFailedBatches.slice(0, 10)
					};
				} else {
					// 数据不大，一次性处理
					const result = await uniCloud.callFunction({
						name: 'initQuestions',
						data: {
							questions: questions
						}
					});
					
					this.result = result.result || { msg: '初始化失败' };
				}
				
				uni.hideLoading()
				
				console.log('[init-questions] 初始化结果:', this.result)
				
				if (this.result.success && this.result.failed === 0) {
					this.statusText = '初始化成功'
					this.statusClass = 'status-success'
					
					uni.showToast({
						title: '初始化成功',
						icon: 'success',
						duration: 2000
					})
				} else if (this.result.success) {
					this.statusText = '部分成功'
					this.statusClass = 'status-warning'
					
					uni.showModal({
						title: '初始化部分成功',
						content: this.result.msg,
						showCancel: false
					})
				} else {
					this.statusText = '初始化失败'
					this.statusClass = 'status-error'
					
					uni.showModal({
						title: '初始化失败',
						content: this.result.msg || '未知错误',
						showCancel: false
					})
				}
			} catch (error) {
				uni.hideLoading()
				console.error('[init-questions] 初始化异常:', error)
				
				this.statusText = '初始化失败'
				this.statusClass = 'status-error'
				this.result = {
					msg: '初始化失败：' + (error.message || '网络错误')
				}
				
				uni.showModal({
					title: '初始化失败',
					content: error.message || '网络错误，请重试',
					showCancel: false
				})
			} finally {
				this.isInitializing = false
			}
		},
		
		async cleanDuplicates() {
			if (this.isCleaning) return
			
			// 确认操作
			const confirmResult = await new Promise((resolve) => {
				uni.showModal({
					title: '确认清理',
					content: '即将清理数据库中的重复题目，只保留每个 qid 的第一条记录。此操作不可恢复，是否继续？',
					success: (res) => resolve(res.confirm),
					fail: () => resolve(false)
				})
			})
			
			if (!confirmResult) return
			
			this.isCleaning = true
			this.statusText = '清理中...'
			this.statusClass = 'status-loading'
			
			uni.showLoading({
				title: '清理中...',
				mask: true
			})
			
			try {
				console.log('[init-questions] 开始清理重复题目')
				
				// 调用云函数
				const result = await uniCloud.callFunction({
					name: 'cleanDuplicateQuestions'
				})
				
				uni.hideLoading()
				
				console.log('[init-questions] 清理结果:', result)
				
				if (result.result && result.result.success) {
					this.result = result.result
					this.statusText = '清理成功'
					this.statusClass = 'status-success'
					
					uni.showModal({
						title: '清理成功',
						content: result.result.msg,
						showCancel: false,
						confirmText: '确定'
					})
				} else {
					this.result = result.result || { msg: '清理失败' }
					this.statusText = '清理失败'
					this.statusClass = 'status-error'
					
					uni.showModal({
						title: '清理失败',
						content: result.result?.msg || '未知错误',
						showCancel: false
					})
				}
			} catch (error) {
				uni.hideLoading()
				console.error('[init-questions] 清理异常:', error)
				
				this.statusText = '清理失败'
				this.statusClass = 'status-error'
				this.result = {
					msg: '清理失败：' + (error.message || '网络错误')
				}
				
				uni.showModal({
					title: '清理失败',
					content: error.message || '网络错误，请重试',
					showCancel: false
				})
			} finally {
				this.isCleaning = false
			}
		},
		
		async diagnoseQuestions() {
			if (this.isDiagnosing) return
			
			this.isDiagnosing = true
			this.statusText = '诊断中...'
			this.statusClass = 'status-loading'
			
			uni.showLoading({
				title: '诊断中...',
				mask: true
			})
			
			try {
				console.log('[init-questions] 开始诊断题目数据')
				
				// 调用云函数
				const result = await uniCloud.callFunction({
					name: 'diagnoseQuestions'
				})
				
				uni.hideLoading()
				
				console.log('[init-questions] 诊断结果:', result)
				
				if (result.result && result.result.success) {
					this.diagnosisResult = result.result
					this.statusText = '诊断完成'
					this.statusClass = 'status-success'
					
					// 显示诊断结果
					const summary = result.result.summary
					const analysis = result.result.analysis
					
					let content = `总记录数: ${summary.total}\n`
					content += `唯一 qid: ${summary.uniqueQids}\n`
					content += `重复 qid: ${summary.duplicates}\n`
					content += `预期数量: ${analysis.expectedCount}\n`
					content += `差异: ${analysis.difference}`
					
					if (result.result.ageBandStats) {
						content += `\n\n年龄段分布:\n`
						Object.entries(result.result.ageBandStats).forEach(([band, count]) => {
							content += `${band}: ${count} 条\n`
						})
					}
					
					uni.showModal({
						title: '诊断结果',
						content: content,
						showCancel: false,
						confirmText: '确定',
						success: () => {
							// 将详细结果显示在页面上
							this.result = {
								msg: '诊断完成',
								diagnosis: result.result
							}
						}
					})
				} else {
					this.statusText = '诊断失败'
					this.statusClass = 'status-error'
					
					uni.showModal({
						title: '诊断失败',
						content: result.result?.msg || '未知错误',
						showCancel: false
					})
				}
			} catch (error) {
				uni.hideLoading()
				console.error('[init-questions] 诊断异常:', error)
				
				this.statusText = '诊断失败'
				this.statusClass = 'status-error'
				
				uni.showModal({
					title: '诊断失败',
					content: error.message || '网络错误，请重试',
					showCancel: false
				})
			} finally {
				this.isDiagnosing = false
			}
		},
		
		async clearAllQuestions() {
			if (this.isClearing) return
			
			// 双重确认
			const confirm1 = await new Promise((resolve) => {
				uni.showModal({
					title: '⚠️ 危险操作',
					content: '此操作将删除数据库中的所有题目数据，且不可恢复！\n\n确定要继续吗？',
					confirmText: '确定删除',
					cancelText: '取消',
					confirmColor: '#FF0000',
					success: (res) => resolve(res.confirm),
					fail: () => resolve(false)
				})
			})
			
			if (!confirm1) return
			
			// 第二次确认
			const confirm2 = await new Promise((resolve) => {
				uni.showModal({
					title: '⚠️ 最后确认',
					content: '请再次确认：将删除所有题目数据，此操作不可恢复！\n\n输入"DELETE"确认删除',
					editable: true,
					placeholderText: '输入 DELETE',
					success: (res) => {
						if (res.confirm && res.content === 'DELETE') {
							resolve(true)
						} else {
							uni.showToast({
								title: '输入错误，已取消',
								icon: 'none'
							})
							resolve(false)
						}
					},
					fail: () => resolve(false)
				})
			})
			
			if (!confirm2) return
			
			this.isClearing = true
			this.statusText = '清空中...'
			this.statusClass = 'status-loading'
			
			uni.showLoading({
				title: '清空中...',
				mask: true
			})
			
			try {
				console.log('[init-questions] 开始清空所有题目')
				
				// 调用云函数
				const result = await uniCloud.callFunction({
					name: 'clearAllQuestions'
				})
				
				uni.hideLoading()
				
				console.log('[init-questions] 清空结果:', result)
				
				if (result.result && result.result.success) {
					this.result = result.result
					this.statusText = '清空完成'
					this.statusClass = 'status-success'
					
					uni.showModal({
						title: '清空完成',
						content: result.result.msg,
						showCancel: false,
						confirmText: '确定'
					})
				} else {
					this.result = result.result || { msg: '清空失败' }
					this.statusText = '清空失败'
					this.statusClass = 'status-error'
					
					uni.showModal({
						title: '清空失败',
						content: result.result?.msg || '未知错误',
						showCancel: false
					})
				}
			} catch (error) {
				uni.hideLoading()
				console.error('[init-questions] 清空异常:', error)
				
				this.statusText = '清空失败'
				this.statusClass = 'status-error'
				this.result = {
					msg: '清空失败：' + (error.message || '网络错误')
				}
				
				uni.showModal({
					title: '清空失败',
					content: error.message || '网络错误，请重试',
					showCancel: false
				})
			} finally {
				this.isClearing = false
			}
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

.header {
	text-align: center;
	margin-bottom: 40rpx;
}

.title {
	display: block;
	font-size: 40rpx;
	font-weight: bold;
	color: #2C3E50;
	margin-bottom: 15rpx;
}

.subtitle {
	display: block;
	font-size: 26rpx;
	color: #7F8C8D;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}

.info-card,
.result-card {
	background: rgba(255, 255, 255, 0.9);
	border-radius: 20rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.info-title,
.result-title {
	display: block;
	font-size: 32rpx;
	font-weight: bold;
	color: #34495E;
	margin-bottom: 20rpx;
}

.info-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15rpx;
}

.info-label {
	font-size: 28rpx;
	color: #7F8C8D;
}

.info-value {
	font-size: 28rpx;
	font-weight: 600;
	color: #2C3E50;
}

.status-pending {
	color: #7F8C8D;
}

.status-loading {
	color: #87CEEB;
}

.status-success {
	color: #27AE60;
}

.status-error {
	color: #E74C3C;
}

.result-content {
	margin-top: 20rpx;
}

.result-text {
	display: block;
	font-size: 28rpx;
	color: #2C3E50;
	line-height: 1.6;
	margin-bottom: 20rpx;
}

.result-stats {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
	margin-top: 20rpx;
}

.stat-item {
	font-size: 24rpx;
	color: #7F8C8D;
	background: #F8F9FA;
	padding: 10rpx 20rpx;
	border-radius: 10rpx;
}

.button-group {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	margin-top: 20rpx;
}

.init-button,
.clean-button,
.diagnose-button,
.clear-button {
	width: 100%;
	height: 90rpx;
	border-radius: 45rpx;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 0;
}

.init-button {
	background: linear-gradient(135deg, #E93A8A, #009FC2);
	box-shadow: 0 8rpx 30rpx rgba(233, 58, 138, 0.4);
}

.clean-button {
	background: linear-gradient(135deg, #FF6B6B, #FF8E53);
	box-shadow: 0 8rpx 30rpx rgba(255, 107, 107, 0.4);
}

.diagnose-button {
	background: linear-gradient(135deg, #4ECDC4, #44A08D);
	box-shadow: 0 8rpx 30rpx rgba(78, 205, 196, 0.4);
}

.clear-button {
	background: linear-gradient(135deg, #E74C3C, #C0392B);
	box-shadow: 0 8rpx 30rpx rgba(231, 76, 60, 0.4);
}

.init-button:disabled,
.clean-button:disabled,
.diagnose-button:disabled,
.clear-button:disabled {
	background: #BDC3C7;
	box-shadow: none;
}

.init-button text,
.clean-button text,
.diagnose-button text,
.clear-button text {
	font-size: 32rpx;
	font-weight: bold;
	color: #FFFFFF;
}

.tips {
	background: rgba(255, 255, 255, 0.7);
	border-radius: 15rpx;
	padding: 25rpx;
	margin-top: 20rpx;
}

.tips-title {
	display: block;
	font-size: 28rpx;
	font-weight: bold;
	color: #34495E;
	margin-bottom: 15rpx;
}

.tips-item {
	display: block;
	font-size: 24rpx;
	color: #7F8C8D;
	line-height: 1.8;
	margin-bottom: 10rpx;
}

.result-warning {
	margin-top: 20rpx;
	padding: 15rpx;
	background: #FFF3CD;
	border-radius: 10rpx;
	border-left: 4rpx solid #FFC107;
}

.warning-text {
	font-size: 24rpx;
	color: #856404;
	line-height: 1.6;
}

.result-success {
	margin-top: 20rpx;
	padding: 15rpx;
	background: #D4EDDA;
	border-radius: 10rpx;
	border-left: 4rpx solid #28A745;
}

.success-text {
	font-size: 24rpx;
	color: #155724;
	line-height: 1.6;
	font-weight: 600;
}
</style>

