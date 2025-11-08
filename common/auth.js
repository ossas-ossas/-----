/**
 * 统一的登录状态管理工具
 * 避免重复的登录检查和不必要的登录提示
 */

// Token 过期前的缓冲时间（毫秒），提前 5 分钟刷新
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 分钟

/**
 * 检查登录状态（静默检查，不跳转）
 * @returns {Object} { isLoggedIn: boolean, shouldRefresh: boolean, reason?: string }
 */
export function checkLoginStatus() {
	// 优先从 uniCloud 获取用户信息（最可靠的方式）
	try {
		const userInfo = uniCloud.getCurrentUserInfo && uniCloud.getCurrentUserInfo();
		if (userInfo && userInfo.uid) {
			// 有有效的用户ID，说明已登录
			return {
				isLoggedIn: true,
				shouldRefresh: false,
				reason: 'valid_uid'
			};
		}
	} catch (e) {
		console.warn('[auth] 无法从 uniCloud 获取用户信息:', e);
	}
	
	// 备用方案：检查 uni-id-pages 的用户信息
	const storedUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
	if (storedUserInfo && storedUserInfo._id) {
		// 有用户信息，检查是否有 token
		const token = uni.getStorageSync('uni_id_token');
		if (token) {
			const tokenExpired = uni.getStorageSync('uni_id_token_expired');
			const now = Date.now();
			
			// 检查过期时间
			if (tokenExpired && tokenExpired > 0) {
				// 如果已经过期
				if (now >= tokenExpired) {
					return {
						isLoggedIn: false,
						shouldRefresh: false,
						reason: 'token_expired'
					};
				}
				
				// 如果即将过期（在缓冲时间内），标记需要刷新
				const timeUntilExpiry = tokenExpired - now;
				if (timeUntilExpiry <= TOKEN_REFRESH_THRESHOLD) {
					return {
						isLoggedIn: true,
						shouldRefresh: true,
						reason: 'token_expiring_soon'
					};
				}
			}
			
			// Token 存在且有效
			return {
				isLoggedIn: true,
				shouldRefresh: false,
				reason: 'valid_token'
			};
		}
		
		// 有用户信息但没有 token，可能 token 被清除但用户信息还在
		// 这种情况下，尝试通过 uniCloud 验证
		return {
			isLoggedIn: false,
			shouldRefresh: false,
			reason: 'no_token_but_has_userinfo'
		};
	}
	
	// 最后检查：只有 token 没有用户信息
	const token = uni.getStorageSync('uni_id_token');
	if (!token) {
		return {
			isLoggedIn: false,
			shouldRefresh: false,
			reason: 'no_token'
		};
	}
	
	// 只有 token 的情况，检查过期时间
	const tokenExpired = uni.getStorageSync('uni_id_token_expired');
	const now = Date.now();
	if (tokenExpired && tokenExpired > 0 && now >= tokenExpired) {
		return {
			isLoggedIn: false,
			shouldRefresh: false,
			reason: 'token_expired'
		};
	}
	
	// 有 token 且未过期
	return {
		isLoggedIn: true,
		shouldRefresh: false,
		reason: 'valid_token_only'
	};
}

/**
 * 检查登录状态，如果需要登录则跳转（带用户交互）
 * @param {Object} options 选项
 * @param {string} options.redirectUrl 登录后跳转的页面路径
 * @param {boolean} options.saveData 是否保存当前页面数据到本地
 * @param {Object} options.dataToSave 需要保存的数据
 * @returns {boolean} 是否已登录
 */
export function requireLogin(options = {}) {
	const { redirectUrl, saveData = false, dataToSave = null } = options;
	
	const status = checkLoginStatus();
	
	if (!status.isLoggedIn) {
		// 保存跳转地址
		if (redirectUrl) {
			uni.setStorageSync('redirectUrl', redirectUrl);
		}
		
		// 保存数据（如果需要，使用用户专属存储）
		if (saveData && dataToSave) {
			// 根据当前页面路径保存对应的数据
			const currentPage = getCurrentPages();
			if (currentPage.length > 0) {
				const page = currentPage[currentPage.length - 1];
				const route = page.route || '';
				
				if (route.includes('child-info')) {
					const userKey = getUserStorageKey('childInfo');
					uni.setStorageSync(userKey, dataToSave);
					uni.setStorageSync('childInfo', dataToSave); // 兼容旧数据
				} else if (route.includes('assessment')) {
					const userKey = getUserStorageKey('assessmentDraft');
					uni.setStorageSync(userKey, dataToSave);
					uni.setStorageSync('assessmentDraft', dataToSave); // 兼容旧数据
				}
			}
		}
		
		// 注意：不在登录失败时清除数据，保留用户填写的内容
		// 清除操作应该在登录成功后进行（在页面的 onLoad 中）
		
		// 跳转到登录页
		uni.redirectTo({
			url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
		});
		
		return false;
	}
	
	return true;
}

/**
 * 静默检查登录状态，只在确实需要时才提示
 * @param {Object} options 选项
 * @returns {boolean} 是否已登录
 */
export function checkLoginSilently(options = {}) {
	const status = checkLoginStatus();
	
	if (!status.isLoggedIn) {
		// 静默返回，不跳转，让调用方决定如何处理
		return false;
	}
	
	// 如果需要刷新 token，静默处理（这里可以添加 token 刷新逻辑）
	if (status.shouldRefresh) {
		// 可以在这里添加自动刷新 token 的逻辑
		console.log('[auth] Token 即将过期，建议刷新');
	}
	
	return true;
}

/**
 * 处理云函数返回的登录错误
 * @param {Object} result 云函数返回结果
 * @param {Object} options 选项
 * @returns {boolean} 是否已处理登录错误
 */
export function handleLoginError(result, options = {}) {
	const { redirectUrl, saveData = false, dataToSave = null } = options;
	
	// 从 result 或 result.result 中提取错误信息
	// 注意：result 可能是完整的 uniCloud 响应 {success, errCode, result: {...}}
	// 也可能是云函数返回的对象 {code, msg, ...}
	const errorCode = result?.code || result?.result?.code;
	const errorMsg = result?.msg || result?.result?.msg || result?.message || result?.result?.message || '';
	
	// 重要：即使 uniCloud 调用成功（success=true, errCode=0），
	// 如果云函数明确返回了登录错误（NOT_LOGIN 或 401），也应该当作登录错误处理
	const isExplicitLoginError = errorCode === 401 || 
	                            errorCode === 'NOT_LOGIN' ||
	                            String(errorCode) === '401' ||
	                            String(errorCode) === 'NOT_LOGIN';
	
	// 如果 uniCloud 调用成功，但云函数返回了明确的登录错误，需要处理
	// 如果 uniCloud 调用失败，也需要检查是否是登录错误
	if (result && typeof result === 'object' && result.success === true && result.errCode === 0) {
		// uniCloud 调用成功，但如果云函数返回了明确的登录错误，仍然需要处理
		if (!isExplicitLoginError && !errorMsg.includes('未登录') && !errorMsg.includes('请先登录')) {
			// 不是登录错误，返回 false
			return false;
		}
		// 继续处理登录错误
	}
	
	// 判断是否是登录相关错误（必须是明确的登录错误）
	// 注意：code 可能是字符串 'NOT_LOGIN' 或数字 401
	const isLoginError = errorCode === 401 || 
	                    errorCode === 'NOT_LOGIN' ||
	                    String(errorCode) === '401' ||
	                    String(errorCode) === 'NOT_LOGIN' ||
	                    (errorMsg && (
	                    	errorMsg.includes('未登录') || 
	                    	errorMsg.includes('登录已失效') ||
	                    	errorMsg.includes('token已过期') ||
	                    	errorMsg.includes('token无效') ||
	                    	errorMsg.includes('auth failed') ||
	                    	errorMsg.includes('authentication') ||
	                    	errorMsg.includes('请先登录')
	                    ));
	
	if (isLoginError) {
		// 清除可能过期的 token
		uni.removeStorageSync('uni_id_token');
		uni.removeStorageSync('uni_id_token_expired');
		
		// 保存数据（如果需要，使用用户专属存储）
		if (saveData && dataToSave) {
			const currentPage = getCurrentPages();
			if (currentPage.length > 0) {
				const page = currentPage[currentPage.length - 1];
				const route = page.route || '';
				
				if (route.includes('child-info')) {
					const userKey = getUserStorageKey('childInfo');
					uni.setStorageSync(userKey, dataToSave);
					uni.setStorageSync('childInfo', dataToSave); // 兼容旧数据
				} else if (route.includes('assessment')) {
					const userKey = getUserStorageKey('assessmentDraft');
					uni.setStorageSync(userKey, dataToSave);
					uni.setStorageSync('assessmentDraft', dataToSave); // 兼容旧数据
				}
			}
		}
		
		// 注意：登录错误时不清除数据，保留用户填写的内容
		// 清除操作应该在登录成功后进行（在页面的 onLoad 中）
		
		// 保存跳转地址
		if (redirectUrl) {
			uni.setStorageSync('redirectUrl', redirectUrl);
		}
		
		// 显示登录提示（只显示一次）
		uni.showModal({
			title: '登录已失效',
			content: '登录状态已失效，需要重新登录才能继续',
			confirmText: '去登录',
			cancelText: '稍后',
			success: (res) => {
				if (res.confirm) {
					uni.redirectTo({
						url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
					});
				} else {
					// 用户选择稍后，提示数据已保存
					if (saveData && dataToSave) {
						uni.showToast({
							title: '已保存到本地，登录后可同步',
							icon: 'none',
							duration: 2000
						});
					}
				}
			}
		});
		
		return true; // 已处理登录错误
	}
	
	return false; // 不是登录错误
}

/**
 * 验证是否可以调用云函数（检查登录状态）
 * @param {Object} options 选项
 * @returns {boolean} 是否可以调用
 */
export function canCallCloudFunction(options = {}) {
	const { showToast = false } = options;
	const status = checkLoginStatus();
	
	if (!status.isLoggedIn) {
		if (showToast) {
			uni.showToast({
				title: '请先登录',
				icon: 'none',
				duration: 2000
			});
		}
		return false;
	}
	
	return true;
}

/**
 * 获取当前登录用户ID
 * @returns {string|null} 用户ID，未登录返回 null
 */
export function getCurrentUserId() {
	try {
		const userInfo = uniCloud.getCurrentUserInfo && uniCloud.getCurrentUserInfo();
		if (userInfo && userInfo.uid) {
			return userInfo.uid;
		}
		// 备用方案：从 uni-id-pages 的 store 中获取
		const storedUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
		if (storedUserInfo && storedUserInfo._id) {
			return storedUserInfo._id;
		}
		return null;
	} catch (e) {
		console.warn('[auth] 无法获取用户ID:', e);
		return null;
	}
}

/**
 * 获取用户专属的存储键名
 * @param {string} baseKey 基础键名
 * @returns {string} 带用户ID的键名
 */
export function getUserStorageKey(baseKey) {
	const userId = getCurrentUserId();
	if (userId) {
		return `${baseKey}_${userId}`;
	}
	// 未登录时返回原始键名（用于临时数据）
	return baseKey;
}

/**
 * 清除当前用户的所有数据
 * 在用户切换或登出时调用
 * 注意：不会清除 token 和用户信息
 */
export function clearUserData() {
	const userId = getCurrentUserId();
	if (userId) {
		// 清除带用户ID的业务数据（不包括 token 和用户信息）
		uni.removeStorageSync(getUserStorageKey('childInfo'));
		uni.removeStorageSync(getUserStorageKey('assessmentDraft'));
		uni.removeStorageSync(getUserStorageKey('assessmentResult'));
	}
	// 同时清除不带用户ID的临时数据（兼容旧数据）
	uni.removeStorageSync('childInfo');
	uni.removeStorageSync('assessmentDraft');
	uni.removeStorageSync('assessmentResult');
	// 注意：不清除以下内容，保持登录状态：
	// - uni_id_token
	// - uni_id_token_expired
	// - uni-id-pages-userInfo
}

