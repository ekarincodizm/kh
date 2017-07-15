import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import charts from './charts'

const state = {
  items: [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      document.body.className = 'login-page'
      next()
    }
  }, 
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      document.body.className += ' skin-blue sidebar-mini'
      next()
    },
    activate: function () {
      this.$nextTick(function () {
        // => 'DOM loaded and ready'
        alert('test')
      })
    },
    children: [
      {
        path: '',
        redirect: '/home'
      }, {
        path: '/home',
        name: 'dashboard',
        component: r => require.ensure([],()=>r(require('@/components/modules/dashboard/Index.vue')),'/aaa'),
      }, {
        path: '/rcproduct',
        name: 'rcproduct',
        component: r =>require.ensure([],()=>r(require('@/components/modules/products/Product.vue')),'/product'),
      }, {
        path: '/productdetail/:lotid',
        name: 'roductdetail',
        component: r => require.ensure([], () => r(require('@/components/modules/products/Productlotdetails.vue')), '/productdt'),
      }, {
        path: '/addrcproduct',
        name: 'addrcproduct',
        component: r => require.ensure([], () => r(require('@/components/modules/products/Addproduct.vue')), '/addrcproduct'),
     },
     {
        path: '/system/crud/supplier',
        name: 'supplier',
        component:  r => require.ensure([], () => r(require('@/views/crud/suppliers/SupplierCrud.vue')), '/crudsupplier'),
      },     
     {
        path: '/depositpayments',
        name: 'depositpayments',
        component:  r => require.ensure([], () => r(require('@/views/depositpayment/depositpayments.vue')), '/depositpayments'),
      },     
     {
        path: '/depositpayment/:id',
        name: 'depositpaymentview',
        component:  r => require.ensure([], () => r(require('@/views/depositpayment/depositpayment.vue')), '/depositpayment'),
      },     
     {
        path: '/depositpayment/edit/:id',
        name: 'depositpaymentedit',
        component:  r => require.ensure([], () => r(require('@/views/depositpayment/depositpayment.vue')), '/depositpayment'),
      },
      {
        path: '/depositpayments/new',
        name: 'depositpaymentnew',
        component:  r => require.ensure([], () => r(require('@/views/depositpayment/depositpayment.vue')), '/depositpayment'),
      },     
      {
        path: '/system/crud/customers',
        name: 'supplier',
        component:  r => require.ensure([], () => r(require('@/views/crud/customers/CustomerCrud.vue')), '/crudsupplier'),
      },
      {
        path: '/system/crud/categories',
        name: 'supplier',
        component:  r => require.ensure([], () => r(require('@/views/crud/categories/CategoryCrud.vue')), '/crudsupplier'),
      },
      {
        path: '/system/crud/branch',
        name: 'supplier',
        component:  r => require.ensure([], () => r(require('@/views/crud/branch/BranchCrud.vue')), '/crudsupplier'),
      },
      {
        path: '/system/crud/expenses',
        name: 'expenses',
        component:  r => require.ensure([], () => r(require('@/views/crud/products/ExpensesCrud.vue')), '/expenses'),
      },
      {
        path: '/system/crud/product',
        name: 'Produc',
        component:  r => require.ensure([], () => r(require('@/views/crud/products/Productcrud.vue')), '/crudproduct'),
        // component:  r => require.ensure([], () => r(require('@/components/modules/system/Productcrud.vue')), '/crudproduct'),
        // children:[
        //       {
        //         path: 'list',
        //         name: 'Products',
        //         component: r => require.ensure([], () => r(require('@/components/modules/system/Productcruds.vue')), '/crudproduct'),
        //       },{
        //         path: 'add',
        //         name: 'productadd',
        //         component: r => require.ensure([], () => r(require('@/components/modules/system/Productcrudadd.vue')), '/crudproduct'),
        //       },{
        //         path: 'edit/:id',
        //         name: 'Productedit',
        //         component: r => require.ensure([], () => r(require('@/components/modules/system/Productcrudedit.vue')), '/crudproduct'),
        //       },{
        //         path: ':id',
        //         name: 'Productview',
        //         component: r => require.ensure([], () => r(require('@/components/modules/system/ProductCrudview.vue')), '/crudproduct'),
        //       }
        // ]
      },
      {
        path: '/test',
        name: 'test',
        component: r => require.ensure([], () => r(require('@/components/Hello.vue')), '/test'),
      }, {
        path: '/test1',
        name: 'test1',
        component: r => require.ensure([], () => r(require('@/components/modules/test/Test.vue')), '/test'),
      }, {
        path: '/rating',
        name: 'rating',
        component: r => require.ensure([], () => r(require('@/components/modules/test/Rating.vue')), '/test'),
      }, {
        path: '/widgets',
        name: 'widgets',
        component: r => require.ensure([], () => r(require('@/components/modules/widgets/Index.vue')), '/aaa'),
      },{
        path: '/ui/modals',
        name: 'ui-modals',
        component: r => require.ensure([], () => r(require('@/components/modules/ui/Modals.vue')), '/aaa'),
      }, {
        path: '/ui/sliders',
        name: 'ui-sliders',
        component: r => require.ensure([], () => r(require('@/components/modules/ui/Sliders.vue')), '/aaa'),
      }, {
        path: '/ui/timeline',
        name: 'ui-timeline',
        component: r => require.ensure([], () => r(require('@/components/modules/ui/Timeline.vue')), '/aaa'),
      }, 
      charts,
      {
        path: '*',
        name: '404',
        component: r => require.ensure([], () => r(require('@/components/modules/dashboard/404.vue')), '/aaa'),
        // redirect: '/'
      },
    ]
  },
  {
    path: '*',
    redirect: '/login'
  },
 ]
}

const mutations = {

}

export default {
  namespaced: true,
  state,
  mutations
}  