/*
* @Author: TomChen
* @Date:   2019-03-20 20:24:55
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-20 20:31:43
*/
const EventEmitter = require('events');

class MyEmitter extends EventEmitter{
}

const emitter = new MyEmitter();

/*
emitter.on('test',()=>{
	console.log('1:::running test...');
})

emitter.addListener('test',()=>{
	console.log('2:::running test...');
})

console.log(emitter.on === emitter.addListener);

emitter.emit('test');
*/
/*
emitter.once('test',()=>{
	console.log('1:::running test...');
})
emitter.emit('test');
emitter.emit('test');
*/
emitter.setMaxListeners(11);
emitter.on('test',()=>{
	console.log('1:::running test...');
})
emitter.on('test',()=>{
	console.log('2:::running test...');
})
emitter.on('test',()=>{
	console.log('3:::running test...');
})
emitter.on('test',()=>{
	console.log('4:::running test...');
})
emitter.on('test',()=>{
	console.log('5:::running test...');
})
emitter.on('test',()=>{
	console.log('6:::running test...');
})
emitter.on('test',()=>{
	console.log('7:::running test...');
})
emitter.on('test',()=>{
	console.log('8:::running test...');
})
emitter.on('test',()=>{
	console.log('9:::running test...');
})
emitter.on('test',()=>{
	console.log('10:::running test...');
})

emitter.on('test',()=>{
	console.log('11:::running test...');
})

emitter.emit('test');


