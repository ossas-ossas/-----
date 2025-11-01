<script>
	// 如果出现编译错误，可以暂时注释掉这行导入
	// import initUniIdPage from '@/uni_modules/uni-id-pages/init.js'
	
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			// 初始化 uni-id-pages（已禁用，避免模块加载错误）
			// init.js 在模块顶层调用了 uniCloud.importObject，会导致 webpack 模块加载错误
			// 注释掉初始化代码，uni-id-pages 的登录功能仍可正常使用
			// 如需启用调试模式检查，请确保 uniCloud 已初始化后再调用
			/*
			setTimeout(async () => {
				try {
					// 动态导入，避免启动时阻塞
					const initModule = require('@/uni_modules/uni-id-pages/init.js')
					const initUniIdPage = initModule.default || initModule
					if (typeof initUniIdPage === 'function') {
						await initUniIdPage()
					}
				} catch (error) {
					console.warn('[App] uni-id-pages 初始化失败:', error)
				}
			}, 100)
			*/
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
