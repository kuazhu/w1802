/*
* @Author: TomChen
* @Date:   2019-03-21 20:41:07
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-21 20:54:52
*/
const fs = require('fs');

const ws = fs.createWriteStream('./bb.mov');

const rs = fs.createReadStream('./01.mov');

/*
rs.on('open',()=>{
	console.log('rs open...');
})
rs.on('close',()=>{
	console.log('rs close...');
})
rs.on('data',(chunk)=>{
	console.log(chunk);
})
rs.on('end',()=>{
	console.log('rs end...');
})
*/

rs.pipe(ws);






