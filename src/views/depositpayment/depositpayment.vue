<template>
<div class="content-wrapper" style="min-height: 1036px;">
    <section class="content-header">
      <h1>
          {{title}}
          <small>{{subtitel}}</small>
      </h1>
      <ol class="breadcrumb">
          <li>
            <router-link to="/dashboard">
              <i class="fa fa-dashboard"></i> <span>Home</span>
            </router-link>
          </li>
          <li><router-link to="/depositpayments">
              <i class="fa fa-dashboard"></i> <span>deposit payments</span>
            </router-link></li>
          <li class="active">{{title}}</li>
      </ol>
    </section>
    <section class="content">
        <div class=" box box-default ">
            <div class="box-header with-border">
                <h3 class="box-title"><i class="fa fa-tag"></i> {{boxtitle}}</h3>
            </div>
            <div class="box-body">
                <div class="row">
                      {{boxbox}}
                </div>
            </div>
        </div>
        <h2 class="page-header">{{PageHeader}}</h2>
        <div class="row">
              {{boxbox}}/{{$route.name}}
              <pre>{{$route.params.id}}</pre>
        </div>
    </section>
</div>
</template>

<script>

export default {

  name: 'depositpayment',

  data () {
    return {
        title: "depositpayment",
        subtitel: 'depositpayment',
        pageheader: 'depositpayment',
        boxtitle: 'depositpayment',
        boxbox: 'depositpayment',
    };
  }
};
</script>

<style lang="css" scoped>


</style>
