(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["card_lookup"],{1564:function(e,t,c){e.exports=c.p+"img/scanTop2.3603a35a.png"},1892:function(e,t,c){"use strict";var i=c("75b0"),a=c.n(i);a.a},"24b9":function(e,t,c){e.exports=c.p+"img/scanTop.5a342865.png"},"4e3c":function(e,t,c){"use strict";var i=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"btn-wrap"},[c("button",{class:{disabled:e.btnState},attrs:{disabled:e.btnState},on:{click:e.clickThrotle}},[e._v("\n    "+e._s(e.btnText)+"\n    ")])])},a=[],n={name:"btn-common",props:{btnText:{type:String}},data:function(){return{btnState:!1,timer:null}},created:function(){},methods:{clickThrotle:function(){var e=this;this.$emit("clickThrotle"),this.btnState=!0,clearTimeout(this.timer),this.timer=setTimeout(function(){e.btnState=!1},2e3)}}},s=n,r=(c("d9ae"),c("2877")),o=Object(r["a"])(s,i,a,!1,null,null,null);o.options.__file="index.vue";t["a"]=o.exports},6648:function(e,t,c){"use strict";c.r(t);var i,a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",["app2"!=e.newAppStyle?i("div",{staticClass:"check-card-wrap"},[i("div",{staticClass:"scanTop-wrap"},["app2"!=e.newAppStyle?i("img",{attrs:{src:c("24b9"),alt:""}}):e._e(),"app2"==e.newAppStyle?i("img",{attrs:{src:c("1564"),alt:""}}):e._e()]),i("div",{staticClass:"search-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:e.iccid},on:{focus:e.handleIccidFocus,blur:function(t){return t.preventDefault(),e.iccidBlur(t)},input:function(t){t.target.composing||(e.iccid=t.target.value)}}}),i("span",{directives:[{name:"show",rawName:"v-show",value:e.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:e.clearInputIccid}},[e._v("×")]),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"iconfont icon-scan bounceIn animated",on:{click:e.scanIccid}}),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"icon-scanTip"})]),i("div",{staticClass:"btn-check-wrap"},[i("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(t){e.searchIccid(e.iccid)}}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[i("p",{staticClass:"recording-title"},[i("span",[e._v("历史搜索记录")]),i("span",[e._v(e._s(e.recording_list.length)+"条")])]),i("ul",{staticClass:"recording-list-wrap"},e._l(e.recording_list,function(t,c){return i("li",[i("span",{on:{click:function(c){e.searchIccid(t.iccid)}}},[e._v(e._s(t.iccid))]),i("span",[e._v(e._s(t.searchTime))]),i("span",{on:{click:function(c){e.deleteIccid(t.iccid)}}},[e._v("×")])])}))]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.forbidden_click,callback:function(t){e.forbidden_click=t},expression:"forbidden_click"}})],1):e._e(),"app2"==e.newAppStyle?i("div",{staticClass:"appStyle"},[i("div",{staticClass:"scanTop-wrap"},["app2"!=e.newAppStyle?i("img",{attrs:{src:c("24b9"),alt:""}}):e._e(),"app2"==e.newAppStyle?i("img",{attrs:{src:c("1564"),alt:""}}):e._e()]),i("div",{staticClass:"search-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:e.iccid},on:{focus:e.handleIccidFocus,blur:function(t){return t.preventDefault(),e.iccidBlur(t)},input:function(t){t.target.composing||(e.iccid=t.target.value)}}}),i("span",{directives:[{name:"show",rawName:"v-show",value:e.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:e.clearInputIccid}},[e._v("×")]),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"iconfont icon-scan bounceIn animated",on:{click:e.scanIccid}}),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"icon-scanTip"})]),i("div",{staticClass:"btn-check-wrap"},[i("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(t){e.searchIccid(e.iccid)}}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[i("p",{staticClass:"recording-title"},[i("span",[e._v("历史搜索记录")]),i("span",[e._v(e._s(e.recording_list.length)+"条")])]),i("ul",{staticClass:"recording-list-wrap"},e._l(e.recording_list,function(t,c){return i("li",[i("span",{on:{click:function(c){e.searchIccid(t.iccid)}}},[e._v(e._s(t.iccid))]),i("span",[e._v(e._s(t.searchTime))]),i("span",{on:{click:function(c){e.deleteIccid(t.iccid)}}},[e._v("×")])])}))]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.forbidden_click,callback:function(t){e.forbidden_click=t},expression:"forbidden_click"}})],1):e._e()])},n=[],s=(c("6762"),c("55dd"),c("a481"),c("9a83"),c("f564")),r=c("a322"),o=(c("e7e5"),c("d399")),l=(c("7f7f"),c("8a58"),c("e41f")),d=(c("cadf"),c("551c"),c("097d"),c("35df")),u=c("db04"),p=c("4e3c"),h=c("fa47"),f={name:"home",data:function(){return{realnameType:0,sort_recording_list:{},recording_list:[],recording_show:!1,iccid:"",checkShow:!0,client_type:Object(d["d"])(),showClearBtn:!1,forbidden_click:!0,newAppStyle:"app"}},components:(i={},Object(r["a"])(i,l["a"].name,l["a"]),Object(r["a"])(i,o["a"].name,o["a"]),Object(r["a"])(i,"Empty",h["a"]),Object(r["a"])(i,"cardButton",p["a"]),i),created:function(){Object(d["p"])("migu_watch_card"),Object(d["p"])("MiGuMusic"),Object(d["p"])("realnameType"),Object(d["p"])("plan_list_new_card"),Object(d["p"])("hasValidatedPlan");var e=navigator.userAgent.toLowerCase();/(app_charge)/.test(e)?(this.newAppStyle="app2",localStorage.setItem("newAppStyle","app2")):localStorage.setItem("newAppStyle","app"),("wechat"!==this.client_type||"alipay"!==this.client_type||"app"!==this.client_type||Object(d["j"])("token"))&&(this.forbidden_click=!1),Object(d["j"])("userInfo","obj")&&Object(d["n"])({type:2,user_id:Object(d["j"])("userInfo","obj")?Object(d["j"])("userInfo","obj").account.user_id:""});var t=this;if(Object(d["j"])("recording_list","arr")){var c=Object(d["j"])("recording_list","arr");c.length&&(this.recording_list=c,this.recording_show=!0)}Object(d["j"])("new_auth_search_iccid")?this.iccid=Object(d["j"])("new_auth_search_iccid"):Object(d["j"])("check_iccid")&&(this.iccid=Object(d["j"])("check_iccid")),this.$watch("iccid",this.debounce(function(e){t.handleIccidFocus()},500));var i=Object(d["k"])("iccid")||Object(d["j"])("watch_card");if(i&&1===this.checkSearchIccid(i).state)if(Object(d["j"])("watchAutoSearch")>2&&(Object(d["p"])("watch_card"),Object(d["p"])("watchAutoSearch")),Object(d["j"])("watch_card_timestamp")){var a=Object(d["j"])("watch_card_timestamp"),n=(new Date).getTime();if(n>a){var r=(new Date).getTime()+6e4;Object(d["q"])("check_iccid",i),Object(d["q"])("watch_card_timestamp",r),this.processCheckIccid(i)}}else{this.iccid=i,Object(d["q"])("check_iccid",i);var o=(new Date).setTime((new Date).getTime()+6e4);Object(d["q"])("watch_card_timestamp",o),this.processCheckIccid(i)}else i&&Object(s["a"])({message:this.checkSearchIccid(i).msg})},methods:{getRealnameType:function(e,t){var c=this,i=Object(o["a"])({duration:0,forbidClick:!0});Object(u["a"])("/api/v1/app/realnametype",{iccid:e}).then(function(a){return i.clear(),1===a.state&&(c.realnameType=a.data.real_name_type),1===c.realnameType&&0===a.data.order_status?(Object(d["q"])("realnameType",c.realnameType),void c.$router.push("/weixin/recharge/balance")):1===c.realnameType&&1===a.data.order_status?(Object(d["q"])("realnameType",c.realnameType),void c.$router.push("/weixin/card/plan_list")):void Object(d["n"])({type:3,iccid:e}).then(function(e){1===e.state?(1===t&&Object(d["q"])("migu_watch_card",1),Object(d["q"])("plan_list_new_card",1),c.$router.push({path:"/weixin/card/plan_list"})):Object(s["a"])({message:e.msg})})})},searchIccid:function(e){e?this.checkSearchIccid(e).state?this.processCheckIccid(e):Object(s["a"])({message:this.checkSearchIccid(e).msg}):Object(s["a"])({message:"请输入ICCID"})},processCheckIccid:function(e){var t,c=this;t=/[a-zA-Z]/.test(e.replace(/\s/g,"").charAt(e.length-1))?e.replace(/\s/g,"").substr(0,e.length-1):e.replace(/\s/g,""),o["a"].loading({mask:!0,message:"查询中,请等候",forbidClick:!0,duration:0});var i=!1;this.recording_list.length?(this.recording_list.map(function(e,c){e.iccid===t&&(e.searchTime=Object(d["h"])().searchTime,e.millisecond=Object(d["h"])().millisecond,i=!0)}),i||this.recording_list.push({iccid:t,searchTime:Object(d["h"])().searchTime,millisecond:Object(d["h"])().millisecond})):(this.recording_list.push({iccid:t,searchTime:Object(d["h"])().searchTime,millisecond:Object(d["h"])().millisecond}),this.recording_show=!0),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(d["q"])("recording_list",this.recording_list,"arr",!0),Object(d["c"])(1),Object(u["b"])("/api/v1/app/new_auth/check_auth_",{iccid:t}).then(function(e){o["a"].clear();var t=Object(d["j"])("watchAutoSearch");if(t&&(t++,Object(d["q"])("watchAutoSearch",t)),1===e.state){if(1===e.data.is_qiyu)return void Object(s["a"])({message:"此卡不属于物联网通信运营商"});Object(d["q"])("originPrice",e.data.default_price),Object(d["q"])("check_iccid",e.data.iccid),Object(d["q"])("new_auth_search_iccid",e.data.iccid),Object(d["p"])("plan_list_new_card"),localStorage.setItem("currentType","card"),1===e.data.is_migu_music&&Object(d["q"])("MiGuMusic",!0),1===e.data.status&&(1===e.data.is_watch&&Object(d["q"])("migu_watch_card",1),c.$router.push({path:"/weixin/card/usage"})),2===e.data.status&&c.toRealname(e.data.iccid,e.data.source),3===e.data.status&&c.getRealnameType(e.data.iccid,e.data.is_watch)}else Object(s["a"])({message:e.msg})})},toRealname:function(e,t){var c=this,i=[45,46],a=!1;i.includes(t)&&(a=!0),Object(d["q"])("check_realNameSource",t),Object(d["n"])({type:3,iccid:e}).then(function(i){1===i.state?Object(u["a"])("/api/v1/app/cards/realname",{iccid:e}).then(function(i){1===i.data||a?window.location.href="".concat(c.global_variables.realname_url,"?iccid=").concat(e,"&source=").concat(t,"&urlType=1"):c.$router.push({path:"/weixin/new_card/real_name"})}):Object(s["a"])({message:i.msg})})},scanIccid:function(){var e=this;"wechat"===this.client_type?this.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(t){var c=t.resultStr;c.indexOf(",")>-1&&(c=c.substr(c.indexOf(",")+1,c.length)),e.iccid=c.replace(/\s*/g,""),e.processCheckIccid(e.iccid)}}):"alipay"===this.client_type&&ap.scan(function(t){var c=t.code;e.iccid=c.replace(/\s*/g,""),e.processCheckIccid(e.iccid)})},inArray:function(e,t,c){return null==t?-1:t.indexOf(e,c)},compare:function(e){return function(t,c){var i=t[e],a=c[e];return a-i}},checkSearchIccid:function(e){var t=e.replace(/\s/g,"");return t?(t.length<19||t.length>20||"89"!==t.substr(0,2))&&11!==t.length&&13!==t.length&&15!==t.length&&16!==t.length?{state:0,msg:"ICCID有误,请检查"}:/^[a-zA-Z0-9]+$/.test(t)?{state:1}:{state:0,msg:"ICCID有误,请检查"}:{state:0,msg:"请输入ICCID"}},deleteIccid:function(e){for(var t=-1,c=0;c<this.recording_list.length;c++)if(this.recording_list[c].iccid===e){t=c;break}t>=0&&(this.recording_list.splice(t,1),Object(d["q"])("recording_list",this.recording_list,"arr",!0)),this.recording_list.length||(this.recording_show=!1)},handleIccidFocus:function(){this.iccid?this.showClearBtn=!0:this.showClearBtn=!1},clearInputIccid:function(){this.iccid="",this.$refs.iccidDom.focus(),this.showClearBtn=!1},iccidBlur:function(){this.showClearBtn=!1},debounce:function(e,t){var c,i=this;return function(){for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];c&&clearTimeout(c),c=setTimeout(function(){e.apply(i,n)},t)}}}},m=f,v=(c("e0b1"),c("2877")),_=Object(v["a"])(m,a,n,!1,null,null,null);_.options.__file="lookup.vue";t["default"]=_.exports},"75b0":function(e,t,c){},a481:function(e,t,c){c("214f")("replace",2,function(e,t,c){return[function(i,a){"use strict";var n=e(this),s=void 0==i?void 0:i[t];return void 0!==s?s.call(i,n,a):c.call(String(n),i,a)},c]})},b258:function(e,t,c){},c520:function(e,t,c){},d399:function(e,t,c){"use strict";var i=c("1988"),a=c("2b0e"),n=c("d282"),s=c("a142"),r=c("6605"),o=c("ad06"),l=c("543e"),d=Object(n["a"])("toast"),u=d[0],p=d[1],h=u({mixins:[r["a"]],props:{icon:String,className:null,iconPrefix:String,loadingType:String,forbidClick:Boolean,closeOnClick:Boolean,message:[Number,String],type:{type:String,default:"text"},position:{type:String,default:"middle"},transition:{type:String,default:"van-fade"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},mounted:function(){this.toggleClickable()},destroyed:function(){this.toggleClickable()},watch:{value:"toggleClickable",forbidClick:"toggleClickable"},methods:{onClick:function(){this.closeOnClick&&this.close()},toggleClickable:function(){var e=this.value&&this.forbidClick;if(this.clickable!==e){this.clickable=e;var t=e?"add":"remove";document.body.classList[t]("van-toast--unclickable")}},onAfterEnter:function(){this.$emit("opened"),this.onOpened&&this.onOpened()},onAfterLeave:function(){this.$emit("closed")},genIcon:function(){var e=this.$createElement,t=this.icon,c=this.type,i=this.iconPrefix,a=this.loadingType,n=t||"success"===c||"fail"===c;return n?e(o["a"],{class:p("icon"),attrs:{classPrefix:i,name:t||c}}):"loading"===c?e(l["a"],{class:p("loading"),attrs:{type:a}}):void 0},genMessage:function(){var e=this.$createElement,t=this.type,c=this.message;if(Object(s["b"])(c)&&""!==c)return"html"===t?e("div",{class:p("text"),domProps:{innerHTML:c}}):e("div",{class:p("text")},[c])}},render:function(){var e,t=arguments[0];return t("transition",{attrs:{name:this.transition},on:{afterEnter:this.onAfterEnter,afterLeave:this.onAfterLeave}},[t("div",{directives:[{name:"show",value:this.value}],class:[p([this.position,(e={},e[this.type]=!this.icon,e)]),this.className],on:{click:this.onClick}},[this.genIcon(),this.genMessage()])])}}),f={icon:"",type:"text",mask:!1,value:!0,message:"",className:"",overlay:!1,onClose:null,onOpened:null,duration:2e3,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,getContainer:"body",overlayStyle:null,closeOnClick:!1,closeOnClickOverlay:!1},m={},v=[],_=!1,b=Object(i["a"])({},f);function g(e){return Object(s["c"])(e)?e:{message:e}}function w(){if(s["d"])return{};if(!v.length||_){var e=new(a["default"].extend(h))({el:document.createElement("div")});e.$on("input",function(t){e.value=t}),v.push(e)}return v[v.length-1]}function j(e){return Object(i["a"])({},e,{overlay:e.mask||e.overlay,mask:void 0,duration:void 0})}function O(e){void 0===e&&(e={});var t=w();return t.value&&t.updateZIndex(),e=g(e),e=Object(i["a"])({},b,{},m[e.type||b.type],{},e),e.clear=function(){t.value=!1,e.onClose&&e.onClose(),_&&!s["d"]&&t.$on("closed",function(){clearTimeout(t.timer),v=v.filter(function(e){return e!==t});var e=t.$el.parentNode;e&&e.removeChild(t.$el),t.$destroy()})},Object(i["a"])(t,j(e)),clearTimeout(t.timer),e.duration>0&&(t.timer=setTimeout(function(){t.clear()},e.duration)),t}var y=function(e){return function(t){return O(Object(i["a"])({type:e},g(t)))}};["loading","success","fail"].forEach(function(e){O[e]=y(e)}),O.clear=function(e){v.length&&(e?(v.forEach(function(e){e.clear()}),v=[]):_?v.shift().clear():v[0].clear())},O.setDefaultOptions=function(e,t){"string"===typeof e?m[e]=t:Object(i["a"])(b,e)},O.resetDefaultOptions=function(e){"string"===typeof e?m[e]=null:(b=Object(i["a"])({},f),m={})},O.allowMultiple=function(e){void 0===e&&(e=!0),_=e},O.install=function(){a["default"].use(h)},a["default"].prototype.$toast=O;t["a"]=O},d9ae:function(e,t,c){"use strict";var i=c("dca3"),a=c.n(i);a.a},dca3:function(e,t,c){},e0b1:function(e,t,c){"use strict";var i=c("c520"),a=c.n(i);a.a},e7e5:function(e,t,c){"use strict";c("68ef"),c("a71a"),c("9d70"),c("09fe"),c("3743"),c("4d75"),c("e3b3"),c("b258")},fa47:function(e,t,c){"use strict";var i=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"empty-wrapper"},[c("div",{staticClass:"empty-inner"},[c("div",{staticClass:"no-data-wrapper"}),c("div",{staticClass:"text-wrapper"},[e._v(e._s(e.text))])])])},a=[],n={name:"index",props:{text:{type:String,default:"暂无数据"}}},s=n,r=(c("1892"),c("2877")),o=Object(r["a"])(s,i,a,!1,null,null,null);o.options.__file="index.vue";t["a"]=o.exports}}]);
//# sourceMappingURL=card_lookup.279e7dcd.js.map