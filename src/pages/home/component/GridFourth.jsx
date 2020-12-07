import React from 'react'
import { QuestionCircleOutlined, LikeOutlined } from '@ant-design/icons'
import { Card, Statistic, Row, Col } from 'antd'
// import {Liquid } from '@ant-design/charts'
function GridThird() {
    // const option = {
    //     percent: 0.75,
        
    // }
    return (
        <div>
            <Card
                title="五星好评"
                bordered={false}
                extra={<QuestionCircleOutlined />}
            >
                <div className="feedback">
                    <Row gutter={24}>
                        <Col span={24}>
                            <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
                        </Col>
                        <Col span={12} push={4}>
                            {/* <Liquid {...option} /> */}
                        </Col>
                    </Row>


                </div>

                <div className="views-hr">
                    <hr />
                    <span className="text">好评率:
            <Statistic
                            valueStyle={{ fontSize: "0.875rem" }}
                            value={80} />%
                    </span>
                </div>
            </Card>

        </div>
    )
}

export default GridThird
