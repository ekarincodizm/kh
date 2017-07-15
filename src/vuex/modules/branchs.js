import Api  from '../api';
const state = {
  name: 'branchs',
  branchs: [],
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
  branchs: state=>state.branchs,
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
