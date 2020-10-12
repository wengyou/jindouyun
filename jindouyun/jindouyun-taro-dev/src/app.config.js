export default {
  pages: [
    'pages/zhubajie/index',
    'pages/sunwukong/index',
    'pages/shawujing/index',
    'pages/tangseng/index',
    'pages/index/index',
    'pages/order/order',
    'pages/userInfo/userInfo'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    backgroundColor: '#CDCDCD'
  },
  tabBar: {
    color: "#999999",
    selectedColor: "#499b85",
    backgroundColor: "#FFFFFF",
    borderStyle: 'black',
    list: [{
      pagePath: 'pages/zhubajie/index',
      'iconPath': "./assets/images/zhubajie_0.png",
      'selectedIconPath': "./assets/images/zhubajie_1.png",
      text: "校园购"
    }, {
      pagePath: "pages/sunwukong/index",
      'iconPath': "./assets/images/sunwukong_0.png",
      'selectedIconPath': "./assets/images/sunwukong_1.png",
      text: "快递"
    }, {
      pagePath: "pages/shawujing/index",
      'iconPath': "./assets/images/shawujing_0.png",
      'selectedIconPath': "./assets/images/shawujing_1.png",
      text: "购物车"
    }, {
      pagePath: "pages/tangseng/index",
      'iconPath': "./assets/images/tangseng_0.png",
      'selectedIconPath': "./assets/images/tangseng_1.png",
      text: "我的"
    }]
  }
}
