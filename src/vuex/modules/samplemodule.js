import Api  from '../api';
const state = {
  name: 'samplemodule',
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
 	getName(state, getters, rootState) {
 	  // console.log('getter',state, getters, rootState)
      return state.name;
    }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
