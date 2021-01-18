let a = 'sss'
require('./css/normal.css')
require('./js/aaa')
require('./css/spe.less')
document.writeln("Less")

//导入vue
import Vue from 'vue'
// import App from './vue/app'
import App from './vue/App.vue'

const app = new Vue({
  el: '#app',
  template: '<App/>',
  components:{
    App
  }

})