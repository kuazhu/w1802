/*
* @Author: TomChen
* @Date:   2019-03-27 20:25:44
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-27 20:54:57
*/

const mongoose = require('mongoose');

//1.定义Schema
const UserSchema = new mongoose.Schema({
	name: {
		type:String,
		default:''
	},
	age:{
		type:Number,
		default:0
	},
	major:{
		type:String,
		enum:["art","computer","sport","music"],
		default:"art"
	},
	locked:{
		type:Boolean,
		default:false
	},
	createdAt:{
		type:Date,
		default:Date.now,
	},
	friends:{
		type:Array
	}
});

//2.生成模型Model
//2.1 mongoose.model第一个参数是指定集合的名称,mongoose会自动变为复数
//2.2 mongoose.model第二个参数指定Schema
const UserModel = mongoose.model('user', UserSchema);

//3.导出模型Model
module.exports = UserModel;