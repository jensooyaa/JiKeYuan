import { createSlice } from '@reduxjs/toolkit'
import { request, getToken, setToken as setTokens } from '../../utils'

const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: getToken() || ''
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            //实现持久化
            setTokens(state.token)
        }
    }
})

// 解构出actionCreater
const { setToken } = userStore.actions
// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations', loginForm)
        dispatch(setToken(res.data.token))
    }
}
export { fetchLogin }


export default userReducer