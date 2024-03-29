import {
  getProductslist,
  getProductHot,
} from '../../api/store.js';


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '商品列表'
    },
    navH: "",
    is_switch: true,
    where: {
      sid: 0,
      keyword: '',
      priceOrder: '',
      salesOrder: '',
      browseOrder: '',
      commentOrder:'',
      brand_id:0,
      priceRace:'',
      news: 0,
      page: 1,
      limit: 10,
      cid: 0,
    },
    price: 0,
    stock: 0,
    browse: 0,
    comment:0,
    nows: false,
    loadend: false,
    loading: false,
    loadTitle: '加载更多',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      ['where.sid']: options.sid || 0,
      title: options.title || '',
      ['where.keyword']: options.searchValue || '',
      navH: app.globalData.navHeight
    });
    this.get_product_list();
    this.get_host_product();
  },
  Changswitch: function() {
    var that = this;
    that.setData({
      is_switch: !this.data.is_switch
    })
  },
  searchSubmit: function(e) {
    var that = this;
    this.setData({
      ['where.keyword']: e.detail.value,
      loadend: false,
      ['where.page']: 1
    })
    this.get_product_list(true);
  },
  /**
   * 获取我的推荐
   */
  get_host_product: function() {
    var that = this;
    getProductHot().then(res => {
      that.setData({
        host_product: res.data
      });
    });
  },
  //点击事件处理
  set_where: function(e) {
    var dataset = e.target.dataset;
    switch (dataset.type) {
      case '1':
        return wx.navigateBack({
          delta: 1,
        })
        break;
      case '2':
        if (this.data.price == 0)
          this.data.price = 1;
        else if (this.data.price == 1)
          this.data.price = 2;
        else if (this.data.price == 2)
          this.data.price = 0;
        this.setData({
          price: this.data.price,
          stock: 0
        });
        break;
      case '3':
        if (this.data.stock == 0)
          this.data.stock = 1;
        else if (this.data.stock == 1)
          this.data.stock = 2;
        else if (this.data.stock == 2)
          this.data.stock = 0;
        this.setData({
          stock: this.data.stock,
          price: 0
        });
        break;
      case '4':
        this.setData({
          nows: !this.data.nows
        });
        break;
      case '5':
        if (this.data.browse == 0)
          this.data.browse = 1;
        else if (this.data.browse == 1)
          this.data.browse = 2;
        else if (this.data.browse == 2)
          this.data.browse = 0;
        this.setData({
          browse: this.data.browse,
          price: 0
        });
      case '6':
        if (this.data.comment == 0)
          this.data.comment = 1;
        else if (this.data.comment == 1)
          this.data.comment = 2;
        else if (this.data.comment == 2)
          this.data.comment = 0;
        this.setData({
          comment: this.data.comment,
          price: 0
        });
        break;
    }
    this.setData({
      loadend: false,
      ['where.page']: 1
    });
    this.get_product_list(true);
  },
  //设置where条件
  setWhere: function() {
    console.log("br", this.data.browse)
    if (this.data.comment == 1) {
      //console.log('gg');
      this.data.where.commentOrder = 'desc';
    } else if (this.data.comment == 2) {
      //console.log('gg1');
      this.data.where.commentOrder = 'asc';
    }
    else if (this.data.browse == 1) {
      console.log('gg');
      this.data.where.browseOrder = 'desc';
    } else if (this.data.browse == 2) {
      console.log('gg1');
      this.data.where.browseOrder = 'asc';
    } else if (this.data.price == 0)
      this.data.where.priceOrder = '';
    else if (this.data.price == 1)
      this.data.where.priceOrder = 'desc';
    else if (this.data.price == 2)
      this.data.where.priceOrder = 'asc';
    if (this.data.stock == 0)
      this.data.where.salesOrder = '';
    else if (this.data.stock == 1)
      this.data.where.salesOrder = 'desc';
    else if (this.data.stock == 2)
      this.data.where.salesOrder = 'asc';
    console.log('ww', this.data.where.browseOrder)
    this.data.where.news = this.data.nows ? 1 : 0;
    this.data.where.vip_id = getApp().globalData.vip_id;
    this.data.where.uid = wx.getStorageSync('uid');
    this.data.where.spread_uid = getApp().globalData.spread_uid
    this.setData({
      where: this.data.where
    });
  },
  //查找产品
  get_product_list: function(isPage) {
    let that = this;
    this.setWhere();
    if (that.data.loadend) return;
    if (that.data.loading) return;
    if (isPage === true) that.setData({
      productList: []
    });
    that.setData({
      loading: true,
      loadTitle: ''
    });
    console.log("tt" + that.data.where);
    getProductslist(that.data.where).then(res => {
      console.log("getProductslist",res)
      let list = res.data;
      let productList = app.SplitArray(list, that.data.productList);
      let loadend = list.length < that.data.where.limit;
      
      that.setData({
        loadend: loadend,
        loading: false,
        loadTitle: loadend ? '已全部加载' : '加载更多',
        productList: productList,
        ['where.page']: that.data.where.page + 1,
      });
    }).catch(err => {
      that.setData({
        loading: false,
        loadTitle: '加载更多'
      });
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
    this.setData({
      ['where.page']: 1,
      loadend: false,
      productList: []
    });
    this.get_product_list();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.get_product_list();
  },
})