(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_change_network"],{"52eb":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"change-net-wrap"},[i("div",{staticClass:"bg-net"}),e._m(0),i("button",{attrs:{disabled:e.disabled},on:{click:e.changeNetwork}},[e._v("切换线路")])])},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tip-wrap"},[i("p",[e._v("请先检查当前网络信号是否正常,用量是否已超过限速规则。")]),i("p",[e._v("网速慢的原因：")]),i("p",[e._v("1、运营商同一条线路使用人数过多时,会造成网络拥堵,网速变慢.可操作切换线路提升网速；")]),i("p",[e._v("2、如果切换线路后网速仍然较慢,有可能当前线路也处于拥堵状态；")]),i("p",[e._v("3、用网高峰时间段,网速会受到当地运营商环境限制；")])])}],c=i("a322"),o=(i("7f7f"),i("e7e5"),i("d399")),s=i("35df"),l=i("db04"),r={name:"network",data:function(){return{disabled:!1,iccid:Object(s["i"])("check_iccid")}},components:Object(c["a"])({},o["a"].name,o["a"]),methods:{changeNetwork:function(){var e=this,t=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),this.disabled=!0,Object(l["b"])("/api/v1/app/cards/activated",{iccid:this.iccid}).then(function(i){e.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1}),e.disabled=!1,1===i.state?(o["a"].success("修改网络成功,请重启设备"),setTimeout(function(){t.$router.push({path:"/mifi/card/index"})},2e3)):o["a"].fail(i.msg)})}}},u=r,d=(i("810d"),i("2877")),f=Object(d["a"])(u,n,a,!1,null,null,null);f.options.__file="change_net.vue";t["default"]=f.exports},"810d":function(e,t,i){"use strict";var n=i("9fbd"),a=i.n(n);a.a},"9fbd":function(e,t,i){},b258:function(e,t,i){},d399:function(e,t,i){"use strict";var n=i("1988"),a=i("2b0e"),c=i("fe7e"),o=i("6605"),s=["success","fail","loading"],l=Object(c["a"])({render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:"van-fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],class:e.b([e.style,e.position])},["text"===e.style?i("div",[e._v(e._s(e.message))]):e._e(),"html"===e.style?i("div",{domProps:{innerHTML:e._s(e.message)}}):e._e(),"default"===e.style?["loading"===e.type?i("loading",{attrs:{color:"white",type:e.loadingType}}):i("icon",{class:e.b("icon"),attrs:{name:e.type}}),e.isDef(e.message)?i("div",{class:e.b("text")},[e._v("\n        "+e._s(e.message)+"\n      ")]):e._e()]:e._e()],2)])},name:"toast",mixins:[o["a"]],props:{forbidClick:Boolean,message:[String,Number],type:{type:String,default:"text"},loadingType:{type:String,default:"circular"},position:{type:String,default:"middle"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},computed:{style:function(){return-1!==s.indexOf(this.type)?"default":this.type}},mounted:function(){this.toggleClickale()},destroyed:function(){this.toggleClickale()},watch:{value:function(){this.toggleClickale()},forbidClick:function(){this.toggleClickale()}},methods:{toggleClickale:function(){var e=this.value&&this.forbidClick;if(this.clickable!==e){this.clickable=e;var t=e?"add":"remove";document.body.classList[t]("van-toast--unclickable")}}}}),r=i("a142"),u={type:"text",mask:!1,message:"",value:!0,duration:3e3,position:"middle",loadingType:"circular",forbidClick:!1,overlayStyle:{}},d=function(e){return Object(r["d"])(e)?e:{message:e}},f=[],m=!0,p=Object(n["a"])({},u);function v(){if(r["e"])return{};if(!f.length||!m){var e=new(a["default"].extend(l))({el:document.createElement("div")});document.body.appendChild(e.$el),f.push(e)}return f[f.length-1]}function h(e){return e.overlay=e.mask,e}function b(e){void 0===e&&(e={});var t=v();return e=Object(n["a"])({},p,d(e),{clear:function(){t.value=!1,m||r["e"]||(document.body.removeChild(t.$el),t.$destroy())}}),Object(n["a"])(t,h(e)),clearTimeout(t.timer),e.duration>0&&(t.timer=setTimeout(function(){t.clear()},e.duration)),t}var g=function(e){return function(t){return b(Object(n["a"])({type:e},d(t)))}};["loading","success","fail"].forEach(function(e){b[e]=g(e)}),b.clear=function(e){f.length&&(e?(f.forEach(function(e){e.clear()}),f=[]):m?f[0].clear():f.shift().clear())},b.setDefaultOptions=function(e){Object(n["a"])(p,e)},b.resetDefaultOptions=function(){p=Object(n["a"])({},u)},b.allowMultiple=function(e){void 0===e&&(e=!0),m=!e},b.install=function(){a["default"].use(l)},a["default"].prototype.$toast=b;t["a"]=b},e7e5:function(e,t,i){"use strict";i("68ef"),i("4d75"),i("b258")}}]);
//# sourceMappingURL=mifi_change_network.5324ff8f.js.map