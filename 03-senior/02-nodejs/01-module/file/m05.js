/*
* @Author: TomChen
* @Date:   2019-03-19 19:57:16
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-19 20:10:38
*/
const str = 'hello';


const fn = ()=>{
	console.log('fn...');
}

const obj = {
	name:"Tom",
	age:18
}
/*
console.log(exports);
console.log(module.exports);
console.log(exports == module.exports);
*/
/*
exports.str = str;
exports.fn = fn;
exports.obj = obj;
console.log(exports);
*/
/*
module.exports.str = str;
module.exports.fn = fn;
module.exports.obj = obj;
console.log('m05:::',module.exports);
*/
module.exports = {
	str,
	fn,
	obj
}
//exports.arr = [11,22,33];
module.exports.arr = [11,22,33];
console.log(module.exports === exports);




