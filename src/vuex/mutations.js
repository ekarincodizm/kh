import bootbox  from 'bootbox';

export default {
        
        SET_TOKEN(state, token) {
            state.token = token
        },
        
        REMOVE_TOKEN(state) {
            state.token = null
        },
        
        initdata(state, payload) { // playload obj or data 
            console.log('payload=', payload);
            payload.branchs.unshift({id:-1,name:'----- All-----'});
            state.branch = payload.branch;
            state.branchs = payload.branchs;
            state.categories = payload.categories;
            state.lots = payload.lots;
            state.products = payload.products;
            state.suppliers = payload.suppliers;
            // state.summaryall = payload.summaryall;
            // state.summary = payload.summary;
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
            state.bill.save = false;
            bootbox.alert({ message: 'บันทึกสำเร็จ' , size: 'small'});
        },

        searchavgproduct(state, payload ) {
            state.summary  = payload.data.data.summary;
            state.summaryall  = payload.data.data.summaryall;
        },
        
        
}
