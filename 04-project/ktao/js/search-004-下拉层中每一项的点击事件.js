/*
* @Author: TomChen
* @Date:   2019-02-27 20:22:10
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-01 19:38:23
*/
;(function($){

function Search($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$searchBtn = $elem.find('.search-btn');
	this.$searchInput = $elem.find('.search-input');
	this.$searchForm = $elem.find('.search-form');
	this.$searchLayer = $elem.find('.search-layer');

	this.isLoaded = false;
	//2.初始化
	this.init();
	if(this.options.autocompelete){
		this.autocompelete();
	}
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
	},
	autocompelete:function(){
		//1.初始化显示隐藏插件
		this.$searchLayer.showHide(this.options);
		//2.监听输入框input事件
		this.$searchInput.on('input',$.proxy(this.getData,this));
		//3.点击页面其它地方隐藏下拉层
		$(document).on('click',$.proxy(this.hideLayer,this));
		//4.input获取焦点时显示下拉层
		this.$searchInput.on('focus',$.proxy(this.showLayer,this));
		//5.阻止input上的click事件冒泡到document上触发隐藏
		this.$searchInput.on('click',function(ev){
			ev.stopPropagation();
		});
		//6.用事件代理处理下拉层中每一项的点击事件
		var _this = this;
		this.$searchLayer.on('click','.search-item',function(){
			//1.获取下拉层中每一项的值
			var val = $(this).html();
			//2.设置input
			_this.setInputVal(val);
			//3.提交
			_this.submit();
		});
	},
	getData:function(){
		console.log('will get data....');
		var inputVal = this.getInputVal();

		if(inputVal == ''){
			this.appendHtml('');
			this.hideLayer();
			return;
		}

		$.ajax({
			url:this.options.url+this.getInputVal(),
			dataType:"jsonp",
			jsonp:"callback"
		})
		.done(function(data){
			this.$elem.trigger('getData',[data])			
			
		}.bind(this))
		.fail(function(err){
			this.$elem.trigger('getNoData')	
		}.bind(this))
	},
	showLayer:function(){
		if(!this.isLoaded) return;
		this.$searchLayer.showHide('show');
	},
	appendHtml:function(html){
		this.$searchLayer.html(html);
		this.isLoaded = !!html;
	},
	hideLayer:function(){
		this.$searchLayer.showHide('hide');
	},
	setInputVal:function(val){
		this.$searchInput.val(val.replace(/<[^<>]+>/g,''));
	}	
}

Search.DEFAULTS = {
	autocompelete:true,
	// url:"https://suggest.taobao.com/sug?&q="
	url:"http://127.0.0.1:3001/?&q=",
	js:true,
	mode:"slideDownUp"
}

$.fn.extend({
	search:function(options,val){
		return this.each(function(){
			var $elem = $(this);
			var search = $elem.data('search');
			if(!search){
				options = $.extend({},Search.DEFAULTS,options);
				search = new Search($elem,options);
				$elem.data('search',search);				
			}
			if(typeof search[options] == 'function'){
				search[options](val);
			}
		});
	}
})
	
})(jQuery);







