/*
* @Author: TomChen
* @Date:   2019-04-24 19:11:15
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-30 20:10:40
*/
var _util = require('util')

var _payment = {
	getPaymentInfo:function(data,success,error){
		_util.request({
			url:'/payment/info',
			data:data,
			success:success,
			error:error			
		})			
	},
	getPaymentStatus:function(data,success,error){
		_util.request({
			url:'/payment/status',
			data:data,
			success:success,
			error:error			
		})			
	}				
}

module.exports = _payment;