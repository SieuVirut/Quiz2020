import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Button, Alert } from 'antd'
import axios from 'axios'
import '../../../sass/Quiz.scss'

if (document.getElementById('detailquiz')) {
    ReactDOM.render(<DetailQuiz />, document.getElementById('detailquiz'))
}

window.quest = []
window.timeLeft = 0
function DetailQuiz() {
    const [data, setData] = useState()
    const [status, setStatus] = useState('todo')
    const [time, setTime] = useState()
    let id = new URLSearchParams(window.location.search)
        .get('id')
    useEffect(() => {
        axios.get(`/getQuizById/${id}`)
            .then(res => {
                setData(res.data[0])
                setTimeDefault(res.data[0].time)
                window.quest = res.data[0].quest
                    .map(q => {
                        let a = q.answer.map(e => {
                            return { ...e, isAns: false }
                        })
                        return { ...q, answer: a }
                    })
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if (status == 'doing') {
            window.timeLeft = Date.now() + data.time * 1000
            setInterval(countDown, 1000)
        }
        return () => {
            clearInterval(countDown)
        }
    }, [status])

    function countDown() {
        let timeCountDown = window.timeLeft - Date.now()
        let hours = Math.floor((timeCountDown / (1000 * 60 * 60)) % 24)
        let minutes = Math.floor((timeCountDown / 1000 / 60) % 60)
        let seconds = Math.floor((timeCountDown / 1000) % 60)
        let t = `${hours}h : ${minutes}m : ${seconds} s`
        if (timeCountDown >= 0) {
            setTime(t)
        } else {
            setStatus('done')
        }
    }
    function setTimeDefault(t0) {
        let hours = Math.floor((t0 / (60 * 60)) % 24)
        let minutes = Math.floor((t0 / 60) % 60)
        let seconds = Math.floor((t0) % 60)
        let t = `${hours}h : ${minutes}m : ${seconds} s`
        setTime(t)
    }

    function Exam() {
        let quest = data && data.quest
        if (!quest) return
        return (
            <div className='list-question'>
                {quest.map((q, i) => QuesionItem(q, i))}
            </div>
        )
    }

    function QuesionItem(quest, index) {
        let id = quest.id
        return <div className='question-item'>
            <span className='quest-index'> Câu hỏi {index}: </span>
            <div className='quest'> {quest.question}</div>
            <div className='answer'>
                {quest.answer && quest.answer.map(ans => {
                    return Option(quest.id, ans)
                })}
            </div>
        </div>
    }

    function Option(idQuest, ans) {
        let idAns = ans && ans.id
        if (!idAns) return
        return <div className={`option`} onClick={() => onChangeAns(idQuest, idAns)}> <input type='checkbox' /> {ans.option} </div>
    }

    function onChangeAns(idQuest, idAns) {
        let quest = window.quest
        window.quest = quest.map(q => {
            if (q.id !== idQuest) return { ...q }
            let a = q.answer.map(e => {
                if (e.id == idAns) return { ...e, isAns: !e.isAns }
                return { ...e }
            })
            return { ...q, answer: a }
        })
    }

    function Congration() {
        let score = getPoint()
        let point = Math.round(score.point / score.total * 100)
        let mes = <div>
            <h4> Bạn đã làm đúng {score.point} câu trên tổng số  {score.total} câu </h4>
            <h4>Điểm số của bạn là  {point}/100 điểm!</h4>
            <h4>Xin chúc mừng!</h4>
        </div>
        return <Alert
            message={mes}
            type="success"
        />
    }

    function getPoint() {
        let quest = data && data.quest
        if (!quest) return 0
        let point = 0
        let total = quest.length
        let userAns = window.quest
        quest.forEach(q => {
            let u = userAns.find(i => i.id == q.id)
            let count = 0
            q.answer.forEach(o => {
                let ua = u.answer.find(i => i.id == o.id) || []
                if (ua.isAns == (o && o.isAns || false)) count++
            })
            if (count == q.answer.length) point++
        })
        return { point, total }
    }

    return <Layout>
        <div className='quiz-detail'>
            <div className='quiz-detail-header'>
                <div className='quiz-name'>{data && data.name}</div>
                <div className='quiz-description'>{data && data.description}</div>
                <div className={'time-count'}>Thời gian làm bài:{time}</div>
            </div>
            <div className='quiz-content'>
                {status == 'todo' && <Button onClick={() => setStatus('doing')}> Bắt đầu</Button>}
                {status == 'doing' && Exam()}
                {status == 'doing' && <Button onClick={() => setStatus('done')}> Nộp bài</Button>}
                {status == 'done' && <span> {Congration()} </span>}
            </div>
        </div>
    </Layout>
}

export default DetailQuiz
