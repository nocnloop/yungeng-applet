/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-24 13:34:56
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-30 10:51:27
 * @Description: file content
 * @FilePath: /yungeng-applet/store/modules/temp.js
 */
const state = {
  currentEditCar: {},

  message: {},

  scanMachine: {}
}

const actions = {
  currentEditCarAction: ({ commit }, payload) => {
    state.currentEditCar = payload
  },

  readMessageAction: ({ commit }, payload) => {
    state.message = payload
  },

  scanMachineAction: ({ commit }, payload) => {
    state.scanMachine = payload
  }

}

export default {
  state,
  actions,
  namespaced: true
}
