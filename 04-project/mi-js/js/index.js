/*
* @Author: TomChen
* @Date:   2018-12-23 16:23:34
* @Last Modified by:   TomChen
* @Last Modified time: 2019-01-30 17:12:23
*/
handleCart();
handleNav();
handleCarousel();
handleCate();
handleCountdown();
handleFlashProduct();
handleElecProduct();
//处理购物车
function handleCart(){
	//1.获取元素
	var oCart = document.querySelector('.top .cart');
	var oCartLink = document.querySelector('.top .cart .cart-box a');
	var oCartContent = document.querySelector('.top .cart .cart-content');
	var oLoader = oCartContent.querySelector('.loader');
	var oEmptyCart = oCartContent.querySelector('.empty-cart');
	oCart.onmouseenter = function(){
		//1.改变购物车图标的背景色和字体颜色
		oCartLink.style.background = '#fff';
		oCartLink.style.color = '#ff6700';
		//2.加载loading图标
		oLoader.style.display = 'block';
		//3.显示购物车内容,假设购物车完全显示就获取到了获取购物车数据
		animate(oCartContent,{height:100},true,function(){
			oLoader.style.display = 'none';
			//此处会根据请求结果显示
			oEmptyCart.style.display = 'block';
		});
	}
	oCart.onmouseleave = function(){
		//1.改变购物车图标的背景色和字体颜色
		oCartLink.style.background = '#424242';
		oCartLink.style.color = '#b0b0b0';
		//2.隐藏购物车内容
		animate(oCartContent,{height:0},true,function(){
			//3.隐藏购物车数据和loading图片
			oLoader.style.display = 'none';
			oEmptyCart.style.display = 'none';
		});	
	}
}
//处理导航
function handleNav(){
	//1.获取导航列表
	var aNavItem = document.querySelectorAll('.header .header-nav .header-nav-item');
	var oNavContent = document.querySelector('.header .header-nav-content');
	var oNavContentContainer = oNavContent.querySelector('.container');
	var hideTimer = 0;
	var loadTimer = 0;
	//2.批量监听导航列表事件
	for(var i = 0;i<aNavItem.length-2;i++){
		//2.1鼠标移入事件
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			clearTimeout(hideTimer);
			oNavContent.style.borderTop = '1px solid #ccc';
			oNavContentContainer.innerHTML = '<div class="loader"></div>';
			animate(oNavContent,{height:180},true,function(){
				oNavContent.style.overflow = 'visible';
			});
			//模拟加载数据
			var index = this.index;
			//去除不必要的加载
			clearTimeout(loadTimer);
			loadTimer = setTimeout(function(){
				loadData(index);
			},1000)
		}
		//2.2鼠标移除事件
		aNavItem[i].onmouseleave = function(){
			hideNavContent();	
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNavContent.onmouseleave = function(){
		hideNavContent();
	}
	function hideNavContent(){
		hideTimer = setTimeout(function(){
			oNavContent.style.overflow = 'hidden';
			animate(oNavContent,{height:0},true,function(){
				oNavContent.style.borderTop = 'none';
			});	
		},500)			
	}
	function loadData(index){
		var data = aNavItemData[index];
		var html = '<ul>';
		for(var i = 0;i<data.length;i++){
			html += '<li>';
			html +=	'	<div class="img-box">';
			html +=	'		<a href="'+data[i].url+'">';
			html +=	'			<img src="'+data[i].img+'" alt="">';
			html +=	'		</a>';
			html +=	'	</div>';
			html +=	'	<p class="product-name">'+data[i].name+'</p>';
			html +=	'	<p class="product-price">'+data[i].price+'元起</p>';
			if(data[i].tag){
				html +=	'	<span class="tag">'+data[i].tag+'</span>';
			}
			html +=	'</li>';
		}
		html += '</ul>';
		oNavContentContainer.innerHTML = html;
	}
}
//处理首页轮播图
function handleCarousel(){
	new Carousel({
		id:'carousel',
		aImg:['images/b1.jpg','images/b2.jpg','images/b3.jpg'],
		width:1226,
		height:460,
		playDuration:1000
	});	
}
//分类处理
function handleCate(){
	var aCateItem = document.querySelectorAll('.home .banner .cate .cate-item');
	var oCateContent = document.querySelector('.home .banner .cate-content');
	var oCateBox = document.querySelector('.home .banner .cate-box');
	for(var i = 0;i<aCateItem.length;i++){
		aCateItem[i].index = i;
		aCateItem[i].onmouseenter = function(){
			for(var j = 0 ;j<aCateItem.length;j++){
				aCateItem[j].className = 'cate-item';
			}
			oCateContent.style.display = 'block';
			this.className = 'cate-item active';
			//加载数据
			loadData(this.index);
		}
	}
	oCateBox.onmouseleave = function(){
		oCateContent.style.display = 'none';
		for(var j = 0 ;j<aCateItem.length;j++){
			aCateItem[j].className = 'cate-item';
		}		
	}
	function loadData(index){
		var data = aCateItemData[index];
		var html = '<ul>';
		for(var i = 0;i<data.length;i++){
			html +=	'<li>';
			html +=	'<a href="'+data[i].url+'">';
			html +=		'<img src="'+data[i].img+'" alt="">';
			html +=		'<span>'+data[i].name+'</span>';
			html +=	 '</a>';
			html +=	'</li>';
		}

		html += '</ul>';

		oCateContent.innerHTML = html;
	}
}
//处理倒计时
function handleCountdown(){
	var oTimenum = document.querySelectorAll('.flash .timer-num');
	var endDate = new Date('2018-12-24 20:38:02');
	var timer = 0;
	function to2Str(num){
		return num > 9 ? ''+num : '0'+num;
	}
	function handleTimer(){
		var endTime = endDate.getTime();
		var allMinseconds = endTime -  Date.now();
		if(allMinseconds < 0){
			allMinseconds = 0;
			clearInterval(timer);
		}
		var allSeconds = parseInt(allMinseconds / 1000);
		var iHour = parseInt(allSeconds / 3600);
		var iMinute =  parseInt((allSeconds % 3600) / 60);
		var iSecond = (allSeconds % 3600) % 60;
		oTimenum[0].innerHTML = to2Str(iHour);
		oTimenum[1].innerHTML = to2Str(iMinute);
		oTimenum[2].innerHTML = to2Str(iSecond);		
	}
	timer = setInterval(handleTimer,500);
	handleTimer();
}
//处理闪购的商品切换
function handleFlashProduct(){
	var oProductList = document.querySelector('.flash .product-list');
	var aSpan = document.querySelectorAll('.flash .ctr-btn');
	aSpan[0].onclick = function(){
		oProductList.style.marginLeft = '0px';
	}
	aSpan[1].onclick = function(){
		oProductList.style.marginLeft = '-978px';
	}	
}
//处理家电部分
function handleElecProduct(){
	//1.获取元素
	var aTabItem = document.querySelectorAll('.elec .tab .tab-item');
	var oElecProduct = document.querySelector('.elec .elec-product');
	//初始化加载
	loadData(0);
	//2.添加事件
	for(var i = 0;i<aTabItem.length;i++){
		aTabItem[i].index = i;
		aTabItem[i].onmouseenter = function(){
			//排他
			for(var j = 0;j<aTabItem.length;j++){
				aTabItem[j].className = 'tab-item';
			}
			this.className = 'tab-item tab-item-active';
			//加载数据
			loadData(this.index);
		}
	}
	function loadData(index){
		var data = aElecItemData[index];
		var html = '';
		//根据数据构建html
		for(var i = 0;i<data.length-1;i++){
			html += '<li class="product-item product-item-m">';
			html += '	<a href="'+data[i].url+'">';
			html += '		<img src="'+data[i].img+'" alt="" class="product-img">';
			html += '	</a>';
			html += '	<h3 class="product-name">'+data[i].name+'</h3>';
			html += '	<p class="product-desc">'+data[i].desc+'</p>';
			html += '	<p class="product-price">';
			html += '		<strong>'+data[i].price+'</strong><span>&nbsp;元</span>';
			html += '		<del>'+data[i].del+'元</del>';
			html += '	</p>';
			if(data[i].flag){
				html += '	<span class="flag '+data[i].flag.name+'">'+data[i].flag.content+'</span>';
			}
			if(data[i].view){
				html += '	<div class="view">';
				html += '		<p class="recommend">'+data[i].view.recommend+'</p>';
				html += '		<p class="author">';
				html += '			来自于<span>'+data[i].view.author+'<span>的评价';
				html += '		</p>';
				html += '	</div>';
			}
			html += '</li>';			
		}
		var lastData = data[data.length-1];
		html +=	'<li class="product-item product-item-s">';
		html +=	'	<a href="'+lastData.top.url+'">';
		html +=	'		<img src="'+lastData.top.img+'" alt="" class="product-img">';
		html +=	'	</a>';
		html +=	'	<h3 class="product-name">'+lastData.top.name+'</h3>';
		html +=	'	<p class="product-price">';
		html +=	'		<strong>'+lastData.top.price+'</strong><span>&nbsp;元</span>';
		html +=	'	</p>										';
		html +=	'</li>';
		html +=	'<li class="product-item product-item-s">';
		html +=	'	<a class="more" href="'+lastData.bottom.url+'">';
		html +=	'		'+lastData.bottom.txt+'<span>'+lastData.bottom.tag+'</span>';
		html +=	'		<i class="iconfont">'+lastData.bottom.icon+'</i>';
		html +=	'	</a>	';
		html +=	'</li>			';
		oElecProduct.innerHTML = html;	

	}
}