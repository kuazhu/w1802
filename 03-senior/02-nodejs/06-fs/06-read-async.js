/*
* @Author: TomChen
* @Date:   2019-03-21 20:13:35
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-21 20:30:47
*/
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);


async function callReadFile(){
	let data = await readFile('./01.txt',{flag:'r'});
	// console.log(data);
	return data;
}

callReadFile()
.then(data=>{
	console.log(data);
})













