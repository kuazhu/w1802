/*
* @Author: TomChen
* @Date:   2019-03-22 19:15:42
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-24 11:57:55
*/
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mime = require('./mime.json');
const server = http.createServer((req,res)=>{
	console.log('url=>',req.url);
	let reqUrl = url.parse(req.url,true);
	let pathname = reqUrl.pathname;
	
	if(pathname == '/' || pathname == '/index.html'){//获取首页
		res.setHeader('Content-Type',"text/html;charset=utf-8");
		let html = `<!DOCTYPE html>
						<html lang="en">
						<head>
							<meta charset="UTF-8">
							<title>许愿墙</title>
							<link rel="stylesheet" href="css/index.css">
						</head>
						<body>
							<div class="wall">
									<div class="wish" style="background: blue">
										<a href="javascript:;" class="close" data-id='111'></a>
										111
									</div>
									<div class="wish" style="background: yellow">
										<a href="javascript:;" class="close" data-id='222'></a>
										222
									</div>			
							</div>
							<div class="form-box">
								<div>
									<textarea name="content" id="content" cols="30" rows="20"></textarea>
								</div>
								<div>
									<a href="javascript:;" class="sub-btn">许下心愿</a>
								</div>
							</div>	
						</body>
						<script src="js/jquery.min.js"></script>
						<script src="js/jquery.pep.js"></script>
						<script src="js/index.js"></script>
						</html>`;
		res.end(html);
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
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at http://127.0.0.1:3000')
})