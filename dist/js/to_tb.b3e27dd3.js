(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["to_tb"],{"8a58":function(t,e,i){"use strict";i("68ef"),i("4d75")},"8e7a":function(t,e,i){"use strict";i.r(e);var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"toAli-wrap"},[i("div",[t._m(0),t._m(1),i("div",{staticClass:"qr-img-wrap"},[i("img",{attrs:{src:t.qrSrc,alt:"实名二维码"}})]),i("img",{attrs:{src:"",alt:""}}),t._m(2)])])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"browser-wrap"},[i("p",[t._v("点击右上角选择浏览器打开后，")]),i("p",[t._v("进入手机淘宝提交实名身份信息。")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"qrCode-wrap"},[i("p",[t._v("或者保存二维码,在手机淘宝扫描二维码")]),i("p",[t._v("进行实名认证（长按保存）")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("p",{staticClass:"footer-wrap"},[i("span",{staticClass:"iconfont icon-tao"}),t._v("\n            阿里认证，隐私无忧\n        ")])}],r=i("a322"),c=(i("8a58"),i("e41f")),o=(i("7f7f"),i("9a83"),i("f564")),u=i("35df"),l=(i("db04"),{name:"home",data:function(){return{iccid:"",imei:"",qrSrc:"",source:""}},components:(n={},Object(r["a"])(n,o["a"].name,o["a"]),Object(r["a"])(n,c["a"].name,c["a"]),n),created:function(){this.iccid=Object(u["f"])("iccid"),this.imei=Object(u["f"])("imei"),this.source=Object(u["f"])("source"),this.qrSrc="http://cardserver_test.china-m2m.com/qrcode?iccid="+this.iccid+"&imei="+this.imei},mounted:function(){},methods:{login:function(){}}}),f=l,d=(i("bda9"),i("2877")),p=Object(d["a"])(f,a,s,!1,null,null,null);p.options.__file="to_tb.vue";e["default"]=p.exports},"9da7":function(t,e,i){},bda9:function(t,e,i){"use strict";var n=i("9da7"),a=i.n(n);a.a},e41f:function(t,e,i){"use strict";var n=i("fe7e"),a=i("6605");e["a"]=Object(n["a"])({render:function(){var t,e=this,i=e.$createElement,n=e._self._c||i;return n("transition",{attrs:{name:e.currentTransition}},[e.shouldRender?n("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],class:e.b((t={},t[e.position]=e.position,t))},[e._t("default")],2):e._e()])},name:"popup",mixins:[a["a"]],props:{position:String,transition:String,overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},computed:{currentTransition:function(){return this.transition||(this.position?"popup-slide-"+this.position:"van-fade")}}})}}]);
//# sourceMappingURL=to_tb.b3e27dd3.js.map