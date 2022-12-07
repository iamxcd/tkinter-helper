import { getCurFile, saveCurFile } from "@/utils/helper"
import { win_default } from "@/core/py-attrs";
const state = {
  curId: 'win',
  attrsForm: {},
  contextMenu: {
    menuName: "demo",
    frame: null,
    eleIndex: null,
    position: null,
    axis: {
      x: null,
      y: null,
    },
    menulists: [
      {
        fnHandler: "eleCopy",
        btnName: "复制组件",
      },
      {
        fnHandler: "eleDel",
        btnName: "删除",
      },
    ],
  },
  frame: win_default(),
  curFile: getCurFile()
}

const mutations = {
  SET_CUR_ID(state, id) {
    state.curId = id
  },
  SET_FRAME(state, frame) {
    state.frame = frame
  },
  SET_CUR_FILE(state, file) {
    state.curFile = file
  },
  SET_ATTRS_FORM(state, form) {
    state.attrsForm = form
  },
  SET_CONTEXT_MENU(state, params) {
    state.contextMenu.position = params.position
    state.contextMenu.eleIndex = params.index
    state.contextMenu.frame = params.frame
    state.contextMenu.axis.x = params.x
    state.contextMenu.axis.y = params.y
    if (params.menu && params.menu.length > 0) {
      state.contextMenu.menulists = params.menu
    }
  }
}

const actions = {
  setCurId({ commit }, curId) {
    commit("SET_CUR_ID", curId)
  },
  setAttrsForm({ commit }, form) {
    commit("SET_ATTRS_FORM", form)
  },
  showContextMenu({ commit }, params) {
    commit("SET_CONTEXT_MENU", params)
  },
  setFrame({ commit }, frame) {
    commit("SET_FRAME", frame)
  },
  setCurFileInfo({ commit }, file) {
    commit("SET_CUR_FILE", file)
    saveCurFile(file)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
