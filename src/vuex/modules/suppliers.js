import Api  from '../api';
const state = {
  name: 'suppliermodule',
  suppliers:[],
}

const mutations = {
      updatesupplier(state, payload ) {
            // console.log('mutation',payload)
            // payload.suppliers.unshift(payload.value);
            // payload.bill.supplier = payload.value;
            // payload.bill.name = payload.value.name;
            // payload.bill.supplier_id = payload.value.id;
        },

  		addsupplier(state, payload ) {
  			    console.log('mutation',payload)
            state.suppliers.unshift(payload.value);
            payload.suppliers.unshift(payload.value);
            payload.bill.supplier = payload.value;
            payload.bill.name = payload.value.name;
            payload.bill.supplier_id = payload.value.id;
            payload.app.loading = false;
        },
}

const actions = {
    async  addsupplier({commit,rootState,state},supplier) {
                rootState.app.loading = true;
                console.log('service=',Api);
                const values = await Api.supplier.addsupplier(supplier);
                console.log('v=',values);
                let sp = values.data.data.sp;
                commit('addsupplier', { suppliers:rootState.suppliers,value: sp,bill:rootState.bill, app: rootState.app } )
          },

      	  updatesupplier({commit,rootState,state},values) {
      		    // commit('updatesupplier',{ suppliers:rootState.suppliers,value: values,bill:rootState.bill} )
      		},
}

const getters = {
 	  getName(state, getters, rootState) {
      return state.name;
    },
    suppliers: (state)=>state.suppliers,
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
