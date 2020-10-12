import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import '../../assets/style/components.scss'
import GoodsImg from '../../assets/images/goods.png'

const Goods = props => {
    return(
        <View className='goods_container flexRow_wd'>
            <Image className='goods_img' src={(props.data && props.data.picUrl) || GoodsImg} />
            <View className='flexCol_wd wrapper1'>
                <Text className='name'>{props.data && props.data.goodsName}</Text>
                <Text className='des'>超多鸡肉爆款</Text>
            </View>
            <View className='wrapper2'>
                <Text className='price'>￥{props.data && props.data.price}</Text>
                <Text className='number'>x{props.data && props.data.number}</Text>
            </View>
        </View>
    )
}
export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(Goods)