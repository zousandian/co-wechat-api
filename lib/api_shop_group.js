// 商品分组管理接口
var util = require('./util');

var postJSON = util.postJSON;

/**
 * 创建商品分组
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.createGoodsGroup(groupName, productList, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success",
 *  "group_id": 19
 * }
 * ```
 * @param {String}      groupName 分组名
 * @param {Array}       productList 该组商品列表
 * @param {Function}    callback 回调函数
 */
exports.createGoodsGroup = function (groupName, productList) {
  this.preRequest(this._createGoodsGroup, arguments);
};

exports._createGoodsGroup = function (groupName, productList) {
  var data = {
    "group_detail": {
      "group_name": groupName,
      "product_list": productList && productList.length ? productList: []
    }
  };
  var url = this.merchantPrefix + 'group/add?access_token=' + token.accessToken;
  return yield * this.request(url, postJSON(data));
};

/**
 * 删除商品分组
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.deleteGoodsGroup(groupId, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {String}      groupId 分组ID
 * @param {Function}    callback 回调函数
 */

exports.deleteGoodsGroup = function (groupId) {
  this.preRequest(this._deleteGoodsGroup, arguments);
};

exports._deleteGoodsGroup = function (groupId) {
  var data = {
    "group_id": groupId
  };
  var url = this.merchantPrefix + 'group/del?access_token=' + token.accessToken;
  return yield * this.request(url, postJSON(data));
};

/**
 * 修改商品分组属性
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.updateGoodsGroup(groupId, groupName, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {String}      groupId 分组ID
 * @param {String}      groupName 分组名
 * @param {Function}    callback 回调函数
 */
exports.updateGoodsGroup = function (groupId, groupName) {
  this.preRequest(this._updateGoodsGroup, arguments);
};

exports._updateGoodsGroup = function (groupId, groupName) {
  var data = {
    "group_id": groupId,
    "group_name": groupName
  };
  var url = this.merchantPrefix + 'group/propertymod?access_token=' + token.accessToken;
  return yield * this.request(url, postJSON(data));
};

/**
 * 修改商品分组内的商品
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.updateGoodsForGroup(groupId, addProductList, delProductList, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 * }
 * ```
 * @param {Object}      groupId 分组ID
 * @param {Array}       addProductList 待添加的商品数组
 * @param {Array}       delProductList 待删除的商品数组
 * @param {Function}    callback 回调函数
 */
exports.updateGoodsForGroup = function (groupId, addProductList, delProductList) {
  this.preRequest(this._updateGoodsForGroup, arguments);
};

exports._updateGoodsForGroup = function (groupId, addProductList, delProductList) {
  var data = {
    "group_id": groupId,
    "product": []
  };

  if (addProductList && addProductList.length) {
    addProductList.forEach(function (val) {
      data.product.push({
        "product_id": val,
        "mod_action": 1
      });
    });
  }

  if (delProductList && delProductList.length) {
    delProductList.forEach(function (val) {
      data.product.push({
        "product_id": val,
        "mod_action": 0
      });
    });
  }

  var url = this.merchantPrefix + 'group/productmod?access_token=' + token.accessToken;
  return yield * this.request(url, postJSON(data));
};

/**
 * 获取所有商品分组
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.getAllGroups();
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 *  "groups_detail": [
 *    {
 *      "group_id": 200077549,
 *      "group_name": "新品上架"
 *    },{
 *      "group_id": 200079772,
 *      "group_name": "全球热卖"
 *    }
 *  ]
 * }
 * ```
 * @param {Function}    callback 回调函数
 */
exports.getAllGroups = function () {
  this.preRequest(this._getAllGroups, arguments);
};

exports._getAllGroups = function () {
  var url = this.merchantPrefix + 'group/getall?access_token=' + token.accessToken;
  return yield * this.request(url, {dataType: 'json'});
};

/**
 * 根据ID获取商品分组
 * 详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=微信小店接口>
 * Examples:
 * ```
 * api.getGroupById(groupId, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "errcode": 0,
 *  "errmsg": "success"
 *  "group_detail": {
 *    "group_id": 200077549,
 *    "group_name": "新品上架",
 *    "product_list": [
 *      "pDF3iYzZoY-Budrzt8O6IxrwIJAA",
 *      "pDF3iY3pnWSGJcO2MpS2Nxy3HWx8",
 *      "pDF3iY33jNt0Dj3M3UqiGlUxGrio"
 *    ]
 *  }
 * }
 * ```
 * @param {String}      groupId 分组ID
 * @param {Function}    callback 回调函数
 */
exports.getGroupById = function (groupId) {
  this.preRequest(this._getGroupById, arguments);
};

exports._getGroupById = function (groupId) {
  var data = {
    "group_id": groupId
  };
  var url = this.merchantPrefix + 'group/getbyid?access_token=' + token.accessToken;
  return yield * this.request(url, postJSON(data));
};