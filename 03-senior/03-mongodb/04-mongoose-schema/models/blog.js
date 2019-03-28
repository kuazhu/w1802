/*
* @Author: TomChen
* @Date:   2019-03-27 20:25:44
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-28 19:36:58
*/

const mongoose = require('mongoose');

//1.定义Schema
const BlogSchema = new mongoose.Schema({
	title: {
		type:String,
		default:''
	},
	content: {
		type:String,
		default:''
	},
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'	
		// type:String
	}	
});

BlogSchema.statics.findBlog = function(query){
	return this.findOne(query)
	.populate('author','name age -_id')	
}


//2.生成模型Model
//2.1 mongoose.model第一个参数是指定集合的名称,mongoose会自动变为复数
//2.2 mongoose.model第二个参数指定Schema
const BlogModel = mongoose.model('blog', BlogSchema);

//3.导出模型Model
module.exports = BlogModel;