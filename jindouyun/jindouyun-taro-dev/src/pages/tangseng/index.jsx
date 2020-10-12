import React, { Component } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui'
import request from '../../utils/request';
import './index.scss'

class Tangseng extends Component {
    render() {
        return (
            <View className='tangseng-container'>
                {/* 头部登录注册 */}
                <View className='header'>
                    <View className='wrapper' onClick={() => Taro.navigateTo({url: '/pages/userInfo/userInfo'})}>
                        <AtAvatar 
                            image='https://jdc.jd.com/img/200'
                            circle
                            size='large'
                            className='avatar'
                        ></AtAvatar>
                        <Text className='username'>用户名</Text>
                    </View>
                    
                    <Text 
                        className='login'
                        onClick={() => {
                            Taro.login({
                                success: function(res) {
                                console.log(res);
                                if (res.code) {
                                    const data = request('post', 'wx/auth/login', res.code);
                                    console.log(data);
                                } else {
                                    console.log('登录失败' + res)
                                }
                                }
                            })
                        }  
                    }     
                    >登录/注册</Text>
                </View>
                {/* 我的订单 */}
                <View className='white-box order'>
                    <View 
                        className='flex'
                        onClick={() => Taro.navigateTo({url: '/pages/order/order'})}
                    >
                        <Text>我的订单</Text>
                        <AtIcon value='chevron-right' size='25' color='#CDCDCD'></AtIcon>
                    </View>          
                    <View className='at-row'>
                        <View className='at-col item'>
                            <Image className='img-item' />
                            <Text className='text-item'>全部订单</Text>
                        </View>
                        <View className='at-col item'>
                            <Image className='img-item' />
                            <Text className='text-item'>待付款</Text>
                        </View>
                        <View className='at-col item'>
                            <Image className='img-item' />
                            <Text className='text-item'>已完成</Text>
                        </View>
                    </View>
                </View> 
                {/* 我的积分 */}
                <View className='white-box order'>
                    <View 
                        className='flex'
                        onClick={() => Taro.navigateTo({url: '/pages/order/order'})}
                    >
                        <Text>我的积分</Text>
                        <AtIcon 
                            value='chevron-right' 
                            size='25' color='#CDCDCD'
                        ></AtIcon>
                    </View>          
                    <View className='at-row'>
                        <View className='at-col item'>
                            <Image className='img-item' />
                            <Text className='text-item'>积分兑换</Text>
                        </View>
                        <View className='at-col item'>
                            <Image className='img-item' />
                            <Text className='text-item'>积分抽奖</Text>
                        </View>
                        <View className='at-col item'>
                            <Image className='img-item' />
                            <Text className='text-item'>积分记录</Text>
                        </View>
                    </View>
                </View> 
                <View className='white-box code'>
                    <View className='code-wrapper flex'>
                        <Text>邀请码</Text>
                        <AtIcon className='icon' value='chevron-right' size='25' color='#CDCDCD'></AtIcon>
                    </View>
                    
                </View>   
                <View className='white-box flex address'>
                    <View className='flex'>
                        <Text>我的收货地址</Text>
                        <AtIcon className='icon' value='chevron-right' size='25' color='#CDCDCD'></AtIcon>
                    </View>
                </View>  
                {/* 服务  */}
                <View className='white-box order service'>
                    <View className='flex'>
                        <Text>服务</Text>
                        <AtIcon value='chevron-right' size='25' color='#CDCDCD'></AtIcon>
                    </View>          
                    <View className='at-row'>
                        <View className='at-col item'>
                            <Image className='img-item' />
                            <Text className='text-item'>客服售后</Text>
                        </View>
                        <View className='at-col item'>
                            <Image className='img-item' />
                            <Text className='text-item'>建议反馈i</Text>
                        </View>
                        <View className='at-col item'>
                            <Image className='img-item' />
                            <Text className='text-item'>使用说明</Text>
                        </View>
                    </View>
                </View>         
            </View>
        )
    }
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(
    Tangseng
);