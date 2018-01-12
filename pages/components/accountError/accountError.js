// pages/components/accountError/accountError.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnHidden:false,
    text:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var status = options.status;
    // 用户登陆审批状态，0 - 未提交，1 - 待审批，2 - 拒绝，3 - 通过
    var text;
    var hidden=true;
    if(status==0){
      text="您还未提交审批登陆权限，请点击以下按钮提交！";
      hidden=false;
    }
    if (status == 1) {
      text = "您的登陆权限正在审批中，请稍等！";
    }
    if (status == 2) {
      text = "您的登陆权限审批已被拒绝，点击以下按钮重新提交！";
      hidden = false;
    }
    this.setData({
      text:text,
      btnHidden: hidden
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loginSubmit: function(){
    this.setData({
      btnHidden: true,
      text : "您的登陆权限正在审批中，请稍等！"
    })
  }
})