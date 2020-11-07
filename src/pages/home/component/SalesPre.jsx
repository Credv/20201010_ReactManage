import React from 'react'
import {pie} from '@ant-design/charts'
import { Card } from 'antd'
function SalesPre() {
    const data = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            // @ts-ignore 偏移 50% TODO 后续支持直接配置 -50%
            offset: '-0.5',
            content: '{percentage}',
            style: {
                fill: '#fff',
                fontSize: 14,
                textAlign: 'center',
            },
        },
        statistic: {
            title: false,
            content: {
                formatter: () => 'AntV\nG2Plot',
            },
        },
    }
    return (
        <div>
            <Card>
                <Pie {...data} ></Pie>
            </Card>
        </div>
    )
}

export default SalesPre
