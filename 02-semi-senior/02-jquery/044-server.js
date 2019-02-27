/*
* @Author: TomChen
* @Date:   2019-01-03 20:43:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-02-24 14:36:28
*/

var http = require('http');
var fs   = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
	var urlStr = req.url;
	console.log(req.method);
	console.log('req.url:::',urlStr);
	if(urlStr == '/favicon.ico'){
		res.end('favicon.ico');
	}
	if(req.method == 'POST'){
		// res.end('post data...');
		var body = '';
		req.on('data',function(chunk){
			body += chunk;
		});
		req.on('end',function(){
			console.log('get post data::',body);
			//根据数据做处理....
			res.end(body);
		})
	}else if(req.method == 'GET'){
		if(urlStr.search(/\?/) != -1){
			var parm = url.parse(urlStr,true).query;
			//根据数据做处理....
			var json = JSON.stringify(parm);
			res.end(json);
		}
		var filePath = './'+urlStr;
		fs.readFile(filePath,function(err,data){
			if(!err){
				res.end(data);
			}else{
				res.statusCode = 404;
				res.end('not found');
			}
		});
	}else{
		res.end('ok');
	}

});

server.listen(3000,'127.0.0.1',function(){
	console.log("Sever is running at http://127.0.0.1:3000");
})