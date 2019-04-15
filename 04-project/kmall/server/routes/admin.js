/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-15 18:25:38
*/
const Router = require('express').Router;

const UserModel = require('../models/user.js');
const OrderModel = require('../models/order.js');
const ProductModel = require('../models/product.js');
const pagination = require('../util/pagination.js');
const hmac = require('../util/hmac.js')

const router = Router();


router.get("/init",(req,res)=>{
	//插入数据到数据库
	new UserModel({
		username:'admin',
		password:hmac('admin'),
		isAdmin:true
	})
	.save((err,newUser)=>{
		if(!err){//插入成功
			res.send('ok')
		}else{
			res.send('err')				
		}
	})
});

//用户登录
router.post("/login",(req,res)=>{
	let body = req.body;
	//定义返回数据
	let result  = {
		code:0,// 0 代表成功 
		message:''
	}
	UserModel
	.findOne({username:body.username,password:hmac(body.password),isAdmin:true})
	.then((user)=>{
		if(user){//登录成功
			 req.session.userInfo = {
			 	_id:user._id,
			 	username:user.username,
			 	isAdmin:user.isAdmin
			 }
			 result.data = {
			 	username:user.username
			 }
			 res.json(result);
		}else{
			result.code = 1;
			result.message = '用户名和密码错误'
			res.json(result);
		}
	})
})

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

//系统统计
router.get('/count',(req,res)=>{
	UserModel.estimatedDocumentCount()
	.then(usernum=>{
		OrderModel.estimatedDocumentCount()
		.then(ordernum=>{
			ProductModel.estimatedDocumentCount()
			.then(productnum=>{
				res.json({
					code:0,
					data:{
						usernum:usernum,
						ordernum:ordernum,
						productnum:productnum
					}
				})				
			})
		})
	})
})
//获取用户
router.get('/users',(req,res)=>{
	let options = {
		page: req.query.page,//需要显示的页码
		model:UserModel, //操作的数据模型
		query:{}, //查询条件
		projection:'-password -__v -updatedAt', //投影，
		sort:{_id:-1} //排序
	}
	pagination(options)
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
})

module.exports = router;