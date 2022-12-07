const getters = {
  curId: (state) => state.app.curId,
  attrsForm: (state) => state.app.attrsForm,
  contextMenu: (state) => state.app.contextMenu,
  frame: (state) => state.app.frame,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.info,
  curFile: (state) => state.app.curFile
}
export default getters
