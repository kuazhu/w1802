/*
* @Author: TomChen
* @Date:   2019-02-27 20:22:10
* @Last Modified by:   TomChen
* @Last Modified time: 2019-02-28 20:51:39
*/
;(function($){

function Search($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$searchBtn = $elem.find('.search-btn');
	this.$searchInput = $elem.find('.search-input');
	this.$searchForm = $elem.find('.search-form');
	//2.初始化
	this.init();
}
Search.prototype = {
	constructor:Search,
	init:function(){
		//1.绑定事件
		this.$searchBtn.on('click',$.proxy(this.submit,this));
	},
	submit:function(){
		if(this.getInputVal()==''){
			return false;
		}
		this.$searchForm.trigger('submit');

	},
	getInputVal:function(){
		return $.trim(this.$searchInput.val());
	}
}
Search.DEFAULTS = {

}

$.fn.extend({
	search:function(options){
		return this.each(function(){
			var $elem = $(this);
			var search = $elem.data('search');
			if(!search){
				options = $.extend({},Search.DEFAULTS,options);
				search = new Search($elem,options);
				$elem.data('search',search);				
			}
			if(typeof search[options] == 'function'){
				search[options]();
			}
		});
	}
})
	
})(jQuery);







