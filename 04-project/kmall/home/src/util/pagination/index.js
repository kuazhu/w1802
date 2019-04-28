/*
* @Author: TomChen
* @Date:   2019-04-28 10:44:41
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-28 10:54:55
*/
require('./index.css')

;(function($){
	function Pagination($elem){
		this.$elem = $elem;
		this.bindEvent();
	}
	Pagination.prototype = {
		constructor:Pagination,
		bindEvent:function(){

		},
		render:function(options){
			console.log(options)
		}
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
					pagination[fn](options)
				}

			})
		}
	})

})($)