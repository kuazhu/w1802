/*
* @Author: TomChen
* @Date:   2019-04-24 19:11:15
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-29 18:13:49
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
	selectOne:function(data,success,error){
		_util.request({
			url:'/cart/selectOne',
			method:'put',
			data:data,
			success:success,
			error:error			
		})		
	},
	unselectOne:function(data,success,error){
		_util.request({
			url:'/cart/unselectOne',
			method:'put',
			data:data,
			success:success,
			error:error			
		})		
	},		
}

module.exports = _cart;