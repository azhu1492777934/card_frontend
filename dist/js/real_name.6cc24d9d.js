(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["real_name"],{5364:function(e,t,i){},"55d7":function(e,t,i){"use strict";i.r(t);var s,o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"g-wrap card-activated-wrap"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!e.card_tip,expression:"!card_tip"}],staticClass:"tip-wrap p-15"},[s("span",[e._v("请在支付宝生活号‘万物互联’或微信公众号‘物联网通信运营商’中充值续费，在其他平台充值无法到账且无法退款")])]),s("img",{staticClass:"realname-tip",attrs:{src:i("c155"),alt:""}}),s("div",{staticClass:"info-wrap"},[s("div",[s("span",[e._v("ICCID")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.info_iccid,expression:"info_iccid"}],attrs:{readonly:"",placeholder:"请输入ICCID",type:"text"},domProps:{value:e.info_iccid},on:{input:function(t){t.target.composing||(e.info_iccid=t.target.value)}}})]),e.showItem.showImei?s("div",[s("span",[e._v("IMEI")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.info_imei,expression:"info_imei"}],attrs:{placeholder:"请输入IMEI",type:"number"},domProps:{value:e.info_imei},on:{input:function(t){t.target.composing||(e.info_imei=t.target.value)}}}),s("span",{staticClass:"iconfont icon-scan"})]):e._e(),e.showItem.showImei?s("p",{staticClass:"tip-imei"},[e._v("可录入IMEI,也可使用默认IMEI;系统检测到设备IMEI后将自动更新。")]):e._e(),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showItem.showID,expression:"showItem.showID"}]},[s("span",[e._v("身份证")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.info_id,expression:"info_id"}],attrs:{placeholder:"请输入身份证",type:"number"},domProps:{value:e.info_id},on:{input:function(t){t.target.composing||(e.info_id=t.target.value)}}})]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showItem.showName,expression:"showItem.showName"}]},[s("span",[e._v("姓名")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.info_name,expression:"info_name"}],attrs:{maxlength:"15",placeholder:"请输入姓名",type:"text"},domProps:{value:e.info_name},on:{input:function(t){t.target.composing||(e.info_name=t.target.value)}}})]),s("div",[s("span",[e._v("手机号")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.info_phone,expression:"info_phone"}],attrs:{placeholder:"mifi"==e.isPhoneMifi?"请输入手机号接收验证码":"请输入家长手机号接收验证码",type:"number"},domProps:{value:e.info_phone},on:{input:function(t){t.target.composing||(e.info_phone=t.target.value)}}})]),s("div",{staticClass:"code-wrap"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.info_code,expression:"info_code"}],attrs:{placeholder:"请输入验证码",type:"number"},domProps:{value:e.info_code},on:{input:[function(t){t.target.composing||(e.info_code=t.target.value)},function(t){e.limlit()}]}}),s("button",{staticClass:"btn-code",attrs:{disabled:e.disabled_code},on:{click:e.getCode}},[e._v(e._s(e.countDownMsg))])])]),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.card_tip,expression:"!card_tip"}],staticClass:"tip-wrap p-15"},[s("p",[e._v("移动号码实名仅支持一证五号，若实名卡数已超出请更换证件")])]),s("p",{staticClass:"tutorial-wrap"},[s("a",{on:{click:e.toTutorial}},[s("span",{staticClass:"iconfont icon-tutorial"}),e._v("查看实名教程")])]),s("div",{staticClass:"btn-next-wrap"},[s("button",{staticClass:"btn-next",on:{click:e.checkInfo}},[e._v("完成实名 激活卡")])]),e._m(0),s("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.showItem.showFixedWrap,callback:function(t){e.$set(e.showItem,"showFixedWrap",t)},expression:"showItem.showFixedWrap"}},[s("p",{staticClass:"showTip"},[e._v(e._s(e.showTipMsg))])]),s("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.showItem.showCodeWrap,callback:function(t){e.$set(e.showItem,"showCodeWrap",t)},expression:"showItem.showCodeWrap"}},[s("p",{staticClass:"showTip"},[e._v(e._s(e.showItem.showCodeMsg))])])],1)},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"phone-tip"},[e._v("\n    温馨提示"),i("br"),e._v("以'145','146','166','177','199'号段开头的号码无法接收短信验证码\n  ")])}],n=(i("6762"),i("28a5"),i("a322")),c=(i("9a83"),i("f564")),r=(i("7f7f"),i("8a58"),i("e41f")),d=i("db04"),h=i("35df"),m=(i("5364"),{name:"home",props:{decrypt_data:{}},data:function(){return{regex_phone:/(?:^1[3456789]|^9[28])\d{9}$/,regex_num:/^[1-9]\d*$/,regex_name:/^[\u4e00-\u9fa5a-zA-Z]+$/,is_boss:!1,card_tip:!0,card_source:"",info_iccid:"",info_imei:"864319031839011",info_id:"",info_code:"",info_phone:"",info_name:"",isVerifyCode:!1,verifyCode:"1111",showItem:{showID:!1,showName:!1,showImei:!1,showFixedWrap:!1,showVerifyCode:!1,showCodeWrap:!1,showCodeMsg:""},countDown:60,countDownMsg:"获取验证码",showTipMsg:"检测信息中，请等候",timer:null,disabled_code:!1,isPhoneMifi:""}},components:(s={},Object(n["a"])(s,r["a"].name,r["a"]),Object(n["a"])(s,c["a"].name,c["a"]),s),created:function(){var e=this;Object(h["p"])("realnameType"),Object(h["p"])("plan_list_new_card"),this.isPhoneMifi=this.$route.query.from,Object(h["k"])("iccid")?this.info_iccid=Object(h["k"])("iccid"):Object(h["j"])("check_iccid")?this.info_iccid=Object(h["j"])("check_iccid"):this.$router.push({path:"/weixin/card/lookup"}),Object(h["k"])("source")?this.card_source=Object(h["k"])("source"):Object(h["j"])("check_realNameSource")?this.card_source=Object(h["j"])("check_realNameSource"):this.$router.push({path:"/weixin/card/lookup"}),Object(h["l"])(this.card_source,["18","19","20","21","22","27"])>=0&&(this.card_tip=!this.card_tip),Object(d["a"])("/api/v1/app/find_iccid",{iccid:Object(h["j"])("check_iccid")}).then(function(t){1===t.state?(e.is_boss=!0,e.showItem.showID=!0,e.showItem.showName=!0):(e.is_boss=!1,e.showItem.showID=!1,e.showItem.showName=!1),e.showItem.showFixedWrap=!1})},methods:{hideCodeVerify:function(){this.showItem.showVerifyCode=!1},inArray:function(e,t,i){return null==t?-1:t.indexOf(e,i)},verifyID:function(e){var t={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};if(!e)return{state:0,msg:"请输入您的身份证号码"};if(!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(e))return{state:0,msg:"您的身份号码有误"};if(!t[e.substr(0,2)])return{state:0,msg:"您的身份号码有误"};if(18===e.length){e=e.split("");for(var i=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],s=[1,0,"X",9,8,7,6,5,4,3,2],o=0,a=0,n=0,c=0;c<17;c++)a=e[c],n=i[c],o+=a*n;s[o%11];if(s[o%11]!=e[17])return{state:0,msg:"您的身份号码有误"}}return{state:1}},checkPhone:function(){if(!this.info_phone)return{state:0,msg:"请输入您的手机号码"};if(!this.regex_phone.test(this.info_phone))return{state:0,msg:"手机号码有误"};var e=this.info_phone.substr(0,3),t=["145","146","166","177","199"];return t.includes(e)?{state:0,msg:"请勿输入以145/146/166/177/199开头的手机号码"}:{state:1}},checkCode:function(){return this.regex_num.test(this.info_code)?{state:1}:{state:0,msg:"验证码有误"}},getCode:function(){var e=this,t=this,i=this.checkPhone();i.state?(Object(c["a"])({message:"检测手机号码中,请等候"}),Object(d["b"])("/api/v1/app/phone/check",{mobile:this.info_phone}).then(function(i){1===i.state?(clearInterval(e.timer),e.disabled_code=!0,e.countDownMsg=e.countDown+"s",e.timer=setInterval(function(){t.countDown--,t.countDownMsg=t.countDown+"s",t.countDown<=0&&(clearInterval(t.timer),t.countDownMsg="获取验证码",t.countDown=60,t.disabled_code=!1)},1e3),Object(d["b"])("/api/v1/app/messages/send",{mobile:e.info_phone}).then(function(e){1===e.state?Object(c["a"])({message:"验证码发送成功",background:"#60ce53"}):Object(c["a"])({message:e.msg})})):Object(c["a"])({message:i.msg})})):Object(c["a"])({message:i.msg,background:"#ce4141"})},checkInfo:function(){var e=this.verifyID(this.info_id),t=this.checkPhone(),i=this.checkCode();if(this.is_boss){if(!e.state)return void Object(c["a"])({message:e.msg});if(!this.info_name)return void Object(c["a"])({message:"请填写您的姓名"});if(!this.regex_name.test(this.info_name)||this.info_name.length>15)return void Object(c["a"])({message:"请填写正确的姓名"})}t.state?i.state?this.bindImei():Object(c["a"])({message:i.msg,background:"#ce4141"}):Object(c["a"])({message:t.msg,background:"#ce4141"})},bindImei:function(){var e=this,t={mobile:this.info_phone,iccid:this.info_iccid,code:this.info_code,imei:this.info_imei,realname:this.info_name||"***",id_no:this.info_id||"***",alibind:!0},i=this;Object(c["a"])({message:"正在绑定手机号码,请等候"}),Object(d["b"])("/api/v1/app/bind/imei",t).then(function(t){1===t.state?(Object(c["a"])({message:"绑定成功,正在前往第三方实名,请耐心等候"}),Object(d["a"])("/api/v1/app/jump/taobao",{imei:e.info_imei,iccid:e.info_iccid,source:e.card_source,type:"mifi"===e.global_variables.packed_project?1:0}).then(function(t){-1!==t.data.indexOf("taobao")&&"wechat"===e.global_variables.RuntimeEnv?e.$router.push({path:"/to_tb",query:{url:t.data}}):location.href=t.data})):10015===t.state?(Object(c["a"])({message:t.msg}),setTimeout(function(){i.$router.push({path:"/weixin/card/plan_list"})},1500)):t.msg?Object(c["a"])({message:t.msg}):Object(c["a"])({message:"绑定手机失败,请稍后再试"})})},toTutorial:function(){"18"===this.card_source||"19"===this.card_source?location.href="https://mp.weixin.qq.com/s/IMUU9Wan63K00QEFcxUnjg":location.href="https://mp.weixin.qq.com/s?__biz=MzUxODA0OTAyOQ==&mid=100000010&idx=1&sn=a5269b403df4782a2413184f027a01d2&chksm=798f9d604ef81476a074d02828cc355331e354d3c37f89aa3f87ddb21004903190d858842300&mpshare=1&scene=23&srcid=0601LjTN6Zs9SunY3rvoUg4Y#rd"},limlit:function(){8==this.info_code.length&&(this.info_code=this.info_code.slice(0,4)),12==this.info_code.length&&(this.info_code=this.info_code.slice(0,6))}}}),p=m,u=(i("69e4"),i("2877")),l=Object(u["a"])(p,o,a,!1,null,null,null);l.options.__file="real_name.vue";t["default"]=l.exports},"69e4":function(e,t,i){"use strict";var s=i("f17b"),o=i.n(s);o.a},c155:function(e,t,i){e.exports=i.p+"img/tip.687b6ce0.png"},f17b:function(e,t,i){}}]);
//# sourceMappingURL=real_name.6cc24d9d.js.map