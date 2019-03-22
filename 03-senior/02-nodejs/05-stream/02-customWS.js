/*
* @Author: TomChen
* @Date:   2019-03-21 18:13:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-21 18:45:34
*/
//自定义可写流
const {Writable} = require('stream');
/*
const ws = new Writable();
ws.write('hello');//The _write() method is not implemented
*/
class MyWriter extends Writable{
	_write(chunk, encoding, callback){
		console.log(chunk);
		// console.log(encoding)
		callback && callback();
	}
}
const writer = new MyWriter();

writer.on('finish',()=>{
	console.log('finish....');
})
writer.write('hello','utf-8',()=>{
	console.log('hello....');
});
writer.write('kuazhu');
writer.end();