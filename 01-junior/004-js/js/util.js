/*
* @Author: TomChen
* @Date:   2018-12-09 17:11:35
* @Last Modified by:   TomChen
* @Last Modified time: 2018-12-09 17:23:02
*/


/**
 * @param  {object} obj    [DOM节点对象]
 * @param  {string} attr   [属性名称]
 * @param  {number} target [目标值]
 */
function animate(obj,attr,target){
	clearInterval(obj.timer);
	var iSpeed = 0;
	obj.timer = setInterval(function(){
		var current = parseFloat(getComputedStyle(obj,false)[attr]);
		if(attr == 'opacity'){
			current = Math.round(current * 100);
		}
		if(current > target){
			iSpeed = -80;
		}else{
			iSpeed = 80;
		}
		if(Math.abs(target - current) < Math.abs(iSpeed)){
			if(attr == 'opacity'){
				obj.style.opacity = target / 100;
			}else{
				obj.style[attr] = target + 'px';
			}
			clearInterval(obj.timer);
		}else{
			if(attr == 'opacity'){
				obj.style.opacity = (current + iSpeed)/100;	
			}else{
				obj.style[attr] = current + iSpeed + 'px';
			}
		}
	},30)
}


function getScrollTop(){
	return  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;	
}





