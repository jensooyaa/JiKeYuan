import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Layout from '../pages/Layout'
import AuthRoute from '../components/AuthRoute'
import Home from '../pages/Home'
import Article from '../pages/Article'
import Publish from '../pages/Publish'
const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                path: "Home",
                element: <Home />
            },
            {
                path: "Article",
                element: <Article />
            },
            {
                path: "Publish",
                element: <Publish />
            }
        ]
    },
    {
        path: "/Login",
        element: <Login />
    },
])
export default router