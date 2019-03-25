/*
* @Author: TomChen
* @Date:   2019-03-22 18:04:20
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-25 18:59:59
*/
//crud (create read update delete)

const fs = require('fs');
const util = require('util');
const path = require('path');

const filePath = path.normalize(__dirname+'/../data/wish.json');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const arrColor = ['#f21','#ff4','#0f1','#cca','#cac'];

const getRandom	= (min,max)=>{	
	return Math.round(min + (max-min)*Math.random());
}

async function add(options){
	//1.获取原有的数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);
	//2.添加数据到原有的数据中
	options.id = Date.now().toString()+parseInt(Math.random()*10000).toString().padStart(4,'0');
	options.color = arrColor[getRandom(0,arrColor.length-1)];
	arr.push(options);
	let strArr = JSON.stringify(arr);
	//3.保存
	await writeFile(filePath,strArr);

	return options;
	
}
async function getAll(){
	let data = await readFile(filePath);
	let arr = JSON.parse(data);	
	return arr;
}

async function remove(id){
	//1.获取原有的数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);
	//2.过滤
	let newArr = arr.filter(val=>{
		return val['id'] != id;
	})	
	let strArr = JSON.stringify(newArr);
	//3.保存
	await writeFile(filePath,strArr);
	return newArr;	
}

module.exports = {
	add,
	getAll,
	remove
}
