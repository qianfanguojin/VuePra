const path = require('path')
//加载版权信息
const webpack = require('webpack')
//加载index.html 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
//引入vue-loader所需插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//引入js文件压缩插件
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/main.js', //入口,可以是字符串 / 数组 / 对象
  output: { //出口，
    //_dirname 表示当前文件目录, path 通常是一个绝对路径
    //打包后的资源都会输出到这个目录
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', //输出的文件名
    //publicPath: 'dist/', //指定资源发布时所带的路径前缀
  },
  module: {
    rules: [
      // CSS加载器
      {
        test: /\.css$/, //正则表达书，匹配找到所有的css文件
        //css loader 负责将css文件加载
        //style loader 负责解析css到dom
        //先加载css才能使用style解析css
        //两者顺序不能倒转，由于webpack是从右到左解析use中的参数，所以style在前，css在后 
        use: ['style-loader', 'css-loader']

      },

      // less-loader加载器
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },

      //url-loader小图片加载器
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            // 限制被url-loader base64加载的最大 的最大文件大小，以bytes为单位
            // 超过limit大小的文件需要通过file-loader加载
            limit: 200000,
            // [] 中的为变量，
            //所以下面规范代表所有的图片打包到img目录下
            //以 原图片名.8位哈希值.扩展名
            //如001.jpg 重命名为 001.ce671a46.jpg
            name: 'img/[name].[hash:8].[ext]'
          },


        }, ],
      },

      //babel ES6转ES5
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },

      //Vue-loader
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
      //大图片加载器file-loader
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //     },
      //   ],
      // },

    ]
  },
  plugins: [
    // make sure to include the plugin!
    //确保vue-loader运行的必备插件
    new VueLoaderPlugin(),

    new webpack.BannerPlugin('最终版权归xyf所有'),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    new uglifyJsPlugin()
  ],

  resolve: {
    //alias: 别名
    alias: {
      //当导入vue时实际上导入 vue/dist/vue.esm.js
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  devServer: {
    // 1. contentBase："./dist" // 本地服务器在哪个目录搭建页面，一般我们在当前目录或者'./dist'即可；

    // 2. historyApiFallback：true // 当我们搭建spa应用时非常有用，它使用的是HTML5 History Api，任意的跳转或404响应可以指向 index.html 页面；
    
    // 3. inline：true // 用来支持dev-server自动刷新的配置，webpack有两种模式支持自动刷新，一种是iframe模式，一种是inline模式；使用iframe模式是不需要在devServer进行配置的，只需使用特定的URL格式访问即可；不过我们一般还是常用inline模式，在devServer中对inline设置为true后，当我们启动webpack-dev-server时仍要需要配置inline才能生效，这一点我们之后再说；
    
    // 4. hot：true // 启动webpack热模块替换特性，这里也是坑最多的地方，不少博客都将hot设置了true，我们姑且也设置为true，之后再看；
    
    // 5. port：端口号(默认8080) // 这就不用我多说了吧；
    contentBase: './dist',
    inline: true,
    open: 'msedge'
  }
}