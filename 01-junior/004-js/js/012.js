/*
* @Author: TomChen
* @Date:   2018-11-22 20:10:08
* @Last Modified by:   TomChen
* @Last Modified time: 2018-11-22 20:14:19
*/

window.onload = function(){
	var oBox = document.getElementById('box');

	function toRed(){
		oBox.style.background = 'red';
	}


	oBox.onclick = toRed;
}

