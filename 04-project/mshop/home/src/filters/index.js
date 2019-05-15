/*
* @Author: TomChen
* @Date:   2019-05-15 18:39:08
* @Last Modified by:   TomChen
* @Last Modified time: 2019-05-15 18:40:24
*/
export default {
	formatPrice(price=0){
		price = parseFloat(price)
		return "$"+price.toFixed(2)
	}
}