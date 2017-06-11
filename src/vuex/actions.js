import Api  from './api';
import bootbox from 'bootbox'
// context = {commit,dispatch,getters,state,rootGetters,rootState,}


export default  {
    async initdata({commit,state}) {
            const initdata = await Api.app.init();
            state.app.loading = true;
            console.log('initaction----',initdata);
            commit('initdata', initdata.data.data)
        },
        
        async lotbyname({commit,state}, lotname) {
            state.app.loading = true;
            const lot = await Api.lots.lotbyname(lotname)
            console.log('lotbyname action', lot);
            commit('lotbyname', lot.data.data.data)
        },

        async delbillbyid({dispatch, commit,state}, id) {
            state.app.loading = true;
            try {
                const rs = await Api.bills.delbillbyid(id)
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
        
        createnewbill: ({ commit,state }, newbill) => {
            let nb = Object.assign({},newbill)
            commit('newbill', nb)
        },
        

        async insupbill({commit,dispatch,state}, billdata ) {
            state.app.loading = true;
            try {
                const rs = await Api.bills.insupbill(billdata)
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
        
        async searchavgproduct({commit,state},searchdata){
            const summ = await Api.products.searchavgproduct(searchdata);
            console.log('searchavgproduct',summ);
            commit('searchavgproduct', summ)
        },
        
}