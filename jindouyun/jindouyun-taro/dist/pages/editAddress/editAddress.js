(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[19],{130:function(e,t,a){},154:function(e,t,a){"use strict";a.r(t);var s=a(4),d=a(3),n=a(7),i=a(0),l=a.n(i),r=a(2),u=a.n(r),c=a(9),o=a(1),f=a(6),b=a(10),g=(a(23),a(130),function(e){var t=e.addressIndex,a=e.addressList,s=e.saveAddress,r=e.addAddressFlag,c=e.fetchAddress,b=e.saveAddressFlag,g=e.addressDetail,A=e.addressId,m=e.fetchAddressDetail;Object(i["useEffect"])((function(){c()}),[b]),Object(i["useEffect"])((function(){""!==A&&m(A)}),[A]);var D=Object(i["useState"])({name:"newAddress"!==r?g.name:"",tel:"newAddress"!==r?g.tel:"",building:"newAddress"!==r?g.building:"",addressDetail:"newAddress"!==r?g.addressDetail:"",isDefault:"newAddress"===r||g.isDefault}),h=Object(n["a"])(D,2),p=h[0],v=h[1];return Object(i["useEffect"])((function(){"{}"!==JSON.stringify(g)&&v({name:g.name,tel:g.tel,building:g.building,addressDetail:g.addressDetail,isDefault:g.isDefault})}),[g]),l.a.createElement(o["View"],null,l.a.createElement(f["AtForm"],{key:g.id},l.a.createElement(f["AtInput"],{name:"name",title:"\u6536\u4ef6\u4eba",type:"text",value:p.name,onChange:function(e){v(Object(d["a"])(Object(d["a"])({},p),{},{name:e}))}}),l.a.createElement(f["AtInput"],{name:"phone",title:"\u7535\u8bdd\u53f7\u7801",type:"phone",value:p.tel,onChange:function(e){v(Object(d["a"])(Object(d["a"])({},p),{},{tel:e}))}}),l.a.createElement(f["AtInput"],{name:"building",title:"\u697c\u680b\u53f7",type:"number",value:p.building,placeholder:"\u53ea\u586b\u6570\u5b57\u5373\u53ef\uff0c\u4f8b\u598219\u680b\uff0c\u586b\u519919",onChange:function(e){v(Object(d["a"])(Object(d["a"])({},p),{},{building:e}))}}),l.a.createElement(f["AtInput"],{name:"address",title:"\u6536\u8d27\u5730\u5740",type:"text",value:p.addressDetail,placeholder:"\u4f8b\uff1a19\u680b\u5174\u4e1a\u82d13\u820d606",onChange:function(e){v(Object(d["a"])(Object(d["a"])({},p),{},{addressDetail:e}))}})),l.a.createElement(f["AtRadio"],{options:[{label:"\u8bbe\u7f6e\u4e3a\u9ed8\u8ba4\u5730\u5740",value:!0},{label:"\u4e0d\u8bbe\u7f6e\u4e3a\u9ed8\u8ba4\u5730\u5740",value:!1}],value:p.isDefault,onClick:function(e){return v(Object(d["a"])(Object(d["a"])({},p),{},{isDefault:e}))}}),l.a.createElement(o["View"],{className:"save-address",onClick:function(){""===p.addressDetail&&u.a.showToast({title:"\u6536\u8d27\u5730\u5740\u4e3a\u7a7a"}),""===p.building&&u.a.showToast({title:"\u697c\u680b\u4e3a\u7a7a"}),11!==p.tel.toString().length&&u.a.showToast({title:"\u624b\u673a\u53f7\u9519\u8bef"}),""===p.tel&&u.a.showToast({title:"\u624b\u673a\u53f7\u4e3a\u7a7a"}),""===p.name&&u.a.showToast({title:"\u6536\u4ef6\u4eba\u4e3a\u7a7a"}),s("newAddress"!==r?{name:p.name,tel:p.tel,building:p.building,addressDetail:p.addressDetail,isDefault:p.isDefault,id:a[t].id}:p)}},"\u4fdd\u5b58"))}),A=Object(c["b"])((function(e){return{addressIndex:e.userInfo.addressIndex,addressList:e.userInfo.addressList,addAddressFlag:e.userInfo.addAddressFlag,saveAddressFlag:e.userInfo.saveAddressFlag,addressDetail:e.userInfo.addressDetail,addressId:e.userInfo.addressId}}),(function(e){return{saveAddress:function(t){e(b["j"](t))},fetchAddress:function(){e(b["c"]())},fetchAddressDetail:function(t){e(b["d"](t))}}}))(g),m={navigationBarTitleText:"\u7f16\u8f91\u6536\u8d27\u5730\u5740",backgroundColor:"#fdb200",navigationBarTextStyle:"white",navigationBarBackgroundColor:"#fdb200"};Page(Object(s["createPageConfig"])(A,"pages/editAddress/editAddress",{},m||{}))}},[[154,0,1,2,3]]]);