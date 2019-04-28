/*
* @Author: TomChen
* @Date:   2019-04-24 19:11:15
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-28 17:20:31
*/
var _util = require('util')

var _cart = {
	addCart:function(data,success,error){
		_util.request({
			url:'/cart',
			method:'post',
			data:data,
			success:success,
			error:error			
		})		
	},
	getCartCount:function(success,error){
		_util.request({
			url:'/cart/count',
			success:success,
			error:error			
		})			
	},
	getCart:function(success,error){
		_util.request({
			url:'/cart',
			success:success,
			error:error			
		})			
	},
}

module.exports = _cart;