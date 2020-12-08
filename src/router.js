import Vue from 'vue'
import Router from 'vue-router'
import global_variables from './utilies/domain'

// 临时组件
const usage_bak = r => require.ensure([], () => r(require('./views/card/usage_bak')), 'Layout');
const real_name_bak = r => require.ensure([], () => r(require('./views/new_card/real_name_back')), 'Layout');

// layout
const Layout = r => require.ensure([], () => r(require('./components/layout')), 'Layout');
const mifi_layout = r => require.ensure([], () => r(require('./components/mifi_layout')), 'mifi_layout');

// 中转链接
const transfer_url = r => require.ensure([], () => r(require('./views/transfer_url/index')), 'transfer_url');
const official_accounts = r => require.ensure([], () => r(require('./views/transfer_url/official_accounts')), 'official_accounts');

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
const recharge_balance = r => require.ensure([], () => r(require('./views/recharge/balance')), 'recharge_balance'); //余额充值
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
const card_lookup_notice = r => require.ensure([], () => r(require('./views/card/lookupNotice')), 'card_lookup_notice'); // 查询
const card_usage = r => require.ensure([], () => r(require('./views/card/usage')), 'card_usage'); // 使用情况
const card_more_flow = r => require.ensure([], () => r(require('./views/card/more_flow_plan')), 'card_more_flow'); // 加油包充值
const card_connection = r => require.ensure([], () => r(require('./views/card/connection')), 'card_connection'); // 卡连接详情
const card_check = r => require.ensure([], () => r(require('./views/card/check')), 'card_check'); // 卡检测
const esim_usage = r => require.ensure([], () => r(require('./views/card/esim_usage')), 'esim_usage'); // 卡检测
const esim_plan_list = r => require.ensure([], () => r(require('./views/card/esim_plan_list')), 'esim_plan_list'); // 卡检测
const card_invoice = r => require.ensure([], () => r(require('./views/card/card_invoice')), 'card_invoice'); // 发票申请


// 儿童手表卡
const children_card = r => require.ensure([], () => r(require('./views/watch_card/index')), 'children_card'); // 手表卡

// 问题中心
const question_wrapper = r => require.ensure([], () => r(require('./views/question/question_wrapper')), 'question_wrapper');
const question = r => require.ensure([], () => r(require('./views/question/index')), 'question');
const find_plan = r => require.ensure([], () => r(require('./views/question/question_1')), 'find_plan'); // 流量通话未增加
const revoke_plan = r => require.ensure([], () => r(require('./views/question/question_2')), 'revoke_plan'); // 无法使用
const release_plan = r => require.ensure([], () => r(require('./views/question/question_3')), 'question'); // 解约自动续约套餐
const commonProblem = r => require.ensure([], () => r(require('./views/question/commonProblem')), 'commonProblem'); //  常见问题
const realNameCourse = r => require.ensure([], () => r(require('./views/question/realNameCourse')), 'realNameCourse'); //  实名教程
const guardian = r => require.ensure([], () => r(require('./views/question/guardian')), 'guardian'); // 赔偿条款协议书
// 常见问题
const commonQuestion = r => require.ensure([], () => r(require('./views/question/common_question')), 'commonQuestion'); //  客户常见问题
const customerFeedback = r => require.ensure([], () => r(require('./views/question/customer_feedback')), 'customerFeedback'); //  客户反馈
// 退款
const refund_wrapper = r => require.ensure([], () => r(require('./views/refund/refund_wrapper')), 'refund_wrapper');
const refund_plan = r => require.ensure([], () => r(require('./views/refund/list')), 'refund_plan') // 退款
const refund_applying = r => require.ensure([], () => r(require('./views/refund/applying')), 'refund_applying') // 理由
const refund_argument = r => require.ensure([], () => r(require('./views/refund/argument')), 'refund_argument') // 理由


const Not_fund = r => require.ensure([], () => r(require('./components/common/404')), 'Not_fund') // 404

// 授权
const authority_middle = r => require.ensure([], () => r(require('./views/authority')), 'authority_middle') // 授权中间页


/*
* mifi公众号页面
* */
// 访问页
const mifi_index = r => require.ensure([], () => r(require('./views/mifi/mifi_index')), 'mifi_index');

// 业务处理页
const logical_page = r => require.ensure([], () => r(require('./views/mifi/authority/index')), 'logical_page');

// mifi 绑定手机号码页
const mifi_binding = r => require.ensure([], () => r(require('./views/mifi/binding')), 'mifi_binding');

// mifi 卡查询相关
const mifi_card_wrapper = r => require.ensure([], () => r(require('./views/mifi/card/mifi_card_wrapper')), 'mifi_card_wrapper') // 卡父组件页
const mifi_card_lookup = r => require.ensure([], () => r(require('./views/mifi/card/lookup')), 'mifi_card_lookup'); // 查卡
const mifi_card_info = r => require.ensure([], () => r(require('./views/mifi/card/index')), 'mifi_card_info'); // 卡状态详情
const mifi_change_network = r => require.ensure([], () => r(require('./views/mifi/card/change_net')), 'mifi_change_network'); // 切换网络

// mifi 订单
const mifi_order_wrapper = r => require.ensure([], () => r(require('./views/mifi/order/order_wrapper')), 'mifi_order_wrapper')
const mifi_order = r => require.ensure([], () => r(require('./views/mifi/order/index')), 'mifi_order')

// mifi 套餐
const mifi_plan_wrapper = r => require.ensure([], () => r(require('./views/mifi/plan/plan_wrapper')), 'mifi_plan_wrapper');
const mifi_plan_group = r => require.ensure([], () => r(require('./views/mifi/plan/plan_group')), 'mifi_plan_group'); // 套餐组页
const mifi_plan_list = r => require.ensure([], () => r(require('./views/mifi/plan/plan_list')), 'mifi_plan_list'); // 套餐列表页
const mifi_plan_usage = r => require.ensure([], () => r(require('./views/mifi/plan/usage')), 'mifi_plan_usage'); // 套餐用量

// mifi 卡券
const mifi_coupon_wrapper = r => require.ensure([], () => r(require('./views/mifi/coupon/coupon_wrapper')), 'mifi_coupon_wrapper');
const mifi_coupon_index = r => require.ensure([], () => r(require('./views/mifi/coupon/index')), 'mifi_coupon_index');

// mifi 切换网络
const mifi_change_network_explanation = r => require.ensure([], () => r(require('./views/mifi/change_network_explanation')), 'mifi_change_network_explanation');


//个人中心
const userCenterWrap = r => require.ensure([], () => r(require('./views/userCenter/userCenterWrap')), 'userCenterWrap');
const userCenter = r => require.ensure([], () => r(require('./views/userCenter/index')), 'userCenter'); //主页
const orderRecord = r => require.ensure([], () => r(require('./views/userCenter/orderRecord')), 'orderRecord'); //订单查询
const cardPackage = r => require.ensure([], () => r(require('./views/userCenter/cardPackage')), 'cardPackage'); //卡包
const consumerRecord = r => require.ensure([], () => r(require('./views/userCenter/consumerRecord')), 'consumerRecord'); //消费记录
const balanceRefund = r => require.ensure([], () => r(require('./views/userCenter/balanceRefund')), 'balanceRefund'); //余额退款
const currencyConversion = r => require.ensure([], () => r(require('./views/userCenter/currencyConversion')), 'currencyConversion'); //钻石转余额
const rechargeOrder = r => require.ensure([], () => r(require('./views/userCenter/rechargeOrder')), 'rechargeOrder'); //充值订单
const balanceIndex = r => require.ensure([], () => r(require('./views/userCenter/balanceIndex')), 'balanceIndex'); //余额
const refundRules = r => require.ensure([], () => r(require('./views/userCenter/refundRules')), 'refundRules'); //订单规则说明

//复充活动
const repeatRecharge = r => require.ensure([], () => r(require('./views/card/repeatRecharge')), 'repeatRecharge');  //复充活动
//设备更换
const eqReplaceMent = r => require.ensure([], () => r(require('./views/question/eqReplaceMent')), 'eqReplaceMent');  //设备更换

//白名单
const whiteListsWrapper = r => require.ensure([], () => r(require('./views/white_lists/whiteListsWrapper')), 'whiteListsWrapper');
const whiteSearch = r => require.ensure([], () => r(require('./views/white_lists/whiteSearch')), 'whiteSearch'); //查询
const whiteNewlist = r => require.ensure([], () => r(require('./views/white_lists/whiteNewlist')), 'whiteNewlist'); //新增

//京东
const jdWrapper = r => require.ensure([], () => r(require('./views/jd/jdWrapper')), 'jdWrapper');
const jdReplaceMent = r => require.ensure([], () => r(require('./views/jd/jdReplaceMent')), 'jdReplaceMent'); //查询


Vue.use(Router);

export const constantRouterMap = [{
  path: '/official_accounts',
  component: official_accounts,
  meta: {title: "公众号二维码"}
},{
  path: '/transfer_url',
  component: transfer_url,
  meta: {title: "公众号二维码"}
}, {
  path: '/login',
  component: login,
  meta: {title: '用户绑定',}
}, {
  path: '/binding',
  component: mifi_binding,
  meta: {title: '用户绑定'}
}, {
  path: '/card/usage_bak',
  meta: {title: '临时链接'},
  component: usage_bak,
}, {
  path: '/weixin/new_card/real_name_back',
  meta: {title: '实名'},
  component: real_name_bak,
}, {
  path: "/change_network_explanation",
  component: mifi_change_network_explanation,
  meta: {title: '切换网络操作说明'}
}, {
  path: '/to_tb',
  component: to_tb,
  meta: {
    title: '阿里实名',
    requireAuth: true,
  }
}, {
  path:'/whiteLists',
  component: whiteListsWrapper,
  children: [
    {
      path: 'whiteSearch',
      name: 'whiteSearch',
      component: whiteSearch,
      meta: {
        title: '白名单',
      }
    },
    {
      path: 'whiteNewlist',
      name: 'whiteNewlist',
      component: whiteNewlist,
      meta: {
        title: '新增白名单',
      }
    },
  ]
}, {
  path:'/jd',
  component: jdWrapper,
  children: [
    {
      path: 'jdReplaceMent',
      name: 'jdReplaceMent',
      component: jdReplaceMent,
      meta: {
        title: '卡更换',
      }
    },
  ]
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
      }]
    }, {
      path: 'question',
      component: question_wrapper,
      children: [
        {
          path: 'index',
          component: question,
          name:'question',
          meta: {
            title: '问题中心',
            requireAuth: true,
          }
        }, {
          path: 'revoke_plan',
          component: revoke_plan,
          name: 'revoke_plan',
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
        }, {
          path: 'eqReplaceMent',
          name: 'eqReplaceMent',
          component: eqReplaceMent,
          meta: {
            title: '设备或卡更换',
            requireAuth: true,
          }
        },
        {
          path: 'commonProblem',
          component: commonProblem,
          meta: {
            title: '常见问题',
            requireAuth: true,
          }
        },
        {
          path: 'realNameCourse',
          component: realNameCourse,
          meta: {
            title: '实名认证教程',
            requireAuth: true,
          }
        },
        {
          path: 'common_question',
          component: commonQuestion,
          meta: {
            title: '常见问题',
          }
        },
        {
          path: 'customer_feedback',
          component: customerFeedback,
          meta: {
            title: '反馈',
          }
        },
        {
          path: 'guardian',
          component: guardian,
          meta: {
            title: '协议书',
          }
        },
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
          meta: {
            title: '退款条款',
            requireAuth: true,
          }
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
      component: new_card_wrapper,
      children: [{
        path: 'lookup',
        component: card_lookup,
        meta: {
          title: '查询',
          requireAuth: true,
        }
      },{
          path: 'lookupN',
          component: card_lookup_notice,
          meta: {
            title: '查询',
            requireAuth: true,
          }
        },
        {
          path: 'esim_usage',
          component: esim_usage,
          meta: {
            title: 'esim详情',
            requireAuth: true,
          }
        },
        {
          path: 'usage',
          component: card_usage,
          meta: {
            title: '详情',
            requireAuth: true,
          }
        },
        {
          path: 'esim_plan_list',
          component: esim_plan_list,
          meta: {
            title: 'esim套餐列表',
            requireAuth: true,
          }
        }, {
          path: 'more_flow',
          component: card_more_flow,
          meta: {title: '加速包叠加对应套餐'}
        },
        {
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
        }, {
          path: 'repeatRecharge',
          component: repeatRecharge,
          meta: {
            title: '复充活动'
          }
        }, {
          path: 'card_invoice',
          component: card_invoice,
          name: 'card_invoice',
          meta: {
            title: '开具发票'
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
          path: 'balance',
          component: recharge_balance,
          meta: {
            title: '充值'
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
    }, {
      path: 'userCenter',
      component: userCenterWrap,
      children: [
        {
          path: 'index',
          component: userCenter,
          meta: {
            title: '个人中心',
          }
        },
        {
          path: 'orderRecord',
          component: orderRecord,
          meta: {
            title: '历史订单',
          }
        },
        {
          path: 'cardPackage',
          component: cardPackage,
          meta: {
            title: '卡包',
          }
        },
        {
          path: 'consumerRecord',
          component: consumerRecord,
          meta: {
            title: '消费记录',
          }
        },
        {
          path: 'balanceRefund',
          component: balanceRefund,
          meta: {
            title: '余额退款',
          }
        },
        {
          path: 'currencyConversion',
          component: currencyConversion,
          meta: {
            title: '钻石转余额',
          }
        },
        {
          path: 'rechargeOrder',
          component: rechargeOrder,
          meta: {
            title: '充值订单',
          }
        },
        {
          path: 'balanceIndex',
          component: balanceIndex,
          meta: {
            title: '余额',
          }
        },
        {
          path: 'refundRules',
          component: refundRules,
          meta: {
            title: '订单规则说明',
          }
        },
      ]
    }
  ],
}, {
  path: '/mifi',
  component: mifi_layout,
  children: [{
    path: 'index',
    component: mifi_index,
  }, {
    path: 'card',
    component: mifi_card_wrapper,
    children: [{
      path: 'index',
      component: mifi_card_info,
      meta: {title: '卡信息'}
    }, {
      path: 'lookup',
      component: mifi_card_lookup,
      meta: {title: '查询'}
    }, {
      path: 'change_network',
      component: mifi_change_network,
      meta: {title: '修改网络'},
    }]
  }, {
    path: 'order',
    component: mifi_order_wrapper,
    children: [{
      path: 'index',
      component: mifi_order,
      meta: {title: '订单'}
    }]
  }, {
    path: 'plan',
    component: mifi_plan_wrapper,
    children: [{
      path: 'usage',
      component: mifi_plan_usage,
      meta: {title: '套餐用量'}
    }, {
      path: 'group',
      component: mifi_plan_group,
      meta: {title: '套餐组'}
    }, {
      path: 'list',
      component: mifi_plan_list,
      meta: {title: '套餐列表'}
    }]
  }, {
    path: 'coupon',
    component: mifi_coupon_wrapper,
    children: [{
      path: 'index',
      component: mifi_coupon_index,
      meta: {title: '卡券兑换'}
    }]
  }]
}, {
  // cardserver 授权业务处理
  path: '/authority',
  component: authority_middle,
}, {
  // mifi 授权业务处理
  path: '/mifi/transaction',
  component: logical_page,
}, {
  path: '/',
  redirect: global_variables[`${global_variables.packed_project}_project`].empty_router_url
}, {
  path: '*',
  component: Not_fund
}];

const router = new Router({
  mode: 'history',
  routes: constantRouterMap
});

export default router


