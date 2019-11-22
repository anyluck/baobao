// pages/member-center/index.js
import {
  userLevelGrade,
  userLevelTask,
  userLevelDetection,
  setLevel,
} from '../../api/user.js';
import {
  getProductHot
} from '../../api/store.js';
import {
  getUpAmoun, showToast
} from '../../utils/util2.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '会员中心',
      'class': '1',
      'color': true
    },
    nowid:1,
    amount:0,
    upTips:"请选择需要升级的等级",
    VipList: [], 
    indicatorDots: false,
    circular: true,
    autoplay: false,
    interval: 3000,
    duration: 500,
    swiperIndex: 0,
    growthValue: true,
    task: [], //任务列表
    illustrate: '', //任务说明
    level_id: 0, //任务id,
    host_product: [],
    userInfo: {},//用户信息
    cartId: '',//购物车id
  },
  /**
   * 授权回调
   */
  onLoadFun: function () {
    this.setLeveLComplete();
    this.get_host_product();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    setTimeout(function () {
      that.setData({
        loading: true
      })
    }, 500)
  },
  /**
   * 获取我的推荐
   */
  get_host_product: function () {
    var that = this;
    getProductHot().then(res => {
      that.setData({
        host_product: res.data
      });
    });
  },
  /**
   * 会员切换
   *
   */
  bindchange(e) {
    var index = e.detail.current
    this.data.nowid = this.data.VipList[index].id

    this.setData({
      
      swiperIndex: index,
      level_id: this.data.VipList[index].id || 0
    });
    this.getTask();
    this.swipclick()
  },
  /**
   * 关闭说明
   */
  growthValue: function () {
    this.setData({
      growthValue: true
    })
  },
  /**
   * 打开说明
   */
  opHelp: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      growthValue: false,
      illustrate: this.data.task[index].illustrate
    });
  },
  /**
   * 设置会员
   */
  setLeveLComplete: function () {
    let that = this;
    userLevelDetection().then(res => {
      that.getVipList();
    });
  },
  /**
   * 获取会员等级
   *
   */
  getVipList: function () {
    var that = this;
    userLevelGrade().then(res => {
      that.setData({
        VipList: res.data.list,
        task: res.data.task.task,
        reach_count: res.data.task.reach_count,
        level_id: res.data.list[0] ? res.data.list[0].id : 0
      });
    });
  },
  /**
   * 获取任务要求
   */
  getTask: function () {
    var that = this;
    userLevelTask(that.data.level_id).then(res => {
      that.setData({
        task: res.data.task,
        reach_count: res.data.reach_count
      });
    });
  },
  getConfirm: function () {
    var that = this;
    orderConfirm().then(res => {
      console.log(res);
    }).catch(err => {
      return app.Tips({ title: err }, { tab: 3, url: 1 });
    });
  },
  goCat: function (isPay) {
    var that = this;
    var productSelect = this.data.productValue[this.data.attrValue];
    //打开属性
    if (this.data.attrValue) {
      //默认选中了属性，但是没有打开过属性弹窗还是自动打开让用户查看默认选中的属性
      this.setData({ 'attribute.cartAttr': !this.data.isOpen ? true : false })
    } else {
      if (this.data.isOpen)
        this.setData({ 'attribute.cartAttr': true })
      else
        this.setData({ 'attribute.cartAttr': !this.data.attribute.cartAttr });
    }
    //只有关闭属性弹窗时进行加入购物车
    if (this.data.attribute.cartAttr === true && this.data.isOpen == false) return this.setData({ isOpen: true });
    //如果有属性,没有选择,提示用户选择
    if (this.data.productAttr.length && productSelect === undefined && this.data.isOpen == true) return app.Tips({ title: '请选择属性' });
    postCartAdd({
      productId: that.data.id,
      cartNum: that.data.cart_num,
      uniqueId: productSelect !== undefined ? productSelect.unique : '',
      'new': isPay === undefined ? 0 : 1,
    }).then(res => {
      that.setData({ isOpen: false, 'attribute.cartAttr': false });
      if (isPay)
        wx.navigateTo({ url: '/pages/order_confirm/index?cartId=' + res.data.cartId });
      else
        app.Tips({ title: '添加购物车成功', icon: 'success' }, function () {
          that.getCartCount(true);
        });
    }).catch(err => {
      return app.Tips({ title: err });
    });
  },
  //升级会员
  upgrade: function () {
    console.log("upgrade")
    var that=this

    var id=that.data.nowid
    var amount = that.data.amount

    // wx.showModal({
    //   title: '请确认升级信息',
    //   content: '您需支付' + dis + "元升级",
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //       that.upgrade(id, dis)

    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })



    if (parseFloat(wx.getStorageSync('now_money')) < parseFloat(amount)) return app.Tips({ title: '余额不足！' });
    var d = {};
    d.uid = wx.getStorageSync('uid')
    d.mid = id
    d.money = amount
    setLevel(d).then(function (res) {
      if (typeof (res) !== 'undefined') {
        wx.showToast({
          title: res.msg,
        })
      }
    })



  },
  swipclick: function (e) {
    // console.log(e)
    // var id = e.currentTarget.dataset.id
    var id =this.data.nowid
    console.log("id", id)
    var that = this,
      data = {};
    data = {
      id: id,
      uid: wx.getStorageSync('uid')
    };
    if (getApp().globalData.vip_id == id) {

      wx.showToast({
        title: '您已是该级别',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    if (getApp().globalData.vip_id > id) {

      wx.showToast({
        title: '不能降级',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    //余额判断

    let Oldamount = getUpAmoun(getApp().globalData.vip_id, this.data.VipList);
    let amount = getUpAmoun(id, this.data.VipList);



    console.log("Oldamount", Oldamount, amount)

    Oldamount = parseInt(Oldamount)
    amount = parseInt(amount)

    var dis = amount - Oldamount


    that.data.upTips="需支付"+dis+"元"


    that.data.amount=dis


    that.setData({
      upTips: that.data.upTips
    })


    


    return


    


    


    //if (parseFloat(wx.getStorageSync('now_money')) < parseFloat(that.data.totalPrice)) return app.Tips({ title: '余额不足！' });
    //console.log(getApp().globalData.upAmount)
    /*wx.showLoading({
      title: '订单支付中'
    });
    this.goCat();
    this.getConfirm();*/
  }






})
