(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["coupon_normal"],{"4ecd":function(c,e,t){c.exports=t.p+"img/coupon-log.27158aa7.png"},"74ac":function(c,e,t){"use strict";var a=t("91a2"),i=t.n(a);i.a},"91a2":function(c,e,t){},d3b1:function(c,e,t){"use strict";t.r(e);var a=function(){var c=this,e=c.$createElement,t=c._self._c||e;return t("div",{staticClass:"coupon-wrap"},[t("div",{staticClass:"coupon-inner-wrap"},[c._m(0),t("div",{staticClass:"iccid-wrap"},[t("div",{staticClass:"iccid-desc"},[c._v("兑换礼包卡号为：")]),t("div",{staticClass:"iccid"},[c._v(c._s(c.iccid))])]),t("div",{staticClass:"coupon-code-wrap"},[t("span",[c._v("券号：")]),t("input",{directives:[{name:"model",rawName:"v-model",value:c.coupon_code,expression:"coupon_code"}],attrs:{maxlength:"15",placeholder:"请输入兑换码"},domProps:{value:c.coupon_code},on:{input:function(e){e.target.composing||(c.coupon_code=e.target.value)}}})]),t("div",{staticClass:"btn-exchange-wrap"},[t("button",{staticClass:"btn-exchange",on:{click:c.exchange}},[c._v("立即兑换")])])])])},i=[function(){var c=this,e=c.$createElement,a=c._self._c||e;return a("div",{staticClass:"logo-wrap"},[a("img",{staticClass:"img-logo",attrs:{src:t("4ecd")}}),a("div",{staticClass:"logo-desc"},[c._v("卡券兑换")])])}],o=(t("9a83"),t("f564")),s=t("35df"),n=t("db04"),u={name:"watch_card",data:function(){return{iccid:"",coupon_code:""}},created:function(){Object(s["h"])("check_iccid")?this.iccid=Object(s["h"])("check_iccid"):(Object(o["a"])({message:"您的ICCID号码丢失了"}),setTimeout(function(){this.$router.push("/weixin/card/lookup")},2e3))},methods:{exchange:function(){var c=this;this.coupon_code?/[a-zA-Z0-9_]{4,12}/.test(this.coupon_code)?Object(n["b"])("/api/v1/app/coupon/exchange",{iccid:this.iccid,no:this.coupon_code}).then(function(e){1==e.state?(Object(o["a"])({message:"兑换成功",background:"#60ce53"}),setTimeout(function(){Object(s["l"])("check_iccid",c.iccid),"esim"==localStorage.getItem("currentType")?c.$router.push({path:"/weixin/card/esim_usage"}):c.$router.push({path:"/weixin/card/usage"})},2e3)):Object(o["a"])({message:e.msg})}):Object(o["a"])({message:"您的兑换码有误,请检查"}):Object(o["a"])({message:"请输入兑换码"})}}},d=u,r=(t("74ac"),t("2877")),p=Object(r["a"])(d,a,i,!1,null,null,null);p.options.__file="coupon_normal.vue";e["default"]=p.exports}}]);
//# sourceMappingURL=coupon_normal.39c4b151.js.map