const constants = require('./utils/constants');
var Session = require('./utils/session');
//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    var that = this;
    that.getSessionKeyByLogin();
  },
  onShow: function(){
    console.log('onShow');
  },
  onHide: function(){
    console.log('onHide');
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)//判断是否为方法，是的话,调用cb()方法
    }else{
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          if (res.userInfo){
            typeof cb == "function" && cb(that.globalData.userInfo)
          }else{
            that.getSessionKeyByLogin();
          }
        }
      })
    }
  },
  sendRequest: function (param, customSiteUrl) {
    let that = this;
    let data = param.data || {};
    let header = param.header;
    let requestUrl;

    if (customSiteUrl) {
      requestUrl = customSiteUrl + param.url;
    } else {
      requestUrl = this.globalData.siteBaseUrl + param.url;
    }

    if (param.method) {
      if (param.method.toLowerCase() == 'post') {
        data = this._modifyPostParam(data);
        header = header || {
          'content-type': 'application/x-www-form-urlencoded;'
        }
      }
      param.method = param.method.toUpperCase();
    }

    if (!param.hideLoading) {
      this.showToast({
        title: '请求中...',
        icon: 'loading'
      });
    }
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        wx.request({
          url: requestUrl,
          data: data,
          method: param.method || 'GET',
          header: header || {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.hideToast();
            if (res.statusCode && res.statusCode != 200) {
              that.hideToast();
              that.showModal({
                content: '' + res.errMsg
              });
              typeof param.successStatusAbnormal == 'function' && param.successStatusAbnormal(res.data);
              return;
            }
            typeof param.success == 'function' && param.success(res.data);
          },
          fail: function (res) {
            that.hideToast();
            that.showModal({
              content: '请求失败 ' + res.errMsg
            })
            typeof param.fail == 'function' && param.fail(res.data);
          },
          complete: function (res) {
            param.hideLoading || that.hideToast();
            typeof param.complete == 'function' && param.complete(res.data);
          }
        });
      },
      fail: function () {
        //登录态过期
        //重新登录
        that.getSessionKeyByLogin();
      }
    })
  },
  _modifyPostParam: function (obj) {
    let query = '';
    let name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this._modifyPostParam(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this._modifyPostParam(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  },
  isLogin: function () {
    return this.getIsLogin();
  },
  showToast: function (param) {
    wx.showToast({
      title: param.title,
      icon: param.icon,
      duration: param.duration || 1500,
      success: function (res) {
        typeof param.success == 'function' && param.success(res);
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
  hideToast: function () {
    wx.hideToast();
  },
  showModal: function (param) {
    wx.showModal({
      title: param.title || '提示',
      content: param.content,
      showCancel: param.showCancel || false,
      cancelText: param.cancelText || '取消',
      cancelColor: param.cancelColor || '#000000',
      confirmText: param.confirmText || '确定',
      confirmColor: param.confirmColor || '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          typeof param.confirm == 'function' && param.confirm(res);
        } else {
          typeof param.cancel == 'function' && param.cancel(res);
        }
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
  /**
   *  全局参数get、set部分 start
   *  
   */

  // 获取首页router
  getHomepageRouter: function () {
    return this.globalData.homepageRouter;
  },
  getAppId: function () {
    return this.globalData.appId;
  },
  getDefaultPhoto: function () {
    return this.globalData.defaultPhoto;
  },
  getSessionKey: function () {
    return this.globalData.sessionKey;
  },
  getHeader: function () {
    return this.globalData.header;
  },
  setSessionKey: function (session_key) {
    this.globalData.sessionKey = session_key;
    this.globalData.header.Cookie = 'JSESSIONID=' + session_key;
    wx.setStorage({
      key: 'mask_session_key',
      data: session_key
    })
    wx.setStorage({
      key: 'Cookie',
      data: 'JSESSIONID='+session_key
    })
    // Session.set(data.session);
    // wx.setStorageSync('session_key', session_key);
  },
  setUserInfoStorage: function (info) {
    for (var key in info) {
      this.globalData.userInfo[key] = info[key];
    }
    wx.setStorage({
      key: 'userInfo',
      data: this.globalData.userInfo
    })
  },
  setPageUserInfo: function () {
    let currentPage = this.getAppCurrentPage();
    let newdata = {};

    newdata['userInfo'] = this.getUserInfo();
    currentPage.setData(newdata);
  },
  
  getAppTitle: function () {
    return this.globalData.appTitle;
  },
  getAppDescription: function () {
    return this.globalData.appDescription;
  },
  setLocationInfo: function (info) {
    this.globalData.locationInfo = info;
  },
  getLocationInfo: function () {
    return this.globalData.locationInfo;
  },
  getSiteBaseUrl: function () {
    return this.globalData.siteBaseUrl;
  },
  getSystemInfoData: function () {
    let res;
    if (this.globalData.systemInfo) {
      return this.globalData.systemInfo;
    }
    try {
      res = this.getSystemInfoSync();
      this.setSystemInfoData(res);
    } catch (e) {
      this.showModal({
        content: '获取系统信息失败 请稍后再试'
      })
    }
    return res || {};
  },
  setSystemInfoData: function (res) {
    this.globalData.systemInfo = res;
  },
  setAccountApprovalStatus: function (res) {
    this.globalData.accountApprovalStatus=res;
  },
  getAccountApprovalStatus:function(){
    return this.globalData.accountApprovalStatus;
  },
  getSessionKeyByLogin: function () {
    var that = this;
    wx.clearStorage();
    wx.login({
      success: function (r) {
        var code = r.code;//登录凭证
        
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function (res) {
              // that.globalData.userInfo = res.userInfo;
              that.setUserInfoStorage(res.userInfo);
              console.log("encryptedData=" + res.encryptedData);
              console.log("iv=" + res.iv);
              console.log("code=" + code);
              //3.解密用户信息 获取unionId

              that.sendRequest({
                url: '/auth/tologin.do',
                data: {
                  "jsCode": code,
                  "encryptedData": res.encryptedData,
                  "iv": res.iv
                },
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  var maskSessionKey = res.maskSessionKey;
                  var approvalStatus = res.approvalStatus;
                  console.log("data=" + res);
                  that.setSessionKey(maskSessionKey);
                  that.setAccountApprovalStatus(approvalStatus);
                  // wx.showToast({
                  //   title: '成功',
                  //   icon: 'success',
                  //   duration: 2000
                  // })
                }
              })

            },
            fail: function () {
              console.log('获取用户信息失败')
            },
            complete: function(){
              console.log(33);
            }
          })

        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      }

    });
  },
  accountStatusJudy:function(){
    var that=this;
    // 用户登陆审批状态，0 - 未提交，1 - 待审批，2 - 拒绝，3 - 通过
    var accountApprovalStatus = that.getAccountApprovalStatus();
    if (accountApprovalStatus != 3) {
      wx.navigateTo({
        url: '/pages/components/accountError/accountError?status=' + accountApprovalStatus,
      })
    }
    
  },
  globalData: {
    header: { 'Cookie': '','content-type': 'application/x-www-form-urlencoded'},
    accountApprovalStatus : -1,
    tabBarPagePathArr: '["/pages/page10000/page10000","/pages/page10010/page10010","/pages/page10013/page10013","/pages/page10009/page10009"]',
    homepageRouter: 'page10000',
    formData: null,
    userInfo: {},
    systemInfo: null,
    sessionKey: '',
    notBindXcxAppId: false,
    waimaiTotalNum: 0,
    waimaiTotalPrice: 0,
    takeoutLocate: {},
    takeoutRefresh: false,
    isLogin: false,
    locationInfo: {
      latitude: '',
      longitude: '',
      address: ''
    },
    PromotionUserToken: '',
    previewGoodsOrderGoodsInfo: [],
    goodsAdditionalInfo: {},
    urlLocationId: '',
    wxParseOldPattern: '_listVesselRichText_',
    cdnUrl: 'http://cdn.jisuapp.cn',
    defaultPhoto: 'http://cdn.jisuapp.cn/zhichi_frontend/static/webapp/images/default_photo.png',
    siteBaseUrl: 'http://localhost/WeiShui',
    appTitle: '我的应用',
    appDescription: '我的应用',
    appLogo: 'http://cdn.jisuapp.cn/zhichi_frontend/static/invitation/images/logo.png'
  }
})