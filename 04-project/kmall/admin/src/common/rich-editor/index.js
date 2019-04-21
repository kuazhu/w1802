/*
* @Author: TomChen
* @Date:   2019-04-21 11:14:24
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-21 11:24:55
*/
import React,{ Component } from 'react'

import Simditor from 'simditor'

import 'simditor/styles/simditor.css'

class RichEditor extends Component{
	constructor(props){
		super(props);
		this.toolbar = [
			'title',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'fontScale',
			'color',
			'ol',
			'ul',
			'blockquote',
			'code',
			'table',
			'link',
			'image',
			'hr',
			'indent',
			'outdent',
			'alignment',
		]
	}


	componentDidMount(){
		new Simditor({
		  textarea: this.textarea,
		  toolbar:this.toolbar
		});
	}
	render(){
		return(
			<div className="RichEditor"> 
				<textarea ref={(textarea)=>{this.textarea = textarea}}></textarea>
			</div>
		)
	}
}


export default RichEditor