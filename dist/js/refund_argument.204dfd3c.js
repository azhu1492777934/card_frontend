(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["refund_argument"],{6765:function(e,t,n){},"75a5":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"refund-argument-wrap"},[n("div",{staticClass:"refund-title"},[e._v("退款协议书")]),n("div",{staticClass:"refund-content"},[n("p",[e._v("为明确退款规则和规范退款流程，请退款用户详细阅读该协议")]),n("p",[e._v("1、退款用户必须填写必要信息才能提交退款申请")]),n("p",[e._v("2、流量卡套餐首月使用量小于10MB可全额退款")]),n("p",[e._v("3、充值时间超过三个月不可退款")]),n("p",[e._v("4、流量卡使用量大于10MB不足1GB的按1GB计算，且后续每1G按5元成本计算；连续包月套餐单月上限为该系列单月套餐价格")]),n("p",[e._v("5、流量卡使用时间超过一个月不足三个月的退款按该系列单月套餐价格计算")]),n("p",[e._v("6、手机淘宝充值用户请提供支付宝账号，额外扣除2元手续费后剩余退款部分将通过支付宝转账方式退还")]),1==e.currentType?n("p",[e._v("7、有用量用户退款审核周期为3-5个工作日")]):e._e(),1==e.currentType?n("p",[e._v("8、ELB、抵扣券不支持退款，RMB、钻石支付的部分按上述退款规则执行")]):e._e()]),n("div",{staticClass:"btn-refund-wrap"},[n("div",[n("button",{on:{click:e.checkArgument}},[e._v("同意协议")])]),n("div",{on:{click:e.cancel}},[n("a",{attrs:{href:"javascript:void(0);"}},[e._v("拒绝协议")])])])])},i=[],u=(n("cadf"),n("551c"),n("097d"),{name:"argument",data:function(){return{currentType:""}},created:function(){this.currentType=localStorage.getItem("is_flow_card")},methods:{checkArgument:function(){this.$router.push({path:"/weixin/refund/index"})},cancel:function(){"userCenter"==this.currentType?this.$router.push({path:"/weixin/userCenter/index"}):this.$router.push({path:"/weixin/question/index"})}}}),c=u,a=(n("b4fe"),n("2877")),s=Object(a["a"])(c,r,i,!1,null,null,null);s.options.__file="argument.vue";t["default"]=s.exports},b4fe:function(e,t,n){"use strict";var r=n("6765"),i=n.n(r);i.a}}]);
//# sourceMappingURL=refund_argument.204dfd3c.js.map