/*
* @Author: TomChen
* @Date:   2019-04-21 11:14:24
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-22 20:43:03
*/
import React,{ Component } from 'react'

import Simditor from 'simditor'

import $ from 'jquery';

import 'simditor/styles/simditor.css'
import './index.css'

class RichEditor extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoaded:false
		}
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
		];
		$.ajaxSetup({
			xhrFields:{
				withCredentials: true
			}	
		})
	}
	componentDidMount(){
		this.simditor = new Simditor({
				textarea: this.textarea,
				toolbar:this.toolbar,
				upload:{
					url: this.props.url,
					fileKey: 'upload'
				}
		});
		this.simditor.on('valuechanged',()=>{
			this.setState(()=>({isLoaded:true}),()=>{
				this.props.getRichEditorValue(this.simditor.getValue())
			})	
		})
	}
	componentDidUpdate(){
		if(this.props.detail && !this.state.isLoaded){
			this.simditor.setValue(this.props.detail)
			this.setState(()=>({isLoaded:true}))
		}
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