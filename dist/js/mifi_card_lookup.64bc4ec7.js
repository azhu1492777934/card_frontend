(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_card_lookup"],{"207a":function(e,t,c){},"24b9":function(e,t,c){e.exports=c.p+"img/scanTop.5a342865.png"},"4e3c":function(e,t,c){"use strict";var i=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"btn-wrap"},[c("button",{class:{disabled:e.btnState},attrs:{disabled:e.btnState},on:{click:e.clickThrotle}},[e._v("\n    "+e._s(e.btnText)+"\n    ")])])},n=[],s={name:"btn-common",props:{btnText:{type:String}},data:function(){return{btnState:!1,timer:null}},created:function(){},methods:{clickThrotle:function(){var e=this;this.$emit("clickThrotle"),this.btnState=!0,clearTimeout(this.timer),this.timer=setTimeout(function(){e.btnState=!1},2e3)}}},a=s,r=(c("d9ae"),c("2877")),o=Object(r["a"])(a,i,n,!1,null,null,null);o.options.__file="index.vue";t["a"]=o.exports},"72e8":function(e,t,c){"use strict";var i=c("207a"),n=c.n(i);n.a},"8a58":function(e,t,c){"use strict";c("68ef"),c("4d75")},a481:function(e,t,c){c("214f")("replace",2,function(e,t,c){return[function(i,n){"use strict";var s=e(this),a=void 0==i?void 0:i[t];return void 0!==a?a.call(i,s,n):c.call(String(s),i,n)},c]})},cd1e:function(e,t,c){"use strict";c.r(t);var i,n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"check-card-wrap"},[i("div",{ref:"ref_top",staticClass:"scanTop-wrap"},[i("img",{attrs:{src:c("24b9"),alt:""}})]),i("div",{ref:"ref_search",staticClass:"search-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:e.iccid},on:{focus:e.handleIccidFocus,blur:function(t){return t.preventDefault(),e.iccidBlur(t)},input:function(t){t.target.composing||(e.iccid=t.target.value)}}}),i("span",{directives:[{name:"show",rawName:"v-show",value:e.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:e.clearInputIccid}},[e._v("×")]),i("span",{staticClass:"iconfont icon-scan bounceIn animated",on:{click:e.testClick}})]),i("div",{ref:"ref_button",staticClass:"btn-check-wrap"},[i("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(t){e.searchIccid(e.iccid)}}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[i("p",{ref:"recording_title",staticClass:"recording-title"},[i("span",[e._v("历史搜索记录")]),i("span",[e._v(e._s(e.recording_list.length)+"条")])]),i("ul",{ref:"main_recording",staticClass:"recording-list-wrap"},e._l(e.recording_list,function(t,c){return i("li",[i("span",{on:{click:function(c){e.searchIccid(t.iccid)}}},[e._v(e._s(t.iccid))]),i("span",[e._v(e._s(t.searchTime))]),i("span",{on:{click:function(c){e.deleteIccid(t.iccid)}}},[e._v("×")])])}))])])},s=[],a=(c("55dd"),c("a481"),c("9a83"),c("f564")),r=c("a322"),o=(c("7f7f"),c("8a58"),c("e41f")),d=c("35df"),h=c("db04"),l=c("4e3c"),u={name:"home",data:function(){return{sort_recording_list:{},recording_list:[],recording_show:!1,iccid:"",client_type:Object(d["c"])(),showClearBtn:!1}},components:(i={},Object(r["a"])(i,o["a"].name,o["a"]),Object(r["a"])(i,"cardButton",l["a"]),i),created:function(){var e=this;this.$store.commit("mifiCommon/changeErrStatus",{show:!1});var t=this;if(Object(d["h"])("recording_list","arr")){var c=Object(d["h"])("recording_list","arr");c.length&&(this.recording_list=c,this.recording_show=!0)}Object(d["h"])("new_auth_search_iccid")?this.iccid=Object(d["h"])("new_auth_search_iccid"):Object(d["h"])("check_iccid")&&(this.iccid=Object(d["h"])("check_iccid")),this.$watch("iccid",this.debounce(function(e){t.handleIccidFocus()},500));var i=Object(d["i"])("iccid")||Object(d["h"])("watch_card");if(i&&1==this.checkSearchIccid(i).state)if(Object(d["h"])("watchAutoSearch")>2&&(Object(d["l"])("watch_card"),Object(d["l"])("watchAutoSearch")),Object(d["h"])("watch_card_timestamp")){var n=Object(d["h"])("watch_card_timestamp"),s=(new Date).getTime();if(s>n){var r=(new Date).getTime()+6e4;Object(d["m"])("check_iccid",i),Object(d["m"])("watch_card_timestamp",r),this.processCheckIccid(i)}}else{this.iccid=i,Object(d["m"])("check_iccid",i);var o=(new Date).setTime((new Date).getTime()+6e4);Object(d["m"])("watch_card_timestamp",o),this.processCheckIccid(i)}else i&&Object(a["a"])({message:this.checkSearchIccid(i).msg});this.recording_show&&this.$nextTick(function(){var t=document.documentElement.clientHeight||document.body.clientHeight,c=e.$refs.ref_top.offsetHeight,i=e.$refs.ref_search.offsetHeight,n=e.$refs.ref_button.offsetHeight,s=e.$refs.recording_title.offsetHeight;e.$refs.main_recording.style.height=t-c-i-n-s-50+"px"})},methods:{testClick:function(){var e=this;"wechat"==this.client_type?this.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(t){var c=t.resultStr;c.indexOf(",")>-1&&(c=c.substr(c.indexOf(",")+1,c.length)),e.iccid=c.replace(/\s*/g,""),e.processCheckIccid(e.iccid)}}):"alipay"==this.client_type&&ap.scan(function(t){var c=t.code;e.iccid=c.replace(/\s*/g,""),e.processCheckIccid(e.iccid)})},searchIccid:function(e){e?this.checkSearchIccid(e).state?this.processCheckIccid(e):Object(a["a"])({message:this.checkSearchIccid(e).msg}):Object(a["a"])({message:"请输入ICCID"})},processCheckIccid:function(e){var t=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),Object(h["b"])("/api/v1/app/new_auth/check_auth_",{iccid:e}).then(function(c){t.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1});var i=Object(d["h"])("watchAutoSearch");i&&(i++,Object(d["m"])("watchAutoSearch",i)),1==c.state?(Object(d["m"])("check_iccid",c.data.iccid),Object(d["m"])("new_auth_search_iccid",e),t.recordingIccid({iccid:c.data.iccid,realname:2!=c.data.status&&3!=c.data.status}),1==c.data.status?t.$router.push({path:"/mifi/card/index"}):2!=c.data.status&&3!=c.data.status||(Object(d["m"])("check_realNameSource",c.data.source),t.$router.push({path:"/weixin/new_card/real_name",query:{from:"mifi"}}))):Object(a["a"])({message:c.msg})})},recordingIccid:function(e){var t=!1;this.recording_list.length?(this.recording_list.map(function(c,i){c.iccid==e.iccid&&(c.searchTime=Object(d["f"])().searchTime,c.millisecond=Object(d["f"])().millisecond,c.realname=e.realname,t=!0)}),t||this.recording_list.push({iccid:e.iccid,searchTime:Object(d["f"])().searchTime,millisecond:Object(d["f"])().millisecond,realname:e.realname})):(this.recording_list.push({iccid:e.iccid,searchTime:Object(d["f"])().searchTime,millisecond:Object(d["f"])().millisecond,realname:e.realname}),this.recording_show=!0),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(d["m"])("recording_list",this.recording_list,"arr")},scanIccid:function(){var e=this;"wechat"==this.client_type?this.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(t){var c=t.resultStr;c.indexOf(",")>-1&&(c=c.substr(c.indexOf(",")+1,c.length)),e.iccid=c.replace(/\s*/g,""),e.processCheckIccid(e.iccid)}}):"alipay"==this.client_type&&ap.scan(function(t){var c=t.code;e.iccid=c.replace(/\s*/g,""),e.processCheckIccid(e.iccid)})},inArray:function(e,t,c){return null==t?-1:t.indexOf(e,c)},compare:function(e){return function(t,c){var i=t[e],n=c[e];return n-i}},checkSearchIccid:function(e){return e?(e.length<19||e.length>20||"89"!=e.substr(0,2))&&13!=e.length&&11!=e.length&&15!=e.length&&16!=e.length?{state:0,msg:"ICCID有误,请检查"}:{state:1}:{state:0,msg:"请输入ICCID"}},deleteIccid:function(e){for(var t=-1,c=0;c<this.recording_list.length;c++)if(this.recording_list[c].iccid==e){t=c;break}t>=0&&(this.recording_list.splice(t,1),Object(d["m"])("recording_list",this.recording_list,"arr")),this.recording_list.length||(this.recording_show=!1)},handleIccidFocus:function(){this.iccid?this.showClearBtn=!0:this.showClearBtn=!1},clearInputIccid:function(){this.iccid="",this.$refs.iccidDom.focus(),this.showClearBtn=!1},iccidBlur:function(){this.showClearBtn=!1},debounce:function(e,t){var c,i=this;return function(){for(var n=arguments.length,s=new Array(n),a=0;a<n;a++)s[a]=arguments[a];c&&clearTimeout(c),c=setTimeout(function(){e.apply(i,s)},t)}}}},f=u,m=(c("72e8"),c("2877")),p=Object(m["a"])(f,n,s,!1,null,null,null);p.options.__file="lookup.vue";t["default"]=p.exports},d9ae:function(e,t,c){"use strict";var i=c("dca3"),n=c.n(i);n.a},dca3:function(e,t,c){},e41f:function(e,t,c){"use strict";var i=c("fe7e"),n=c("6605");t["a"]=Object(i["a"])({render:function(){var e,t=this,c=t.$createElement,i=t._self._c||c;return i("transition",{attrs:{name:t.currentTransition}},[t.shouldRender?i("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:t.b((e={},e[t.position]=t.position,e))},[t._t("default")],2):t._e()])},name:"popup",mixins:[n["a"]],props:{position:String,transition:String,overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},computed:{currentTransition:function(){return this.transition||(this.position?"popup-slide-"+this.position:"van-fade")}}})}}]);
//# sourceMappingURL=mifi_card_lookup.64bc4ec7.js.map