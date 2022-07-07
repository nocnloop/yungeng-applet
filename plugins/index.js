const plugins = {
	install(Vue) {
		Vue.prototype.$copy = (value) => {
			return JSON.parse(JSON.stringify(value))
		}
	}
}

export default plugins
