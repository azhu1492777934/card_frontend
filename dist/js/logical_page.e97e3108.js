(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["logical_page"],{"79e9":function(e,t,a){},a167:function(e,t,a){"use strict";a.r(t);var r,i=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"transaction-wrap"},[a("div",{staticClass:"animation-wrap"},[a("div",{staticClass:"loader-wrap"})])])}],o=a("a322"),c=(a("e17f"),a("2241")),s=(a("7f7f"),a("8a58"),a("e41f")),d=a("db04"),u=a("35df"),l={name:"index",components:(r={},Object(o["a"])(r,s["a"].name,s["a"]),Object(o["a"])(r,c["a"].name,c["a"]),r),data:function(){return{client_type:Object(u["c"])(),load_user_msg:!1,load_user_info:"正在授权,请等候",redirect_uri:Object(u["h"])("authorized_redirect_uri")}},created:function(){if(Object(u["h"])("token"))this.$router.push({path:"/mifi/card/lookup"});else if("wechat"===this.client_type||"alipay"===this.client_type)if(Object(u["h"])("state")&&Object(u["i"])("state")&&Object(u["h"])("state")===Object(u["i"])("state"))this.decryptData();else{var e=this;Object(u["l"])("token"),Object(u["l"])("state"),c["a"].alert({title:"绑定失败",message:"您的账号信息绑定失败,请重新授权绑定。"}).then(function(){e.$router.push("/mifi/index")})}else this.$router.push("/mifi/card/lookup")},methods:{decryptData:function(){var e=this;Object(d["b"])("/accountCenter/v2/secret/decrypt?"+Object(u["e"])({},"post"),{data:Object(u["i"])("data")}).then(function(t){if(0===t.error){if("alipay"===e.client_type){var a={uuid:t.data.data.user_id,openid:t.data.data.user_id,headimgurl:t.data.data.avatar,gender:"m"==t.data.data.gender?1:2,nickname:t.data.data.nick_name};Object(u["m"])("decrypt_data",a,"obj")}else if("wechat"===e.client_type){var r=t.data.data;r.unionid&&(r.openid=r.unionid),Object(u["m"])("decrypt_data",r,"obj")}e.login(t)}else 11002===t.error?(Object(u["m"])("refreshUrl",Object(u["a"])()),e.$emit("getToken",{from:"mifi"})):e.showAuthorityError("B"+t.error)})},login:function(e){var t=this;Object(d["b"])("/accountCenter/v2/auth/login?"+Object(u["e"])({},"post"),{uuid:Object(u["h"])("decrypt_data","obj").openid,code:e.data.code}).then(function(e){if(0===e.error)Object(u["m"])("token",e.data,"str",!0),Object(u["h"])("check_iccid")?t.$router.push("/mifi/index"):t.$router.push("/mifi/card/lookup");else if(11002===e.error)Object(u["m"])("refreshUrl",Object(u["a"])()),t.$emit("getToken",{from:"mifi"});else if(30005===e.error||11003===e.error){var a=t;c["a"].alert({title:"绑定信息",message:"为了您的账号安全，需要绑定您的手机号码"}).then(function(){a.$router.push({path:"/binding"})})}else t.showAuthorityError("L"+e.error)})},showAuthorityError:function(e){var t=this,a=e||"";c["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题"+a+"。"}).then(function(){t.load_user_msg=!0,t.load_user_info="账号异常"+a})}}},f=l,h=(a("ff01"),a("2877")),p=Object(h["a"])(f,i,n,!1,null,null,null);p.options.__file="index.vue";t["default"]=p.exports},ff01:function(e,t,a){"use strict";var r=a("79e9"),i=a.n(r);i.a}}]);
//# sourceMappingURL=logical_page.e97e3108.js.map