/*
* @Author: TomChen
* @Date:   2019-03-27 20:25:44
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-04 18:28:30
*/

const mongoose = require('mongoose');

const pagination = require('../util/pagination.js')

//1.定义Schema
const CommentSchema = new mongoose.Schema({
	content:{
		type:String
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	article:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Article'
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
});

CommentSchema.statics.getPaginationComments = function(req,query={}){
	const options = {
		page:req.query.page,
		model:this,
		query:query,
		projection:'-__v',
		sort:{_id:-1},
		populates:[{path:"user",select:'username'},{path:'article',select:'title'}]
	}
	return pagination(options)	
}

//2.生成模型Model
const CommentModel = mongoose.model('Comment', CommentSchema);
//3.导出模型Model
module.exports = CommentModel;