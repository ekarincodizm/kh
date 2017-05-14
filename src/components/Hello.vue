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


<el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button>

<el-dialog
  title="Tips"
  :visible.sync="dialogVisible"
  size="tiny"
  :before-close="handleClose">
  <span>This is a message</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
  </span>
</el-dialog>
</div></template>

<script>
  import bootbox from 'bootbox'
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    mounted(){
      // bootbox.confirm("This is the default confirm!", function(result){ console.log('This was logged in the callback: ' + result); });
      window.bootbox = bootbox;
    }
  };
</script>