### #安装Vue

```
npm install vue --save
```

### #配置

在  `webpack.config.js` 的 `module.exports` 中加入

```javascript
resolve: {
    //alias: 别名
    alias: {
      //当导入vue时实际上导入 vue/dist/vue.esm.js
      'vue$':'vue/dist/vue.esm.js'
    }
  }
```

这步的目的是让我们开发时能运行vue

### #细节

**el 和 template的区别**：当同时声明了 template 和 el 属性时，vue会使用 template中的内容替换el 所指的内容

**Vue的终极解决方案**：

### #vue-loader

vue-loader可以加载识别 .vue文件

安装

```
npm install vue-loadervue-template-compiler --save-dev
```

配置

```javascript
//引入vue-loader所需插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

plugins: [
    // make sure to include the plugin!
    //确保vue-loader运行的必备插件
    new VueLoaderPlugin(),
  ],
```

### #Plugin 插件的使用

**给输出的js文件添加版权信息**

```
//加载版权信息
const webpack = require('webpack')
plugins: [
    new webpack.BannerPlugin('最终版权归xxx所有'),

],
```

**输出 index.html文件**

安装

```
npm install html-webpack-plugin@3.2.0 --save-dev
```

配置

```javascript
//加载index.html 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
		//以 index.html 为模板输出到dist/index.html
    new HtmlWebpackPlugin({
      template: 'index.html',
    })
  ],
```

**压缩 js 文件**

安装：

```
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```

配置：

```javascript
//引入js文件压缩插件
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

plugins: [
    new uglifyJsPlugin()
  ],
```

### #安装webpack-dev-server

vue 2 对应 webpack@3.6.0 对应 webpack-dev-server@2.9.1

安装

```
npm install webpack-dev-server@2.9.1
```

配置

```javascript

devServer: {
    contentBase: './dist',
    inline: true
}
```

配置项解析

1.  contentBase："./dist" // 本地服务器在哪个目录搭建页面，一般我们在当前目录或者'./dist'即可；
2.  historyApiFallback：true // 当我们搭建spa应用时非常有用，它使用的是HTML5 History Api，任意的跳转或404响应可以指向 index.html 页面；
3.  inline：true // 用来支持dev-server自动刷新的配置，webpack有两种模式支持自动刷新，一种是iframe模式，一种是inline模式；使用iframe模式是不需要在devServer进行配置的，只需使用特定的URL格式访问即可；不过我们一般还是常用inline模式，在devServer中对inline设置为true后，当我们启动webpack-dev-server时仍要需要配置inline才能生效，这一点我们之后再说；
4.  hot：true // 启动webpack热模块替换特性，这里也是坑最多的地方，不少博客都将hot设置了true，我们姑且也设置为true，之后再看；
5. port：端口号(默认8080) // 这就不用我多说了吧；

配置运行脚本，在package.json文件中

```javascript
"scripts": {
    "dev": "webpack-dev-server"
  },
```

则可以在命令行中运行来启动 webpack-dev-server：

```
npm run dev
```

### #配置文件分离

根据不同的情况，将   `webpack.config.js` 配置文件抽离为

基础配置 `base.config.js`

开发时配置 `dev.config.js`

产出时配置 `prod.config.js`

安装webpack-merge

```
npm install webpack-merge@4.1.5 --save-dev
```

#### #基础配置

基础配置抽离一些公用的配置：

```

```

#### #开发配置

```javascript
const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config");

module.exports = webpackMerge(baseConfig,{
  devServer: {
    contentBase: './dist',
    inline: true,
    open: 'msedge'
  }
})
```

#### #产出时配置

```javascript
//引入js文件压缩插件
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = webpackMerge(baseConfig,{
  plugins: [
    new uglifyJsPlugin()
  ],

})
```

#### #启动时引用

在 package.json 文件中指定命令参数

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack  --config ./build/prod.config.js",
    "dev": "webpack-dev-server --config ./build/dev.config.js"
  },
```

