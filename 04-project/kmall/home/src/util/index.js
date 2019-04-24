/*
* @Author: TomChen
* @Date:   2019-04-24 19:20:01
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-24 19:26:12
*/
var _util = {
	request:function(options){
		$.ajax({
			method:options.method || 'get',
			url:options.url || '',
			dataType:options.dataType || 'json',
			data:options.data || '',
			success:function(result){
				//成功
				if(result.code == 0){
					options.success && options.success(result.data)
				}
				//失败
				else if(result.code == 1){
					options.error && options.error(result.message)
				}
				//没有权限
				else if(result.code == 10){
					//跳转到登录页面
					window.location.herf = './user-login.html'
				}
			},
			error:function(err){
				options.error && options.error(err.statusText)
			}

		})
	}
}

module.exports = _util;