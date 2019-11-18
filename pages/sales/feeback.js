// pages/sales/feeback.js
import {
  getUserInfo,
  userEdit,
  getStoreInfo,
  add_sale
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
    index: -1,
    picker: ['质量问题', '配件问题', '少件/漏发', '与商品描述不符', '少件/漏发', '包装/商品残破', '发票问题', '其它'],
    preson:"",
    pics: [],
    pics_m: [],//有这个才会出现图片
    orderid:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    console.log("opt",opt) 
    this.data.orderid=opt.id

  },


  /**
   * 提交修改
   */  
  formSubmit: function (e) {
    var that = this,
      value = e.detail.value,
      formId = e.detail.formId
      
    if (!value.reason) return app.Tips({
      title: '问题描述不能为空'
    });
    
    setFormId(formId);

    value.reason += "&&"+this.data.preson

    var images=""

    if (that.data.pics_m.length>0){
      for (var i = 0; i < that.data.pics_m.length;i++){
        images += that.data.pics_m[i]
      }
      
    }

    // var obj={images:""}

    // value.push(obj)
    value["image"] = images
    value["orderid"] = this.data.orderid
    

    console.log("value", value,typeof value, formId);
    add_sale(value).then(res => {
      console.log("res", res);
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


  uploadpic_m: function (e) {
    var that = this;
    var sign = e.currentTarget.dataset.sign
    console.log('sign', sign)
    util.uploadImageOne('upload/image', function (res) {
      console.log(res);
      if (sign == "lb") {
        that.data.pics_m.push(res.data.url);
      }


      that.setData({
        pics_m: that.data.pics_m,


      });
      console.log("pics_m", that.data.pics_m);
    });
  },

  back: function (e) {
    var that = this
    console.log("back");

    wx.navigateBack()


  },
  PickerChange(e) {
    
    var index = e.detail.value
    this.data.preson = this.data.picker[index]
    console.log('picker发送选择改变，携带值为', e.detail.value, this.data.preson)
    this.setData({
      index: e.detail.value
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

  }
})