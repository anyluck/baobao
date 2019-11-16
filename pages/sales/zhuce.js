// pages/index/book.js
var util = require('../../utils/util.js')
import {jointg} from '../../api/user.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    username:"",
    mobile:"",
    weixin:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*this.setData({
      text: "用户取消支付",
      isShow: false
     })*/
  },
  // 判定输入为非空字符
formSubmit: function (e) {
  var username = e.detail.value.username;
  var mobile = e.detail.value.mobile;
  var weixin= e.detail.value.weixin;
  username="1"
  mobile = "13828618215"
  if (username==""||mobile==""){
    
    util.ToastFail("请填写完整资料");
  } else{
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
    else
	{
		var data = {};
		data.uid = wx.getStorageSync('uid')
		data.shms = e.detail.value.shms
		data.type = e.detail.value.type
		data.dz = e.detail.value.dz
		data.yhxm = e.detail.value.username
		data.sfz = e.detail.value.sfz
		data.sjh = e.detail.value.sjh
		console.log(data);
		jointg(data).then(res=>{
			if(res.msg == '加盟成功'){
				
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
  }})