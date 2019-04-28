/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-28 16:48:14
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
require('./index.css')
var _util = require('util')
var _product = require('service/product')
var _cart = require('service/cart')
var tpl = require('./index.tpl')
var page = {
	params:{
		productId:_util.getParamFromUrl('productId') || '',
	},
	init:function(){
		this.$elem = $('.detail-box');
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		if(this.params.productId){
			this.loadProductDetail();
		}
	},
	bindEvent:function(){
		var _this = this;
		//1.图片切换
		this.$elem.on('mouseenter','.product-small-img-item',function(){
			var $this = $(this);
			$this.addClass('active')
			.siblings('.product-small-img-item').removeClass('active');

			var imgSrc = $this.find('img').attr('src');
			$('.product-main-img img').attr('src',imgSrc);
		})
		//2.处理商品数量
		this.$elem.on('click','.count-btn',function(){
			var $this = $(this);
			var $input = $('.count-input'); 
			var current = parseInt($input.val())
			if($this.hasClass('plus')){
				$input.val(current + 1 >= _this.stock ? _this.stock : current + 1)
			}
			else if($this.hasClass('minus')){
				$input.val(current - 1 <= 1 ? 1 : current - 1)
			}
		})
		//3.添加购物车
		this.$elem.on('click','.add-cart-btn',function(){
			_cart.addCart({
				productId:_this.params.productId,
				count:$('.count-input').val()
			},function(){
				window.location.href = './result.html?type=addCart'
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})
	},
	loadProductDetail:function(){
		var _this = this;
		_product.getProductDetail(this.params,function(product){
			if(product){
				//处理图片
				product.images = product.images.split(',')
				product.mainImg = product.images[0]
				//缓存库存值用来处理商品数量时校验
				_this.stock = product.stock
				var html = _util.render(tpl,product)
				_this.$elem.html(html);
			}else{
				_this.$elem.html('<p class="empty-msg">你找的商品去火星啦！！！</p>')	
			}
		},function(msg){
			_this.$elem.html('<p class="empty-msg">你找的商品去火星啦！！！</p>')
		})
	}

}
$(function(){
	page.init();
})