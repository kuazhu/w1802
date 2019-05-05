/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-05 10:10:24
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var _side = require('pages/common/side')
require('./index.css')
var _util = require('util')
var _order = require('service/order')
var tpl = require('./index.tpl')
var page = {
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || '',
	},	
	init:function(){
		this.$elem = $('.order-box');
		this.onload();
		this.loadOrderDetail();
	},
	onload:function(){
		_side.render('order-list')
	},
	loadOrderDetail:function(){
		var _this = this;
		if(this.params.orderNo){
			_order.getOrder(this.params,function(order){
				_this.renderOrderDetail(order)
			},function(msg){
				_this.$elem.html('<p class="empty-msg">获取订单失败</p>')
			})			
		}else{
			_this.$elem.html('<p class="empty-msg">订单号不存在</p>')
		}

	},
	renderOrderDetail:function(order){
		if(order){
			//适配数据
			order.productList.forEach(function(product){
				product.image = product.images.split(',')[0]
			})
			order.createdTime = new Date(order.createdAt).toLocaleString()			
			order.canPay = order.canCancel = order.status == '10'

			var html = _util.render(tpl,order)
			this.$elem.html(html)
		}else{
			this.$elem.html('<p class="empty-msg">订单不存在</p>')
		}
	}
}
$(function(){
	page.init();
})