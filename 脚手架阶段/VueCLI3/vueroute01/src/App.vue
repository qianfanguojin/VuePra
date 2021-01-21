<template>
  <div id="app">
    <router-link to="/home" tag="button">首页</router-link>
    <router-link to="/about" tag="button">关于</router-link>
    <router-link :to="'/user/' + userName" tag="button">个人信息</router-link>
    <router-link :to="{path:'/profile',query: {name: 'li', age:18}}">档案</router-link>
    <!-- <button @click="btnClick">首页</button>
    <button @click="btn2Click">关于</button>
    <button @click="btn2Click">关于</button> -->
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
  methods: {
    // btnClick() {
    //   this.$router.push('/home')
    // },
    // btn2Click() {
    //   this.$router.push('/about')
    // }
  },
  data() {
    return {
      userName: 'san',
    }
  }
}

</script>
<style>
.active{
  color: #f00;
}
</style>
