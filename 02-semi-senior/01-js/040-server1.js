/*
* @Author: TomChen
* @Date:   2019-01-03 20:26:18
* @Last Modified by:   TomChen
* @Last Modified time: 2019-01-04 18:33:17
*/
/*
	基础版本
 */
var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Kuazhu\n');
});

server.listen(port, hostname, function(){
  console.log("Server running at http://"+hostname+":"+port+"/");
});