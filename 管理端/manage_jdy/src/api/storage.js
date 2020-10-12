import request from '@/utils/request'

export function listStorage(query) {
  return request({
    url: '/admin/storage/list',
    method: 'get',
    params: query
  })
}

export function createStorage(data) {
  return request({
    url: '/admin/storage/create',
    method: 'post',
    data
  })
}

export function readStorage(data) {
  return request({
    url: '/admin/storage/read',
    method: 'get',
    data
  })
}

export function updateStorage(data) {
  return request({
    url: '/admin/storage/update',
    method: 'post',
    data
  })
}

export function deleteStorage(data) {
  return request({
    url: '/admin/storage/delete',
    method: 'post',
    data
  })
}

//const uploadPath = process.env.VUE_APP_BASE_API + '/storage/create'
const uploadPath = 'http://49.235.20.228:8080' + '/admin/storage/create'
export { uploadPath }
