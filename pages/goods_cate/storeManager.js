import {
  getUserInfo,
  userEdit,
  getStoreInfo
} from '../../api/user.js';
import {
  setFormId,
  switchH5Login
} from '../../api/api.js';
import authLogin from '../../utils/autuLogin.js';
import util from '../../utils/util.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dian_address: "",
    dian_name: "",
    lianxi_phone: "",
    lianx_wx: "",
    pics: [],
    pics_m: [],
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '店铺设置'
    },
    userInfo: {},
    loginType: 'h5', //app.globalData.loginType
    userIndex: 0,
    switchUserInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.getStoreInfo()

  },

  DelPic: function (e) {
    var index = e.target.dataset.index,
      obj = e.target.dataset.imgobj,

      that = this


      // pic = this.data.pics[index];
    console.log('index', index, e, obj)



    if (obj == "pics") {
      that.data.pics.splice(index, 1);
      that.setData({
        pics: that.data.pics
      });
    }

    if (obj == "pics_m") {
      that.data.pics_m.splice(index, 1);
      that.setData({
        pics_m: that.data.pics_m
      });
    }

    


  },


  /**
   * 小程序设置
   */
  Setting: function() {
    wx.openSetting({
      success: function(res) {
        console.log(res.authSetting)
      }
    });
  },
  switchAccounts: function(e) {
    let index = e.currentTarget.dataset.index,
      userInfo = this.data.switchUserInfo[index],
      that = this;
    that.setData({
      userIndex: index
    });
    if (that.data.switchUserInfo.length <= 1) return true;
    if (userInfo === undefined) return app.Tips({
      title: '切换的账号不存在'
    });
    if (userInfo.user_type === 'h5') {
      wx.showLoading({
        title: '正在切换中'
      });
      switchH5Login().then(res => {
        wx.hideLoading();
        app.globalData.token = res.data.token;
        app.globalData.expires_time = res.data.time;
        app.globalData.loginType = 'h5';
        app.globalData.userInfo = res.data.userInfo;
        that.getUserInfo();
      }).catch(err => {
        wx.hideLoading();
        return app.Tips({
          title: err
        });
      })
    } else {
      wx.showLoading({
        title: '正在切换中'
      });
      authLogin('routine').then(res => {
        that.getUserInfo();
        wx.hideLoading();
      }).catch(err => {
        wx.hideLoading();
        return app.Tips({
          title: err
        });
      });
    }
  },
  /**
   * 授权回调
   */
  onLoadFun: function() {
    this.getUserInfo();
  },

  /**
   * 退出登录
   * 
   */
  outLogin: function() {
    if (this.data.loginType == 'h5') {
      app.globalData.token = '';
      app.globalData.isLog = false;
      app.globalData.userInfo = {};
      app.globalData.expiresTime = 0;
      wx.showLoading({
        title: '正在退出登录',
      });
      return wx.switchTab({
        url: '/pages/index/index',
        success: function() {
          wx.hideLoading();
        }
      });
    }
  },
  

  getStoreInfo: function () {
    var that = this;
    console.log("getStoreInfo")
    getStoreInfo({
      // page: 1
    }).then(res => {
      console.log("getStoreInfo", res, res.data)
      // that.changeList = res.data.list.data
      // console.log("getChange3", that.changeList)

      // that.setData({
      //   changeList: that.changeList
      // })

    }).catch(err => {
      that.setData({ loading: false, loadTitle: "加载更多" });
    });
  },

  getPhoneNumber: function(e) {
    var detail = e.detail,
      cache_key = wx.getStorageSync('cache_key'),
      that = this;
    if (detail.errMsg == 'getPhoneNumber:ok') {
      if (!cache_key) {
        app.globalData.token = '';
        app.globalData.isLog = false;
        return false;
      }



    } else {
      app.Tips({
        title: '取消授权'
      });
    }
  },

  /**
   * 获取用户详情
   */
  getUserInfo: function() {
    var that = this;
    getUserInfo().then(res => {

      that.data.pics.push(res.data.logo)


      that.data.pics_m = res.data.banner.split(",")


      that.setData({
        pics: that.data.pics,
        pics_m: that.data.pics_m,
        dian_name: res.data.dian_name,
        dian_address: res.data.dian_address,
        lianx_wx: res.data.lianx_wx,
        lianxi_phone: res.data.lianxi_phone,
        userInfo: res.data,
        switchUserInfo: res.data.switchUserInfo || []
      });
      for (let i = 0; i < that.data.switchUserInfo.length; i++) {
        if (that.data.switchUserInfo[i].uid === that.data.userInfo.uid) {
          that.setData({
            userIndex: i
          });
        }
      }
    });
  },


  uploadpic_m: function(e) {
    var that = this;
    var sign = e.currentTarget.dataset.sign
    console.log('sign', sign)
    util.uploadImageOne('upload/image', function(res) {
      console.log(res);

      if (sign == "logo") {
        that.data.pics.push(res.data.url);
      }

      if (sign == "lb") {
        that.data.pics_m.push(res.data.url);
      }


      that.setData({
        pics_m: that.data.pics_m,
        pics: that.data.pics,

      });
      console.log("pics_m", that.data.pics_m);
    });
  },

  /**
   * 上传文件
   * 
   */
  uploadpic: function() {
    var that = this;
    util.uploadImageOne('upload/image', function(res) {
      var userInfo = that.data.switchUserInfo[that.data.userIndex];
      if (userInfo !== undefined) {
        userInfo.avatar = res.data.url;
      }
      that.data.switchUserInfo[that.data.userIndex] = userInfo;
      that.setData({
        switchUserInfo: that.data.switchUserInfo
      });
    });
  },

  /**
   * 提交修改
   */
  formSubmit: function(e) {
    var that = this,
      value = e.detail.value,
      formId = e.detail.formId,
      userInfo = that.data.switchUserInfo[that.data.userIndex];
    if (!value.dian_name) return app.Tips({
      title: '店铺名称不能为空'
    });

    var images = ""

    if (that.data.pics_m.length > 0) {
      for (var i = 0; i < that.data.pics_m.length; i++) {
        if (i < that.data.pics_m.length-1){
          images += that.data.pics_m[i] + ","
        }else{
          images += that.data.pics_m[i]
        }
        
      }

    }

    // var obj={images:""}

    // value.push(obj)
    value["banner"] = images
    value["logo"] = that.data.pics[0]

    value["orderid"] = this.data.orderid




    value.avatar = userInfo.avatar;
    setFormId(formId);

    console.log("value", value, formId);
    userEdit(value).then(res => {
      return app.Tips({
        title: res.msg,
        icon: 'success'
      }, {
        tab: 3,
        url: 1
      });
    }).catch(msg => {
      return app.Tips({
        title: msg || '保存失败，您并没有修改'
      }, {
        tab: 3,
        url: 1
      });
    });
  },



})