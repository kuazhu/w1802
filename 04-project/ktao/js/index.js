/*
* @Author: TomChen
* @Date:   2019-02-26 18:15:35
* @Last Modified by:   TomChen
* @Last Modified time: 2019-02-28 20:39:44
*/
;(function($){
	var $menuDropdown = $('.dropdown');
	$menuDropdown.dropdown({
		delay:200,
	});
	$menuDropdown.on('dropdown-show',function(ev){
		var $elem = $(this);
		var loadUrl = $elem.data('load');
		if(!loadUrl) return;
		var isLoaded = $elem.data('isLoaded');
		if(isLoaded) return;
		var $layer = $elem.find('.dropdown-layer');
		$.getJSON(loadUrl,function(data){
			var html = '';
			for(var i = 0;i<data.length;i++){
				html += '<li><a href="'+data[i].url+'" class="menu-item">'+data[i].name+'</a></li>'
			}
			//模拟网络延时
			setTimeout(function(){
				$layer.html(html);
				$elem.data('isLoaded',true);
			},1000);
		})
	});

	var $search = $('.header .search');
	$search.search();

})(jQuery);







