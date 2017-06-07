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
          <li><router-link to="/dashboard">
              <i class="fa fa-dashboard"></i> <span>Home</span>
            </router-link></li>
          <li class="active">{{title}}</li>
      </ol>
    </section>
    <section class="content">
        <div class=" box box-default ">
            <div class="box-header with-border">
                <h3 class="box-title"><i class="fa fa-tag"></i> {{BoxTitle}}</h3>
            </div>
            <div class="box-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <h2 class="page-header">pageheader</h2>
                      <div class="box box-default">
                          <div class="box-header with-border">
                              <i class="fa fa-warning"></i>
                              <h3 class="box-title">boxtitle</h3>
                          </div>
                          <div class="box-body">
                            boxbody
                          </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
        <h2 class="page-header">{{PageHeader}}</h2>
        <div class="row">
              {{boxbox}}
        </div>
    </section>
</div>
</template>

<script>

export default {

  name: 'ComponeneName',

  data () {
    return {
        title: "Title",
        subtitel: 'Sub title',
        pageheader: 'PageHeader',
        boxtitle: 'Boxtitle',
        boxbox: 'boxbox',
    };
  }
};
</script>

<style lang="css" scoped>
  

</style>
