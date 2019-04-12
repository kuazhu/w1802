/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 19:18:22
*/

import React,{ Component,Fragment } from 'react'
import { Input,Button,Row, Col,List  } from 'antd';

import { connect } from 'react-redux'
import {getAddItemAction,getChangeItemAction,getDelItemAction,loadInitDataAction,getInitDataAction} from './store/actionCreator.js'
import './App.css'

class App extends Component{
	render(){
		return( 
			<div className="App">
				<Row>
					<Col span={12}>
						<Input
							value={this.props.val} 
							onChange={this.props.handleChange}
						/>
					</Col>
					<Col span={12}>
						<Button type="primary">新增</Button>
					</Col>
				</Row>
				<List
					style={{marginTop:10}}
				  	bordered
				  	dataSource={this.props.list}
				  	renderItem={(item,index) => (<List.Item>{item}</List.Item>)}
				/>				
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		val:state.val,
		list:state.list
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleChange:(ev)=>{
			const val = ev.target.value
			const action = getChangeItemAction(val)
			dispatch(action)			
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);