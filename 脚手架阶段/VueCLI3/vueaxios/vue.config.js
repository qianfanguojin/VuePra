//配置
module.exports = {
  // devServer: {
  //   port: 8030,
  //   open: false,
    
  // },
  configureWebpack: {
    devServer: {
      port: 8030,
      open: false, 
    },
    resolve: {

    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // // 或者
    // // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
  }
  //publicPath:'./'
}