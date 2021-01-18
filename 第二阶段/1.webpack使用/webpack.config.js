const path = require('path')

module.exports = {
  entry: './src/main.js', //入口,可以是字符串 / 数组 / 对象
  output: { //出口，
    //_dirname 表示当前文件目录, path 通常是一个绝对路径
    //打包后的资源都会输出到这个目录
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js',//输出的文件名
    publicPath: 'dist/', //指定资源发布时所带的路径前缀
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
      use: ['style-loader','css-loader']
      
      },

      // less-loader加载器
      {
        test: /\.less$/,
        use: [
          {
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
        use: [
          {
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
            
            
          },
        ],
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
  }
}