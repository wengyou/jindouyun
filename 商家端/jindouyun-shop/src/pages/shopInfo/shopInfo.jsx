import React, { useState, useEffect } from 'react';
import Taro, { showToast } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtForm, AtInput, AtImagePicker } from 'taro-ui';
import './shopInfo.scss'
import * as user from '../../actions/user'

const ShopInfo = props => {
    const {merchantInfo, applyBusiness} = props;
    const [form, setForm] = useState({
        'name': JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? merchantInfo.brandInfo.name : '',
        'desc': JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? merchantInfo.brandInfo.desc : '',
        'notice': JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? merchantInfo.brandInfo.notice : '',
        'startTime': JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? merchantInfo.brandInfo.start_time : '',
        'endTime': JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? merchantInfo.brandInfo.end_time : '',
        'tel': JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? merchantInfo.address.tel : '',
        'address': JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? merchantInfo.address.addressDetail : '',
        'cost': JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? merchantInfo.brandInfo.delivery_price : '',
        // 'perCost': JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? merchantInfo.userInfo.desc : '',
        'files': JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? [merchantInfo.brandInfo.picUrl] : []
    })
    return(
        <View className='shopInfo_container bgColor'>
            <View className='white_box topRange'>
                <AtForm>
                    <AtInput 
                        name='name' 
                        title='店铺名称' 
                        type='text' 
                        value={form.name} 
                        onChange={(e) => setForm({...form, 'name': e}) } 
                    />
                    <AtInput 
                        name='desc' 
                        title='描述' 
                        type='text' 
                        value={form.desc} 
                        onChange={(e) => setForm({...form, 'desc': e}) } 
                    />
                    {
                        JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth && 
                        <AtInput 
                            name='notice' 
                            title='公告' 
                            type='text' 
                            value={form.notice} 
                            onChange={(e) => setForm({...form, 'notice': e}) } 
                        />
                    }
                    {
                        JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth && 
                        <AtInput 
                            name='startTime' 
                            title='营业开始时间' 
                            type='text' 
                            value={form.startTime} 
                            onChange={(e) => setForm({...form, 'startTime': e}) } 
                        />
                    } 
                    {
                        JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth && 
                        <AtInput 
                            name='endTime' 
                            title='营业开始时间' 
                            type='text' 
                            value={form.endTime} 
                            onChange={(e) => setForm({...form, 'endTime': e}) } 
                        />
                    } 
                    <AtInput 
                        name='tel' 
                        title='联系电话' 
                        type='phone' 
                        value={form.tel} 
                        onChange={(e) => setForm({...form, 'tel': e}) } 
                    />
                    <AtInput 
                        name='address' 
                        title='店铺地址' 
                        type='text' 
                        value={form.address} 
                        onChange={(e) => setForm({...form, 'address': e}) } 
                    />
                    {
                        JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth &&
                        <AtInput 
                            name='cost' 
                            title='起送费' 
                            type='text' 
                            value={form.cost} 
                            onChange={(e) => setForm({...form, 'cost': e}) } 
                        />
                    }
                    {/* {
                        JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth && 
                        <AtInput 
                            name='value' 
                            title='人均费用' 
                            type='text' 
                            value={form.cost} 
                            // onChange={(e) => setForm({...form, cost: e}) } 
                        />
                    } */}
                    <Text className='shop_img' style={{marginLeft: '15px', color: '#000000'}}>店铺头像</Text>
                    <AtImagePicker
                        length={2}
                        multiple={false}
                        files={form.files}
                        onChange={files => {
                            form.files.length === 1 ? Taro.showToast({title: '只需上传一张'}) :
                            setForm({...form, 'files': files})
                        }}
                        onFail={mes => console.log(mes)}
                        onImageClick={(index, files) => console.log(index, files)}
                    />

                    {
                        JSON.stringify(merchantInfo) !== '{}' && merchantInfo.auth ? 
                        <View className='shopInfo_btn'>保存信息</View> :
                        <View 
                            className='shopInfo_btn'
                            onClick={() => {
                                if(form.name === '') {
                                    Taro.showToast({title: '店铺名称不能为空'})
                                } else if(form.desc === '') {
                                    Taro.showToast({title: '店铺描述不能为空'})
                                } else if(form.tel === '') {
                                    Taro.showToast({title: '电话不能为空'})
                                } else if(form.address === '') {
                                    Taro.showToast({title: '店铺地址不能为空'})
                                } else if(form.files.length === 0) {
                                    Taro,showToast({title: '请上传店铺头像'})
                                } else {
                                    applyBusiness({
                                        'name': form.name,
                                        'desc': form.desc,
                                        'picUrl': form.files[0].url,
                                        'address': form.address,
                                        'phone': form.tel
                                    })
                                }
                            }}
                        >申请注册</View>
                    }
                </AtForm>
            </View>
            
        </View>
    )
}

export default connect(
    state => ({
        merchantInfo: state.user.merchantInfo
    }),
    dispatch => ({
        applyBusiness(args) {
            dispatch(user.applyBusiness(args))  
        }
    })
)(ShopInfo)