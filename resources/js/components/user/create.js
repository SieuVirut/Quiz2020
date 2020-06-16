import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from '../Layout'
import { Table, Popconfirm, message } from 'antd'
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

function ListActions(text, record) {
    function deleteUser(text, record) {
        let id = text.id
        axios.delete(`/user/${id}`)
            .then(res => {
                message.success('Xoá thành công !');
            })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <EditOutlined style={{ color: 'gray', margin: '0 5px' }} />
            <Popconfirm
                title={`Bạn có muốn xoá người người dùng ${text.name} ?`}
                onConfirm={deleteUser(text, record)}
                onCancel={cancel}
                okText="Có"
                cancelText="Không"
            >
                <DeleteOutlined style={{ color: 'gray', margin: '0 5px' }} />
            </Popconfirm>
        </div>
    )
}

function TableListUser() {
    const [data, setData] = useState()
    
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