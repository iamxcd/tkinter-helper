import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  info: {},
  settings: {},
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_SETINGS: (state, settings) => {
    state.settings = settings
  },

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password, captcha_code, captcha_key } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password, captcha_key, captcha_code }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('登录失败')
        }
        commit('SET_INFO', data.user_info)
        commit('SET_SETINGS', data.settings)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_INFO', {})
    commit('SET_SETINGS', {})
    removeToken()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
