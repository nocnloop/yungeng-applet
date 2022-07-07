const state = {
	currentEditCar: {},

	message: {}
}


const actions = {
	currentEditCarAction: ({ commit }, payload) => {
		state.currentEditCar = payload
	},


	readMessageAction: ({ commit }, payload) => {
		state.message = payload
	},

}




export default {
	state,
	actions,
	namespaced: true,
}
