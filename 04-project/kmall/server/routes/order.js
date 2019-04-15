/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-18 09:31:55
*/
const Router = require('express').Router;
const UserModel = require('../models/user.js');
const OrderModel = require('../models/order.js');

const router = Router();
//普通用户登录权限控制
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			code:10
		})
	}
})

//获取生成订单的商品列表
router.get('/orderProductList',(req,res)=>{
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		user.getOrderProductList()
		.then(cart=>{
			res.json({
				code:0,
				data:cart
			})			
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取订单商品失败'
		})
	})	
})
//获取订单列表
router.get('/home/list',(req,res)=>{
	let page = req.query.page;
	let query = {
		user:req.userInfo._id
	}
	OrderModel.getPaginationOrders(page,query)
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
		console.log(e)
		res.json({
			code:1,
			message:'获取订单列表失败'
		})
	})	
})
//获取单个订单
router.get('/home/detail',(req,res)=>{
	let orderNo = req.query.orderNo;
	OrderModel.findOne({orderNo:orderNo,user:req.userInfo._id})
	.then(order=>{
		res.json({
			code:0,
			data:order
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取订单失败'
		})
	})	
})
//创建订单
router.post('/',(req,res)=>{
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		let order = {};
		user.getOrderProductList()
		.then(result=>{
			order.payment = result.totalCartPrice;
			//构建订单的商品
			let productList = [];
			result.cartList.forEach(item=>{
				productList.push({
					productId:item.product._id,
					count:item.count,
					totalPrice:item.totalPrice,
					price:item.product.price,
					images:item.product.images,
					name:item.product.name
				})
			})
			order.productList = productList;

			//构建订单的地址信息
			let shipping = user.shipping.id(req.body.shippingId);
			order.shipping = {
				shippingId:shipping._id,
				    name:shipping.name,
				    province:shipping.province,
				    city:shipping.city,
				    address:shipping.address,
				    phone:shipping.phone,
				    zip:shipping.zip
			}

			//构建订单号
			order.orderNo = Date.now().toString() + parseInt(Math.random()*10000);

			//赋值用户ID
			order.user = user._id;

			new OrderModel(order)
			.save()
			.then(newOder=>{
				//删除购物车中选中的商品
				UserModel.findById(req.userInfo._id)
				.then(userUser=>{
					let newCartList = userUser.cart.cartList.filter(item=>{
						return item.checked == false;
					})
					userUser.cart.cartList = newCartList;
					userUser.save()
					.then(newUser2=>{
						//返回订单到前台
						res.json({
							code:0,
							data:newOder
						})					
					})
				})
			})	
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取订单商品失败'
		})
	})
})

//取消订单
router.put('/cancel',(req,res)=>{
	let orderNo = req.body.orderNo;
	OrderModel.findOneAndUpdate(
		{orderNo:orderNo,user:req.userInfo._id},
		{status:"20",statusDesc:"取消"},
		{new:true}
	)
	.then(order=>{
		res.json({
			code:0,
			data:order
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'更新订单失败'
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

//获取所有订单列表
router.get('/',(req,res)=>{
	let page = req.query.page;
	OrderModel.getPaginationOrders(page)
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
		console.log(e)
		res.json({
			code:1,
			message:'获取订单列表失败'
		})
	})	
})
//搜索
router.get("/search",(req,res)=>{
	let page = req.query.page || 1;
	let keyword = req.query.keyword;
	OrderModel
	.getPaginationOrders(page,{
		orderNo:{$regex:new RegExp(keyword,'i')}
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
 			message:"搜索订单失败,服务器端错误"
 		})
	})		
});
//获取单个订单
router.get('/detail',(req,res)=>{
	let orderNo = req.query.orderNo;
	OrderModel.findOne({orderNo:orderNo})
	.then(order=>{
		res.json({
			code:0,
			data:order
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取订单失败'
		})
	})	
})

router.put('/deliver',(req,res)=>{
	let orderNo = req.body.orderNo;
	OrderModel.findOneAndUpdate(
		{orderNo:orderNo},
		{status:"40",statusDesc:"已发货"},
		{new:true}
	)
	.then(order=>{
		res.json({
			code:0,
			data:order
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'订单发货失败'
		})
	})	
})
module.exports = router;