import App from './App'
import Vue from 'vue'

import plugins from './plugins'
Vue.use(plugins)

import store from './store'
Vue.prototype.$store = store

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
