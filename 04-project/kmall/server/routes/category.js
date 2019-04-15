/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-18 11:13:41
*/
const Router = require('express').Router;
const CategoryModel = require('../models/category.js');
const pagination = require('../util/pagination.js');

const router = Router();

//权限控制
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send({
			code:10
		});
	}
})
//添加分类
router.post("/",(req,res)=>{
	let body = req.body;
	CategoryModel
	.findOne({name:body.name,pid:body.pid})
	.then((cate)=>{
		if(cate){
	 		res.json({
	 			code:1,
	 			message:"添加分类失败,分类已存在"
	 		})
		}else{
			new CategoryModel({
				name:body.name,
				pid:body.pid
			})
			.save()
			.then((newCate)=>{
				if(newCate){
					if(body.pid == 0){//如果添加的是一级分类,返回新的一级分类
						CategoryModel.find({pid:0},"_id name")
						.then((categories)=>{
							res.json({
								code:0,
								data:categories
							})	
						})						
					}else{
						res.json({
							code:0
						})
					}
					
				}
			})
			.catch((e)=>{
		 		res.json({
		 			code:1,
		 			message:"添加分类失败,服务器端错误"
		 		})
			})
		}
	})
})
//获取分类
router.get("/",(req,res)=>{
	let pid = req.query.pid;
	let page = req.query.page;
	
	if(page){
		CategoryModel
		.getPaginationCategories(page,{pid:pid})
		.then((result)=>{
			res.json({
				code:0,
				data:{
					current:result.current,
					total:result.total,
					pageSize:result.pageSize,
					list:result.list					
				}
			})	
		})
	}else{
		CategoryModel.find({pid:pid},"_id name pid order")
		.then((categories)=>{
			res.json({
				code:0,
				data:categories
			})	
		})
		.catch(e=>{
	 		res.json({
	 			code:1,
	 			message:"获取分类失败,服务器端错误"
	 		})		
		})		
	}

});
//更新名称
router.put("/updateName",(req,res)=>{
	let body = req.body;
	CategoryModel
	.findOne({name:body.name,pid:body.pid})
	.then((cate)=>{
		if(cate){
	 		res.json({
	 			code:1,
	 			message:"更新分类失败,分类已存在"
	 		})
		}else{
			CategoryModel
			.update({_id:body.id},{name:body.name})
			.then((cate)=>{
				if(cate){
					CategoryModel
					.getPaginationCategories(body.page,{pid:body.pid})
					.then((result)=>{
						res.json({
							code:0,
							data:{
								current:result.current,
								total:result.total,
								pageSize:result.pageSize,
								list:result.list					
							}
						})	
					})					
				}else{
			 		res.json({
			 			code:1,
			 			message:"更新分类失败,数据操作失败"
			 		})					
				}
			})
			.catch((e)=>{
		 		res.json({
		 			code:1,
		 			message:"添加分类失败,服务器端错误"
		 		})
			})
		}
	})
})

//更新排序
router.put("/updateOrder",(req,res)=>{
	let body = req.body;
	CategoryModel
	.update({_id:body.id},{order:body.order})
	.then((cate)=>{
		if(cate){
			CategoryModel
			.getPaginationCategories(body.page,{pid:body.pid})
			.then((result)=>{
				res.json({
					code:0,
					data:{
						current:result.current,
						total:result.total,
						pageSize:result.pageSize,
						list:result.list					
					}
				})	
			})					
		}else{
	 		res.json({
	 			code:1,
	 			message:"更新排序失败,数据操作失败"
	 		})					
		}
	})
})

module.exports = router;