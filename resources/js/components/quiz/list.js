import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Card, Avatar, Button } from 'antd'
import axios from 'axios'
// import { UserOutlined, MailOutlined, EllipsisOutlined } from '@ant-design/icons'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import '../../../sass/Quiz.scss'
import { parseJSON } from 'jquery'

const { Meta } = Card

if (document.getElementById('listquiz')) {
    ReactDOM.render(<QuizList />, document.getElementById('listquiz'))
}

function QuizList() {
    const [quiz, setQuiz] = useState()
    let id = parseJSON(localStorage.getItem('userInfo')).id
    useEffect(() => {
        axios.get('/quiz')
            .then(res => {
                setQuiz(res && res.data)
            })
            .catch(e => console.log(e))
    }, [])
    let content = quiz && quiz.map(e => CardQuizItem(e))
    return <Layout>
        <div className='quiz-list'>
            {content}
        </div>
    </Layout>
}

function CardQuizItem(item) {
    let fakeUrl = 'https://chs.coronadousd.net/static/media/uploads/Coronado%20High%20School/.thumbnails/test%20100%25-300x0.png'
    return (
        <Card
            style={{ width: 200 }}
            className='card-quiz-item'
            cover={
                <img
                    alt="exams"
                    src={fakeUrl}
                />
            }
            actions={[<a href={`/detailquiz?id=${item.id}`}>
                <Button>Vào thi</Button>
            </a>]}
        >
            <Meta
                title={item.name}
                description={item.description}
            />
        </Card>
    )
}

export default QuizList
