/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-26 20:44:50
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _product = require('service/product')
var tpl = require('./index.tpl')
var page = {
	listParam:{
		keyword:_util.getParamFromUrl('keyword') || '',
		categoryId:_util.getParamFromUrl('categoryId') || ''
	},
	init:function(){
		this.loadProductList();
	},
	loadProductList:function(){
		this.listParam.keyword ? (delete this.listParam.categoryId) : (delete this.listParam.keyword)
		_product.getProductList(this.listParam,function(result){
			
			result.list.forEach(function(product){
				product.image = product.images.split(',')[0]
			})

			var html = _util.render(tpl,{
				list:result.list
			})
			$('.product-list-box').html(html)

		},function(msg){
			_util.showErrorMsg(msg)
		})
	}

}
$(function(){
	page.init();
})