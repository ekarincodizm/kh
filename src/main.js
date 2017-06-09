import './lib/css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import bootbox from 'bootbox'
import Resource from 'vue-resource'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import moment from 'moment'
import { mapActions  } from 'vuex'
Vue.use(ElementUI, { locale })

// import iView from 'iview';
// Vue.use(iView);

// import Quasar, * as Everything from 'quasar-framework'
// Vue.use(Quasar, {
//   deps: {
//     moment
//   },
//   components: Everything,
//   directives: Everything
// })
// import {routes} from './router'

import {ServerTable, ClientTable, Event} from 'vue-tables-2';

Vue.use(ClientTable,{
  perPage: 10
});


Vue.config.productionTip = false
import routes from './router'
import store from './store'

// Resource logic
Vue.use(Resource)
Vue.http.options.emulateJSON = true
Vue.use(VueRouter)

import App from './App.vue'

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

EventBus.fontsize = function(multiplier) {
  if (document.body.style.fontSize == "") {
    document.body.style.fontSize = "1.0em";
  }
  document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (multiplier * 0.2) + "em";
}

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
    this.$store.state.lottoday = this.lottoday(); 
    this.$store.state.app.newbill = {  
            cate: -1, name: "", id: "NEW", lot_id:"0", lot_name: this.lottoday(), date: new Date().toISOString().slice(0,19).replace('T',' '),  
            billdetails: [{  id:'NEW',item:{   value: '', text: '' }, name:"",qtystr:"",qty:"0",price:"0",amount:"0"}],
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
