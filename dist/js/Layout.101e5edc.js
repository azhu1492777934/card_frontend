(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Layout"],{"08cd":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"inner-wrap"},[a("user-header",{directives:[{name:"show",rawName:"v-show",value:e.isShowUser,expression:"isShowUser"}],attrs:{userInfoData:e.authorizeUserInfo}}),a("router-view",{on:{getUserData:e.getUserInfo}}),a("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.load_user_msg,callback:function(t){e.load_user_msg=t},expression:"load_user_msg"}},[a("p",{staticClass:"showTip"},[e._v(e._s(e.load_user_info))])]),a("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.authorized_failed,callback:function(t){e.authorized_failed=t},expression:"authorized_failed"}},[a("p",{staticClass:"showTip"},[e._v("由于授权失败，您的账户存在安全问题，将暂时无法进行任何操作!请联系我司客服，我们将为您尽快解决问题。")])])],1)},o=[],i=(a("28a5"),a("6b54"),a("c93e")),s=a("a322"),r=(a("8a58"),a("e41f")),c=(a("9a83"),a("f564")),l=(a("7f7f"),a("e17f"),a("2241")),u=(a("cadf"),a("551c"),a("097d"),a("2f62")),d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user-wrap"},[a("div",{staticClass:"user-inner-wrap"},[a("div",{staticClass:"user-name-wrap"},[a("img",{attrs:{src:e.getUserInfo.avatar}}),a("span",{staticClass:"user-name"},[e._v(e._s(e.getUserInfo.nickname))])]),a("div",[a("span",[e._v("余额:")]),a("span",{staticClass:"icon-diamond-wrap"},[a("i",{staticClass:"icon-user-size  icon-diamond"}),e._v("\n                      "+e._s(e.getUserInfo.account.rmb)+"\n                  ")]),a("span",{staticClass:"icon-elb-wrap"},[a("i",{staticClass:"icon-user-size icon-elb"}),e._v("\n                      "+e._s(e.getUserInfo.account.elb)+"\n                  ")]),a("span",{staticClass:"icon-question",on:{click:e.showDoc}},[e._v("!")])])])])},f=[],h={name:"uesrHead",props:{userInfoData:{type:Object}},computed:Object(i["a"])({},Object(u["b"])({getUserInfo:function(e){return e.userInfo.userInfoInner}})),components:Object(s["a"])({},l["a"].name,l["a"]),methods:{showDoc:function(){l["a"].alert({message:"钻石：翼联会员体系下通用虚拟货币,可以用于:购买套餐,充值话费,游戏娱乐,购买优惠商品;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等"})}}},p=h,b=(a("0b6e"),a("2877")),m=Object(b["a"])(p,d,f,!1,null,null,null);m.options.__file="uesrHead.vue";var v,_=m.exports,g=a("db04"),O=a("35df"),j={name:"App",data:function(){return{client_type:Object(O["a"])(),state:"",appContext:!1,load_user_msg:!1,load_user_info:"加载用户信息,请等候",authorized_failed:!1}},components:(v={userHeader:_},Object(s["a"])(v,l["a"].name,l["a"]),Object(s["a"])(v,c["a"].name,c["a"]),Object(s["a"])(v,r["a"].name,r["a"]),v),computed:Object(i["a"])({},Object(u["b"])({isShowUser:function(e){return e.userInfo.showUser},authorizeUserInfo:function(e){return e.userInfo.userInfoInner}})),created:function(){if(Object(O["f"])("iccid")){var e=Object(O["f"])("iccid");1==Object(O["b"])(e).state&&(Object(O["i"])("watch_card",e),Object(O["i"])("watchAutoSearch",1))}else Object(O["h"])("watch_card"),Object(O["h"])("watchAutoSearch");"app"==this.client_type?document.addEventListener("plusready",this.plusReady,!1):this.authorized()},methods:{plusReady:function(){localStorage.setItem("token",plus.storage.getItem("appToken")),this.authorized()},authorized:function(){var e=this;if("wechat"==this.client_type||"alipay"==this.client_type||"app"==this.client_type)if("app"!=this.client_type&&(Object(O["e"])("userInfo","obj")&&this.$store.commit("userInfo/changeUserStatus",!0),("wechat"==this.client_type&&Object(O["e"])("wechat_version")!=this.global_variables.version||"alipay"==this.client_type&&Object(O["e"])("alipay_version")!=this.global_variables.version)&&(Object(O["h"])("token"),Object(O["h"])("auth_data"),Object(O["h"])("state"))),Object(O["e"])("token"))this.getUserInfo();else if(Object(O["f"])("data")&&Object(O["i"])("auth_data",Object(O["f"])("data")),Object(O["e"])("auth_data"))Object(g["b"])("/accountCenter/v2/secret/decrypt?"+Object(O["c"])({},"post"),{data:Object(O["e"])("auth_data")}).then(function(t){if(0==t.error){if("alipay"==e.client_type){var a={uuid:t.data.data.user_id,openid:t.data.data.user_id,headimgurl:t.data.data.avatar,gender:"m"==t.data.data.gender?1:2,nickname:t.data.data.nick_name};Object(O["i"])("decrypt_data",a,"obj")}else if("wechat"==e.client_type){var n=t.data.data;n.unionid&&(n.openid=n.unionid),Object(O["i"])("decrypt_data",n,"obj")}Object(g["b"])("/accountCenter/v2/auth/login?"+Object(O["c"])({},"post"),{uuid:Object(O["e"])("decrypt_data","obj").openid,code:t.data.code}).then(function(t){if(0==t.error)Object(O["i"])("token",t.data),e.getUserInfo();else if("11002"==t.error)e.$emit("getToken");else if("30005"==t.error||"11003"==t.error){var a=e;Object(c["a"])({message:"为了您的用户安全,请绑定手机号码"}),setTimeout(function(){a.$router.push({path:"/login"})},2e3)}else e.this.showAuthorityError("L")})}else"11002"==t.error?e.$emit("getToken"):e.this.showAuthorityError("B")});else{var t=this;l["a"].alert({title:"授权",message:"为了您的账号安全，我们需要您对本站进行授权操作并绑定账号。"}).then(function(){t.authorizedRediect()})}else this.$store.commit("userInfo/changeUserStatus",!1)},GetUrlRelativePath:function(){var e=document.location.toString(),t=e.split("//"),a=t[1].indexOf("/"),n=t[1].substring(a);return-1!=n.indexOf("?")&&(n=n.split("?")[0]),n},getUserInfo:function(){var e=this;this.load_user_msg=!0,Object(g["a"])("/accountCenter/v2/user/info?"+Object(O["c"])({},"get")).then(function(t){if(0==t.error)if(t.data&&"{}"!=JSON.stringify(t.data)){var a={account:t.data.account,avatar:t.data.avatar,nickname:t.data.nickname};Object(O["i"])("userInfo",a,"obj"),"wechat"!=e.client_type&&"alipay"!=e.client_type||(e.$store.commit("userInfo/changeUserStatus",!0),e.$store.commit("userInfo/changeUserInfo",a)),e.load_user_msg=!1}else{var n=e;l["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题。"}).then(function(){n.load_user_msg=!0,n.load_user_info="账号异常"})}else"11002"==t.error?e.$emit("getToken"):e.showAuthorityError("A")})},showDoc:function(){l["a"].alert({message:"钻石：翼联会员体系下通用虚拟货币,可以用于:购买套餐,充值话费,游戏娱乐,购买优惠商品;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等"})},authorizedRediect:function(){var e=this;this.state=Math.random().toString(36).substr(2),Object(O["i"])("state",this.state);var t=this.GetUrlRelativePath();if(Object(O["i"])("authorized_redirect_uri",t),Object(O["f"])("iccid")){var a=Object(O["f"])("iccid");1==Object(O["b"])(a).state&&(Object(O["i"])("watch_card",a),Object(O["i"])("watchAutoSearch",1))}else Object(O["h"])("watch_card"),Object(O["h"])("watchAutoSearch");Object(g["a"])("/accountCenter/v2/oauth/authorize?"+Object(O["c"])({client_type:this.client_type,redirect_uri:this.global_variables.authorized_redirect_url+t,scope:"userinfo",state:this.state},"get")).then(function(t){0==t.error?("wechat"==e.client_type?Object(O["i"])("wechat_version",e.global_variables.version):"alipay"==e.client_type&&Object(O["i"])("alipay_version",e.global_variables.version),location.href=t.data):"11002"==t.error?e.$emit("getToken"):e.this.showAuthorityError("C")})},showAuthorityError:function(e){var t=this,a=e||"";l["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题"+a+"。"}).then(function(){t.load_user_msg=!0,t.load_user_info="账号异常"+a})}}},w=j,y=Object(b["a"])(w,n,o,!1,null,null,null);y.options.__file="layout.vue";t["default"]=y.exports},"0b6e":function(e,t,a){"use strict";var n=a("e27a"),o=a.n(n);o.a},2241:function(e,t,a){"use strict";var n,o=a("1988"),i=a("2b0e"),s=a("fe7e"),r=Object(s["a"])({render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(e.tag,{tag:"component",class:e.b([e.type,e.size,{block:e.block,plain:e.plain,round:e.round,square:e.square,loading:e.loading,disabled:e.disabled,unclickable:e.disabled||e.loading,"bottom-action":e.bottomAction}]),attrs:{type:e.nativeType,disabled:e.disabled},on:{click:e.onClick}},[e.loading?a("loading",{attrs:{size:"20px",color:"default"===e.type?void 0:""}}):a("span",{class:e.b("text")},[e._t("default",[e._v(e._s(e.text))])],2)],1)},name:"button",props:{text:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,disabled:Boolean,nativeType:String,bottomAction:Boolean,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"}},methods:{onClick:function(e){this.loading||this.disabled||this.$emit("click",e)}}}),c=a("6605"),l=Object(s["a"])({render:function(){var e,t=this,a=t.$createElement,n=t._self._c||a;return n("transition",{attrs:{name:"van-dialog-bounce"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:[t.b(),t.className]},[t.title?n("div",{class:t.b("header",{isolated:!t.message&&!t.$slots.default}),domProps:{textContent:t._s(t.title)}}):t._e(),t.message||t.$slots.default?n("div",{class:t.b("content")},[t._t("default",[t.message?n("div",{class:t.b("message",(e={"has-title":t.title},e[t.messageAlign]=t.messageAlign,e)),domProps:{innerHTML:t._s(t.message)}}):t._e()])],2):t._e(),n("div",{staticClass:"van-hairline--top",class:t.b("footer",{buttons:t.showCancelButton&&t.showConfirmButton})},[n("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showCancelButton,expression:"showCancelButton"}],class:t.b("cancel"),attrs:{loading:t.loading.cancel,size:"large"},on:{click:function(e){t.handleAction("cancel")}}},[t._v("\n        "+t._s(t.cancelButtonText||t.$t("cancel"))+"\n      ")]),n("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showConfirmButton,expression:"showConfirmButton"}],class:[t.b("confirm"),{"van-hairline--left":t.showCancelButton&&t.showConfirmButton}],attrs:{size:"large",loading:t.loading.confirm},on:{click:function(e){t.handleAction("confirm")}}},[t._v("\n        "+t._s(t.confirmButtonText||t.$t("confirm"))+"\n      ")])],1)])])},name:"dialog",components:{VanButton:r},mixins:[c["a"]],props:{title:String,message:String,callback:Function,className:[String,Object,Array],beforeClose:Function,messageAlign:String,confirmButtonText:String,cancelButtonText:String,showCancelButton:Boolean,showConfirmButton:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{handleAction:function(e){var t=this;this.beforeClose?(this.loading[e]=!0,this.beforeClose(e,function(a){!1!==a&&t.onClose(e),t.loading[e]=!1})):this.onClose(e)},onClose:function(e){this.$emit("input",!1),this.$emit(e),this.callback&&this.callback(e)}}}),u=a("a142"),d=function(){n=new(i["a"].extend(l))({el:document.createElement("div")}),n.$on("input",function(e){n.value=e}),document.body.appendChild(n.$el)},f=function e(t){return u["e"]?Promise.resolve():new Promise(function(a,i){n||d(),Object(o["a"])(n,e.currentOptions,t,{resolve:a,reject:i})})};f.defaultOptions={value:!0,title:"",message:"",overlay:!0,className:"",lockScroll:!0,beforeClose:null,messageAlign:"",confirmButtonText:"",cancelButtonText:"",showConfirmButton:!0,showCancelButton:!1,closeOnClickOverlay:!1,callback:function(e){n["confirm"===e?"resolve":"reject"](e)}},f.alert=f,f.confirm=function(e){return f(Object(o["a"])({showCancelButton:!0},e))},f.close=function(){n&&(n.value=!1)},f.setDefaultOptions=function(e){Object(o["a"])(f.currentOptions,e)},f.resetDefaultOptions=function(){f.currentOptions=Object(o["a"])({},f.defaultOptions)},f.install=function(){i["a"].use(l)},i["a"].prototype.$dialog=f,f.resetDefaultOptions();t["a"]=f},"2fcb":function(e,t,a){},"8a58":function(e,t,a){"use strict";a("68ef"),a("4d75")},c93e:function(e,t,a){"use strict";a.d(t,"a",function(){return o});var n=a("a322");function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},o=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),o.forEach(function(t){Object(n["a"])(e,t,a[t])})}return e}},e17f:function(e,t,a){"use strict";a("68ef"),a("4d75"),a("2fcb")},e27a:function(e,t,a){},e41f:function(e,t,a){"use strict";var n=a("fe7e"),o=a("6605");t["a"]=Object(n["a"])({render:function(){var e,t=this,a=t.$createElement,n=t._self._c||a;return n("transition",{attrs:{name:t.currentTransition}},[t.shouldRender?n("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:t.b((e={},e[t.position]=t.position,e))},[t._t("default")],2):t._e()])},name:"popup",mixins:[o["a"]],props:{position:String,transition:String,overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},computed:{currentTransition:function(){return this.transition||(this.position?"popup-slide-"+this.position:"van-fade")}}})}}]);
//# sourceMappingURL=Layout.101e5edc.js.map