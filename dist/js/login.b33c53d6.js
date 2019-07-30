(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{6762:function(e,t,n){"use strict";var o=n("5ca1"),a=n("c366")(!0);o(o.P,"Array",{includes:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")("includes")},"6eca":function(e,t,n){"use strict";var o=n("b768"),a=n.n(o);a.a},"9ed6":function(e,t,n){"use strict";n.r(t);var o,a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-wrap"},[n("div",{staticClass:"info-wrap"},[n("div",{staticClass:"phone-wrap"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"text",placeholder:"请输入手机号码",maxlength:"11"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})]),n("div",{staticClass:"code-wrap"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"number",placeholder:"请输入验证码",maxlength:"10"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),n("button",{staticClass:"getCode",attrs:{disabled:e.btnCode_disabled},on:{click:e.getCode}},[e._v(e._s(e.codeText))])]),n("div",{staticClass:"btn-login-wrap"},[n("button",{attrs:{disabled:e.loginDisabled},on:{click:e.login}},[e._v("绑定账户")])])]),n("van-popup",{attrs:{"close-on-click-overlay":!0},model:{value:e.isLoginError,callback:function(t){e.isLoginError=t},expression:"isLoginError"}},[n("p",{staticClass:"showTip"},[e._v(e._s(e.loginErrorMsg))])])],1)},i=[],s=(n("6762"),n("a322")),c=(n("8a58"),n("e41f")),r=(n("7f7f"),n("9a83"),n("f564")),d=(n("cadf"),n("551c"),n("097d"),n("db04")),l=n("35df"),u={data:function(){return{decrypt_data:{},phone:"",code:"",codeText:"获取验证码",countdown:60,state:"",client_type:"",btnCode_disabled:!1,time:null,loginDisabled:!1,isLoginError:!1,loginErrorMsg:""}},components:(o={},Object(s["a"])(o,r["a"].name,r["a"]),Object(s["a"])(o,c["a"].name,c["a"]),o),created:function(){"wechat"===Object(l["c"])()?this.client_type="wechat":"alipay"===Object(l["c"])()&&(this.client_type="alipay"),"wechat"!==Object(l["c"])()&&"alipay"!==Object(l["c"])()||Object(l["k"])({type:0}),this.decrypt_data=Object(l["h"])("decrypt_data","obj")},methods:{login:function(){var e=this;this.phone||this.code?/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phone)?(this.loginDisabled=!0,Object(l["k"])({type:1,phone:this.phone}),Object(d["b"])("/accountCenter/v2/user/bind?"+Object(l["e"])({},"post"),{mobile:this.phone,code:this.code,from:this.client_type,uuid:this.decrypt_data.openid,nickname:this.decrypt_data.nickname,gender:this.decrypt_data.sex,avatar:this.decrypt_data.headimgurl}).then(function(t){if(e.loginDisabled=!1,0===t.error){var n=e;Object(l["m"])("token",t.data),Object(r["a"])({message:"账户绑定成功",background:"#60ce53"}),setTimeout(function(){"esim"===localStorage.getItem("currentType")?n.$router.push({path:"/weixin/card/esim_usage"}):"userCenter"===localStorage.getItem("currentType")?n.$router.push({path:"/weixin/userCenter/index"}):n.$router.push({path:"/weixin/card/lookup"})},2e3)}else if(11002===t.error)e.$emit("getToken");else if(30002===t.error)if(Object(r["a"])({message:"帐户绑定成功",background:"#60ce53"}),"esim"===localStorage.getItem("currentType"))location.href="/weixin/card/esim_usage";else if("userCenter"===localStorage.getItem("currentType"))location.href="/weixin/userCenter/index";else{var o=Object(l["h"])("authorized_redirect_uri");Object(l["h"])("check_iccid")?location.href=o:location.href="/weixin/card/lookup"}else 20014===t.error?(e.code="",Object(r["a"])({message:"用户绑定超时，请重新绑定"})):(e.isLoginError=!0,t.msg?e.loginErrorMsg=t.msg:e.loginErrorMsg="绑定用户失败，请反馈我司客服。")})):Object(r["a"])({message:"您的手机号码有误"}):Object(r["a"])({message:"请填写您的信息"})},getCode:function(){var e=this;if(this.phone)if(/^(13[0-9]|14[5679]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phone)){var t=this.phone.substr(0,3),n=["145","146","166","177","199"];n.includes(t)?Object(r["a"])({message:"不支持以145,146,166,177,199开头的手机号码"}):(Object(r["a"])({message:"温馨提示：请使用本人手机号绑定账号。"}),this.countDownFun(),Object(d["b"])("/accountCenter/v2/verify/send?"+Object(l["e"])({},"post"),{mobile:this.phone}).then(function(t){0===t.error?Object(r["a"])({message:"验证码发送成功",background:"#60ce53"}):11002===t.error?e.$emit("getToken"):Object(r["a"])({message:t.msg})}))}else Object(r["a"])({message:"请填写正确的手机号码"});else Object(r["a"])({message:"请输入您的手机号码"})},countDownFun:function(){var e=this,t=this;this.btnCode_disabled=!0,clearInterval(this.timer),this.timer=setInterval(function(){t.countdown<=0?(t.codeText="获取验证码",t.countdown=60,t.btnCode_disabled=!1,clearInterval(t.timer)):(t.codeText=e.countdown+"s",t.countdown--)},1e3)}}},p=u,h=(n("6eca"),n("2877")),g=Object(h["a"])(p,a,i,!1,null,null,null);g.options.__file="index.vue";t["default"]=g.exports},b768:function(e,t,n){}}]);
//# sourceMappingURL=login.b33c53d6.js.map