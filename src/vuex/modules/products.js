import Api  from '../api';
const state = {
  name: 'products store',
  products:[], 
}

const mutations = {

}

const actions = {
	  async	sampletest({commit,dispatch,rootGetters,rootState,getters,state}) {
		    rootState.app.loading = true;
		    console.log('service=',Api);
		    const vardata = await Api.products.getAll();
		    commit('sampletest', vardata,rootState)
		},
}

const getters = {
 	getName(state, getters, rootState) {return state.name; },
  products: state=>state.products,
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
