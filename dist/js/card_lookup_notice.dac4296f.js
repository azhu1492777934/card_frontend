(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["card_lookup_notice"],{"3ad1":function(e,t,c){"use strict";var i=c("bbef"),a=c.n(i);a.a},4548:function(e,t,c){},bbef:function(e,t,c){},d05e:function(e,t,c){"use strict";var i=c("4548"),a=c.n(i);a.a},dca1:function(e,t,c){"use strict";c.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",["app2"!=e.newAppStyle?i("div",{staticClass:"check-card-wrap"},[i("div",{staticClass:"scanTop-wrap"},["app2"!=e.newAppStyle?i("img",{attrs:{src:c("24b9"),alt:""}}):e._e(),"app2"==e.newAppStyle?i("img",{attrs:{src:c("1564"),alt:""}}):e._e()]),i("div",{staticClass:"search-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:e.iccid},on:{focus:e.handleIccidFocus,blur:function(t){return t.preventDefault(),e.iccidBlur(t)},input:function(t){t.target.composing||(e.iccid=t.target.value)}}}),i("span",{directives:[{name:"show",rawName:"v-show",value:e.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:e.clearInputIccid}},[e._v("×")]),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"iconfont icon-scan bounceIn animated",on:{click:e.scanIccid}}),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"icon-scanTip"})]),i("div",{staticClass:"btn-check-wrap"},[i("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(t){e.searchIccid(e.iccid)}}}),i("a",{staticClass:"advert",attrs:{target:"_Blank",href:e.advertisement}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[i("p",{staticClass:"recording-title"},[i("span",[e._v("历史搜索记录")]),i("span",[e._v(e._s(e.recording_list.length)+"条")])]),i("ul",{staticClass:"recording-list-wrap"},e._l(e.recording_list,function(t,c){return i("li",[i("span",{on:{click:function(c){e.searchIccid(t.iccid)}}},[e._v(e._s(t.iccid))]),i("span",[e._v(e._s(t.searchTime))]),i("span",{on:{click:function(c){e.deleteIccid(t.iccid)}}},[e._v("×")])])}))]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.forbidden_click,callback:function(t){e.forbidden_click=t},expression:"forbidden_click"}})],1):e._e(),"app2"==e.newAppStyle?i("div",{staticClass:"appStyle"},[i("div",{staticClass:"scanTop-wrap"},["app2"!=e.newAppStyle?i("img",{attrs:{src:c("24b9"),alt:""}}):e._e(),"app2"==e.newAppStyle?i("img",{attrs:{src:c("1564"),alt:""}}):e._e()]),i("div",{staticClass:"search-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:e.iccid},on:{focus:e.handleIccidFocus,blur:function(t){return t.preventDefault(),e.iccidBlur(t)},input:function(t){t.target.composing||(e.iccid=t.target.value)}}}),i("span",{directives:[{name:"show",rawName:"v-show",value:e.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:e.clearInputIccid}},[e._v("×")]),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"iconfont icon-scan bounceIn animated",on:{click:e.scanIccid}}),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"icon-scanTip"})]),i("div",{staticClass:"btn-check-wrap"},[i("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(t){e.searchIccid(e.iccid)}}}),i("a",{staticClass:"advert",attrs:{target:"_Blank",href:e.advertisement}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[i("p",{staticClass:"recording-title"},[i("span",[e._v("历史搜索记录")]),i("span",[e._v(e._s(e.recording_list.length)+"条")])]),i("ul",{staticClass:"recording-list-wrap"},e._l(e.recording_list,function(t,c){return i("li",[i("span",{on:{click:function(c){e.searchIccid(t.iccid)}}},[e._v(e._s(t.iccid))]),i("span",[e._v(e._s(t.searchTime))]),i("span",{on:{click:function(c){e.deleteIccid(t.iccid)}}},[e._v("×")])])}))]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.forbidden_click,callback:function(t){e.forbidden_click=t},expression:"forbidden_click"}})],1):e._e(),e.visibleNotice?i("notice",{attrs:{content:"因业务功能使用需要，需共享物联卡业务使用相关信息，我们将会获取您的用户信息，其中包括订购套餐\n    、使用流量、 业务功能状态等",textRight:"同意",textLeft:"不同意并退出"},on:{textRightClick:function(t){e.consent()},textLeftClick:function(t){e.close()}}}):e._e()],1)},a=[],n=(c("6762"),c("e17f"),c("2241")),s=(c("96cf"),c("3040")),r=(c("55dd"),c("a481"),c("9a83"),c("f564")),o=c("a322"),l=(c("e7e5"),c("d399")),d=(c("7f7f"),c("8a58"),c("e41f")),p=(c("cadf"),c("551c"),c("097d"),c("35df")),h=c("db04"),u=c("4e3c"),_=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"notice"},[c("div",{staticClass:"noticeWrapper"},[c("div",{staticClass:"content"},[e._v("\n      "+e._s(e.content)+"\n    ")]),c("div",{staticClass:"footer"},[c("div",{staticClass:"textLeft",on:{click:e.textLeftClick}},[e._v("\n        "+e._s(e.textLeft)+"\n      ")]),c("div",{staticClass:"textRight",on:{click:e.textRightClick}},[e._v("\n        "+e._s(e.textRight)+"\n      ")])])])])},b=[],f={name:"notice",props:{content:String,textRight:String,textLeft:String},data:function(){return{}},methods:{textRightClick:function(){this.$emit("textRightClick")},textLeftClick:function(){this.$emit("textLeftClick")}}},m=f,v=(c("3ad1"),c("2877")),g=Object(v["a"])(m,_,b,!1,null,"7f22b4a6",null);g.options.__file="notice.vue";var w,j=g.exports,O={name:"home",data:function(){return{advertisement:"https://interaction.clotfun.online/horse?appkey=19a9a0d6ce1cc847fcf213dc9d75ade8&adSpaceKey=d66eb4937fdfb2e9b63ea6712cfa7881&from=H5&1=1",realnameType:0,sort_recording_list:{},recording_list:[],recording_show:!1,iccid:"",checkShow:!0,client_type:Object(p["d"])(),showClearBtn:!1,forbidden_click:!0,newAppStyle:"app",visibleNotice:!1}},components:(w={},Object(o["a"])(w,d["a"].name,d["a"]),Object(o["a"])(w,l["a"].name,l["a"]),Object(o["a"])(w,"Notice",j),Object(o["a"])(w,"cardButton",u["a"]),w),created:function(){Object(p["p"])("is_watch_card"),Object(p["p"])("MiGuMusic"),Object(p["p"])("realnameType"),Object(p["p"])("plan_list_new_card"),Object(p["p"])("hasValidatedPlan"),Object(p["p"])("balance_pay"),this.$store.commit("userInfo/changeCanBalancePay",!1);var e=navigator.userAgent.toLowerCase();/(app_charge)/.test(e)?(this.newAppStyle="app2",localStorage.setItem("newAppStyle","app2")):localStorage.setItem("newAppStyle","app"),("wechat"!==this.client_type||"alipay"!==this.client_type||"app"!==this.client_type||Object(p["j"])("token"))&&(this.forbidden_click=!1),Object(p["j"])("userInfo","obj")&&Object(p["n"])({type:2,user_id:Object(p["j"])("userInfo","obj")?Object(p["j"])("userInfo","obj").account.user_id:""});var t=this;if(Object(p["j"])("recording_list","arr")){var c=Object(p["j"])("recording_list","arr");c.length&&(this.recording_list=c,this.recording_show=!0)}Object(p["j"])("new_auth_search_iccid")?this.iccid=Object(p["j"])("new_auth_search_iccid"):Object(p["j"])("check_iccid")&&(this.iccid=Object(p["j"])("check_iccid")),this.$watch("iccid",this.debounce(function(e){t.handleIccidFocus()},500));var i=Object(p["k"])("iccid")||Object(p["j"])("watch_card");if(i&&1===this.checkSearchIccid(i).state)if(Object(p["j"])("watchAutoSearch")>2&&(Object(p["p"])("watch_card"),Object(p["p"])("watchAutoSearch")),Object(p["j"])("watch_card_timestamp")){var a=Object(p["j"])("watch_card_timestamp"),n=(new Date).getTime();if(n>a){var s=(new Date).getTime()+6e4;Object(p["q"])("check_iccid",i),Object(p["q"])("watch_card_timestamp",s),this.processCheckIccid(i)}}else{this.iccid=i,Object(p["q"])("check_iccid",i);var o=(new Date).setTime((new Date).getTime()+6e4);Object(p["q"])("watch_card_timestamp",o),this.processCheckIccid(i)}else i&&Object(r["a"])({message:this.checkSearchIccid(i).msg});Object(p["k"])("iccid")&&this.processCheckIccid(Object(p["k"])("iccid")),Object(p["j"])("notice")&&0!=Object(p["j"])("notice")||(this.visibleNotice=!0)},methods:{getRealnameType:function(e,t){var c=this,i=Object(l["a"])({duration:0,forbidClick:!0});Object(h["a"])("/api/v1/app/realnametype",{iccid:e}).then(function(a){if(i.clear(),1===a.state&&(c.realnameType=a.data.real_name_type),1===c.realnameType&&1===a.data.order_status)return Object(p["q"])("realnameType",c.realnameType),void c.$router.push("/weixin/card/plan_list");Object(p["n"])({type:3,iccid:e}).then(function(e){1===e.state?(1===t&&Object(p["q"])("is_watch_card",1),Object(p["q"])("plan_list_new_card",1),c.$router.push({path:"/weixin/card/plan_list"})):Object(r["a"])({message:e.msg})})})},searchIccid:function(e){e?this.checkSearchIccid(e).state?this.processCheckIccid(e):Object(r["a"])({message:this.checkSearchIccid(e).msg}):Object(r["a"])({message:"请输入ICCID"})},processCheckIccid:function(e){var t,c=this;t=e.replace(/\s/g,""),l["a"].loading({mask:!0,message:"查询中,请等候",forbidClick:!0,duration:0});var i=!1;this.recording_list.length?(this.recording_list.map(function(e,c){e.iccid===t&&(e.searchTime=Object(p["h"])().searchTime,e.millisecond=Object(p["h"])().millisecond,i=!0)}),i||this.recording_list.push({iccid:t,searchTime:Object(p["h"])().searchTime,millisecond:Object(p["h"])().millisecond})):(this.recording_list.push({iccid:t,searchTime:Object(p["h"])().searchTime,millisecond:Object(p["h"])().millisecond}),this.recording_show=!0),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(p["q"])("recording_list",this.recording_list,"arr",!0),Object(p["c"])(1),Object(h["b"])("/api/v1/app/new_auth/check_auth_",{iccid:t}).then(function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){var i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(l["a"].clear(),i=Object(p["j"])("watchAutoSearch"),i&&(i++,Object(p["q"])("watchAutoSearch",i)),1!==t.state){e.next=22;break}if(1!==t.data.is_qiyu){e.next=7;break}return Object(r["a"])({message:"此卡不属于物联网通信运营商"}),e.abrupt("return");case 7:if(!Object(p["j"])("userInfo","obj")){e.next=10;break}return e.next=10,c.getCanBalancePay();case 10:Object(p["q"])("originPrice",t.data.default_price),Object(p["q"])("check_iccid",t.data.iccid),Object(p["q"])("new_auth_search_iccid",t.data.iccid),Object(p["p"])("plan_list_new_card"),Object(p["p"])("advertState"),localStorage.setItem("currentType","card"),1===t.data.is_migu_music&&Object(p["q"])("MiGuMusic",!0),1===t.data.status&&(1===t.data.is_watch&&Object(p["q"])("is_watch_card",1),c.$router.push({path:"/weixin/card/usage"})),2===t.data.status&&c.toRealname(t.data.iccid,t.data.source),3===t.data.status&&(Object(p["q"])("advertState",1),c.getRealnameType(t.data.iccid,t.data.is_watch)),e.next=23;break;case 22:11022===t.state?n["a"].alert({message:"此卡已过期，即将前往换卡页面"}).then(function(){c.$router.push({path:"/weixin/question/eqReplaceMent"})}):Object(r["a"])({message:t.msg});case 23:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())},toRealname:function(e,t){var c=this,i=[45,46],a=!1;i.includes(t)&&(a=!0),Object(p["q"])("check_realNameSource",t),Object(p["n"])({type:3,iccid:e}).then(function(i){1===i.state?Object(h["a"])("/api/v1/app/cards/realname",{iccid:e}).then(function(i){1===i.data||a?window.location.href="".concat(c.global_variables.realname_url,"?iccid=").concat(e,"&source=").concat(t,"&urlType=1"):c.$router.push({path:"/weixin/new_card/real_name"})}):Object(r["a"])({message:i.msg})})},scanIccid:function(){var e=this;"wechat"===this.client_type?this.wx.ready(function(){console.log(e.wx),e.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(t){var c=t.resultStr;c.indexOf(",")>-1&&(c=c.substr(c.indexOf(",")+1,c.length)),e.iccid=c.replace(/\s*/g,""),e.processCheckIccid(e.iccid)},fail:function(e){Object(r["a"])({message:"暂不支持，敬请原谅！"})}})}):"alipay"===this.client_type&&ap.scan(function(t){var c=t.code;e.iccid=c.replace(/\s*/g,""),e.processCheckIccid(e.iccid)})},inArray:function(e,t,c){return null==t?-1:t.indexOf(e,c)},compare:function(e){return function(t,c){var i=t[e],a=c[e];return a-i}},checkSearchIccid:function(e){var t=e.replace(/\s/g,"");return t?(t.length<19||t.length>20||"89"!==t.substr(0,2))&&11!==t.length&&13!==t.length&&15!==t.length&&16!==t.length?{state:0,msg:"ICCID有误,请检查"}:/^[a-zA-Z0-9]+$/.test(t)?{state:1}:{state:0,msg:"ICCID有误,请检查"}:{state:0,msg:"请输入ICCID"}},deleteIccid:function(e){for(var t=-1,c=0;c<this.recording_list.length;c++)if(this.recording_list[c].iccid===e){t=c;break}t>=0&&(this.recording_list.splice(t,1),Object(p["q"])("recording_list",this.recording_list,"arr",!0)),this.recording_list.length||(this.recording_show=!1)},handleIccidFocus:function(){this.iccid?this.showClearBtn=!0:this.showClearBtn=!1},clearInputIccid:function(){this.iccid="",this.$refs.iccidDom.focus(),this.showClearBtn=!1},iccidBlur:function(){this.showClearBtn=!1},debounce:function(e,t){var c,i=this;return function(){for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];c&&clearTimeout(c),c=setTimeout(function(){e.apply(i,n)},t)}},getCanBalancePay:function(){var e=this;Object(h["a"])("/api/v1/app/user/balance_deadline",{user_id:Object(p["j"])("userInfo","obj").account.user_id}).then(function(t){1==t.state&&(1==t.data.in_balance_deadline?(Object(p["q"])("balance_pay",!0),e.$store.commit("userInfo/changeCanBalancePay",!0)):0==t.data.in_balance_deadline&&(Object(p["q"])("balance_pay",!1),e.$store.commit("userInfo/changeCanBalancePay",!1)))})},consent:function(){Object(p["q"])("notice",1),this.visibleNotice=!1},close:function(){Object(p["q"])("notice",0),this.visibleNotice=!1,this.$router.push({path:"/Not_fund"})}}},k=O,C=(c("d05e"),Object(v["a"])(k,i,a,!1,null,null,null));C.options.__file="lookupNotice.vue";t["default"]=C.exports}}]);
//# sourceMappingURL=card_lookup_notice.dac4296f.js.map