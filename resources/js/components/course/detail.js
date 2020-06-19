import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Button } from 'antd'
import axios from 'axios'
import '../../../sass/Course.scss'

if (document.getElementById('detailcourse')) {
    ReactDOM.render(<DetailCourse />, document.getElementById('detailcourse'))
}

function getIdVideoYoutube(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

function getEmbedLinkYoutube(url) {
    return `//www.youtube.com/embed/`.concat(getIdVideoYoutube(url))
}

function DetailCourse() {
    const [data, setData] = useState()
    const [lesson, setLesson] = useState()
    let id = new URLSearchParams(window.location.search)
        .get('id')

    useEffect(() => {
        axios.get(`/getCourseById/${id}`)
            .then(res => { setData(res.data[0]) })
            .catch(e => console.log(e))
    }, [])
    const LessonItem = (e) => {
        let isWatching = lesson == e ? 'is-watching' : ''
        return <div className={`lesson-item ${isWatching}`} onClick={() => setLesson(e)}>
            <span>{e && e.name}</span>
        </div>
    }

    return <Layout>
        <div className='course-detail'>
            <div className='course-header'> {data && data.name} </div>
            <div className='watch-lesson'>
                <iframe width="560" height="315" src={lesson && getEmbedLinkYoutube(lesson.link)} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className='course-content'>
                <div className='course-content-letf'>
                    {data && data.lesson && data.lesson.map(e => LessonItem(e))}
                </div>
                <div className='course-course-right'>
                    {lesson && lesson.quiz && <Button> Kiểm tra </Button>}
                    <span>{lesson && lesson.description || data && data.description}</span>
                </div>
            </div>
        </div>
    </Layout>
}

export default DetailCourse
