import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curId: 'win',
    attrsForm: {}
  },
  getters: {
    curId: (state) => state.curId,
    attrsForm: (state) => state.attrsForm
  },
  mutations: {
    SET_CUR_ID(state, id) {
      state.curId = id
    },
    SET_ATTRS_FORM(state, form) {
      state.attrsForm = form

    }
  },
  actions: {
    setCurId({ commit }, curId) {
      commit("SET_CUR_ID", curId)
    },
    setAttrsForm({ commit }, form) {
      commit("SET_ATTRS_FORM", form)
    }
  },
  modules: {
  }
})
