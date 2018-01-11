// //获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [{
      icon: '../../../image/iconfont-dingdan.png',
      text: '我的U单',
      isunread: true,
      unreadNum: 2
    }, {
        icon: '../../../image/iconfont-card.png',
      text: '我的代金券',
      isunread: false,
      unreadNum: 2
    }, {
        icon: '../../../image/iconfont-icontuan.png',
      text: '我的拼团',
      isunread: true,
      unreadNum: 1
    }, {
        icon: '../../../image/iconfont-shouhuodizhi.png',
      text: '收货地址管理'
    }, {
        icon: '../../../image/iconfont-kefu.png',
      text: '联系客服'
    }, {
        icon: '../../../image/iconfont-help.png',
      text: '常见问题'
    }]
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    // wx.getUserInfo({
    //   success: function (res) {
    //     that.setData({
    //     userInfo: res.userInfo
    //   })
    //   }
    // })
  }
})