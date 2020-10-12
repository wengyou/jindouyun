import request from '@/utils/request'
import Qs from 'qs'

export function listMergeOrder(query) {
    return request({
        url: '/admin/order/listMergeOrder',
        method: 'get',
        params: query,
        paramsSerializer: function(params) {
            return Qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
}

export function mergeOrder(data) {
    return request({
        url: '/admin/order/merge',
        method: 'post',
        data
    })
}

export function detailOrder(orderSplitId) {
    return request({
        url: '/admin/order/detailSplitOrder',
        method: 'get',
        params: { orderSplitId }
    })
}

export function deleteOrder(data) {
    return request({
        url: '/admin/order/delete',
        method: 'post',
        data
    })
}

export function releaseOrder(data) {
    return request({
        url: '/admin/order/release',
        method: 'post',
        data
    })
}

export function refundOrder(data) {
    return request({
        url: '/admin/order/refund',
        method: 'post',
        data
    })
}

export function replyComment(data) {
    return request({
        url: '/admin/order/reply',
        method: 'post',
        data
    })
}

export function listChannel() {
    return request({
        url: '/admin/order/channel',
        method: 'get'
    })
}
