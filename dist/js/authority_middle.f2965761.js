(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["authority_middle"],{"0493":function(e,t,r){"use strict";r.r(t);var a,i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"authority-middle-wrap"},[r("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.load_user_msg,callback:function(t){e.load_user_msg=t},expression:"load_user_msg"}},[r("p",{staticClass:"showTip"},[e._v(e._s(e.load_user_info))])])],1)},n=[],o=r("a322"),c=(r("e17f"),r("2241")),u=(r("7f7f"),r("8a58"),r("e41f")),s=r("db04"),d=r("35df"),l={name:"index",components:(a={},Object(o["a"])(a,u["a"].name,u["a"]),Object(o["a"])(a,c["a"].name,c["a"]),a),data:function(){return{client_type:Object(d["c"])(),load_user_msg:!1,load_user_info:"正在授权,请等候",redirect_uri:Object(d["i"])("authorized_redirect_uri")}},created:function(){var e=this;if("wechat"===this.client_type||"alipay"===this.client_type)if(Object(d["i"])("state")===Object(d["j"])("state")&&Object(d["i"])("state")&&Object(d["j"])("state"))this.decryptData();else{var t=this;Object(d["m"])("token"),Object(d["m"])("state"),c["a"].alert({title:"绑定失败",message:"您的账号信息绑定失败,请重新授权绑定。"}).then(function(){e.redirect_uri&&Object(d["i"])("check_iccid")?t.$router.push(e.redirect_uri):"userCenter"===localStorage.getItem("currentType")?e.$router.push("/weixin/userCenter/index"):"esim"===localStorage.getItem("currentType")?e.$router.push("/weixin/card/esim_usage"):t.$router.push("/weixin/card/lookup")})}else this.$router.push("/weixin/card/lookup")},methods:{decryptData:function(){var e=this;Object(s["b"])("/accountCenter/v2/secret/decrypt?"+Object(d["f"])({},"post"),{data:Object(d["j"])("data")}).then(function(t){if(0===t.error){if("alipay"===e.client_type){var r={uuid:t.data.data.user_id,openid:t.data.data.user_id,headimgurl:t.data.data.avatar,gender:"m"===t.data.data.gender?1:2,nickname:t.data.data.nick_name};Object(d["n"])("decrypt_data",r,"obj")}else if("wechat"===e.client_type){var a=t.data.data;a.unionid&&(a.openid=a.unionid),Object(d["n"])("decrypt_data",a,"obj")}e.login(t)}else 11002===t.error?e.$emit("getToken"):e.showAuthorityError("B"+t.error)})},login:function(e){var t=this;Object(s["b"])("/accountCenter/v2/auth/login?"+Object(d["f"])({},"post"),{uuid:Object(d["i"])("decrypt_data","obj").openid,code:e.data.code}).then(function(e){if(0===e.error)Object(d["n"])("token",e.data,"str",!0),t.redirect_uri&&Object(d["i"])("check_iccid")?t.$router.push(t.redirect_uri):"userCenter"===localStorage.getItem("currentType")?t.$router.push("/weixin/userCenter/index"):"esim"===localStorage.getItem("currentType")?t.$router.push("/weixin/card/esim_usage"):"/weixin/userCenter/index"==t.redirect_uri?t.$router.push(t.redirect_uri):t.$router.push("/weixin/card/lookup");else if(11002===e.error)t.$emit("getToken");else if(30005===e.error||11003===e.error){var r=t;r.$router.push({path:"/login"})}else t.showAuthorityError("L"+e.error)})},showAuthorityError:function(e){var t=this,r=e||"";c["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题"+r+"。"}).then(function(){t.load_user_msg=!0,t.load_user_info="账号异常"+r})}}},p=l,_=(r("e0bf"),r("2877")),h=Object(_["a"])(p,i,n,!1,null,null,null);h.options.__file="index.vue";t["default"]=h.exports},"69f6":function(e,t,r){},e0bf:function(e,t,r){"use strict";var a=r("69f6"),i=r.n(a);i.a}}]);
//# sourceMappingURL=authority_middle.f2965761.js.map