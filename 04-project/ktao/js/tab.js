/*
* @Author: TomChen
* @Date:   2019-02-27 20:22:10
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-05 19:09:30
*/
;(function($){

function Tab($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$tabItems = this.$elem.find('.tab-item');
	this.$tabPanels = this.$elem.find('.tab-panel');
	this.itemNum = this.$tabItems.length;
	this.now = this._getCorrectIndex(this.options.activeIndex);	
	this.timer = 0;
	//2.初始化
	this.init();
}
Tab.prototype = {
	constructor:Tab,
	init:function(){
		var _this = this;
		//1.初始化显示
		this.$tabItems.eq(this.now).addClass('tab-item-active');
		this.$tabPanels.eq(this.now).show();
		/*
		this.$tabPanels.on('show shown hide hidden',function(ev){
			console.log(_this.$tabPanels.index(this),ev.type);
		});
		*/
		this.$elem.trigger('tab-show',[this.now,this.$tabPanels[this.now]]);
		this.$tabPanels.on('show',function(ev){
			_this.$elem.trigger('tab-show',[_this.$tabPanels.index(this),this]);
		});
		//2.初始化显示隐藏插件
		this.$tabPanels.showHide(this.options);
		//3.监听事件
		var eventName = this.options.eventName == 'click' ? 'click' : 'mouseenter';
		
		this.$elem.on(eventName,'.tab-item',function(){
			_this._toggle(_this.$tabItems.index(this));
		});
		//自动播放
		if(this.options.interval){
			this.autoplay();
			this.$elem.hover($.proxy(this.pause,this),$.proxy(this.autoplay,this));
		}				

	},
	_toggle:function(index){
		if(this.now == index) return;
		//index代表即将显示的
		this.$tabItems.eq(this.now).removeClass('tab-item-active');
		this.$tabPanels.eq(this.now).showHide('hide');

		this.$tabItems.eq(index).addClass('tab-item-active');
		this.$tabPanels.eq(index).showHide('show');

		this.now = index;					
	},
	_getCorrectIndex:function(index){
		if(index < 0) return this.itemNum - 1;
		if(index >= this.itemNum) return 0;
		return index;
	},
	autoplay:function(){
		this.timer = setInterval(function(){
			this._toggle(this._getCorrectIndex(this.now+1));
		}.bind(this),this.options.interval);
	},
	pause:function(){
		clearInterval(this.timer);
	}
}
Tab.DEFAULTS = {
	js:false,
	mode:'fade',
	activeIndex:0,
	interval:0,
	eventName:''
}

$.fn.extend({
	tab:function(options){
		return this.each(function(){
			var $elem = $(this);
			var tab = $elem.data('tab');
			if(!tab){
				options = $.extend({},Tab.DEFAULTS,options);
				tab = new Tab($elem,options);
				$elem.data('tab',tab);				
			}
			if(typeof tab[options] == 'function'){
				tab[options]();
			}
		});
	}
})
	
})(jQuery);







