/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-17 18:30:26
*/

import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Card, Col, Row } from 'antd'

import { actionCreator } from './store'

import Layout from 'common/layout'

class Home extends Component{
	componentDidMount(){
		this.props.handleCount()
	}
    render(){
    	const {usernum,productnum,ordernum} = this.props
        return (
        	<div className="Home">
        		<Layout>
				    <Row gutter={16}>
				      <Col span={8}>
				        <Card title="用户数量" bordered={false}>{usernum}</Card>
				      </Col>
				      <Col span={8}>
				        <Card title="商品数据" bordered={false}>{productnum}</Card>
				      </Col>
				      <Col span={8}>
				        <Card title="订单数量" bordered={false}>{ordernum}</Card>
				      </Col>
				    </Row>
        		</Layout>
        	</div>
        )
    }
}
const mapStateToProps = (state)=>{
	return {
		usernum:state.get('home').get('usernum'),
		productnum:state.get('home').get('productnum'),
		ordernum:state.get('home').get('ordernum'),
	}
}

const mapDispatchToProps = (dispath)=>{
	return {
		handleCount:()=>{
			const action = actionCreator.getCountAction()
			dispath(action)
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)