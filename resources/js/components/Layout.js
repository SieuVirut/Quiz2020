import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import BasicLayout from './BasicLayout'
import AuthLayout from './AuthLayout'

if (document.getElementById('myRoot')) {
    ReactDOM.render(<Layout />, document.getElementById('myRoot'))
}
function Layout({ children }) {
    let layout = <AuthLayout />
    let userInfo = localStorage.getItem('userInfo')
    if (userInfo) layout = <BasicLayout children={children} />
    return layout
}
export default Layout
