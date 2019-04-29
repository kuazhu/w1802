/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-29 20:27:10
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _order = require('service/order')
var _modal = require('./modal.js')
var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
var page = {
	init:function(){
		this.$shippingBox = $('.shipping-box');
		this.$productBox = $('.product-box');
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShipping();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this = this;
		//1.弹出地址框
		this.$shippingBox.on('click','.shipping-add',function(){
			_modal.show()
		})							
	},
	loadShipping:function(){
		var html = _util.render(shippingTpl)
		this.$shippingBox.html(html)
	},
	loadProductList:function(){
		var _this = this;
		_order.getOrderProductList(function(result){
			if(result.cartList.length>0){
				//处理图片
				result.cartList.forEach(function(item){
					item.product.mainImg = item.product.images.split(',')[0]
				})
				var html = _util.render(productTpl,result);
				_this.$productBox.html(html)
			}else{
				this.$elem.html('<p class="empty-msg">还没有选择购物车中的数据!</p>')	
			}			
		},function(msg){
			_this.$productBox.html('<p class="empty-msg">加载购物信息失败！！！</p>')
		})
	}

}
$(function(){
	page.init();
})