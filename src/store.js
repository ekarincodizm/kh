import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/api'
import bootbox from 'bootbox'

Vue.use(Vuex)

const state = {
    token: null,
    userprofile: {
        name: "admin",
        branchid: 1
    },
    branch: {},
    categories: [],
    lots: [],
    lottoday: '',
    currentlot: '',
    products: [],
    lot: {},
    summaryall: {},
    summary: [],
    bill: {
        cate: 1,
        name: "aaaa",
        id: "-1",
        lotid: "NEW",
        lot_name: "LOT20170401",
        date: '2017-04-01',
        billdetails: [{
            item:{
              id: '',
              name: '',
              category_id: ''
            },
            name: "ผมไม้A",
            qty: "100",
            qtystr: "50+50",
            price: "80",
            amount: "8000"
        }, {
            item:{
              id: '',
              name: '',
              category_id: ''
            },
            name: "ผมไม้B",
            qty: "200",
            qtystr: "45+55+70+30",
            price: "80",
            amount: "16000"
        }, ],
        save: false
    },
    app: {
        loading: false,
        newbill:{}
       }
}

const mutations = {
    SET_TOKEN(state, token) {
            state.token = token
        },
        REMOVE_TOKEN(state) {
            state.token = null
        },
        initdata(state, payload) { // playload obj or data 
            console.log('payload=', payload);
            state.branch = payload.branch;
            state.categories = payload.categories;
            state.lots = payload.lots;
            state.products = payload.products;
            state.summaryall = payload.summaryall;
            state.summary = payload.summary;
            state.app.loading = false;
        },
        lotbyname(state, payload) { // playload obj or data 
            state.lot = payload
            console.log('payload', payload);
            state.app.loading = false;
        },
        newbill (state, payload ) {  // playload obj or data 
            state.bill  = payload 
        },
        
}

const actions = {
    async initdata({commit, state}) {
            state.app.loading = true;
            const initdata = await Api.init();
            commit('initdata', initdata.data.data)
        },
        async lotbyname({commit}, lotname) {
            state.app.loading = true;
            const lot = await Api.lotbyname(lotname)
            console.log('lotbyname action', lot);
            commit('lotbyname', lot.data.data.data)
        },
        async delbillbyid({dispatch, commit}, id) {
            state.app.loading = true;
            try {
                const rs = await Api.delbillbyid(id)
                if (rs.data.data.del_status) {
                    bootbox.alert({ message: 'del bil successed', size: 'small'})
                    dispatch('initdata')
                } else {
                    state.app.loading = falst;
                }
            } catch (e) {
                console.log('error', e);
                state.app.loading = false;
                bootbox.alert({ message:'Error: ไม่สามารถลบได้' , size: 'small'});
            }
        },
        createnewbill: ({ commit }, newbill) => {
            let nb = Object.assign({},newbill)
            commit('newbill', nb)
        },
}

const getters = {
    billchange: state=>JSON.stringify(state.bill)

} 

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
