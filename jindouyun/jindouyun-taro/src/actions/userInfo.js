import request from '../utils/request';
import Taro from '@tarojs/taro'

import {
    LOGIN,
    LOGOUT,
    ORDERLIST,
    FETCH_ADDRESS,
    SEND_ADDRESS_INDEX,
    SAVE_ADDRESS,
    DELETE_ADDRESS,
    SEND_ADD_FLAG,
    SUBMIT_ADVICE,
    SEND_CURRENT,
    FETCH_ORDER_DETAIL,
    SEARCH_ORDER,
    CHECKED_ADDRESS,
    FETCH_CODE,
    SUBMIT_CODE,
    FETCH_ADDRESS_DETAIL,
    SEND_ADDRESS_ID

} from '../constants/actionTypes';

//登录
export const login = args => {
    return async dispatch => {
        const res = await request('post', 'wx/auth/login_by_weixin', args);
        if(res.errno === 0) {
            Taro.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              })
              dispatch({
                  type: LOGIN,
                  payload: res.data
              })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//退出登录
export const logout = () => {
    return async dispatch => {
        const res = await request('post', 'wx/auth/logout');
        if(res.errno === 0) {
              dispatch({
                  type: LOGOUT
              })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//我的订单
export const fetchOrderList = (args) => {
    return async dispatch => {
        const res = await request('post', 'wx/order/list', args);
        if(res.errno === 0) {
            dispatch({
                type: ORDERLIST,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}
//订单详情
export const fetchOrderDetail = args => {
    console.log(args)
    return async dispatch => {
        const res = await request('get', `wx/order/detail?orderId=${args}`);
        if(res.errno === 0) {
            dispatch({
                type: FETCH_ORDER_DETAIL,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}
export const sendCurrent = args => {
    return dispatch => {
        dispatch({
            type: SEND_CURRENT,
            payload: args
        })
    }
}
//搜索订单
export const searchOrder = args => {
    return async dispatch => {
        const res = await request('get', `wx/order/find?keyword=${args}`)
        if(res.errno === 0) {
            dispatch({
                type: SEARCH_ORDER,
                payload: res.data
            })
        }
    }
}
//获取地址列表
export const fetchAddress = () => {
    return async dispatch => {
        const res = await request('get', 'wx/address/list');
        if(res.errno === 0) {
            dispatch({
                type: FETCH_ADDRESS,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//发送地址索引
// export const sendAddressIndex = args => {
//     return dispatch => {
//         dispatch({
//             type: SEND_ADDRESS_INDEX,
//             index: args
//         })
//     }
// }
//传送地址id
export const sendAddressId = args => {
    return dispatch => {
        dispatch({
            type: SEND_ADDRESS_ID,
            payload: args
        })
    }
}
//获取地址详情
export const fetchAddressDetail = args => {
    return async dispatch => {
        const res = await request('get', `wx/address/detail?id=${args}`);
        if(res.errno === 0) {
            dispatch({
                type: FETCH_ADDRESS_DETAIL,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}
//保存地址
export const saveAddress = args => {
    return async dispatch => {
        const res = await request('post', 'wx/address/save', args);
        if(res.errno === 0) {
            Taro.showToast({title: '保存成功'});
            dispatch({
                type: SAVE_ADDRESS,
            })
            Taro.navigateBack()
        } else {
            // Taro.showToast({title: res.errmsg})
        }    
    }
}
//保存新地址
export const sendAddFlag = args => {
    return dispatch => {
        dispatch({
            type: SEND_ADD_FLAG,
            payload: args
        })
    }
}
//删除地址
export const deleteAddress = args => {
    return async dispatch => {
        const res = await request('post', 'wx/address/delete', args);
        if(res.errno === 0) {
            Taro.showToast({title: '删除地址成功'})
            dispatch({
                type: DELETE_ADDRESS,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}
//设置选中地址
export const checkedAddress = args => {
    return dispatch => {
        dispatch({
            type: CHECKED_ADDRESS,
            payload: args
        })
        Taro.navigateBack();
    }
}

//服务 建议反馈
export const submitAdvice = args => {
    return async dispatch => {
        const res = await request('post', 'wx/feedback/submit', args);
        if(res.errno === 0) {
            Taro.navigateBack();
            Taro.showToast({title: '反馈成功'})
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//邀请码
export const fetchCode = () => {
    return async dispatch => {
        const res = await request('get', 'wx/invite/show', );
        if(res.errno === 0) {
            dispatch({
                type: FETCH_CODE,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}
//提交邀请码
export const submitCode = args => {
    return async dispatch => {
        const res = await request('post', 'wx/invite/submit', args);
        console.log(res);
        if(res.errno === 0) {
            Taro.showToast({title: res.errmsg})
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//快递
export const submitExpress = args => {
    return async dispatch => {
        const res = await request('post', 'wx/express/submit', args)
        console.log(res)
    }
}