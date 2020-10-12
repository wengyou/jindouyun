import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import * as user from '../../actions/userInfo';
import './integral.scss'
import Right from '../../assets/images/right.png'

const Integral = props => {
    return(
        <View className='integral-container'>
            <View className='number'>
                <View className='out'>
                    <View className='in'>
                        <Text className='score'>121</Text>
                    </View>
                </View>
                <View className='available-integral'>可用积分</View>
            </View>
            <View className='activity'>
                <View className='wrapper'>
                    <Text className='item'>积分兑换</Text>
                    <Image className='right' src={Right} />
                </View>
                <View className='wrapper'>
                    <Text className='item'>积分抽奖</Text>
                    <Image className='right' src={Right} />
                </View>
                <View className='wrapper'>
                    <Text className='item'>积分记录</Text>
                    <Image className='right' src={Right} />
                </View>
            </View>
        </View>
    )
}

export default connect(
    state => ({

    }),
    duspatch => ({

    })
)(Integral)