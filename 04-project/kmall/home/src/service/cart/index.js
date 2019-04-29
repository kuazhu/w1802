/*
* @Author: TomChen
* @Date:   2019-04-24 19:11:15
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-29 19:01:59
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
	selectAll:function(success,error){
		_util.request({
			url:'/cart/selectAll',
			method:'put',
			success:success,
			error:error			
		})			
	},
	unselectAll:function(success,error){
		_util.request({
			url:'/cart/unselectAll',
			method:'put',
			success:success,
			error:error			
		})			
	},
	deleteOne:function(data,success,error){
		_util.request({
			url:'/cart/deleteOne',
			method:'put',
			data:data,
			success:success,
			error:error			
		})		
	},
	deleteSelected:function(success,error){
		_util.request({
			url:'/cart/deleteSelected',
			method:'put',
			success:success,
			error:error			
		})			
	},
	updateCount:function(data,success,error){
		_util.request({
			url:'/cart/updateCount',
			method:'put',
			data:data,
			success:success,
			error:error			
		})		
	},				
}

module.exports = _cart;