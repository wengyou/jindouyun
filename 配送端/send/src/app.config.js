export default {
  pages: [
    // 'pages/index/index',
    'pages/orderPick/orderPick',
    'pages/data/data',
    'pages/orderManage/orderManage',
    'pages/me/me',
    'pages/userInfo/userInfo',
    'pages/orderDetail/orderDetail'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f4f4f4',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: "#919191",
    selectedColor: "#fdb200",
    backgroundColor: "#FFFFFF",
    borderStyle: 'black',
    list: [{
      pagePath: 'pages/orderPick/orderPick',
      'iconPath': "./assets/images/orderPick_0.png",
      'selectedIconPath': "./assets/images/orderPick_1.png",
      text: "订单接取"
    }, {
      pagePath: "pages/orderManage/orderManage",
      'iconPath': "./assets/images/orderManage_0.png",
      'selectedIconPath': "./assets/images/orderManage_1.png",
      text: "订单管理"
    }, {
      pagePath: "pages/data/data",
      'iconPath': "./assets/images/data_0.png",
      'selectedIconPath': "./assets/images/data_1.png",
      text: "数据"
    }, {
      pagePath: "pages/me/me",
      'iconPath': "./assets/images/me_0.png",
      'selectedIconPath': "./assets/images/me_1.png",
      text: "我的"
    }]
  }
}
