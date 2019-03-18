import Vue from 'vue'
import Router from 'vue-router'

// layout
const Layout = r => require.ensure([], () => r(require('./components/layout')), 'Layout');

// 登录
const login = r => require.ensure([], () => r(require('./views/login/index')), 'login');//查询

// 新卡部分

const new_card_wrapper = r => require.ensure([], () => r(require('./views/new_card/new_card_wrapper')), 'new_card_wrapper'); // 查询
const lookup = r => require.ensure([], () => r(require('./views/new_card/lookup')), 'lookup'); // 查询
const real_name = r => require.ensure([], () => r(require('./views/new_card/real_name')), 'real_name'); // 实名
const to_tb = r => require.ensure([], () => r(require('./views/new_card/to_tb')), 'to_tb'); // 淘宝实名

// 充值
const recharge_wrapper = r => require.ensure([], () => r(require('./views/recharge/recharge_wrapper')), 'recharge_wrapper'); //充值页
const recharge = r => require.ensure([], () => r(require('./views/recharge/index')), 'recharge'); //充值页
const recharge_callback = r => require.ensure([], () => r(require('./views/recharge/callback')), 'recharge_callback'); // 支付成功回调页

// 加速包
const speedup_wrapper = r => require.ensure([], () => r(require('./views/speedup/speedup_wrapper')), 'speedup_wrapper');
const speedup_80 = r => require.ensure([], () => r(require('./views/speedup/80g')), 'speedup_80'); // 80G加速包
const speedup_500 = r => require.ensure([], () => r(require('./views/speedup/500g')), 'speedup_500'); // 500G加速包

// 卡券
const coupon_wrapper = r => require.ensure([], () => r(require('./views/coupon/coupon_wrapper')), 'coupon_wrapper');
const coupon_normal = r => require.ensure([], () => r(require('./views/coupon/coupon_normal')), 'coupon_normal'); // 普通卡券
const coupon_telcom = r => require.ensure([], () => r(require('./views/coupon/coupon_telcom')), 'coupon_telcom'); // 联通卡券

// 套餐充值列表
const plan_list = r => require.ensure([], () => r(require('./views/card/plan_list')), 'plan_list');

// 卡查询
const card_wrapper = r => require.ensure([], () => r(require('./views/card/card_wrapper')), 'card_wrapper');
const card_lookup = r => require.ensure([], () => r(require('./views/card/lookup')), 'card_lookup'); // 查询
const card_usage = r => require.ensure([], () => r(require('./views/card/usage')), 'card_usage'); // 使用情况
const card_connection = r => require.ensure([], () => r(require('./views/card/connection')), 'card_connection'); // 卡连接详情
const card_check = r => require.ensure([], () => r(require('./views/card/check')), 'card_check'); // 卡检测

// 儿童手表卡
const children_card = r => require.ensure([], () => r(require('./views/watch_card/index')), 'children_card'); // 手表卡

// 问题中心
const question_wrapper = r => require.ensure([], () => r(require('./views/question/question_wrapper')), 'question_wrapper');
const question = r => require.ensure([], () => r(require('./views/question/index')), 'question');
const find_plan = r => require.ensure([], () => r(require('./views/question/question_1')), 'find_plan'); // 流量通话未增加
const revoke_plan = r => require.ensure([], () => r(require('./views/question/question_2')), 'revoke_plan'); // 无法使用
const release_plan = r => require.ensure([], () => r(require('./views/question/question_3')), 'question') // 解约自动续约套餐

// 退款
const refund_wrapper = r => require.ensure([], () => r(require('./views/refund/refund_wrapper')), 'refund_wrapper');
const refund_plan = r => require.ensure([], () => r(require('./views/refund/list')), 'refund_plan') // 退款
const refund_applying = r => require.ensure([], () => r(require('./views/refund/applying')), 'refund_applying') // 理由
const refund_argument = r => require.ensure([], () => r(require('./views/refund/argument')), 'refund_argument') // 理由


const _404 = r => require.ensure([], () => r(require('./components/common/404')), '_404') // 404

// 授权
const authority_middle = r => require.ensure([], () => r(require('./views/authority')), 'authority_middle') // 授权中间页


Vue.use(Router)

export const constantRouterMap = [{
    path: '/login',
    component: login,
    meta: {
        title: '登录',
    }
}, {
    path: '/weixin',
    component: Layout,
    children: [
        {
            path: 'new_card',
            component: new_card_wrapper,
            children: [{
                path: 'real_name',
                component: real_name,
                meta: {
                    title: '实名',
                    requireAuth: true,
                }
            }, {
                path: 'lookup',
                component: lookup,
                meta: {
                    title: '新卡激活',
                }
            }, {
                path: 'to_tb',
                component: to_tb,
                meta: {
                    title: '阿里实名',
                    requireAuth: true,
                }
            },
            ]
        }, {
            path: 'question',
            component: question_wrapper,
            children: [
                {
                    path: 'index',
                    component: question,
                    meta: {
                        title: '问题中心',
                        requireAuth: true,
                    }
                }, {
                    path: 'find_plan',
                    component: find_plan,
                    meta: {
                        title: '找回套餐',
                        requireAuth: true,
                    }
                }, {
                    path: 'revoke_plan',
                    component: revoke_plan,
                    meta: {
                        title: '唤醒套餐',
                        requireAuth: true,
                    }
                }, {
                    path: 'release_plan',
                    component: release_plan,
                    meta: {
                        title: '套餐解约',
                        requireAuth: true,
                    }
                }
            ]
        }, {
            path: 'refund',
            component: refund_wrapper,
            children: [
                {
                    path: 'index',
                    component: refund_plan,
                    meta: {
                        title: '退款',
                        requireAuth: true,
                    }
                }, {
                    path: 'argument',
                    component: refund_argument,

                }, {
                    path: 'applying',
                    component: refund_applying,
                    meta: {
                        title: '退款申请',
                        requireAuth: true,
                    }
                },
            ]
        }, {
            path: 'speedup',
            component: speedup_wrapper,
            children: [
                {
                    path: 'plan_80',
                    component: speedup_80,
                    meta: {
                        title: '加速包',
                        requireAuth: true,
                    }
                }, {
                    path: 'plan_500',
                    component: speedup_500,
                    meta: {
                        title: '加速包',
                        requireAuth: true,
                    }
                }
            ]
        }, {
            path: 'coupon',
            component: coupon_wrapper,
            children: [
                {
                    path: 'index',
                    component: coupon_normal,
                    meta: {
                        title: '卡券兑换',
                        requireAuth: true,
                    }
                }, {
                    path: 'telcom',
                    component: coupon_telcom,
                    meta: {
                        title: '联通卡券兑换',
                        requireAuth: true,
                    }
                },
            ]
        }, {
            path: 'card',
            component:new_card_wrapper,
            children: [{
                path: 'lookup',
                component: card_lookup,
                    meta: {
                        title: '查询',
                        requireAuth: true,
                    }
                }, {
                    path: 'usage',
                    component: card_usage,
                    meta: {
                        title: '详情',
                        requireAuth: true,
                    }
                }, {
                    path: 'plan_list',
                    component: plan_list,
                    meta: {
                        title: '套餐列表',
                        requireAuth: true,
                    }
                }, {
                    path: 'connection',
                    component: card_connection,
                    meta: {
                        title: '连接详情',
                        requireAuth: true,
                    }
                }, {
                    path: 'check',
                    component: card_check,
                    meta: {
                        title: '卡检测'
                    }
                }, {
                    path: 'watch',
                    component: children_card,
                    meta: {
                        title: '手表号码查询'
                    }
                }]
        }, {
            path: 'recharge',
            component: recharge_wrapper,
            children: [
                {
                    path: 'index',
                    component: recharge,
                    meta: {
                        title: '充值',
                        requireAuth: true,
                    }
                }, {
                    path: 'callback',
                    component: recharge_callback,
                    meta: {
                        title: '支付成功',
                        requireAuth: true,
                    }
                }
            ]
        },

    ],
}, {
    path: '/',
    redirect: '/weixin/card/lookup'
}, {
    path: '/authority',
    component: authority_middle,

}, {
    path: '*',
    component: _404

}]

const router = new Router({
    mode: 'history',
    routes: constantRouterMap
})

export default router


