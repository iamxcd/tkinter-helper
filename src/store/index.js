import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curId: 'win'
  },
  getters: {
    curId: (state) => state.curId
  },
  mutations: {
    SET_CUR_ID(state, id) {
      state.curId = id
    }
  },
  actions: {
    setCurId({ commit }, curId) {
      commit("SET_CUR_ID", curId)
    }
  },
  modules: {
  }
})
