//小明

// var flag = true;

//1. 导出方式一
// export{
//   flag
// }

//导出方式二
var height = true;

//1.导出变量
export let flag = true;

//2.导出对象
export{
  height
}

//3.导出函数
export function num(num1, num2){
  return num1 + num2;
}

//4.导出ES6类
export class Person{

}

//5. 默认导出
let name = 'ww'
export default name; 
