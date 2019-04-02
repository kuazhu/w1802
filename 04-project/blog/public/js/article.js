/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-02 19:09:48
*/
;(function($){
    ClassicEditor
    .create( document.querySelector( '#content' ),{
    	language:'zh-cn',
    	ckfinder:{
			uploadUrl:'/admin/uploadImage'
		}
    } )
    .catch( error => {
        console.error( error );
    } );
})(jQuery);