import React, { useEffect } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import { Card, Statistic } from 'antd'
function GridThird() {
    useEffect(() => {
        const myChart = echarts.init(document.querySelector('.pay-bar'))
        myChart.setOption({
            color: ['#2f89cf'],
            tooltip: {
                trigger: 'axis',

            },
            xAxis: [
                {
                    show:false,
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    //修改刻度标签相关样式
                    axisLabel: {
                       
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "12"
                    },
                    //不显示X轴线的样式
                    axisLine: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    show:false,
                    type: 'value',
                    //y轴文字标签样式
                    axisLabel: {
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "12"
                    },
                    //y轴线条样式
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                            width: 2
                        }
    
                    },
                    //y轴分割线颜色
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)"
                        }
                    }
                }
            ],
            series: [
                {
                    name: '支付笔数',
                    type: 'bar',
                    //柱子宽度
                    barWidth: '60%',
                    data: [30, 20, 60, 80, 70, 40, 20],
                    itemStyle: {
                        //修改柱子圆角
                        barBorderRadius: 5
                    }
                }
            ]}
            )
            window.addEventListener('resize', () => {
                myChart.resize()
            })
    }, [])
    return (
        <div>
            <Card
                title="支付笔数"
                bordered={false}
                extra={<QuestionCircleOutlined />}
            >
                <Statistic value={8092} />
                <div className="pay-bar"></div>
                <div className="views-hr">
                    <hr />
                    <span className="text">转化率:
                            <Statistic
                            valueStyle={{ fontSize: "0.875rem" }}
                            value={60} 
                            />%
                            
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default GridThird
