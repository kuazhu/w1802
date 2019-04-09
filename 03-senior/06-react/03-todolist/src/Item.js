/*
* @Author: TomChen
* @Date:   2019-04-09 20:41:19
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-09 20:52:02
*/
import React,{ Component } from 'react'

class Item extends Component{
	/*
	handleDel(){
		console.log(this.props.list)
		console.log(this.props.index)
		this.props.list.splice(this.props.index,1)
		console.log(this.props.list)
	}
	*/
	render(){
		return (
			// <li onClick={this.handleDel.bind(this)}>
			<li onClick={this.props.handleDel}>
				{this.props.content}
			</li>
		)
	}
}

export default Item