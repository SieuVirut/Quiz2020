import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Button, Input, Form, Space, Select, Alert, InputNumber, Checkbox } from 'antd'
import axios from 'axios'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import '../../../sass/Quiz.scss'
import { parseJSON } from 'jquery'
const { TextArea } = Input
const { Option } = Select
if (document.getElementById('addquiz')) {
    ReactDOM.render(<AddQuiz />, document.getElementById('addquiz'))
}

function AddQuiz() {
    return <Layout>
        {FormCreateQuiz()}
    </Layout>
}

function FormCreateQuiz() {

    const [status, setStatus] = useState('todo')
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    }

    const handleCreateQuiz = values => {
        let fixValue = { ...values }
        let id = parseJSON(localStorage.getItem('userInfo')).id
        fixValue.owner = id
        axios.post('/quiz', fixValue)
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
    const answerItem = (ans, remove) => {
        return (
            <Space key={ans.key} className='answer-item'>
                <Form.Item
                    {...ans}
                    name={[ans.name, 'option']}
                    fieldKey={[ans.fieldKey, 'option']}
                // rules={[{ required: true, message: 'Nội dung câu hỏi' }]}
                >
                    <TextArea
                        placeholder="Mô tả của đề thi"
                        autoSize={{ minRows: 1, maxRows: 6 }}
                    />
                </Form.Item>
                <Form.Item
                    {...ans}
                    name={[ans.name, 'isAns']}
                    fieldKey={[ans.fieldKey, 'isAns']}
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(ans.name)} />
            </Space>
        )
    }
    const questItem = (quest, removeQuest) => {
        return (
            <Space key={quest.key} className='quest-item'>
                <Form.Item
                    {...quest}
                    name={[quest.name, 'question']}
                    fieldKey={[quest.fieldKey, 'question']}
                    // rules={[{ required: true, message: 'Nội dung câu hỏi' }]}
                    label={'Câu hỏi'}
                    className='question'
                >
                    <TextArea
                        placeholder="Mô tả của đề thi"
                        autoSize={{ minRows: 1, maxRows: 6 }}
                    />
                </Form.Item>
                <Form.List
                    {...quest}
                    name={[quest.name, 'answer']}
                    fieldKey={[quest.fieldKey, 'answer']}
                >
                    {(fields, { add, remove }) => {
                        return (
                            <div className='list-answer'>
                                {fields.map(ans => answerItem(ans, remove))}
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                >
                                    <PlusOutlined />
                                    <span> Thêm câu trả lời</span>
                                </Button>
                            </div>
                        )
                    }}
                </Form.List>
                <MinusCircleOutlined onClick={() => removeQuest(quest.name)} />
            </Space>
        )
    }

    return (
        <div className='form-create-quiz'>
            <span className='header' > Tạo đề thi </span>
            {status == 'done' ? sucess : null}
            {status == 'fail' ? error : null}
            <br />
            <div className='content'>
                <Form name="quiz" onFinish={handleCreateQuiz} {...formItemLayout} autoComplete="off">
                    <Form.Item
                        label={'Chủ đề thi'}
                        name='name'
                    // rules={[{ required: true, message: 'Thêm mô tả của đề thi' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={'Mô tả'}
                        name='description'
                        rules={[{ required: false, message: 'Thêm mô tả của đề thi' }]}
                    >
                        <TextArea
                            placeholder="Mô tả của đề thi"
                            autoSize={{ minRows: 1, maxRows: 6 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Thời gian làm bài'}
                        name='time'
                        rules={[{ required: false, message: 'Thêm mô tả của đề thi' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.List name="quest">
                        {(fields, { add, remove }) => {
                            return (
                                <div className='list-quest'>
                                    {fields.map(quest => questItem(quest, remove))}
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                    >
                                        <PlusOutlined />
                                        <span> Thêm câu hỏi</span>
                                    </Button>
                                </div>
                            )
                        }}
                    </Form.List>
                    <Form.Item className='btn-add-quiz'>
                        <Button type="primary" htmlType="submit">
                            <span> Tạo đề thi</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AddQuiz
