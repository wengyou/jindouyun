import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import {AtRadio } from 'taro-ui';
import './mine.scss'
import * as user from '../../actions/user'

const Mine = props => {
    const {login, loginFlag, merchantInfo, updateStatus} = props;
    const [status, setStatus] = useState((merchantInfo.brandInfo && merchantInfo.brandInfo.status) || '');
    const [open, setOpen] = useState(false);
    useEffect(() => {
        loginFlag && status !== "" && Object.keys(merchantInfo).length !== 0 &&
        merchantInfo.auth && updateStatus({'status': status})
    }, [status, loginFlag])
    return(
        <View className='mine_container bgColor'>
            {/* 用户信息 */}
            <View className='flexCol_wd topRange'>
                <Image className='business_img' src={(merchantInfo.userInfo && merchantInfo.userInfo.avatarUrl) || ''} />
                <Text className='fontSize3 fontRange name'>{(merchantInfo.userInfo && merchantInfo.userInfo.nickName || '游客') }</Text>
            </View>
            {/* 营业状态 */}
            <View className='white_box'>
                <Text className='fontRange leftRange'>营业状态</Text>
                <AtRadio
                    options={[
                    { label: '营业', value: 1 },
                    { label: '打烊', value: 0 },
                    ]}
                    value={status}
                    onClick={value => {
                        if(!loginFlag) {
                            Taro.showToast({title: '您还未登录'})
                        } else if(Object.keys(merchantInfo).length !== 0 && !merchantInfo.auth) {
                            Taro.showToast({title: '您还未认证'})
                        } else {
                            setStatus(value)}
                        }
                    }
                />
            </View>
            {/* 认证 */}
            <View className='white_box topRange flexRow_wd'>
                <Text className='fontRange leftRange'>认证状态</Text>
                {
                    JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? 
                    <Text className='fontRange rightRange fontColor1'>已认证</Text> : 
                        merchantInfo.apply ?  <Text className='fontRange rightRange fontColor1'>已申请</Text> : 
                        <View 
                            className='auth_btn rightRange'
                            onClick={() => {
                                loginFlag ? Taro.navigateTo({url: '../../pages/shopInfo/shopInfo'}) :
                                Taro.showToast({title: '你还未登录'})
                            }}
                        >申请认证</View>   
                } 
            </View>
            <View className='white_box flexRow_wd topRange'>
                <Text className='leftRange'>门店设置</Text>
                <Text 
                    className='right' 
                    onClick={() => {
                        (JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth) ?
                        Taro.navigateTo({url: '../shopInfo/shopInfo'}) : Taro.showToast({title: '你还未认证'})
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
        merchantInfo: state.user.merchantInfo
    }),
    dispatch => ({
        login(args) {
            dispatch(user.login(args))
        },
        updateStatus(args) {
            dispatch(user.updateStatus(args))
        }
    })
)(Mine)