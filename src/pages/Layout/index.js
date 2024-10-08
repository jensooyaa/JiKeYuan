import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from '../../store/mudules/user'
import { clearUserInfo } from '../../store/mudules/user'

const { Header, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/home',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const selectedKey = location.pathname
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [])
    const name = useSelector(state => state.user.userInfo.mobile)
    // console.log(name)
    const menuClick = (route) => {//点击导航进行路由跳转
        console.log(route)
        navigate(route.key)

    }
    // 退出登录
    const loginOut = () => {
        dispatch(clearUserInfo())
        navigate('/login')
    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{name}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={loginOut}>
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={selectedKey}
                        items={items}
                        onClick={menuClick}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    {/* 二级出口 */}
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout