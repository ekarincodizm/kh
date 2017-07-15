<template>
  <div class="content-wrapper" style="height:100%">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>รายการรับซื้อ<small>ผลไม้ ตา่ง ๆ</small></h1>
      <ol class="breadcrumb">
        <li><router-link  :to="'/home'" class="button" ><i class="fa fa-dashboard"></i> Home</router-link></li>
        <li>Product lots</li>
      </ol>
    </section>
    <!-- Main content -->
    <section class="content">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">รายการรับซื้อ ผลไม้ ตาม Lot วันที่ </h3>
              <button class="btn btn-primary"style="margin-right: 30px;float:right;width:120px" @click="addlot" type="button">เพิ่ม Lot/Bill</button>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div>
                <el-switch
                  v-model="notshow" 
                  on-text=""
                  off-text="">
                </el-switch>
                <span v-if="notshow">แสดงเป็นแถว</span>
                <span v-else>แสดงทั้งหมด</span>
            </div>

            <el-table v-if="notshow"
                :data="showdata"
                style="width: 100%">
                <el-table-column type="expand">
                  <template scope="props" >
                     <table width="100%" border="0" style="background-color:#e4e8e7">
                       <thead>
                         <tr>
                           <th>Name</th>
                           <th>Qty</th>
                           <th>Total</th>
                           <th>Avg</th>
                         </tr>
                       </thead>
                       <tr v-for="(item,index) in  props.row.summary">
                          <td>{{item.name}}</td>
                          <td>{{$bus.renderNumber(item.qty)}}</td>
                          <td>{{$bus.renderNumber(item.total)}}</td>
                          <td>{{$bus.renderNumber(item.avg)}}</td>
                       </tr>
                       <br/>
                       <tr v-for="(item,index) in  props.row.sumbycat">
                          <td>{{item.name}}</td>
                          <td>{{$bus.renderNumber(item.qty)}}</td>
                          <td>{{$bus.renderNumber(item.total)}} </td>
                          <td>{{$bus.renderNumber(item.avg)}}</td>
                       </tr>

                     </table>
                     <!-- <b>{{props.row.summary}}</b> -->
                  </template>
                </el-table-column>
                
                <el-table-column
                  label="Date"
                  prop="date">
                  <template scope="scope">
                    {{scope.row.date.substr(0,10)}}
                  </template>
                </el-table-column>

                <el-table-column
                  label="Name"
                   prop="lot_name"
                  >
                  <template scope="scope">
                    <router-link style="font-size:xx-large" v-bind:to="'/productdetail/' + scope.row.lot_name" class="button" >
                  {{scope.row.lot_name}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column
                  label="จำนวน (Kg)"
                  prop="qty">
                </el-table-column>
                <el-table-column
                  label="จำนวนเงิน"
                   prop="total">
                </el-table-column>
                <el-table-column
                  label="Avg/Kg"
                   prop="avg">
                </el-table-column>
                <el-table-column
                  label=""
                   prop="">
                </el-table-column>
             </el-table>


             <table  v-if="!notshow" id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th width="140px">วันที่</th>
                  <th width="300px">Lot Id</th>
                  <th>ประเภท</th>
                  <th>จำนวน (kg)</th>
                  <th>จำนวนเงิน</th>
                  <th>Avg/Kg</th>
                </tr>
                </thead>
                <tbody v-for="(lot, index) in showdata">
                 <tr style="background-color:#a9a9dc;" >
                  <td>{{lot.lot_name.substr(3).replace(/(\d{4})(\d{2})(\d{2})/g,'$1/$2/$3')}}</td>
                  <td  width="100px">
                  <router-link style="color:white;font-size:xx-large" v-bind:to="'/productdetail/' + lot.lot_name" class="button" >
                  {{lot.lot_name}}</router-link>
                  <!-- <a v-link="'/productdetail/' + lot.lot_name" >{{lot.lot_name}} </a> -->
                  </td>
                  <td>&nbsp;</td>
                  <td>{{$bus.renderNumber(lot.qty)}}</td>
                  <td>{{$bus.renderNumber(lot.total)}}</td>
                  <td>{{$bus.renderNumber(lot.avg)}}</td>
                </tr>
                 <tr v-show="visible" v-for="summ in lot.summary" >
                  <td style="background-color:#e4e8e7">เกรดผลไม้</td>
                  <td>{{summ.product_code}}/{{summ.name}}</td>
                  <td>{{$bus.renderNumber(summ.qty)}}</td>
                  <td>{{$bus.renderNumber(summ.total)}}</td>
                  <td>{{$bus.renderNumber(summ.avg)}}</td>
                </tr>
                <tr v-show="visible" v-for="sumcat in lot.sumbycat" >
                  <td style="background-color:#f9d9d9">ประเภทผลไม้</td>
                  <td>{{sumcat.name}}</td>
                  <td>{{$bus.renderNumber(sumcat.qty)}}</td>
                  <td>{{$bus.renderNumber(sumcat.total)}}</td>
                  <td>{{$bus.renderNumber(sumcat.avg)}}</td>
                  <td></td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <th>Lot Id</th>
                  <th>ประเภท</th>
                  <th>จำนวน (kg)</th>
                  <th>จำนวนเงิน</th>
                  <th>Avg/Kg</th>
                </tr>
                </tfoot>
              </table>
              <paginate
                :page-count="totalpage"
                :click-handler="changepage"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'">
              </paginate>
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
      return { 
        rows:[],
        visible: true,
        notshow:true,
        page:1,
        perpage:10,
      }
    },
    computed:{
      ...mapState(['categories','lots']),
      lottoday(){
          let today = new Date();
          let lot = 'LOT'+ today.toISOString().slice(0,10).replace(/-/g,"");
          console.log('lottoday',lot)
          return lot;
      },
      totalpage() {
         return  Math.ceil(this.lots.length/this.perpage);
      },
      showdata(){
       let skip = (this.page-1)*this.perpage;
       let take = skip+this.perpage;
       console.log('lots=',this.lots)
       return this.lots.slice(skip,take);
      },
    },
    mounted () {
      // this.$nextTick(() => {
      //   $('#example1').DataTable({
      //   "order": [['id', "desc" ]]
      //   })
      //  })
      console.log('xx products = ',this.lots);
    },
    methods:{
       addlot() {
        let nb = JSON.parse(JSON.stringify(this.$store.state.app.newbill))
        nb.lotid= 0;
        nb.lot_name =this.$store.state.lottoday
        this.$store.dispatch('createnewbill',nb);
        this.$router.push("/addrcproduct")      
      },
      changepage(page){
         this.page = page;
         console.log(page)
      },
      showhideclass(chk) {
        if(chk) {
          return 'glyphicon glyphicon-eye-close'; 
        } else {
          return 'glyphicon glyphicon-eye-open';
        }
      },
      isShow(idx) {
        console.log(idx)
        return this.rows[idx] || this.visible
      },
    }
  }
</script> 

<style scope>
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