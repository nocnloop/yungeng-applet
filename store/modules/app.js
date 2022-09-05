/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-21 15:32:44
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-09-01 10:19:06
 * @Description: file content
 * @FilePath: /yungeng-applet/store/modules/app.js
 */
const state = {

  token: "",

  user: {}
}

const actions = {

  tokenAction: ({ commit }, payload) => {
    state.token = payload
  },

  userAction: ({ commit }, payload) => {
    state.user = payload
  }

}

export default {
  state,
  actions,
  namespaced: true
}
