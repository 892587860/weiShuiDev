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
      unreadNum: 2,
      url: '/pages/components/deptList/deptList'
    }, {
        icon: '../../../image/iconfont-card.png',
        text: '部门管理',
        isunread: false,
        unreadNum: 2,
        url:'/pages/components/deptList/deptList'
    }, {
        icon: '../../../image/iconfont-icontuan.png',
        text: '人力管理',
        isunread: true,
        unreadNum: 1,
        url: '/pages/components/deptList/deptList'
    }, {
        icon: '../../../image/iconfont-shouhuodizhi.png',
        text: '权限管理',
        url: '/pages/components/deptList/deptList'
        
    }, {
        icon: '../../../image/iconfont-kefu.png',
        text: '系统参数设置',
        url: '/pages/components/deptList/deptList'
    }, {
        icon: '../../../image/iconfont-help.png',
        text: '常见问题',
        url: '/pages/components/deptList/deptList'
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
    
  },
  onShow:function(){
    // app.accountStatusJudy();
  }
})