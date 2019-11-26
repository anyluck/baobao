// pages/sales/feeback.js
import { getChange } from '../../api/order.js';
import { delhuoyuan } from '../../api/store.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    picker: ['质量问题', '配件问题', '少件/漏发', '与商品描述不符', '少件/漏发', '包装/商品残破', '发票问题', '其它'],
    changeList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    console.log("opt", opt)
    var that=this
    that.getChange()

  },
  getChange: function () {
    var that = this;
    console.log("getChange")
    getChange({
      page: 1
    }).then(res => {
      // console.log("getChange2", res, res.data, res.data.list)
      that.changeList=res.data.list.data
      console.log("getChange3", that.changeList)

      that.setData({
        changeList: that.changeList
      })

    }).catch(err => {
      that.setData({ loading: false, loadTitle: "加载更多" });
    });
  },
  

  back: function (e) {
    var that = this
    console.log("back");

    wx.navigateBack()


  },
  /**
   * 删除通知
  */
  delNotice: function (e) {
    var that=this
    
    // return
    
    var sid = e.currentTarget.dataset.sid;
    var index = e.currentTarget.dataset.index;
    console.log("delNotice", index, sid);


    var o={}
    o.id=sid

    console.log("o", o);

    that.data.changeList.splice(index, 1);
    that.setData({ changeList: that.data.changeList });

    return

    delhuoyuan(o).then(res => {

      wx.showToast({
        title: '删除成功',
      })
      that.data.changeList.splice(index, 1);
      that.setData({ changeList: that.data.changeList });
      // return app.Tips({ title: '删除通知成功', icon: 'success' }, function () {
        
      // });
    });
  },


  PickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
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