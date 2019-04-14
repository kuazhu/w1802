/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:54:27
*/

import React,{ Component,Fragment } from 'react'
import { Input,Button,Row, Col,List  } from 'antd';

import { connect } from 'react-redux'
import { actionCreator } from './store'
import './index.css'

class TodoList extends Component{
	componentDidMount(){
		this.props.handleInit()
	}
	render(){
		return( 
			<div className="TodoList">
				<Row>
					<Col span={12}>
						<Input
							value={this.props.val} 
							onChange={this.props.handleChange}
						/>
					</Col>
					<Col span={12}>
						<Button type="primary" onClick={this.props.handleAdd}>新增</Button>
					</Col>
				</Row>
				<List
					style={{marginTop:10}}
				  	bordered
				  	dataSource={this.props.list}
				  	renderItem={(item,index) => (<List.Item onClick={()=>{this.props.handleDel(index)}}>{item}</List.Item>)}
				/>				
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		val:state.get('todolist').get('val'),
		list:state.get('todolist').get('list')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleChange:(ev)=>{
			const val = ev.target.value
			const action = actionCreator.getChangeItemAction(val)
			dispatch(action)			
		},
		handleAdd:()=>{
			const action = actionCreator.getAddItemAction();
			dispatch(action)			
		},
		handleDel:(index)=>{
			const action = actionCreator.getDelItemAction(index)
			dispatch(action)			
		},
		handleInit:()=>{
			const action = actionCreator.getInitDataAction();
			dispatch(action)			
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);