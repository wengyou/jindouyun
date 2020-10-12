import * as constants from '../constants/counter'
import request from '../utils/request';
import Taro from '@tarojs/taro'

//登录
export const login = args => {
    return async dispatch => {
        // console.log(args)
        const res = await request('post', 'merchant/auth/login_by_weixin', args);
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
        const res = await request('post', 'merchant/auth/logout');
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

//申请认证
export const applyBusiness = args => {
    return async dispatch => {
        const res = await request('post', 'merchant/auth/register', args);
        // console.log(res)
        if(res.errno === 0) {
            Taro.showToast({title: '申请成功'})
            const res_0 = await request('get', 'merchant/auth/info');
            console.log(res_0)
            if(res_0.errno === 0) {
                dispatch({
                    type: constants.FETCH_AUTH_INFO,
                    payload: res_0.data
                })
                Taro.navigateBack()
            } else {
                Taro.showToast({title: res_0.msg})
            }
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//获取今日数据
 export const fetchTodayData = () => {
     return async dispatch => {
         const res = await request('get', 'merchant/data/todayData');
         if(res.errno === 0) {
             dispatch({
                 type: constants.FETCH_TODAY_DATA,
                 payload: res.data
             })
         } else {
             Taro.showToast({title: res.msg})
         }
     }
 }
 //获取收入
 export const fetchIncome = args => {
     return async dispatch => {
         console.log('1')
         const res = await request('get', `merchant/data/incomeDetails?data=${args + '00:00:00'}`)
         if(res.errno === 0) {
             dispatch({
                 type: constants.FETCH_INCOME,
                 payload: res.data
             })
         }
     }
 }

 //修改营业状态
 export const updateStatus = args => {
     return async dispatch => {
         const res = await request('post', 'merchant/brand/updateStatus', args);
         if(res.errno === 0) {
             dispatch({
                 type: constants.UPDATE_STATUS,
                 payload: res.data
             })
         } else {
             Taro.showToast({title: res.errmsg})
         }
     }
 }

 //上传商品
 export const createGoods = args => {
     return async dispatch => {
         const res = await request('post', 'merchant/goods/create', args);
         if(res.errno === 0) {
            const res = await request('get', 'merchant/goods/list');
            if(res.errno === 0) {
                dispatch({
                    type: constants.FETCH_ALL_GOODS,
                    payload: res.data
                })
            } else {
                Taro.showToast({title: res.errmsg})
            }
            Taro.showToast({title: '上传商品成功'});
            Taro.navigateBack()
         } else {
             Taro.showToast({title: res.errmsg})
         }
     }
 }

 //传送商品信息
 export const sendGoodsInfo = args => {
     return dispatch => {
         dispatch({
             type: constants.SEND_GOODS_INFO,
             payload: args
         })
     }
 }
 //删除商品
 export const deleteGoods = args => {
     return async dispatch => {
         const res = await request('post', 'merchant/goods/delete', args);
         if(res.errno === 0) {
            Taro.showToast({title: '删除商品成功'})
            const res = await request('get', 'merchant/goods/list');
            if(res.errno === 0) {
                dispatch({
                    type: constants.FETCH_ALL_GOODS,
                    payload: res.data
                })
            } else {
                Taro.showToast({title: res.errmsg})
            }
        } else {
            Taro.showToast({title: res.errmsg})
        }
     }
 }

//  是否是新建商品
export const sendIsBuild = args => {
    return dispatch => {
        dispatch({
            type: constants.IS_BUILD,
            payload: args
        })
    }
}