import Vue from 'vue'
import Router from 'vue-router'

//登录
const login = r => require.ensure([], () => r(require('./views/login/index')), 'login');//查询

//新卡部分
const lookup = r => require.ensure([], () => r(require('./views/new_card/lookup')), 'lookup');//查询
const real_name = r => require.ensure([], () => r(require('./views/new_card/real_name')), 'real_name');//实名
const to_tb = r => require.ensure([], () => r(require('./views/new_card/to_tb')), 'to_tb');//淘宝实名

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

//卡查询
const card_lookup = r => require.ensure([], () => r(require('./views/card/lookup')), 'card_lookup');
const card_usage = r => require.ensure([], () => r(require('./views/card/usage')), 'card_usage');

//问题中心
const question = r => require.ensure([], () => r(require('./views/question/index')), 'question');
const find_plan = r => require.ensure([], () => r(require('./views/question/question_1')), 'question');//流量通话未增加
const revoke_plan = r => require.ensure([], () => r(require('./views/question/question_2')), 'question');//无法使用

Vue.use(Router)

export const constantRouterMap = [{
    path: '/login',
    component: login,
    meta: {
        title: '登录'
    }

},{
    path: '/',
    component: card_lookup,
    meta: {
        title: '查询'
    }
}, {
    path: '/new_card/real_name',
    component: real_name,
    meta: {
        title: '实名'
    }
}, {
    path: '/new_card/to_tb',
    component: to_tb,
    meta: {
        title: '阿里实名'
    }
}, {
    path: '/question',
    component: question,
    meta: {
        title: '问题中心'
    }
}, {
    path: '/question/find_plan',
    component: find_plan,
    meta: {
        title: '找回套餐'
    }
}, {
    path: '/question/revoke_plan',
    component: revoke_plan,
    meta: {
        title: '唤醒套餐'
    }
}, {
    path: '/recharge',
    component: recharge,
    meta: {
        title: '充值'
    }
}, {
    path: '/recharge/callback',
    component: recharge_success,
    meta: {
        title: '支付成功'
    }
}, {
    path: '/speedup/plan_80',
    component: speedup_80,
    meta: {
        title: '80G加速包'
    }
}, {
    path: '/speedup/plan_500',
    component: speedup_500,
    meta: {
        title: '500G加速包'
    }
}, {
    path: '/coupon/index',
    component: coupon_normal,
    meta: {
        title: '卡券兑换'
    }
}, {
    path: '/coupon/telcom',
    component: coupon_telcom,
    meta: {
        title: '联通卡券兑换'
    }
}, {
    path: '/card/plan_list',
    component: plan_list,
    meta: {
        title: '套餐列表'
    }
}, {
    path: '/card/lookup',
    component: plan_list,
    meta: {
        title: '查询'
    }
}, {
    path: '/card/usage',
    component: card_usage,
    meta: {
        title: '详情'
    }
}]

export default new Router({
    mode:'history',
    routes: constantRouterMap
})


