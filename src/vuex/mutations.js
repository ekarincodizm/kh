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
            
            state.branch = payload.branch;
            state.lots = payload.lots;

            state.branchs.branchs = payload.branchs;
            state.categories.categories = payload.categories;
            state.products.products = payload.products;
            state.suppliers.suppliers = payload.suppliers;
            state.customers.customers = payload.customers;

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
        lottoday(state){
          let today = new Date();
          let lot = 'LOT'+ today.toISOString().slice(0,10).replace(/-/g,"");
          state.lottoday = lot;
          state.app.newbill = {  
                                cate: -1, supplier:{},supplier_id:-1,name: "", id: "NEW", lot_id:"0", lot_name: lot, date: new Date().toISOString().slice(0,19).replace('T',' '),  
                                billdetails: [{  id:'NEW',item:{   value: '', text: '' }, name:"",qtystr:"",qty:"0",price:"0",amount:"0"}],
                                save: false,
                                isNew : true
                              }
        },
}
