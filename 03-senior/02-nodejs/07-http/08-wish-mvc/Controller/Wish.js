/*
* @Author: TomChen
* @Date:   2019-03-25 18:19:13
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-25 18:51:31
*/
const swig = require('swig');

const { getAll,add,remove } = require('../Model/Wish.js');

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
}

module.exports = new Wish();