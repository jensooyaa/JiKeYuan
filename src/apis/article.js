// 用户相关的所有请求
import { request } from "../utils"
// 1. 获取频道

export function getChannelAPI(formData) {
    return request({
        url: '/channels',
        method: 'GET',
    })
}
export function createArticleAPI(data) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data

    })
}


