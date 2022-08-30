/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-21 15:32:44
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-30 10:51:13
 * @Description: file content
 * @FilePath: /yungeng-applet/store/index.js
 */
//  页面路径：store/index.js
import Vue from "vue"
import Vuex from "vuex"

import app from "@/store/modules/app"
import temp from "@/store/modules/temp"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    temp
  }
})
