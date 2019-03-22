/*
* @Author: TomChen
* @Date:   2019-03-20 19:03:35
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-20 19:08:53
*/
/*
console.log(1);

let timer = setTimeout(()=>{
	console.log(2);
},0)

clearTimeout(timer);

console.log(3);
*/

/*
console.log(1);

let timer = setInterval(()=>{
	console.log(2);
},200)

clearInterval(timer);

console.log(3);
*/

console.log(1);

let timer = setImmediate(()=>{
	console.log(2);
});

clearImmediate(timer);
console.log(3);







