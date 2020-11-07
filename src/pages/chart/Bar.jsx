import React, { useEffect } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
function Bar() {
    useEffect(() => {
        const myCharts = echarts.init(document.querySelector("#main-bar"))
        var xAxisData = [];
        var data1 = [];
        var data2 = [];
        for (var i = 0; i < 100; i++) {
            xAxisData.push('类目' + i);
            data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 6);
            data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 6);
        }
        myCharts.setOption({

            title: {
                text: '基础销量'
            },
            legend: {
                data: ['bar', 'bar2']
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
            },
            series: [{
                name: 'bar',
                type: 'bar',
                data: data1,
                animationDelay: function (idx) {
                    return idx * 10;
                }
            }, {
                name: 'bar2',
                type: 'bar',
                data: data2,
                animationDelay: function (idx) {
                    return idx * 10 + 100;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        })
        window.addEventListener('resize',()=>{
            myCharts.resize()
        })
    }, [])
    return (
        <div id="main-bar" style={{ width: "80%", height: "600px", margin:"0 auto" }}>

        </div>
    )
}

export default Bar
