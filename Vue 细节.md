## 一、基础

### 1. 指令

### 2. 属性绑定

### 3. 条件判断

#### v-if和v-show区别

v-if若不满足条件，不会生成dom，v-show不满足条件，会生成dom，只是不显示而已



---



### 4. 计算属性

#### 计算属性compute和methods的区别

-   计算属性compute一般用来作为计算某个复杂值使用，有缓存，多次调用只执行一次
-   方法 methods 使用比较广泛，会多次调用



---



### 5. 事件监听

#### input的复用问题

-   Vue 默认会复用已经存在的标签，加强性能

-   为标签指定单独的ke，可以让其不被复用

    ```javascript
    <!-- 为标签指定单独的key，可以让其不被复用 -->
        <span v-if="isUser">
          <label for="username">用户名</label>
          <input type="text" name="username" id="username" key="username">
        </span>
    ```

    

----

### 6. 表单绑定 V-model

三个特殊情况

-   checkbox 单选为布尔值，多选为数组
-   radio
-   select 单选为布尔值，多选为数组



---



### 7. Vue 的方法和属性调用细节

-   `v-if` 中调用方法必须加括号
-   {{}} Mustache 语法中调用方法不加括号
-   事件绑定调用方法时默认带一个event参数，无论是否声明参数`test()=test($event)`
    -   可以不加括号
    -   其余地方括号可加可不加

---



## 二、组件化

### 1. 组件基础

1.  ~~`Vue`的组件注册时定义的标签名似乎只能小写~~，事实证明并不是，组件注册时可以使用驼峰:`myCon` 出现大写，但是由于 `html`是不区分大小写的，在调用时必须将大写转小写，并加上`-`

    ```javascript
    <script>
        //1.创建组件Vue.extend() template属性为html模板
        let conC = Vue.extend({
          template: '<p>4324324</p>'
        });
        //2. 注册组件Vue.component(新标签名(字符串), 组件对象)，有大写
        Vue.component('myCpn',conC)
    
      </script>
    
      <!-- 3. 使用新标签名，必须放在Vue处理的标签内，转为小写可调用 -->
      <div id ="app">
        <my-cpn></my-cpn>
        
      </div>
      <script>
       //创建Vue实例,得到 ViewModel
       const app = new Vue({
        el: '#app',
        data: {
          message: '你好啊',
        },
        methods: {}
       });
      </script>
    ```
    
2.  Vue可以实现父子节点的注册，但除了在全局注册的组件外，Vue 组件内注册的组件并不能被外界的组件所使用，因为Vue在渲染每个组件时会把子组件所代表的**标签名**渲染成html

    ```javascript
    //子节点
    let conC = Vue.extend({
          template: '<p>4324324</p>'
     });
    //父节点
    let conN = Vue.extend({
          template: '<p>4324324</p><conc></conc>'
      		component: {
      			conc: conC
    			}
     });
    
    <conc></conc> 无法在外部使用
    ```

### 2. 组件模板抽离

#### 基础版

定义组件时，定义HTML模板经常是不可避免的，而在template属性中定义模板需要一个字符串，在没有语法提示和自动缩进时编码极度不方便

```javascript
<script>
      Vue.component('cpn', {
        template: '<p>内部定义</p>' //字符串定义换行和格式化麻烦
      })
 </script>
      
```

 事实上，可以将模板转化为在组件外部编写
           1. 通过script标签，类型type为 text/x-template，定义 id,在组件的template属性中通过选择器语法选择器
           2. 通过template 标签，定义 id，在组件的template属性中通过选择器语法选择

```javascript
<!-- 1. script标签 -->
      <script type="text/x-template" id="scpn">
        <p>script 标签定义</p>
      </script>

      <!-- 2. template标签 -->
      <template id='tcpn'>
        <p>template 标签定义</p>
      </template>

      <script>

        Vue.component('scpn',{
          template: '#scpn'
        })

        Vue.component('tcpn', {
          template: '#tcpn'
        })
      </script>
```

### 3. 组件和Vue实例中的数据通信

组件不能访问Vue实例 `data` 中的数据，而且组件中虽然也有`data`属性，但有如下限制

-   值必须为函数
-   返回一个对象

```javascript
data() {
	return {
		key: value
	
	}
}
```

### 4. 父子组件的通信

开发之中，很有可能会出现不同组件之间的数据通信，可能是父组件获取到数据给子组件展示，也有可能是子组件有消息反馈给父组件，这都需要用到组件通信的办法。

![](https://cdn.jsdelivr.net/gh/qianfanguojin/ImageHosting_1/others/20210114162151.png)

在Vue中，父子组件通信的方式有两种

-   父组件向子组件传数据  通过 **props**
-   子组件向父组件传数据  通过 **emit**



---





#### 4.1 使用props实现父组件向子组件传输数据 

父向子通信通过props属性，两步

1.  在子组件props中声明新的变量名接收父组件的数据*

2.  在子组件的template html标签中Vue绑定 v-bind:子组件属性="父组件属性值"



```javascript
		//多种接收值的方式
    //1.用数组，数组中的字符串就是接收到的变量名,上下必须一致
    //props:['cmessage', 'cage'] 
    //2. 用对象
    props: {
      // cmessage : String //1.接收名为cmessage指定类型String

      cmessage: {    //2.接受名为cmessage,对这个变量约束操作抽象为一个对象      
        type: String,   
        default: "aaa", //设置默认值
        // default: function(){}如果是类型为数组和对象默认值必须为函数 
        required: true //设置该属性为必传属性，即在自定义dom中必须绑定
      }
    },
```

![](https://cdn.jsdelivr.net/gh/qianfanguojin/ImageHosting_1/others/20210114195740.png)

#### 4.2 使用emit方法向子组件发送消息（数据）

