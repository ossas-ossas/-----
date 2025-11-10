module.exports = {
  transpileDependencies: ['xlsx'],
  configureWebpack: {
    externals: {
      // 排除不需要打包的库（如果需要）
    }
  }
}

