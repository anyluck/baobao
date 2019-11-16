const app = getApp();

import { orderProduct, orderComment } from '../../api/order.js';
const util = require('../../utils/util.js');


import { getIndexData, getCoupons } from '../../api/api.js';
import Util from '../../utils/util.js';
import {
  getUserInfo
} from '../../api/user.js';
import {
  switchH5Login
} from '../../api/api.js';
import authLogin from '../../utils/autuLogin.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    itemNew:[],
    activityList:[],
    menus: [],
    bastBanner: [],
    bastInfo: '',
    bastList: [],
    fastInfo: '',
    fastList: [],
    firstInfo: '',
    firstList: [],
    salesInfo: '',
    likeInfo: [],
    lovelyBanner: [],
    benefit:[],
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    parameter:{
      'navbar':'0',
      'return':'0'
    },
    window: false,
    userInfo: {},
    isGoIndex: false,
    iShidden: true,
    switchActive: false,
    loginType: app.globalData.loginType,
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.spid) app.globalData.spid = options.spid;
    if (options.scene) app.globalData.code = decodeURIComponent(options.scene);

    /*wx.navigateTo({
      // url: '../index/preview',
      // url: '../index/home' 
      // url: '../index/grapp'
      // url: '../index/gysapp'
      url: '../index/regist'
    })
    return*/

    
 
    // var that = this; 

    
    // wx.navigateTo({
    //   // url: '../sales/zhuce',
    //   // url: '../sales/ruzhu?shtype=一般商户',
    //   // url: '../goods_cate/storeManager',
    //   // url: '../sales/feeback?id=wx157389184206036241'
    //   url: '../goods_notices/index'
    //   // url:"../order_list/index"
    //   // url:"../goods_cate/goodsManager",
    //   // url: '../sales/ruzhu?shtype=快速商户',
    //   // url: '../sales/fillinfo',
    // })

    wx.switchTab({
      // url: '../sales/zhuce',
      url: '../user/user',
    })
    return
  },
  /**
   * 授权回调
   */
  onLoadFun: function (e) {

    console.log("e3" + e)
    this.getUserInfo();
    //this.getMyMenus();
    var that = this






  },

  /**
   * 删除图片
   * 
  */
  DelPic: function (e) {
    var index = e.target.dataset.index, that = this, pic = this.data.pics[index];
    that.data.pics.splice(index, 1);
    that.setData({ pics: that.data.pics });
  },
  /**
   * 获取个人用户信息
   */
  getUserInfo: function() {
    var that = this;
    getUserInfo().then(res => {
      console.log(res.data)

      


      wx.setStorageSync('uid', res.data.uid)
      wx.setStorageSync('now_money', res.data.now_money)
      console.log("aa" + res.data['vip_id'])
      getApp().globalData.vip_id = res.data['vip_id']
      getApp().globalData.spread_uid = res.data['spread_uid']
      //getApp().globalData.spread_uid = 140
      that.setData({
        userInfo: res.data,
        xj: res.data.xj,
        loginType: res.data.login_type,
        orderStatusNum: res.data.orderStatusNum
      });


      if (res.data.vip_name == "普通用户"){
        // wx.navigateTo({
        //   // url: '../index/preview',
        //   url: '../index/home'
        // })

        
      }




    });
  },
  /**
   * 上传文件
   * 
  */
  uploadpic: function () {
    var that = this;
    util.uploadImageOne('upload/image', function (res) {
      console.log(res);
      that.data.pics.push(res.data.url);
      that.setData({ pics: that.data.pics });
    });
  },
  
  catchTouchMove: function (res) {
    return false
  },
  onColse:function(){
    this.setData({ window: false});
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
    this.getIndexConfig();
    if(app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
  },
  get_issue_coupon_list:function(){
    var that = this;
    getCoupons({page:1,limit:3}).then(res=>{
      that.setData({ couponList: res.data });
      if (!res.data.length) that.setData({ window: false });
    });
  },
  //数据初始化
  getIndexConfig:function(){
    var that = this;
    getIndexData().then(res=>{
      console.log("res",res)

      // res.data.logoUrl ="../../images/logo.png"
      // res.data.banner = [{ id: 104, name: "banenr2", url: "/pages/pink-list/index?id=2", 
      //   pic: "http://www.allgofind.com/os/shop/crmpics/1.jpg"
      //  }]

      // res.data.info.bastBanner=[
      //   {
      //     "id": 127,
      //     "img": "http://www.allgofind.com/os/shop/crmpics/1.jpg",
      //     "comment": "精品推荐750*282",
      //     "link": "/pages/first-new-product/index",
      //     "wap_link": "/hot_new_goods/1"
      //   },
      //   {
      //     "id": 128,
      //     "img": "http://www.allgofind.com/os/shop/crmpics/1.jpg",
      //     "comment": "精品推荐750*282",
      //     "link": "/pages/first-new-product/index",
      //     "wap_link": "/hot_new_goods/1"
      //   }
      // ]

      // res.data.info.fastList= [
      //   {
      //     "id": 7,
      //     "cate_name": "床垫",
      //     "pid": 6,
      //     "pic": "http://datong.crmeb.net/public/uploads/attach/2019/03/29/5c9de8b7c5cc5.png"
      //   },
      //   {
      //     "id": 2,
      //     "cate_name": "热门促销",
      //     "pid": 1,
      //     "pic": "http://datong.crmeb.net/public/uploads/attach/2019/01/15/5c3dba1366885.jpg"
      //   },
      //   {
      //     "id": 22,
      //     "cate_name": "布艺软装",
      //     "pid": 6,
      //     "pic": "http://datong.crmeb.net/public/uploads/attach/2019/03/29/5c9df1b8f0a7a.png"
      //   },
      //   {
      //     "id": 21,
      //     "cate_name": "家饰花卉",
      //     "pid": 6,
      //     "pic": "http://datong.crmeb.net/public/uploads/attach/2019/03/29/5c9df170010cb.png"
      //   },
      //   {
      //     "id": 20,
      //     "cate_name": "床品件套",
      //     "pid": 6,
      //     "pic": "http://datong.crmeb.net/public/uploads/attach/2019/03/29/5c9df11e13742.png"
      //   },
      //   {
      //     "id": 19,
      //     "cate_name": "家具",
      //     "pid": 6,
      //     "pic": "http://datong.crmeb.net/public/uploads/attach/2019/03/29/5c9def5fa968c.png"
      //   },
      //   {
      //     "id": 8,
      //     "cate_name": "灯具",
      //     "pid": 6,
      //     "pic": "http://datong.crmeb.net/public/uploads/attach/2019/03/29/5c9def00c2882.png"
      //   },
      //   {
      //     "id": 4,
      //     "cate_name": "新品上线",
      //     "pid": 1,
      //     "pic": "http://datong.crmeb.net/public/uploads/attach/2019/01/15/5c3dbc6a38fab.jpg"
      //   },
      //   {
      //     "id": 3,
      //     "cate_name": "折扣专区",
      //     "pid": 1,
      //     "pic": "http://datong.crmeb.net/public/uploads/attach/2019/01/15/5c3dc0ef27068.jpg"
      //   }
      // ]

	  getApp().globalData.upAmount = res.data.upAmount	
      that.setData({
        imgUrls: res.data.banner,
        menus: res.data.menus,
        itemNew: res.data.roll,
        activityList: res.data.activity,
        bastBanner: res.data.info.bastBanner,
        bastInfo: res.data.info.bastInfo,
        bastList: res.data.info.bastList,
        fastInfo: res.data.info.fastInfo,
        fastList: res.data.info.fastList,
        firstInfo: res.data.info.firstInfo,
        firstList: res.data.info.firstList,
        salesInfo: res.data.info.salesInfo,
        likeInfo: res.data.likeInfo,
        lovelyBanner: res.data.info,
        benefit: res.data.benefit,
        logoUrl: res.data.logoUrl,
        couponList: res.data.couponList,
      });
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            that.setData({ window: that.data.couponList.length ? true : false });
          } else {
            that.setData({ window: false });
          }
        }
      });
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ window:false});
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
    this.getIndexConfig();
    if (app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
    wx.stopPullDownRefresh();
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

  }
})