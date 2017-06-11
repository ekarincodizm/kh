export default {
	
    search:'',
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
    branchs:[],
    suppliers:[],
    lot: {},
    summaryall: {},
    summary: [],
    
    productcols: ['รหัสสินค้า','ชื่อสินค้า','ราคา','ประเภท','รายละเอียด'],
    bill: {
        cate: "-1",
        name: "",
        supplier_id:-1,
        supplier:{},
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

