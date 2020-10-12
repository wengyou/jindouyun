import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import Goods from '../../components/goods/goods'
import Remarks from '../../components/remarks/remarks'
import Distribution from '../../components/distribution/distribution'
import Address from '../../components/address/address'
import './totalOrder.scss'
import * as order from '../../actions/order'

const TotalOrder = props => {
    const {totalOrderInfo, deliveryId, goodsList, mergeId, queryDelivery} = props;
    useEffect(() => {
        mergeId && queryDelivery(mergeId)
    }, [mergeId])
    return(
        <View className='totalOrder_container flexCol_wd'>
            <Text className='oddNum'>合单单号：{JSON.stringify(totalOrderInfo) !== '{}' && totalOrderInfo.orderSn}</Text>
            {
                deliveryId !== -1 && <Distribution />
            }
            {
                JSON.stringify(totalOrderInfo) !== '{}' && totalOrderInfo.splitOrder.map(item => {
                    return (
                        <View className='orderItem flexCol_wd' key={item.id}>
                            <Text className='orderNum'>订单号：{item.orderSn}</Text>
                            <View className='goods_wrapper'>
                                {
                                    JSON.stringify(goodsList) !== '{}' && goodsList[item.id].map(item_1 => {
                                        return <Goods data={item_1} key={item_1.id} />
                                    })
                                }
                            </View>  
                            <Text className='total'>订单总金额（含配送费 打包费）</Text>
                            <View className='total_price'>
                                <Text className='text'>共计：</Text>
                                <Text className='price'>￥{item.goodsPrice}</Text>
                            </View>
                            <Remarks data={item.message} />
                        </View>
                    )
                })
            }
            
        </View>
    )
}

export default connect(
    state => ({
        totalOrderInfo: state.order.totalOrderInfo,
        deliveryId: state.order.deliveryId,
        goodsList: state.order.goodsList,
        mergeId: state.order.mergeId
    }),
    dispatch => ({
        queryDelivery(args) {
            dispatch(order.queryDelivery(args))
        }
    })
)(TotalOrder)