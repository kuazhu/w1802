/*
* @Author: TomChen
* @Date:   2019-02-26 18:15:35
* @Last Modified by:   TomChen
* @Last Modified time: 2019-02-26 19:41:36
*/
;(function($){
	$('.dropdown')
	.hover(function(){
		//$(this).addClass('menu-active');
		var $this = $(this);
		var activeClass = $this.data('active')+'-active';
		$this.addClass(activeClass)
	},function(){
		var $this = $(this);
		var activeClass = $this.data('active')+'-active';		
		$this.removeClass(activeClass);
	})
})(jQuery);