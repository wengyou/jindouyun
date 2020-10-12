import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import '../../assets/style/components.scss'
import * as order from '../../actions/order'

const OrderItem = props => {
    const {orderList, receiveOrder, deliveryInfo} = props;
    return(
        <View 
            className='orderItem_container white_box'
            // onClick={() => Taro.navigateTo({url: '../../pages/orderDetail/orderDetail'})}
        >
            <View className='flexCol_wd'>
                {/* 订单类型 */}
                <View className='flexRow_wd bottom_line'>
                    <View className='flexCol_wd leftRange'>
                        {
                            props.data && props.data.type === 0 && <Text className='fontSize3 fontRange1'>超市订单</Text>
                        }
                        {
                            props.data && props.data.type === 1 && <Text className='fontSize3 fontRange1'>外卖订单</Text>
                        }
                        {
                            props.data && props.data.type === 2 && <Text className='fontSize3 fontRange1'>快递订单</Text>
                        }
                        <Text className='fontSize2 fontRange1 fontColor1'>合单单号：{props.data && props.data.orderSn}</Text>
                    </View>
                    {
                        props.data.status === 31 && 
                        <View 
                            className='pickOrder_btn rightRange'
                            onClick={(e) => {
                                receiveOrder({"grabOrderId":props.data && props.data.grabOrder.id})
                            }}
                        >接单</View>
                    }
                    {
                        props.data.status === 32 && <View className='pickSuc rightRange'>接单成功</View>
                    }
                </View>
                {/* 订单信息 */}
                <View className='flexCol_wd leftRange'>
                    {/* 数量 */}
                    <View className='topRange'>
                        <Text>订单数量：</Text>
                        <Text className='fontSize2 fontColor1'>{props.data && props.data.num}</Text>
                    </View>
                    {/* 重量 */}
                    {/* <View>
                        <Text>订单重量：</Text>
                        <Text></Text>
                    </View> */}
                    {/* 配送范围 */}
                    <View className='topRange'>
                        <Text>配送范围：</Text>
                        <Text className='fontSize2 fontColor1'></Text>
                    </View>
                    {/* 发布时间 */}
                    <View className='topRange'>
                        <Text>发布时间：</Text>
                        <Text className='fontSize2 fontColor1'>{props.data && props.data.releaseTime}</Text>
                    </View>
                    {/* 取单地址 */}
                    <View className='topRange bottomRange'>
                        <Text>取单地址：</Text>
                        <Text className='fontSize2 fontColor1'></Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default connect(
    state => ({
        orderList: state.order.orderList,
        deliveryInfo: state.user.deliveryInfo
    }),
    dispatch => ({
        receiveOrder(args) {
            dispatch(order.receiveOrder(args))
        }
    })
)(OrderItem)