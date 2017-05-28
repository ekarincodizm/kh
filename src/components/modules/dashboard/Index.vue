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
        <div v-for="summ in summary" class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
              <span class="info-box-text">{{summ.NAME}}</span>
              <br/><span ><small>{{summ.total}} Kg</small></span>
              <br/><span ><small>{{summ.sumamount}} ฿</small></span>
              <br/><span ><small>{{summ.avg}} ฿</small></span>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
              <span class="info-box-text">Summary All</span>
              <span class="info-box-number"><small>{{summaryall.qty}}kg</small></span>
              <span class="info-box-number"><small>{{summaryall.total}}฿</small></span>
              <span class="info-box-number"><small>{{summaryall.avg}}฿</small></span>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions  } from 'vuex'

  export default {
    name: 'DashboardIndex',
    computed:{
      ...mapState(['summary','summaryall']),

    },
    mounted(){

   }
  } 
</script>


<style scope>
  .content-wrapper {
    /*height: 550px;*/
    min-height:450px;
    height: 100%!important;
  }
  

</style>
