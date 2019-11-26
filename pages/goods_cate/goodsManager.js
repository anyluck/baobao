import {
  getCategoryListManage, getMygoods, setFloor
} from '../../api/store.js';
import {
  setFormId
} from '../../api/api.js';

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navlist: [],
    index: 1,
    FproductList: [],//楼层商品
    productList: [],
    navActive: 0,
    menuid:0,
    parameter: {
      'navbar': '1',
      'return': '0',
      'title': '商品管理'
    },
    navH: "",
    number: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(res) {
    this.getAllCategory();
  },
  back: function(e) {
    var that = this
    console.log("back");

    wx.switchTab({
      url: '../user/user',
    })


  },
  infoScroll: function() {
    var that = this;
    var len = that.data.productList.length;
    that.setData({
      navH: app.globalData.navHeight,
      number: that.data.productList[len - 1].children.length
    })
    //设置商品列表高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: (res.windowHeight) * (750 / res.windowWidth) - 98 - app.globalData.navHeight
          //res.windowHeight:获取整个窗口高度为px，*2为rpx；98为头部占据的高度；
        })
      },
    });
    var height = 0;
    var hightArr = []; 
    for (var i = 0; i < len; i++) { //productList
      //获取元素所在位置
      var query = wx.createSelectorQuery().in(this);
      var idView = "#b" + i;
      query.select(idView).boundingClientRect();
      query.exec(function(res) {
        var top = res[0].top;
        hightArr.push(top);
        that.setData({
          hightArr: hightArr
        });
      });
    };
  },
  tap: function(e) {
    var that = this
    var id = e.currentTarget.dataset.id;
    that.index = e.currentTarget.dataset.index;
    that.data.menuid = that.index
    console.log(that.index, id,that.data.menuid);


    //上传商品
    if (that.index == 1) {
      that.getMygoods()
      

    };

    //上传商品
    if (that.index == 5) {
      wx.navigateTo({
        url: "../goods_cate/uploadGood"
      })

    };

    this.setData({
      menuid: that.index,
      toView: id,
      index: that.index,
      navActive: that.index
    });

  },
  setFloor: function (e) {
    var that = this;
    
    var fid = e.currentTarget.dataset.fid;
    var sid = e.currentTarget.dataset.sid;
    console.log("setFloor",fid,sid);

    

    var o = {}
    o.id=sid

    if(fid =="is_benefit"){      
      o.is_benefit=1
      o.is_best = 0
      o.is_new = 0
    }
    if (fid == "is_best") {
      o.is_benefit = 0
      o.is_best = 1
      o.is_new = 0
    }
    if (fid == "is_new") {
      o.is_benefit = 0
      o.is_best = 0
      o.is_new = 1
    }
    // o.is_benefit=
    
    setFloor(
      o
    ).then(res => {
      console.log("setFloor", res);

      // that.data.FproductList = res.data.list.data
      // that.setData({
      //   FproductList: that.data.FproductList
      // })


    })


  },
  getMygoods: function () {
    var that = this;
    console.log("getMygoods");
    var value={page:1}
    var pageNum=1

    console.log("pageNum", pageNum);

    value["page"] = pageNum
    getMygoods(
      value
      ).then(res => {
        console.log("getMygoods",res,res.data.list.data);

        that.data.FproductList = res.data.list.data
        that.setData({
          FproductList: that.data.FproductList
        })

      
    })


  },
  getAllCategory: function() {
    var that = this;
    // getCategoryListManage(getApp().globalData.vip_id, wx.getStorageSync('uid'), getApp().globalData.spread_uid).then(res => {
    //   that.setData({
    //     productList: res.data
    //   });
    //   that.infoScroll();
    // })

    getCategoryListManage(getApp().globalData.vip_id, wx.getStorageSync('uid'), wx.getStorageSync('uid')).then(res => {
      that.setData({
        productList: res.data
      });
      that.infoScroll();
    })


  },
  scroll: function(e) {
    var scrollTop = e.detail.scrollTop;
    var scrollArr = this.data.hightArr;
    for (var i = 0; i < scrollArr.length; i++) {
      if (scrollTop >= 0 && scrollTop < scrollArr[1] - scrollArr[0]) {
        this.setData({
          navActive: 0,
          lastActive: 0
        })
      } else if (scrollTop >= scrollArr[i] - scrollArr[0] && scrollTop < scrollArr[i + 1] - scrollArr[0]) {
        console.log(scrollArr[1] - scrollArr[0])
        this.setData({
          navActive: i
        })
      } else if (scrollTop >= scrollArr[scrollArr.length - 1] - scrollArr[0]) {
        this.setData({
          navActive: scrollArr.length - 1
        })
      }
    }
  },

  searchSubmitValue: function(e) {
    var that = this;
    setFormId(e.detail.formId);
    if (e.detail.value.length > 0)
      wx.navigateTo({
        url: '/pages/goods_list/goods_list?searchValue=' + e.detail.value
      })
    else
      return app.Tips({
        title: '请填写要搜索的产品信息'
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  }
})
