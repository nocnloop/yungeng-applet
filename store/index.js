//  页面路径：store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/store/modules/app'
import temp from '@/store/modules/temp'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		app,
		temp
	}
})
