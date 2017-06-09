<template>
  <footer class="main-footer fixed noprint">
    <div class="pull-right hidden-xs">
      <b>Version</b> 2.3.8
    </div>
    <strong>Copyright &copy; 2014-2016 <a href="http://www.servit.co.th">Servit Co.,ltd</a>.</strong> All rights  reserved.
    </footer>
</template>

<script>
  export default {
    name: 'DashboardFooter'
  }

</script>
<style type="text/css" scoped>
  @media print {
   .noprint { display: none }
  }
b, strong {
  font-size: 12px!important; 
}

.main-footer {
  font-size: 10px!important; 
  background: #fff;
  padding: 5px;
  color: #444;
  border-top: 1px solid #d2d6de;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 999;
}
</style>