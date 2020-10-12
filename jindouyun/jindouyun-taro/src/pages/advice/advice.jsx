import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtInput, AtIcon, AtTextarea } from 'taro-ui';
import * as user from '../../actions/userInfo';
import './advice.scss'

const Advice = props => {
    const {submitAdvice, userInfo} = props;
    console.log(userInfo)
    const [value, setValue] = useState('');
    const [phone, setPhone] = useState('');
    return(
        <View className='advice-container'>
            <AtTextarea
                count={false}
                value={value}
                onChange={e => setValue(e)}
                placeholder='请描述你的问题或建议'
            />
            <AtInput
                name='value'
                title='手机号'
                type='phone'
                placeholder='请输入手机号'
                value={phone}
                onChange={(e) => setPhone(e)}
            />
            <Button 
                className='submit'
                onClick={() => {
                    submitAdvice({
                        "username": userInfo.nickName,
                        "mobile": phone,
                        "feedType": 'niu',
                        "content": value  
                    })
                }}
            >提交</Button>
        </View>
    )
}

export default connect(
    state => ({
        userInfo: state.userInfo.userInfo
    }),
    dispatch => ({
        submitAdvice(args) {
            dispatch(user.submitAdvice(args));
        }
    })
)(Advice);