/*
* @Author: TomChen
* @Date:   2019-02-27 20:22:10
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-01 20:25:21
*/
;(function($){

var cache = {
	data:{},
	count:0,
	addData:function(key,val){
		this.data[key] = val;
		this.count++;
	},
	getData:function(key){
		return this.data[key];
	}
}

function Search($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$searchBtn = $elem.find('.search-btn');
	this.$searchInput = $elem.find('.search-input');
	this.$searchForm = $elem.find('.search-form');
	this.$searchLayer = $elem.find('.search-layer');

	this.isLoaded = false;
	this.timer = 0;
	this.jqXHR = null;
	//2.初始化
	this.init();
	if(this.options.autocomplete){
		this.autocomplete();
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
	autocomplete:function(){
		//1.初始化显示隐藏插件
		this.$searchLayer.showHide(this.options);
		//2.监听输入框input事件
		this.$searchInput.on('input',function(){
			//防止快速输入多次请求
			if(this.options.getDataDelay){
				clearTimeout(this.timer);
				this.timer = setTimeout(function(){
					this.getData();
				}.bind(this),this.options.getDataDelay)
			}else{
				this.getData();
			}
		}.bind(this));
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
		// console.log('cache',cache);
		if(cache.getData(inputVal)){
			this.$elem.trigger('getData',[cache.getData(inputVal)]);
			return;
		}
		console.log('will trigger ajax....');

		if(this.jqXHR){
			this.jqXHR.abort();
		}
		this.jqXHR = $.ajax({
			url:this.options.url+this.getInputVal(),
			dataType:"jsonp",
			jsonp:"callback"
		})
		.done(function(data){
			this.$elem.trigger('getData',[data])			
			cache.addData(inputVal,data);
		}.bind(this))
		.fail(function(err){
			this.$elem.trigger('getNoData')	
		}.bind(this))
		.always(function(){
			this.jqXHR = null;
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
	autocomplete:true,
	// url:"https://suggest.taobao.com/sug?&q="
	url:"http://127.0.0.1:3001/?&q=",
	js:true,
	mode:"slideDownUp",
	getDataDelay:200
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







