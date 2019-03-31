/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-31 17:15:07
*/
;(function($){
	//用户退出
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout'
		})
		.done(function(result){
			if(result.status == 0){//成功
				// window.location.reload()
				window.location.href = "/"
			}else{//失败
				$err.html(result.message);
			}			
		})
		.fail(function(err){
			$('#user-info .err').html('请求失败,请稍后再试一试');	
		})
	})
})(jQuery);