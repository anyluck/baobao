// pages/index/book.js
var util = require('../../utils/util.js')
import {
  jointg
} from '../../api/user.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '商品评价',
      'color': false,
    },
    scoreList: [{
      'name': '商品质量',
      'stars': 0
    },
    {
      'name': '服务态度',
      'stars': 0
    },
    ],
    pics: [],
    pics_sfz: [],
    pics_scsfz: [],
    pics_yhk: [],
    orderId: '',
    unique: '',
    productInfo: {},
    cart_num: 0,

    shtype: "快速商户",
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    username: "",
    mobile: "",
    weixin: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var that = this
    // opt.type="micro"

    if (opt) {
      that.shtype = opt.shtype
    }

    this.setData({
      shtype: that.shtype
    })

    console.log('that.shtype', that.shtype)

  },
  /**
   * 删除图片
   * 
   */
  DelPic: function (e) {
    var index = e.target.dataset.index,
      that = this,
      pic = this.data.pics[index];
    that.data.pics.splice(index, 1);
    that.setData({
      pics: that.data.pics
    });
  },

  /**
   * 上传文件
   * 
   */
  uploadpic: function (e) {
    var that = this;
    var sign = e.currentTarget.dataset.sign
    console.log('sign', sign)
    util.uploadImageOne('upload/image', function (res) {
      console.log(res);
      if (sign == "yyzz") {
        that.data.pics.push(res.data.url);
      }
      if (sign == "pics_sfz") {
        that.data.pics_sfz.push(res.data.url);
      }
      if (sign == "pics_scsfz") {
        that.data.pics_scsfz.push(res.data.url);
      }
      if (sign == "pics_yhk") {
        that.data.pics_yhk.push(res.data.url);
      }

      that.setData({
        pics: that.data.pics,
        pics_sfz: that.data.pics_sfz,
        pics_yhk: that.data.pics_yhk,
        pics_scsfz: that.data.pics_scsfz

      });
      console.log("pics", that.data.pics, that.data.pics_sfz, that.data.pics_yhk, that.data.pics_yhk);
    });
  },

  back: function (e) {
    var that = this
    console.log("back");

    wx.switchTab({
      url: '../user/user',
    })


  },
  // 判定输入为非空字符
  formSubmit: function (e) {
    var that = this
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
      } else {
        var data = {};
        if (that.data.pics.length != 0) {
          data.yyzz_pic = that.data.pics[0]
        }

        data.yyzz = e.detail.value.yyzz
        if (that.data.pics_scsfz.length != 0) {
          data.yyzz_pic = that.data.pics_scsfz[0]
        }
        data.shqc = e.detail.value.shqc
        data.shjc = e.detail.value.shjc
        data.jydz = e.detail.value.jydz
        data.xxdz = e.detail.value.xxdz
        if (that.data.pics_sfz.length != 0) {
          data.sfz_pic_1 = that.data.pics_sfz[0]
          data.sfz_pic_2 = that.data.pics_sfz[1]
        }
        if (that.data.pics_yhk.length != 0) {
          data.pics_yhk = that.data.pics_yhk[0]
        }

        data.yhkh = e.detail.value.yhkh

        data.lxr = e.detail.value.lxr
        data.lxdh = e.detail.value.lxdh
        data.khzh = e.detail.value.khzh
        data.khr = e.detail.value.khr
        data.frxm = e.detail.value.frxm
        data.xm = e.detail.value.xm
        data.shxm = e.detail.value.shxm
        data.shlx = e.detail.value.shlx





        data.uid = wx.getStorageSync('uid')
        data.shms = e.detail.value.shms
        data.type = e.detail.value.type
        data.dz = e.detail.value.dz
        data.yhxm = e.detail.value.username
        data.sfzhm = e.detail.value.sfzhm
        data.sjh = e.detail.value.sjh

        var count = 0
        var join = 0

        // console.log("data1", data, typeof data, data[1], data.length, join);
        //对象用这个for循环
        for (let i in data) {

          console.log("data2", data[i]);

          if (data[i] == "") {


            count++

            join = 1
            // return
          }



        }

        //



        // for (var i = 0; i < data.length; i++) {
        //   console.log("data2", data[i]);
        //   if (data[i] == "") {
        //     wx.showToast({
        //       title: '信息填写不全',
        //     })

        //     join = 1
        //     // return
        //   }
        // }




        console.log("data", data, count);

        if (count < 5) {

          jointg(data).then(function (res) {
            if (typeof (res) !== 'undefined') {
              wx.showToast({
                title: res.msg,
              })
            }
          })

        } else {
          wx.showToast({
            title: '信息填写不全',
          })
        }

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