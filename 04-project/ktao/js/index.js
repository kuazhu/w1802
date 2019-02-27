/*
* @Author: TomChen
* @Date:   2019-02-26 18:15:35
* @Last Modified by:   TomChen
* @Last Modified time: 2019-02-27 20:44:38
*/
;(function($){
	$('.dropdown').dropdown();
	$('.dropdown').on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		console.log("!:::",ev.type);
	});
})(jQuery);