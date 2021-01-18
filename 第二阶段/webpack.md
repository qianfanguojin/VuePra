## 一、webpack 基础

### #安装

安装支持Vue2的webpack

```
npm install --save-dev webpack@3.6.0
```

### #配置

在项目下新建 `webpack.config.js`

```javascript
const path = require('path')

module.exports = {
  entry: './src/main.js', //入口
  output: { //出口，将入口的main.js 打包后输出到 /dist/bundle.js中
    path: path.resolve(__dirname, 'dist'), //_dirname 表示当前文件目录
    filename: 'bundle.js'//输出的文件名
  }
}
```

在终端确定依赖

```
npm install
```



## 二、webpack 进阶配置

### #映射命令

在 `package.json` 配置运行脚本

```json
"scripts": {
    "build": "webpack" //npm run build 映射 webpack指令
  },
```

在终端运行 `webpack` 等同于 `npm run build` 

### #文件打包

`webpack` 会自动根据 `js` 文件中 `require`的依赖层层追踪，然后将这些文件打包。

但默认其只能打包 `js` 文件，我们还需要 `loader` 来打包不同类型的文件

### #loader打包的使用（非js文件关联）

开发中，我们遇到的文件很明显不止 `js` 文件，例如 `.vue` 文件，若我们需要打包这些文件，`webpack` 原生是不支持的，我们需要通过`loader` 来打包

#### #加载css文件

安装css加载器

```javascript
npm install --save-dev css-loader@2.0.2
```

安装css解析器

```
npm install --save-dev style-loader@0.23.1
```

配置

在 `webpack.config.js` 文件中 `module` 对象，配置 `css-loader`

```javascript
module: {
    rules: [
      {
      test: /\.css$/, //正则表达书，匹配找到所有的css文件
       //css loader 负责将css文件加载
       //style loader 负责解析css到dom
       //先加载css才能使用style解析css
       //两者顺序不能倒转，由于webpack是从右到左解析use中的参数，所以style在前，css在后 
      use: ['style-loader','css-loader']
      }
    ]
  }
```

#### #加载less文件

安装 `less-loader`

```
npm install --save-dev less-loader@4.1.0 less
```

配置，在 `webpack.config.js` 文件中 `module` 对象，添加一条 `rule`

```javascript
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
```

#### #加载图片资源

两种加载方式的优先级关键在于 `url-loader` 的 **limit **属性

小图片，使用 `url-loader`, 其会将图片 `base64` 转码，在不存储图片的前提下也可以显示图片

安装

```
npm install --save-dev url-loader@1.1.2
```

配置，在 `webpack.config.js` 文件中 `module` 对象，添加一条 `rule`

```javascript
//小图片加载器
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 限制被url-loader base64加载的最大 的最大文件大小，以bytes为单位
              // 超过limit大小的文件需要通过file-loader加载
              limit: 200000, 
            },
          },
        ],
      },
```

大图片，使用 `file-loader`，其会将图片用哈希命名（避免重复）复制到`dist`文件夹

安装：

```
npm install --save-dev file-loader@3.0.1
```

配置：

已经安装了 `url-loader` 之后，只用到图片可先不配置 `file-loader`

由于 `file-loader` 会默认将图片命名为 **32位 的哈希值**，但开发时我们常常需要对图片**命名进行约束**

为了实现这个目的，我们需要在 `url-loader` 的 **option** 配置中对命名进行约束：

```javascript
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
```

### #babel

babel 可以将 ES6 的语法转化为 ES5的语法，以适应不同的浏览器

安装：

```
npm install babel-loader@7 babel-core@6.26.3 babel-preset-es2015@6.24.1
```

配置，在 `webpack.config.js` 文件中 `module` 对象，添加一条 `rule`

```
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
```

