import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import '../../assets/style/components.scss'
import User from '../../assets/images/user.jpg'

const Distribution = props => {
    const {deliveryInfo} = props;
    return(
        <View className='distribution_container flexRow_wd'>
            <Image className='user_img' src={(deliveryInfo.user && deliveryInfo.user.avatar) || User} />
            <View className=''>
                <Text>配送员：</Text>
                <Text>{deliveryInfo.user && deliveryInfo.user.nickname}</Text>
            </View>
            <View className=''>
                <Text>联系电话：</Text>
                <Text>{deliveryInfo.user && deliveryInfo.user.mobile}</Text>
            </View>
        </View>
    )
}
export default connect(
    state => ({
        deliveryInfo: state.order.deliveryInfo
    }),
    dispatch => ({

    })
)(Distribution)