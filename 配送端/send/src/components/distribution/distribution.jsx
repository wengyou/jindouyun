import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import '../../assets/style/components.scss'
import User from '../../assets/images/user.jpg'

const Distribution = props => {
    return(
        <View className='distribution_container flexRow_wd'>
            <Image className='user_img' src={User} />
            <View className='flexRow_wd'>
                <Text>配送员：</Text>
                <Text>小小明</Text>
            </View>
            <View className='flexRow_wd'>
                <Text>联系电话：</Text>
                <Text>13637937511</Text>
            </View>
        </View>
    )
}
export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(Distribution)