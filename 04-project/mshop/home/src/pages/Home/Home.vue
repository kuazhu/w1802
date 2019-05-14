<template>
	<div class="Home">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<img src="../../assets/images/s1.jpg" alt="">
				</div>
				<div class="swiper-slide">
					<img src="../../assets/images/s2.jpg" alt="">
				</div>
				<div class="swiper-slide">
					<img src="../../assets/images/s3.jpg" alt="">
				</div>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>
		</div>
		<!--首页商品列表-->
		<ul class="product-wrap">
			<!--电器-->
			<li class="product-floor">
				<h3 class="floor-title">电器</h3>
				<ul class="product-list">
					<li class="product-item">
						<img class="product-image" src="../../assets/images/p1.jpg" alt="">
						<div class="product-content">
							<h4 class="product-name">海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视海尔电视</h4>
							<p class="product-price">$1111.00</p>
							<span class="btn-buy">购买</span>
						</div>
					</li>
					<li class="product-item">
						<img class="product-image" src="../../assets/images/p1.jpg" alt="">
						<div class="product-content">
							<h4 class="product-name">海尔电视</h4>
							<p class="product-price">$1111.00</p>
							<span class="btn-buy">购买</span>
						</div>
					</li>
					<li class="product-item">
						<img class="product-image" src="../../assets/images/p1.jpg" alt="">
						<div class="product-content">
							<h4 class="product-name">海尔电视</h4>
							<p class="product-price">$1111.00</p>
							<span class="btn-buy">购买</span>
						</div>
					</li>
					<li class="product-item">
						<img class="product-image" src="../../assets/images/p1.jpg" alt="">
						<div class="product-content">
							<h4 class="product-name">海尔电视</h4>
							<p class="product-price">$1111.00</p>
							<span class="btn-buy">购买</span>
						</div>
					</li>															
				</ul>
			</li>
			<!--服装-->
			<li class="product-floor">
				<h3 class="floor-title">服装</h3>
				<ul class="product-list">
					<li class="product-item">
						<img class="product-image" src="../../assets/images/p1.jpg" alt="">
						<div class="product-content">
							<h4 class="product-name">海尔电视海尔电视海尔电视海尔电视</h4>
							<p class="product-price">$1111.00</p>
							<span class="btn-buy">购买</span>
						</div>
					</li>
					<li class="product-item">
						<img class="product-image" src="../../assets/images/p1.jpg" alt="">
						<div class="product-content">
							<h4 class="product-name">海尔电视</h4>
							<p class="product-price">$1111.00</p>
							<span class="btn-buy">购买</span>
						</div>
					</li>
					<li class="product-item">
						<img class="product-image" src="../../assets/images/p1.jpg" alt="">
						<div class="product-content">
							<h4 class="product-name">海尔电视</h4>
							<p class="product-price">$1111.00</p>
							<span class="btn-buy">购买</span>
						</div>
					</li>
					<li class="product-item">
						<img class="product-image" src="../../assets/images/p1.jpg" alt="">
						<div class="product-content">
							<h4 class="product-name">海尔电视</h4>
							<p class="product-price">$1111.00</p>
							<span class="btn-buy">购买</span>
						</div>
					</li>															
				</ul>
			</li>			
		</ul>		
	</div>
</template>
<script>
	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css';

	export default {
		name:'Home',
		mounted(){
			new Swiper ('.swiper-container', {
				// 循环模式选项
				loop: true,
				autoplay:true,
				//分页器
				pagination: {
				  el: '.swiper-pagination',
				  clickable:true
				},
			})			
		}
	}
</script>
<style scoped lang="less">
	.Home{
		.swiper-slide img{
			width: 100%;
			.rem(height,160);
		}
		.product-wrap{
			display: flex;
			flex-direction: column;
			.rem(padding,0,10);
			.product-floor{
				margin-bottom: 10px;
				.floor-title{
					text-align: center;
					margin-bottom: 5px;
					.rem(line-height,30);
					.rem(font-size,24);
				}
				.product-list{
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: space-between;
					.product-item{
						box-sizing: border-box;
						text-align: center;
						background-color: #fff;
						margin-top: 10px;
						.rem(padding,10);
						.product-image{
							.rem(width,100);
							.rem(height,100);
						}
						.product-content{
							.rem(height,100);
							.rem(width,125);
							.product-name{
								.rem(height,40);
								.rem(line-height,20);
								.rem(font-size,12);
								overflow: hidden;
								text-align: left;
								color: #111;
							}
							.product-price{
								.rem(line-height,20);
								.rem(font-size,18);
								text-align: left;
								color: #f21;
							}
							.btn-buy{
								display: block;
								.rem(line-height,20);
								.rem(width,60);
								.rem(font-size,16);
								.rem(padding,5);
								background-color: #f21;
								color: #fff;
								border-radius: 5px;
								margin-top: 10px;
							}
						}
					}
				}
			}
		}			
	}
</style>