import React from 'react'
import { Card, DatePicker, Space, Table, Tabs, Row, Col } from 'antd'
import moment from 'moment';
import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/echart/'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
import { useEffect } from 'react';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
function CardSales() {
    useEffect(() => {
        const myChart = echarts.init(document.querySelector('.sales-line'))
        myChart.setOption({
            color: ['#2f89cf'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '4%',
                top: '10px',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    //修改刻度标签相关样式
                    axisLabel: {
                        color: "rgba(0,0,0,0.6)",
                        fontSize: "12"
                    },
                    //不显示X轴线的样式
                    axisLine: {
                        // show: false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    //y轴文字标签样式
                    show: true,
                    axisLabel: {
                        color: "rgba(0,0,0.6)",
                        fontSize: "12"
                    },
                    //y轴线条样式
                    axisLine: {
                        lineStyle: {
                            color: "rgba(0,0,0,.1)",
                            width: 2
                        }

                    },
                    //y轴分割线颜色
                    splitLine: {
                        lineStyle: {
                            color: "rgba(0,0,0,.1)"
                        }
                    }
                }
            ],
            series: [
                {
                    name: '销售额',
                    type: 'bar',
                    //柱子宽度
                    barWidth: '35%',
                    data: [200, 300, 500, 900, 200, 300, 600, 200, 300, 500, 900, 200],
                    itemStyle: {
                        //修改柱子圆角
                        barBorderRadius: 1
                    }
                }
            ]
        })
        window.addEventListener('resize', () => {
            myChart.resize()
        })
    }, [])

    const dateFormat = 'YYYY/MM/DD';
    let callback = (key) => {
        console.log("你点击了第" + key + "页");
    }

    const dataSource = [
        {
            key: '1',
            name: '厦门湖里殿前店',
            val: 1,
            sales: '99999',
            address:"厦门湖里殿前区"
        },
        {
            key: '2',
            name: '厦门思明店',
            val: 2,
            sales: '33333',
            address:"厦门市思明区"
        },
        {
            key: '3',
            name: '漳州芗城区文昌路店',
            val: 3,
            sales: '22222',
            address: "漳州芗城区文昌路"
        },
        {
            key: '4',
            name: '漳州龙文区彩霞店',
            val: 4,
            sales: '1111',
            address: "漳州龙文区彩霞路"
        },
    ];

    const columns = [
        {
            title: '排名',
            dataIndex: 'val',
            key: 'val',
        },
        {
            title: '门店',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '门店地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '销售额',
            dataIndex: 'sales',
            key: 'sales',
        },
    ];
    return (
        <div className="CardSales">
            <Card title={
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="销售额" key="1">
                    </TabPane>
                    <TabPane tab="访问量" key="2">
                    </TabPane>
                </Tabs>
            }
                extra={
                    <Space direction="vertical" size={12}>
                        <RangePicker
                            defaultValue={[moment('2020/10/10', dateFormat), moment('2020/10/11', dateFormat)]}
                            format={dateFormat}
                        />
                    </Space>
                }
                style={{ height: "100%" }}
            >

                <Row>
                    <Col span={16} >
                        <div className="sales-line"></div>
                    </Col>
                    <Col span={8} pull={1} >
                        <Table
                            // title={}
                            pagination={false}
                            dataSource={dataSource}
                            columns={columns}
                        ></Table>
                    </Col>
                </Row>


            </Card>
        </div>
    )
}

export default CardSales
