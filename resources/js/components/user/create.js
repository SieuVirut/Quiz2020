import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Button, Input, Select, Alert } from 'antd'
import axios from 'axios'
import { UserOutlined, MailOutlined, EllipsisOutlined } from '@ant-design/icons'
import '../../../sass/User.scss'

const { Option } = Select
if (document.getElementById('createuser')) {
    ReactDOM.render(<CreateUser />, document.getElementById('createuser'))
}

function CreateUser() {
    return <Layout>
        <Register />
    </Layout>
}

function Register() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [level, setLevel] = useState()
    const [password, setPassword] = useState()
    const [status, setStatus] = useState('todo')
    const handleActionRegister = () => {
        axios.post('/user', {
            'name': name,
            'email': email,
            'level': level,
            'password': password,
        })
            .then(res => {
                console.log('res', res)
                setStatus('done')
            })
            .catch(e => {
                setStatus('fail')
            })
    }
    const sucess = <Alert
        message="Thành công"
        description="Hãy truy cập vào trang chủ để trải nghiệm dịch vụ!"
        type="success"
        showIcon
    />
    const error = <Alert
        message="Thất bại"
        description="Hãy kiểm tra để khắc phục những sai sót!"
        type="error"
        showIcon
    />
    return (
        <div className='register-form add-user'>
            {status == 'done' ? sucess : null}
            {status == 'fail' ? error : null}
            <span style={{ fontSize: '30px', textAlign: 'center', margin: '30px' }}> Thêm tài khoản </span>
            <Input value={name} onChange={e => setName(e.target.value)} prefix={<UserOutlined />} />
            <Input value={email} onChange={e => setEmail(e.target.value)} prefix={<MailOutlined />} />
            <Input value={password} onChange={e => setPassword(e.target.value)} prefix={<EllipsisOutlined />} type='password' />
            <Select defaultValue="admin" onChange={value => setLevel(value)}>
                <Option value="admin">Admin</Option>
                <Option value="teacher">Teacher</Option>
                <Option value="student"> Student </Option>
            </Select>
            <Button onClick={handleActionRegister}> Register </Button>
        </div>
    )
}

export default CreateUser