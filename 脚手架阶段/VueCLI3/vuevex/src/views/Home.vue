<template>
  <div class="home">
    <h2>{{$store.state.counter}} </h2>
    <button @click="btnClickSub()">-</button>
    <button @click="btnClickAdd()">+</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {INCREMENT} from '../store/mutation-type'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods:{
    btnClickAdd() {
      this.$store.commit(INCREMENT)
    },
    btnClickSub() {
      this.$store.commit('decrement')
    }
  }
}
</script>
