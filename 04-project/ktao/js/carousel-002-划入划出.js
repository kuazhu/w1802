/*
* @Author: TomChen
* @Date:   2019-02-27 20:22:10
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-04 18:57:01
*/
;(function($){

function Carousel($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$carouselItem = this.$elem.find('.carousel-item');
	this.itemNum = this.$carouselItem.length;
	this.now = this._getCorrectIndex(this.options.activeIndex);	
	this.$btns = this.$elem.find('.btn-item');
	this.$controlBtns = this.$elem.find('.control');
	this.timer = 0;
	//2.初始化
	this.init();
}
Carousel.prototype = {
	constructor:Carousel,
	init:function(){
		var _this = this;

		if(this.options.slide){//划入划出
			//隐藏所有的页面
			this.$elem.addClass('slide');
			//显示默认的第一张
			this.$carouselItem.eq(this.now).css({left:0});
			this.itemWidth = this.$carouselItem.eq(this.now).width();	
			//初始化移动插件
			this.$carouselItem.move(this.options);

			this.tab = this._slide;
																	
		}else{//淡入淡出
			//隐藏所有的页面
			this.$elem.addClass('fade');
			//显示默认的第一张
			this.$carouselItem.eq(this.now).show();
			//初始化显示隐藏插件
			this.$carouselItem.showHide(this.options);
			
			this.tab = this._fade;
		
		}
		//显示默认的指示按钮
		this.$btns.eq(this.now).addClass('active');	
		//监听事件
		this.$elem
		.hover(function(){//显示隐藏左右按钮
			this.$controlBtns.show();
		}.bind(this),function(){
			this.$controlBtns.hide();
		}.bind(this))
		.on('click','.control-left',function(){//点击左边按钮,图片向右划
			this.tab(this._getCorrectIndex(this.now-1),-1);
		}.bind(this))
		.on('click','.control-right',function(){//点击右边按钮,图片向左划
			this.tab(this._getCorrectIndex(this.now+1),1);
		}.bind(this));
		//监听底部指示按钮
		this.$btns.on('click',function(){
			_this.tab(_this.$btns.index($(this)));
		});
		//自动播放
		if(this.options.interval){
			this.autoplay();
			this.$elem.hover($.proxy(this.pause,this),$.proxy(this.autoplay,this));
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
	_slide:function(index,direction){
		//index 代表即将显示的
		//direction 代表方向 -1代表图片向右划 1代表图片向左划
		if(this.now == index) return;
		//点击按钮时确定方向
		if(!direction){
			if(index > this.now){
				direction = 1;
			}else{
				direction = -1;
			}			
		}
		//1.把即将显示的放入容器的左边或者右边
		this.$carouselItem.eq(index).css({left:direction * this.itemWidth});
		//2.把当前的移除
		this.$carouselItem.eq(this.now).move('x',-1 * direction * this.itemWidth);
		//3.把即将显示放入容器
		this.$carouselItem.eq(index).move('x',0);
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
	activeIndex:9,
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







