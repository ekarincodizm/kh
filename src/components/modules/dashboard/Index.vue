<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        รายละเอียด รวมยอดซื้อ ผลไม้
      </h1>
      <ol class="breadcrumb">
        <li><router-link  :to="'/home'" class="button" ><i class="fa fa-dashboard"></i> Home</router-link></li>
        <li class="active">Dashboard</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
     <div class="box box-default">
         <div class="box-header with-border">
             <i class="fa fa-info"></i>
             <h3 class="box-title">สรุป ต้นทุนเฉลีย แยก ตาม ผลไม้ และ ช่วงเวลา </h3>
         </div>

         <div class="box-body">
              <div class="col-md-4 col-sm-12 nowrap">
                 <span><b>สาขา: </b></span>
                <el-select v-model="branchid" placeholder="กรุณาเลือก เลือก สาขา">
                    <el-option
                    v-for="item in branchs"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                {{branchid}}
             </div>
     
             <div class="col-md-3 col-sm-12">
                 <span><b>เริ่ม : </b> <el-date-picker  v-model="sdate"></el-date-picker></span>
             </div>
     
             <div class="col-md-3 col-sm-12">
                 <span><b>ถึง : </b><el-date-picker  v-model="edate"></el-date-picker></span>
             </div>
     
             <div class="col-md-2 col-sm-12" >
                <button class="btn btn-success" style="float:right">
                  <i class="glyphicon glyphicon-search"  @click="validateDate">ค้นหา </i>
                </button>
             </div>
      </div>
    </div>
    <div class="row">
        <div class="col-lg-3 col-xs-6"  v-for="summ in summary">
          <div class="small-box"  v-bind:style="randomcolor()" >
            <div class="inner">
              <h3>{{summ.name}}</h3>
              <p>จำนวน: {{summ.total}} Kg</p>
              <p>จำนวนเงิน: {{summ.sumamount}} ฿</p>
              <p>เฉลี่ย: {{summ.avg}}</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
          </div>
        </div>
    </div>

     <div class="box-header with-border">
       <div class="nowrap">
         <h2 class="page-header">สรุปรวมทั้งหมด ตามช่วงเวลา</h2>
       </div>
     </div>
    <div class="row">
      <div v-for="sumall in summaryall" class="col-lg-3 col-xs-6">
          <div class="small-box"  v-bind:style="randomcolor()" >
            <div class="inner">
                <span class="info-box-text"><h1>Summary All</h1></span>
                <span class="info-box-number"><small>จำนวนเงิน:  {{Number(sumall.sumamount).toLocaleString('th-TH', {minimumFractionDigits: 2})}} ฿</small></span>
                <span class="info-box-number"><small>เฉลี่ย: {{Number(sumall.avg).toLocaleString('th-TH', {minimumFractionDigits: 2})}} ฿</small></span>
             </div>
         </div>
      </div>
    </div>
    </section>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions  } from 'vuex'
  import bootbox from 'bootbox'
  import moment  from 'moment'

  export default {
    name: 'DashboardIndex',
    data(){
      return {
        sdate: new Date(),
        edate: new Date(),
        branchid:-1,
      }
    },
    computed:{
      ...mapState(['summary','summaryall','branchs']),
    },
    methods: {
        randomcolor() {
        let colors = ['brown','red','blue','Navy', 'Teal', 'Purple', 'Orange', 'Maroon']
        // let colors = ['Info', 'Success', 'Warning', 'Danger', 'Gray', 'Navy', 'Teal', 'Purple', 'Orange', 'Maroon']
        // return colors[Math.floor(Math.random() * colors.length)]
         // return { backgroundColor: "#"+((1<<24)*Math.random()|0).toString(16) }
         return { backgroundColor: colors[Math.floor(Math.random() * colors.length)], color: 'white' }
        },
        validateDate(){
          let sdk = moment(this.sdate, 'YYYY-MM-DD', true).isValid();         let edk = moment(this.edate, 'YYYY-MM-DD', true).isValid();
          if(sdk && edk && (this.sdate <= this.edate)){
                let obj = {};
                obj.sdate = moment(this.sdate).format('YYYY-MM-DD') +  ' 00:00:00';
                obj.edate = moment(this.edate).format('YYYY-MM-DD') +  ' 23:59:59';
                obj.branchid = this.branchid;
                let data = JSON.stringify(obj);

               this.$store.dispatch('searchavgproduct',data);
          } else {
              bootbox.alert('วันที่ เริ่มต้น ต้องน้องกว่า วันที่สุดท้าย')
          }
        },
    },
    mounted(){
   }
  } 
</script>


<style scope>
  * {
    font-size:16px !important;
   }  

  .content-wrapper {
    /*height: 550px;*/
    min-height:450px;
    height: 100%!important;
  }
  

</style>
