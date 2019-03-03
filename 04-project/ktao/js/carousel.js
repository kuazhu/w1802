/*
* @Author: TomChen
* @Date:   2019-02-27 20:22:10
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-03 15:58:39
*/
;(function($){

function Carousel($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.now = this.options.activeIndex;
	this.$carouselItem = this.$elem.find('.carousel-item');
	this.itemNum = this.$carouselItem.length;
	this.$btns = this.$elem.find('.btn-item');
	this.$controlBtns = this.$elem.find('.control');
	this.timer = 0;
	//2.初始化
	this.init();
}
Carousel.prototype = {
	constructor:Carousel,
	init:function(){

		if(this.options.slide){//划入划出

		}else{//淡入淡出
			//隐藏所有的页面
			this.$elem.addClass('fade');
			//显示默认的第一张
			this.$carouselItem.eq(this.now).show();
			//显示默认的指示按钮
			this.$btns.eq(this.now).addClass('active');
			//初始化显示隐藏插件
			this.$carouselItem.showHide(this.options);
			//监听事件
			this.$elem
			.hover(function(){//显示隐藏左右按钮
				this.$controlBtns.show();
			}.bind(this),function(){
				this.$controlBtns.hide();
			}.bind(this))
			.on('click','.control-left',function(){//点击左边按钮
				this._fade(this._getCorrectIndex(this.now-1));
			}.bind(this))
			.on('click','.control-right',function(){//点击右边按钮
				this._fade(this._getCorrectIndex(this.now+1));
			}.bind(this));

			//监听底部指示按钮
			var _this = this;
			this.$btns.on('click',function(){
				_this._fade(_this.$btns.index($(this)));
			});

			//自动播放
			if(this.options.interval){
				this.autoplay();
				this.$elem.hover($.proxy(this.pause,this),$.proxy(this.autoplay,this));
			}			
		}
	},
	_fade:function(index){
		
		if(this.now == index) return;

		//index 代表即将显示的
		//1.隐藏当前的
		this.$carouselItem.eq(this.now).showHide('hide');
		//2.显示即将显示的
		this.$carouselItem.eq(index).showHide('show');

		//处理底部指示按钮
		this.$btns.eq(this.now).removeClass('active');
		this.$btns.eq(index).addClass('active');

		this.now = index;
	},
	_getCorrectIndex:function(index){
		if(index < 0) return this.itemNum - 1;
		if(index >= this.itemNum) return 0;
		return index;
	},
	autoplay:function(){
		this.timer = setInterval(function(){
			this.$controlBtns.eq(1).trigger('click')
		}.bind(this),this.options.interval);
	},
	pause:function(){
		clearInterval(this.timer);
	}
}
Carousel.DEFAULTS = {
	js:true,
	mode:'fade',
	slide:true,
	activeIndex:1,
	interval:1000
}

$.fn.extend({
	carousel:function(options){
		return this.each(function(){
			var $elem = $(this);
			var carousel = $elem.data('carousel');
			if(!carousel){
				options = $.extend({},Carousel.DEFAULTS,options);
				carousel = new Carousel($elem,options);
				$elem.data('carousel',carousel);				
			}
			if(typeof carousel[options] == 'function'){
				carousel[options]();
			}
		});
	}
})
	
})(jQuery);







