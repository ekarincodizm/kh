<template>
  <header class="main-header">
    <!-- Logo -->
    <router-link to="/dashboard" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>桂</b>發</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">
        <img src="../../assets/logo.png" width="50px;height:25px"> 
        <b>รับซื้อผลไม้</b>
      </span>
    </router-link>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="/static/img/user2-160x160.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">{{userprofile.name}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="/static/img/user2-160x160.jpg" class="img-circle" alt="User Image">

                <p>
                  {{userprofile.name}}
                  <small>Member since Nov. 2012</small>
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a class="btn btn-default btn-flat" @click.prevent="logout">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions  } from 'vuex'

  export default {
    name: 'DashboardHeader',
    methods: {
      logout: function () {
        this.$store.commit('REMOVE_TOKEN')

        if (window.localStorage) {
          window.localStorage.removeItem('token')
        }

        this.$router.push('/login')
      }
    },
    computed: {
      ...mapState(['userprofile'])
    }

  }
</script>
