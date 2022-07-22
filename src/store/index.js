import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curId: 'win',
    attrsForm: {},
    contextMenu: {
      menuName: "demo",
      frame: null,
      eleIndex: null,
      // 菜单显示的位置
      axis: {
        x: null,
        y: null,
      },
      // 菜单选项
      menulists: [
        {
          fnHandler: "delEle",// 绑定事件
          btnName: "删除", // 菜单名称
        },
      ],
    },
  },
  getters: {
    curId: (state) => state.curId,
    attrsForm: (state) => state.attrsForm,
    contextMenu: (state) => state.contextMenu,
  },
  mutations: {
    SET_CUR_ID(state, id) {
      state.curId = id
    },
    SET_ATTRS_FORM(state, form) {
      state.attrsForm = form
    },
    SET_CONTEXT_MENU(state, { x, y, index, frame, menu = [] }) {
      state.contextMenu.eleIndex = index
      state.contextMenu.frame = frame
      state.contextMenu.axis.x = x
      state.contextMenu.axis.y = y
      if (menu.length > 0) {
        state.contextMenu.menulists = menu
      }
    }
  },
  actions: {
    setCurId({ commit }, curId) {
      commit("SET_CUR_ID", curId)
    },
    setAttrsForm({ commit }, form) {
      commit("SET_ATTRS_FORM", form)
    },
    showContextMenu({ commit },
      { x, y, index, frame }) {
      commit("SET_CONTEXT_MENU", { x, y, index, frame })
    }
  },
  modules: {
  }
})
