const app = getApp();

import {
  getMenuList,
  getUserInfo
} from '../../api/user.js';
import {
  switchH5Login
} from '../../api/api.js';
import authLogin from '../../utils/autuLogin.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vip_id: 2,
    parameter: {
      'navbar': '1',
      'return': '0',
      'title': '个人中心',
      'color': true,
      'class': '0'
    },
    userInfo: {},
    MyMenus: [],
    isGoIndex: false,
    iShidden: true,
    switchActive: false,
    loginType: app.globalData.loginType,
    orderStatusNum: {},
  },

  close: function() {
    this.setData({
      switchActive: false
    });
  },
  /**
   * 授权回调
   */
  onLoadFun: function(e) {
    this.getUserInfo();
    this.getMyMenus();
  },
  /**
   *
   * 获取个人中心图标
   */
  go: function (e) {
    var that = this;
    var sign=e.currentTarget.dataset.sign
    console.log("sign",sign)
    if(sign=="goodsManager"){
      wx.navigateTo({
        url: '../goods_cate/goodsManager',
      })
    }
    if (sign == "storeManager") {
      wx.navigateTo({
        url: '../goods_cate/storeManager',
      })
    }


    // wx.navigateTo({
    //   url: '../sales/zhuce',
    // })

    // wx.navigateTo({
    //   url: '../sales/ruzhu',
    // })


  },
  gotuiguang: function() {
    var that = this;
    // wx.navigateTo({
    //   url: '../sales/zhuce',
    // })

    // wx.navigateTo({
    //   url: '../sales/ruzhu',
    // })
    wx.navigateTo({
      url: '../sales/fillinfo',
    })

  },
  getMyMenus: function() {
    var that = this;
    if (this.data.MyMenus.length) return;
    getMenuList().then(res => {
      /*var menu= [];
      menu[0] = res.data.routine_my_menus[0];
      menu[1] = res.data.routine_my_menus[1];
      menu[2] = res.data.routine_my_menus[2];
      console.log(menu)*/
      that.setData({
        MyMenus: res.data.routine_my_menus
      });
    });
  },
  /**
   * 获取个人用户信息
   */
  getUserInfo: function() {
    var that = this;
    getUserInfo().then(res => {
      console.log(res.data)


      wx.setStorageSync('uid', res.data.uid)
      console.log("aa"+res.data['vip_id'])
      getApp().globalData.vip_id = res.data['vip_id']
      getApp().globalData.spread_uid = res.data['spread_uid']
      //getApp().globalData.spread_uid = 129
      that.setData({
        userInfo: res.data,
        xj: res.data.xj,
        loginType: res.data.login_type,
        orderStatusNum: res.data.orderStatusNum
      });

    });
  },
  /**
   * 页面跳转
   */
  goPages: function(e) {
    if (app.globalData.isLog) {
      if (e.currentTarget.dataset.url == '/pages/user_spread_user/index' && this.data.userInfo.statu == 1) {
        if (!this.data.userInfo.is_promoter) return app.Tips({
          title: '您还没有推广权限！！'
        });
      }
      if (e.currentTarget.dataset.url == '/pages/logon/index') return this.setData({
        switchActive: true
      });
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    } else {
      this.setData({
        iShidden: false
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      MyMenus: app.globalData.MyMenus
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      switchActive: false
    });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  onShow: function() {
    let that = this;
    if (app.globalData.isLog) this.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
})
