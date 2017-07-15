import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      document.body.className = 'login-page'
      next()
    }
  }, {
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
     },{
        path: '/system/product',
        name: 'Produc',
        component:  r => require.ensure([], () => r(require('@/components/modules/system/Productcrud.vue')), '/crudproduct'),
        children:[
              {
                path: 'list',
                name: 'Products',
                component: r => require.ensure([], () => r(require('@/components/modules/system/Productcruds.vue')), '/crudproduct'),
              },{
                path: 'add',
                name: 'productadd',
                component: r => require.ensure([], () => r(require('@/components/modules/system/Productcrudadd.vue')), '/crudproduct'),
              },{
                path: 'edit/:id',
                name: 'Productedit',
                component: r => require.ensure([], () => r(require('@/components/modules/system/Productcrudedit.vue')), '/crudproduct'),
              },{
                path: ':id',
                name: 'Productview',
                component: r => require.ensure([], () => r(require('@/components/modules/system/ProductCrudview.vue')), '/crudproduct'),
              }
        ]
      }, {
        path: '/test',
        name: 'test',
        component: r => require.ensure([], () => r(require('@/components/Hello.vue')), '/test'),
      }, {
        path: '/test1',
        name: 'test',
        component: r => require.ensure([], () => r(require('@/components/modules/test/Test.vue')), '/test'),
      }, {
        path: '/rating',
        name: 'rating',
        component: r => require.ensure([], () => r(require('@/components/modules/test/Rating.vue')), '/test'),
      }, {
        path: '/widgets',
        name: 'widgets',
        component: r => require.ensure([], () => r(require('@/components/modules/widgets/Index.vue')), '/aaa'),
      }, {
        path: '/ui/buttons',
        name: 'ui-buttons',
        component: r => require.ensure([], () => r(require('@/components/modules/ui/Buttons.vue')), '/aaa'),
      }, {
        path: '/ui/general',
        name: 'ui-general',
        component: r => require.ensure([], () => r(require('@/components/modules/ui/General.vue')), '/aaa'),
      }, {
        path: '/ui/icons',
        name: 'ui-icons',
        component: r => require.ensure([], () => r(require('@/components/modules/ui/Icons.vue')), '/aaa'),
      }, {
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
      }, {
        path: '*',
        name: '404',
        component: r => require.ensure([], () => r(require('@/components/modules/dashboard/404.vue')), '/aaa'),
      }
    ]
  }, {
    path: '*',
    redirect: '/login'
  }
]

export default routes
