import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '../../assets/error.png'

import { useState, useEffect } from 'react'
import { getChannelAPI } from '../../apis/article'
import { getArticleListAPI } from '../../apis/article'
import { request } from '../../utils'
import { useNavigate } from 'react-router-dom'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const navigate = useNavigate()
    // 准备列数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => data === 1 ? <Tag color="warning">待审核</Tag> : <Tag color="green">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary"
                            shape="circle"
                            icon={<EditOutlined
                                onClick={() => navigate(`/publish?id=${data.id}`)} />} />
                        <Popconfirm
                            title="删除文章"
                            description="确认要删除当前文章吗?"
                            onConfirm={() => delArticle(data)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    // 准备表格body数据
    const data = [
        {
            id: '8218',
            comment_count: 0,
            cover: {
                images: [],
            },
            like_count: 0,
            pubdate: '2019-03-11 09:00:00',
            read_count: 2,
            status: 2,
            title: 'wkwebview离线化加载h5资源解决方案'
        }
    ]

    //频道列表
    const [channels, setChannels] = useState([])
    // 调用接口

    useEffect(() => {
        async function fetchChannels(reqData) {
            const res = await getChannelAPI(reqData)
            setChannels(res.data.channels)
        }
        fetchChannels()

    }, [])
    // 文章列表数据管理
    const [article, setArticle] = useState([])
    const [count, setCount] = useState(0)


    // 1. 准备参数
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    })
    //获取文章列表

    useEffect(() => {
        async function fetchArticle() {
            const res = await getArticleListAPI(reqData)

            setArticle(res.data.results)
            setCount(res.data.total_count)
        }
        fetchArticle()
    }, [reqData])


    const onFinish = async (formValue) => {
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            status: formValue.status,
            begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date[1].format('YYYY-MM-DD')
        })
    }
    // 分页
    const onPageChange = (page) => {
        // 修改参数依赖项 引发数据的重新获取列表渲染
        setReqData({
            ...reqData,
            page
        })
    }

    //删除文章
    const delArticle = async (data) => {

        console.log(data);
        await request.delete(`/mp/articles/${data.id}`)
        // window.location.reload()
        // 更新列表
        setReqData({
            ...reqData
        })


    }
    return (
        <div>
            {/* 筛选区域 */}
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={onFinish}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                            {channels.map(item =>
                                <Option key={item.id} value={item.name}>{item.name}
                                </Option>)}

                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* 表格区域 */}
            <div>
                {/*        */}
                <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                    <Table rowKey="id" columns={columns} dataSource={article} pagination={{
                        total: count,
                        pageSize: reqData.per_page,
                        onChange: onPageChange
                    }} />
                </Card>
            </div>
        </div>
    )
}

export default Article