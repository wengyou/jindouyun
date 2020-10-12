export default {
  pages: [
    // 'pages/index/index',
    'pages/workbench/workbench',
    'pages/orderRecord/orderRecord',
    'pages/storeOperate/storeOperate',
    'pages/mine/mine',
    'pages/orderDetail/orderDetail',
    'pages/totalOrder/totalOrder',
    'pages/account/account',
    'pages/goodsManage/goodsManage',
    'pages/buildGoods/buildGoods',
    'pages/shopInfo/shopInfo',
    'pages/updateGoods/updateGoods'
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
      pagePath: 'pages/workbench/workbench',
      'iconPath': "./assets/images/workbench_0.png",
      'selectedIconPath': "./assets/images/workbench_1.png",
      text: "工作台"
    }, {
      pagePath: "pages/orderRecord/orderRecord",
      'iconPath': "./assets/images/orderRecord_0.png",
      'selectedIconPath': "./assets/images/orderRecord_1.png",
      text: "订单记录"
    }, {
      pagePath: "pages/storeOperate/storeOperate",
      'iconPath': "./assets/images/shopOperate_0.png",
      'selectedIconPath': "./assets/images/shopOperate_1.png",
      text: "门店运营"
    }, {
      pagePath: "pages/mine/mine",
      'iconPath': "./assets/images/mine_0.png",
      'selectedIconPath': "./assets/images/mine_1.png",
      text: "我的"
    }]
  }
}
