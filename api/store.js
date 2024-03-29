import request from "./../utils/request.js";
/**
 *
 * 产品相关接口
 *
 */


/**
 * 删除上架商品
 *
 */
export function delmygood(data) {
  return request.post("shop/del_louchens", data);
}

/**
 * 删除货源通知
 *
 */
export function delhuoyuan(data) {
  return request.post("shop/del_louchen", data);
}




/**
 * 获取分销商品
 *
 */
export function getMygoods(data) {
  return request.post("shop/louchen", data);
}




/**
 * 设置商品楼层
 *
 */
export function setFloor(data) {
  return request.post("shop/louchen_status", data);
}




/**
 * 获取推荐产品
 *
 */
export function getProductHot(page,limit) {
  return request.get("product/hot", {
    page: page === undefined ? 1 : page,
    limit:limit === undefined ? 4 :limit
  },{noAuth:true});
}

/**
 * 购车添加
 *
 */
export function postCartAdd(data) {
  return request.post('cart/add', data);
}

/**
 * 获取浏览足迹
 * @param object data
 */
export function getfootprint(data) {
  return request.post('footprints', data);
}


/**
 * 获取收藏列表
 * @param object data
 */
export function getCollectUserList(data) {
  return request.get('collect/user', data)
}

/**
 * 批量收藏
 *
 * @param object id  产品编号 join(',') 切割成字符串
 * @param string category
 */
export function collectAll(id, category) {
  return request.post('collect/all', { id: id, category: category === undefined ? 'product' : category });
}

// 
/**
 * 删除足迹
 * @param int id
 * @param string category product=普通产品,product_seckill=秒杀产品
 */
export function delFoot(id) {
  return request.post('del_footprints', { shopid: id });
}

/**
 * 删除收藏产品
 * @param int id
 * @param string category product=普通产品,product_seckill=秒杀产品
 */
export function collectDel(id, category) {
  return request.post('collect/del', { id: id, category: category === undefined ? 'product' : category });
}

/**
 * 添加收藏
 * @param int id
 * @param string category product=普通产品,product_seckill=秒杀产品
 */
export function collectAdd(id, category){
  return request.post('collect/add', { id: id, 'product': category === undefined ? 'product' : category });
}
/** 
 * 刷点击
*/
export function addPageView(id)
{
  return request.post('product/addPageView', { id: id});
}
/**
 * 获取产品详情
 * @param int id
 *
 */
export function getProductDetail(id){
  return request.get('product/detail/' + id, {}, { noAuth : true });
}

/**
 * 产品分享二维码 推广员
 * @param int id
 */
export function getProductCode(id){
  return request.get('product/code/' + id, { user_type:'routine'});
}

/**
 * 获取产品评论
 * @param int id
 * @param object data
 *
 */
export function getReplyList(id,data){
  return request.get('reply/list/'+id,data)
}

/**
 * 产品评价数量和好评度
 * @param int id
 */
export function getReplyConfig(id){
  return request.get('reply/config/'+id);
}

/**
 * 获取分类列表
 *
 */
export function getCategoryList(vip_id, uid, spread_uid){
  return request.get('category', { 'vip_id': vip_id, 'uid': uid, 'spread_uid': spread_uid}, { noAuth:true})
}
export function getCategoryListManage(vip_id, uid, spread_uid) {
  return request.get('mycategory', { 'vip_id': vip_id, 'uid': uid, 'spread_uid': spread_uid }, { noAuth: true })
}

/**
 * 获取产品列表
 * @param object data
 */
export function getProductslist(data){
  return request.get('products',data,{noAuth:true});
}
export function getMyProductslist(data) {
  return request.get('myproducts', data, { noAuth: true });
}
/**
 * 首页产品的轮播图和产品信息
 * @param int type
 *
 */
export function getGroomList(type){
  return request.get('groom/list/'+type,{},{noAuth:true});
}

/**
 * 获取搜索关键字获取
 *
 */
export function getSearchKeyword(){
  return request.get('search/keyword',{},{noAuth:true});
}




/*
 * 修改价格
 * */
export function setPrice(data) {
  return request.post("shop/exhibit_change", data);
}


/*
 * 加盟
 * */
export function addDistributionProduct(data) {
  return request.post("store/addDistributionProduct", data);
}
export function DropDistributionProduct(data) {
  return request.post("store/DropDistributionProduct", data);
}
export function getBrandList() {
  return request.get("product/brandlist", {}, { noAuth: false });
}
