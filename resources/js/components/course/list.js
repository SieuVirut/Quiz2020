import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Card, Avatar, Button } from 'antd'
// import axios from 'axios'
// import { UserOutlined, MailOutlined, EllipsisOutlined } from '@ant-design/icons'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import '../../../sass/Course.scss'
import Axios from 'axios'
import { parseJSON } from 'jquery'

const { Meta } = Card

if (document.getElementById('courselist')) {
    ReactDOM.render(<CourseList />, document.getElementById('courselist'))
}

function CourseList() {
    return <Layout>
        <CardCourse />
    </Layout>
}

function CardCourseItem(id, name, description, actions) {
    return (
        <Card
            style={{ width: 200 }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={actions}
        >
            <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={name}
                description={description}
            />
        </Card>
    )
}


function MyCourse() {
    const [data, setData] = useState()
    let id = parseJSON(localStorage.getItem('userInfo')).id
    useEffect(() => {
        axios.get(`/getCourseByOwner/${id}`)
            .then(res => {
                let data = res && res.data
                setData(data)
            })
            .catch(e => console.log(e))
    }, [])
    let content = data && data.map(item => {
        let actions = [
            <a href={`/detailcourse?id=${item.id}`}>
                <Button>Vào học</Button>
            </a>
        ]
        return CardCourseItem(item.id, item.name, item.description, actions)
    })
    return (
        <div className='my-course'> {content}  </div>
    )
}

function MarketCourse() {
    const [data, setData] = useState()
    useEffect(() => {
        axios.get('/course')
            .then(res => {
                console.log(res, res.data)
                let data = res && res.data
                setData(data)
            })
            .catch(e => console.log(e))
    }, [])
    let actions = [
        <Button>Xem</Button>,
        <Button>Đăng ký</Button>
    ]
    let content = data && data.map(item => CardCourseItem(item.id, item.name, item.description, actions))
    return (
        <div className='market-course'> {content}  </div>
    )
}

function CardCourse() {
    const [key, setKey] = useState('myCourse')
    const tabList = [
        {
            key: 'myCourse',
            tab: 'Khoá học của tôi',
        },
        {
            key: 'marketCourse',
            tab: 'Thư viện khoá học',
        },
    ]

    const contentList = {
        myCourse: <MyCourse />,
        marketCourse: <MarketCourse />,
    }

    return (
        <Card
            style={{ width: '100%' }}
            title="Danh sách khoá học"
            extra={<a href="/addcourse"><Button>Thêm khoá học</Button></a>}
            tabList={tabList}
            activeTabKey={key}
            onTabChange={key => setKey(key)}
        >
            {contentList[key]}
        </Card>
    )
}

export default CourseList
