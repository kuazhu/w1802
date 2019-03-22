/*
* @Author: TomChen
* @Date:   2019-03-20 20:54:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-20 20:57:58
*/
const EventEmitter = require('events');

class MyEmitter extends EventEmitter{

}

const emitter = new MyEmitter();

emitter.on('newListener',(eventName,cb)=>{
	console.log('newListener...');
	console.log(eventName);
	// console.log(cb)
	cb();
})

emitter.on('test1',()=>{
	console.log('1:::running test...');
})
emitter.on('test2',()=>{
	console.log('2:::running test...');
})