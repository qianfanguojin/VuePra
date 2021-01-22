import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import request from './components/network/request'

Vue.config.productionTip = false
// const request = axios.create();

//函数式封装调用
// request({
//   url:'http://wthrcdn.etouch.cn/weather_mini?city=宜春'
// },(res) => {
//   console.log(res);
// }, (err) => {
//   console.log(err);
// })


//Promise封装调用
// request({
//   url: '/weather_mini?city=宜春'
// }).then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// })



//终极封装方法调用
request({
  url: '/weather_mini?city=宜春'
}).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
})
// axios.get('http://wthrcdn.etouch.cn/weather_mini?city=宜春',{
// })
// .then(data => {
//   console.log(data);
// }).catch((err) => {
//   console.log("  fdsf");
//   console.log(err);
// })

// axios.get('http://wthrcdn.etouch.cn/weather_mini',{
//   params: {
//     city:'宜春'
//   }
// })
// .then(data => {
//   console.log(data);
// }).catch((err) => {
//   console.log("fdsf");
//   console.log(err);
// })

// axios.get('http://httpbin.org/get',{

// }).then((data) =>{
//   console.log(data);
// })


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

