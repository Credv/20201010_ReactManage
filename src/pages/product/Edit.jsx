import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Input, Cascader, message, Upload, Modal, Spin } from 'antd'
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { reqCategorys, reqFindOneProduct } from '../../api/index'
// import PicturesWall from './PicturesWall'
import { reqAddProducts, reqDelImg, reqUpdateProduct } from '../../api/index'
import { useHistory, useParams } from 'react-router-dom'

// const Option = Select.Option
const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
}
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

/**
 * 产品添加与修改页
 */
function Edit(props) {
    const params = useParams();
    const history = useHistory()
    const [form] = Form.useForm();
    const [options, setOptions] = useState([]) //一级选项
    const [imgUrl, setImgUrl] = useState('') //图片地址
    const [spinning, setSpinning] = useState(false)
    const [paramsId, setParamsId] = useState('');
    //3.改变state
    const [previewVisible, setPreviewVisible] = useState(false); //标识是否显示大图预览
    const [previewImage, setPreviewImage] = useState(''); //大图的url
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]); //展示图片
    //3.改变结束

    // const [defaultFileList,setDefaultFileList] = useState([])
    useEffect(() => {
        //如果params.id有值，就是修改进来的
        if (params.id) {
            //开始加载当前对象原来数据
            setSpinning(true)
            reqFindOneProduct(params.id)
                .then(res => {
                    console.log(res);
                    if (res.data.status === 0) {
                        const result = res.data.data
                        //此处埋下error 一般是用setProduct来得到获取的对象从而得到点击修改进来的记录的分类ID（一级） 从而去渲染二级分类ID
                        //但是useState是异步操作 导致渲染二级分类时获取不到一级分类id 取巧暂时把一级分类id赋予params.id（暂存！） 后续用到redux在进行修改
                        // console.log(result.imgs);
                        setImgUrl(result.imgs[0])
                        setParamsId(params.id)
                        params.id = result.pCategoryId
                        getCategorys('0') //获取分类级联列表
                        //修改页面 默认图片列表
                        setFileList([{
                            uid: '-1',
                            name: result.imgs[0],
                            status: 'done',
                            url: `/upload/${result.imgs[0]}`
                        }])
                        //修改表单初始值
                        form.setFieldsValue({
                            name: result.name,
                            price: result.price,
                            desc: result.desc,
                            category: [result.pCategoryId, result.categoryId]
                        })
                    }
                })
        } else {
            getCategorys('0')
        }

    }, [])

    //Card的title
    const title = (
       
        <div >
            <ArrowLeftOutlined onClick={() => history.push({ 
                 //返回应该返回之前的页码 所以过来的时候传递的页码在此处重新传递回去
                pathname: '/products:/product', 
                params: { pageNum: props.location.params.pageNum } 
                })} />
        </div>
    )
    //自定义表单验证规则
    const validatorPrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            //验证通过
            callback()
        } else {
            //验证失败
            callback('价格必须大于0')
        }
    }

    //异步获取一级/二级分类列表 并显示 
    //async 函数的返回值是一个新的promise对象，promise的结果和值由async的结果来决定
    const getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId) //{status:0,data:categorys}
        if (result.data.status === 0) {
            const categorys = result.data.data

            if (parentId === '0') {
                //如果是一级分类 则初始化第一级option(级联) 产生一级列表数据
                initOptions(categorys)
            } else {
                //如果是二级分类 
                return categorys //返回二级列表 ==> 当前async函数返回的promise就会成功且value为categorys
            }


        }
    }

    const initOptions = async (categorys) => {
        //根据categorys数组生成options数组（一级分类列表初始化）
        const options = categorys.map(item => ({
            //这里必须是map(c=>({})) 括号不能少才能返回一个数组
            value: item._id,
            label: item.name,
            isLeaf: false //不是叶子
        }))

        if (params.id) {
            const subCategorys = await getCategorys(params.id)
            const childOption = subCategorys.map(item => ({
                value: item._id,
                label: item.name,
                isLeaf: true
            }))
            const targetOption = options.find(option => option.value === params.id)
            targetOption.children = childOption
            setSpinning(false)
        }
        setOptions(options)

    }

    //用于加载下一级列表(级联二级列表)的回调函数
    const loadSubData = async (selectedOptions) => {
        //得到选择的option对象

        const targetOption = selectedOptions[0];

        //显示loading
        targetOption.loading = true;
        //根据选中的分类的value 也就是_id 请求获取二级分类列表
        const subCategorys = await getCategorys(targetOption.value)

        if (subCategorys && subCategorys.length > 0) {
            //生成一个二级列表的option
            targetOption.loading = false
            const childOption = subCategorys.map(item => ({
                value: item._id,
                label: item.name,
                isLeaf: true
            }))
            //把二级列表otpion数组赋值给当前选中option的children
            targetOption.children = childOption
        } else { //当前选中的分类没有二级分类
            targetOption.loading = false
            targetOption.isLeaf = true
        }
        setOptions([...options])

    };
    //获取子组件（图片）的值 暂时废弃 子组件搬迁到父组件
    // const getImgUrl = (file) => {
    //     // console.log(file);
    //     if (file.status === 'done') {
    //         setImgUrl(file.response.data.name)
    //     }
    // }
    //2.改变
    const handleCancel = () => setPreviewVisible(false); //关闭预览

    //图片放大显示
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
        setPreviewVisible(true)

    };
    //上传图片change事件
    const handleChange = async ({ file, fileList }) => {
        //在操作(上传/下载)过程中更新fileList
        // props.getImgUrl(file)

        if (file.status === 'done') {
            setImgUrl(file.response.data.name)
            const result = file.response
            if (result.status === 0) {
                message.success('上传成功！')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error('上传失败！')
            }
        } else if (file.status === 'removed') {
            //图片删除
            const result = await reqDelImg(file.name)
            if (result.data.status === 0) {
                message.success('删除图片成功')
            } else {
                message.error('删除图片失败')
            }
        }

        setFileList(fileList)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    //2.改变end

    //表单单击提交事件
    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
            const { name, desc, price, category } = values
            // console.log(values.category.length > 1);
            //调用api接口 判断是修改还是添加
            if (params.id) {
                console.log(paramsId);
                //修改
                const result = await reqUpdateProduct(paramsId, name, imgUrl, desc, price, values.category.length > 1 ? category[1] : category[0], values.category.length > 1 ? category[0] : '0')
                if (result.data.status === 0) {
                    message.success('修改成功')
                    //返回页面
                    history.push({ pathname: '/products:/product', params: { pageNum: props.location.params.pageNum } })
                }
            } else {
                reqAddProducts(name, imgUrl, desc, price, values.category.length > 1 ? category[1] : category[0], values.category.length > 1 ? category[0] : '0')
                    .then(res => {
                        console.log(res);
                        //添加成功返回商品页面
                        if (res.data.status === 0) {
                            history.push('/products:/product')
                            message.success('添加商品成功')
                        } else {
                            message.error(res.data.msg)
                        }

                    })
                    .catch(err => message.error('添加商品失败'))
            }

        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };
    return (

        <Card title={title}>
            <Spin spinning={spinning}>
                <Form form={form} name="dynamic_rule">
                    <Form.Item
                        {...formItemLayout}
                        name="name"
                        label="商品名称"
                        rules={[
                            {
                                required: true,
                                message: '商品名称不可为空！',
                            },
                        ]}
                    >
                        <Input placeholder="请输入商品名称" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="desc"
                        label="商品描述"
                        rules={[
                            {
                                required: true,
                                message: '商品描述不可为空！',
                            },
                        ]}

                    >
                        <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="price"
                        label="商品价格"
                        rules={[
                            {
                                required: true,
                                message: '商品价格不可为空！',

                            },
                            {
                                validator: validatorPrice
                            }
                        ]}

                    >
                        <Input prefix="￥" suffix="RMB" placeholder="请输入商品价格" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="category"
                        label="商品分类"
                        rules={[
                            {
                                required: true,
                                message: '商品分类不可为空！',
                            },
                        ]}

                    >
                        <Cascader
                            options={options} //需要显示的列表数据数组
                            loadData={loadSubData} //当选择某个列表项，加载下一级列表的监听回调


                        />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="商品图片"

                    >
                        {/* <PicturesWall getImgUrl={getImgUrl} defaultFileList={defaultFileList}></PicturesWall> */}
                        {/* 1.改变 */}
                        <Upload
                            action="api/manage/img/upload" //上传图片的接口
                            name='image' //请求参数名 不指定后台收不到数据 默认是file
                            accept='image/*' //只接收图片格式
                            listType="picture-card" //图片样式
                            fileList={fileList} //所有已上传图片文件对象的数组
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 4 ? null : uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                        >
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Form.Item>

                    <Form.Item {...formTailLayout}>
                        <Button type="primary" onClick={onCheck}>
                            Check
                    </Button>
                    </Form.Item>

                </Form>
            </Spin>
        </Card>

    )
}

export default Edit
