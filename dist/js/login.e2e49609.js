(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"6eca":function(e,t,o){"use strict";var a=o("b768"),n=o.n(a);n.a},"9ed6":function(e,t,o){"use strict";o.r(t);var a,n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"login-wrap"},[o("div",{staticClass:"info-wrap"},[o("div",{staticClass:"phone-wrap"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"text",placeholder:"请输入手机号码",maxlength:"11"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})]),o("div",{staticClass:"code-wrap"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"number",placeholder:"请输入验证码",maxlength:"10"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),o("button",{staticClass:"getCode",attrs:{disabled:e.btnCode_disabled},on:{click:e.getCode}},[e._v(e._s(e.codeText))])]),o("div",{staticClass:"btn-login-wrap"},[o("button",{attrs:{disabled:e.loginDisabled},on:{click:e.login}},[e._v("绑定账户")])])]),o("van-popup",{attrs:{"close-on-click-overlay":!0},model:{value:e.isLoginError,callback:function(t){e.isLoginError=t},expression:"isLoginError"}},[o("p",{staticClass:"showTip"},[e._v(e._s(e.loginErrorMsg))])])],1)},i=[],s=(o("6762"),o("a322")),r=(o("8a58"),o("e41f")),c=(o("7f7f"),o("9a83"),o("f564")),d=(o("cadf"),o("551c"),o("097d"),o("db04")),l=o("35df"),u={data:function(){return{decrypt_data:{},phone:"",code:"",codeText:"获取验证码",countdown:60,state:"",client_type:"",btnCode_disabled:!1,time:null,loginDisabled:!1,isLoginError:!1,loginErrorMsg:""}},components:(a={},Object(s["a"])(a,c["a"].name,c["a"]),Object(s["a"])(a,r["a"].name,r["a"]),a),created:function(){"wechat"===Object(l["c"])()?this.client_type="wechat":"alipay"===Object(l["c"])()&&(this.client_type="alipay"),"wechat"!==Object(l["c"])()&&"alipay"!==Object(l["c"])()||Object(l["k"])({type:0}),this.decrypt_data=Object(l["h"])("decrypt_data","obj")},methods:{login:function(){var e=this;this.phone||this.code?/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phone)?(this.loginDisabled=!0,Object(l["k"])({type:1,phone:this.phone}),Object(d["b"])("/accountCenter/v2/user/bind?"+Object(l["e"])({},"post"),{mobile:this.phone,code:this.code,from:this.client_type,uuid:this.decrypt_data.openid,nickname:this.decrypt_data.nickname,gender:this.decrypt_data.sex,avatar:this.decrypt_data.headimgurl}).then(function(t){if(e.loginDisabled=!1,0===t.error){var o=e;Object(l["m"])("token",t.data),Object(c["a"])({message:"账户绑定成功",background:"#60ce53"}),setTimeout(function(){"esim"===localStorage.getItem("currentType")?o.$router.push({path:"/weixin/card/esim_usage"}):"userCenter"===localStorage.getItem("currentType")?o.$router.push({path:"/weixin/userCenter/index"}):o.$router.push({path:"/weixin/card/lookup"})},2e3)}else if(11002===t.error)e.$emit("getToken");else if(30002===t.error)if(Object(c["a"])({message:"帐户绑定成功",background:"#60ce53"}),"esim"===localStorage.getItem("currentType"))location.href="/weixin/card/esim_usage";else if("userCenter"===localStorage.getItem("currentType"))location.href="/weixin/userCenter/index";else{var a=Object(l["h"])("authorized_redirect_uri");Object(l["h"])("check_iccid")?location.href=a:location.href="/weixin/card/lookup"}else 20014===t.error?(e.code="",Object(c["a"])({message:"用户绑定超时，请重新绑定"})):(e.isLoginError=!0,t.msg?e.loginErrorMsg=t.msg:e.loginErrorMsg="绑定用户失败，请反馈我司客服。")})):Object(c["a"])({message:"您的手机号码有误"}):Object(c["a"])({message:"请填写您的信息"})},getCode:function(){var e=this;if(this.phone)if(/^(13[0-9]|14[5679]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phone)){var t=this.phone.substr(0,3),o=["145","146","166","177","199"];o.includes(t)?Object(c["a"])({message:"不支持以145,146,166,177,199开头的手机号码"}):(Object(c["a"])({message:"温馨提示：请使用本人手机号绑定账号。"}),this.countDownFun(),Object(d["b"])("/accountCenter/v2/verify/send?"+Object(l["e"])({},"post"),{mobile:this.phone}).then(function(t){0===t.error?Object(c["a"])({message:"验证码发送成功",background:"#60ce53"}):11002===t.error?e.$emit("getToken"):Object(c["a"])({message:t.msg})}))}else Object(c["a"])({message:"请填写正确的手机号码"});else Object(c["a"])({message:"请输入您的手机号码"})},countDownFun:function(){var e=this,t=this;this.btnCode_disabled=!0,clearInterval(this.timer),this.timer=setInterval(function(){t.countdown<=0?(t.codeText="获取验证码",t.countdown=60,t.btnCode_disabled=!1,clearInterval(t.timer)):(t.codeText=e.countdown+"s",t.countdown--)},1e3)}}},p=u,h=(o("6eca"),o("2877")),g=Object(h["a"])(p,n,i,!1,null,null,null);g.options.__file="index.vue";t["default"]=g.exports},b768:function(e,t,o){}}]);
//# sourceMappingURL=login.e2e49609.js.map