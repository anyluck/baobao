import {
  Config
} from 'config.js';

/**
 * 封装 http 函数，默认‘GET’ 提交
 */
function http_get(toUrl, getData, httpCallBack) {
  wx.request({
    url: Config.restUrl + toUrl,
    data: getData,
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      //回调处理
      httpCallBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}
/**
 * 封装 http 函数，默认‘GET’ 提交
 */
function http_post(toUrl, postData, httpCallBack) {
  wx.request({
    url: Config.restUrl + toUrl,
    data: postData,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    success: function (res) {
      //回调处理
      return typeof httpCallBack == "function" && httpCallBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}
/**
 * 弹出提示层 整理
 * tag为标识  1：成功  0：失败
 */
function showToast(tag, message) {
  var icon = tag ? 'success' : 'none';
  wx.showToast({
    title: message,
    icon: icon,
    duration: 1500
  })
}
function getUpAmount(vip_id, VipList) {
  console.log("gogo", vip_id);
  console.log("gogo2", VipList);
  for (var i in VipList) {
    if (VipList[i].id == vip_id)
      return VipList[i].money;
  }
  // return upAmount[vip_id];
}
module.exports = {
  http_get: http_get,
  http_post: http_post,
  showToast: showToast,
  getUpAmoun: getUpAmount
}
