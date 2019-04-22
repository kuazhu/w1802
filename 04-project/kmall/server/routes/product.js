/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-22 10:18:25
*/
const Router = require('express').Router;
const ProductModel = require('../models/product.js');

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/product-images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const router = Router();

//获取商品列表
router.get('/home/list',(req,res)=>{
	let page = req.query.page;
	
	let query = {status:0};
	if(req.query.categoryId){
		query.category = req.query.categoryId;
	}else{
		query.name = {$regex:new RegExp(req.query.keyword,'i')}
	}

	let projection = '_id name price images';

	let sort={order:-1};

	if(req.query.orderBy == 'price_asc'){
		sort = {price:1}
	}else if(req.query.orderBy == 'price_desc'){
		sort = {price:-1}
	}

	ProductModel.getPaginationProducts(page,query,projection,sort)
	.then(result=>{
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
	.catch(e=>{
		res.json({
			code:1,
			message:'获取商品列表失败'
		})
	})
})

//获取商品详细信息
router.get('/home/detail',(req,res)=>{
	ProductModel
	.findOne({status:0,_id:req.query.productId},"-__v -createdAt -updatedAt -category")
	.then(product=>{
		res.json({
			code:0,
			data:product
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取商品详情失败'
		})
	})
})

//管理员权限控制
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send({
			code:10
		});
	}
})

//处理商品图片
router.post("/uploadImage",upload.single('file'),(req,res)=>{
	const filePath = 'http://127.0.0.1:3000/product-images/'+req.file.filename;
	res.send(filePath);
	
})
//处理商品详情图片
router.post("/uploadDetailImage",upload.single('upload'),(req,res)=>{
	const filePath = 'http://127.0.0.1:3000/product-images/'+req.file.filename;
	res.json({
		  "success": true,
		  "msg": "上传成功",
		  "file_path": filePath
	});
})

//添加商品
router.post("/",(req,res)=>{
	let body = req.body;
	new ProductModel({
		name:body.name,
		category:body.category,
		detail:body.detail,
		description:body.description,
		images:body.images,
		price:body.price,
		stock:body.stock
	})
	.save()
	.then((product)=>{
		if(product){
			res.json({
				code:0,
				message:'新增商品成功'
			})
		}
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"添加分类失败,服务器端错误"
 		})
	})
})

//编辑商品
router.put("/",(req,res)=>{
	let body = req.body;
	let update = {
		name:body.name,
		category:body.category,
		detail:body.detail,
		description:body.description,
		images:body.images,
		price:body.price,
		stock:body.stock
	}
	ProductModel
	.update({_id:body.id},update)
	.then((raw)=>{
		res.json({
			code:0,
			message:'更新商品成功'
		})
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"更新分类失败,服务器端错误"
 		})
	})
})

//后台管理员获取商品列表
router.get("/",(req,res)=>{
	let page = req.query.page || 1;
	ProductModel
	.getPaginationProducts(page,{})
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
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})
	})		
});
//更新排序
router.put("/updateOrder",(req,res)=>{
	let body = req.body;
	ProductModel
	.update({_id:body.id},{order:body.order})
	.then((product)=>{
		if(product){
			ProductModel
			.getPaginationProducts(body.page,{})
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

//更新状态
router.put("/updateStatus",(req,res)=>{
	let body = req.body;
	ProductModel
	.update({_id:body.id},{status:body.status})
	.then((product)=>{
		if(product){
			ProductModel
			.getPaginationProducts(body.page,{})
			.then((result)=>{
				res.json({
					code:0,
					message:'更新状态成功',
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
				message:'更新状态失败'
			})							
		}
	})
})

//获取商品详细信息
router.get("/detail",(req,res)=>{
	let id = req.query.id;
	ProductModel
	.findById(id,"-__v -order -status -createdAt -updatedAt")
	.populate({path:'category',select:'_id pid'})
	.then((product)=>{
		res.json({
			code:0,
			data:product
		})	
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"获取商品失败,服务器端错误"
 		})
	})		
});
//搜索
router.get("/search",(req,res)=>{
	let page = req.query.page || 1;
	let keyword = req.query.keyword;
	ProductModel
	.getPaginationProducts(page,{
		name:{$regex:new RegExp(keyword,'i')}
	})
	.then((result)=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
				list:result.list,
				keyword:keyword					
			}
		})	
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"搜索商品失败,服务器端错误"
 		})
	})		
});
module.exports = router;