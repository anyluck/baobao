// pages/index/book.js
var util = require('../../utils/util.js')
import { jointg } from '../../api/user.js';
import { tgsetting } from '../../api/user.js';
var inputValue = 0
var inputValue2 = 0
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: inputValue,
    inputValue2: inputValue2,
    shtype: "快速商户",
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    username: "",
    mobile: "",
    weixin: "",
    a1: 0,
    a2: 0,
    b1: 0,
    b2: 0,
    c1: 0,
    c2: 0,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*this.setData({
      text: "用户取消支付",
      isShow: false
     })*/
     var that=this
  tgsetting().then(function(res){

    setTimeout(function () {
      console.log("tgsetting2", res, getApp().globalData.rq)
      res = getApp().globalData.rq
      if (res) {
        that.a1 = parseInt(res[0].value.split('"')[1] )
        that.a2 = parseInt(res[1].value.split('"')[1])
        that.b1 = parseInt(res[2].value.split('"')[1])
        that.b2 = parseInt(res[3].value.split('"')[1])
        that.c1 = parseInt(res[4].value.split('"')[1])
        that.c2 = parseInt(res[5].value.split('"')[1])
        console.log(that.c1*2)

      }

    }, 1000)

    

    
    
    
	})
  // this.getabc()
  },

  

   getabc: function (e) {

    var that = this
     wx.request({
       url: 'https://www.jinhukj.com/index.php/api/user/tgsetting',
       data: {

       },
       header: {
         'content-type': 'application/json'
       },
       method: 'POST',
       success: function (res) {
         console.log(res)
       }

     })

   },

  back: function (e) {
    var that = this
    console.log("back");

    wx.switchTab({
      url: '../user/user',
    })


  },

  bindInput: function (e) {

    var that = this
    var value = e.detail.value
    inputValue = parseInt(value)
    
    console.log("inputValue", inputValue,that.data.shtype)



  },
  bindInput2: function (e) {

    var that = this
    var value = e.detail.value
    inputValue2 = parseInt(value)
    console.log("inputValue2", inputValue2, that.data.shtype)
    if (inputValue != 0 && inputValue2 != 0) {

      
      
      if (inputValue < that.a1 && inputValue2 < that.a2) {
        that.data.shtype = "快速商户"
      }
      if (inputValue > that.b1 && inputValue2 > that.b2) {
        that.data.shtype = "小型商户"
      }
      if (inputValue > that.c1 && inputValue2 > that.c2) {
        that.data.shtype = "一般商户"
      }

      console.log("abc", that.a2, that.b2, that.c2, that.a1, that.b1, that.c1, that.data.shtype)
      

    }

    that.setData({
      shtype: that.data.shtype
    })

    

    console.log("inputValue2", inputValue, inputValue2, that.data.shtype)



  },

  go: function (e) {
    var that=this

    console.log("that.shtype", that.data.shtype)

    if (inputValue != 0 && inputValue2 != 0) {
      wx.navigateTo({
        // url: '../sales/zhuce',
        url: '../sales/ruzhu?shtype=' + that.data.shtype,
        // url: '../sales/fillinfo',
      })

    } else {
      wx.showToast({
        title: '请填写资料',
      })


    }

    


  },

  // 判定输入为非空字符
  formSubmit: function (e) {
    var username = e.detail.value.username;
    var mobile = e.detail.value.mobile;
    var weixin = e.detail.value.weixin;
    username = "1"
    mobile = "13828618215"
    if (username == "" || mobile == "") {

      util.ToastFail("请填写完整资料");
    } else {
      let str = /^1\d{10}$/


      if (!str.test(mobile)) {
        wx.showModal({
          title: '提示',
          content: '手机格式不对！',
          success: function (res) {
            if (res.confirm) {
              //console.log('用户点击确定')
            }
          }
        })
      }
      else {
        var data = {};
        data.uid = wx.getStorageSync('uid')
        data.shms = e.detail.value.shms
        data.type = e.detail.value.type
        data.dz = e.detail.value.dz
        data.yhxm = e.detail.value.username
        data.sfz = e.detail.value.sfz
        data.sjh = e.detail.value.sjh
        console.log(data);
        jointg(data).then(res => {
          if (res.msg == '加盟成功') {

          }
        })
      }
      /*wx.request({
        url:'https://learn.zokoko.cn/index.php/api/user/jointg',
              data: {
                 uid:wx.getStorageSync('uid'),
                shms: "username",
                type: "商户类型",
                dz: "地址",
                yhxm: username,
                dhhm: mobile,
                sfz: username,
                sfz_pic1: username,
                sfz_pic2: username,
                yhc_pic: username,
                 khr:username
              },
              header: {
                  'content-type': 'application/json'
              },
        method: 'POST',
              success: function (res) {
                  if(res.data.status == 1)
          {
          wx.setStorageSync('dailiid', res.data.dailiid);  
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 1000,
                    mask:true
        })
        wx.switchTab({
         url: '../my/index',
         success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
        } 
        });
         }
              }
          });*/
    }
  }
})