(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Layout"],{"08cd":function(e,t,n){"use strict";n.r(t);var a,o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"inner-wrap"},[n("user-header",{directives:[{name:"show",rawName:"v-show",value:e.isShowUser,expression:"isShowUser"}],attrs:{userInfoData:e.authorizeUserInfo}}),n("router-view",{on:{getUserData:e.getUserInfo}}),n("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.load_user_msg,callback:function(t){e.load_user_msg=t},expression:"load_user_msg"}},[n("p",{staticClass:"showTip"},[e._v(e._s(e.load_user_info))])])],1)},s=[],i=(n("28a5"),n("6b54"),n("c93e")),r=n("a322"),c=(n("8a58"),n("e41f")),l=(n("9a83"),n("f564")),u=(n("7f7f"),n("e17f"),n("2241")),f=(n("cadf"),n("551c"),n("097d"),n("2f62")),d=n("c5dc"),h=n("db04"),p=n("35df"),m={name:"App",data:function(){return{client_type:Object(p["c"])(),state:"",appContext:!1,load_user_msg:!1,load_user_info:"加载用户信息,请等候"}},components:(a={userHeader:d["a"]},Object(r["a"])(a,u["a"].name,u["a"]),Object(r["a"])(a,l["a"].name,l["a"]),Object(r["a"])(a,c["a"].name,c["a"]),a),computed:Object(i["a"])({},Object(f["b"])({isShowUser:function(e){return e.userInfo.showUser},authorizeUserInfo:function(e){return e.userInfo.userInfoInner}})),created:function(){if(Object(p["l"])("timeSpan",0),Object(p["i"])("iccid")){var e=Object(p["i"])("iccid");1==Object(p["d"])(e).state&&(Object(p["l"])("watch_card",e),Object(p["l"])("watchAutoSearch",1))}else Object(p["k"])("watch_card"),Object(p["k"])("watchAutoSearch");if("app"==this.client_type){var t=navigator.userAgent.toLowerCase();alert(t),/(ylkids_android)/.test(t)?this.showHtmlcallJava2():/(ios1.1.0)/.test(t)&&(window.webkit.messageHandlers.getIosToken.postMessage(null),this.authorized())}else this.authorized()},methods:{showHtmlcallJava2:function(){var e=window.jsInterface.GetToken();localStorage.setItem("token",e),this.authorized()},plusReady:function(){localStorage.setItem("token",plus.storage.getItem("appToken")),this.authorized()},authorized:function(){if("wechat"==this.client_type||"alipay"==this.client_type||"app"==this.client_type){if("app"!=this.client_type){if(Object(p["h"])("userInfo","obj")){this.$store.commit("userInfo/changeUserStatus",!0);var e=document.querySelector(".user-wrap");e&&Object(p["l"])("userHeight",e.offsetHeight)}("wechat"==this.client_type&&Object(p["h"])("wechat_version")!=this.global_variables.version||"alipay"==this.client_type&&Object(p["h"])("alipay_version")!=this.global_variables.version)&&(Object(p["k"])("token"),Object(p["k"])("state"))}if(Object(p["h"])("token"))this.getUserInfo();else{var t=this;u["a"].alert({title:"授权",message:"为了您的账号安全，我们需要您对本站进行授权操作并绑定账号。"}).then(function(){t.authorizedRediect()})}}else this.$store.commit("userInfo/changeUserStatus",!1)},GetUrlRelativePath:function(){var e=document.location.toString(),t=e.split("//"),n=t[1].indexOf("/"),a=t[1].substring(n);return-1!=a.indexOf("?")&&(a=a.split("?")[0]),a},getUserInfo:function(){var e=this;this.load_user_msg=!0,Object(h["a"])("/accountCenter/v2/user/info?"+Object(p["e"])({},"get")).then(function(t){if(e.load_user_msg=!1,0==t.error)if(t.data&&"{}"!=JSON.stringify(t.data)){var n={account:t.data.account,avatar:t.data.avatar,nickname:t.data.nickname};if(Object(p["l"])("userInfo",n,"obj"),"wechat"==e.client_type||"alipay"==e.client_type){e.$store.commit("userInfo/changeUserStatus",!0),e.$store.commit("userInfo/changeUserInfo",n);var a=document.querySelector(".user-wrap");a&&Object(p["l"])("userHeight",a.offsetHeight)}}else{var o=e;u["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题。"}).then(function(){o.load_user_msg=!0,o.load_user_info="账号异常"})}else if("11002"==t.error)e.$emit("getToken");else if("10007"==t.error){var s=(new Date).getTime(),i=t.extra-s;Object(p["l"])("timeSpan",i),e.getUserInfo()}else e.showAuthorityError("A"+t.error)})},showDoc:function(){u["a"].alert({message:"钻石：翼联会员体系下通用虚拟货币,可以用于:购买套餐,充值话费,游戏娱乐,购买优惠商品;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等"})},authorizedRediect:function(){var e=this;this.state=Math.random().toString(36).substr(2)+(new Date).getTime(),Object(p["l"])("state",this.state);var t=this.GetUrlRelativePath();if(Object(p["l"])("authorized_redirect_uri",t),Object(p["i"])("iccid")){var n=Object(p["i"])("iccid");1==Object(p["d"])(n).state&&(Object(p["l"])("watch_card",n),Object(p["l"])("watchAutoSearch",1))}else Object(p["k"])("watch_card"),Object(p["k"])("watchAutoSearch");Object(h["a"])("/accountCenter/v2/oauth/authorize?"+Object(p["e"])({client_type:this.client_type,redirect_uri:this.global_variables.authorized_redirect_url+"/authority",scope:"userinfo",state:this.state},"get")).then(function(t){0==t.error?("wechat"==e.client_type?Object(p["l"])("wechat_version",e.global_variables.version):"alipay"==e.client_type&&Object(p["l"])("alipay_version",e.global_variables.version),location.href=t.data):"11002"==t.error?e.$emit("getToken"):e.this.showAuthorityError("C"+t.error)})},showAuthorityError:function(e){var t=this,n=e||"";u["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题"+n+"。"}).then(function(){t.load_user_msg=!0,t.load_user_info="账号异常"+n})}}},b=m,v=n("2877"),g=Object(v["a"])(b,o,s,!1,null,null,null);g.options.__file="layout.vue";t["default"]=g.exports},"0b6e":function(e,t,n){"use strict";var a=n("e27a"),o=n.n(a);o.a},2241:function(e,t,n){"use strict";var a,o=n("1988"),s=n("2b0e"),i=n("fe7e"),r=Object(i["a"])({render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.tag,{tag:"component",class:e.b([e.type,e.size,{block:e.block,plain:e.plain,round:e.round,square:e.square,loading:e.loading,disabled:e.disabled,unclickable:e.disabled||e.loading,"bottom-action":e.bottomAction}]),attrs:{type:e.nativeType,disabled:e.disabled},on:{click:e.onClick}},[e.loading?n("loading",{attrs:{size:"20px",color:"default"===e.type?void 0:""}}):n("span",{class:e.b("text")},[e._t("default",[e._v(e._s(e.text))])],2)],1)},name:"button",props:{text:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,disabled:Boolean,nativeType:String,bottomAction:Boolean,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"}},methods:{onClick:function(e){this.loading||this.disabled||this.$emit("click",e)}}}),c=n("6605"),l=Object(i["a"])({render:function(){var e,t=this,n=t.$createElement,a=t._self._c||n;return a("transition",{attrs:{name:"van-dialog-bounce"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:[t.b(),t.className]},[t.title?a("div",{class:t.b("header",{isolated:!t.message&&!t.$slots.default}),domProps:{textContent:t._s(t.title)}}):t._e(),t.message||t.$slots.default?a("div",{class:t.b("content")},[t._t("default",[t.message?a("div",{class:t.b("message",(e={"has-title":t.title},e[t.messageAlign]=t.messageAlign,e)),domProps:{innerHTML:t._s(t.message)}}):t._e()])],2):t._e(),a("div",{staticClass:"van-hairline--top",class:t.b("footer",{buttons:t.showCancelButton&&t.showConfirmButton})},[a("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showCancelButton,expression:"showCancelButton"}],class:t.b("cancel"),attrs:{loading:t.loading.cancel,size:"large"},on:{click:function(e){t.handleAction("cancel")}}},[t._v("\n        "+t._s(t.cancelButtonText||t.$t("cancel"))+"\n      ")]),a("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showConfirmButton,expression:"showConfirmButton"}],class:[t.b("confirm"),{"van-hairline--left":t.showCancelButton&&t.showConfirmButton}],attrs:{size:"large",loading:t.loading.confirm},on:{click:function(e){t.handleAction("confirm")}}},[t._v("\n        "+t._s(t.confirmButtonText||t.$t("confirm"))+"\n      ")])],1)])])},name:"dialog",components:{VanButton:r},mixins:[c["a"]],props:{title:String,message:String,callback:Function,className:[String,Object,Array],beforeClose:Function,messageAlign:String,confirmButtonText:String,cancelButtonText:String,showCancelButton:Boolean,showConfirmButton:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{handleAction:function(e){var t=this;this.beforeClose?(this.loading[e]=!0,this.beforeClose(e,function(n){!1!==n&&t.onClose(e),t.loading[e]=!1})):this.onClose(e)},onClose:function(e){this.$emit("input",!1),this.$emit(e),this.callback&&this.callback(e)}}}),u=n("a142"),f=function(){a=new(s["a"].extend(l))({el:document.createElement("div")}),a.$on("input",function(e){a.value=e}),document.body.appendChild(a.$el)},d=function e(t){return u["e"]?Promise.resolve():new Promise(function(n,s){a||f(),Object(o["a"])(a,e.currentOptions,t,{resolve:n,reject:s})})};d.defaultOptions={value:!0,title:"",message:"",overlay:!0,className:"",lockScroll:!0,beforeClose:null,messageAlign:"",confirmButtonText:"",cancelButtonText:"",showConfirmButton:!0,showCancelButton:!1,closeOnClickOverlay:!1,callback:function(e){a["confirm"===e?"resolve":"reject"](e)}},d.alert=d,d.confirm=function(e){return d(Object(o["a"])({showCancelButton:!0},e))},d.close=function(){a&&(a.value=!1)},d.setDefaultOptions=function(e){Object(o["a"])(d.currentOptions,e)},d.resetDefaultOptions=function(){d.currentOptions=Object(o["a"])({},d.defaultOptions)},d.install=function(){s["a"].use(l)},s["a"].prototype.$dialog=d,d.resetDefaultOptions();t["a"]=d},"2fcb":function(e,t,n){},"8a58":function(e,t,n){"use strict";n("68ef"),n("4d75")},c5dc:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"user-wrap"},[n("div",{staticClass:"user-inner-wrap"},[n("div",{staticClass:"user-name-wrap"},[n("img",{attrs:{src:e.getUserInfo.avatar}}),n("span",{staticClass:"user-name"},[e._v(e._s(e.getUserInfo.nickname))])]),n("div",[n("span",[e._v("余额:")]),n("span",{staticClass:"icon-diamond-wrap"},[n("i",{staticClass:"icon-user-size  icon-diamond"}),e._v("\n                      "+e._s(e.getUserInfo.account.rmb)+"\n                  ")]),n("span",{staticClass:"icon-elb-wrap"},[n("i",{staticClass:"icon-user-size icon-elb"}),e._v("\n                      "+e._s(e.getUserInfo.account.elb)+"\n                  ")]),n("span",{staticClass:"icon-question",on:{click:e.showDoc}},[e._v("!")])])])])},o=[],s=n("a322"),i=(n("7f7f"),n("e17f"),n("2241")),r=n("c93e"),c=n("2f62"),l={name:"uesrHead",props:{userInfoData:{type:Object}},computed:Object(r["a"])({},Object(c["b"])({getUserInfo:function(e){return e.userInfo.userInfoInner}})),components:Object(s["a"])({},i["a"].name,i["a"]),methods:{showDoc:function(){i["a"].alert({message:"钻石：翼联会员体系下通用虚拟货币,可以用于:购买套餐,充值话费,游戏娱乐,购买优惠商品;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等"})}}},u=l,f=(n("0b6e"),n("2877")),d=Object(f["a"])(u,a,o,!1,null,null,null);d.options.__file="uesrHead.vue";t["a"]=d.exports},c93e:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var a=n("a322");function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){Object(a["a"])(e,t,n[t])})}return e}},e17f:function(e,t,n){"use strict";n("68ef"),n("4d75"),n("2fcb")},e27a:function(e,t,n){},e41f:function(e,t,n){"use strict";var a=n("fe7e"),o=n("6605");t["a"]=Object(a["a"])({render:function(){var e,t=this,n=t.$createElement,a=t._self._c||n;return a("transition",{attrs:{name:t.currentTransition}},[t.shouldRender?a("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:t.b((e={},e[t.position]=t.position,e))},[t._t("default")],2):t._e()])},name:"popup",mixins:[o["a"]],props:{position:String,transition:String,overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},computed:{currentTransition:function(){return this.transition||(this.position?"popup-slide-"+this.position:"van-fade")}}})}}]);
//# sourceMappingURL=Layout.75dd321a.js.map