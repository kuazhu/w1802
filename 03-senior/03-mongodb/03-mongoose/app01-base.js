/*
* @Author: TomChen
* @Date:   2019-03-27 18:39:54
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-27 19:04:26
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
	
	//4.1 插入数据
	/*
	const user = new UserModel({name:"Amy",age:18,major:"Computer"});
	
	user.save((err,doc)=>{
		if(err){
			console.log('save user error::',err);
		}else{
			console.log(doc);
		}
	})
	*/
	//4.2 查找
	/*
	UserModel.find({},(err,docs)=>{
		if(err){
			console.log('find user error::',err);
		}else{
			console.log(docs);
		}		
	})
	*/
	//4.3 更新
	//update要被废弃,不推荐使用
	/*
	UserModel.update({name:"Tom"},{$set:{age:88}},(err,result)=>{
		if(err){
			console.log('update user error::',err);
		}else{
			console.log(result);
		}			
	});
	*/
	/*
	UserModel.updateOne({name:"Tom"},{$set:{age:98}},(err,result)=>{
		if(err){
			console.log('update user error::',err);
		}else{
			console.log(result);
		}			
	});
	*/
	//4.4 删除
	UserModel.deleteOne({name:"Tom"},(err,result)=>{
		if(err){
			console.log('deleteOne user error::',err);
		}else{
			console.log(result);
		}		
	});	

});