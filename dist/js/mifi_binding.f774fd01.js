(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_binding"],{"062a":function(e,t,i){"use strict";i.r(t);var a,n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"binding-wrap"},[i("div",{staticClass:"userInfo"},[i("div",{staticClass:"table-cell"},[i("img",{attrs:{src:e.userInfo.headimgurl,alt:"头像"}}),i("p",[e._v("欢迎你，"+e._s(e.userInfo.nickname))])])]),i("div",{staticClass:"info-wrap"},[i("div",{staticClass:"iccid-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],attrs:{type:"text",placeholder:"请输入您的ICCID号"},domProps:{value:e.iccid},on:{input:function(t){t.target.composing||(e.iccid=t.target.value)}}})]),i("div",{staticClass:"phone-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"text",placeholder:"请输入手机号码",maxlength:"11"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})]),i("div",{staticClass:"code-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"number",placeholder:"请输入验证码",maxlength:"10"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),i("button",{staticClass:"getCode",attrs:{disabled:e.btnCode_disabled},on:{click:e.getCode}},[e._v(e._s(e.codeText))])]),i("div",{staticClass:"btn-login-wrap"},[i("button",{attrs:{disabled:e.loginDisabled},on:{click:e.login}},[e._v("绑定")])]),e._m(0)]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.isLoginError,callback:function(t){e.isLoginError=t},expression:"isLoginError"}},[i("p",{staticClass:"showTip"},[e._v(e._s(e.loginErrorMsg))])]),i("div",{directives:[{name:"show",rawName:"v-show",value:e.showLoading,expression:"showLoading"}],staticClass:"loading-wrap"},[i("div",{staticClass:"loading-inner"},[i("van-loading",{attrs:{size:"50px"}})],1)])],1)},c=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"phone-tip"},[e._v("\n      温馨提示"),i("br"),e._v("以'145','146','166','177','199'号段开头的号码无法接收短信验证码\n    ")])}],s=(i("55dd"),i("6762"),i("a322")),o=(i("ac1e"),i("543e")),r=(i("8a58"),i("e41f")),d=(i("9a83"),i("f564")),l=(i("7f7f"),i("e17f"),i("2241")),h=i("db04"),u=i("35df"),m={data:function(){return{recording_list:Object(u["i"])("recording_list","arr")||[],userInfo:Object(u["i"])("decrypt_data","obj")||{headimgurl:i("352a"),nickname:"yoyoyo~"},load_user_msg:!1,showLoading:!1,iccid:"",decrypt_data:{},phone:"",code:"",codeText:"获取验证码",countdown:60,client_type:Object(u["c"])(),btnCode_disabled:!0,is_count_down:!1,time:null,loginDisabled:!1,isLoginError:!1,loginErrorMsg:"",checkInfo:{iccid:!1,phone:!1}}},components:(a={},Object(s["a"])(a,l["a"].name,l["a"]),Object(s["a"])(a,d["a"].name,d["a"]),Object(s["a"])(a,r["a"].name,r["a"]),Object(s["a"])(a,o["a"].name,o["a"]),a),watch:{iccid:function(e,t){var i=Object(u["e"])(e);1==i.state?this.checkInfo.iccid=!0:this.checkInfo.iccd=!1,this.checkInfo.iccid&&this.checkInfo.phone&&!this.is_count_down?this.btnCode_disabled=!1:this.btnCode_disabled=!0},phone:function(e,t){var i=/^(13[0-9]|14[5679]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(e);this.checkInfo.phone=!!i,this.checkInfo.iccid&&this.checkInfo.phone&&!this.is_count_down?this.btnCode_disabled=!1:this.btnCode_disabled=!0}},created:function(){this.decrypt_data=Object(u["i"])("decrypt_data","obj")},methods:{login:function(){var e=this;""!==this.phone||""!==this.code?/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phone)?(this.loginDisabled=!0,this.showLoading=!0,Object(h["b"])("/accountCenter/v2/user/bind?"+Object(u["f"])({},"post"),{mobile:this.phone,code:this.code,from:this.client_type,uuid:this.decrypt_data.openid,nickname:this.decrypt_data.nickname,gender:this.decrypt_data.sex,avatar:this.decrypt_data.headimgurl}).then(function(t){e.loginDisabled=!1,e.showLoading=!1,0===t.error||30002===t.error?(0===t.error&&Object(u["n"])("token",t.data,"str",!0),Object(d["a"])({message:"账户绑定成功",background:"#60ce53"}),e.getUserInfo()):11002===t.error?(Object(u["n"])("refreshUrl",Object(u["a"])()),e.$emit("getToken",{from:"mifi"})):20014===t.error?(e.code="",Object(d["a"])({message:"用户绑定超时，请重新绑定"})):500===t.status||20009===t.error?Object(d["a"])({message:t.msg}):(e.isLoginError=!0,t.msg?e.loginErrorMsg=t.msg:e.loginErrorMsg="绑定用户失败，请反馈我司客服。")})):Object(d["a"])({message:"您的手机号码有误"}):Object(d["a"])({message:"请填写您的登录信息"})},getCode:function(){var e=this;if(""!==this.phone)if(/^(13[0-9]|14[5679]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phone)){var t=this.phone.substr(0,3),i=["145","146","166","177","199"];i.includes(t)?Object(d["a"])({message:"不支持以145,146,166,177,199开头的手机号码"}):(Object(d["a"])({message:"温馨提示：请使用本人手机号绑定账号。"}),this.countDownFun(),Object(h["b"])("/accountCenter/v2/verify/send?"+Object(u["f"])({},"post"),{mobile:this.phone}).then(function(t){0===t.error?Object(d["a"])({message:"验证码发送成功",background:"#60ce53"}):11002===t.error?(Object(u["n"])("refreshUrl",Object(u["a"])()),e.$emit("getToken",{from:"mifi"})):Object(d["a"])({message:t.msg})}))}else Object(d["a"])({message:"请填写正确的手机号码"});else Object(d["a"])({message:"请输入您的手机号码"})},countDownFun:function(){var e=this,t=this;this.btnCode_disabled=!0,clearInterval(this.timer),this.timer=setInterval(function(){t.countdown<=0?(t.codeText="获取验证码",t.countdown=60,t.is_count_down=!0,e.checkInfo.iccid&&e.checkInfo.phone?t.btnCode_disabled=!1:t.btnCode_disabled=!0,clearInterval(t.timer)):(t.is_count_down=!0,t.codeText=e.countdown+"s",t.countdown--)},1e3)},getUserInfo:function(){var e=this;this.load_user_msg=!0,Object(h["a"])("/accountCenter/v2/user/info?"+Object(u["f"])({},"get")).then(function(t){if(0===t.error)if(t.data&&"{}"!==JSON.stringify(t.data)){var i={account:t.data.account,avatar:t.data.avatar,nickname:t.data.nickname};Object(u["n"])("userInfo",i,"obj"),e.bindIot({iccid:e.iccid,phone:e.phone,user_id:t.data.account.user_id,code:e.code}),e.load_user_msg=!1}else{var a=e;l["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题。"}).then(function(){a.load_user_msg=!0,a.load_user_info="账号异常"})}else if(11002===t.error)Object(u["n"])("refreshUrl",Object(u["a"])()),e.$emit("getToken",{from:"mifi"});else if(10007===t.error){var n=(new Date).getTime(),c=t.extra-n;Object(u["n"])("timeSpan",c),e.getUserInfo()}else e.showAuthorityError("A-1"+t.error)})},bindIot:function(e){var t=this;Object(h["b"])("/api/v1/app/bind/iccid_userid",{iccid:e.iccid,user_id:e.user_id,mobile:e.phone}).then(function(i){1==i.state&&t.iotCheckICCID(e.iccid)})},iotCheckICCID:function(e){var t=this;this.showLoading=!0,Object(h["b"])("/api/v1/app/new_auth/check_auth_",{iccid:e}).then(function(i){t.showLoading=!1,1===i.state?(Object(u["n"])("check_iccid",i.data.iccid),Object(u["n"])("new_auth_search_iccid",e),t.recordingIccid({iccid:i.data.iccid,realname:2!=i.data.status&&3!=i.data.status}),1==i.data.status?t.$router.push({path:"/mifi/card/index"}):2!=i.data.status&&3!=i.data.status||(Object(u["n"])("check_realNameSource",i.data.source),t.$router.push({path:"/weixin/new_card/real_name",query:{from:"mifi"}}))):Object(d["a"])({message:i.msg})})},showAuthorityError:function(e){var t=this,i=e||"";l["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题"+i+"。"}).then(function(){t.load_user_msg=!0,t.load_user_info="账号异常"+i})},compare:function(e){return function(t,i){var a=t[e],n=i[e];return n-a}},recordingIccid:function(e){var t=!1;this.recording_list.length?(this.recording_list.map(function(i,a){i.iccid==e.iccid&&(i.searchTime=Object(u["g"])().searchTime,i.millisecond=Object(u["g"])().millisecond,i.realname=e.realname,t=!0)}),t||this.recording_list.push({iccid:e.iccid,searchTime:Object(u["g"])().searchTime,millisecond:Object(u["g"])().millisecond,realname:e.realname})):this.recording_list.push({iccid:e.iccid,searchTime:Object(u["g"])().searchTime,millisecond:Object(u["g"])().millisecond,realname:e.realname}),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(u["n"])("recording_list",this.recording_list,"arr")}}},g=m,b=(i("7a94"),i("2877")),p=Object(b["a"])(g,n,c,!1,null,null,null);p.options.__file="index.vue";t["default"]=p.exports},"352a":function(e,t,i){e.exports=i.p+"img/avatar.0cba868f.jpeg"},"7a94":function(e,t,i){"use strict";var a=i("d5c3"),n=i.n(a);n.a},d5c3:function(e,t,i){}}]);
//# sourceMappingURL=mifi_binding.f774fd01.js.map