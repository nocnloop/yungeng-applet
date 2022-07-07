/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-21 15:32:44
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-07 09:58:32
 * @Description: file content
 * @FilePath: /smart-logistics-applet/store/modules/app.js
 */
const state = {
  isInit: false,

  token: "",

  user: {},

  weChatUser: {},

  car: [],

  defaultCar: {}
}

const actions = {
  initAction: ({ commit }, payload) => {
    state.isInit = payload
  },

  tokenAction: ({ commit }, payload) => {
    state.token = payload
  },

  userAction: ({ commit }, payload) => {
    state.user = payload
  },

  weChatUserAction: ({ commit }, payload) => {
    state.weChatUser = payload
  },

  carAction: ({ commit }, payload) => {
    state.car = payload
    if (state.car.length > 0) {
      const defaltCar = state.car.find(item => item.ifDefault == 0)
      state.defaultCar = defaltCar || state.car[0]
    }
    if (state.car.length == 0) state.car = {}
  }
}

export default {
  state,
  actions,
  namespaced: true
}
