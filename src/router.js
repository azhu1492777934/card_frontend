import Vue from 'vue'
import Router from 'vue-router'

//新卡部分
const lookup = r => require.ensure([], () => r(require('./views/new_card/lookup')), 'lookup');//查询
const real_name = r => require.ensure([], () => r(require('./views/new_card/real_name')), 'real_name');//实名


const recharge = r => require.ensure([], () => r(require('./views/new_card/recharge')), 'recharge');//充值

//加速包
const speedup_80 = r => require.ensure([], () => r(require('./views/speedup/80g')), 'speedup_80');//80G加速包
const speedup_500 = r => require.ensure([], () => r(require('./views/speedup/500g')), 'speedup_500');//500G加速包

Vue.use(Router)


export const constantRouterMap = [{
        path:'/',
        component:lookup
    }, {
        path: '/new_card/real_name',
        component: real_name
    }, {
        path: '/recharge',
        component: recharge
    },{
        path:'/speedup_80',
        component:speedup_80
    },{
        path:'/speedup_500',
        component:speedup_500
    }]

export default new Router({
    routes: constantRouterMap
})


