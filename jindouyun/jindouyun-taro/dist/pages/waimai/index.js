(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[42],{114:function(e,a,t){},149:function(e,a,t){"use strict";t.r(a);var n=t(4),c=t(7),r=t(0),i=t.n(r),l=t(2),o=t(9),s=t(1),m=t(6),w=(t(114),t(29)),f=t(49),d=t(18),u=t(11),_=function(e){var a=e.brandList,t=e.nowPage,n=e.maxPage,o=e.dispatchFetchBrandList,f=Object(r["useState"])(!1),_=Object(c["a"])(f,2),b=_[0],g=_[1],x=Object(r["useState"])(!1),E=Object(c["a"])(x,2),p=E[0],N=E[1];return Object(r["useEffect"])((function(){Object(u["b"])(!0),o({page:1,sort:"name",callback:function(e){return g(e)}})}),[]),Object(l["useReachBottom"])((function(){t<n?(g(!0),N(!1),o({page:t+1,sort:"name",callback:function(e){return g(e)}})):(g(!0),N(!0))})),i.a.createElement(s["View"],null,i.a.createElement(s["View"],{className:"padding_row_s padding_column_xxs"},a.map((function(e){return i.a.createElement(s["View"],{key:e.id,className:"padding_xxs margin_column_xxs bgc_white flex border_10",onClick:function(){return Object(d["f"])(e.id,e.name)}},i.a.createElement(s["Image"],{className:"wai_item_img flex_grow_shrink bgc_f4",src:e.picUrl}),i.a.createElement(s["View"],{className:"flex_grow padding_xs flex direction_column min-width"},i.a.createElement(s["View"],{className:"flex_grow"},i.a.createElement(s["View"],{className:"flex between"},i.a.createElement(s["View"],{className:"fontS_28"},e.name),i.a.createElement(s["View"],{className:"flex center"},i.a.createElement(m["AtIcon"],{value:"star-2",size:"8",color:"#fdb200"}),i.a.createElement(s["View"],{className:"fontC_orange fontS_20"},"5.0"))),i.a.createElement(s["View"],{className:"fontC_91 fontS_20 flex"},i.a.createElement(s["Text"],{className:"ellipsis"},e.desc)),i.a.createElement(s["View"],{className:"flex"},e.couponList.map((function(e){return i.a.createElement(s["View"],{key:e.name,className:"border_yellow border_10 padding_row_xxs wai_item_tag fontS_20 fontC_yellow flex center"},e.name)})))),i.a.createElement(s["View"],{className:"fontS_20 flex between"},i.a.createElement(s["View"],{className:"fontC_orange"},i.a.createElement(s["Text"],null,"\u8d77\u9001 \xa5",e.deliveryPrice),i.a.createElement(s["Text"],{className:"padding_row_xxs"},"\u4eba\u5747 \xa5",0===e.totalOrder?0:Math.floor(e.totalTurnover/e.totalOrder))),i.a.createElement(s["View"],{className:"fontC_91"},i.a.createElement(s["Text"],null,"\u8425\u4e1a\u65f6\u95f4 ",e.startTime,":00 - ",e.endTime,":00")))))})),i.a.createElement(w["a"],{showLoad:b,showNoMore:p})))},b=Object(o["b"])((function(e){return{brandList:e.waimai.brandList,brandTotal:e.waimai.brandTotal,nowPage:e.waimai.nowPage,maxPage:e.waimai.maxPage}}),(function(e){return{dispatchFetchBrandList:function(a){e(Object(f["b"])(a))}}}))(_),g={navigationBarTitleText:"\u5916\u5356",backgroundColor:"#fdb200",navigationBarTextStyle:"white",navigationBarBackgroundColor:"#fdb200"};Page(Object(n["createPageConfig"])(b,"pages/waimai/index",{},g||{}))}},[[149,0,1,2,3]]]);