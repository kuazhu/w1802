/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-11 20:34:33
*/

import React,{ Component,Fragment } from 'react'
import { Input,Button,Row, Col,List  } from 'antd';


import './App.css'

/*
class AppUI extends Component{
	render(){
		return( 
			<div className="App">
				<Row>
					<Col span={12}>
						<Input 
							onChange={this.props.handleChange} 
							value={this.props.val}
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
*/
//UI组件
const AppUI = (props)=>{
	const {handleChange,val,handleAdd,list,handleDel} = props;
	return( 
		<div className="App">
			<Row>
				<Col span={12}>
					<Input 
						onChange={handleChange} 
						value={val}
					/>
				</Col>
				<Col span={12}>
					<Button type="primary" onClick={handleAdd}>新增</Button>
				</Col>
			</Row>
			<List
				style={{marginTop:10}}
			  	bordered
			  	dataSource={list}
			  	renderItem={(item,index) => (<List.Item onClick={()=>{handleDel(index)}}>{item}</List.Item>)}
			/>				
		</div>
	)
}
export default AppUI