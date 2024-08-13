import { getToken } from "../../utils"
import { Navigate } from "react-router-dom"

const AuthRoute = ({ children }) => {
    const token = getToken()
    if (token) {//有token 返回传入的组件
        return <>{children}</>
    }
    else {//没有token 返回登录页
        return <Navigate to="/login" replace />
    }
}
export default AuthRoute