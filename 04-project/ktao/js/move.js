/*
* @Author: TomChen
* @Date:   2019-03-03 17:13:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-03 17:25:51
*/
;(function($){
	function init($elem){
		this.$elem = $elem;
		this.$elem.removeClass('transition');
		this.currentX = parseFloat(this.$elem.css('left'));
		this.currentY = parseFloat(this.$elem.css('top'));		
	}
	function to(x,y,cb){
		//处理参数为了x和y的方法
		x = (typeof x == 'number') ? x : this.currentX;
		y = (typeof y == 'number') ? y : this.currentY;
		//防止到达目标后继续执行
		if(this.currentX == x && this.currentY == y) return;
		
		this.$elem.trigger('move');

		typeof cb == 'function' && cb();

		this.currentX = x;
		this.currentY = y;		
	}


	function Slient($elem){
		init.call(this,$elem);
	}

	Slient.prototype = {
		constructor:Slient,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$elem.css({
					left:x,
					top:y
				});
				this.$elem.trigger('moved');				
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y)
		}

	}


	function Js($elem){
		init.call(this,$elem);
	}

	Js.prototype = {
		constructor:Js,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$elem
				.stop()
				.animate({
					left:x,
					top:y				
				},function(){
					this.$elem.trigger('moved');
				}.bind(this));
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y)
		}
	}
	function getMove($elem,options){
		var move = null;
		if(options.js){
			move = new Js($elem);
		}else{
			move = new Slient($elem);
		}
		//return move;
		/*
		return {
			to:move.to.bind(move),
			x:move.x.bind(move),
			y:move.y.bind(move)
		}
		*/
		return {
			to:$.proxy(move.to,move),
			x:$.proxy(move.x,move),
			y:$.proxy(move.y,move)
		}	
	}


	var DEFAULTS = {
		js:true
	}
	//注册插件
	$.fn.extend({
		move:function(options,n1,n2){
			return this.each(function(){
				var $elem = $(this);
				var moveObj = $elem.data('moveObj');

				if(!moveObj){//单例模式
					options = $.extend({},DEFAULTS,options)
					moveObj = getMove($elem,options);
					$elem.data('moveObj',moveObj);					
				}
				if(typeof moveObj[options] == 'function'){
					moveObj[options](n1,n2);
				}
			});
		}
	});

})(jQuery);