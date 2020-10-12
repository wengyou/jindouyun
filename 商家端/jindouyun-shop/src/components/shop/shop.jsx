import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import '../../assets/style/components.scss'

const Shop = props => {
    const {merchantInfo} = props;
    return(
        <View className='white_box shop_container flexRow_wd topRange0'>
            <View className='leftRange flexCol_wd'>
                <Text className='fontSize1'>{merchantInfo.brandInfo && merchantInfo.brandInfo.name}</Text>
                <View className='fontSize4 topRange'>
                    <Text className='fontColor1'>起送</Text>
                    <Text className='fontColor2'>￥{merchantInfo.brandInfo && merchantInfo.brandInfo.delivery_price}</Text>
                    <Text className='leftRange fontColor1'>人均</Text>
                    <Text className='fontColor2'>￥{merchantInfo.brandInfo && merchantInfo.brandInfo.average_price}</Text>
                </View>
                <Text className='fontSize4 fontColor1 topRange0'>公告：{merchantInfo.brandInfo && merchantInfo.brandInfo.desc}</Text>
            </View>
            <Image className='shop_img rightRange' src={merchantInfo.brandInfo && merchantInfo.brandInfo.picUrl} />
        </View>
    )
}

export default connect(
    state => ({
        merchantInfo: state.user.merchantInfo
    }),
    dispatch => ({

    })
)(Shop)