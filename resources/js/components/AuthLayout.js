import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Layout, Menu, Button, Avatar, Input, Select, Alert } from 'antd'
import { UserOutlined, MailOutlined, EllipsisOutlined } from '@ant-design/icons'
import axios from 'axios'
import '../../sass/AuthLayout.scss'

const { Header, Sider, Content, Footer } = Layout;

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const handleActionLogin = () => {
        axios.post('/login', {
            'email': email,
            'password': password,
        })
            .then(res => {
                if (res && res.status == 200 && res.data.length > 0) {
                    let userInfo = JSON.stringify(res.data[0])
                    localStorage.setItem('userInfo', userInfo)
                    history.push('/')
                }
            })
            .catch(e => console.log(e))

    }
    return (
        <div className='login-form'>
            <Input value={email} onChange={e => setEmail(e.target.value)} prefix={<MailOutlined />} />
            <Input value={password} onChange={e => setPassword(e.target.value)} prefix={<EllipsisOutlined />} />
            <a href={'/'}><Button onClick={handleActionLogin}> Login </Button> </a>
        </div>
    )
}

function AboutProject() {
    return (
        <div className='about-project'> About Project </div>
    )
}

function Register() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [level, setLevel] = useState()
    const [password, setPassword] = useState()
    const [status, setStatus] = useState('todo')
    const handleActionRegister = () => {
        console.log(level)
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
                // setStatus('fail')
            })
    }
    if (status == 'todo') {
        return (
            <div className='register-form'>
                <span style={{ fontSize: '30px', textAlign: 'center', margin: '30px' }}> Đăng kí tài khoản </span>
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
    if (status == 'done') {
        return (
            <div className='register-form'>
                <span style={{ fontSize: '30px', textAlign: 'center', margin: '30px' }}> Đăng kí tài khoản </span>
                <Alert
                    message="Thành công"
                    description="Hãy truy cập vào trang chủ để trải nghiệm dịch vụ!"
                    type="success"
                    showIcon
                />
            </div>
        )
    }
    if (status == 'fail') {
        <div className='register-form'>
            <span style={{ fontSize: '30px', textAlign: 'center', margin: '30px' }}> Đăng kí tài khoản </span>
            <Input value={name} onChange={e => setName(e.target.value)} prefix={<UserOutlined />} />
            <Input value={email} onChange={e => setEmail(e.target.value)} prefix={<MailOutlined />} />
            <Input value={password} onChange={e => setPassword(e.target.value)} prefix={<EllipsisOutlined />} type='password' />
            <Select defaultValue="admin" onChange={value => setLevel(value)}>
                <Option value="admin">Admin</Option>
                <Option value="teacher">Teacher</Option>
                <Option value="student"> Student </Option>
            </Select>
            <Alert
                message="Thất bại"
                description="Hãy kiểm tra để khắc phục những sai sót!"
                type="error"
                showIcon
            />
            <Button onClick={handleActionRegister}> Register </Button>
        </div>
    }
}

function AuthLayout() {
    return (
        <Layout className='auth-layout'>
            <Layout className="site-layout">
                <Header>
                    <Login />
                </Header>
                <Content>
                    <AboutProject />
                    <Register />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AuthLayout