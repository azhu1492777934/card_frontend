(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["authority_middle"],{"0493":function(e,t,n){"use strict";n.r(t);var a,o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"authority-middle-wrap"},[n("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.load_user_msg,callback:function(t){e.load_user_msg=t},expression:"load_user_msg"}},[n("p",{staticClass:"showTip"},[e._v(e._s(e.load_user_info))])])],1)},i=[],s=n("a322"),r=(n("e17f"),n("2241")),c=(n("7f7f"),n("8a58"),n("e41f")),l=n("db04"),u=n("35df"),d={name:"index",components:(a={},Object(s["a"])(a,c["a"].name,c["a"]),Object(s["a"])(a,r["a"].name,r["a"]),a),data:function(){return{client_type:Object(u["a"])(),load_user_msg:!1,load_user_info:"正在授权,请等候",redirect_uri:Object(u["f"])("authorized_redirect_uri")}},created:function(){var e=this;if("wechat"==this.client_type||"alipay"==this.client_type)if(Object(u["f"])("state")==Object(u["g"])("state")&&Object(u["f"])("state")&&Object(u["g"])("state"))this.decryptData();else{var t=this;Object(u["i"])("token"),Object(u["i"])("state"),r["a"].alert({title:"绑定失败",message:"您的账号信息绑定失败,请重新授权绑定。"}).then(function(){e.redirect_uri&&Object(u["f"])("check_iccid")?t.$router.push(e.redirect_uri):t.$router.push("/weixin/card/lookup")})}else this.$router.push("/weixin/card/lookup")},methods:{decryptData:function(){var e=this;Object(l["b"])("/accountCenter/v2/secret/decrypt?"+Object(u["c"])({},"post"),{data:Object(u["g"])("data")}).then(function(t){if(0==t.error){if("alipay"==e.client_type){var n={uuid:t.data.data.user_id,openid:t.data.data.user_id,headimgurl:t.data.data.avatar,gender:"m"==t.data.data.gender?1:2,nickname:t.data.data.nick_name};Object(u["j"])("decrypt_data",n,"obj")}else if("wechat"==e.client_type){var a=t.data.data;a.unionid&&(a.openid=a.unionid),Object(u["j"])("decrypt_data",a,"obj")}e.login(t)}else"11002"==t.error?e.$emit("getToken"):e.showAuthorityError("B"+t.error)})},login:function(e){var t=this;Object(l["b"])("/accountCenter/v2/auth/login?"+Object(u["c"])({},"post"),{uuid:Object(u["f"])("decrypt_data","obj").openid,code:e.data.code}).then(function(e){if(0==e.error)Object(u["j"])("token",e.data),t.redirect_uri&&Object(u["f"])("check_iccid")?t.$router.push(t.redirect_uri):t.$router.push("/weixin/card/lookup");else if("11002"==e.error)t.$emit("getToken");else if("30005"==e.error||"11003"==e.error){var n=t;r["a"].alert({title:"绑定信息",message:"为了您的账号安全，需要绑定您的手机号码"}).then(function(){n.$router.push({path:"/login"})})}else t.showAuthorityError("L"+e.error)})},showAuthorityError:function(e){var t=this,n=e||"";r["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题"+n+"。"}).then(function(){t.load_user_msg=!0,t.load_user_info="账号异常"+n})}}},f=d,p=(n("e0bf"),n("2877")),h=Object(p["a"])(f,o,i,!1,null,null,null);h.options.__file="index.vue";t["default"]=h.exports},2241:function(e,t,n){"use strict";var a,o=n("1988"),i=n("2b0e"),s=n("fe7e"),r=Object(s["a"])({render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.tag,{tag:"component",class:e.b([e.type,e.size,{block:e.block,plain:e.plain,round:e.round,square:e.square,loading:e.loading,disabled:e.disabled,unclickable:e.disabled||e.loading,"bottom-action":e.bottomAction}]),attrs:{type:e.nativeType,disabled:e.disabled},on:{click:e.onClick}},[e.loading?n("loading",{attrs:{size:"20px",color:"default"===e.type?void 0:""}}):n("span",{class:e.b("text")},[e._t("default",[e._v(e._s(e.text))])],2)],1)},name:"button",props:{text:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,disabled:Boolean,nativeType:String,bottomAction:Boolean,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"}},methods:{onClick:function(e){this.loading||this.disabled||this.$emit("click",e)}}}),c=n("6605"),l=Object(s["a"])({render:function(){var e,t=this,n=t.$createElement,a=t._self._c||n;return a("transition",{attrs:{name:"van-dialog-bounce"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:[t.b(),t.className]},[t.title?a("div",{class:t.b("header",{isolated:!t.message&&!t.$slots.default}),domProps:{textContent:t._s(t.title)}}):t._e(),t.message||t.$slots.default?a("div",{class:t.b("content")},[t._t("default",[t.message?a("div",{class:t.b("message",(e={"has-title":t.title},e[t.messageAlign]=t.messageAlign,e)),domProps:{innerHTML:t._s(t.message)}}):t._e()])],2):t._e(),a("div",{staticClass:"van-hairline--top",class:t.b("footer",{buttons:t.showCancelButton&&t.showConfirmButton})},[a("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showCancelButton,expression:"showCancelButton"}],class:t.b("cancel"),attrs:{loading:t.loading.cancel,size:"large"},on:{click:function(e){t.handleAction("cancel")}}},[t._v("\n        "+t._s(t.cancelButtonText||t.$t("cancel"))+"\n      ")]),a("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showConfirmButton,expression:"showConfirmButton"}],class:[t.b("confirm"),{"van-hairline--left":t.showCancelButton&&t.showConfirmButton}],attrs:{size:"large",loading:t.loading.confirm},on:{click:function(e){t.handleAction("confirm")}}},[t._v("\n        "+t._s(t.confirmButtonText||t.$t("confirm"))+"\n      ")])],1)])])},name:"dialog",components:{VanButton:r},mixins:[c["a"]],props:{title:String,message:String,callback:Function,className:[String,Object,Array],beforeClose:Function,messageAlign:String,confirmButtonText:String,cancelButtonText:String,showCancelButton:Boolean,showConfirmButton:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{handleAction:function(e){var t=this;this.beforeClose?(this.loading[e]=!0,this.beforeClose(e,function(n){!1!==n&&t.onClose(e),t.loading[e]=!1})):this.onClose(e)},onClose:function(e){this.$emit("input",!1),this.$emit(e),this.callback&&this.callback(e)}}}),u=n("a142"),d=function(){a=new(i["a"].extend(l))({el:document.createElement("div")}),a.$on("input",function(e){a.value=e}),document.body.appendChild(a.$el)},f=function e(t){return u["e"]?Promise.resolve():new Promise(function(n,i){a||d(),Object(o["a"])(a,e.currentOptions,t,{resolve:n,reject:i})})};f.defaultOptions={value:!0,title:"",message:"",overlay:!0,className:"",lockScroll:!0,beforeClose:null,messageAlign:"",confirmButtonText:"",cancelButtonText:"",showConfirmButton:!0,showCancelButton:!1,closeOnClickOverlay:!1,callback:function(e){a["confirm"===e?"resolve":"reject"](e)}},f.alert=f,f.confirm=function(e){return f(Object(o["a"])({showCancelButton:!0},e))},f.close=function(){a&&(a.value=!1)},f.setDefaultOptions=function(e){Object(o["a"])(f.currentOptions,e)},f.resetDefaultOptions=function(){f.currentOptions=Object(o["a"])({},f.defaultOptions)},f.install=function(){i["a"].use(l)},i["a"].prototype.$dialog=f,f.resetDefaultOptions();t["a"]=f},"2fcb":function(e,t,n){},"69f6":function(e,t,n){},"8a58":function(e,t,n){"use strict";n("68ef"),n("4d75")},e0bf:function(e,t,n){"use strict";var a=n("69f6"),o=n.n(a);o.a},e17f:function(e,t,n){"use strict";n("68ef"),n("4d75"),n("2fcb")},e41f:function(e,t,n){"use strict";var a=n("fe7e"),o=n("6605");t["a"]=Object(a["a"])({render:function(){var e,t=this,n=t.$createElement,a=t._self._c||n;return a("transition",{attrs:{name:t.currentTransition}},[t.shouldRender?a("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:t.b((e={},e[t.position]=t.position,e))},[t._t("default")],2):t._e()])},name:"popup",mixins:[o["a"]],props:{position:String,transition:String,overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},computed:{currentTransition:function(){return this.transition||(this.position?"popup-slide-"+this.position:"van-fade")}}})}}]);
//# sourceMappingURL=authority_middle.4e64506e.js.map