/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-04 19:04:40
*/
;(function($){
	//提交评论
	$('.btn-sub-comment').on('click',function(){
		var content = $('#comment-content').val().trim()
		var $err = $('.err');
		if(!content){
			$err.html('请输入评论内容');
			return false;
		}
		else if(content.length > 100){
			$err.html('评论内容最多100个字符');
			return false;
		}
		else{
			$err.html('')
		}
		var id = $(this).data('id')
		$.ajax({
			url:'/comment/add',
			type:'post',
			dataType:'json',
			data:{
				content:content,
				article:id
			}
		})
		.done(function(result){
			$('#comment-content').val('')
			$('#comment-page').trigger('get-data',result.data)
		})
		.fail(function(err){
			console.log(err)
		})


	})
})(jQuery);