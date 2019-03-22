/*
* @Author: TomChen
* @Date:   2019-03-20 20:47:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-20 20:51:35
*/
const EventEmitter = require('events');

class MyEmitter extends EventEmitter{

}

const emitter = new MyEmitter();

const fn1 = ()=>{
	console.log('1:::running test...');
}; 
emitter.on('test',fn1);

emitter.off('test',fn1);
// emitter.removeListener('test',fn1);
// console.log(emitter.off === emitter.removeListener)

emitter.emit('test');