(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["card_check"],{"00f7":function(e,t,s){"use strict";var c=s("43ca"),i=s.n(c);i.a},1680:function(e,t,s){"use strict";s.r(t);var c=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"check-wrap"},[s("div",{staticClass:"check-wrap-top"},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.showResult,expression:"showResult"}],staticClass:"icon-result-wrap"},[s("span"),s("p",[e._v("检测完毕")])]),s("div",{staticClass:"iccid-wrap",class:{"m-t-0":!e.showResult}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],attrs:{autofocus:"",placeholder:"请输入或扫描ICCID",type:"text"},domProps:{value:e.iccid},on:{input:function(t){t.target.composing||(e.iccid=t.target.value)}}}),s("span",{staticClass:"iconfont icon-scan",on:{click:e.scanIccid}})]),s("button",{attrs:{disabled:e.isDisabled},on:{click:e.btnCheck}},[e._v(e._s(e.btnCheckText))])]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showNormalResult,expression:"showNormalResult"}],staticClass:"result-wrap"},[e._m(0),e._m(1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showOtherResult,expression:"showOtherResult"}],staticClass:"result-wrap result-other-wrap"},[e._m(2),s("div",{staticClass:"content"},[s("p",[e._v(e._s(e.otherResultMsg))])]),s("div",{staticClass:"footer"},[s("span",{on:{click:e.closeResult}},[e._v("否")]),s("span",{on:{click:e.fixedCheckResult}},[e._v("是")])])])])},i=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"title"},[s("span"),s("p",[e._v("检测结果")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[s("p",[e._v("卡状态正常,若不能正常使用可尝试一下操作")]),s("ul",[s("li",[e._v("1、重新插卡")]),s("li",[e._v("2、在信号良好的地方使用")]),s("li",[e._v("3、检测设备是否支持2G网络")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"title"},[s("span"),s("p",[e._v("检测结果")])])}],a=(s("a481"),s("a322")),r=(s("7f7f"),s("9a83"),s("f564")),o=s("35df"),h=s("db04"),l={name:"watch_card",data:function(){return{operatorType:0,iccid:"",showResult:!1,btnCheckText:"开始检测",isDisabled:!1,showNormalResult:!1,showOtherResult:!1,otherResultMsg:"",checkType:"",objCheckResult:null}},components:Object(a["a"])({},r["a"].name,r["a"]),created:function(){this.operatorType=Object(o["i"])("type")},methods:{scanIccid:function(){var e=this;"wechat"==Object(o["c"])()?wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(t){var s=t.resultStr;!s||19!=s.length&&20!=s.length?Object(r["a"])({message:"请扫描正确的ICCID"}):(e.iccid=s.replace(/\s*]*/g,""),e.processCheckIccid(e.iccid))}}):"alipay"==Object(o["c"])()&&ap.scan(function(t){var s=t.code;e.iccid=s.replace(/\s*/g,""),e.processCheckIccid(e.iccid)})},closeResult:function(){this.showOtherResult=!1},processCheckIccid:function(e){var t=this;1==Object(o["d"])(e).state?(this.showNormalResult=!1,this.showOtherResult=!1,this.showResult=!1,this.btnCheckText="检测中...",this.isDisabled=!0,Object(h["a"])("/api/v1/app/cards/check",{iccid:e,is_server:1==this.operatorType?1:0}).then(function(e){t.btnCheckText="开始检测",t.isDisabled=!1,t.showResult=!0,t.objCheckResult=e,e.state?1==e.state?t.showNormalResult=!0:(t.checkType=e.state,"11001"==e.state&&(t.showOtherResult=!0,t.otherResultMsg="未查询到此卡相关信息，请检查您的卡号是否正确"),"11002"==e.state&&(t.showOtherResult=!0,t.otherResultMsg="卡尚未实名，是否立即实名"),"11003"==e.state&&(t.showOtherResult=!0,t.otherResultMsg="卡未激活，是否激活此卡"),"11004"==e.state&&(t.showOtherResult=!0,t.otherResultMsg="卡暂无套餐，是否前往充值"),"11005"==e.stata&&(t.showOtherResult=!0,t.otherResultMsg="基站信号弱,请切换套餐"),"11007"==e.state&&(t.showOtherResult=!0,t.otherResultMsg="卡已停机,是否前往充值"),1==t.operatorType&&"11006"==e.stata&&(t.showOtherResult=!0,t.otherResultMsg="深圳移动未下发套餐")):Object(r["a"])({message:e.msg})})):Object(r["a"])({message:Object(o["d"])(e).msg})},btnCheck:function(){this.processCheckIccid(this.iccid)},fixedCheckResult:function(){var e=this;"11001"==this.checkType&&(this.showOtherResult=!1),"11002"==this.checkType&&(Object(o["l"])("check_realNameSource",this.objCheckResult.data.source),Object(o["l"])("check_iccid",this.iccid),this.$router.push({path:"/weixin/new_card/real_name"})),"11003"==this.checkType&&Object(h["b"])("/api/v1/app/activated",{iccid:this.iccid}).then(function(t){e.showOtherResult=!1,1==t.state?Object(r["a"])({message:"请在5分钟内放回原绑定的设备中开机,否则会被停机",background:"#00c2ff"}):Object(r["a"])({message:t.msg})}),"11004"!=this.checkType&&"11007"!=this.checkType||(Object(o["l"])("check_iccid",this.iccid),this.$router.push({path:"/weixin/card/plan_list"})),"11005"==this.checkType&&(Object(o["l"])("check_iccid",this.iccid),"esim"==localStorage.getItem("currentType")?this.$router.push({path:"/weixin/card/esim_usage"}):this.$router.push({path:"/weixin/card/usage"}))}}},n=l,u=(s("00f7"),s("2877")),d=Object(u["a"])(n,c,i,!1,null,null,null);d.options.__file="check.vue";t["default"]=d.exports},"43ca":function(e,t,s){},a481:function(e,t,s){s("214f")("replace",2,function(e,t,s){return[function(c,i){"use strict";var a=e(this),r=void 0==c?void 0:c[t];return void 0!==r?r.call(c,a,i):s.call(String(a),c,i)},s]})}}]);
//# sourceMappingURL=card_check.8e38430c.js.map