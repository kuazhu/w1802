/*
* @Author: TomChen
* @Date:   2019-03-27 20:25:44
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-27 20:26:58
*/

const mongoose = require('mongoose');

//1.定义Schema
const UserSchema = new mongoose.Schema({
	name: String,
	age:Number,
	major:String
});

//2.生成模型Model
//2.1 mongoose.model第一个参数是指定集合的名称,mongoose会自动变为复数
//2.2 mongoose.model第二个参数指定Schema
const UserModel = mongoose.model('user', UserSchema);

//3.导出模型Model
module.exports = UserModel;