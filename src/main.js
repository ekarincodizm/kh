import './lib/css'
import './lib/plugin'
import EventBus from "@/lib/eventBus";
import Vue from 'vue'
import bootbox from 'bootbox'
import moment from 'moment'
import VueRouter from 'vue-router'
import { mapActions  } from 'vuex'

import routes from './router'
import store from '@/vuex/store'
import App from './App.vue'

Vue.http.options.emulateJSON = true
Vue.config.productionTip = false
Vue.use(VueRouter)

var router = new VueRouter({
  routes: routes.routes,
  // linkActiveClass: 'is-active',
  // scrollBehavior: () => ({ y: 0 }),
  // mode: 'hash', // Demo is living in GitHub.io, so required!
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Check local storage to handle refreshes
if (window.localStorage) {
  if (store.state.token !== window.localStorage.getItem('token')) {
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && (store.state.token === null)) {
    next('/login')
  } else if(from.name == "addrcproduct" && store.state.bill.save ){
    bootbox.confirm({
        size: 'small',
        title: '<div><img src="/static/assets/logo.png""" alt="Smiley face" width="60" height="32"><span>กุ่ยฮวด</span></div>',
        message: "ข้อมูลยังไม่ Save ต้องการ Save หรือไม่ ?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if(result) {
              next(false) 
            } else {
              let nb= JSON.parse(JSON.stringify(store.state.app.newbill)) 
              // store.state.bill = nb;
              store.commit('newbill',nb);
              // console.log('route changenb=',nb,store.state.bill,store.state.bill==nb);
              next()
            }
        }
    });
    // ($('.sidebar-open') ?  $('.sidebar-toggle').click() : null )
  } else if ((store.state.token !== null) && to.path === '/login') {
    // ($('.sidebar-open') ?  $('.sidebar-toggle').click() : null )
    next('/home')
  } else {
    // ($('.sidebar-open') ?  $('.sidebar-toggle').click() : null )
    next()
  }
})


Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus;
        }
    }
});

window.vm = new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  created() {
    this.initdata();
    this.$store.commit('lottoday');
  },
  methods:{
    ...mapActions(['initdata']),
  }
})

require('bootstrap')
require('admin-lte')
require('../node_modules/admin-lte/dist/js/demo.js')
