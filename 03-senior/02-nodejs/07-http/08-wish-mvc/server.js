/*
* @Author: TomChen
* @Date:   2019-03-22 19:15:42
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-25 18:57:47
*/
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');

const mime = require('./mime.json');

const server = http.createServer((req,res)=>{
	console.log('url=>',req.url);
	let reqUrl = url.parse(req.url,true);
	let pathname = reqUrl.pathname;
	//约定:
	//1.请求以/static/开始的路径认为是静态资源
	//2.对于路由请求的约定: /Controller/action/arg1/arg2....
	//					 /Wish/add
	//					 /Wish/del/12345676
	//					 /Wish/index
	if(pathname.startsWith('/static/')){//静态资源处理
		
		let filePath =path.normalize(__dirname + pathname);
		console.log(filePath)
		let extname = path.extname(filePath);

		fs.readFile(filePath,(err,data)=>{
			if(err){
				res.setHeader('Content-Type',"text/html;charset=utf-8");
				res.end('<h1>出错啦!</h1>');
			}else{
				res.setHeader('Content-Type',mime[extname]+";charset=utf-8");
				res.end(data);
			}
		});
	}
	else{//路由处理
		let paths = pathname.split('/');
		let controller = paths[1] || 'Wish';
		let action = paths[2] || 'index';
		let args = paths.slice(3);
		try{
			let mode = require('./Controller/'+controller);
			mode[action] && mode[action].apply(null,[req,res].concat(args));
		}
		catch(err){
			// console.log('err::',err);
			res.setHeader('Content-Type',"text/html;charset=utf-8");
			res.end('<h1>出错啦!</h1>');
		}
	}


	/*
	if(pathname == '/' || pathname == '/index.html'){//获取首页
		getAll()
		.then(data=>{
			let template = swig.compileFile(__dirname+'/static/index.html');
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
	else if(pathname == '/add' && req.method.toLowerCase() == 'post'){//添加
		//获取参数
		let body = '';
		req.on('data',(chunk)=>{
			body += chunk;
		});
		req.on('end',()=>{
			let obj = querystring.parse(body);
			add(obj)
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
	else if(pathname == '/del'){
		let id = reqUrl.query.id;
		remove(id)
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
	else{//请求静态资源
		let filePath =path.normalize(__dirname + '/static/'+pathname);
		let extname = path.extname(filePath);

		fs.readFile(filePath,(err,data)=>{
			if(err){
				res.setHeader('Content-Type',"text/html;charset=utf-8");
				res.end('<h1>出错啦!</h1>');
			}else{
				res.setHeader('Content-Type',mime[extname]+";charset=utf-8");
				res.end(data);
			}
		});
	}
	*/
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at http://127.0.0.1:3000')
})