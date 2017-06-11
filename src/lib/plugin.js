import Vue from 'vue'
import Paginate from 'vuejs-paginate'
import ElementUI from 'element-ui'
import Resource from 'vue-resource'
import locale from 'element-ui/lib/locale/lang/en'

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


Vue.use(ElementUI, { locale })
Vue.component('paginate', Paginate)
Vue.use(Resource)
