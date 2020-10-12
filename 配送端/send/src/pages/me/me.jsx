import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import {AtRadio } from 'taro-ui';
import './me.scss'
import * as user from '../../actions/user'

const Me = props => {
    const {
        login, 
        loginFlag, 
        deliveryInfo, 
        applyRider, 
        fetchRiderInfo, 
        isApply, 
        fetchWorkInfo, 
        modifyStatus,
        modifyWorkType,
        logout
    } = props; 
    const [status, setStatus] = useState();
    const [mode, setMode] = useState();
    useEffect(() => {
        loginFlag && fetchRiderInfo();
        loginFlag && fetchWorkInfo()
    }, [loginFlag])
    useEffect(() => {
        status !== '' && modifyStatus({'todayStatus': parseInt(status)})
    }, [status])
    useEffect(() => {
        mode !== '' && modifyWorkType({'workType': mode})
    }, [mode])
    useEffect(() => {
        setStatus(deliveryInfo.deliveryStaff && deliveryInfo.deliveryStaff.workStatus);
        setMode(deliveryInfo.deliveryStaff && deliveryInfo.deliveryStaff.workType)
    }, [deliveryInfo])
    return(
        <View className='me_container bgColor'>
            <View className='flexCol_wd'>
                <Image className='business_img' src={deliveryInfo && deliveryInfo.avatar} />
                <Text className='fontSize3 username'>{deliveryInfo && deliveryInfo.nickname || '游客'}</Text>
            </View>
            
            {/* 工作状态 */}
            <View className='white_box topRange'>
                <Text className='fontRange2 leftRange'>工作状态</Text>
                <AtRadio
                    options={[
                    { label: '在线', value: 1 },
                    { label: '离线', value: 0 },
                    ]}
                    value={status}
                    onClick={
                        value => {
                            loginFlag ? setStatus(value) : Taro.showToast({title: '你还未登录'})
                        }
                    }
                />
            </View>
            {/* 工作方式 */}
            <View className='white_box topRange'>
                <Text className='fontRange2 leftRange'>工作方式</Text>
                <AtRadio
                    options={[
                    { label: '骑行', value: 1 },
                    { label: '步行', value: 0 },
                    ]}
                    value={mode}
                    onClick={
                        value => {
                            loginFlag ? setMode(value) : Taro.showToast({title: '你还未登录'})
                        }
                    }
                />
            </View>
            {/* 认证状态 */}
            <View className='white_box flexRow_wd topRange'>
                <Text className='fontRange2 leftRange'>认证状态</Text>
                {
                    deliveryInfo.auth ? <Text className='fontColor1 fontSize2 rightRange'>已认证</Text> :
                    (deliveryInfo.apply ? <Text className='fontColor1 fontSize2 rightRange'>已申请</Text>:
                                <View 
                                    className='auth_btn rightRange'
                                    onClick={() => {
                                        loginFlag ? applyRider() : Taro.showToast({title: '你还未登录'})
                                    }}
                                >申请认证</View>)
                }
                
            </View>
            {/* 个人信息 */}
            <View className='white_box flexRow_wd topRange'>
                <Text className='leftRange'>个人信息</Text>
                <Text 
                    className='right' 
                    onClick={() => {
                        if(loginFlag) {
                            Taro.navigateTo({url: '../userInfo/userInfo'})
                        } else {
                            Taro.showToast({title: '你还未登录'})
                        }  
                    }} 
                >›</Text>
            </View>
            {/* 授权登录 */}
            {
                loginFlag ? <Button 
                                className='login'
                                onClick={() => logout()}
                            >退出</Button> :
                <Button 
                    className='login'
                    openType='getUserInfo' 
                    onGetUserInfo={e => {
                        Taro.login({
                            success: function (res) {
                                login({'code': res.code, 'userInfo': e.detail.userInfo})
                            }
                        })
                    }}  
                >授权登录</Button>
            }
            
        </View>
    )
}

export default connect(
    state => ({
        loginFlag: state.user.loginFlag,
        deliveryInfo: state.user.deliveryInfo,
        isApply: state.user.isApply
    }),
    dispatch => ({
        login(args) {
            dispatch(user.login(args))
        },
        applyRider() {
            dispatch(user.applyRider())
        },
        fetchRiderInfo() {
            dispatch(user.fetchRiderInfo())
        },
        fetchWorkInfo() {
            dispatch(user.fetchWorkInfo())
        },
        modifyStatus(args) {
            dispatch(user.modifyStatus(args))
        },
        modifyWorkType(args) {
            dispatch(user.modifyWorkType(args))
        },
        logout() {
            dispatch(user.logout())
        }
    })
)(Me)