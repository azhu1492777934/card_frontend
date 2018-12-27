import Vue from 'vue'
import Router from 'vue-router'

//新卡部分
const lookup = r => require.ensure([], () => r(require('./views/new_card/lookup')), 'lookup');//查询
const real_name = r => require.ensure([], () => r(require('./views/new_card/real_name')), 'real_name');//实名

//充值
const recharge = r => require.ensure([], () => r(require('./views/recharge/index')), 'recharge');//充值页
const recharge_callback = r => require.ensure([], () => r(require('./views/recharge/callback')), 'recharge_callback');//充值页

//加速包
const speedup_80 = r => require.ensure([], () => r(require('./views/speedup/80g')), 'speedup_80');//80G加速包
const speedup_500 = r => require.ensure([], () => r(require('./views/speedup/500g')), 'speedup_500');//500G加速包

//支付成功回调页
const recharge_success = r => require.ensure([], () => r(require('./views/recharge/index')), 'recharge_success');//500G加速包

//卡券
const coupon_normal = r => require.ensure([], () => r(require('./views/coupon/coupon_normal')), 'coupon_normal');//普通卡券
const coupon_telcom = r => require.ensure([], () => r(require('./views/coupon/coupon_telcom')), 'coupon_telcom');//联通卡券

//套餐充值列表
const plan_list = r => require.ensure([], () => r(require('./views/card/plan_list')), 'plan_list');

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
        path:'/recharge/callback',
        component:recharge_success,
    },{
        path:'/speedup_80',
        component:speedup_80
    },{
        path:'/speedup_500',
        component:speedup_500
    },{
        path:'/recharge_callback',
        component:recharge_success
    },{
        path:'/coupon/index',
        component:coupon_normal
    },{
        path:'/coupon/telcom',
        component:coupon_telcom
    },{
        path:'/card/plan_list',
        component:plan_list
}]

export default new Router({
    routes: constantRouterMap
})


