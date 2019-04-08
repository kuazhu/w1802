/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-04 19:28:41
*/
;(function($){
	var passwordReg = /^\w{3,6}$/;
	$('#btn-sub').on('click',function(){
		var password = $('[name="password"]').val()
		var repassword = $('[name="repassword"]').val()

		var $errs = $('.err');
		if(!passwordReg.test(password)){
			$errs.eq(0).html('密码3-6位字符');
			return false;
		}else{
			$errs.eq(0).html('');
		}
		//密码输入一致
		if(password != repassword){
			$errs.eq(1).html('两次密码不一致');
			return false;
		}else{
			$errs.eq(1).html('')
		}
	});
})(jQuery);