import React, { useState, useEffect } from 'react'
import { Button, Card, Table, Modal, Form, Input, Select, Tag } from 'antd'
import {
    TwitterOutlined,

    FacebookOutlined,

} from '@ant-design/icons';
import { reqCategorys, reqAddCategorys, reqUpdataCategorys, reqDelCategorys } from '../../api/index'
import './index.less'
const { Option, OptGroup } = Select;
//from 格式
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};

/**
 * 商品分类组件
 */
function Category() {

    const [categorys, setCategorys] = useState([]) //数据获取存放
    const [visible, setVisible] = useState(false) //添加对话框默认值
    const [modifyVisible, setModifyVisible] = useState(false) //修改显示对话框默认值
    const [modifyId, setModifyId] = useState('') //修改Id
    const [parentId, setParentId] = useState('0') //父分类id
    const [parentName, setParentName] = useState('') //父分类名称
    const [level, setLevel] = useState(0)//添加分类级别 实则也是存放parentId
    const [loading, setLoading] = useState(false) //表格加载

    const [form] = Form.useForm()  //获取当前页面的form

    useEffect(() => {
        //调用api获取数据
        loadData('0')
    }, [])

    //加载数据 根据useState的prandId去决定获取哪个级别的分类
    const loadData = (parentId) => {
        setLoading(true)
        reqCategorys(parentId)
            .then(res => {
                setLoading(false)
                setCategorys(res.data.data)
                console.log(res.data.data)
            })
    }


    //添加按钮显示modal对话框 对话框的确认事件
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
            //调用添加分类的接口
            if (level === 0) {
                reqAddCategorys('0', values.name)
                    .then(res => {
                        setVisible(false)
                        loadData()
                    })
                    .catch(err => console.log(err))
            } else {
                reqAddCategorys(level, values.name)
                    .then(res => {
                        // console.log(level)
                        setVisible(false)
                        loadData(parentId)
                    })
                    .catch(err => console.log(err))
            }


        } catch (errorInfo) {
            // console.log('Failed:', errorInfo);
        }
    };
    //修改分类对话框
    const modifyHandleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
            //调用修改分类的接口
            // console.log(modifyId)
            // console.log(values.modifyName)
            reqUpdataCategorys(modifyId, values.modifyName)
                .then(res => {
                    setModifyVisible(false)
                    loadData('0')
                    console.log(res)
                })
                .catch(err => console.log(err))

        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }
    //添加按钮
    const columns = [
        {
            title: '分类类名',
            dataIndex: 'name'

        },
        {
            title: '标签',
            render: (txt, record, index) => {
                return (
                    <div>
                        <Tag icon={<TwitterOutlined />} color="#55acee">
                            Twitter
                        </Tag>
                        <Tag icon={<FacebookOutlined />} color="#3b5999">
                            Facebook
                        </Tag>
                    </div>
                )
            }
        },
        {
            title: '操作',
            render: (txt, record, index) => {

                return (
                    <div style={{ textAlign: "center" }}>
                        <Button type="primary" onClick={() => {
                            //显示修改对话框
                            setModifyVisible(true)
                            //修改useState的修改分类id
                            setModifyId(record._id)
                            //调用form的setFieldsValue方法修改表单默认值 不再相信init
                            form.setFieldsValue({
                                modifyName: record.name
                            })
                        }}>修改分类</Button>
                        {parentId === '0' ? (
                            <Button style={{ margin: "0 15px" }} onClick={() => {
                                //修改当前访问prandid
                                // setPrandId('1')
                                //将这条数据的title赋予ParentName
                                console.log(record)
                                setParentName(record.name)
                                setParentId(record._id)
                                setLevel(record._id)

                                loadData(record._id)




                            }}>查看子分类</Button>) : (
                                <Button style={{ margin: "0 15px" }} onClick={() => {
                                    setParentId('0')
                                    setParentName('')
                                    setLevel('0')
                                    loadData('0')
                                }}>返回父分类</Button>
                            )}
                        <Button
                            type="danger"
                            onClick={() => {
                                reqDelCategorys(record.name, record._id)
                                    .then(res => {
                                        //删除成功后刷新数据
                                        loadData(level)
                                    })
                            }}>删除分类</Button>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="category">

            <Card
                title={parentName ? `一级分类 ->  ${parentName}` : '一级分类'}
                extra={
                    <div className="Card-extra">

                        <Button type="primary" onClick={() => setVisible(true)}
                        >+ 添加</Button>
                    </div>

                } >
                <Table
                    rowKey="_id"
                    loading={loading}
                    tableLayout='fixed'
                    dataSource={categorys}
                    columns={columns}
                    bordered
                ></Table>
            </Card>
            {/* 添加对话框 */}
            <Modal
                title="添加类名"
                visible={visible}
                destroyOnClose={() => { return true }}
                onOk={handleOk}
                onCancel={() => setVisible(false)}
                style={{ textAlign: "center" }}

            >
                <Form
                    {...layout}
                    name="basic"
                    form={form}

                >
                    <Form.Item label="级别">
                        <Select defaultValue={parentId ? parentName : '0'} style={{ textAlign: "center" }} onChange={(p) => setLevel(p)}>
                            <OptGroup label="分类">
                                <Option value="0">一级分类</Option>
                                {categorys.map(item => {
                                    return (
                                        <Option value={item._id}>{item.name}</Option>
                                    )
                                })}
                            </OptGroup>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="类名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入添加类名',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="修改类名"
                visible={modifyVisible}
                destroyOnClose={() => { return true }}
                onOk={modifyHandleOk}
                onCancel={() => setModifyVisible(false)}
                style={{ textAlign: "center" }}
            >
                <Form
                    {...layout}
                    name="basic"
                    form={form}
                >
                    <Form.Item
                        label="类名"
                        name="modifyName"
                        rules={[
                            {
                                required: true,
                                message: '请输入修改类名',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default Category
