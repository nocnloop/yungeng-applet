/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-24 13:34:56
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-09-01 10:18:46
 * @Description: file content
 * @FilePath: /yungeng-applet/store/modules/temp.js
 */
const state = {
  machineList: [],

  selectMachineIndex: 0,

  scanMachine: {}
}

const actions = {

  selectMachineIndexAction: ({ commit }, payload) => {
    state.selectMachineIndex = payload
  },

  machineListAction: ({ commit }, payload) => {
    state.machineList = payload
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
