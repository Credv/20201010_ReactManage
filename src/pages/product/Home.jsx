import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Table, Input, Select, Button, Popconfirm, message } from 'antd'
import { reqProducts, reqDelProducts, reqSearchProductsName, reqSearchProductsDesc, reqUpdateState } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constant'
import { PullRequestOutlined } from '@ant-design/icons'
const Option = Select.Option
/**
 * 产品主页面
 * 
 * 分页列表
 *     1).纯前台分页
 *         请求获取数据：一次性获取所有数据 翻页不需要再发请求
 *         请求接口：
 *             不需要指定请求参数：页码pageNum和每页数量pageSize
 *     2).基于后台分页
 *         请求获取数据：每次只获取当前页的数据
 *         请求接口
 *             需要指定请求参数：页码pageNum和每页数量pageSize
 *             响应数据：当前页数据的数组+总记录数total
 *     3).选择！
 *         数据少用前台分页
 *         数据多用后台分页
 */
function Home(props) {

    const history = useHistory();
    const [productData, setProductData] = useState([]) // 商品的数组
    const [currentNum, setCurrentNum] = useState(1)
    const [total, setTotal] = useState(0)   //商品总数
    const [loading, setLoading] = useState(false)    //加载
    const [searchName, setSearchName] = useState('') //搜索input的值
    const [searchType, setSearchType] = useState('0') //搜索模式



    useEffect(() => {
        //初始化数据
        //此处判断是否有携带参数 如果携带参数表示修改页面回来 所以加载数据指定页码
        if (props.location.params) {
            setCurrentNum(props.location.params.pageNum)
            loadData(props.location.params.pageNum)
        } else {
            //此处调用api接口获取商品数据 页码(pageNum)每页数量(pageSize)
            loadData(1)
        }


    }, [])

    /**
     * 加载数据方法
     * pageNum->当前页码
     */
    const loadData = async (pageNum) => {
        //如若是搜索 调用搜索方法 否则调用正常获取数据方法
        if (searchName) {
            setLoading(true) //显示loading
            searchProduct(pageNum, searchName, searchType)
            setLoading(false) //隐藏loading
        } else {
            setLoading(true) //显示loading
            const result = await reqProducts(pageNum, PAGE_SIZE)
            setLoading(false) //隐藏loading
            if (result.data.status === 0) {
                console.log(result);
                const { total, list } = result.data.data  //结构获取后台传来的商品列表与商品总数(分页需要)
                setProductData(list)
                setTotal(total)
            }
        }
    }
    /**
     * 搜索商品数据方法
     * pageNum->页码
     * searchName->搜索数据根据
     * searchType->取别根据什么搜索
     */
    const searchProduct = async (pageNum, searchName, searchType) => {
        if (searchType === '0') {
            const result = await reqSearchProductsName(pageNum, PAGE_SIZE, searchName)
            if (result.data.status === 0) {
                //按名称搜索成功
                const { list, total } = result.data.data
                setProductData(list)
                setTotal(total)
            }

        } else if (searchType === '1') {
            const result1 = await reqSearchProductsDesc(pageNum, PAGE_SIZE, searchName)
            if (result1.data.status === 0) {
                //按描述搜索成功
                const { list, total } = result1.data.data
                setProductData(list)
                setTotal(total)
            }
        }
    }
    /**
     * 表格列配置
     */

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            width: '10%'
        },
        {
            title: '商品图片',
            dataIndex: 'imgs',
            width: '20%',
            render: (txt, record, index) => {
                return (
                    <img style={{ width: '200px' }} src={`/upload/${record.imgs}`} alt="" />
                )
            }
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            width: '25%'
        },
        {
            title: "价格",
            dataIndex: 'price',
            width: '5%',
            render: (price) => { return '￥' + price }
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: '8%',
            render: (status) => {
                return status === 1 ? "在售" : "已下架"
            }
        },
        {
            title: '操作',
            width: '27%',
            render: (txt, record, index) => {
                return (
                    <div>
                        <Button type="primary" style={{ margin: "0 8px" }} onClick={() => history.push({
                            //修改按钮跳转到修改页面并且携带参数 参数为当前对象的id与当前页面的页码 方便回来时呈现当前页
                            pathname: `/products:/product/edit/${record._id}`, params: { pageNum: currentNum }
                        })}>修改</Button>
                        <Button style={{ margin: "0 8px" }} onClick={() => {
                            reqUpdateState(record._id, record.status === 1 ? 2 : 1)
                                .then(res => {
                                    message.success("修改商品状态成功！")
                                    loadData(currentNum)
                                })
                                .catch(err => {
                                    message.error("修改商品状态失败！")
                                })
                        }}>{record.status === 1 ? "下架" : "上架"}</Button>
                        <Popconfirm
                            title="确认删除此项？"
                            onCancel={() => console.log('取消' + record)}
                            onConfirm={() => {
                                //此处调用API删除接口
                                console.log(record._id);
                                reqDelProducts(record._id)
                                    .then(res => {
                                        //删除成功后更新数据
                                        message.success('删除成功')
                                        loadData(currentNum)
                                    })
                                    .catch(err => message.error(err))
                            }}>
                            <Button type="danger" style={{ margin: "0 8px" }}>删除</Button>
                        </Popconfirm>
                        <Button type="primary" style={{ margin: "0 8px" }} onClick={() => history.push('/products:/product/detail')}>详情</Button>
                    </div>
                )
            }
        }


    ]
    //Card的title 左边操作区
    const title = (
        <div style={{ width: '200px' }}>
          
            <Select defaultValue='0' style={{ width: '120px' }} onChange={(p) => setSearchType(p)}>
                <Option value='0'>按名称搜索</Option>
                <Option value='1'>按描述搜索</Option>
            </Select>
            <Input placeholder='关键字' style={{ margin: '0 10px' }} onChange={(event) => setSearchName(event.target.value)}></Input>
            <Button type="primary" onClick={() => {
                //此处调用获取数据方法
                loadData(currentNum)
            }}>搜索</Button>

        </div>
    )
    //Card的extra 右边操作区
    const extra = (
        <Button type='primary' onClick={() => history.push({
            pathname: '/products:/product/edit',
            params: { pageNum: currentNum }
        })}>+ 添加商品</Button>
    )
    return (
        <Card title={title} extra={extra}>
            <Table

                columns={columns}
                dataSource={productData}
                rowKey="_id"
                loading={loading}
                pagination={{
                    total: total,
                    current: currentNum,
                    defaultPageSize: PAGE_SIZE,
                    onChange: (pageNum) => {
                        setCurrentNum(pageNum)
                        loadData(pageNum)
                    }
                }}
                bordered>

            </Table>
        </Card>
    )
}

export default Home
