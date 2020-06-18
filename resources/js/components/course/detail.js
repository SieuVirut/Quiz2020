import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Button, Input, Form, Space, Select, Alert } from 'antd'
import axios from 'axios'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'


import '../../../sass/Course.scss'

if (document.getElementById('detailcourse')) {
    ReactDOM.render(<DetailCourse />, document.getElementById('detailcourse'))
}

function DetailCourse() {
    return <Layout>
        <div> Detail Course </div>
    </Layout>   
}

export default DetailCourse
