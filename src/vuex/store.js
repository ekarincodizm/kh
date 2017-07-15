import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/vuex/api'
import bootbox from 'bootbox'
import modules from '@/vuex/modules';
import actions from './actions'
import mutations from './mutations'
import getters  from './getters';
import state from './state';
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules,
    // strict: process.env.NODE_ENV !== 'production'
})
