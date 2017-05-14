<template>
 <div class="content-wrapper">
    <section class="content-header">
      <h1>
        XX管理系统
        <small>Version 2.0</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="glyphicon glyphicon-home"></i> 主页</a></li>
        <!--<li class="active">Dashboard</li>-->
      </ol>
    </section>

    <!-- Main content -->
 
    <section class="content">
        <Rate v-model="value"></Rate>
    </section>
  </div>
 
</template>
<script>
export default {
  data () {
    return {
      value: 3
    }
  },
  methods: {
    update (val) {
      this.value = val
    }
  }

}
</script>

<style scope>
  .content-wrapper {
    height: 550px;
  }
</style>
