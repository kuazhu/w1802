/*
* @Author: TomChen
* @Date:   2019-03-27 20:25:44
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-31 11:17:34
*/

const mongoose = require('mongoose');

//1.定义Schema
const UserSchema = new mongoose.Schema({
	username:{
		type:String
	},
	password:{
		type:String
	},
	isAdmin:{
		type:Boolean,
		default:false
	}
});


//2.生成模型Model
const UserModel = mongoose.model('User', UserSchema);
//3.导出模型Model
module.exports = UserModel;