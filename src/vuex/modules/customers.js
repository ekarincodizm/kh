import Api  from '../api';
const state = {
  name: 'customers',
  customers: [],
}

const mutations = {
  		sampletest(state, payload ) {
  			console.log('mutation',state,payload)
            state.name  = payload;
        },
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
  customers: state=>state.customers,
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
