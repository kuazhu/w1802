/*
* @Author: TomChen
* @Date:   2019-03-22 19:15:42
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-24 10:33:32
*/
const http = require('http');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');


const server = http.createServer((req,res)=>{
	
	console.log('url=>',req.url,'method=>',req.method);
	
	if(req.method.toLowerCase() == 'post'){
		let form = new formidable.IncomingForm();
		form.uploadDir = "./upload";
		form.keepExtensions = true;
	    form.parse(req, function(err, fields, files) {
			let oldPath = __dirname +"/"+ files.avatar.path;
			//获取扩展名
			let extname = path.extname(oldPath);
			//拼接新文件路径
			let newPath = __dirname + "/upload/"+Date.now().toString()+parseInt(Math.random()*10000).toString().padStart(4,'0')+extname;
			//更改上传的文件名称
			fs.rename(oldPath, newPath, (err)=>{
				if(err){
					res.setHeader('Content-Type',"text/html;charset=utf-8");
					res.end('err');		
				}else{
					res.setHeader('Content-Type',"text/html;charset=utf-8");
					res.end('ok');					
				}
			});

	    });		
	}
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at http://127.0.0.1:3000')
})