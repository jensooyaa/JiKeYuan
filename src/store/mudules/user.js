import { createSlice } from '@reduxjs/toolkit'
import { request, getToken, setToken as setTokens } from '../../utils'
import { clearToken } from '../../utils'
import { loginAPI, getProfileAPI } from '../../apis/user'
const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            //实现持久化
            setTokens(state.token)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {//清除信息
            state.token = ''
            state.userInfo = {}
            clearToken()
        }
    }
})

// 解构出actionCreater
const { setToken, setUserInfo, clearUserInfo } = userStore.actions
// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm)
        dispatch(setToken(res.data.token))
    }
}
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data))
    }
}
export { fetchLogin, fetchUserInfo, clearUserInfo }


export default userReducer