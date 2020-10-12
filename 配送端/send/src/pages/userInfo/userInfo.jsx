import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import {AtForm, AtInput, AtButton } from 'taro-ui';
import './userInfo.scss'
import * as user from '../../actions/user'

const UserInfo = props => {
    const {deliveryInfo, modifyInfo} = props;
    const [form, setForm] = useState({
        'name': deliveryInfo.nickname || '',
        'tel': deliveryInfo.mobile || '',
        'number': deliveryInfo.deliveryStaff.userId || ''
    })
    console.log(form)
    return(
        <View className='userInfo_container bgColor'>
            <View className='white_box topRange'>
            <AtInput 
                name='name' 
                title='我的姓名' 
                type='text' 
                value={form.name} 
                onChange={(value) => {console.log(value); setForm({...form, 'name': value})}} 
            />
            <AtInput 
                name='phone' 
                title='联系电话' 
                type='phone' 
                value={form.tel} 
                onChange={(value) => setForm({...form, 'tel': value})} 
            />
            <AtInput 
                name='number' 
                title='我的工号' 
                type='text' 
                value={form.number} 
                disabled={true}
            />
            <Button 
                className='saveInfo_btn'
                onClick={() => {
                    modifyInfo({
                        'userName': form.name,
                        'mobile': form.tel
                    })
                }}
            >
                保存信息
            </Button>
            </View>
        </View>
    )
}

export default connect(
    state => ({
        deliveryInfo: state.user.deliveryInfo,
    }),
    dispatch => ({
        modifyInfo(args) {
            dispatch(user.modifyInfo(args))
        }
    })
)(UserInfo)