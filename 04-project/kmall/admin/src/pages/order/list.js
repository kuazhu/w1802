/*
 * @Author: TomChen
 * @Date:   2019-04-09 19:29:30
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-05-05 11:53:40
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Table,  Input,Switch } from 'antd'
const Search = Input.Search;
import { Link } from "react-router-dom"
import { actionCreator } from './store'
import Layout from 'common/layout'


class OrderList extends Component {
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
            handleSearch,
            keyword
        } = this.props;
        const dataSource = list.map(order => {
            return {
                key: order.get('_id'),
                orderNo: order.get('orderNo'),
                statusDesc: order.get('statusDesc'),
                payment: "¥"+order.get('payment'),
                name: order.get('shipping').get('name'),
                phone: order.get('shipping').get('phone'),
                createdTime: new Date(order.get('createdAt')).toLocaleString()
            }
        }).toJS()
        const columns = [{
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            render:orderNo=>{
                if(keyword){
                    const reg = new RegExp('('+keyword+')','ig');
                    const html = orderNo.replace(reg,"<b style='color:red'>$1</b>");
                    return <span dangerouslySetInnerHTML={{__html:html}}></span>;
                }else{
                    return orderNo;
                }
            }
        },{
            title: '订单状态',
            dataIndex: 'statusDesc',
            key: 'statusDesc',
        },{
            title: '订单金额',
            dataIndex: 'payment',
            key: 'payment',
        },{
            title: '下单时间',
            dataIndex: 'createdTime',
            key: 'createdTime',
        },{
            title: '收货人',
            dataIndex: 'name',
            key: 'name',
        },{
            title: '收货人电话',
            dataIndex: 'phone',
            key: 'phone',
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <span>  
                    <Link to={"/order/detail/"+record.orderNo} >查看详情</Link>
                </span>
            ),
        }];
        return (
            <div className="OrderList">
            <Layout>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                <Breadcrumb.Item>订单列表</Breadcrumb.Item>
              </Breadcrumb>
              <div className="clearfix">
                <Search 
                  placeholder="请输入订单号关键字"
                  onSearch={value => {
                    handleSearch(value);
                  }}
                  enterButton 
                  style={{ width: 300 }}                   
                />
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
                        if(keyword){
                            handleSearch(keyword,page.current)
                        }else{
                           handlePage(page.current) 
                        }
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
        list: state.get('order').get('list'),
        current: state.get('order').get('current'),
        pageSize: state.get('order').get('pageSize'),
        total: state.get('order').get('total'),
        isPageFetching: state.get('order').get('isPageFetching'),
        keyword: state.get('order').get('keyword'),
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        handlePage: (page) => {
            const action = actionCreator.getPageAction(page)
            dispath(action)
        },
        handleSearch: (keyword,page) => {
            const action = actionCreator.getSearchAction(keyword,page)
            dispath(action)
        },                
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)