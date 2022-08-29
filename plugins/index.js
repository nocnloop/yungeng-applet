/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-21 15:32:44
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-29 16:29:47
 * @Description: file content
 * @FilePath: /yungeng-applet/plugins/index.js
 */
const plugins = {
  install(Vue) {
    Vue.prototype.$copy = (value) => {
      return JSON.parse(JSON.stringify(value))
    }
  }
}

export default plugins
