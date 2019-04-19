/*
 * @Author: TomChen
 * @Date:   2019-04-09 19:29:30
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-04-19 19:59:56
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Table, InputNumber, Divider,Modal,Input } from 'antd'
import { Link } from "react-router-dom"
import { actionCreator } from './store'
import Layout from 'common/layout'


class ProductList extends Component {

    render() {
        return (
            <div className="ProductList">
            <Layout>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                <Breadcrumb.Item>商品列表</Breadcrumb.Item>
              </Breadcrumb>
              <div className="clearfix">
                <Link style={{float:'right'}} to="/product/save">
                    <Button  type="primary" >添加商品</Button>
                </Link>
              </div>                        
            </Layout>
          </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispath) => {
    return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)