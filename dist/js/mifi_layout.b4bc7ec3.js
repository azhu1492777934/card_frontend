(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_layout"],{"0b6e":function(e,t,r){"use strict";var a=r("e27a"),s=r.n(a);s.a},"5f6f":function(e,t,r){"use strict";r.r(t);var a,s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"inner-wrap"},[r("router-view",{on:{getUserData:e.getUserInfo}}),r("van-popup",{staticClass:"mifi-info-loading",attrs:{"close-on-click-overlay":!1},model:{value:e.load_user_msg,callback:function(t){e.load_user_msg=t},expression:"load_user_msg"}},[r("van-loading",{attrs:{type:"spinner",size:"30",color:"#fff"}})],1),r("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.showError,callback:function(t){e.showError=t},expression:"showError"}},[r("p",{staticClass:"showTip"},[e._v(e._s(e.errorMsg))])]),r("div",{directives:[{name:"show",rawName:"v-show",value:e.showLoading,expression:"showLoading"}],staticClass:"loading-wrap"},[r("div",{staticClass:"loading-inner"},[r("van-loading",{attrs:{size:"50px"}})],1)])],1)},n=[],o=(r("28a5"),r("6b54"),r("c93e")),i=r("a322"),c=(r("ac1e"),r("543e")),u=(r("8a58"),r("e41f")),l=(r("9a83"),r("f564")),f=(r("7f7f"),r("e17f"),r("2241")),h=r("2f62"),p=r("c5dc"),m=r("db04"),d=r("35df"),v={name:"App",data:function(){return{client_type:Object(d["d"])(),state:"",appContext:!1,load_user_msg:!1,load_user_info:"加载用户信息,请等候"}},components:(a={userHeader:p["a"]},Object(i["a"])(a,f["a"].name,f["a"]),Object(i["a"])(a,l["a"].name,l["a"]),Object(i["a"])(a,u["a"].name,u["a"]),Object(i["a"])(a,c["a"].name,c["a"]),a),computed:Object(o["a"])({},Object(h["b"])({isShowUser:function(e){return e.userInfo.showUser},authorizeUserInfo:function(e){return e.userInfo.userInfoInner},showLoading:function(e){return e.mifiCommon.intercept.loading},showError:function(e){return e.mifiCommon.intercept.show},errorMsg:function(e){return e.mifiCommon.intercept.errorMsg}}),{showError:{get:function(){return this.$store.state.mifiCommon.intercept.show},set:function(e){return this.$store.state.mifiCommon.intercept.show=e.show}}}),created:function(){Object(d["q"])("timeSpan",0),this.authorized()},methods:{authorized:function(){if("wechat"===this.client_type||"alipay"===this.client_type||"app"===this.client_type){if("app"!==this.client_type){if(Object(d["j"])("userInfo","obj")){this.$store.commit("userInfo/changeUserStatus",!0);var e=document.querySelector(".user-wrap");e&&Object(d["q"])("userHeight",e.offsetHeight)}("wechat"===this.client_type&&Object(d["j"])("wechat_version")!==this.global_variables.version||"alipay"===this.client_type&&Object(d["j"])("alipay_version")!==this.global_variables.version)&&(Object(d["p"])("token"),Object(d["p"])("state"))}if(Object(d["j"])("token"))this.getUserInfo();else{var t=this;t.authorizedRediect()}}else this.$store.commit("userInfo/changeUserStatus",!1)},GetUrlRelativePath:function(){var e=document.location.toString(),t=e.split("//"),r=t[1].indexOf("/"),a=t[1].substring(r);return-1!=a.indexOf("?")&&(a=a.split("?")[0]),a},getUserInfo:function(){var e=this;this.load_user_msg=!0,Object(m["a"])("/accountCenter/v2/user/info?"+Object(d["g"])({},"get")).then(function(t){if(e.load_user_msg=!1,0===t.error)if(t.data&&"{}"!==JSON.stringify(t.data)){var r={account:t.data.account,avatar:t.data.avatar,nickname:t.data.nickname};if(Object(d["q"])("userInfo",r,"obj"),"wechat"===e.client_type||"alipay"===e.client_type){e.$store.commit("userInfo/changeUserStatus",!0),e.$store.commit("userInfo/changeUserInfo",r);var a=document.querySelector(".user-wrap");a&&Object(d["q"])("userHeight",a.offsetHeight)}}else e.showAuthorityError("(error)");else if(11002===t.error)Object(d["q"])("refreshUrl",Object(d["a"])()),e.$emit("getToken",{from:"mifi"});else if(10007===t.error){var s=Date.parse(new Date)/1e3,n=t.extra-s;Object(d["q"])("timeSpan",n),e.getUserInfo()}else t.status||t.error?e.showAuthorityError("A"+t.error):e.showAuthorityError("A-R"+JSON.stringify(t))})},showDoc:function(){f["a"].alert({message:"可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额，也可将钻石转成余额;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等"})},authorizedRediect:function(){var e=this;this.state=Math.random().toString(36).substr(2)+(new Date).getTime(),Object(d["q"])("state",this.state),Object(m["a"])("/accountCenter/v2/oauth/authorize?"+Object(d["g"])({client_type:this.client_type,redirect_uri:this.global_variables.authorized_redirect_url+"/mifi/transaction",scope:"userinfo",state:this.state},"get")).then(function(t){0===t.error?("wechat"===e.client_type?Object(d["q"])("wechat_version",e.global_variables.version):"alipay"===e.client_type&&Object(d["q"])("alipay_version",e.global_variables.version),location.href=t.data):11002===t.error?(Object(d["q"])("refreshUrl",Object(d["a"])()),e.$emit("getToken",{from:"mifi"})):e.this.showAuthorityError("C"+t.error)})},showAuthorityError:function(e){var t=this,r=e||"";f["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题"+r+"。",showConfirmButton:!1}).then(function(){t.load_user_msg=!0,t.load_user_info="账号异常"+r})}}},_=v,b=(r("c519"),r("2877")),g=Object(b["a"])(_,s,n,!1,null,null,null);g.options.__file="mifi_layout.vue";t["default"]=g.exports},7518:function(e,t,r){},c519:function(e,t,r){"use strict";var a=r("7518"),s=r.n(a);s.a},c5dc:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"user-wrap"},[r("div",{staticClass:"user-inner-wrap"},[r("div",{staticClass:"user-name-wrap"},[r("img",{attrs:{src:e.getUserInfo.avatar}}),r("span",{staticClass:"user-name"},[e._v(e._s(e.getUserInfo.nickname))])]),r("div",[r("span",[e._v("余额:")]),r("span",{staticClass:"icon-diamond-wrap",on:{click:function(t){e.showDoc()}}},[r("i",{staticClass:"icon-user-size  icon-diamond"}),e._v("\n                      "+e._s(e.getUserInfo.account.balance)+"\n                  ")]),r("span",{staticClass:"tip-wrap",on:{click:e.showDoc}},[e._v("!")])])])])},s=[],n=r("a322"),o=(r("7f7f"),r("e17f"),r("2241")),i=r("c93e"),c=r("2f62"),u={name:"uesrHead",props:{userInfoData:{type:Object}},computed:Object(i["a"])({},Object(c["b"])({getUserInfo:function(e){return e.userInfo.userInfoInner}})),components:Object(n["a"])({},o["a"].name,o["a"]),methods:{showDoc:function(e){var t;t="余额：可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额，也可将钻石转成余额,可以到公众号的“个人中心”菜单里查看余额的订单和消费记录",o["a"].alert({message:t})}}},l=u,f=(r("0b6e"),r("2877")),h=Object(f["a"])(l,a,s,!1,null,null,null);h.options.__file="uesrHead.vue";t["a"]=h.exports},e27a:function(e,t,r){}}]);
//# sourceMappingURL=mifi_layout.b4bc7ec3.js.map