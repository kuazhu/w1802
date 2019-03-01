/*
* @Author: Tom
* @Date:   2019-03-01 10:37:05
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-01 18:02:23
*/
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req, res){
	console.log(req.url);
	res.setHeader('Content-Type', 'text/html;charset=UTF-8');
	if(req.url == '/favicon.ico'){
		res.statusCode = 200;
		res.end('favicon.ico');
	}
	var parm = url.parse(req.url,true).query;
	var callback = parm.callback;
	var q = parm.q;
	var data = "{}";
	if(q == ''){
		data = `
				{
					"result":[
					]
				}
			`;
	}else if(q == 'x'){
		data = `
				{
					"result":[
					]
				}
			`;
	}else if(q == 'bb'){
		data = `
			{
				"result":[
					["${q}-1\<b\>aaa\<\/b\>"],
					["${q}-2\<b\>bbb\<\/b\>"],
					["${q}-3\<b\>ccc\<\/b\>"],
					["${q}-4\<b\>ddd\<\/b\>"],
					["${q}-5\<b\>eee\<\/b\>"],
					["${q}-6\<b\>fff\<\/b\>"],
					["${q}-7\<b\>ggg\<\/b\>"],
					["${q}-8\<b\>hhh\<\/b\>"],
					["${q}-9\<b\>iii\<\/b\>"],
					["${q}-10jjj"]
				]
			}
		`;
	}else{
		data = `
			{
				"result":[
					["${q}-1aaa"],
					["${q}-2bbb"],
					["${q}-3ccc"],
					["${q}-4ddd"],
					["${q}-5eee"],
					["${q}-6fff"],
					["${q}-7ggg"],
					["${q}-8hhh"],
					["${q}-9iii"],
					["${q}-10jjj"]
				]
			}
		`;
	}	
	var resStr = callback + '('+data+')';
	res.end(resStr);
});

server.listen(3001,'127.0.0.1', function(){
  console.log('Server running at http://127.0.0.1:3001/');
});