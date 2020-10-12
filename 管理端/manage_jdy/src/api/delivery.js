import request from '@/utils/request';
import Qs from 'qs';

export function getDeliveryList(query) {
    return request({
        url: '/admin/delivery/list',
        method: 'get',
        params: query,
        paramsSerializer: function(params) {
            return Qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
}
export function getDeliveryDetail (id) {
    return request({
        url: '/admin/delivery/info',
        method: 'get',
        params: {id}
    })
}

export function forceOrder (data) {
    return request({
        url: '/admin/delivery/force',
        method: 'post',
        data
    })
}

export function checkAllStaff () {
    return request({
        url: '/admin/delivery/allStaffName',
        method: 'get',
    })
}



