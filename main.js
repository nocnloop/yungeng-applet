import App from "./App"
import Vue from "vue"

import plugins from "./plugins"

import store from "./store"

import uView from "@/uni_modules/uview-ui"
Vue.use(plugins)
Vue.prototype.$store = store
Vue.use(uView)

Vue.config.productionTip = false
App.mpType = "app"
const app = new Vue({
  store,
  ...App
})
app.$mount()
