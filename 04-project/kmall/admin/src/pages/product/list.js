/*
 * @Author: TomChen
 * @Date:   2019-04-09 19:29:30
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-04-22 18:31:25
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Table, InputNumber, Divider, Modal, Input,Switch } from 'antd'
import { Link } from "react-router-dom"
import { actionCreator } from './store'
import Layout from 'common/layout'


class ProductList extends Component {
    componentDidMount() {
        this.props.handlePage(1);
    }
    render() {
        const {
            list,
            current,
            pageSize,
            total,
            handlePage,
            isPageFetching,
            handleUpdateOrder,
            handleUpdateStatus
        } = this.props;
        const dataSource = list.map(product => {
            return {
                key: product.get('_id'),
                id: product.get('_id'),
                name: product.get('name'),
                order: product.get('order'),
                status: product.get('status')
            }
        }).toJS()
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '排序',
            dataIndex: 'order',
            key: 'order',
            render: (order, record) => <InputNumber 
                    defaultValue={order} 
                    onBlur={(ev)=>{
                        handleUpdateOrder(record.id,ev.target.value)
                    }}
                />
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render:(status,record)=><Switch 
                checkedChildren="在售" 
                unCheckedChildren="下架" 
                checked={status==0 ? true : false}
                onChange={(checked)=>{
                    handleUpdateStatus(record.id,checked ? '0' : '1')
                }} 
            />
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={"/product/save/"+record.id} >修改</Link>
                    <Divider type="vertical" />   
                    <Link to={"/product/"+record.id} >查看详情</Link>
                </span>
            ),
        }];
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
              <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={{
                        current:current,
                        pageSize:pageSize,
                        total:total
                    }}
                    onChange={(page)=>{
                        handlePage(page.current)
                    }}
                    loading={{
                        spinning:isPageFetching,
                        tip:'正在加载数据'
                    }}
                />                        
            </Layout>
          </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.get('product').get('list'),
        current: state.get('product').get('current'),
        pageSize: state.get('product').get('pageSize'),
        total: state.get('product').get('total'),
        isPageFetching: state.get('product').get('isPageFetching'),
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        handlePage: (page) => {
            const action = actionCreator.getPageAction(page)
            dispath(action)
        },
        handleUpdateOrder: (id, newOrder) => {
            const action = actionCreator.getUpdateOrderAction(id, newOrder)
            dispath(action)
        },
        handleUpdateStatus: (id, newStatus) => {
            const action = actionCreator.getUpdateStatusAction(id, newStatus)
            dispath(action)
        },        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)