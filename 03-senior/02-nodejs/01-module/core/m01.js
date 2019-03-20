/*
* @Author: TomChen
* @Date:   2019-03-19 19:17:36
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-19 19:18:21
*/
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});