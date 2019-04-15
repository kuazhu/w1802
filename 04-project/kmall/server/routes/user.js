/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-11 09:59:24
*/
const Router = require('express').Router;
const UserModel = require('../models/user.js');
const ProductModel = require('../models/product.js');
const hmac = require('../util/hmac.js')

const router = Router();

//注册用户
router.post("/register",(req,res)=>{
	let body = req.body;
	//定义返回数据
	let result  = {
		code:0,// 0 代表成功 
		message:''
	}

	UserModel
	.findOne({username:body.username})
	.then((user)=>{
		if(user){//已经有该用户
			 result.code = 1;
			 result.message = '用户已存在'
			 res.json(result);
		}else{
			//插入数据到数据库
			new UserModel({
				username:body.username,
				phone:body.phone,
				email:body.email,
				password:hmac(body.password),
			})
			.save((err,newUser)=>{
				if(!err){//插入成功
					res.json(result)
				}else{
					result.code = 1;
					result.message = '注册失败'
					res.json(result);					
				}
			})
		}
	})

})
//用户登录
router.post("/login",(req,res)=>{
	let body = req.body;
	//定义返回数据
	let result  = {
		code:0,// 0 代表成功 
		message:''
	}
	UserModel
	.findOne({username:body.username,password:hmac(body.password),isAdmin:false})
	.then((user)=>{
		if(user){//登录成功
			 req.session.userInfo = {
			 	_id:user._id,
			 	username:user.username,
			 	isAdmin:user.isAdmin
			 }
			 res.json(result);
		}else{
			result.code = 1;
			result.message = '用户名和密码错误'
			res.json(result);
		}
	})

})


router.get("/username",(req,res)=>{
	if(req.userInfo._id){
		res.json({
			code:0,
			data:{
				username:req.userInfo.username
			}
		})
	}else{
		res.json({
			code:1
		});
	}
});


router.get("/checkUsername",(req,res)=>{
	let username = req.query.username;
	UserModel
	.findOne({username:username})
	.then((user)=>{
		if(user){
			res.json({
				code:1,
				message:'用户名已存在'
			})
		}else{
			res.json({
				code:0,
			})
		}
	})
});


//退出
router.get('/logout',(req,res)=>{
	let result  = {
		code:0,// 0 代表成功 
		message:''
	}
	req.session.destroy();

	res.json(result);

})

//权限控制
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			code:10
		})
	}
})

router.get("/userInfo",(req,res)=>{
	if(req.userInfo._id){
		UserModel.findById(req.userInfo._id,"username phone email")
		.then(user=>{
			res.json({
				code:0,
				data:user
			})
		})
	}else{
		res.json({
			code:1
		});
	}
});

router.put("/updatePassword",(req,res)=>{
	UserModel.update({_id:req.userInfo._id},{password:hmac(req.body.password)})
	.then(raw=>{
		res.json({
			code:0,
			message:'更新密码成功'
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'更新密码失败'
		})
	})
})

module.exports = router;