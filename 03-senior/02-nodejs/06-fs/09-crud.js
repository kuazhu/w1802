/*
* @Author: TomChen
* @Date:   2019-03-22 18:04:20
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-22 18:59:57
*/
//crud (create read update delete)

const fs = require('fs');
const util = require('util');

const filePath = './data.json';
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/*
const add = (name,callback)=>{
	//1.获取原有的数据
	fs.readFile(filePath,(err,data)=>{
		if(err){
			callback(err);
		}else{
			//console.log(data);
			//解析
			let arr = JSON.parse(data);
			//2.添加数据到原有的数据中
			arr.push({
				id:Date.now().toString()+parseInt(Math.random()*10000).toString().padStart(4,'0'),
				name:name
			});
			let strArr = JSON.stringify(arr);
			//3.保存
			fs.writeFile(filePath,strArr,(err)=>{
				if(err){
					callback(err);
				}else{
					callback(null,arr);
				}
			})

		}
	});	
}
add('Tom',(err,data)=>{
	if(err){
		console.log('err::',err);
	}else{
		console.log(data);
	}
});
*/
async function add(name){
	//1.获取原有的数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);
	//2.添加数据到原有的数据中
	arr.push({
		id:Date.now().toString()+parseInt(Math.random()*10000).toString().padStart(4,'0'),
		name:name
	});
	let strArr = JSON.stringify(arr);
	//3.保存
	await writeFile(filePath,strArr);

	return arr;
	
}
async function get(id){
	//1.获取原有的数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);	
	//2.查找对应id的对象
	return arr.find(val=>{
		return val['id'] == id;
	})
}
async function update(id,name){
	//1.获取原有的数据
	let data = await readFile(filePath);
	let arr = JSON.parse(data);	
	//2.查找对应id的对象
	let obj = arr.find(val=>{
		return val['id'] == id;
	})
	if(obj){
		obj.name = name;
		let strArr = JSON.stringify(arr);
		//3.保存
		await writeFile(filePath,strArr);
		return arr;
	}else{
		return obj;
	}	
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


/*
add('Mike')
.then(data=>{
	console.log(data);
})
.catch(err=>{
	console.log(err);
})
*/
/*
get('15532516861085320')
.then(data=>{
	console.log(data)
})
.catch(err=>{
	console.log(err);
})
*/
/*
update('15532506973691480','Peter')
.then(data=>{
	console.log(data);
})
*/
remove('15532507082732963')
.then(data=>{
	console.log(data);
})



