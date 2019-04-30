/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-30 19:35:24
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _order = require('service/order')
var _shipping = require('service/shipping')
var _modal = require('./modal.js')
var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
var page = {
	init:function(){
		this.$shippingBox = $('.shipping-box');
		this.$productBox = $('.product-box');
		this.selectedShippingId = '';
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShipping();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this = this;
		this.$shippingBox.on('get-shippings',function(ev,shippings){
			_this.renderShipping(shippings)
		})
		//1.弹出地址框
		this.$shippingBox.on('click','.shipping-add',function(){
			_modal.show()
		})
		//2.删除地址
		this.$shippingBox.on('click','.shipping-delete',function(ev){
			//阻止冒泡防止点击时选中
			ev.stopPropagation();
			if(_util.confirm('你确定要删除这个地址吗?')){
				var shippingId = $(this).parents('.shipping-item').data('shipping-id')
				_shipping.deleteShipping({shippingId:shippingId},function(shippings){
					_this.renderShipping(shippings)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		})
		//3.编辑地址
		this.$shippingBox.on('click','.shipping-edit',function(ev){
			//阻止冒泡防止点击时选中
			ev.stopPropagation();
			var shippingId = $(this).parents('.shipping-item').data('shipping-id')
			_shipping.getShipping({shippingId:shippingId},function(shipping){
				_modal.show(shipping)
			})
		})
		//4.选择地址
		this.$shippingBox.on('click','.shipping-item',function(){
			var $this = $(this);
			$this.addClass('active')
			.siblings('.shipping-item').removeClass('active');

			//保存选中的地址ID
			_this.selectedShippingId = $this.data('shipping-id')

		})
		//5.去支付
		this.$productBox.on('click','.btn-submit',function(){
			if(_this.selectedShippingId){
				_order.createOrder({shippingId:_this.selectedShippingId},function(order){
					window.location.href = "./payment.html?orderNo="+order.orderNo
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}else{
				_util.showErrorMsg('请选择地址后再提交!!!')
			}
		})									
	},
	loadShipping:function(){
		var _this = this;
		_shipping.getShippingList(function(shippings){
			_this.renderShipping(shippings)
		},function(msg){
			_util.showErrorMsg(msg)
		})
	},
	renderShipping:function(shippings){
		var _this = this;
		//标注别选中的地址
		shippings.forEach(function(shipping){
			if(shipping._id == _this.selectedShippingId){
				shipping.active = true
			}
		})
		var html = _util.render(shippingTpl,{
			shippings:shippings
		})
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
				_this.$productBox.html('<p class="empty-msg">还没有选择购物车中的数据!</p>')	
			}			
		},function(msg){
			_this.$productBox.html('<p class="empty-msg">加载购物信息失败！！！</p>')
		})
	}

}
$(function(){
	page.init();
})