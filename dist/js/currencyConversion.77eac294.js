(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["currencyConversion"],{"150e":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"currencyConversion"},[n("div",[n("div",[n("div",[e._v("钻石")]),n("div",[e._v("Diamonds")]),n("div",[e._v(e._s(e.getUserInfo.account.rmb))])]),n("div",[n("div",[e._v("余额")]),n("div",[e._v("Balance")]),n("div",[e._v(e._s(e.getUserInfo.account.balance))])])]),n("div",[n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.rmb,expression:"rmb"}],attrs:{type:"text",placeholder:"可转钻石数0.01-"+e.getUserInfo.account.rmb},domProps:{value:e.rmb},on:{input:function(t){t.target.composing||(e.rmb=t.target.value)}}})]),n("div",{on:{click:function(t){e.getAllRmb(e.getUserInfo.account.rmb)}}},[e._v("全部")])]),n("div",{on:{click:e.conversion}},[n("van-button",{attrs:{type:"primary",size:"normal",round:""}},[e._v("转移")])],1)])},c=[],o=(n("e17f"),n("2241")),a=(n("9a83"),n("f564")),s=n("c93e"),i=(n("66b9"),n("b650")),u=(n("cadf"),n("551c"),n("097d"),n("35df")),b=n("2f62"),m=n("db04"),v={data:function(){return{rmb:""}},components:{"van-button":i["a"]},computed:Object(s["a"])({},Object(b["b"])({getUserInfo:function(e){return e.userInfo.userInfoInner}})),created:function(){},mounted:function(){},methods:{getAllRmb:function(e){this.rmb=e},conversion:function(){var e=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;return e.test(this.rmb)?parseFloat(this.rmb)>parseFloat(this.getUserInfo.account.rmb)?(Object(a["a"])({message:"超出可转移的范围"}),!1):void o["a"].confirm({message:"是否确认将账户上的钻石转为余额，余额只可用于购买套餐且不能转回钻石!",beforeClose:this.cfm}):(Object(a["a"])({message:"请输入数字且至多保留两位小数"}),!1)},cfm:function(e,t){var n=this;"confirm"===e?Object(m["b"])("/accountCenter/v2/user-account/rmb-to-balance?"+Object(u["g"])({},"post"),{rmb:this.rmb}).then(function(e){0==e.error?(Object(a["a"])({message:"转移成功",background:"#60ce53"}),n.rmb="",n.$emit("getUserData"),t()):11002===e.error?n.$emit("getToken"):(Object(a["a"])({message:e.msg}),t(close))}):t()}}},d=v,f=(n("cc16"),n("2877")),l=Object(f["a"])(d,r,c,!1,null,null,null);l.options.__file="currencyConversion.vue";t["default"]=l.exports},"425a":function(e,t,n){},"66b9":function(e,t,n){"use strict";n("68ef"),n("9d70"),n("09fe"),n("3743"),n("e3b3"),n("bc1b")},cc16:function(e,t,n){"use strict";var r=n("425a"),c=n.n(r);c.a}}]);
//# sourceMappingURL=currencyConversion.77eac294.js.map