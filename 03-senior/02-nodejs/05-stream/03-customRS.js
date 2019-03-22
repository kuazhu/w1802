/*
* @Author: TomChen
* @Date:   2019-03-21 18:46:07
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-21 19:00:56
*/
//自定义可读流
const {Readable} = require('stream');

/*
const rs = new Readable();

rs.on('data',(chunk)=>{
	console.log(chunk);
})//The _read() method is not implemented
*/
class MyReader extends Readable{
	constructor(){
		super();
		this.index = 0;
	}

	_read(){//会推送数据到读取队列
		this.index++;
		if(this.index > 5){
			this.push(null);
		}else{
			let str = this.index + '';
			this.push(str);
		}
	}
}
const reader = new MyReader();
/*
let body = '';
reader.on('data',(chunk)=>{
	console.log(chunk.toString());
	body += chunk;
})
reader.on('end',()=>{
	console.log(body);
	console.log('end...');
})
*/
//将可读流的数据传递给可写流
reader.pipe(process.stdout);









