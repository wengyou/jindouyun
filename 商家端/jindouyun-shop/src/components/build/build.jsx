import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui'
import '../../components/build/build'
import * as user from '../../actions/user'

const Build = props => {
    const {sendGoodsInfo, sendIsBuild} = props;
    return(
        <View className='build_container'>
            <Button 
                className='build_btn fontSize2'
                onClick={() => {
                    sendGoodsInfo({});
                    sendIsBuild(true)
                    Taro.navigateTo({url: '../../pages/buildGoods/buildGoods'})}
                }
            >新建商品</Button>
        </View>
    )
}

export default connect(
    state => ({
        
    }),
    dispatch => ({
        sendGoodsInfo(args) {
            dispatch(user.sendGoodsInfo(args))
        },
        sendIsBuild(args) {
            dispatch(user.sendIsBuild(args))
        }
    })
)(Build)