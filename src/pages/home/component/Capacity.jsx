import React from 'react'
import { Gauge } from '@ant-design/charts'  //引入水波图
import { Card } from 'antd'
function Capacity() {
    const option = {
        percent: 0.75,
        range: {
            color: ['l(0) 0:#5d7cef 1:#e35767'],
        },
        height:400
    }
    return (
        <div>
            <Card title="仓库容量" style={{height:"100%"}}>
                <div className="Liquid">
                    <Gauge {...option} />
                </div>

            </Card>

        </div>
    )
}

export default Capacity
