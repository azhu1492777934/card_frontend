(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["jdReplaceMent"],{"7ece":function(e,t,a){},"8df6":function(e,t,a){"use strict";var i=a("7ece"),s=a.n(i);s.a},"9ee3":function(e,t,a){},c3a6:function(e,t,a){"use strict";a("68ef"),a("9d70"),a("09fe"),a("3743")},efb8:function(e,t,a){"use strict";a.r(t);var i,s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"eqReplaceMent"},[a("div",{staticClass:"usage-wrap hide-user"},[a("div",{ref:"orderTop",staticClass:"order-top"},[a("ul",e._l(e.statusList,function(t,i){return a("li",{key:i,class:{checked:e.statusIndex==i},on:{click:function(t){e.changeStatus(i)}}},[e._v("\n          "+e._s(t)+"\n          "),a("span",{staticClass:"deco-border-arrow"})])}))]),a("div",{ref:"SwiperWwrap",staticClass:"swipe-wrap"},[a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.statusIndex,expression:"statusIndex==0"}]},[a("van-notice-bar",{attrs:{"left-icon":"volume-o",text:"尊敬的用户您好，您使用的物联网卡已到期。因系统原因，原有续费服务已关闭，为能继续给您提供更好的服务和感谢您长久以来对我们的支持，您可以参与换新卡活动，并有众多靓号供您选择。"}}),a("ul",[a("li",{staticClass:"borderStyle"},[e._m(0),a("input",{directives:[{name:"model",rawName:"v-model",value:e.replaceData.iccid,expression:"replaceData.iccid"}],attrs:{placeholder:"请输入要更换卡的卡号",type:"text"},domProps:{value:e.replaceData.iccid},on:{input:function(t){t.target.composing||e.$set(e.replaceData,"iccid",t.target.value)}}}),a("i",{staticClass:"scanCode",on:{click:function(t){e.scanIccid(1)}}})]),a("li",{class:{marginStyle:!e.newIccid}},[e._m(1),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newIccid,expression:"newIccid"}],attrs:{placeholder:"请选择",type:"text",readonly:""},domProps:{value:e.newIccid},on:{focus:function(t){e.showIccid=!0},input:function(t){t.target.composing||(e.newIccid=t.target.value)}}})]),a("li",{staticClass:"borderStyle"},[e._m(2),a("input",{directives:[{name:"model",rawName:"v-model",value:e.replaceData.user_name,expression:"replaceData.user_name"}],attrs:{placeholder:"请输入收件人姓名",type:"text"},domProps:{value:e.replaceData.user_name},on:{input:function(t){t.target.composing||e.$set(e.replaceData,"user_name",t.target.value)}}})]),a("li",{staticClass:"borderStyle"},[e._m(3),a("input",{directives:[{name:"model",rawName:"v-model",value:e.replaceData.mobile,expression:"replaceData.mobile"}],attrs:{placeholder:"请输入手机号",type:"number"},domProps:{value:e.replaceData.mobile},on:{input:function(t){t.target.composing||e.$set(e.replaceData,"mobile",t.target.value)}}})]),a("li",{staticClass:"marginStyle"},[e._m(4),a("input",{directives:[{name:"model",rawName:"v-model",value:e.replaceData.code,expression:"replaceData.code"}],attrs:{placeholder:"请输入短信验证码",type:"text"},domProps:{value:e.replaceData.code},on:{input:[function(t){t.target.composing||e.$set(e.replaceData,"code",t.target.value)},function(t){e.limlit()}]}}),a("span",{staticClass:"getCode",on:{click:function(t){e.getCode(e.replaceData.mobile)}}},[e._v(e._s(e.codeText))])]),a("li",{staticClass:"borderStyle"},[e._m(5),a("input",{directives:[{name:"model",rawName:"v-model",value:e.areaData,expression:"areaData"}],attrs:{placeholder:"请选择省市区街道",type:"text",readonly:""},domProps:{value:e.areaData},on:{focus:function(t){e.show=!0},input:function(t){t.target.composing||(e.areaData=t.target.value)}}})]),a("li",{attrs:{stye:"-webkit-user-select:text !important;"}},[e._m(6),a("input",{directives:[{name:"model",rawName:"v-model",value:e.replaceData.addr,expression:"replaceData.addr"}],attrs:{placeholder:"请输入详细地址",type:"text"},domProps:{value:e.replaceData.addr},on:{input:function(t){t.target.composing||e.$set(e.replaceData,"addr",t.target.value)}}})])]),a("div",{staticClass:"submitButton"},[a("div",{on:{click:function(t){e.submit()}}},[e._v("提交")]),a("div",[e._v("注：请仔细核对信息后再提交")]),a("div",[e._v("新卡1-3个工作日发出")]),a("div",[e._v("如有疑问请联系客服热线：0755-33528333")])])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.statusIndex,expression:"statusIndex==1"}]},[e._l(e.replaceList,function(t,i){return a("div",{key:i,staticClass:"replaceList"},[a("div",{staticClass:"wrapBox1"},[t.model_name?a("div",{staticClass:"wrapBox2"},[a("div",[e._v("设备型号")]),a("div",[e._v(e._s(t.model_name))])]):e._e(),t.model_name?e._e():a("div",{staticClass:"wrapBox2"},[a("div"),a("div",[e._v("卡更换")])]),a("div",{staticClass:"wrapBox3"},[t.iccid?a("div",[a("span",[e._v("ICCID   ")]),a("span",[e._v(e._s(t.iccid))])]):e._e(),a("div",[a("span",[e._v("物流公司")]),t.express_name?a("span",[e._v(e._s(t.express_name))]):e._e(),t.express_name?e._e():a("span",[e._v("暂无物流信息")])]),a("div",[a("span",[e._v("快递单号")]),t.express_no?a("span",[e._v(e._s(t.express_no))]):e._e(),t.express_no?e._e():a("span",[e._v("暂无物流信息")])])])]),a("div",{staticClass:"wrapBox4"},[t.operator_at?a("div",[e._v(" 发货时间: "+e._s(t.operator_at)+" ")]):e._e(),t.operator_at?e._e():a("span",[e._v("暂无物流信息")]),t.operator_at?a("div",{staticClass:"cfmButton",class:{unreceived:1==t.plan_transfer}},[1!=t.plan_transfer?a("span",{on:{click:function(a){e.cfmButton(t.id,t.new_source,t.new_iccid)}}},[e._v("确认收货")]):e._e(),1==t.plan_transfer?a("span",[e._v("已收货")]):e._e()]):e._e()])])}),0==e.replaceList.length?a("div",{staticClass:"noMsg"},[e._v("暂无物流记录")]):e._e()],2)]),a("van-popup",{attrs:{position:"bottom",overlay:!0},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[a("van-area",{attrs:{"area-list":e.areaList},on:{cancel:function(t){e.show=!1},confirm:e.getAreaList}})],1),a("van-popup",{style:{height:"55%"},attrs:{round:"",position:"bottom",closeable:!0},model:{value:e.showIccid,callback:function(t){e.showIccid=t},expression:"showIccid"}},[a("div",{staticClass:"showIccid"},[a("div",{staticClass:"iccidTitle"},[e._v("请选择号码")]),a("div",{staticClass:"container"},e._l(e.newIccidList,function(t,i){return a("div",{key:i,staticClass:"item",on:{click:function(t){e.getChooseIccid(t)}}},[e._v(e._s(t))])})),a("div",{staticClass:"changeIccid"},[a("input",{attrs:{type:"button",value:"换一批"},on:{click:function(t){e.changeNewIccidList()}}}),a("van-icon",{attrs:{name:"replay"}})],1)])])],1)])},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("span",{staticClass:"redWord"},[e._v("*")]),e._v(" ICCID卡号:")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("span",{staticClass:"redWord"},[e._v("*")]),e._v("新的卡号:")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("span",{staticClass:"redWord"},[e._v("*")]),e._v(" 收件人姓名:")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("span",{staticClass:"redWord"},[e._v("*")]),e._v(" 手机号码:")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("span",{staticClass:"redWord"},[e._v("*")]),e._v(" 验证码:")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("span",{staticClass:"redWord"},[e._v("*")]),e._v(" 所在地区:")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("span",{staticClass:"redWord"},[e._v("*")]),e._v("详细地址:")])}],c=(a("e17f"),a("2241")),r=(a("a481"),a("96cf"),a("3040")),o=(a("9a83"),a("f564")),l=a("a322"),d=(a("db2c"),a("1125")),u=(a("68ef"),a("9d70"),a("09fe"),a("3743"),a("9ee3"),a("d282")),p=a("ad06"),m=Object(u["a"])("notice-bar"),h=m[0],f=m[1],v=h({props:{text:String,mode:String,color:String,leftIcon:String,wrapable:Boolean,background:String,delay:{type:[Number,String],default:1},scrollable:{type:Boolean,default:!0},speed:{type:Number,default:50}},data:function(){return{wrapWidth:0,firstRound:!0,duration:0,offsetWidth:0,showNoticeBar:!0,animationClass:""}},watch:{text:{handler:function(){var e=this;this.$nextTick(function(){var t=e.$refs,a=t.wrap,i=t.content;if(a&&i){var s=a.getBoundingClientRect().width,n=i.getBoundingClientRect().width;e.scrollable&&n>s&&(e.wrapWidth=s,e.offsetWidth=n,e.duration=n/e.speed,e.animationClass=f("play"))}})},immediate:!0}},methods:{onClickIcon:function(e){"closeable"===this.mode&&(this.showNoticeBar=!1,this.$emit("close",e))},onAnimationEnd:function(){var e=this;this.firstRound=!1,this.$nextTick(function(){e.duration=(e.offsetWidth+e.wrapWidth)/e.speed,e.animationClass=f("play--infinite")})}},render:function(){var e=this,t=arguments[0],a=this.slots,i=this.mode,s=this.leftIcon,n=this.onClickIcon,c={color:this.color,background:this.background},r={paddingLeft:this.firstRound?0:this.wrapWidth+"px",animationDelay:(this.firstRound?this.delay:0)+"s",animationDuration:this.duration+"s"};function o(){var e=a("left-icon");return e||(s?t(p["a"],{class:f("left-icon"),attrs:{name:s}}):void 0)}function l(){var e=a("right-icon");if(e)return e;var s="closeable"===i?"cross":"link"===i?"arrow":"";return s?t(p["a"],{class:f("right-icon"),attrs:{name:s},on:{click:n}}):void 0}return t("div",{attrs:{role:"alert"},directives:[{name:"show",value:this.showNoticeBar}],class:f({wrapable:this.wrapable}),style:c,on:{click:function(t){e.$emit("click",t)}}},[o(),t("div",{ref:"wrap",class:f("wrap"),attrs:{role:"marquee"}},[t("div",{ref:"content",class:[f("content"),this.animationClass,{"van-ellipsis":!this.scrollable&&!this.wrapable}],style:r,on:{animationend:this.onAnimationEnd,webkitAnimationEnd:this.onAnimationEnd}},[this.slots()||this.text])]),l()])}}),b=(a("c3a6"),a("ac1e"),a("543e")),_=(a("8a58"),a("e41f")),w=(a("7f7f"),a("e7e5"),a("d399")),g=(a("cadf"),a("551c"),a("097d"),a("7212")),I=a("35df"),D=a("db04"),x=a("851b"),j={name:"jdReplaceMent",components:(i={},Object(l["a"])(i,w["a"].name,w["a"]),Object(l["a"])(i,_["a"].name,_["a"]),Object(l["a"])(i,b["a"].name,b["a"]),Object(l["a"])(i,p["a"].name,p["a"]),Object(l["a"])(i,v.name,v),Object(l["a"])(i,"swiper",g["swiper"]),Object(l["a"])(i,"swiperSlide",g["swiperSlide"]),Object(l["a"])(i,"vanArea",d["a"]),i),data:function(){var e=this;return{today:Object(I["b"])(),timeStamp:(new Date).getTime(),iccid:Object(I["j"])("check_iccid"),source:Object(I["j"])("check_realNameSource"),client_type:Object(I["d"])(),statusList:["卡更换"],statusIndex:0,usageListObj:{},swiperOption:{on:{slideChangeTransitionEnd:function(t){e.statusIndex=this.activeIndex}}},replaceData:{model_name:"",user_name:"",mobile:"",code:"",province:"",city:"",district:"",addr:"",iccid:""},areaData:"",codeText:"获取验证码",countdown:60,show:!1,areaList:x["a"],replaceList:[],currentType:1,gift:2,youku_mobile:"",showIccid:!1,count:1,newIccid:"",step:0,newIccidList:[],newIccidTotal:[],newIccidData:[]}},created:function(){this.initial()},computed:{},methods:{initial:function(){Object(I["k"])("iccid")&&(this.replaceData.iccid=Object(I["k"])("iccid")),this.getNewIccidList()},changeStatus:function(e){this.statusIndex=e,1==e&&this.getList(),this.replaceData={model_name:"",user_name:"",mobile:"",code:"",province:"",city:"",district:"",addr:"",iccid:""},this.areaData="",this.gift=2,this.youku_mobile=""},changeNewIccidList:function(){this.newIccidList=[],this.step>this.newIccidTotal.length-1&&(this.step=0);for(var e=0;e<=9;e++)this.newIccidList.push(this.newIccidTotal[this.step]),this.step++},getNewIccidList:function(){var e=this;Object(D["a"])("/iot/v1/weixin/cards/get_lianghao",{iccid:this.newIccid}).then(function(t){if(1==t.status){if(e.newIccidData=t.data,e.newIccidData[0].constructor===Object){e.newIccidData.map(function(t){e.newIccidTotal.push(t.msisdn)});for(var a=e.newIccidTotal.length>9?9:e.newIccidTotal.length-1,i=0;i<=a;i++)e.newIccidList.push(e.newIccidTotal[e.step]),e.step++}if(e.newIccidData[0].constructor===Array){e.newIccidData.map(function(t){e.newIccidTotal.push(t[0])});for(var s=e.newIccidTotal.length>9?9:e.newIccidTotal.length-1,n=0;n<=s;n++)e.newIccidList.push(e.newIccidTotal[e.step]),e.step++}}})},getList:function(){var e=this;Object(D["a"])("/api/v1/app/equipment/change/apply_list",{user_id:Object(I["j"])("userInfo","obj").account.user_id,type:this.currentType,offset:0,limit:999}).then(function(t){1==t.state?e.replaceList=t.data.rows:Object(o["a"])({message:t.msg})})},getCode:function(e){return e&&""!=e?/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.replaceData.mobile)?(this.countDownFun(),void Object(D["b"])("/api/v1/app/messages/send",{mobile:e,status:3}).then(function(e){1==e.state?Object(o["a"])({message:"验证码发送成功",background:"#60ce53"}):Object(o["a"])({message:e.msg})})):(Object(o["a"])({message:"请填写正确的手机号码"}),!1):(Object(o["a"])({message:"请填写手机号码"}),!1)},getChooseIccid:function(e){this.newIccid=e.target.innerText,this.showIccid=!1},countDownFun:function(){var e=this,t=this;clearInterval(this.timer),this.timer=setInterval(function(){t.countdown<=0?(t.codeText="获取验证码",t.countdown=60,clearInterval(t.timer)):(t.codeText=e.countdown+"s",t.countdown--)},1e3)},getAreaList:function(e){this.areaData="",this.replaceData.province=e[0].name,this.replaceData.city=e[1].name,e[2]?this.replaceData.district=e[2].name:this.replaceData.district="";for(var t=[],a=0;a<e.length;a++)e[a]&&t.push(e[a].name);this.areaData=t.join("/"),this.show=!1},submit:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,a,i=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,this,/^[1-9]\d*$/.test(this.replaceData.code)){e.next=5;break}return Object(o["a"])({message:"请填写正确的验证码"}),e.abrupt("return",!1);case 5:if(0!=this.currentType){e.next=9;break}if(""!=this.replaceData.model_name){e.next=9;break}return Object(o["a"])({message:"请填写设备型号"}),e.abrupt("return",!1);case 9:if(""!=this.replaceData.iccid){e.next=12;break}return Object(o["a"])({message:"请填写卡号"}),e.abrupt("return",!1);case 12:if(""!=this.newIccid){e.next=15;break}return Object(o["a"])({message:"请选择新的卡号"}),e.abrupt("return",!1);case 15:if(""!=this.replaceData.user_name){e.next=18;break}return Object(o["a"])({message:"请填写收件人姓名"}),e.abrupt("return",!1);case 18:if(""!=this.replaceData.mobile){e.next=21;break}return Object(o["a"])({message:"请填写手机号"}),e.abrupt("return",!1);case 21:if(""!=this.replaceData.code){e.next=24;break}return Object(o["a"])({message:"请填写验证码"}),e.abrupt("return",!1);case 24:if(""!=this.replaceData.province&&""!=this.replaceData.city&&""!=this.replaceData.district){e.next=27;break}return Object(o["a"])({message:"请选择所在地区"}),e.abrupt("return",!1);case 27:if(""!=this.replaceData.addr){e.next=30;break}return Object(o["a"])({message:"请填写详细地址"}),e.abrupt("return",!1);case 30:if(!(this.replaceData.addr.length<3)){e.next=33;break}return Object(o["a"])({message:"详细地址过短"}),e.abrupt("return",!1);case 33:if(1!=this.gift){e.next=37;break}if(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.youku_mobile)){e.next=37;break}return Object(o["a"])({message:"请填写正确优酷绑定的手机号"}),e.abrupt("return",!1);case 37:for(a in 2==this.gift&&(this.youku_mobile=""),t=this.replaceData,t)t[a]=String(t[a]).replace(/\s*/g,"");t.user_id=0,t.type=2,t.gift=this.gift,t.youku_mobile=this.youku_mobile,this.newIccidData[0].constructor===Object&&this.newIccidData.some(function(e){e.msisdn==i.newIccid&&(t.new_iccid=e.iccid)}),this.newIccidData[0].constructor===Array&&this.newIccidData.some(function(e){e[0]==i.newIccid&&(t.new_iccid=e[1])}),this.cfmSubmit(t),e.next=52;break;case 49:e.prev=49,e.t0=e["catch"](0),Object(w["a"])({position:"top",message:e.t0.message});case 52:case"end":return e.stop()}},e,this,[[0,49]])}));return function(){return e.apply(this,arguments)}}(),scanIccid:function(e){var t=this;this.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(e){var a=e.resultStr;a.indexOf(",")>-1&&(a=a.substr(a.indexOf(",")+1,a.length)),t.replaceData.iccid=a.replace(/\s*/g,"")}})},cfmButton:function(e,t,a){var i,s=this;i=35==t?"确认且实名":"确认",c["a"].confirm({title:"是否确认收货",message:"确认收货后套餐将自动转移到新卡",confirmButtonText:i}).then(function(){s.transferPlan(e,a)}).catch(function(){})},transferPlan:function(e,t){var a=this;Object(D["b"])("/api/v1/app/equipment/transfer",{id:e}).then(function(e){1==e.state?(0==Object(I["j"])("is_flow_card")&&a.activate(t),Object(o["a"])({message:"确认收货成功",background:"#60ce53"}),a.getList(),e.data&&(location.href=e.data)):Object(o["a"])({message:e.msg})})},cfmSubmit:function(e){var t=this;Object(D["b"])("/api/v1/app/equipment/change/apply",e).then(function(e){if(e.data||1!=e.state)if(/<[^>]+>/.test(e.data)){var a=document.createElement("div");a.innerHTML=e.data,document.body.appendChild(a),document.forms[0].submit()}else Object(o["a"])({message:e.msg});else Object(o["a"])({message:"提交成功",background:"#60ce53"}),t.replaceData={},t.areaData="",t.gift=2,t.youku_mobile="",t.newIccid=""})},getSource:function(e){var t=this,a=new Promise(function(e,a){Object(D["a"])("/api/v1/app/cards/details",{iccid:t.iccid}).then(function(t){1==t.state&&e(t.data.source)})});return a},activate:function(e){Object(D["a"])("/api/v1/app/cards/yd_allow_auth",{iccid:e,user_id:Object(I["j"])("userInfo","obj").account.user_id})},limlit:function(){8==this.replaceData.code.length&&(this.replaceData.code=this.replaceData.code.slice(0,4)),12==this.replaceData.code.length&&(this.replaceData.code=this.replaceData.code.slice(0,6))}}},y=j,k=(a("8df6"),a("2877")),C=Object(k["a"])(y,s,n,!1,null,null,null);C.options.__file="jdReplaceMent.vue";t["default"]=C.exports}}]);
//# sourceMappingURL=jdReplaceMent.51df85ae.js.map