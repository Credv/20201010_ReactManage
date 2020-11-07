import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { isLogin } from '../../utils/storageUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/LeftNav'
import Header from '../../components/header/Header'
import Home from '../home/Home'
import Category from '../category/Category'
import Product from '../product/Product'
import Role from '../role/Role'
import User from '../user/User'
import Pie from '../chart/Pie'
import Line from '../chart/Line'
import Bar from '../chart/Bar'
import RadarPlot from '../chart/RadarPlot'
const { Footer, Sider, Content } = Layout;

/**
 * 后台管理的路由组件
 */
function admin() {
    // console.log(memoryUtils);
    return isLogin() ? (
        <Layout style={{ height: '100%' }}>
            <Sider><LeftNav /></Sider>
            <Layout>
                <Header>Header</Header>
                <Content style={{ margin:20 ,backgroundColor: '#fff' }}>
                    {/* 二级路由 */}
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/products:/category' component={Category} />
                        <Route path='/products:/product' component={Product} />
                        <Route path='/role' component={Role} />
                        <Route path='/user' component={User} />
                        <Route path='/charts:/pie' exact component={Pie} />
                        <Route path='/charts:/line'  component={Line} />
                        <Route path='/charts:/bar' component={Bar} />
                        <Route path='/charts:/radarPlot' component={RadarPlot} />
                        <Redirect to='/home'></Redirect>
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
        </Layout>
    ) : <Redirect to='/login'></Redirect>
}

export default admin
