<template>
  <div class="content-wrapper">

    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>รายละเอียด Lot ที่: <small>{{$route.params.lotid}}</small></h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">product</a></li>
        <li class="active">lotdetails</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
          <div class="box box-widget">
            <div class="box-header with-border">
              <div class="user-block">
                <h3 class="box-title">รายละเอียด การรับสินค้า {{lot.id}}/{{ lot.lot_name }}</h3>
                <button type="button" style="width:90px;float:right;margin-right:50px;" class="primary" @click="addbill">Add Bill</button>
                <span class="description"><b>Catetype:</b> {{lot.cate}} : <b>{{lot.name}}</b> <b>Total:</b> {{lot.total}} <b>฿</b> <b>จำนวนบิล</b> {{lot.bills.length}} ใบ</span>
              </div>
              <div class="box-tools">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>                </button>
              </div>
            </div>


            <!-- /.box-header -->
            <div class="box-body">
              <table class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th style="width:160px">รหัส</th>
                  <th>ชื่อผลไม้</th>
                  <th style="text-align:right;width:160px"> จำนวน (kg) </th>
                  <th style="text-align:right;width:160px"> เฉลี่ยน/Kg </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(sumaryrow,index) in lot.summary">
                  <td>{{sumaryrow.product_code}}</td>
                  <td>{{sumaryrow.name}}</td>
                  <td align="right">{{sumaryrow.qty}}</td>
                  <td align="right">{{sumaryrow.avg}}</td>
                </tr>                
                </tbody>
                <tfoot>
                <tr style="background-color: aquamarine;">
                  <td colspan="2"><b>เฉลี่ย รวม </b></td>
                  <th  style="text-align:right;width:160px">{{lot.sumx[0].qty}}</th>
                  <th  style="text-align:right;width:160px">{{lot.sumx[0].avg}}</th>
                </tr>
                </tfoot>
              </table>
            <!-- /.box-body -->
            </div> 
            <!-- /.box-header -->
            <div class="box-body">
              <table class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th style="width: 20px;">No.</th>
                  <th style="width: 80px;">Bill No.</th>
                  <th>ผู้ขาย</th>
                  <th style="text-align:right;width: 160px;"> จำนวน (kg) </th>
                  <th style="text-align:right;width: 160px;"> จำนวนเงิน (บาท) </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(detail,index) in lot.bills">
                  <td style="width: 20px;x">{{index+1}}</td>
                  <td style="width: 60px;">{{detail.id}}</td>
                  <td>{{detail.name}}</td>
                  <td style="text-align:right;"align="right">{{detail.qty}}</td>
                  <td style="text-align:right;"align="right">{{detail.total}}</td>
                </tr>                
                </tbody>
                <tfoot>
                <tr style="background-color: #707bea;color: aliceblue;">
                  <td colspan="3"><b>เฉลี่ย รวม </b></td>
                  <th  style="text-align:right">{{lot.sumx[0].qty}}</th>
                  <th  style="text-align:right">{{lot.sumx[0].avg}}</th>
                </tr>
                </tfoot>
              </table>
            <!-- /.box-body -->
            </div>

          </div>    
          <div class="box box-widget" v-for="(detail,index) in lot.bills">
            <div class="box-header with-border">
              <div class="user-block">
                <span class="username">No:{{index+1}} บิลเลขที่ :{{detail.id}} </span>
                <span class="description">Name :{{detail.name}}</span>
              </div>
              <div class="box-tools">

                 <button @click="editbill(index,detail)" class="btn btn-warning btn-xs" title="edit bill" >
                   <span class="glyphicon glyphicon-edit"></span>
                 </button>                 
                 <button @click="removebill(index,detail.id)" class="btn btn-danger btn-xs" title="Remove Bill">
                   <span class="glyphicon glyphicon-trash"></span>
                 </button>

                <button type="button" class="btn btn-box-tool" data-widget="collapse">
                  <i class="fa fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="box-body">
              <table class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>ผลไม้</th>
                  <th>จำนวน (kg)</th>
                  <th>ราคา รับซื้อ</th>
                  <th>จำนวนเงิน</th>
                </tr>
                </thead>
                <tbody>
                
                <tr v-for="(row,index) in detail.billdetails">
                  <td>{{index+1}}</td>
                  <td>{{row.name}}</td>
                  <td style="text-align:right;">{{row.qty}}</td>
                  <td style="text-align:right;">{{row.price}}</td>
                  <td style="text-align:right;">{{row.qty*row.price}}</td>
                </tr>                
                </tbody>
                <tfoot>
                <tr style="background-color: #237530;color: aliceblue;">
                  <th>Status </th>
                  <th>&nbsp;</th>
                  <th>{{detail.qty}}</th>
                  <th>&nbsp;</th>
                  <th>{{detail.total}}</th>
                </tr>
                </tfoot>
              </table>
            </div>
            <div class="box-footer">
              &nbsp;
            </div>
          </div>          
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import { mapState, mapActions  } from 'vuex'
import bootbox from 'bootbox'


  export default {
    name: 'productdetails',
    mounted () {
      this.lotbyname(this.$route.params.lotid)
      this.$store.state.currentlot = this.$route.params.lotid;
      console.log('mount',this.$store.state.currentlot);
    },
    methods:{
      ...mapActions(['lotbyname','delbillbyid','createnewbill']),
      addbill(){
        let nb = JSON.parse(JSON.stringify(this.$store.state.app.newbill))
        nb.lotid= this.lot.id;
        nb.lot_name = this.lot.lot_name;
        nb.cate = this.lot.cate;
        nb.action = 'NEW';
        nb.save = false;
        nb.isNew = true;
        console.log('addbile in lot',nb,this.lot)
        this.createnewbill(nb)
        this.$router.push("/addrcproduct")
      },
      removebill(index,billid){
        console.log('index=',index,'billid=',billid)
          bootbox.confirm({ message: "ต้องการที่จะลบ บิลรายการนี้หรือไม่ ?!"  ,size: 'small',callback: (result)=>{ 
            if(result){
               console.log('remove bill',billid,result)
               // this.lot.bills.splice(index,1)
               this.delbillbyid(billid);
            }
          }
        });
      },
      editbill(index,bill){
        console.log('editbill--',bill,this.lot)
        let nb = JSON.parse(JSON.stringify(bill))
        nb.action = 'edit';
        nb.save = false;
        nb.isNew = true;
        nb.lotid= this.lot.id;
        nb.cate = this.lot.cate;
        nb.lot_name = this.lot.lot_name;
        nb.date = bill.created_date;
        this.createnewbill(nb)
        this.$router.push("/addrcproduct")
      },
    },
    computed: {
      ...mapState(['lot']),
    }
  }
</script> 

<style scope>
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.
   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.
@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/
@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}
table.dataTable thead .sorting:after {
  content: " \f0dc";
}
table.dataTable thead .sorting_asc:after {
  content: " \f0dd";
}
table.dataTable thead .sorting_desc:after {
  content: " \f0de";
}
</style>