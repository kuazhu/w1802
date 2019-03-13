/*
* @Author: TomChen
* @Date:   2019-03-10 17:01:12
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-10 17:01:27
*/
;(function(win,doc){
	// 1rem = 1个根元素(html)的font-size
	// 元素需要显示的大小和设备的宽度成正比
	// 设备越宽 个根元素(html)的font-size 越大
	var oRoot = document.getElementsByTagName('html')[0];
	function refreshFontSize(){
		var iWidth = doc.body.clientWidth || doc.documentElement.clientWidth;
		var iFontSize = iWidth / 10;
		oRoot.style.fontSize = iFontSize + 'px';			
	}


	win.addEventListener('resize',refreshFontSize,false);
	// win.addEventListener('load',refreshFontSize,false);
	win.addEventListener('DOMContentLoaded',refreshFontSize,false);
})(window,document);