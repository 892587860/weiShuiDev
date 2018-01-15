var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenVal: true,
    errorText: '',
    disableVal:false,//点击提交后控制提交按钮禁用
    deptName:'',
    desc:'',
    btnHidden:false,
    deptId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var deptId = options.deptId;
    var type = options.type;
    var this_=this;
    this_.setData({
      deptId: deptId
    })
    if(deptId!=''&&deptId!=undefined){
      if (type == 'detail') {
        this_.setData({
          btnHidden: true,
          title:'部门详情'
        })
      }else{
        this_.setData({
          btnHidden: false,
          title: '修改部门'
        })
      }
      app.sendRequest({
        url: '/auth/getDeptById.do',
        method: 'post',
        data: {
          deptId: deptId
        },
        success: function (res) {
          var data = res;
          this_.setData({
            deptName: data.deptName,
            desc: data.description
          })
        }
      })
    }else{
      this_.setData({
        btnHidden: false,
        title: '新建部门'
      })
    }
  },
  pickerConfirm: function (e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },
  pickerCancel: function (e) {
    this.setData({
      pickerHidden: true
    })
  },
  pickerShow: function (e) {
    this.setData({
      pickerHidden: false
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var this_ = this;
    var value = e.detail.value;
    var deptName = value.deptName;
    var desc = value.desc;
    var deptId = this_.data.deptId;
    if(deptName==""){
      this_.setData({
        hiddenVal: false,
        errorText:"部门名称不能为空"
      })
      return false;
    }
    this_.setData({
      disableVal:true
    })
    if (deptId != '' && deptId != undefined){
      //修改部门
      app.sendRequest({
        url: '/auth/updateDeptById.do',
        method: 'post',
        data: {
          deptId: deptId,
          deptName: deptName,
          desc: desc,
        },
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../deptList/deptList'
            })
          }, 2000);
        },
        fail: function (res) {
          //失败后恢复按钮
          this_.setData({
            disableVal: false
          })
        }
      })
    }else{
    //添加一个部门
      app.sendRequest({
        url: '/auth/addDept.do',
        data:{
          deptName: deptName,
          desc: desc
        },
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(function(){
            wx.redirectTo({
              url:'../deptList/deptList'
            })
          },2000);
        },
        fail:function(res){
          this_.setData({
            disableVal: false
          })
        }
      })

    }

  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  //检查输入框是否为空
  checkVal: function (e) {
    var deptName = e.detail.value;
    if (deptName == "") {
      this.setData({
        hiddenVal: false,
        errorText: "部门名称不能为空"
      })
      return false;
    }else{
      this.setData({
        hiddenVal: true
      })
    }
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    var items = this.data.items, values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value == values[j]) {
          items[i].checked = true;
          break
        }
      }
    }

    this.setData({
      items: items
    })
  }
})