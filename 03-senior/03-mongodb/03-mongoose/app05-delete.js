/*
* @Author: TomChen
* @Date:   2019-03-27 18:39:54
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-27 20:18:09
*/
const mongoose = require('mongoose');

//1.连接数据库服务
mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', (err)=>{
	console.log('connection error');
	throw err;
});

db.once('open', ()=>{
	console.log('connection successful');
	//2.定义Schema
	const UserSchema = new mongoose.Schema({
		name: String,
		age:Number,
		major:String
	});
	//3.生成模型Model
	//3.1 mongoose.model第一个参数是指定集合的名称,mongoose会自动变为复数
	//3.2 mongoose.model第二个参数指定Schema
	const UserModel = mongoose.model('user', UserSchema);


	//4.用模型操作数据(CRUD)
	/*
	UserModel.deleteOne({name:"Tom"},(err,result)=>{
		if(err){
			console.log('deleteOne err',err);
		}else{
			console.log(result);
		}
	});
	*/
	UserModel.deleteMany({name:"Leo"},(err,result)=>{
		if(err){
			console.log('deleteOne err',err);
		}else{
			console.log(result);
		}
	});



	
});