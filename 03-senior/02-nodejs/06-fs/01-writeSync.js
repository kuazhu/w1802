/*
* @Author: TomChen
* @Date:   2019-03-21 19:20:25
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-21 19:28:38
*/
const fs = require('fs');
/*
//1.打开文件
const fd = fs.openSync('./01.txt', 'a');
//2.写入数据
fs.writeSync(fd,'hello');
//3.保存退出(关闭)
fs.closeSync(fd);
*/
fs.writeFileSync('./01.txt','kuazhu',{flag:'a'});