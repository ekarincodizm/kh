<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        รายละเอียด รวมยอดซื้อ ผลไม้
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Dashboard</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
     <div class="box box-default">
         <div class="box-header with-border">
             <i class="fa fa-warning"></i>
             <h3 class="box-title">สรุป ต้นทุนเฉลีย แยก ตาม ผลไม้ และ ช่วงเวลา </h3>
         </div>
         <div class="box-body">
              <div class="col-md-3 col-sm-12">
                 <span><b>สาขา: </b></span>
                    <select name="branch" v-model="branchid" >
                      <option selected value="-1">ทั้งหมด</option>
                      <option value="1">จันทบุรี</option>
                      <option value="2">ชุมพร</option>
                      <option value="3">ปปป</option>
                      option
                    </select>

             </div>
              <div class="col-md-3 col-sm-12">
                 <span><b>เริ่ม : </b> <el-date-picker  v-model="sdate"></el-date-picker></span>
             </div>
             <div class="col-md-3 col-sm-12">
                 <span><b>ถึง : </b><el-date-picker  v-model="edate"></el-date-picker></span>
             </div>
             <div class="col-md-3 col-sm-12">
                <button>
                  <i class="glyphicon glyphicon-search"  @click="validateDate">ค้นหา </i>
                </button>
          </div>
      </div>
    </div>

<div class="row">
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>150</h3>

              <p>New Orders</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>53<sup style="font-size: 20px">%</sup></h3>

              <p>Bounce Rate</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>44</h3>

              <p>User Registrations</p>
            </div>
            <div class="icon">
              <i class="ion ion-person-add"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>65</h3>

              <p>Unique Visitors</p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
      </div>



    <div class="box box-default">
        <div class="box-header with-border">
            <i class="fa fa-warning"></i>
            <h3 class="box-title">summary</h3>
        </div>
        <div class="box-body">
         <div class="row">
           <div  v-for="summ in summary" class="col-xs-3 col-sm-3 col-md-6 col-lg-12">
             <div class="box box-default">
                 <div class="box-header with-border">
                     <i class="fa fa-warning"></i>
                     <h3 class="box-title">boxtitle</h3>
                 </div>
                 <div class="box-body">
                    <div class="info-box">
                        <span class="info-box-text">{{summ.NAME}}</span>
                        <br/><span ><small>จำนวนซ {{Number(summ.total).toLocaleString('th-TH', {minimumFractionDigits: 2})}} Kg</small></span>
                        <br/><span ><small>จำนวนเงิน {{Number(summ.sumamount).toLocaleString('th-TH', {minimumFractionDigits: 2})}} ฿</small></span>
                        <br/><span ><small>เฉลี่ย {{Number(summ.avg).toLocaleString('th-TH', {minimumFractionDigits: 2})}} ฿</small></span>
                    </div>
                 </div>
             </div>
             
           </div>
         </div>


        </div>
    </div>
    

      <div v-for="summ in summary" class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
              <span class="info-box-text">{{summ.NAME}}</span>
              <br/><span ><small>จำนวนซ {{Number(summ.total).toLocaleString('th-TH', {minimumFractionDigits: 2})}} Kg</small></span>
              <br/><span ><small>จำนวนเงิน {{Number(summ.sumamount).toLocaleString('th-TH', {minimumFractionDigits: 2})}} ฿</small></span>
              <br/><span ><small>เฉลี่ย {{Number(summ.avg).toLocaleString('th-TH', {minimumFractionDigits: 2})}} ฿</small></span>
          </div>
      </div>
      <div v-for="sumall in summaryall" class="col-md-3 col-sm-6 col-xs-12">
            <div class="info-box">
                <span class="info-box-text">Summary All</span>
                <span class="info-box-number"><small>จำนวนเงิน {{Number(sumall.qty).toLocaleString('th-TH', {minimumFractionDigits: 2})}}kg</small></span>
                <span class="info-box-number"><small>จำนวนเงิน {{Number(sumall.total).toLocaleString('th-TH', {minimumFractionDigits: 2})}}฿</small></span>
                <span class="info-box-number"><small>เฉลี่ย{{Number(sumall.avg).toLocaleString('th-TH', {minimumFractionDigits: 2})}}฿</small></span>
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
      ...mapState(['summary','summaryall']),

    },
    methods: {
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
