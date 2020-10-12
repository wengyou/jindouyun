import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import * as user from '../../actions/userInfo';
import './index.scss'
import Right from '../../assets/images/right.png'
import Address_icon from '../../assets/images/address.png'
import ToBePaid from '../../assets/images/to-be-paid.png'
import All from '../../assets/images/all.png'
import Completed from '../../assets/images/completed.png'
import None from '../../assets/images/none.png'

const Tangseng = (props) => {
    const {login, userInfo, loginFlag, logout, fetchAddress, addressList, sendCurrent} = props;
    return (
        <View className='tangseng-container'>
            {/* 头部登录注册 */}
            <View className='header'>
                <AtAvatar 
                    image={userInfo.avatarUrl && userInfo.avatarUrl.length !== 0 && userInfo.avatarUrl || 'https://jdc.jd.com/img/200'}
                    size='large'
                    className='avatar'
                ></AtAvatar>
                <Text 
                    className='username'
                >
                    {JSON.stringify(userInfo) === "{}" ? '用户名' : userInfo.nickName}
                </Text>
                {/* {
                    loginFlag ? 
                        <Text 
                            className='login'
                            onClick={() => logout()}
                        >退出</Text> : <Button 
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
                 */}
            </View>
            {/* 我的订单 */}
            <View className='white-box order'>
                <View 
                    className='flex-wd wrapper'
                    onClick={
                        () => {
                            loginFlag ?
                            Taro.navigateTo({url: '../order/order'}) :
                            Taro.showToast({title: '你还没有登录~~'})
                        }
                    }
                >
                    <Text>我的订单</Text>
                    <Image className='right' src={Right} />     
                </View>           
                <View className='at-row' >
                    <View className='at-col item' onClick={() => {sendCurrent(0);Taro.navigateTo({url: '../order/order'})}} >
                        <Image className='img-item' src={All} />
                        <Text className='text-item'>全部订单</Text>
                    </View>
                    <View className='at-col item' onClick={() => {sendCurrent(1);Taro.navigateTo({url: '../order/order'})}}>
                        <Image className='img-item' src={ToBePaid} />
                        <Text className='text-item'>待付款</Text>
                    </View>
                    <View className='at-col item' onClick={() => {sendCurrent(2);Taro.navigateTo({url: '../order/order'})}}>
                        <Image className='img-item' src={Completed} />
                        <Text className='text-item'>已完成</Text>
                    </View>
                </View>
            </View> 
            {/* 收货地址 */}
            {/* <View className='white-box address-parent' onClick={() => Taro.navigateTo({url: '/pages/myAddress/myAddress'})}>
                <View className='flex-wd'>
                    <Text>我的收货地址</Text>
                    <Image className='right' src={Right} />  
                </View>
                {
                     addressList.length !==0 && addressList.map(item => {
                        return(
                            item.isDefault &&
                            <View className='address-wrapper' key={item.id}>
                                <Image className='address' src={Address_icon} />
                                <View className='wrapper'>
                                    <View>
                                        <Text className='name'>{item.name}</Text>
                                        <Text className='phone'>{item.tel}</Text>
                                    </View>
                                    <View>
                                        <Text className='build'>20栋</Text>
                                        <Text className='dorm'>{item.addressDetail}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
                
            </View>  */}
            <View 
                className='white-box code' 
                onClick={
                    () => {
                        loginFlag ?
                        Taro.navigateTo({url: '/pages/myAddress/myAddress'}) :
                        Taro.showToast({title: '你还没有登录~~'})
                    }
                }
            >
                <View className='code-wrapper flex-wd'>
                    <Text>我的收货地址</Text>
                    <Image className='right2' src={Right} />  
                </View>  
            </View>
            {/* 我的积分 */}
            {/* <View 
                className='white-box code' 
                onClick={
                    () => {
                        loginFlag ?
                        Taro.navigateTo({url: '../integral/integral'}) :
                        Taro.showToast({title: '你还没有登录~~'})
                    }
                }
            >
                <View className='code-wrapper flex-wd'>
                    <Text>我的积分</Text>
                    <Image className='right2' src={Right} />  
                </View>  
            </View>  */}
            {/* 邀请码 */}
            <View 
                className='white-box code' 
                onClick={
                    () => {
                        loginFlag ?
                        Taro.navigateTo({url: '../code/code'}) :
                        Taro.showToast({title: '你还没有登录~~'})
                    }
                }
            >
                <View className='code-wrapper flex-wd' >
                    <Text>我的邀请码</Text>
                    <Image className='right2' src={Right} />  
                </View>  
            </View>    
            {/* 服务  */}
            <View 
                className='white-box code' 
                onClick={
                    () => {
                        loginFlag ?
                        Taro.navigateTo({url: '../customer-service/service'}) :
                        Taro.showToast({title: '你还没有登录~~'})
                    }
                }
            >
                <View className='code-wrapper flex-wd'>
                    <Text>服务</Text>
                    <Image className='right2' src={Right} />  
                </View>  
            </View> 
            {/* 登录       */}
            {
                    loginFlag ? 
                        <Text 
                            className='login'
                            onClick={() => logout()}
                        >退出</Text> : <Button 
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
        userInfo: state.userInfo.userInfo,
        loginFlag: state.userInfo.loginFlag,
        addressList: state.userInfo.addressList,
    }),
    dispatch => ({
        login(args) {
            dispatch(user.login(args));
        },
        logout() { 
            dispatch(user.logout());
        },
        sendCurrent(args) {
            dispatch(user.sendCurrent(args))
        }
    })
)(
    Tangseng
);