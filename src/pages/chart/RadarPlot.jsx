import React, { Component } from 'react'
import { Radar } from '@ant-design/charts'

import { reqProducts } from '../../api/index'
import { Card } from 'antd';

class RadarPlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ss: [],
            loading: true
        };
    }
    componentDidMount() {
        reqProducts(1, 5)
            .then(res => {
                console.log(res.data.data.list);
                this.setState(state => ({
                    ss: res.data.data.list,
                    loading:false
                }))
            })
    }


    render() {
        const { ss, loading } = this.state
        const data = ss
        const radarPlot = {

            data,
            xField: 'name',
            yField: 'price',
            meta: {
                score: {
                    alias: '分数',
                },
            },
            xAxis: {
                line: null,
                tickLine: null,
                grid: {
                    line: {
                        style: {
                            lineDash: null,
                        },
                    },
                },
            },
            point: {},
        }
        return (
            <div style={{ width: "100%", height: "600px" }}>
                <Card title="商品价格图" >
                    <div style={{ width: "600px", height: "600px", margin: "0 auto" }}>
                        <Radar {...radarPlot} loading={loading}></Radar>
                    </div>
                </Card>

            </div>
        )
    }

}

export default RadarPlot
