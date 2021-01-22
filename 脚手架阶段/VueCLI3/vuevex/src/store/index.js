import Vue from 'vue'
import Vuex from 'vuex'
import {INCREMENT} from './mutation-type'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    [INCREMENT](state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
