(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[27],{129:function(e,n,a){},153:function(e,n,a){"use strict";a.r(n);var s=a(4),d=a(0),t=a.n(d),r=a(2),i=a.n(r),o=a(9),c=a(1),l=a(10),u=a(23),g=(a(129),function(e){var n=e.addressList,a=e.sendAddFlag,s=(e.loginFlag,e.fetchAddress),r=e.saveAddressFlag;return Object(d["useEffect"])((function(){s()}),[r]),t.a.createElement(c["View"],null,0!==n.length&&n.map((function(e,n){return t.a.createElement(u["a"],{parent:"myAddress",data:e,index:n})})),t.a.createElement(c["View"],{className:"add-address",onClick:function(){a("newAddress"),i.a.navigateTo({url:"../editAddress/editAddress"})}},"\u6dfb\u52a0\u5730\u5740"))}),f=Object(o["b"])((function(e){return{addressList:e.userInfo.addressList,loginFlag:e.userInfo.loginFlag,saveAddressFlag:e.userInfo.saveAddressFlag}}),(function(e){return{sendAddFlag:function(n){e(l["l"](n))},fetchAddress:function(){e(l["c"]())}}}))(g),A={navigationBarTitleText:"\u6211\u7684\u5730\u5740",backgroundColor:"#fdb200",navigationBarTextStyle:"white",navigationBarBackgroundColor:"#fdb200"};Page(Object(s["createPageConfig"])(f,"pages/myAddress/myAddress",{},A||{}))}},[[153,0,1,2,3]]]);