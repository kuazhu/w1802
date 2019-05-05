/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-05 09:11:52
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
var _side = require('pages/common/side')
require('./index.css')
var _util = require('util')
var _order = require('service/order')
var tpl = require('./index.tpl')
var page = {
	params:{
		page:_util.getParamFromUrl('page') || 1,
	},	
	init:function(){
		this.$elem = $('.order-box');
		this.initPagination();
		this.onload();
		this.loadOrderList();
	},
	onload:function(){
		_side.render('order-list')
	},
	initPagination:function(){
		var _this = this;
		this.$pagination = $('.pagination-box');
		this.$pagination.on('page-change',function(ev,value){
			_this.params.page = value;
			_this.loadOrderList();
		})
		this.$pagination .pagination();
	},
	loadOrderList:function(){
		var _this = this;
		_order.getOrderList(this.params,function(result){
			if(result.list.length > 0){
				//适配数据
				result.list.forEach(function(order){
					order.productList.forEach(function(product){
						product.image = product.images.split(',')[0]
					})
					order.createdTime = new Date(order.createdAt).toLocaleString()
				})
				console.log(result.list)
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
				_this.$elem.html('<p class="empty-msg">您还没有订单</p>')
			}
		},function(msg){
			_util.showErrorMsg(msg)
		})
	}
}
$(function(){
	page.init();
})