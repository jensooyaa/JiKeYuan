import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Layout from '../pages/Layout'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />
    },
    {
        path: "/Login",
        element: <Login />
    },
])
export default router