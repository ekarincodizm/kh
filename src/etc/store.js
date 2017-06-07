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
    
    productcols: ['รหัสสินค้า','ชื่อสินค้า','ราคา','ประเภท','รายละเอียด'],
    bill: {
        cate: "-1",
        name: "",
        id: "NEW",
        lot_id: "NEW",
        lot_name: "",
        date: "",
        billdetails: [],
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
        insupbill (state, payload ) {  // playload obj or data 
            state.bill  = payload 
            console.log('billsave==bf',state.bill.save);
            state.bill.save = false;
            console.log('billsave==af',state.bill.save);
            state.app.loading = false;
            vm.$store.state.bill.save = false;
            bootbox.alert({ message: 'บันทึกสำเร็จ' , size: 'small'});
        },
        searchavgproduct(state, payload ) {
            console.log('payload=',payload);
            state.summary  = payload.data.data.summary;
            state.summaryall  = payload.data.data.summaryall;
        },
        
        
}

const actions = {
    async initdata({commit, state}) {
            state.app.loading = true;
            const initdata = await Api.init();
            console.log('initaction----',initdata);
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
        async insupbill({commit,dispatch}, billdata ) {
            state.app.loading = true;
            try {
                const rs = await Api.insupbill(billdata)
                console.log('return of insupbill data------',rs);
                commit('lotbyname', rs.data.data.data)
                commit('insupbill',rs.data.data.bill)
                dispatch('initdata');
            } catch (e) {
                console.log('error', e);
                state.app.loading = false;
                bootbox.alert({ message: 'Error: ไม่สามารถ บันทึกได้ ' , size: 'small'});
            }
        },
        async searchavgproduct({commit},searchdata){
            const summ = await Api.searchavgproduct(searchdata);
            commit('searchavgproduct', summ)
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
