/*
* @Author: TomChen
* @Date:   2019-04-28 10:44:41
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-28 11:48:15
*/
require('./index.css');
var _util = require('util');
var tpl = require('./index.tpl');

;(function($){
	function Pagination($elem){
		this.$elem = $elem;
		this.bindEvent();
	}
	Pagination.prototype = {
		constructor:Pagination,
		bindEvent:function(){
			var _this = this;
			this.$elem.on('click','.page-item',function(){
				var $this = $(this);
				if($this.hasClass('active') || $this.hasClass('disabled')){
					return;
				}
				_this.$elem.trigger('page-change',$this.data('value'))
			})
		},
		render:function(options){
			//1.计算总页数
			var pages = Math.ceil(options.total/options.pageSize)
			if(pages <= 1){
				return;
			}
			//上一页 1 2 3 *4 5 6 7 下一页
			//上一页 2 3 4 *5 6 7 8 下一页
			//上一页 5 6 7 *8 9 10 11 下一页
			var start = options.current - options.range > 1 ? (options.current - options.range) : 1
			var end = options.current + options.range > pages ? pages : (options.current + options.range)
			var prev = options.current  - 1;
			var next = options.current + 1;
			var pageArray = [];

			pageArray.push({
				name:'上一页',
				value:prev,
				disabled:prev == 0 ? true : false
			})

			for(var i = start; i<=end;i++){
				pageArray.push({
					name:i,
					value:i,
					active:options.current == i
				})
			}
			pageArray.push({
				name:'下一页',
				value:next,
				disabled:next > pages ? true : false
			})
			var html = _util.render(tpl,{
				pageArray:pageArray,
				current:options.current,
				pages:pages
			})
			this.$elem.html(html)
		}
	}
	Pagination.DEFAULT = {
		range:3
	}
	//注册插件
	$.fn.extend({
		pagination:function(fn,options){
			return this.each(function(){
				var $this = $(this);
				var pagination = $this.data('pagination');
				if(!pagination){
					pagination = new Pagination($this);
					$this.data('pagination',pagination)
				}
				if(typeof pagination[fn] == 'function'){
					options = $.extend({},Pagination.DEFAULT,options)
					pagination[fn](options)
				}

			})
		}
	})

})($)