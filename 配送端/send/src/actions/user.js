import * as constants from '../constants/counter'
import request from '../utils/request';
import Taro from '@tarojs/taro'


//登录
export const login = args => {
    return async dispatch => {
        const res = await request('post', 'delivery/auth/login_by_weixin', args);
        if(res.errno === 0) {
            Taro.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              })
              dispatch({
                  type: constants.LOGIN,
                  payload: res.data
              })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    } 
}

//退出
export const logout = () => {
    return async dispatch => {
        const res = await request('post', 'delivery/auth/logout');
        if(res.errno === 0) {
            Taro.showToast({title: '退出成功'})
            dispatch({
                type: constants.LOGOUT
            })
        } else {
            Taro.showToast({title: '退出失败'})
        }
    }
}

//申请注册骑手
export const applyRider = () => {
    return async dispatch => {
        const res = await request('post', 'delivery/auth/register');
        if(res.errno === 0) {
            Taro.showToast({title: res.errmsg})
            dispatch({
                type: constants.APPLY_RIDER,
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}
//获取骑手信息
export const fetchRiderInfo = () => {
    return async dispatch => {
        const res = await request('get', 'delivery/auth/info');

    }
}
//获取骑手工作信息
export const fetchWorkInfo = () => {
    return async dispatch => {
        const res = await request('get', 'delivery/data/work_data');
    }
}
//修改骑手工作状态
export const modifyStatus = args => {
    return async dispatch => {
        const res = await request('post', 'delivery/auth/modify_today_status', args);
    }
}

//修改骑手工作方式
export const modifyWorkType = args => {
    return async dispatch => {
        const res = await request('post', 'delivery/auth/modify_work_type', args);
    }
}

//修改骑手信息
export const modifyInfo = args => {
    return async dispatch => {
        const res = await request('post', 'delivery/auth/modify_info', args);
        if(res.errno === 0) {
            dispatch({
                type: constants.MODIFY_INFO,
                payload: res.data
            })
            Taro.showToast({title: '修改成功'})
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//获取骑手工作信息
export const fetchWorkData = args => { 
    return async dispatch => {
        const res = await request('get', `delivery/data/work_data?date=${args} 00:00:00`)
        console.log(res)
        if(res.errno === 0) {
            dispatch({
                type: constants.FETCH_WORK_DATA,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}