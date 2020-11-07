import React from 'react'
import echarts from 'echarts/lib/echarts'
import { Card, Statistic } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
// import 'echarts/lib/component'
import { useEffect } from 'react'
import { useState } from 'react'
function Views() {
    const [access,setAccess] = useState(308)
    useEffect(() => {
        const myChart = echarts.init(document.querySelector(".views-line"))
        myChart.setOption({
            tooltip: {
                trigger: 'axis',

            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: 12
                        }
                    },
                    // x轴线的颜色为   rgba(255,255,255,.2)
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.2)"
                        }
                    },
                    data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"],
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    //y轴分割线颜色
                    axisTick: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: 12
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)"
                        }
                    }
                }
            ],
            series: [
                {
                    name: '访问量',
                    type: 'line',
                    //修改线条可以直接在开头定义color颜色或者需要更多需求
                    //就直接修改lineStyle
                    lineStyle: {
                        color: "#0184d5",
                        width: 2
                    },
                    //填充颜色区域 渐变颜色
                    areaStyle: {
                        // 渐变色，只需要复制即可
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(1, 132, 213, 0.9)"   // 渐变色的起始颜色
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
                                }
                            ],
                            false
                        ),
                        //影子颜色
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    },
                    symbol: "circle",
                    symbolSize: 5,
                    // 开始不显示拐点， 鼠标经过显示
                    showSymbol: false,
                    //拐点样式
                    itemStyle: {
                        color: "#0184d5",
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    },
                    smooth: true,
                    data: [0, 10, 32, 33, 34, 40, 20, 60, 55, 30, 20, 10, 2, 20, 33, 15, 10, 33, 20, 60, 30, 40, 30, 40, 30, 40, 20, 30, 22, 0],
                },

            ]
        }
        )
        window.addEventListener('resize', () => {
            myChart.resize()
        })
    }, [])

    return (
        <Card
            title="访问量"
            bordered={false}
            extra={<QuestionCircleOutlined />}
        >
            <Statistic value="8848" />
            <div className="views-line" />
            <div className="views-hr">
                <hr />
                <span className="text">日均销售额: 
            <Statistic
                        valueStyle={{ fontSize: "0.875rem" }}
                        value={access} />
                </span>
            </div>

        </Card>

    )
}

export default Views
