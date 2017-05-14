import Vue from 'vue'
// import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import bootbox from 'bootbox'
// import ElementUI from 'element-ui'
// import Quasar, * as Everything from 'quasar-framework'
// import iView from 'iview';
import moment from 'moment'
import axios from 'axios'
import { mapActions  } from 'vuex'

import 'quasar-framework/dist/quasar.mat.standalone.css'
import 'bootstrap/dist/css/bootstrap.css'
// import 'element-ui/lib/theme-default/index.css'
// import 'iview/dist/styles/iview.css';    // 使用 CSS

// Vue.use(Quasar, {
//   deps: {
//     moment
//   },
//   components: Everything,
//   directives: Everything
// })

// Vue.use(ElementUI)
// Vue.use(iView);
Vue.config.productionTip = false


import routes from './routes'
import store from './store'

// Resource logic
// Vue.use(Resource)
// Vue.http.options.emulateJSON = true

Vue.use(VueRouter)

// Import top level component
import App from './App.vue'

// Routing logic
var router = new VueRouter({
  routes: routes,
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
              store.state.bill = nb;
              console.log('route changenb=',nb,store.state.bill,store.state.bill==nb);
              next()
            }
        }
    });
  } else if ((store.state.token !== null) && to.path === '/login') {
    next('/dashboard')
  } else {
    next()
  }
})


// created() {
// this.$eventBus.$on('message', this.onReceive);
// }
// ---- in methods () ----------
// this.$eventBus.$emit('message', this.text);
var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
    $eventBus: {
        get: function () {
            return EventBus;
        }
    }
});


// Start out app!
// eslint-disable-next-line no-new

 
window.vm = new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  created() {
    this.initdata();
    this.$store.state.lottoday = this.lottoday(); 
    this.$store.state.app.newbill = {  
            cate: -1, name: "",  id: "NEW", lotid:"0", lot_name: this.lottoday(), date: new Date().toISOString().slice(0,19).replace('T',' '),  
            billdetails: [{ name: "", qty: "0",  qtystr: "", price: "0",  amount: "0"  }],
            save: false,
            isNew : true
       }
  },
  methods:{
    ...mapActions(['initdata']),
    lottoday(){
          let today = new Date();
          let lot = 'LOT'+ today.toISOString().slice(0,10).replace(/-/g,"");
          console.log('lottoday',lot)
          return lot;
    }
  }
})

require('bootstrap')
require('admin-lte')
require('../node_modules/admin-lte/dist/js/demo.js')
