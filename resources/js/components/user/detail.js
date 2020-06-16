import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Table } from 'antd'
import axios from 'axios'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

if (document.getElementById('listuser')) {
    ReactDOM.render(<ListUserPage />, document.getElementById('listuser'))
}

function ListUserPage() {
    return <Layout>
        <TableListUser />
    </Layout>
}



function TableListUser() {
    const [data, setData] = useState()
    
    const [status, setStatus] = useState()
    const ListActions = (text, record) => {
        function deleteUser(text, record) {
            let id = text.id
            axios.delete(`/user/${id}`)
                .then(res => { setStatus('done') })
        }
        return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <EditOutlined style={{ color: 'gray', margin: '0 5px' }} />
            <DeleteOutlined onClick={() => deleteUser(text, record)} style={{ color: 'gray', margin: '0 5px' }} />
        </div>
    }

    useEffect(() => {
        axios.get('/user')
            .then(res => {
                setData(res.data)
            })
    }, [status])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Vị trí',
            dataIndex: 'level',
            filters: [
                { text: 'Admin', value: 'admin' },
                { text: 'Teacher', value: 'teacher' },
                { text: 'Student', value: 'student' },
            ],
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            align: 'center',
            render: (text, record) => ListActions(text, record)
        },
    ]

    return (
        <Table
            columns={columns}
            dataSource={data}
        />
    )
}

export default ListUserPage