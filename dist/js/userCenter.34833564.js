(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["userCenter"],{"1ec0":function(n,t,e){"use strict";e.r(t);var i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"userCenter"},[e("div",[e("div",{staticClass:"userHeader"},[e("div",[e("div",{staticClass:"nickName"},[n._v("\n              "+n._s(n.getUserInfo.nickname)+"\n            ")])]),e("div",{staticClass:"userImg"},[e("img",{attrs:{src:n.getUserInfo.avatar}})])])]),e("div",{staticClass:"userMid"},[e("div",{staticClass:"money"},[e("div",[e("span",[n._v(n._s(n.getUserInfo.account.balance)),e("i",{on:{click:n.getRmb}})])]),e("div",{on:{click:n.goBalance}},[e("i"),e("span",[n._v("余额")])])]),e("div",{staticClass:"diamonds"}),e("div",{staticClass:"elb"})]),e("div",{staticClass:"userBottom"},[e("div",{on:{click:n.goRecord}},[e("div"),e("div",[n._v("\n          历史订单\n        ")]),e("div",{staticClass:"iconfont icon-rightArrow"})]),e("div",{on:{click:n.goConsumer}},[e("div"),e("div",[n._v("\n          消费记录\n        ")]),e("div",{staticClass:"iconfont icon-rightArrow"})]),e("div",{on:{click:n.goCard}},[e("div"),e("div",[n._v("\n          卡包\n        ")]),e("div",{staticClass:"iconfont icon-rightArrow"})])])])},s=[],o=(e("e17f"),e("2241")),c=e("c93e"),a=(e("35df"),e("2f62")),r={data:function(){return{}},components:{},computed:Object(c["a"])({},Object(a["b"])({getUserInfo:function(n){return n.userInfo.userInfoInner}})),created:function(){},methods:{goRecord:function(){this.$router.push({path:"orderRecord"})},goCard:function(){this.$router.push({path:"cardPackage"})},goConsumer:function(){this.$router.push({path:"consumerRecord"})},goRefund:function(){this.$router.push({path:"balanceRefund"})},goChange:function(){this.$router.push({path:"currencyConversion"})},goBalance:function(){this.$router.push({path:"balanceIndex"})},goRecharge:function(){this.$router.push({path:"rechargeOrder"})},getRmb:function(){o["a"].alert({message:"余额：可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额。"}).then(function(){})},getDiamonds:function(){o["a"].alert({message:"钻石：翼联会员体系下通用虚拟货币，可用于游戏娱乐，购买优惠商品也可以转化成余额。"}).then(function(){})},getElb:function(){o["a"].alert({message:"ELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用户商品现金抵扣、游戏娱乐等。"}).then(function(){})}}},u=r,d=(e("52c6"),e("2877")),f=Object(d["a"])(u,i,s,!1,null,null,null);f.options.__file="index.vue";t["default"]=f.exports},"374d":function(n,t,e){},"52c6":function(n,t,e){"use strict";var i=e("374d"),s=e.n(i);s.a}}]);
//# sourceMappingURL=userCenter.34833564.js.map