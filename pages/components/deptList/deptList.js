var app = getApp();
const config=require("../../../config.js");
var header = app.getHeader();
Page({
	data: {
		hidden:false,//控制加载框的显示与隐藏
		curNav:1,
		curIndex:0,
    deptIds:[],
		cartTotal:0,
		deptList:	[],
    allStatus:false
	},
	onLoad () {
		this.loadingChange();
    this.getDeptList();
	},
	loadingChange () {//时间延迟，模仿加载
		setTimeout(() => {
			this.setData({
				hidden:true
			})
		},1000)
	},
	//选择分类对应的数据
  selectDeptData (event) {
    let deptId = event.currentTarget.dataset.deptid;
		let flag = true;
    let deptIds = this.data.deptIds;
		
    if (deptIds.length > 0){
      deptIds.forEach(function(item,index){
        if (item == deptId){
          deptIds.splice(index,1);//splice(删除的位置，删除的数量)
					flag = false;
				}
			})
		}
    if (flag) deptIds.push(deptId);//把deptid数据添加到deptIds中
		
    this.setStatus(deptId)
	},
  //全选
  selectAllDept(event) {
    let deptIds = this.data.deptIds;
    var this_=this;
    var allStatus = this_.data.allStatus;

    allStatus = !allStatus || false;
    
    if (allStatus){
      this_.data.deptList.forEach(function (item, index) {
        deptIds.push(item.id);
        item.status=true;
      })
    }else{
      deptIds.splice(0, deptIds.length);
      this_.data.deptList.forEach(function (item, index) {
        item.status = false;
      })
    }
    this_.setData({
      allStatus: allStatus,
      deptList: this_.data.deptList
    })
  },
  setStatus(deptId) {
    let deptList = this.data.deptList;
    for (let dept of deptList){
        if (dept.id == deptId){
          dept.status = !dept.status || false
				}
		}
		this.setData({
      deptList: this.data.deptList
		})
	},
  getDeptList(){
    var this_=this;
    // wx.request({
    //   url: app.globalData.siteBaseUrl+'/auth/getAllDepts',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     this_.setData({
    //       deptList: res.data
    //     })
    //   }
    // })
    app.sendRequest({
      url: '/auth/getAllDepts.do',
      method: 'post',
      header:header,
      success: function (res) {
        console.log(res)
        this_.setData({
          deptList: res
        })
      }
    })
  },
  addRedirect(){
    wx.navigateTo({
      url: '../dept/dept',
    })
  },
  updateRedirect(){
    var this_ = this;
    let deptIds = this.data.deptIds;
    if (deptIds.length > 0) {
      if (deptIds.length > 1) {
        wx.showModal({
          title: '提示',
          content: '请只选择一个要修改的部门',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.navigateTo({
          url: '../dept/dept?deptId=' + deptIds[0] + '&type=update',
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择要修改的部门',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    
  },
  del(){
    var this_=this;
    let deptIds = this.data.deptIds;
    if (deptIds.length > 0) {
      wx.showModal({
        title: '提示',
        content: '确定删除？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            app.sendRequest({
              url: '/auth/delDeptByIds.do',
              method: 'post',
              header: header, 
              data: {
                deptIds: deptIds.join(",")
              },
              success: function (res) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                this_.getDeptList();
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
     
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择要删除的部门',
        showCancel : false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  onPullDownRefresh: function () {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    this.getDeptList();
    console.log('onPullDownRefresh', new Date())
  },
  deptDetail:function(e){
    let deptId = e.currentTarget.dataset.deptid;
    wx.navigateTo({
      url: '../dept/dept?deptId='+deptId+'&type=detail',
    })
  }
})