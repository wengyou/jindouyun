(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[46],{106:function(e,a,t){},148:function(e,a,t){"use strict";t.r(a);var n=t(4),c=t(7),r=t(0),i=t.n(r),o=t(2),l=t(9),s=t(1),m=t(6),u=(t(106),t(18)),_=t(29),d=t(30),f=t(24),b=function(e){var a=e.banners,t=e.recommendList,n=e.recommendNowPage,l=e.recommendMaxPage,f=e.firstCategory,b=e.dispatchFetchBanner,g=(e.dispatchAddToCart,e.dispatchFetchFirstCategory),w=e.dispatchFetchHotRecommend,h=Object(r["useState"])(!1),x=Object(c["a"])(h,2),p=x[0],E=x[1],N=Object(r["useState"])(!1),j=Object(c["a"])(N,2),C=j[0],V=j[1],z=Object(r["useState"])(!1),O=Object(c["a"])(z,2),k=O[0],S=O[1],y=Object(r["useState"])({}),T=Object(c["a"])(y,2),B=T[0],F=T[1];Object(r["useEffect"])((function(){b(),g(),w({page:1,callback:function(e){return E(e)}})}),[]),Object(o["useReachBottom"])((function(){n<l?(E(!0),V(!1),w({page:n+1,callback:function(e){return E(e)}})):(E(!0),V(!0))}));var P=function(e,a){F({type:e,info:a,page:"other"}),S(!0)},v=function(e){S(e)};return i.a.createElement(s["View"],null,i.a.createElement(s["View"],{className:"bgc_yellow flex center_column padding_row_s zhu_searchbar"},i.a.createElement(s["View"],{onClick:u["d"],className:"zhu_search border_10 flex_grow flex center fontS_24 fontC_70"},i.a.createElement(m["AtIcon"],{value:"search",size:"12"}),i.a.createElement(s["Text"],{className:"padding_row_xxs"},"\u641c\u7d22"))),i.a.createElement(s["View"],{className:"padding_row_s"},i.a.createElement(s["Swiper"],{className:"zhu_swiper border_10 margin_column_xxs",indicatorColor:"#999",indicatorActiveColor:"#FBB300",circular:!0,indicatorDots:!0,autoplay:!0},a.map((function(e){return i.a.createElement(s["SwiperItem"],{key:e.url},i.a.createElement(s["Image"],{className:"zhu_banner_img",src:e.url}))}))),i.a.createElement(s["View"],{className:"margin_column_xxs padding_column_xs bgc_white border_10 flex around"},f.slice(0,4).map((function(e,a){return i.a.createElement(s["View"],{key:e.id,className:"flex direction_column center",onClick:0===a?u["e"]:function(){return Object(u["c"])(e.id,e.name)}},i.a.createElement(s["Image"],{className:"zhu_icon",src:e.iconUrl}),i.a.createElement(s["Text"],{className:"zhu_icon_text fontC_70"},e.name))}))),i.a.createElement(s["View"],{className:"zhu_goods padding_xxs bgc_white border_10"},i.a.createElement(s["View"],{className:"zhu_goods_title"},"\u70ed\u95e8\u63a8\u8350"),i.a.createElement(s["View"],null,i.a.createElement(s["View"],{className:"zhu_item"},t.map((function(e){return i.a.createElement(s["View"],{className:"flex padding_column_xs padding_row_xs"},i.a.createElement(s["Image"],{className:"zhu_item_img border_10 flex_grow_shrink bgc_f4",onClick:function(){return Object(u["b"])(e.id)},src:e.picUrl}),i.a.createElement(s["View"],{className:"flex_grow flex direction_column min-width"},i.a.createElement(s["View"],{className:"flex_grow"},i.a.createElement(s["View"],{className:"padding_row_xs fontS_26 flex"},i.a.createElement(s["Text"],{className:"ellipsis"},e.name)),i.a.createElement(s["View"],{className:"padding_row_xs fontS_20 fontC_91 flex"},i.a.createElement(s["Text"],{className:"ellipsis"},e.brief))),i.a.createElement(s["View"],{className:"flex between center_column"},i.a.createElement(s["View"],{className:"padding_row_xs"},i.a.createElement(s["Text"],{className:"fontC_orange fontS_36"},"\xa5 ",e.nowPrice)),i.a.createElement(s["View"],{className:"flex"},i.a.createElement(s["View"],{className:"zhu_item_btn bgc_yellow fontC_white fontS_24 border_10 flex center margin_row_xs",onClick:function(){return P("add",e)}},"\u6dfb\u52a0"),i.a.createElement(s["View"],{className:"zhu_item_btn bgc_orange fontC_white fontS_24 border_10 flex center",onClick:function(){return P("purchase",e)}},"\u8d2d\u4e70")))))})),i.a.createElement(_["a"],{showLoad:p,showNoMore:C}),i.a.createElement(d["a"],{openAdd:k,callback:function(e){return v(e)},addInfo:B}))))))},g=Object(l["b"])((function(e){return{banners:e.zhubajie.banners,firstCategory:e.zhubajie.firstCategory,recommendNowPage:e.zhubajie.recommendNowPage,recommendMaxPage:e.zhubajie.recommendMaxPage,recommendList:e.zhubajie.recommendList}}),(function(e){return{dispatchFetchBanner:function(){e(Object(f["d"])())},dispatchAddToCart:function(a){e(Object(f["b"])(a))},dispatchFetchFirstCategory:function(){e(Object(f["e"])())},dispatchFetchHotRecommend:function(a){e(Object(f["g"])(a))}}}))(b),w={navigationBarTitleText:"\u6821\u56ed\u8d2d",backgroundColor:"#fdb200",navigationBarTextStyle:"white",navigationBarBackgroundColor:"#fdb200"};Page(Object(n["createPageConfig"])(g,"pages/zhubajie/index",{},w||{}))}},[[148,0,1,2,3]]]);