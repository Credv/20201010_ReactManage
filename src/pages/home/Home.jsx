import { Row, Col } from 'antd'
// import { QuestionCircleOutlined } from '@ant-design/icons'
// import { Line } from '@ant-design/charts'
import React from 'react'
import './index.less'
// import { useState } from 'react'
import GridFirst from './component/GridFirst'
import GridSecond from './component/GridSecond'
import GridThird from './component/GridThird'
import GridFourth from './component/GridFourth'
import CardSales from './component/CardSales'
import Capacity from './component/Capacity'
/**
 * 首页
 */
function Home() {
    

    return (
        <div className="home" >
            <div className="site-card-wrapper" style={{ width: "100%" }}>
                {/* 栅格Card */}
                <Row gutter={24}>
                    <Col span={6}>
                        <GridFirst />
                    </Col>
                    <Col span={6}>
                        <GridSecond />
                    </Col>
                    <Col span={6}>
                        <GridThird />
                    </Col>
                    <Col span={6}>
                        <GridFourth />
                    </Col>
                </Row>
                <CardSales></CardSales>
                <Row gutter={24} className="Row-Capacity">
                    <Col span={12}>
                        <Capacity></Capacity>
                    </Col>
                    <Col span={12} >
                        <Capacity></Capacity>
                    </Col>
                </Row>

            </div>

        </div>
    )
}

export default Home
