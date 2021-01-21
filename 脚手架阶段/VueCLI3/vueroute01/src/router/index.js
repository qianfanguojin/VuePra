//配置路由相关信息
import VueRouter from 'vue-router'
import Vue from 'vue'
const Home = () => import('../views/Home')
const About = () => import('../views/About')
const User  = () => import('../views/User')
import HomeNews from '../views/HomeNews.vue'
import Profile from '../views/Profile.vue'
//1.安装插件到Vue
Vue.use(VueRouter)

//2.配置路由和组件之间应用关系
const  routes = [
  //将默认路径重定向到about
  {
    path:"",
    redirect: "/home",
  },
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
  {
    path:'/about',
    component: About
  },
  {
    path:'/user/:userName',
    component: User
  },
  {
    path:'/profile',
    component: Profile
  },
  

]

//3.创建VueRouter对象 
const router = new VueRouter({
  routes: routes,
  //abstract history hash
  mode: 'history',
  linkActiveClass: 'active'
})

// router.beforeEach((to, from, next) =>{
//   next();
//   console.log("我从" + from.fullPath + "来");
//   console.log("到" + to.fullPath + "去");
// })
//4.导出VueRouter实例
export default router