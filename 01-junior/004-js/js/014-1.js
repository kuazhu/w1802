/*
* @Author: TomChen
* @Date:   2018-11-22 20:10:08
* @Last Modified by:   TomChen
* @Last Modified time: 2018-11-22 20:52:37
*/
// while(true){
// 	console.log('true')
// }
console.log('1')
var oBox = document.getElementById('box');

function toRed(){
	oBox.style.background = 'red';
}


oBox.onclick = toRed;
document.addEventListener('DOMContentLoaded',function(){
	console.log('DOMContentLoaded');
})
