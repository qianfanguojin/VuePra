import axios from 'axios'
// export default 
const instance = axios.create({
  baseURL:'http://wthrcdn.etouch.cn'
  // timeout:
})

//1. 函数参数式封装
// export default function request(config, success , fail) {
//   instance(config)
//   .then(res => {
//     success(res)})
//   .catch(err => {
//     fail(err)
//   })
// }

// 2. Promise式封装
// export default function request(config){
//   return new Promise((resolve , reject) => {
//       instance(config)
//         .then(res => {
//           resolve(res);
//         })
//         .catch(err => {
//           reject(err)
//         })
//   })
// }


// 3.终极
export default function request(config){
  return instance(config);
}
// request({
//   url:'http://wthrcdn.etfouch.cn/weather_mini?city=宜春'
// }).then(daa => {
//   console.log(daa);
// })