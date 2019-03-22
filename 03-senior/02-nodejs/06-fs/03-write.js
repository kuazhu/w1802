/*
* @Author: TomChen
* @Date:   2019-03-21 19:53:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-21 20:04:58
*/
const fs = require('fs');

/*
//1.打开文件
fs.open('01.txt','w',(err,fd)=>{
	if(err){
		console.log('open error::',err);
	}else{
	//2.写入数据
		fs.write(fd,'hello',(err)=>{
			if(err){
				console.log('write error::',err);
			}else{
				console.log('write success');
			}
			//3.保存退出(关闭)
			fs.close(fd,(err)=>{
				if(err){
					console.log('close error::',err);
				}else{
					console.log('close success');
				}
			})
		});	
	}
});
*/

fs.writeFile('./01.txt','kuazhu',{flag:'a'},(err)=>{
	if(err){
		console.log('writeFile error::',err);
	}else{
		console.log('writeFile success');
	}
})
console.log('do something...');




