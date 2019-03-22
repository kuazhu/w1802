/*
* @Author: TomChen
* @Date:   2019-03-20 20:04:13
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-20 20:11:39
*/
const EventEmitter = require('events');

/*
const emitter = new EventEmitter();


emitter.on('test',()=>{
	console.log('running test...');
})

emitter.emit('test');
*/

class MyEmitter extends EventEmitter{

}

const emitter = new MyEmitter();
// console.log(emitter);
emitter.on('test',()=>{
	console.log('running test...');
})
emitter.emit('test');



