<template>
  <div class="content-wrapper">

    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>รายการรับซื้อ<small>ผลไม้ ตา่ง ๆ</small></h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">product</a></li>
        <li class="active">rectivelist</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">รายการรับซื้อ ผลไม้ ตาม Lot วันที่ </h3>
              <button class="primary"style="float:right;width:90px" @click="addlot" type="button">เพิ่ม Lot/Bill</button>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>Lot Id</th>
                  <th>ประเภท</th>
                  <th>จำนวน (kg)</th>
                  <th>จำนวนเงิน</th>
                  <th>Avg/Kg</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="lot in lots">
                  <td>
                  <router-link v-bind:to="'/productdetail/' + lot.lot_name" class="button" >
                  {{lot.lot_name}}</router-link>
                  <!-- <a v-link="'/productdetail/' + lot.lot_name" >{{lot.lot_name}} </a> -->
                  </td>
                  <td>{{lot.name}}</td>
                  <td>{{lot.qty.toLocaleString('th-TH', {minimumFractionDigits: 2})}}</td>
                  <td>{{lot.total.toLocaleString('th-TH', {minimumFractionDigits: 2})}}</td>
                  <td>{{lot.avg.toLocaleString('th-TH', {minimumFractionDigits: 2})}}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <th>Lot Id</th>
                  <th>ประเภท</th>
                  <th>จำนวน (kg)</th>
                  <th>Avg/Kg</th>
                  <th>Action</th>
                </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
  import $ from 'jquery'
  import 'datatables.net'
  import 'datatables.net-bs'
  import bootbox from 'bootbox'
  import { mapState, mapGetters, mapMutations, mapActions  } from 'vuex'

  export default {
    name: 'Product',
    data(){
      return { visible: false }
    },
    computed:{
      ...mapState(['categories','lots']),

      lottoday(){
          let today = new Date();
          let lot = 'LOT'+ today.toISOString().slice(0,10).replace(/-/g,"");
          console.log('lottoday',lot)
          return lot;
      }
    },
    mounted () {
      this.$nextTick(() => {
        $('#example1').DataTable({
        "order": [['id', "desc" ]]
        })
       })
      console.log('xx products = ',this.lots);
    },
    methods:{
       addlot() {
        let nb = JSON.parse(JSON.stringify(this.$store.state.app.newbill))
        nb.lotid= 0;
        nb.lot_name =this.$store.state.lottoday
        this.$store.dispatch('createnewbill',nb);
        this.$router.push("/addrcproduct")      
      }
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

 .fsize18 {
   font-size: 16px;
 }
</style>