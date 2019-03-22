/*
* @Author: TomChen
* @Date:   2019-03-21 20:41:07
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-21 20:51:07
*/
const fs = require('fs');

const ws = fs.createWriteStream('./ws.txt');

const rs = fs.createReadStream('./rs.txt');
/*
ws.on('open',()=>{
	console.log('ws open...');
})
ws.on('close',()=>{
	console.log('ws close...');
})
ws.on('finish',()=>{
	console.log('ws finish....');
});

ws.write('abc');
ws.write('hello');
ws.end();

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






