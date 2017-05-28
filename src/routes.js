import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
// import DashboardIndex from './components/modules/dashboard/Index.vue'
// import NotFound from './components/modules/dashboard/404.vue'
// import WidgetsIndex from './components/modules/widgets/Index.vue'
// import UIButtons from './components/modules/ui/Buttons.vue'
// import UIGeneral from './components/modules/ui/General.vue'
// import UIIcons from './components/modules/ui/Icons.vue'
// import UIModals from './components/modules/ui/Modals.vue'
// import UISliders from './components/modules/ui/Sliders.vue'
// import UITimeline from './components/modules/ui/Timeline.vue'

// const Login = r => require.ensure([], () => r(require('./components/Login.vue')), '/login')
// const Dashboard = r => require.ensure([], () => r(require('./components/Dashboard.vue')), '/aaa')
const DashboardIndex = r => require.ensure([], () => r(require('./components/modules/dashboard/Index.vue')), '/aaa')
const NotFound = r => require.ensure([], () => r(require('./components/modules/dashboard/404.vue')), '/aaa')
const WidgetsIndex = r => require.ensure([], () => r(require('./components/modules/widgets/Index.vue')), '/aaa')
const UIButtons = r => require.ensure([], () => r(require('./components/modules/ui/Buttons.vue')), '/aaa')
const UIGeneral = r => require.ensure([], () => r(require('./components/modules/ui/General.vue')), '/aaa')
const UIIcons = r => require.ensure([], () => r(require('./components/modules/ui/Icons.vue')), '/aaa')
const UIModals = r => require.ensure([], () => r(require('./components/modules/ui/Modals.vue')), '/aaa')
const UISliders = r => require.ensure([], () => r(require('./components/modules/ui/Sliders.vue')), '/aaa')
const UITimeline = r => require.ensure([], () => r(require('./components/modules/ui/Timeline.vue')), '/aaa')

const Product = r => require.ensure([], () => r(require('./components/modules/products/Product.vue')), '/product')
const Productlotdetails = r => require.ensure([], () => r(require('./components/modules/products/Productlotdetails.vue')), '/productdt')
const Addproduct = r => require.ensure([], () => r(require('./components/modules/products/Addproduct.vue')), '/addrcproduct')

const ProductCrud = r => require.ensure([], () => r(require('./components/modules/system/Productcrud.vue')), '/crudproduct')
const ProductCruds = r => require.ensure([], () => r(require('./components/modules/system/Productcruds.vue')), '/crudproduct')
const ProductCrudadd = r => require.ensure([], () => r(require('./components/modules/system/Productcrudadd.vue')), '/crudproduct')
const ProductCrudedit = r => require.ensure([], () => r(require('./components/modules/system/Productcrudedit.vue')), '/crudproduct')
const ProductCrudview = r => require.ensure([], () => r(require('./components/modules/system/ProductCrudview.vue')), '/crudproduct')


const Test = r => require.ensure([], () => r(require('./components/modules/test/Test.vue')), '/test')
const Rating = r => require.ensure([], () => r(require('./components/modules/test/Rating.vue')), '/test')
const Hello = r => require.ensure([], () => r(require('./components/Hello.vue')), '/test')

// const Bar = r => require.ensure([], () => r(require('./Bar.vue')), 'group-foo')
// const Baz = r => require.ensure([], () => r(require('./Baz.vue')), 'group-foo')

// Routes
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
    component: Dashboard,
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
        redirect: '/dashboard'
      }, {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardIndex
      }, {
        path: '/rcproduct',
        name: 'rcproduct',
        component: Product
      }, {
        path: '/productdetail/:lotid',
        name: 'roductdetail',
        component: Productlotdetails
      }, {
        path: '/addrcproduct',
        name: 'addrcproduct',
        component: Addproduct
     },{
        path: '/system/product',
        name: 'Produc',
        component: ProductCrud,
        children:[
              {
                path: 'list',
                name: 'Products',
                component: ProductCruds,
              },{
                path: 'add',
                name: 'productadd',
                component: ProductCrudadd
              },{
                path: 'edit/:id',
                name: 'Productedit',
                component: ProductCrudedit
              },{
                path: ':id',
                name: 'Productview',
                component: ProductCrudview
              }
        ]
      }, {
        path: '/test',
        name: 'test',
        component: Hello      
      }, {
        path: '/rating',
        name: 'rating',
        component: Rating
      }, {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardIndex
      }, {
        path: '/widgets',
        name: 'widgets',
        component: WidgetsIndex
      }, {
        path: '/ui/buttons',
        name: 'ui-buttons',
        component: UIButtons
      }, {
        path: '/ui/general',
        name: 'ui-general',
        component: UIGeneral
      }, {
        path: '/ui/icons',
        name: 'ui-icons',
        component: UIIcons
      }, {
        path: '/ui/modals',
        name: 'ui-modals',
        component: UIModals
      }, {
        path: '/ui/sliders',
        name: 'ui-sliders',
        component: UISliders
      }, {
        path: '/ui/timeline',
        name: 'ui-timeline',
        component: UITimeline
      }, {
        path: '*',
        name: '404',
        component: NotFound
      }
    ]
  }, {
    // not found handler
    path: '*',
    redirect: '/login'
  }
]

export default routes
