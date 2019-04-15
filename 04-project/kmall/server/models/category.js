/*
* @Author: TomChen
* @Date:   2018-08-04 17:14:00
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-28 16:33:01
*/
const mongoose = require('mongoose');
const pagination = require('../util/pagination.js');

const CategorySchema = new mongoose.Schema({
  name:{
  	type:String
  },
  pid:{
  	type:String
  },
  order:{
  	type:Number,
    default:0
  },

},{
  timestamps:true
});

CategorySchema.statics.getPaginationCategories = function(page,query={}){
    return new Promise((resolve,reject)=>{
      let options = {
        page: page,//需要显示的页码
        model:this, //操作的数据模型
        query:query, //查询条件
        projection:'_id name order pid', //投影，
        sort:{order:-1} //排序
      }
      pagination(options)
      .then((data)=>{
        resolve(data); 
      })
    })
 }
const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;