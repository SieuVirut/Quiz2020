import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Button, Input, Select, Alert } from 'antd'
import axios from 'axios'
import { UserOutlined, MailOutlined, EllipsisOutlined } from '@ant-design/icons'
import '../../../sass/User.scss'
import { parseJSON } from 'jquery'

const { Option } = Select
if (document.getElementById('detailuser')) {
    ReactDOM.render(<DetailUser />, document.getElementById('detailuser'))
}

function DetailUser() {
    return <Layout>
        <Register />
    </Layout>
}

function Register() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [level, setLevel] = useState('admin')
    const [password, setPassword] = useState()
    const [status, setStatus] = useState('todo')
    let id = parseJSON(localStorage.getItem('userInfo')).id
    useEffect(() => {
        axios.get(`/user/${id}`)
            .then(res => {
                let data = res.data[0]
                console.log(data)
                setEmail(data.email)
                setName(data.name)
                setLevel(data.level)
            })
            .catch(e => setStatus('fail'))
    }, [])
    const handleUpdateUser = () => {
        axios.put(`/user/${id}`, {
            'name': name,
            'email': email,
            'level': level,
            'password': password,
        })
            .then(res => {
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
        <div className='detail-user'>
            {status == 'done' ? sucess : null}
            {status == 'fail' ? error : null}
            <span style={{ fontSize: '30px', textAlign: 'center', margin: '30px' }}> Thông tin tài khoản </span>
            <Input value={name} onChange={e => setName(e.target.value)} prefix={<UserOutlined />} />
            <Input value={email} onChange={e => setEmail(e.target.value)} prefix={<MailOutlined />} />
            <Input value={password} onChange={e => setPassword(e.target.value)} prefix={<EllipsisOutlined />} type='password' />
            <Select value={level} onChange={value => setLevel(value)}>
                <Option value="admin">Admin</Option>
                <Option value="teacher">Teacher</Option>
                <Option value="student"> Student </Option>
            </Select>
            <Button onClick={handleUpdateUser}> Cập nhập </Button>
        </div>
    )
}

export default DetailUser