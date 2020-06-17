import React, { useState } from 'react'
import { Layout, Menu, Avatar } from 'antd'
import { useHistory } from "react-router-dom"

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    TeamOutlined,
    UserOutlined,
    UserAddOutlined,
    VideoCameraOutlined,
    VideoCameraAddOutlined,
    SolutionOutlined,
    FileProtectOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import '../../sass/BasicLayout.scss'
import { parseJSON } from 'jquery';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Sider, Content, Footer } = Layout;

function UserInfo() {
    const userInfo = parseJSON(localStorage.getItem('userInfo'))
    const history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        history.push('/login')
    }
    return (
        <div className='user-info-header'>
            <Avatar> U </Avatar>
            <div className='user-infos'>
                <span style={{ textAlign: 'start', fontSize: '13px', color: 'green' }} > Hi, <span >{userInfo.level}</span></span>
                <span style={{ textAlign: 'end', textTransform: 'uppercase' }}>{userInfo && userInfo.name}</span>
            </div>
            <a style={{ fontSize: '12px' }} onClick={handleLogout} href={'/'}>Log out</a>
        </div>
    )
}

function BasicLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false)
    let IconToggle = () => React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
    })
    return (
        <Layout className='basic-layout'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <SubMenu icon={<VideoCameraOutlined />} title='Quản lí khoá học' >
                        <Menu.Item key="1" onClick={() => window.location.replace('/course')} icon={<VideoCameraOutlined />} > Danh sách khoá học </Menu.Item>
                        <Menu.Item key="2" onClick={() => window.location.replace('/course/create')} icon={<VideoCameraAddOutlined />} > Tạo khoá học </Menu.Item>
                        <Menu.Item key="3" onClick={() => window.location.replace('/course/detail')} icon={<VideoCameraOutlined />}> Chi tiết khoá học </Menu.Item>
                    </SubMenu>
                    <SubMenu icon={<TeamOutlined />} title='Quản lí người dùng' >
                        <Menu.Item key="4" onClick={() => window.location.replace('/users')} icon={<TeamOutlined />} > Danh sách người dùng </Menu.Item>
                        <Menu.Item key="5" onClick={() => window.location.replace('/adduser')} icon={<UserAddOutlined />} > Thêm người dùng </Menu.Item>
                        <Menu.Item key="6" onClick={() => window.location.replace('/detailuser')} icon={<UserOutlined />}> Chi tiết người dùng </Menu.Item>
                    </SubMenu>
                    <SubMenu icon={<SolutionOutlined />} title='Kiểm tra' >
                        <Menu.Item key="4" onClick={() => window.location.replace('/quiz/list')} icon={<SolutionOutlined />} > Thư viện đề </Menu.Item>
                        <Menu.Item key="5" onClick={() => window.location.replace('/quiz/create')} icon={<FileProtectOutlined />} > Tạo mới đề </Menu.Item>
                        <Menu.Item key="6" onClick={() => window.location.replace('/quiz/detail')} icon={<UploadOutlined />}> Thi thử </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header>
                    <IconToggle />
                    <UserInfo />
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default BasicLayout