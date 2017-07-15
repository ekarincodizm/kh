<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
        รับซื้อผลไม้
        <small>&nbsp;</small>
      </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li><a style="curson:pointer;" href="#" @click="$router.go(-1)">Product lots</a></li>
                <li class="active">add Product</li>
            </ol>
        </section>
        <section class="content noprint">
            <div class="box box-default ">
                <div class="box-header with-border">
                    <i class="fa fa-warning"></i>
                    <h3 class="box-title">ข้อมูลบิล</h3>
                    <div class="box-tools pull-right">
                        <!-- <button v-show="isshowcurrentlot"  @click="newbill" type="button" class="btn btn-box-tool primary" style="width:150px;">New Current Lot Bill</button>             -->
                        <button @click="newtdbill" type="button" class="btn btn-box-tool " style="width:100px;">
                            <i class="glyphicon glyphicon-plus"></i>&nbsp;New
                        </button>
                        <button v-show="issave" @click="save" type="button" class="btn btn-success" style="width:90px;">
                            <i class="glyphicon glyphicon-floppy-save"></i>&nbsp; Save
                        </button>
                        <button @click="print" type="button" class="btn btn-success" style="width:90px;">
                            <i class="glyphicon glyphicon-print"></i>&nbsp; Print
                        </button>
                    </div>
                </div>
                <div class="box-body form-horizontal">
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div class="form-group">
                            <label class="col-sm-4 control-label nowrap">หมายเลยบิล:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" placeholder="NEW" autocomplete="off" name="billid" readonly v-model="bill.id">
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-5 control-label">LOT:</label>
                            <div class="col-sm-7" style="display:inline-block; white-space: nowrap;">
                                <div class="form-control">
                                    {{bill.lot_id}} /
                                    <input type="text" style="width: calc(100% - 35px); height: 29px;  margin-top: -6px; border: none;" v-model="bill.lot_name" placeholder="LOT NAME" autocomplete="off">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div class="form-group">
                            <label class="col-sm-4 control-label nowrap">ชื่อผู้ขาย:</label>
                            <div class="col-sm-8" style="display:inline-block; white-space: nowrap;">
                             	<div class="input-group">
	                                <model-list-select 
	                                     v-bind:list="suppliers" 
	                                     option-value="id"
	                                     option-text="name" 
	                                     :custom-text="supplecustomfield" 
	                                     placeholder="select item" 
	                                     v-model="bill.supplier" 
	                                     v-on:input="(item)=>{ bill.name = item.name}" 
	                                     autofocus>
	                                 </model-list-select>
	                                 <span @click="newsuppler" style="cursor:pointer;" 
	                                 class="input-group-addon">
	                                 <i class="glyphicon glyphicon-plus"></i>
	                                 </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label nowrap">ประเภท:</label>
                            <div class="col-sm-7">
                                      <el-select v-model="bill.cate" placeholder="กรุณาเลือก เลือก สาขา" >
                                          <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
                                          </el-option>
                                      </el-select>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label nowrap">วันที่: </label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" placeholder="NEW" autocomplete="off" v-model="bill.date" v-on:change="watchchange">
                            </div>
                        </div>
                    </div>
                </div>
				<!-- <pre>{{bill}}</pre> -->
            </div>
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">รายการผลไม้</h3>
                    <div class="box-tools pull-right">
                        <button @click="addproduct" type="button" class="btn btn-primary" style="width:120px;float:right;margin-bottom: 10px"><i class="glyphicon glyphicon-plus"></i>&nbsp;ผลไม้</button>
                    </div>
                </div>
                <div class="box-body">
                    <table id="productlist" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ชื่อ - รายการ</th>
                                <th style="text-align:right"> จำนวน (kg) </th>
                                <th style="text-align:right"> ราคา / กิโลกรัม </th>
                                <th style="text-align:right"> จำนวนเงิน </th>
                                <th style="text-align:right"> Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(detail,index) in bill.billdetails">
                                <td style="width:30%;">
                                    <model-list-select v-bind:list="products" option-value="id" tabindex="(index*1)" option-text="name" :custom-text="codeAndNameAndDesc" placeholder="select item" v-model="bill.billdetails[index].item" v-on:input="(item)=>{onSelect(item,detail)}" autofocus>
                                    </model-list-select>
                                </td>
                                    <td style="width:20%;" align="right">
                                        <input tabindex="(index*1)+1" v-on:dblclick="keytext(detail)" class="txtinput" type="number" v-on:change="watchchange" v-model="detail.qty" />
                                    </td>
                                    <td style="width:20%;" align="right">
                                        <input tabindex="(index*1)+2" 
                                          @keyup.tab="tabkey(index)" 
                                          v-on:change="watchchange" 
                                          class="txtinput" 
                                          type="number" 
                                          v-model="detail.price" />
                                    </td>
                                    <td style="width:20%;" align="right" tabindex="-1">
                                       <input readonly tabindex="-1" style="border:none;text-align:right" v-bind:value ="detail.qty * detail.price" />
                                    </td>
                                    <td style="width:10%;" align="right" tabindex="-1">
                                        <button tabindex="-1" @click="delete_details(detail,index)" class="btn btn-danger btn-xs">
                                            <span tabindex="-1" class="glyphicon glyphicon-trash"></span>
                                        </button>
                                    </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><b>เฉลี่ย รวม </b></td>
                                <th style="text-align:right">{{sumtotal.qty}}</th>
                                <th style="text-align:right">-</th>
                                <th style="text-align:right">{{sumtotal.total}}</th>
                                <th style="text-align:right">&nbsp;</th>
                            </tr>
                        </tfoot>
                        <tfoot>
                            <tr>
                                <button @click="addproduct" type="button" class="btn btn-primary" 
                                  style="width:120px;float:left;margin:10px;">
                                  <i class="glyphicon glyphicon-plus"></i>&nbsp;ผลไม้
                                </button>
                            </tr>
                        </tfoot>
                    </table>
                    <!-- /.box-body -->
                </div>
                <!-- /.box-body -->
                <div class="box-footer">
                    {{bill.billdetails.length}}
                    <!-- Footer -->
                    <!-- <pre>{{bill.billdetails}}</pre> -->
                </div>
            </div>
        </section>
        <section class="content printbox">
            <table class="prntable" align="center" valign="top" width="95%">
                <thead>
                    <tr class="customer noleftright">
                        <td colspan="5" valign="top" style="pading:0;">
                            <div>
                                <table class="customertable" width="100%">
                                    <tr>
                                        <td colspan="5" style="text-align:center">
                                            <b>กุ่ยฮวด รับซื้อผลไม้</b>
                                            <br/>
                                            <span>บิลเงินสด</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="60%" colspan="3">ชื่อ {{bill.name}}</td>
                                        <td>เลขที่บิล</td>
                                        <td>{{bill.id}}</td>
                                    </tr>
                                    <tr>
                                        <td width="60%" colspan="3">ที่อยู่ {{bill.address}}</td>
                                        <td>วันที่</td>
                                        <td>{{bill.date}}</td>
                                    </tr>
                                    <tr>
                                        <td width="60%" colspan="5">&nbsp;</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align:center;">No.</th>
                        <th style="text-align:center;">รายการ ผลไม้</th>
                        <th style="text-align:center;"> จำนวน (kg) </th>
                        <th style="text-align:center;"> ราคา / กิโลกรัม </th>
                        <th style="text-align:center;"> จำนวนเงิน </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(detail,index) in bill.billdetails">
                        <td style="width:10%;padding-left:10px;border:1 solid">{{index+1}}</td>
                        <td style="width:30%;padding-left:10px;border:1 solid">{{detail.name}}</td>
                        <td style="width:20%;padding-right:5px;border:1 solid" align="right">{{detail.qty}}</td>
                        <td style="width:20%;padding-right:5px;border:1 solid" align="right">{{detail.price}}</td>
                        <td style="width:20%;padding-right:5px;border:1 solid" align="right">{{(detail.qty * detail.price).toLocaleString('th-TH', {minimumFractionDigits: 2})}}</td>
                    </tr>
                    <tr v-for="(row,index) in whiterow">
                        <td style="width:10%;padding-right:5px;border:1 solid" align="right">&nbsp;</td>
                        <td style="width:30%;padding-right:5px;border:1 solid" align="right">&nbsp;</td>
                        <td style="width:20%;padding-right:5px;border:1 solid" align="right">&nbsp;</td>
                        <td style="width:20%;padding-right:5px;border:1 solid" align="right">&nbsp;</td>
                        <td style="width:20%;padding-right:5px;border:1 solid" align="right">&nbsp;</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="noleftright">
                        <td colspan="5"></td>
                    </tr>
                    <tr>
                        <td colspan="3">&nbsp;**{{thaibaht}}**</td>
                        <td style="width:20%;padding-right:5px" align="right">รวมเป็นเงิน</td>
                        <td style="width:20%;padding-right:5px" align="right">{{sumtotal.total.toLocaleString('th-TH', {minimumFractionDigits: 2})}}</td>
                    </tr>
                    <tr class="notop">
                        <td colspan="5" valign="middle">&nbsp;ผู้รับเงิน:</td>
                    </tr>
                </tfoot>
            </table>
        </section>
    </div>
</template>

    <script>
      import bootbox from '@/lib/bootbox'
      import { mapState, mapActions  } from 'vuex'
      import ModelListSelect from '@/components/ModelListSelect.vue'
      import ThaiBaht from 'thai-baht-text' 

      export default {
        name: 'Addproduct',
        data(){
          return {
            codeAndNameAndDesc (item) {
              return `${item.product_code} - ${item.name}`
            },
            item: {
              id: '',
              name: '',
              category_id: ''
            },
            pageline: 18
          }
        },
        methods: {
              ...mapActions(['createnewbill','insupbill','suppliers/updatesupplier']), //suppliers/updatesupplier
              ...mapActions({
					createnewbill:	'createnewbill',
					insupbill:	 'insupbill',
					addsupplier: 'suppliers/addsupplier'
              }),
              newsuppler(){
					// bootbox.form({
					//     title: 'User details',
					//     fields: {
					//         name: {
					//             label: 'Name',
					//             value: 'John Connor',
					//             type:  'text'
					//         },
					//         hedden: {
					//             label: 'hidden',
					//             value: 'hidden',
					//             type:  'hidden'
					//         },
					//         date: {
					//             label: 'Date',
					//             value: new Date(),
					//             type:  'date'
					//         },
					//         datetime: {
					//             label: 'Date',
					//             value: new Date(),
					//             type:  'datetime'
					//         },
					//         time: {
					//             label: 'Date',
					//             value: '',
					//             type:  'time'
					//         },
					//         number: {
					//             label: 'Date',
					//             value: '',
					//             type:  'number'
					//         },
					//         email: {
					//             label: 'E-mail',
					//             type:  'email',
					//             value: 'johnconnor@skynet.com'
					//         },
					//         type: {
					//             label: 'Type',
					//             type:  'select',
					//             options: [
					//                 {value: 1, text: 'Human'},
					//                 {value: 2, text: 'Robot'}
					//             ]
					//         },
					//         alive: {
					//             label: 'Is alive',
					//             type: 'checkbox',
					//             value: true
					//         },
					//         loves: {
					//             label: 'Loves',
					//             type: 'checkbox',
					//             value: ['bike','mom','vg'],
					//             options: [
					//                 {value: 'bike', text: 'Motorbike'},
					//                 {value: 'mom', text: 'His mom'},
					//                 {value: 'vg', text: 'Video games'},
					//                 {value: 'kill', text: 'Killing people'}
					//             ]
					//         },
					//         passwd: {
					//             label: 'Password',
					//             type: 'password'
					//         },
					//         desc: {
					//             label: 'Description',
					//             type: 'textarea'
					//         }
					//     },
					//     callback: function (values) {
					//         console.log(values)
					//     }
					// })

              	bootbox.form({
				    title: 'ผู้ขายใหม่',
				    fields: {
				        cus_code: {
				            label: 'รหัส',
				            value: '',
				            type:  'text'
				        },
				        name: {
				            label: 'ขื่อ',
				            value: '',
				            type:  'text'
				        },
				        cus_id : {
				            label: 'ที่อยู่ บัตรประชาชน',
				            value: '',
				            type:  'text'
				        },
				    },
				    callback: (values) => {
				        console.log(values)
				        if(values) {
				        	values.id = 'NEW',
				        	// this.suppliers.unshift(values);
				        	console.log(this.bill)
				        	console.log(this.$store)
				        	// this['suppliers/updatesupplier'](values);
				        	// this.$store.dispatch('suppliers/updatesupplier',values);
				        	let spjson = JSON.stringify(values);
				        	this.addsupplier(spjson);
				        }
				    }
				})
              },
              supplecustomfield(supp) {
              	return supp.cus_code + ' '+ supp.name;  
              },
              cateselect(evt){
                console.log('---cateselect---',evt)
                this.watchchange();
              },
              tabkey(key){
                console.log('----tab--key--adproduct-',key,this.bill.billdetails.length)
                if((key+1) == this.bill.billdetails.length ){
                  this.addproduct();
                }
              },
              checkpagebreak(idx){
                console.log('checkpagebreak',idx)
                  if(idx < this.pageline ) {
                    return false;
                  } else {
                    return idx/this.pageline == 0;
                  }
              },
              onSelect(item,model){
                console.log('----oninput-parent----',item,model)
                 if(typeof item == 'undefined') {
                    console.log('item no name1---',item);
                 } else {
                    console.log('item no name2---',item);
                    model.name = item.name
                    model.product_id =item.id
                    // detail.product_id = item.id; 
                 }
                // item.name = model.name;
                // model.qty = 1;
                // model.price = item.price;
              },
              validate(){
                  let chk = true;
                  let msg = '';
                  if(this.bill.cate <= 0 ){
                    console.log('chk cate',chk)
                    chk = false 
                    msg += '&nbsp;&nbsp;&nbsp;&nbsp;เลือกประเภทผลไม้<br/>'
                  }  

                  if(this.bill.name ==  "" ){
                      chk = false;
                      msg +=  '&nbsp;&nbsp;&nbsp;&nbsp;ชื่อผู้ขาย<br/>'
                      console.log('chk name',chk)
                  } 


                  if( this.bill.billdetails.length == 0 || this.bill.billdetails[0].name == '' ) {
                    chk = false;
                    msg += '&nbsp;&nbsp;&nbsp;&nbsp;ใส่ข้อมูลรายการให้ถูกต้อง';
                    console.log('chk billdetails',chk)
                  } 

                  if(msg){
                    bootbox.alert('<b>กรุณาทำต่อไปนี้</b>:<br/><br/> '+ msg);
                  }

                  return chk;
              },
              watchchange(){
                  console.log('----start watch change------')
                  let ps = this.products.filter(item =>{ let t = item.category_id == this.bill.cate
                    console.log('--filter---',item.category_id,t)
                    return t;
                     } )
                  console.log('filter',ps,this.bill.cate)
                  // this.$store.state.app.watchchange = this.$store.watch(
                  // state=>JSON.stringify(state.bill),
                  // (a)=>{ 
                        this.bill.save = true;
                  //       this.$store.state.app.watchchange()
                  //       console.log('------watch end --------')
                  //     }
                  // )
              },
              print(){
                console.log('chkprn',this.bill);
                if(this.bill.id == 'NEW' || this.bill.lot_id == 0 || this.bill.lot_id == 'NEW' ){
                  bootbox.alert('ไม่มีรายการ')
                } else {
                  window.print();
                }
              },
              save(){
                 if(this.validate()){
                  console.log('save--',JSON.stringify(this.bill))
                  console.log(this.bill)
                  this.insupbill(JSON.stringify(this.bill));
                 } 
              },
              newtdbill(){
                  console.log('newbill')
                  if(this.bill.save || this.bill.lotid != this.$store.state.lottoday ) {
                    bootbox.confirm('บิลเดิมยังไม่จัดเก็บ ต้องการทำบิลใหม่หรือไม่ ?',(result) => {
                    if(result){
                      let nb= JSON.parse(JSON.stringify(this.$store.state.app.newbill))
                      nb.lotid = 0;
                      nb.lot_name = this.$store.state.lottoday
                      nb.save = false
                      this.createnewbill(nb);
                      // this.$refs.salename.focus()
                      }
                  })
                  } else {
                    if(!this.bill.isNew){
                      let nb= JSON.parse(JSON.stringify(this.$store.state.app.newbill))  
                      nb.save = false
                      nb.lotid = 0
                      nb.lot_name = this.$store.state.lottoday
                      this.createnewbill(nb);
                    }
                  }
                 console.log('----- test -------') 
              },
              newbill(){
                console.log('newbill')
               if(this.bill.save || this.bill.lotid != this.$store.state.currentlot  ) {
                  bootbox.confirm('บิลเดิมยังไม่จัดเก็บ ต้องการทำบิลใหม่หรือไม่ ?',(result) => {
                  if(result){
                    let nb= JSON.parse(JSON.stringify(this.$store.state.app.newbill))
                    nb.lotid = 0
                    nb.save = false
                    nb.lot_name =this.$store.state.currentlot
                    this.createnewbill(nb);
                    // this.$refs.salename.focus()
                    }
                })
              } else {
                  if(!this.bill.isNew){
                    let nb= JSON.parse(JSON.stringify(this.$store.state.app.newbill))
                    nb.lotid = 0
                    nb.save = false
                    nb.lot_name = this.$store.state.currentlot
                    this.createnewbill(nb);
                  }
              }
          },
          addproduct() {
            console.log('addproduct')
            this.bill.billdetails.push( {  id:'NEW',item:{   value: '', text: '' }, name:"",qtystr:"",qty:"0",price:"0",amount:"0"} )
            this.bill.save = true;
            this.$store.state.addbillsave = this.bill.save;
            this.bill.isNew = false;
          },
          keynumbers(str) {
            console.log('str=',str)
              let   arr = str.split('+');
              let rs = arr.reduce((a,b)=>Number(a)+Number(b),0);
              if(rs == NaN ){
                bootbox.alert({ mmessage:'Error:มีใส่ข้อมูลที่ไม่ใช่ัวเลยและเครื่องหมาย +',size: 'small'});
              } else{
                return rs
              }
          },
          keytext(detail){
            console.log('keytext=',detail)
             bootbox.prompt({
                title: "ใส่ตัวเลข และ เครื่องหมาย + เท่านั้น",
                value: detail.qtystr,
                callback:(result) =>{
                    console.log(result);
                    if(result){
                      let n = this.keynumbers(result)
                      console.log('sum=',n)
                      detail.qty = n;
                      detail.qtystr = result;
                    }
                }
            });
          },
          delete_details(row,index) {
            console.log('---delete--details==',row)
            if(row.name){
                bootbox.confirm({
                  message: 'ต้องการที่จะลบรายการนี้หรือไม่ ?',
                  buttons: {  confirm: {  label: 'Yes', className: 'btn-success'  },
                              cancel: { label: 'No', className: 'btn-danger' }
                           }, callback: (rs)=>{
                              console.log(rs,index,this)
                              if(rs){
                                this.bill.billdetails.splice(index,1)
                                this.bill.save = true;
                              } 
                          }
                })
            } else{
              this.bill.billdetails.splice(index,1)
              this.bill.save = true;
            }
          },//deletefunc
          bootboxcfm(){
            bootbox.prompt({
                title: "This is a prompt with a date input!",
                inputType: 'date',
                callback: (result) => {
                    console.log(result,this);
                }
            });
          }
        },
        computed: {
          ...mapState(['bill','categories']),
          products(){ return this.$store.state.products.products },
          suppliers(){ return this.$store.state.suppliers.suppliers },
          whiterow(){
            let row = 0;
            if(this.bill.billdetails.length > this.pageline) {
              row = this.pageline - (this.bill.billdetails.length%(this.pageline))+ 5 ;
            } else {
              row =this.pageline - this.bill.billdetails.length;
            }
            console.log('witherow==',this.bill.billdetails.length,'/',row)
            return row;
          },
          thaibaht(){
            return ThaiBaht(this.sumtotal.total) 
          },
          productnames(){
            return this.products.map(p=>p.id+':'+p.name)
          },
          isshowcurrentlot(){
            if(this.$store.state.currentlot){
              return true
            } else {
              return false
            }
          },
          isaction(){
            if(this.bill.action && this.bill.action == 'edit') {
               return 'edit';
            } else {
               return 'new';
            }
          },
          issave(){
              console.log('issave--',this.bill.save)
              if(this.bill.save){
                return true;
              } else{
                return false;
              }
          },
          sumtotal() {
            let total = 0;
            let qty = 0;
            this.bill.billdetails.map((item)=>{
                total += Number(item.qty) * Number(item.price);
                qty += Number(item.qty);
            });
            return {total: total,qty: qty};
          },
        },
        components : {
          ModelListSelect
        },
        mounted() {
        	console.log(this)
        	// this.suppliers/updatesupplier({ id:'New',name:'aaaa',cus_code:'bbbb'});
        	window.vv = this;
        },
      };
    </script>

<style lang="css" scoped>
  * {
    font-size:16px !important;
   }

 .content-wrapper {
   height: 100%!important; 
   overflow: -moz-scrollbars-vertical;
   overflow-y: scroll;
   overflow-x: hidden;
 }

 .txtinput {
   width:100%;
   height: 37px;
   /*font-size: larger;*/
   /*font-size: 15px;*/
   text-align: right;
 }
 .txtdesc {
   width:100%;
   height: 37px;
   /*font-size: larger;*/
 }

  .bootbox-input {
    /*font-size: large;*/
  }
  
 .fsize18 {
   /*font-size: 16px;*/
 }

 input {
   /*font-size:20px  !important;*/
 }

tr {
  height: 35px;
}
 .customer {
    width: 100%;
 }

.customertable{
  border: 0px solid;
  border-color: white;
}

table.customertable tr,table.customertable td {
  border-color: white;
}

.prntable td {
  border:1px solid rgb(150, 150, 150);
}

.prntable th { 
  border:1px solid rgb(150, 150, 150);
}

.notop {
  height:80px;
}

b {
  /*font-size:30px;*/
}

.printbox { display: none; }

@page{
  margin: 30 auto;
}

@media print {
  * {
    font-size:14px!important; 
  }
  body { 
    overflow: hidden; 
  }
 .noprint { 
    display: none 
    }
 .content-wrapper {
    overflow: hidden;
  }

 .content {
   height: 100%!important; 
   overflow: hidden;
 }

 .printbox { 
  margin: 30 auto;
  display: block; 
  height:3000px;
  overflow: hidden;
  }
 
 .printbox table {
   overflow: hidden;
   width: 95%;
   margin-left:20px;
 }

.pagebreak {
    /*position: relative;*/
    display: block;
    top: 40pt;
    page-break-after: always;
    z-index: 0;
}

} 
</style>