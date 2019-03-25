/*
* @Author: TomChen
* @Date:   2019-03-25 18:19:13
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-25 19:26:49
*/
const querystring = require('querystring');
const swig = require('swig');

const { getAll,add:addWish,remove } = require('../Model/Wish.js');

class Wish{
	//action
	index(req,res,...args){
		getAll()
		.then(data=>{
			let template = swig.compileFile(__dirname+'/../View/Wish/index.html');
			let html = template({
				data
			});
			res.setHeader('Content-Type',"text/html;charset=utf-8");
			res.end(html);			
		})
		.catch(err=>{
			console.log('get data err::',err);
			res.setHeader('Content-Type',"text/html;charset=utf-8");
			res.statusCode = 500;
			res.end('<h1>好像哪里不对了!</h1>');				
		})
	}
	add(req,res,...args){
		//获取参数
		let body = '';
		req.on('data',(chunk)=>{
			body += chunk;
		});
		req.on('end',()=>{
			let obj = querystring.parse(body);
			addWish(obj)
			.then(data=>{
				let result = JSON.stringify({
					status:0,//代表成功,
					data:data
				})
				res.end(result);
			})
			.catch(err=>{
				let result = JSON.stringify({
					status:10,//代表失败,
					message:'添加失败'
				})
				res.end(result);
			})
		})		
	}

	del(req,res,...args){
		remove(args[0])
		.then(data=>{
			let result = JSON.stringify({
				status:0,//代表成功,
			})
			res.end(result);			
		})
		.catch(err=>{
			let result = JSON.stringify({
				status:10,//代表失败,
				message:'删除失败'
			})
			res.end(result);
		})		
	}
}

module.exports = new Wish();