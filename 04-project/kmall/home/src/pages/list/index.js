/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-28 15:35:52
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
require('./index.css')
var _util = require('util')
var _product = require('service/product')
var tpl = require('./index.tpl')
var page = {
	listParam:{
		keyword:_util.getParamFromUrl('keyword') || '',
		categoryId:_util.getParamFromUrl('categoryId') || '',
		orderBy:_util.getParamFromUrl('orderBy') || 'default',
		page:_util.getParamFromUrl('page') || 1,
	},
	init:function(){
		this.$elem = $('.product-list-box');
		this.initPagination();
		this.loadProductList();
		this.bindEvent();
	},
	initPagination:function(){
		var _this = this;
		this.$pagination = $('.pagination-box');
		this.$pagination.on('page-change',function(ev,value){
			_this.listParam.page = value;
			_this.loadProductList();
		})
		this.$pagination .pagination();
	},
	bindEvent:function(){
		var _this = this;
		//绑定排序事件
		$('.sort-item').on('click',function(){
			var $this = $(this);
			//1.点击默认排序按钮
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return;
				}
				$this.addClass('active')
				.siblings('.sort-item').removeClass('active');

				_this.listParam.orderBy = 'default';
			}
			//2.点击按价格排序按钮
			else if($this.hasClass('price')){
				$this.addClass('active')
				.siblings('.sort-item').removeClass('active');
				if($this.hasClass('asc')){
					
					$this.addClass('desc')
					.removeClass('asc');
					_this.listParam.orderBy = 'price_desc';

				}else if($this.hasClass('desc')){
					$this.addClass('asc')
					.removeClass('desc');
					_this.listParam.orderBy = 'price_asc';
				}
			}
			_this.listParam.page = 1;
			_this.loadProductList();
		});
	},
	loadProductList:function(){
		var _this = this;
		this.listParam.keyword ? (delete this.listParam.categoryId) : (delete this.listParam.keyword)
		_product.getProductList(this.listParam,function(result){
			if(result.list.length > 0){
				result.list.forEach(function(product){
					product.image = product.images.split(',')[0]
				})

				var html = _util.render(tpl,{
					list:result.list
				})
				_this.$elem.html(html)
				//调用分页组件
				_this.$pagination .pagination('render',{
					current:result.current,
					total:result.total,
					pageSize:result.pageSize
				})
			}else{
				_this.$elem.html('<p class="empty-msg">你找的商品去火星啦！！！</p>')
			}

		},function(msg){
			_util.showErrorMsg(msg)
		})
	}

}
$(function(){
	page.init();
})