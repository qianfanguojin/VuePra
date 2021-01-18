//模板位置
<template>
  <div>
    <div><h2 class="title">{{message}}</h2></div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      message: 'Man'
    }
  } ,
  methods: {
    
  }
}
</script>

<style scoped>
  .title{
    font-size: 50px;
  }
</style>