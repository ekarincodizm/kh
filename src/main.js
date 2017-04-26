// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Quasar, * as Everything from 'quasar-framework'
import moment from 'moment'

import 'element-ui/lib/theme-default/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'quasar-framework/dist/quasar.mat.standalone.css'

Vue.use(Quasar, {
  deps: {
    moment
  },
  components: Everything,
  directives: Everything
})


Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
