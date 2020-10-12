import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon, AtInput } from 'taro-ui';
import * as user from '../../actions/userInfo';
import './code.scss'
import Right from '../../assets/images/right.png'

const Code = props => {
    const {fetchCode, codeData, submitCode} = props;
    const [code, setCode] = useState('');
    useEffect(() => {
        fetchCode()
    }, [])
    return(
        <View className='code-container'>
            <View className='number-wrapper'>
                <View className='box'>
                    <Text className='item1'>我的邀请码</Text>
                    <Text className='item2'>{JSON.stringify(codeData) !== '{}' && codeData.inviteUserId}</Text>
                </View>
            </View>
            <View className='wrapper'>
                <View className='box'>
                    <AtInput
                        name='code'
                        title='填写邀请码'
                        type='text'
                        value={code}
                        onChange={(e) => setCode(e)}
                    />
                    <View 
                        className='submit'
                        onClick={() => {
                            console.log(code, codeData.inviteUserId)
                            if(code != codeData.inviteUserId) {
                                submitCode({'inviteId':code})
                            } else {
                                Taro.showToast({title: '邀请码错误'})
                            }
                        }}
                    >提交</View>
                </View>
                <View className='person'>
                    <Text>我的邀请人数：<Text className='num'>{JSON.stringify(codeData) !== '{}' && codeData.count}人</Text></Text>
                </View>
                {/* 我的奖励 */}
                {/* <View className='reward-wrapper'>
                    <Text>我的奖励</Text>
                    <Image className='right' src={Right} />
                </View> */}
            </View>
        </View>
    )
}

export default connect(
    state => ({
        codeData: state.userInfo.code
    }),
    dispatch => ({
        fetchCode() {
            dispatch(user.fetchCode())
        },
        submitCode(args) {
            dispatch(user.submitCode(args))
        }
    })
)(Code)