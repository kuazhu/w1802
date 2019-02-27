/*
* @Author: TomChen
* @Date:   2019-02-24 15:49:04
* @Last Modified by:   TomChen
* @Last Modified time: 2019-02-24 15:49:10
*/

var http = require('http');
var fs   = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
	var urlStr = req.url;
	var parm = url.parse(urlStr,true).query;
	var obj = '{"name":"Tom","age":18}';
	res.end(parm.callback+'('+obj+')');

});

server.listen(3001,'127.0.0.1',function(){
	console.log("Sever is running at http://127.0.0.1:3001");
})