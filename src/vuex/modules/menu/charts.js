export default {
    path: '/charts',
    name: 'Charts',
    component: r => require.ensure([], () => r(require('@/components/modules/ui/Buttons.vue')), '/aaa'),
    children:[
        {
        path: '/ui/buttons',
        name: 'ui-buttons',
        component:  r=>require.ensure([],()=>r(require('@/components/modules/dashboard/Index.vue')),'/chart'),
        },
        {
        path: '/ui/general',
        name: 'ui-general',
        component: r => require.ensure([], () => r(require('@/components/modules/ui/General.vue')), '/aaa'),
       }, 
       {
        path: '/ui/icons',
        name: 'ui-icons',
        component: r => require.ensure([], () => r(require('@/components/modules/ui/Icons.vue')), '/aaa'),
       }, 
    ]
}