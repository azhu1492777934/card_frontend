(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["salesRecords"],{2994:function(t,e,r){"use strict";r("68ef"),r("c0c2")},"2bdd":function(t,e,r){"use strict";var n=r("fe7e"),i=r("023d"),o=r("db78");e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:t.b()},[t._t("default"),t.loading?r("div",{class:t.b("loading")},[t._t("loading",[r("loading",{class:t.b("loading-icon")}),r("span",{class:t.b("loading-text")},[t._v(t._s(t.loadingText||t.$t("loadingTip")))])])],2):t._e(),t.finished&&t.finishedText?r("div",{class:t.b("finished-text")},[t._v("\n    "+t._s(t.finishedText)+"\n  ")]):t._e()],2)},name:"list",model:{prop:"loading"},props:{loading:Boolean,finished:Boolean,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:Number,default:300}},mounted:function(){this.scroller=i["a"].getScrollEventTarget(this.$el),this.handler(!0),this.immediateCheck&&this.$nextTick(this.check)},destroyed:function(){this.handler(!1)},activated:function(){this.handler(!0)},deactivated:function(){this.handler(!1)},watch:{loading:function(){this.$nextTick(this.check)},finished:function(){this.$nextTick(this.check)}},methods:{check:function(){if(!this.loading&&!this.finished){var t=this.$el,e=this.scroller,r=i["a"].getVisibleHeight(e);if(r&&"none"!==i["a"].getComputedStyle(t).display&&null!==t.offsetParent){var n=i["a"].getScrollTop(e),o=n+r,a=!1;if(t===e)a=e.scrollHeight-o<this.offset;else{var s=i["a"].getElementTop(t)-i["a"].getElementTop(e)+i["a"].getVisibleHeight(t);a=s-r<this.offset}a&&(this.$emit("input",!0),this.$emit("load"))}}},handler:function(t){this.binded!==t&&(this.binded=t,(t?o["b"]:o["a"])(this.scroller,"scroll",this.check))}}})},3040:function(t,e,r){"use strict";function n(t){return function(){var e=this,r=arguments;return new Promise(function(n,i){var o=t.apply(e,r);function a(t,e){try{var r=o[t](e),a=r.value}catch(t){return void i(t)}r.done?n(a):Promise.resolve(a).then(s,c)}function s(t){a("next",t)}function c(t){a("throw",t)}s()})}}r.d(e,"a",function(){return n})},"416b":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"salesRecord"},[r("div",{ref:"recordList",staticClass:"recordBox"},[r("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.getRecord},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.recordList,function(e,n){return r("div",{key:n,staticClass:"rechargeRecordItem"},[r("div",[r("div",[t._v("设备号："),r("span",[t._v(t._s(e.device_id))])])]),r("div",[r("div",[t._v("姓名："),r("span",[t._v(t._s(e.user_name))])]),r("div",[r("span",[t._v(t._s(e.mobile))])])]),r("div",[r("div",[t._v("地址："+t._s(e.province)+t._s(e.city)+t._s(e.district)+t._s(e.addr))])]),r("div",[r("div",{on:{click:function(r){t.showDetails(e)}}},[t._v("查看详情 >")]),r("div",[t._v("申请时间："+t._s(e.created_at))])])])}))],1),r("div",{ref:"recordButton",staticClass:"buttonBox"},[r("div",{ref:"recordButton",staticClass:"submitButton",on:{click:t.goAddSales}},[t._v("售后申请")])]),r("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:t.isExistOrder,callback:function(e){t.isExistOrder=e},expression:"isExistOrder"}},[r("p",{staticClass:"showTip"},[t._v(t._s(t.load_plan_msg))])]),r("van-popup",{model:{value:t.detailsShow,callback:function(e){t.detailsShow=e},expression:"detailsShow"}},[r("div",{staticClass:"detailsStyle"},[r("div",[r("span",[t._v("申请时间：")]),r("span",[t._v(t._s(t.currentDetails.created_at))])]),r("div",[r("span",[t._v("设 备 号：")]),r("span",[t._v(t._s(t.currentDetails.device_id))])]),r("div",[r("span",[t._v("类 型：")]),r("span",[t._v(t._s(t.currentDetails.type))])]),r("div",[r("span",[t._v("运 单 号：")]),r("span",[t._v(t._s(t.currentDetails.no))])]),r("div",[r("span",[t._v("快 递 名：")]),r("span",[t._v(t._s(t.currentDetails.express_name))])]),r("div",[r("span",[t._v("手 机 号：")]),r("span",[t._v(t._s(t.currentDetails.mobile))])]),r("div",[r("span",[t._v("姓 名：")]),r("span",[t._v(t._s(t.currentDetails.user_name))])]),r("div",[r("span",[t._v("地 址：")]),r("span",[t._v(t._s(t.currentDetails.province)+t._s(t.currentDetails.city)+t._s(t.currentDetails.district))])]),r("div",[r("span",[t._v("详细地址：")]),r("span",[t._v(t._s(t.currentDetails.addr))])]),r("div",[r("span",[t._v("备 注：")]),r("span",[t._v(t._s(t.currentDetails.remark))])])])])],1)},i=[],o=(r("c5f6"),r("96cf"),r("3040")),a=(r("9a83"),r("f564")),s=(r("2994"),r("2bdd")),c=(r("8a58"),r("e41f")),u=r("35df"),l=r("9882"),f={data:function(){return{recordList:[],userInfo:{},isExistOrder:!1,load_plan_msg:"暂无申请记录",loading:!1,finished:!1,offset:0,limit:10,total:0,detailsShow:!1,currentDetails:{}}},components:{vanPopup:c["a"],vanList:s["a"]},created:function(){this.userInfo=Object(u["h"])("userInfo","obj"),this.getRecord()},methods:{dealApi:function(t){var e=t,r=new Promise(function(t,r){e.url(e).then(function(e){1==e.state?t(e):Object(a["a"])({message:e.msg})}).catch(function(t){Object(a["a"])({message:"服务器出小差了，请稍后再试"})})});return r},getRecord:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,r,n,i,o=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=this,!(this.total<=this.recordList.length&&0!=this.recordList.length)){t.next=5;break}return this.finished=!0,this.loading=!1,t.abrupt("return");case 5:return r={url:l["c"],params:{third_id:e.userInfo.account.user_id,offset:e.offset,limit:e.limit}},t.next=8,this.dealApi(r);case 8:if(n=t.sent,e.loading=!1,1==n.state)if(0==n.data.total)e.finished=!0,Object(a["a"])({message:"暂无申请记录"}),e.loading=!1;else if(n.data.total>0&&0==n.data.rows.length)e.finished=!0;else{for(e.offset+=e.limit,e.total=n.data.total,e.recordList=e.recordList.concat(n.data.rows),i=0;i<e.recordList.length;i++)0==e.recordList[i].type?e.recordList[i].type="返修":1==e.recordList[i].type?e.recordList[i].type="换新":2==e.recordList[i].type?e.recordList[i].type="补卡":e.recordList[i].type="翻新";this.$nextTick(function(){var t=document.documentElement.clientHeight||document.body.clientHeight,e=o.$refs.recordButton.offsetHeight,r=Number(Object(u["h"])("userHeight"))||44;o.$refs.recordList.style.height=t-e-r+"px"})}else this.finished=!0,Object(a["a"])({message:n.msg});case 11:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),goAddSales:function(){this.$router.push({path:"addSalesRecords"})},showDetails:function(t){this.detailsShow=!0,this.currentDetails=t}}},h=f,d=(r("4e1c"),r("2877")),p=Object(d["a"])(h,n,i,!1,null,null,null);p.options.__file="salesRecords.vue";e["default"]=p.exports},"4e1c":function(t,e,r){"use strict";var n=r("cd3f"),i=r.n(n);i.a},"8a58":function(t,e,r){"use strict";r("68ef"),r("4d75")},"96cf":function(t,e){!function(e){"use strict";var r,n=Object.prototype,i=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag",u="object"===typeof t,l=e.regeneratorRuntime;if(l)u&&(t.exports=l);else{l=e.regeneratorRuntime=u?t.exports:{},l.wrap=w;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",v={},g={};g[a]=function(){return this};var m=Object.getPrototypeOf,y=m&&m(m(A([])));y&&y!==n&&i.call(y,a)&&(g=y);var _=E.prototype=x.prototype=Object.create(g);L.prototype=_.constructor=E,E.constructor=L,E[c]=L.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===L||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(_),t},l.awrap=function(t){return{__await:t}},k(N.prototype),N.prototype[s]=function(){return this},l.AsyncIterator=N,l.async=function(t,e,r,n){var i=new N(w(t,e,r,n));return l.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},k(_),_[c]="Generator",_[a]=function(){return this},_.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=A,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(I),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,i){return s.type="throw",s.arg=t,e.next=n,i&&(e.method="next",e.arg=r),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=i.call(a,"catchLoc"),u=i.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),I(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;I(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:A(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),v}}}function w(t,e,r,n){var i=e&&e.prototype instanceof x?e:x,o=Object.create(i.prototype),a=new j(n||[]);return o._invoke=O(t,r,a),o}function b(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function x(){}function L(){}function E(){}function k(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function N(t){function e(r,n,o,a){var s=b(t[r],t,n);if("throw"!==s.type){var c=s.arg,u=c.value;return u&&"object"===typeof u&&i.call(u,"__await")?Promise.resolve(u.__await).then(function(t){e("next",t,o,a)},function(t){e("throw",t,o,a)}):Promise.resolve(u).then(function(t){c.value=t,o(c)},a)}a(s.arg)}var r;function n(t,n){function i(){return new Promise(function(r,i){e(t,n,r,i)})}return r=r?r.then(i,i):i()}this._invoke=n}function O(t,e,r){var n=f;return function(i,o){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===i)throw o;return R()}r.method=i,r.arg=o;while(1){var a=r.delegate;if(a){var s=S(a,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var c=b(t,e,r);if("normal"===c.type){if(n=r.done?p:h,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function S(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,S(t,e),"throw"===e.method))return v;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=b(n,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,v;var o=i.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,v):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function A(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){while(++n<t.length)if(i.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return o.next=o}}return{next:R}}function R(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},9882:function(t,e,r){"use strict";r.d(e,"b",function(){return o}),r.d(e,"c",function(){return a}),r.d(e,"a",function(){return s});r("cadf"),r("551c"),r("097d");var n=r("bc3a"),i=r.n(n);i.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8";var o=function(t){return i.a.get("/api/v1/app/cards/refund/list",{params:t.params}).then(function(t){return t}).catch(function(t){return t})},a=function(t){return i.a.get("/kachiApi/v1/after_sale/apply_list",{params:t.params}).then(function(t){return t}).catch(function(t){return t})},s=function(t){return i.a.post("/kachiApi/v1/after_sale/apply",t.params).then(function(t){return t}).catch(function(t){return t})}},aa77:function(t,e,r){var n=r("5ca1"),i=r("be13"),o=r("79e5"),a=r("fdef"),s="["+a+"]",c="​",u=RegExp("^"+s+s+"*"),l=RegExp(s+s+"*$"),f=function(t,e,r){var i={},s=o(function(){return!!a[t]()||c[t]()!=c}),u=i[t]=s?e(h):a[t];r&&(i[r]=u),n(n.P+n.F*s,"String",i)},h=f.trim=function(t,e){return t=String(i(t)),1&e&&(t=t.replace(u,"")),2&e&&(t=t.replace(l,"")),t};t.exports=f},c0c2:function(t,e,r){},c5f6:function(t,e,r){"use strict";var n=r("7726"),i=r("69a8"),o=r("2d95"),a=r("5dbc"),s=r("6a99"),c=r("79e5"),u=r("9093").f,l=r("11e9").f,f=r("86cc").f,h=r("aa77").trim,d="Number",p=n[d],v=p,g=p.prototype,m=o(r("2aeb")(g))==d,y="trim"in String.prototype,_=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){e=y?e.trim():h(e,3);var r,n,i,o=e.charCodeAt(0);if(43===o||45===o){if(r=e.charCodeAt(2),88===r||120===r)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+e}for(var a,c=e.slice(2),u=0,l=c.length;u<l;u++)if(a=c.charCodeAt(u),a<48||a>i)return NaN;return parseInt(c,n)}}return+e};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof p&&(m?c(function(){g.valueOf.call(r)}):o(r)!=d)?a(new v(_(e)),r,p):_(e)};for(var w,b=r("9e1e")?u(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;b.length>x;x++)i(v,w=b[x])&&!i(p,w)&&f(p,w,l(v,w));p.prototype=g,g.constructor=p,r("2aba")(n,d,p)}},cd3f:function(t,e,r){},e41f:function(t,e,r){"use strict";var n=r("fe7e"),i=r("6605");e["a"]=Object(n["a"])({render:function(){var t,e=this,r=e.$createElement,n=e._self._c||r;return n("transition",{attrs:{name:e.currentTransition}},[e.shouldRender?n("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],class:e.b((t={},t[e.position]=e.position,t))},[e._t("default")],2):e._e()])},name:"popup",mixins:[i["a"]],props:{position:String,transition:String,overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},computed:{currentTransition:function(){return this.transition||(this.position?"popup-slide-"+this.position:"van-fade")}}})},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=salesRecords.37da72e7.js.map