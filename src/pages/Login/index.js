import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '../../assets/logo.png'
import { fetchLogin } from '../../store/mudules/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
    const dispatch = useDispatch()


    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values)
        // 触发异步action fetchLogin
        await dispatch(fetchLogin(values))
        //登录跳转
        navigate('/')
        // 提示
        message.success('登录成功')
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form
                    // 收集表单
                    onFinish={onFinish}
                    // 指定校验触发时机
                    validateTrigger={['onBlur']}>
                    <Form.Item
                        name="mobile"
                        rules={[
                            { required: true, message: '请输入手机号' },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号码格式不对'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            { required: true, message: '请输入验证码' },
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码" type="string" maxLength={6} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>

                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}


export default Login