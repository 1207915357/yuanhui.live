const path = require('path')
// const FileManagerPlugin = require('filemanager-webpack-plugin');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
function resolve(dir) {
  return path.join(__dirname, './', dir)
}
let ts = Date.parse(new Date());  
module.exports = {
  // publicPath: process.env.VUE_APP_URL, // 从 Vue CLI 3.3 起已弃用，改成publicPath
  lintOnSave: false, // 取消eslint代码检测

  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
   

    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //配置alias
     config.resolve.alias 
       .set('@', resolve('src'))
       .set('assets', resolve('src/assets'))
       .set('components', resolve('src/components'))
       .set('static', resolve('src/static'))

    //配置压缩dist目录成 .zip 文件
      // if (process.env.VUE_APP_MODE == 'test') {
      //   config.plugin('compress')
      //     .use(FileManagerPlugin, [{
      //       onEnd: {
      //         delete: [ //首先需要删除项目根目录下的dist.zip
      //           './*.zip',
      //         ],
      //         archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
      //           {
      //             source: './dist',
      //             destination: `./biProject-${ts}-production.zip`
      //           },
      //           {
      //             source: './beta',
      //             destination: `./biProject-${ts}-test.zip`
      //           }
      //         ]
      //       }
      //     }])
      // }
  },
  //骨架屏配置
  configureWebpack: {
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: resolve('src/assets/js/skeleton.js'),
          },
        },
        minimize: true,
        quiet: true,
      }),
    ],
  },

 // css相关配置
 css: {
   // 是否使用css分离插件 ExtractTextPlugin
   extract: true,
   // 开启 CSS source maps?
   sourceMap: false,
   // 启用 CSS modules for all css / pre-processor files.
   modules: false
 },

  //配置端口
  devServer: {
    open: true,  //自动打开浏览器
    // host: '0.0.0.0',
    port: 8888,
    https: false,
    hotOnly: true,
    proxy: null, // 设置代理
    before: app => {}
  },

   
}
