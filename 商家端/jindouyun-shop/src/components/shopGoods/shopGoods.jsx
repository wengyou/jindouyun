import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import '../../assets/style/components.scss'
import * as user from '../../actions/user';
import * as order from '../../actions/order'

const ShopGoods = props => {
    const {sendGoodsInfo, deleteGoods, fetchGoodsDetail, sendIsBuild} = props;
    return(
        <View className='shopGoods_container flexRow_wd topRange'>
            <View className='flexRow_wd'>
                <Image className='shopGoods_img leftRange' />
                <View className='flexCol_wd leftRange'>
                    <Text>{props.data && props.data.name}</Text>
                    <Text className='fontColor1 fontSize4'>{props.data && props.data.keywords}</Text>
                    <Text className='topRange fontColor2'>￥{props.data && props.data.nowPrice}</Text>
                </View>
            </View>
            <View className='flexRow_wd'>
                <Button 
                    className='edit fontSize3 rightRange'
                    onClick={() => {
                        sendGoodsInfo(props.data);
                        sendIsBuild(false)
                        fetchGoodsDetail({goodId: props.data.id})
                        Taro.navigateTo({url: '../../pages/updateGoods/updateGoods'})
                    }}
                >
                    编辑
                </Button>
                <Button
                    className='delete_goods'
                    onClick={() => {
                        deleteGoods(props.data)
                    }}
                >
                    删除
                </Button>
            </View>
            
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
        deleteGoods(args) {
            dispatch(user.deleteGoods(args))
        },
        fetchGoodsDetail(args) {
            dispatch(order.fetchGoodsDetail(args))
        },
        sendIsBuild(args) {
            dispatch(user.sendIsBuild(args))
        }
    })
)(ShopGoods)