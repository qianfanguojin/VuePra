## 一、Vue Route路由基础

### 1. 两种URL改变但页面不刷新的方式

**Location对象的哈希值**

```
location.hash = "link address"
```

**History对象的pushState()方法**

```html
//入栈，保留历史记录，无法返回
history.pushState({}, '', 'link address')
//入栈，不保留历史记录，可以返回
history.pushState({}, '', 'link address')

//出栈，返回上一历史
history.back();

//向前一个历史
history.forward()

//出栈,position可以为负数
history.go(position);

history.go(-1);//向后一个历史
```

### 2.  使用Vue静态路由

**配置路由框架**

大致分为三步：

-   导入路由对象，调用 Vue.use(VueRouter)注册路由插件
-   创建路由实例，并且传入路由映射配置
-   在Vue实例中挂载创建的路由实例

**配置路由映射**

-   创建路由组件 在view目录创建一个.vue文件

-   配置路由映射 在 router目录的index.js中配置映射

    ```javascript
    //2.配置路由和组件之间应用关系
    const  routes = [
      {
        path:"/home",
        component: Home
      },
      {
        path:'/about',
        component: About
      }
    ]
    ```

    

-   使用路由 p通过 `<router-link>` 和 `<router-view>`

    ```html
    		<router-link to="/home">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-view></router-view>
    ```

**配置默认路由（默认显示首页组件）**

```javascript
//2.配置路由和组件之间应用关系
const  routes = [
  {
    //将默认路径重定向到about
    path:"",
    redirect: "/home",
  },
]
```

**配置URL显示的默认模式**

```javascript
//3.创建VueRouter对象 
const router = new VueRouter({
  routes: routes,
  //abstract history hash
  mode: 'history'
})
```

**关于router-link的属性**

-   tag 修改显示标签类型

    -   a 默认
    -   button
    -   div
    -   ....

-   active-class 修改默认的名称  

    router/index.js

    ```
    //3.创建VueRouter对象 
    const router = new VueRouter({
      linkActiveClass: 'active'
    })
    ```

    App.vue

    ```
    <style>
    .active{
      color: #f00;
    }
    </style>
    ```



### 3. 使用Vue动态路由

this.router: 全局路由对象，包括所有的路由

this.route: 目前活跃的路由

**动态路由的配置方式**

第一，创建一个动态路由组件User

```
<template>
  <div>
    <h2>我是用户 </h2>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

第二，配置路由路径时添加 `:dynamic param`

```
//2.配置路由和组件之间应用关系
const  routes = [
  {
  	//userName为动态参数，不会直接显示在URL中
    path:'/user/:userName',
    component: User
  },
]
```

第三，在父级组件 App.vue中使用 `route-view` 引入

```
<template>
  <div id="app">
    <router-link to="/home" tag="button">首页</router-link>
    <router-link to="/about" tag="button">关于</router-link>
    
    <router-link to="/user" tag="button">个人信息</router-link>
    
    
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
}

</script>
</style>

```

第四，将路径属性赋值到动态参数绑定到路径

```
<template>
  <div id="app">
    <router-link to="/home" tag="button">首页</router-link>
    <router-link to="/about" tag="button">关于</router-link>
    //userName会拼接到 :userName 动态参数
   <router-link :to="'/user/' + userName" tag="button">个人信息</router-link>
    
    
    <router-view></router-view>
  </div>
</template>
export default {
  name: 'App',
  data() {
    return {
    	//这里的userName会赋值到上面的router-link中的to属性中
      userName: 'san'
    }
  }
}

</script>
```

第五，在路由组件中显示参数

```
<template>
  <div>
    <h2>我是用户 </h2>
    <h2>{{userName}} </h2>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     userName: '张三',
  //   }
  // }
  computed: {
    userName() {
    	//获取当前活跃的路由动态参数值（路由路径的userName）
      return this.$route.params.userName
    }
  }
}
</script>
```

![](https://cdn.jsdelivr.net/gh/qianfanguojin/ImageHosting_1/others/20210119214632.gif)



### 4. 路由懒加载

防止我们的文件打包太大，我们可以将组件变为懒加载，打包时就会变为一个单独的文件

格式：

```
const About = () => import('../views/About.vue')
```

### 5. 嵌套路由

定义嵌套组件HomeNews

```
<template>
  <div>
    <p>首页新闻</p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

配置子映射组件 children

```
//2.配置路由和组件之间应用关系
const  routes = [
  {
    path:"/home",
    component: Home,
    children: [
      {
        path:'news',
        component: HomeNews
      },
    
    ]
  },
  
]
```

在父组件中引入 router-view 和 router-link

```
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h2>我是首页</h2>
    <router-link to="home/news">最新消息</router-link>
    <router-view></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>
```

![](https://cdn.jsdelivr.net/gh/qianfanguojin/ImageHosting_1/others/20210119214507.gif)

### 6. 路由传输数据

传值

```
//1. 拼接
<router-link :to="'/user/' + userName" tag="button">个人信息</router-link>

//2. 对象
<router-link :to="{path:'/profile',query: {name: 'li', age:18}}">档案</router-link>

//3. 方法
btn2Click() {
  this.$router.push("'/user/' + userName")
}
btn2Click() {
  this.$router.push({path:'/profile',query: {name: 'li', age:18}})
}

```

接收

```
//方法中
this.$route.params.参数名

//模板中
{{$route.params.参数名}}
```

### 7. 全局导航守卫

“导航”表示路由正在发生改变。监听跳转过程（导航生命周期）

[导航方法](https://router.vuejs.org/zh/api/#router-beforeeach)

[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)

### 8. keep-alive

保持组件的缓存，不用每次刷新，消耗资源

```
<keep-aliv></keep-alive>
```

### 9.路径问题

有时我们的文件文件中路径多样，很可能出现 `../` 这种大量的上一层目录，不易阅读，为了方便阅读，可以在  

vue.config.js 文件中 configureWebpack 下配置 resolve，给路径起别名

```js
 resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
```

现在，替换“在导入时使用相对路径”这种方式，就像这样：

```js
import Utility from '../../utilities/utility';
```

你可以这样使用别名：

```js
import Utility from 'Utilities/utility';
```

[webpack resolve](https://webpack.docschina.org/configuration/resolve/#resolvealias)