/*
* @Author: TomChen
* @Date:   2019-03-20 20:04:13
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-20 20:36:59
*/
const EventEmitter = require('events');


class MyEmitter extends EventEmitter{

}

const emitter = new MyEmitter();

/*
emitter.on('test',(event,arg1,arg2)=>{
	console.log('running test...');
	console.log(event,arg1,arg2);//hello kuazhu undefined
})
*/
/*
emitter.on('test',(arg1,arg2)=>{
	console.log('running test...');
	console.log(arg1,arg2);//hello kuazhu
})
emitter.emit('test','hello','kuazhu');
*/
const args = ['hello','kuazhu'];

emitter.on('test',(arg1,arg2)=>{
	console.log('running test...');
	console.log(arg1,arg2);
})
emitter.emit('test',...args);










