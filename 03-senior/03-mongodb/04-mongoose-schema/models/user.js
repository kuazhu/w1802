/*
* @Author: TomChen
* @Date:   2019-03-27 20:25:44
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-28 19:22:22
*/

const mongoose = require('mongoose');


//1.定义Schema
const UserSchema = new mongoose.Schema({
	name: {
		type:String,
		required:[true,"用户名称必须输入"],
		maxlength:[5,"最多5位字符"],
		minlength:[3,"最小3位字符"]
	},
	age:{
		type:Number,
		default:0,
		min:[10,"最小年龄是10"],
		max:[150,"最大年龄是150"]
	},
	phone:{
		type:String,
		validate:{
			validator:function(val){
				return /1[358]\d{9}/.test(val)
			},
			message:'{VALUE}不是合法手机号码'
		}
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

//定义实例方法
UserSchema.methods.findBlogs = function(callback){
	//console.log(this);
	//console.log(this.model('blog'));
	this.model('blog').find({author:this._id},callback);
}
//定义静态方法
UserSchema.statics.findByPhone = function(val,callback){
	// console.log(val)
	//console.log(this)
	//console.log(this.model('user') === this);
	this.findOne({phone:val},callback)
}

//2.生成模型Model
//2.1 mongoose.model第一个参数是指定集合的名称,mongoose会自动变为复数
//2.2 mongoose.model第二个参数指定Schema
const UserModel = mongoose.model('user', UserSchema);

//3.导出模型Model
module.exports = UserModel;