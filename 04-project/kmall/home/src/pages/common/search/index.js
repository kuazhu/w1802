/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-26 18:57:20
*/
require('./index.css')
var _util = require('util')

var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		$('#btn-search').on('click',function(){
			_this.submitSearch();
		})
		$('.search-box input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitSearch();
			}
		})
	},
	submitSearch:function(){
		var keyword = $('#search-input').val();
		window.location.href = './list.html?keyword='+keyword
	},
}
$(function(){
	page.init();
})