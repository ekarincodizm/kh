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
        <li><a href="#">products</a></li>
        <li class="active">add Product</li>
      </ol>
    </section>
    <section class="content">

      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">รับซื้อผลไม้</h3>
          <span>บิลใหม๋:{{bill.isNew}} /action {{isaction}} / บันทึก:{{bill.save}}</span>
          <div class="box-tools pull-right">

            <button v-show="isshowcurrentlot"  @click="newbill" type="button" class="btn btn-box-tool primary" style="width:150px;">New Current Lot Bill</button>            
            <button @click="newtdbill" type="button" class="btn btn-box-tool primary" style="width:150px;">New Today Bill</button>

            <button v-show="issave" @click="save" type="button" class="btn btn-success" style="width:90px;">
             <i class="glyphicon glyphicon-floppy-save" ></i> 
                Save
            </button>

            <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
              <i class="fa fa-minus"></i></button>
              <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                <i class="fa fa-times"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div>
                <span  class="fsize18">หมายเลย บิล:  &nbsp;&nbsp;  </span>
                      <input class="fsize18"type="text" name="billid" 
                          v-model="bill.id" > &nbsp;&nbsp;
                <span  class="fsize18">หมายเลย LOT:  &nbsp;&nbsp;  </span>
                      <span class="fsize18" >{{bill.lotid}} / </span>
                      <input class="fsize18" type="text" name="lotid" v-model="bill.lot_name" > &nbsp;&nbsp;<br/>
                <span class="fsize18" >ชื่อผู้ขาย: &nbsp;&nbsp; </span>
                      <input v-on:keyup="watchchange" id="salename" ref="salename" class="fsize18" type="text" name="name" v-model="bill.name" autofocus> &nbsp;&nbsp;
                <span  class="fsize18">ประเภท:&nbsp;&nbsp;  </span>
                            <select v-on:change="watchchange"  v-model="bill.cate">
                              <option selected value="-1">เลือกประเภท</option>
                              <option v-for="cat in categories" v-bind:value="cat.id">{{cat.name}}</option>
                          </select>

                &nbsp;&nbsp; &nbsp;&nbsp;
                <span  class="fsize18">วันที่:&nbsp;&nbsp;  </span>
                      <input v-on:keyup="watchchange"  class="fsize18" type="text" name="date"  v-model="bill.date" > &nbsp;&nbsp;
              </div>
              <div>
                  <button @click="addproduct" type="button" class="primary" style="width:120px;float:right;margin-bottom: 10px">เพิ่มรายการผลไม้</button>
                  </div>
              <table id="productlist" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>รายการ ผลไม้</th>
                  <th style="text-align:right"> จำนวน (kg) </th>
                  <th style="text-align:right"> ราคา / กิโลกรัม </th>
                  <th style="text-align:right"> จำนวนเงิน </th>
                  <th style="text-align:right"> Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(detail,index) in bill.billdetails">
                  <td style="width:30%;" >     
                  <list-select :list="products"
                     option-value="id"
                     option-text="name"
                     :selected-item="item"
                     placeholder="select item"
                     @select="onSelect"
                     >
                  </list-select>

                  <td style="width:20%;" align="right"><input v-on:dblclick="keytext(detail)" class="txtinput" type="number" v-on:keyup="watchchange"  v-model="detail.qty" /></td>
                  <td style="width:20%;" align="right"><input v-on:keyup="watchchange"  class="txtinput" type="number" v-model="detail.price" /></td>
                  <td style="width:20%;" align="right">{{detail.qty * detail.price}}</td>
                  <td style="width:10%;" align="right">
                     <button @click="delete_details(detail,index)" class="btn btn-danger btn-xs" >
                     <span class="glyphicon glyphicon-trash"></span>
                     </button>
                  </td>
                </tr>                
                </tbody>
                <tfoot>
                <tr>
                  <td><b>เฉลี่ย รวม </b></td>
                  <th  style="text-align:right">{{sumtotal.qty}}</th>
                  <th  style="text-align:right">-</th>
                  <th  style="text-align:right">{{sumtotal.total}}</th>
                  <th  style="text-align:right">&nbsp;</th>
                </tr>
                </tfoot>
                <tfoot><tr>
                  <button @click="addproduct" type="button" class="primary" style="width:120px;float:left;margin:10px;">เพิ่มรายการผลไม้</button>
                </tr></tfoot>
              </table>
            <!-- /.box-body -->
            </div>  
            <!-- /.box-body -->
            <div class="box-footer">
              Footer
            </div>
          </div>index
        </section>
      </div>
    </template>

    <script>
      import bootbox from 'bootbox'
      import { mapState, mapActions  } from 'vuex'
      import { ListSelect } from 'vue-search-select'

      export default {
        name: 'Addproduct',
        data(){
          return {
            item: {
              id: '',
              name: '',
              category_id: ''
            }
          }
        },
        methods: {
              ...mapActions(['createnewbill']),
              onSelect (item,a) {
                console.log('----onSelect appproduct-----',item,a)
                // this.item = item
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
                  // this.$store.state.app.watchchange = this.$store.watch(
                  // state=>JSON.stringify(state.bill),
                  // (a)=>{ 
                        this.bill.save = true;
                  //       this.$store.state.app.watchchange()
                  //       console.log('------watch end --------')
                  //     }
                  // )
              },
              save(){
                 if(this.validate()){
                  console.log('save--',JSON.stringify(this.bill))
                  console.log(this.bill)
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
            this.bill.billdetails.push({name:"",qtystr:"",qty:"0",price:"0",amount:"0"} )
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
60        },
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
          ...mapState(['bill','categories','products']),
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
        mounted() {
        },
        components : {
          ListSelect
        }
      };
    </script>

<style lang="css" scoped>

 .txtinput {
   width:100%;
   height: 37px;
   font-size: larger;
   text-align: right;
 }
 .txtdesc {
   width:100%;
   height: 37px;
   font-size: larger;
 }

  .bootbox-input {
    font-size: large;
  }
  
 .fsize18 {
   font-size: 16px;
 }

 input {
   font-size:20px  !important;
 }

</style>