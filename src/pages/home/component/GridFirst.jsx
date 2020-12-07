import React, { useState } from 'react'
import { Card, Statistic } from 'antd'
import { QuestionCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
function GridFirst() {
    const [priceTotal, setPriceTotal] = useState(128850)
    const [priceToday, setPriceToday] = useState(18850)
    return (
        <div className="grid-First">
            <Card
                title="总销售额"
                bordered={false}
                extra={<QuestionCircleOutlined />}
            >
                <Statistic
                    precision={2}
                    value={priceTotal} />
                <div className="card-static">
                    <Statistic
                        title="周同比"
                        value={11.28}
                        style={{ margin: "0 20px", }}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                    <Statistic
                        title="日环比"
                        value={9.3}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />

                </div>
                <div className="card-hr">
                    <hr />
                    <span className="text">日均销售额:￥<Statistic
                        valueStyle={{ fontSize: "0.875rem" }}
                        value={priceToday} /></span>
                </div>
            </Card>
        </div>
    )
}

export default GridFirst
