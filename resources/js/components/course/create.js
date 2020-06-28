import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Button, Input, Form, Space, Select, Alert } from 'antd'
import axios from 'axios'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'


import '../../../sass/Course.scss'
import { parseJSON } from 'jquery'

const { TextArea } = Input
const { Option } = Select
if (document.getElementById('addcourse')) {
    ReactDOM.render(<AddCourse />, document.getElementById('addcourse'))
}

function AddCourse() {
    return <Layout>
        {FormCreateCourse()}
    </Layout>
}

function FormCreateCourse() {

    const [status, setStatus] = useState('todo')
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    }

    const handleCreateCourse = values => {
        console.log('Received values of form:', values)
        let fixValue = { ...values }
        let id = parseJSON(localStorage.getItem('userInfo')).id
        fixValue.owner = id
        axios.post('/course', fixValue)
            .then(res => setStatus('done'))
            .catch(e => setStatus('fail'))
    }

    const sucess = <Alert
        message="Thành công"
        description=""
        type="success"
        showIcon
    />
    const error = <Alert
        message="Thất bại"
        description="Hãy kiểm tra để khắc phục những sai sót!"
        type="error"
        showIcon
    />
    const lessonItem = (field, remove) => {
        return (
            <Space key={field.key} className='lession-item'>
                <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                    rules={[{ required: true, message: 'Thêm mô tả của bài học' }]}
                    label={'Tên bài học'}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    {...field}
                    name={[field.name, 'description']}
                    fieldKey={[field.fieldKey, 'description']}
                    rules={[{ required: false, message: 'Thêm mô tả của bài học' }]}
                    label={'Tên bài học'}
                >
                    <TextArea
                        placeholder="Mô tả của bài học"
                        autoSize={{ minRows: 1, maxRows: 4 }}
                    />
                </Form.Item>
                <Form.Item
                    {...field}
                    label={'Link video'}
                    name={[field.name, 'link']}
                    fieldKey={[field.fieldKey, 'link']}
                    rules={[{ required: true, message: 'Thêm link video bài học' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={'Đề kiểm tra'}
                    {...field}
                    name={[field.name, 'quiz']}
                    fieldKey={[field.fieldKey, 'quiz']}
                    rules={[{ required: false }]}
                >
                    <Select
                        // mode="multiple"
                        placeholder="Chọn đề kiểm tra"
                        filterOption={false}
                        style={{ width: '100px', maxWidth: '100px', minWidth: '100px' }}
                    >
                        {quiz && quiz.length > 0 && quiz.map(i => <Option key={i.id} value={i.id}>{i.name}</Option>)}
                    </Select>
                </Form.Item>
                <MinusCircleOutlined
                    onClick={() => {
                        remove(field.name)
                    }}
                />
            </Space>
        )
    }

    const [teachers, setTeachers] = useState()
    const [quiz, setQuiz] = useState()

    useEffect(() => {
        axios.get('/user')
            .then(res => {
                let user = res && res.data
                let teacher = user.filter(i => i.level == 'teacher')
                setTeachers(teacher)
                console.log(teacher)
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        axios.get('/quiz')
            .then(res => {
                let q = res && res.data
                if (!q.length) return
                setQuiz(q)
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <div className='form-create-course'>
            <span className='header' > Tạo khoá học </span>
            {status == 'done' ? sucess : null}
            {status == 'fail' ? error : null}
            <br />
            <div className='content'>
                <Form name="course" onFinish={handleCreateCourse} {...formItemLayout} autoComplete="off">
                    <Form.Item
                        label={'Tên khoá học'}
                        name='name'
                        rules={[{ required: true, message: 'Thêm mô tả của khoá học' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={'Giới thiệu khoá học'}
                        name='description'
                        rules={[{ required: false, message: 'Thêm mô tả của khoá học' }]}
                    >
                        <TextArea
                            placeholder="Mô tả của khoá học"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Form.Item>
                    <Form.List name="lesson">
                        {(fields, { add, remove }) => {
                            return (
                                <div className='list-lesson'>
                                    {fields.map(field => lessonItem(field, remove))}
                                    <Form.Item className='btn-add-lesson'>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                add()
                                            }}
                                            block
                                        >
                                            <PlusOutlined />
                                            <span> Thêm bài học</span>
                                        </Button>
                                    </Form.Item>
                                </div>
                            )
                        }}
                    </Form.List>
                    <Form.Item
                        label={'Giáo viên quản lí'}
                        name='teachers'
                        rules={[{ required: false, message: 'Thêm mô tả của khoá học' }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Chọn giáo viên"
                            filterOption={false}
                            style={{ width: '100%' }}
                        >
                            {teachers && teachers.length > 0 && teachers.map(i => <Option key={i.id} value={i.id}>{i.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item className='btn-add-course'>
                        <Button type="primary" htmlType="submit">
                            <span> Tạo khoá học</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AddCourse
