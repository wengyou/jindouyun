import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components' 
import { AtAvatar, AtIcon } from 'taro-ui';
import './orderDetail.scss'
import Address from '../../components/address/address'
import Goods from '../../components/goods/goods'
import Remarks from '../../components/remarks/remarks'
import OrderBtn from '../../components/orderBtn/orderBtn'
import Distribution from '../../components/distribution/distribution'
import * as order from '../../actions/order'

const OrderDetail = props => {
    const {orderDetail, totalOrderNum, deliveryId, queryDelivery, mergeId} = props;
    useEffect(() => {
        mergeId && queryDelivery(mergeId)
    }, [mergeId])
    return(
        <View className='bgColor flexCol_wd'>
            <View className='white_box orderDetail_container flexCol_wd'>
                <Text className='totalOrder_num'>合单单号：{totalOrderNum}</Text>
                <Address />
                {
                    deliveryId !== -1 && <Distribution />
                }
                {/* 一个订单详情 */}
                <View className='orderItem flexCol_wd'>
                    <Text className='orderNum'>订单号：{orderDetail.orderSplit && orderDetail.orderSplit.orderSn}</Text>
                    <Text className='orderTime'>订单时间：{orderDetail.orderSplit && orderDetail.orderSplit.pickupTime}</Text>
                    <View className='goods_wrapper'>
                        {
                            orderDetail.orderGoods && orderDetail.orderGoods.map(item => {
                                return <Goods data={item} key={item.id} />
                            })
                        }
                    </View>  
                    <View className='cost flexRow_wd'>
                        <Text className='fontColor1'>配送费用：</Text>
                        <Text className='fontColor2'>￥{JSON.stringify(orderDetail) !== '{}' && orderDetail.deliveryPrice }</Text>
                    </View>
                    {/* <View className='cost flexRow_wd'>
                        <Text className='fontColor1'>打包费用：</Text>
                        <Text className='fontColor2'>￥10</Text>
                    </View> */}
                    <View className='cost flexRow_wd'>
                        <Text className='fontColor1'>配送时间：</Text>
                        <Text className='fontColor1'>{orderDetail.orderSplit && orderDetail.orderSplit.arriveTime}</Text>
                    </View>
                    <View className='total_price'>
                        <Text className='text'>共计：</Text>
                        <Text className='price'>￥{orderDetail.orderSplit && orderDetail.orderSplit.goodsPrice}</Text>
                    </View>
                    <Remarks data={orderDetail.orderSplit && orderDetail.orderSplit.message} />
                </View>
            </View>
            <OrderBtn data={orderDetail.orderSplit && orderDetail.orderSplit.id} />
        </View>
    )
}

export default connect(
    state => ({
        orderDetail: state.order.orderDetail,
        totalOrderNum: state.order.totalOrderNum,
        deliveryId: state.order.deliveryId,
        mergeId: state.order.mergeId
    }),
    dispatch => ({
        queryDelivery(args) {
            dispatch(order.queryDelivery(args))
        }
    })
)(OrderDetail)