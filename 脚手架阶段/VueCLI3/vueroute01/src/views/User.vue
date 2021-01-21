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
      return this.$route.params.userName
    }
  }
}
</script>

<style>

</style>