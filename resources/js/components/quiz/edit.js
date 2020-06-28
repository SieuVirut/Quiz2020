import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Button, Input, Form, Space, Select, Alert, InputNumber, Checkbox } from 'antd'
import axios from 'axios'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import '../../../sass/Quiz.scss'
import { parseJSON } from 'jquery'
import { v4 as uuidv4 } from 'uuid';
const { TextArea } = Input
const { Option } = Select
if (document.getElementById('editquiz')) {
    ReactDOM.render(<EditQuiz />, document.getElementById('editquiz'))
}

function EditQuiz() {
    return <Layout>
        {FormEditQuiz()}
    </Layout>
}

function FormEditQuiz() {

    const [status, setStatus] = useState('todo')
    const [data, setData] = useState()

    let id = useMemo(() => new URLSearchParams(window.location.search)
        .get('id')
    )

    useEffect(() => {
        axios.get(`/getQuizById/${id}`)
            .then(res => {
                setData(res.data[0])
            })
            .catch(e => console.log(e))
    }, [])

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
        let fixValue = { ...data, ...values }
        axios.put(`/quiz/${id}`, fixValue)
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
                    name={[ans.name, 'id']}
                    fieldKey={[ans.fieldKey, 'id']}
                    className='id'
                    initialValue={uuidv4()}
                >
                    <Input type='hidden' />
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
                <Form.Item
                    {...quest}
                    name={[quest.name, 'id']}
                    fieldKey={[quest.fieldKey, 'id']}
                    className='id'
                    initialValue={uuidv4()}
                >
                    <Input type='hidden' />
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
            <span className='header' > Sửa đề thi </span>
            {status == 'done' ? sucess : null}
            {status == 'fail' ? error : null}
            <br />
            <div className='content'>
                {data && <Form name="quiz"
                    onFinish={handleCreateQuiz}
                    {...formItemLayout}
                    initialValues={{
                        name: data.name,
                        description: data.description,
                        time: data.time,
                        quest: data.quest,
                        // lesson: data.lesson
                    }}
                >
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
                            <span> Sửa đề thi</span>
                        </Button>
                    </Form.Item>
                </Form>
                }
            </div>
        </div>
    )
}

export default EditQuiz
