(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["card_lookup"],{1564:function(e,t,c){e.exports=c.p+"img/scanTop2.3603a35a.png"},1892:function(e,t,c){"use strict";var i=c("75b0"),a=c.n(i);a.a},"24b9":function(e,t,c){e.exports=c.p+"img/scanTop.5a342865.png"},"4e3c":function(e,t,c){"use strict";var i=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"btn-wrap"},[c("button",{class:{disabled:e.btnState},attrs:{disabled:e.btnState},on:{click:e.clickThrotle}},[e._v("\n    "+e._s(e.btnText)+"\n    ")])])},a=[],n={name:"btn-common",props:{btnText:{type:String}},data:function(){return{btnState:!1,timer:null}},created:function(){},methods:{clickThrotle:function(){var e=this;this.$emit("clickThrotle"),this.btnState=!0,clearTimeout(this.timer),this.timer=setTimeout(function(){e.btnState=!1},2e3)}}},s=n,r=(c("d9ae"),c("2877")),o=Object(r["a"])(s,i,a,!1,null,null,null);o.options.__file="index.vue";t["a"]=o.exports},6648:function(e,t,c){"use strict";c.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",["app2"!=e.newAppStyle?i("div",{staticClass:"check-card-wrap"},[i("div",{staticClass:"scanTop-wrap"},["app2"!=e.newAppStyle?i("img",{attrs:{src:c("24b9"),alt:""}}):e._e(),"app2"==e.newAppStyle?i("img",{attrs:{src:c("1564"),alt:""}}):e._e()]),i("div",{staticClass:"search-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:e.iccid},on:{focus:e.handleIccidFocus,blur:function(t){return t.preventDefault(),e.iccidBlur(t)},input:function(t){t.target.composing||(e.iccid=t.target.value)}}}),i("span",{directives:[{name:"show",rawName:"v-show",value:e.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:e.clearInputIccid}},[e._v("×")]),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"iconfont icon-scan bounceIn animated",on:{click:e.scanIccid}}),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"icon-scanTip"})]),i("div",{staticClass:"btn-check-wrap"},[i("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(t){e.searchIccid(e.iccid)}}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[i("p",{staticClass:"recording-title"},[i("span",[e._v("历史搜索记录")]),i("span",[e._v(e._s(e.recording_list.length)+"条")])]),i("ul",{staticClass:"recording-list-wrap"},e._l(e.recording_list,function(t,c){return i("li",[i("span",{on:{click:function(c){e.searchIccid(t.iccid)}}},[e._v(e._s(t.iccid))]),i("span",[e._v(e._s(t.searchTime))]),i("span",{on:{click:function(c){e.deleteIccid(t.iccid)}}},[e._v("×")])])}))]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.forbidden_click,callback:function(t){e.forbidden_click=t},expression:"forbidden_click"}})],1):e._e(),"app2"==e.newAppStyle?i("div",{staticClass:"appStyle"},[i("div",{staticClass:"scanTop-wrap"},["app2"!=e.newAppStyle?i("img",{attrs:{src:c("24b9"),alt:""}}):e._e(),"app2"==e.newAppStyle?i("img",{attrs:{src:c("1564"),alt:""}}):e._e()]),i("div",{staticClass:"search-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:e.iccid},on:{focus:e.handleIccidFocus,blur:function(t){return t.preventDefault(),e.iccidBlur(t)},input:function(t){t.target.composing||(e.iccid=t.target.value)}}}),i("span",{directives:[{name:"show",rawName:"v-show",value:e.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:e.clearInputIccid}},[e._v("×")]),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"iconfont icon-scan bounceIn animated",on:{click:e.scanIccid}}),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"icon-scanTip"})]),i("div",{staticClass:"btn-check-wrap"},[i("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(t){e.searchIccid(e.iccid)}}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[i("p",{staticClass:"recording-title"},[i("span",[e._v("历史搜索记录")]),i("span",[e._v(e._s(e.recording_list.length)+"条")])]),i("ul",{staticClass:"recording-list-wrap"},e._l(e.recording_list,function(t,c){return i("li",[i("span",{on:{click:function(c){e.searchIccid(t.iccid)}}},[e._v(e._s(t.iccid))]),i("span",[e._v(e._s(t.searchTime))]),i("span",{on:{click:function(c){e.deleteIccid(t.iccid)}}},[e._v("×")])])}))]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.forbidden_click,callback:function(t){e.forbidden_click=t},expression:"forbidden_click"}})],1):e._e()])},a=[],n=(c("55dd"),c("a481"),c("9a83"),c("f564")),s=c("a322"),r=(c("e7e5"),c("d399")),o=(c("7f7f"),c("8a58"),c("e41f")),l=c("35df"),d=c("db04"),u=c("4e3c"),p=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"empty-wrapper"},[c("div",{staticClass:"empty-inner"},[c("van-icon",{attrs:{name:e.name,size:e.size,color:e.color}}),c("div",{staticClass:"text-wrapper"},[e._v(e._s(e.text))])],1)])},h=[],f=(c("68ef"),c("ad06")),m=(c("c5f6"),c("cadf"),c("551c"),c("097d"),{name:"index",props:{name:{type:String,default:"warn-o"},text:{type:String,default:"暂无数据"},color:{type:String,default:"#323233"},size:{type:Number,default:40}},components:Object(s["a"])({},f["a"].name,f["a"])}),_=m,v=(c("1892"),c("2877")),g=Object(v["a"])(_,p,h,!1,null,null,null);g.options.__file="index.vue";var b,w=g.exports,y={name:"home",data:function(){return{sort_recording_list:{},recording_list:[],recording_show:!1,iccid:"",checkShow:!0,client_type:Object(l["c"])(),showClearBtn:!1,forbidden_click:!0,newAppStyle:"app"}},components:(b={},Object(s["a"])(b,o["a"].name,o["a"]),Object(s["a"])(b,r["a"].name,r["a"]),Object(s["a"])(b,"Empty",w),Object(s["a"])(b,"cardButton",u["a"]),b),created:function(){var e=navigator.userAgent.toLowerCase();(/(app_charge)/.test(e)||/(ios1.1.0)/.test(e))&&(this.newAppStyle="app2"),("wechat"!==this.client_type||"alipay"!==this.client_type||"app"!==this.client_type||Object(l["h"])("token"))&&(this.forbidden_click=!1),Object(l["h"])("userInfo","obj")&&Object(l["k"])({type:2,user_id:Object(l["h"])("userInfo","obj")?Object(l["h"])("userInfo","obj").account.user_id:""});var t=this;if(Object(l["h"])("recording_list","arr")){var c=Object(l["h"])("recording_list","arr");c.length&&(this.recording_list=c,this.recording_show=!0)}Object(l["h"])("new_auth_search_iccid")?this.iccid=Object(l["h"])("new_auth_search_iccid"):Object(l["h"])("check_iccid")&&(this.iccid=Object(l["h"])("check_iccid")),this.$watch("iccid",this.debounce(function(e){t.handleIccidFocus()},500));var i=Object(l["i"])("iccid")||Object(l["h"])("watch_card");if(i&&1===this.checkSearchIccid(i).state)if(Object(l["h"])("watchAutoSearch")>2&&(Object(l["l"])("watch_card"),Object(l["l"])("watchAutoSearch")),Object(l["h"])("watch_card_timestamp")){var a=Object(l["h"])("watch_card_timestamp"),s=(new Date).getTime();if(s>a){var r=(new Date).getTime()+6e4;Object(l["m"])("check_iccid",i),Object(l["m"])("watch_card_timestamp",r),this.processCheckIccid(i)}}else{this.iccid=i,Object(l["m"])("check_iccid",i);var o=(new Date).setTime((new Date).getTime()+6e4);Object(l["m"])("watch_card_timestamp",o),this.processCheckIccid(i)}else i&&Object(n["a"])({message:this.checkSearchIccid(i).msg})},methods:{searchIccid:function(e){e?this.checkSearchIccid(e).state?this.processCheckIccid(e):Object(n["a"])({message:this.checkSearchIccid(e).msg}):Object(n["a"])({message:"请输入ICCID"})},processCheckIccid:function(e){var t;t=/[a-zA-Z]/.test(e.replace(/\s/g,"").charAt(e.length-1))?e.replace(/\s/g,"").substr(0,e.length-1):e.replace(/\s/g,""),r["a"].loading({mask:!0,message:"查询中,请等候",forbidClick:!0,duration:0});var c=!1,i=this;this.recording_list.length?(this.recording_list.map(function(e,i){e.iccid===t&&(e.searchTime=Object(l["f"])().searchTime,e.millisecond=Object(l["f"])().millisecond,c=!0)}),c||this.recording_list.push({iccid:t,searchTime:Object(l["f"])().searchTime,millisecond:Object(l["f"])().millisecond})):(this.recording_list.push({iccid:t,searchTime:Object(l["f"])().searchTime,millisecond:Object(l["f"])().millisecond}),this.recording_show=!0),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(l["m"])("recording_list",this.recording_list,"arr",!0),Object(d["b"])("/api/v1/app/new_auth/check_auth_",{iccid:t}).then(function(e){r["a"].clear();var t=Object(l["h"])("watchAutoSearch");t&&(t++,Object(l["m"])("watchAutoSearch",t)),1===e.state?(Object(l["m"])("originPrice",e.data.default_price),Object(l["m"])("check_iccid",e.data.iccid),Object(l["m"])("new_auth_search_iccid",e.data.iccid),localStorage.setItem("currentType","card"),1===e.data.status?i.$router.push({path:"/weixin/card/usage"}):2===e.data.status?(Object(l["m"])("check_realNameSource",e.data.source),Object(l["k"])({type:3,iccid:e.data.iccid}),i.$router.push({path:"/weixin/new_card/real_name"})):3===e.data.status&&(Object(l["k"])({type:3,iccid:e.data.iccid}),i.$router.push({path:"/weixin/card/plan_list",query:{type:1}}))):Object(n["a"])({message:e.msg})})},scanIccid:function(){var e=this;"wechat"===this.client_type?this.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(t){var c=t.resultStr;c.indexOf(",")>-1&&(c=c.substr(c.indexOf(",")+1,c.length)),e.iccid=c.replace(/\s*/g,""),e.processCheckIccid(e.iccid)}}):"alipay"===this.client_type&&ap.scan(function(t){var c=t.code;e.iccid=c.replace(/\s*/g,""),e.processCheckIccid(e.iccid)})},inArray:function(e,t,c){return null==t?-1:t.indexOf(e,c)},compare:function(e){return function(t,c){var i=t[e],a=c[e];return a-i}},checkSearchIccid:function(e){var t=e.replace(/\s/g,"");return t?(t.length<19||t.length>20||"89"!==t.substr(0,2))&&11!==t.length&&13!==t.length&&15!==t.length&&16!==t.length?{state:0,msg:"ICCID有误,请检查"}:/^[a-zA-Z0-9]+$/.test(t)?{state:1}:{state:0,msg:"ICCID有误,请检查"}:{state:0,msg:"请输入ICCID"}},deleteIccid:function(e){for(var t=-1,c=0;c<this.recording_list.length;c++)if(this.recording_list[c].iccid===e){t=c;break}t>=0&&(this.recording_list.splice(t,1),Object(l["m"])("recording_list",this.recording_list,"arr",!0)),this.recording_list.length||(this.recording_show=!1)},handleIccidFocus:function(){this.iccid?this.showClearBtn=!0:this.showClearBtn=!1},clearInputIccid:function(){this.iccid="",this.$refs.iccidDom.focus(),this.showClearBtn=!1},iccidBlur:function(){this.showClearBtn=!1},debounce:function(e,t){var c,i=this;return function(){for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];c&&clearTimeout(c),c=setTimeout(function(){e.apply(i,n)},t)}}}},k=y,O=(c("e0b1"),Object(v["a"])(k,i,a,!1,null,null,null));O.options.__file="lookup.vue";t["default"]=O.exports},"75b0":function(e,t,c){},a481:function(e,t,c){c("214f")("replace",2,function(e,t,c){return[function(i,a){"use strict";var n=e(this),s=void 0==i?void 0:i[t];return void 0!==s?s.call(i,n,a):c.call(String(n),i,a)},c]})},aa77:function(e,t,c){var i=c("5ca1"),a=c("be13"),n=c("79e5"),s=c("fdef"),r="["+s+"]",o="​",l=RegExp("^"+r+r+"*"),d=RegExp(r+r+"*$"),u=function(e,t,c){var a={},r=n(function(){return!!s[e]()||o[e]()!=o}),l=a[e]=r?t(p):s[e];c&&(a[c]=l),i(i.P+i.F*r,"String",a)},p=u.trim=function(e,t){return e=String(a(e)),1&t&&(e=e.replace(l,"")),2&t&&(e=e.replace(d,"")),e};e.exports=u},b258:function(e,t,c){},c520:function(e,t,c){},c5f6:function(e,t,c){"use strict";var i=c("7726"),a=c("69a8"),n=c("2d95"),s=c("5dbc"),r=c("6a99"),o=c("79e5"),l=c("9093").f,d=c("11e9").f,u=c("86cc").f,p=c("aa77").trim,h="Number",f=i[h],m=f,_=f.prototype,v=n(c("2aeb")(_))==h,g="trim"in String.prototype,b=function(e){var t=r(e,!1);if("string"==typeof t&&t.length>2){t=g?t.trim():p(t,3);var c,i,a,n=t.charCodeAt(0);if(43===n||45===n){if(c=t.charCodeAt(2),88===c||120===c)return NaN}else if(48===n){switch(t.charCodeAt(1)){case 66:case 98:i=2,a=49;break;case 79:case 111:i=8,a=55;break;default:return+t}for(var s,o=t.slice(2),l=0,d=o.length;l<d;l++)if(s=o.charCodeAt(l),s<48||s>a)return NaN;return parseInt(o,i)}}return+t};if(!f(" 0o1")||!f("0b1")||f("+0x1")){f=function(e){var t=arguments.length<1?0:e,c=this;return c instanceof f&&(v?o(function(){_.valueOf.call(c)}):n(c)!=h)?s(new m(b(t)),c,f):b(t)};for(var w,y=c("9e1e")?l(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;y.length>k;k++)a(m,w=y[k])&&!a(f,w)&&u(f,w,d(m,w));f.prototype=_,_.constructor=f,c("2aba")(i,h,f)}},d399:function(e,t,c){"use strict";var i=c("1988"),a=c("2b0e"),n=c("fe7e"),s=c("6605"),r=["success","fail","loading"],o=Object(n["a"])({render:function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("transition",{attrs:{name:"van-fade"}},[c("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],class:e.b([e.style,e.position])},["text"===e.style?c("div",[e._v(e._s(e.message))]):e._e(),"html"===e.style?c("div",{domProps:{innerHTML:e._s(e.message)}}):e._e(),"default"===e.style?["loading"===e.type?c("loading",{attrs:{color:"white",type:e.loadingType}}):c("icon",{class:e.b("icon"),attrs:{name:e.type}}),e.isDef(e.message)?c("div",{class:e.b("text")},[e._v("\n        "+e._s(e.message)+"\n      ")]):e._e()]:e._e()],2)])},name:"toast",mixins:[s["a"]],props:{forbidClick:Boolean,message:[String,Number],type:{type:String,default:"text"},loadingType:{type:String,default:"circular"},position:{type:String,default:"middle"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},computed:{style:function(){return-1!==r.indexOf(this.type)?"default":this.type}},mounted:function(){this.toggleClickale()},destroyed:function(){this.toggleClickale()},watch:{value:function(){this.toggleClickale()},forbidClick:function(){this.toggleClickale()}},methods:{toggleClickale:function(){var e=this.value&&this.forbidClick;if(this.clickable!==e){this.clickable=e;var t=e?"add":"remove";document.body.classList[t]("van-toast--unclickable")}}}}),l=c("a142"),d={type:"text",mask:!1,message:"",value:!0,duration:3e3,position:"middle",loadingType:"circular",forbidClick:!1,overlayStyle:{}},u=function(e){return Object(l["d"])(e)?e:{message:e}},p=[],h=!0,f=Object(i["a"])({},d);function m(){if(l["e"])return{};if(!p.length||!h){var e=new(a["default"].extend(o))({el:document.createElement("div")});document.body.appendChild(e.$el),p.push(e)}return p[p.length-1]}function _(e){return e.overlay=e.mask,e}function v(e){void 0===e&&(e={});var t=m();return e=Object(i["a"])({},f,u(e),{clear:function(){t.value=!1,h||l["e"]||(document.body.removeChild(t.$el),t.$destroy())}}),Object(i["a"])(t,_(e)),clearTimeout(t.timer),e.duration>0&&(t.timer=setTimeout(function(){t.clear()},e.duration)),t}var g=function(e){return function(t){return v(Object(i["a"])({type:e},u(t)))}};["loading","success","fail"].forEach(function(e){v[e]=g(e)}),v.clear=function(e){p.length&&(e?(p.forEach(function(e){e.clear()}),p=[]):h?p[0].clear():p.shift().clear())},v.setDefaultOptions=function(e){Object(i["a"])(f,e)},v.resetDefaultOptions=function(){f=Object(i["a"])({},d)},v.allowMultiple=function(e){void 0===e&&(e=!0),h=!e},v.install=function(){a["default"].use(o)},a["default"].prototype.$toast=v;t["a"]=v},d9ae:function(e,t,c){"use strict";var i=c("dca3"),a=c.n(i);a.a},dca3:function(e,t,c){},e0b1:function(e,t,c){"use strict";var i=c("c520"),a=c.n(i);a.a},e7e5:function(e,t,c){"use strict";c("68ef"),c("4d75"),c("b258")},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=card_lookup.3d71b36e.js.map