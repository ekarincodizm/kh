<template>
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar" style="height:100%">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="pull-left image">
            <img src="/static/img/user2-160x160.jpg" class="img-circle" alt="User Image">
          </div>
          <div class="pull-left info">
            <p>{{userprofile.name}}</p>
            <a href="#">
            <i v-if="userprofile.online" class="fa fa-circle text-success"></i>
            <i v-else class="fa fa-circle text-danger"></i>
            Online</a>
          </div>
        </div>
        <ul class="sidebar-menu" >
          <li class="header"><span style="font-size:20px;color:red;">{{branch.name}}</span></li>
          <sideitem v-for="item in sidebaritems" v-bind:item="item" :key="item.id" ></sideitem>
      </ul>
      </section>
      <!-- /.sidebar -->
    </aside>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions  } from 'vuex'
  import sideitem from './sideitem'
  //...mapGetters([]),
  //...mapMutations([]),
  //...mapActions([]),
  // เป้าหมาของ dashboard คือ อยากรู้ว่า ซื้อชนิดใด มาปริมาณเท่าไร ยอดซื้อรวมแต่ละชนิดเท่าไร เฉลี่ยรวมเท่าไร
  export default {
    name: 'DashboardSidebar',
    data(){
      return  {
        sidebaritems:[
          { id:1, icon: 'fa fa-dashboard', badge: '',  name: 'รายงาน', to: '/home'},
          { id:1, icon: 'fa fa-cubes', badge: '',  name: 'รายการรับซื้อ', to: '/rcproduct'},
          { id:1, icon: 'fa fa-cubes', badge: '',  name: 'รายการมัดจำ', to: '/depositpayments'},
          { id:2,icon: 'fa fa-files-o', badge: '',  name: 'Admin', to: '/system',
            children:[
              { id:3, icon: 'fa fa-pie-chart', badge: '',  name: 'Products',      to: '/system/crud/product'},
              { id:3, icon: 'fa fa-pie-chart', badge: '',  name: 'Expenses',      to: '/system/crud/expenses'},
              { id:5, icon: 'fglyphicon glyphicon-folder-open', badge: '',  name: 'Suppliers',     to: '/system/crud/supplier'},
              { id:4, icon: 'glyphicon glyphicon-star-empty', badge: '',  name: 'Customers',     to: '/system/crud/customers'},
              { id:6, icon: 'glyphicon glyphicon-stats', badge: '',  name: 'Categories',    to: '/system/crud/categories'},
              { id:6, icon: 'glyphicon glyphicon-tasks', badge: '',  name: 'Branch',        to: '/system/crud/branch'},
            ]
          },
        ],
      }
    },
    computed: {
      // branch: function(){
      //   return this.$store.state.branch
      // },
      ...mapState(['userprofile','branch']),
    },
    methods: {
    },
    components: {
      sideitem
    }
  }
</script>

<style scope>
  .content,.main-sidebar,.sidebar {
    min-height:550px;
    height: 100%!important;
  }

.main-sidebar {
    overflow-x: scroll;
}

.router-link-active {
  background-color: #3c8dbc; 
  color: white;
}




/*.sidebar-menu>li:hover>a{
    background: #505152; 
}
*/
/*li {
  height:40px;
}*/
</style>