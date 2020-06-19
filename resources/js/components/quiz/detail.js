import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Button } from 'antd'
import axios from 'axios'
import '../../../sass/Quiz.scss'

if (document.getElementById('detailquiz')) {
    ReactDOM.render(<DetailQuiz />, document.getElementById('detailquiz'))
}

function DetailQuiz() {
    const [data, setData] = useState()
    const [status, setStatus] = useState('todo')
    const [time, setTime] = useState(0)
    let id = new URLSearchParams(window.location.search)
        .get('id')
    useEffect(() => {
        axios.get(`/getQuizById/${id}`)
            .then(res => {
                console.log(res)
                setData(res.data[0])
                setTime(res.data[0].time)
            })
            .catch(e => console.log(e))
    }, [])

    function Exam() {
        let quest = data && data.quest
        if (!quest) return
        return (
            <div className='list-question'>
                {quest.map((q, i) => QuesionItem(q, i))}
            </div>
        )
    }

    function QuesionItem(q, i) {
        return <div className='question-item'>
            <span className='quest-index'> Câu hỏi {i}: </span>
            <div className='quest'> {q.question}</div>
            <div className='answer'>
                {q.answer && q.answer.map(e => <div className='option'> {e.option}</div>)}
            </div>
        </div>
    }

    function Option(e) {
        const [choose, setChoose] = useState(false)
        return <div className={`option ${choose ? 'choosed' : ''}`} onClick={() => setChoose(!choose)}> {e.option} </div>
    }
    return <Layout>
        <div className='quiz-detail'>
            <div className='quiz-detail-header'>
                <div className='quiz-name'>{data && data.name}</div>
                <div className='quiz-description'>{data && data.description}</div>
                <div className={'time-count'}>Thời gian làm bài:{time}</div>
            </div>
            <div className='quiz-content'>
                {Exam()}
                {/* {status == 'todo' && <Button onClick={() => setStatus('doing')}> Bắt đầu</Button>}
                {status == 'doing' && Exam()}
                {status == 'doing' && <Button onClick={() => setStatus('done')}> Nộp bài</Button>}
                {status == 'done' && <div> done</div>} */}
            </div>
        </div>
    </Layout>
}

export default DetailQuiz
