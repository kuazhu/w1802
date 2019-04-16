/*
* @Author: TomChen
* @Date:   2019-04-16 19:22:03
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-16 20:17:33
*/
import React,{ Component } from 'react'
import {
  Layout
} from 'antd';

const { Content } = Layout;

import Header from 'common/header'
import Sider from 'common/sider'

class AdminLayout extends Component{
    render(){
        return (
        	<div className="AdminLayout">
				<Layout>
					<Header />
					<Layout>
					  <Sider />
					  <Layout style={{ padding: '0 24px 24px' }}>
					    <Content style={{
					      background: '#fff', padding: 24, margin: 0, minHeight: 280,
					    }}
					    >
					      {this.props.children}
					    </Content>
					  </Layout>
					</Layout>
				</Layout>      	
        	</div>
        )
    }
}


export default AdminLayout