(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_binding"],{"062a":function(e,t,n){"use strict";n.r(t);var i,o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"binding-wrap"},[n("div",{staticClass:"userInfo"},[n("div",{staticClass:"table-cell"},[n("img",{attrs:{src:e.userInfo.headimgurl,alt:"头像"}}),n("p",[e._v("欢迎你，"+e._s(e.userInfo.nickname))])])]),n("div",{staticClass:"info-wrap"},[n("div",{staticClass:"iccid-wrap"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],attrs:{type:"text",placeholder:"请输入您的ICCID号"},domProps:{value:e.iccid},on:{input:function(t){t.target.composing||(e.iccid=t.target.value)}}})]),n("div",{staticClass:"phone-wrap"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"text",placeholder:"请输入手机号码",maxlength:"11"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})]),n("div",{staticClass:"code-wrap"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"number",placeholder:"请输入验证码",maxlength:"10"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),n("button",{staticClass:"getCode",attrs:{disabled:e.btnCode_disabled},on:{click:e.getCode}},[e._v(e._s(e.codeText))])]),n("div",{staticClass:"btn-login-wrap"},[n("button",{attrs:{disabled:e.loginDisabled},on:{click:e.login}},[e._v("绑定")])])]),n("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.isLoginError,callback:function(t){e.isLoginError=t},expression:"isLoginError"}},[n("p",{staticClass:"showTip"},[e._v(e._s(e.loginErrorMsg))])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showLoading,expression:"showLoading"}],staticClass:"loading-wrap"},[n("div",{staticClass:"loading-inner"},[n("van-loading",{attrs:{size:"50px"}})],1)])],1)},a=[],s=(n("55dd"),n("6762"),n("a322")),c=(n("ac1e"),n("543e")),r=(n("8a58"),n("e41f")),l=(n("9a83"),n("f564")),d=(n("7f7f"),n("e17f"),n("2241")),u=n("db04"),h=n("35df"),m={data:function(){return{recording_list:Object(h["h"])("recording_list","arr")||[],userInfo:Object(h["h"])("decrypt_data","obj")||{headimgurl:n("352a"),nickname:"yoyoyo~"},load_user_msg:!1,showLoading:!1,iccid:"",decrypt_data:{},phone:"",code:"",codeText:"获取验证码",countdown:60,client_type:Object(h["c"])(),btnCode_disabled:!0,is_count_down:!1,time:null,loginDisabled:!1,isLoginError:!1,loginErrorMsg:"",checkInfo:{iccid:!1,phone:!1}}},components:(i={},Object(s["a"])(i,d["a"].name,d["a"]),Object(s["a"])(i,l["a"].name,l["a"]),Object(s["a"])(i,r["a"].name,r["a"]),Object(s["a"])(i,c["a"].name,c["a"]),i),watch:{iccid:function(e,t){var n=Object(h["d"])(e);1==n.state?this.checkInfo.iccid=!0:this.checkInfo.iccd=!1,this.checkInfo.iccid&&this.checkInfo.phone&&!this.is_count_down?this.btnCode_disabled=!1:this.btnCode_disabled=!0},phone:function(e,t){var n=/^(13[0-9]|14[5679]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(e);this.checkInfo.phone=!!n,this.checkInfo.iccid&&this.checkInfo.phone&&!this.is_count_down?this.btnCode_disabled=!1:this.btnCode_disabled=!0}},created:function(){this.decrypt_data=Object(h["h"])("decrypt_data","obj")},methods:{login:function(){var e=this;""!==this.phone||""!==this.code?/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phone)?(this.loginDisabled=!0,this.showLoading=!0,Object(u["b"])("/accountCenter/v2/user/bind?"+Object(h["e"])({},"post"),{mobile:this.phone,code:this.code,from:this.client_type,uuid:this.decrypt_data.openid,nickname:this.decrypt_data.nickname,gender:this.decrypt_data.sex,avatar:this.decrypt_data.headimgurl}).then(function(t){e.loginDisabled=!1,e.showLoading=!1,0===t.error||30002===t.error?(0===t.error&&Object(h["m"])("token",t.data),Object(l["a"])({message:"账户绑定成功",background:"#60ce53"}),e.getUserInfo()):11002===t.error?(Object(h["m"])("refreshUrl",Object(h["a"])()),e.$emit("getToken",{from:"mifi"})):20014===t.error?(e.code="",Object(l["a"])({message:"用户绑定超时，请重新绑定"})):500===t.status||20009===t.error?Object(l["a"])({message:t.msg}):(e.isLoginError=!0,t.msg?e.loginErrorMsg=t.msg:e.loginErrorMsg="绑定用户失败，请反馈我司客服。")})):Object(l["a"])({message:"您的手机号码有误"}):Object(l["a"])({message:"请填写您的登录信息"})},getCode:function(){var e=this;if(""!==this.phone)if(/^(13[0-9]|14[5679]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phone)){var t=this.phone.substr(0,3),n=["145","146","166","177","199"];n.includes(t)?Object(l["a"])({message:"不支持以145,146,166,177,199开头的手机号码"}):(Object(l["a"])({message:"温馨提示：请使用本人手机号绑定账号。"}),this.countDownFun(),Object(u["b"])("/accountCenter/v2/verify/send?"+Object(h["e"])({},"post"),{mobile:this.phone}).then(function(t){0===t.error?Object(l["a"])({message:"验证码发送成功",background:"#60ce53"}):11002===t.error?(Object(h["m"])("refreshUrl",Object(h["a"])()),e.$emit("getToken",{from:"mifi"})):Object(l["a"])({message:t.msg})}))}else Object(l["a"])({message:"请填写正确的手机号码"});else Object(l["a"])({message:"请输入您的手机号码"})},countDownFun:function(){var e=this,t=this;this.btnCode_disabled=!0,clearInterval(this.timer),this.timer=setInterval(function(){t.countdown<=0?(t.codeText="获取验证码",t.countdown=60,t.is_count_down=!0,e.checkInfo.iccid&&e.checkInfo.phone?t.btnCode_disabled=!1:t.btnCode_disabled=!0,clearInterval(t.timer)):(t.is_count_down=!0,t.codeText=e.countdown+"s",t.countdown--)},1e3)},getUserInfo:function(){var e=this;this.load_user_msg=!0,Object(u["a"])("/accountCenter/v2/user/info?"+Object(h["e"])({},"get")).then(function(t){if(0===t.error)if(t.data&&"{}"!==JSON.stringify(t.data)){var n={account:t.data.account,avatar:t.data.avatar,nickname:t.data.nickname};Object(h["m"])("userInfo",n,"obj"),e.bindIot({iccid:e.iccid,phone:e.phone,user_id:t.data.account.user_id,code:e.code}),e.load_user_msg=!1}else{var i=e;d["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题。"}).then(function(){i.load_user_msg=!0,i.load_user_info="账号异常"})}else if(11002===t.error)Object(h["m"])("refreshUrl",Object(h["a"])()),e.$emit("getToken",{from:"mifi"});else if(10007===t.error){var o=(new Date).getTime(),a=t.extra-o;Object(h["m"])("timeSpan",a),e.getUserInfo()}else e.showAuthorityError("A-1"+t.error)})},bindIot:function(e){var t=this;Object(u["b"])("/api/v1/app/bind/iccid_userid",{iccid:e.iccid,user_id:e.user_id,mobile:e.phone}).then(function(n){1==n.state&&t.iotCheckICCID(e.iccid)})},iotCheckICCID:function(e){var t=this;this.showLoading=!0,Object(u["b"])("/api/v1/app/new_auth/check_auth_",{iccid:e}).then(function(n){t.showLoading=!1,1===n.state?(Object(h["m"])("check_iccid",n.data.iccid),Object(h["m"])("new_auth_search_iccid",e),t.recordingIccid({iccid:n.data.iccid,realname:2!=n.data.status&&3!=n.data.status}),1==n.data.status?t.$router.push({path:"/mifi/card/index"}):2!=n.data.status&&3!=n.data.status||(Object(h["m"])("check_realNameSource",n.data.source),t.$router.push({path:"/weixin/new_card/real_name",query:{from:"mifi"}}))):Object(l["a"])({message:n.msg})})},showAuthorityError:function(e){var t=this,n=e||"";d["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题"+n+"。"}).then(function(){t.load_user_msg=!0,t.load_user_info="账号异常"+n})},compare:function(e){return function(t,n){var i=t[e],o=n[e];return o-i}},recordingIccid:function(e){var t=!1;this.recording_list.length?(this.recording_list.map(function(n,i){n.iccid==e.iccid&&(n.searchTime=Object(h["f"])().searchTime,n.millisecond=Object(h["f"])().millisecond,n.realname=e.realname,t=!0)}),t||this.recording_list.push({iccid:e.iccid,searchTime:Object(h["f"])().searchTime,millisecond:Object(h["f"])().millisecond,realname:e.realname})):this.recording_list.push({iccid:e.iccid,searchTime:Object(h["f"])().searchTime,millisecond:Object(h["f"])().millisecond,realname:e.realname}),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(h["m"])("recording_list",this.recording_list,"arr")}}},f=m,p=(n("7a94"),n("2877")),g=Object(p["a"])(f,o,a,!1,null,null,null);g.options.__file="index.vue";t["default"]=g.exports},2241:function(e,t,n){"use strict";var i,o=n("1988"),a=n("2b0e"),s=n("fe7e"),c=Object(s["a"])({render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.tag,{tag:"component",class:e.b([e.type,e.size,{block:e.block,plain:e.plain,round:e.round,square:e.square,loading:e.loading,disabled:e.disabled,unclickable:e.disabled||e.loading,"bottom-action":e.bottomAction}]),attrs:{type:e.nativeType,disabled:e.disabled},on:{click:e.onClick}},[e.loading?n("loading",{attrs:{size:"20px",color:"default"===e.type?void 0:""}}):n("span",{class:e.b("text")},[e._t("default",[e._v(e._s(e.text))])],2)],1)},name:"button",props:{text:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,disabled:Boolean,nativeType:String,bottomAction:Boolean,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"}},methods:{onClick:function(e){this.loading||this.disabled||this.$emit("click",e)}}}),r=n("6605"),l=Object(s["a"])({render:function(){var e,t=this,n=t.$createElement,i=t._self._c||n;return i("transition",{attrs:{name:"van-dialog-bounce"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:[t.b(),t.className]},[t.title?i("div",{class:t.b("header",{isolated:!t.message&&!t.$slots.default}),domProps:{textContent:t._s(t.title)}}):t._e(),t.message||t.$slots.default?i("div",{class:t.b("content")},[t._t("default",[t.message?i("div",{class:t.b("message",(e={"has-title":t.title},e[t.messageAlign]=t.messageAlign,e)),domProps:{innerHTML:t._s(t.message)}}):t._e()])],2):t._e(),i("div",{staticClass:"van-hairline--top",class:t.b("footer",{buttons:t.showCancelButton&&t.showConfirmButton})},[i("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showCancelButton,expression:"showCancelButton"}],class:t.b("cancel"),attrs:{loading:t.loading.cancel,size:"large"},on:{click:function(e){t.handleAction("cancel")}}},[t._v("\n        "+t._s(t.cancelButtonText||t.$t("cancel"))+"\n      ")]),i("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showConfirmButton,expression:"showConfirmButton"}],class:[t.b("confirm"),{"van-hairline--left":t.showCancelButton&&t.showConfirmButton}],attrs:{size:"large",loading:t.loading.confirm},on:{click:function(e){t.handleAction("confirm")}}},[t._v("\n        "+t._s(t.confirmButtonText||t.$t("confirm"))+"\n      ")])],1)])])},name:"dialog",components:{VanButton:c},mixins:[r["a"]],props:{title:String,message:String,callback:Function,className:[String,Object,Array],beforeClose:Function,messageAlign:String,confirmButtonText:String,cancelButtonText:String,showCancelButton:Boolean,showConfirmButton:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{handleAction:function(e){var t=this;this.beforeClose?(this.loading[e]=!0,this.beforeClose(e,function(n){!1!==n&&t.onClose(e),t.loading[e]=!1})):this.onClose(e)},onClose:function(e){this.$emit("input",!1),this.$emit(e),this.callback&&this.callback(e)}}}),d=n("a142"),u=function(){i=new(a["a"].extend(l))({el:document.createElement("div")}),i.$on("input",function(e){i.value=e}),document.body.appendChild(i.$el)},h=function e(t){return d["e"]?Promise.resolve():new Promise(function(n,a){i||u(),Object(o["a"])(i,e.currentOptions,t,{resolve:n,reject:a})})};h.defaultOptions={value:!0,title:"",message:"",overlay:!0,className:"",lockScroll:!0,beforeClose:null,messageAlign:"",confirmButtonText:"",cancelButtonText:"",showConfirmButton:!0,showCancelButton:!1,closeOnClickOverlay:!1,callback:function(e){i["confirm"===e?"resolve":"reject"](e)}},h.alert=h,h.confirm=function(e){return h(Object(o["a"])({showCancelButton:!0},e))},h.close=function(){i&&(i.value=!1)},h.setDefaultOptions=function(e){Object(o["a"])(h.currentOptions,e)},h.resetDefaultOptions=function(){h.currentOptions=Object(o["a"])({},h.defaultOptions)},h.install=function(){a["a"].use(l)},a["a"].prototype.$dialog=h,h.resetDefaultOptions();t["a"]=h},"2fcb":function(e,t,n){},"352a":function(e,t,n){e.exports=n.p+"img/avatar.0cba868f.jpeg"},6762:function(e,t,n){"use strict";var i=n("5ca1"),o=n("c366")(!0);i(i.P,"Array",{includes:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")("includes")},"7a94":function(e,t,n){"use strict";var i=n("d5c3"),o=n.n(i);o.a},"8a58":function(e,t,n){"use strict";n("68ef"),n("4d75")},ac1e:function(e,t,n){"use strict";n("68ef")},d5c3:function(e,t,n){},e17f:function(e,t,n){"use strict";n("68ef"),n("4d75"),n("2fcb")},e41f:function(e,t,n){"use strict";var i=n("fe7e"),o=n("6605");t["a"]=Object(i["a"])({render:function(){var e,t=this,n=t.$createElement,i=t._self._c||n;return i("transition",{attrs:{name:t.currentTransition}},[t.shouldRender?i("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:t.b((e={},e[t.position]=t.position,e))},[t._t("default")],2):t._e()])},name:"popup",mixins:[o["a"]],props:{position:String,transition:String,overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},computed:{currentTransition:function(){return this.transition||(this.position?"popup-slide-"+this.position:"van-fade")}}})}}]);
//# sourceMappingURL=mifi_binding.25079b72.js.map