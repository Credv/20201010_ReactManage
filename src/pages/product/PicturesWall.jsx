import React, { useState, useEffect } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDelImg } from '../../api/index'
/**
 * 用于图片上传组件
 * @param {*} file 
 */
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default function PicturesWall(props) {
    // console.log(props);
    const [previewVisible, setPreviewVisible] = useState(false); //标识是否显示大图预览
    const [previewImage, setPreviewImage] = useState(''); //大图的url
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]); //展示图片
    useEffect(()=>{
       console.log(props);
       //无状态组件
    },[])
   
    const handleCancel = () => setPreviewVisible(false); //关闭预览

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
        setPreviewVisible(true)

    };

    const handleChange = async ({ file, fileList }) => {
        console.log(`http://localhost:5000/upload/${props.defaultFileList[0]}`);
        //在操作(上传/下载)过程中更新fileList
        props.getImgUrl(file)
        if (file.status === 'done') {
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
    return (
        <>
            <Upload
                action="/manage/img/upload" //上传图片的接口
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
        </>
    );

}