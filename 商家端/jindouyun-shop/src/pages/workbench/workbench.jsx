import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import Goods from '../../components/goods/goods'
import Remarks from '../../components/remarks/remarks'
import './workbench.scss'
import * as order from '../../actions/order'
import NoneOrder from '../../assets/images/none_order.png'

const Workbench = props => {
    const {
        fetchOrderList, 
        loginFlag, 
        orderList, 
        merchantInfo, 
        fetchOrderDetail, 
        sendTotalOrderInfo,
        sendTotalOrderNum,
        sendDeliveryId,
        goodsList,
        sendMergeId,
        receiveOrder,
        updateOrderListFlag
    } = props;
    useEffect(() => {
        loginFlag && fetchOrderList({
            'orderStatusList':[21,22], 
            'brandId': merchantInfo.brandInfo && merchantInfo.brandInfo.id
        })
    }, [loginFlag, updateOrderListFlag])
    return(
        <View className='bgColor flexCol_wd'>
            {
                orderList.length !== 0 ? orderList.map(item => {
                    return (
                        <View className='white_box order_container' key={item.id}>
                            <View className='flexRow_wd wrapper'>
                                <Text>合单单号：{item.orderSn}</Text>
                                <Text 
                                    className='right' 
                                    onClick={() => {
                                        sendTotalOrderInfo(item);
                                        sendDeliveryId(item.brandOrder.deliveryId);
                                        sendMergeId(item.id)
                                        Taro.navigateTo({url: '../../pages/totalOrder/totalOrder'})
                                    }} 
                                >›</Text>
                            </View>
                            {
                                item.splitOrder.map(item_0 => {
                                    return (
                                        <View 
                                            className='orderItem flexCol_wd' 
                                            onClick={() => {
                                                fetchOrderDetail(item_0.id)
                                                sendTotalOrderNum(item.orderSn)
                                                sendDeliveryId(item.brandOrder.deliveryId);
                                                sendMergeId(item.id)
                                                Taro.navigateTo({url: '../orderDetail/orderDetail'})
                                            }}
                                            key={item_0.id}
                                        >
                                            {
                                                item_0.orderStatus === 202 ? 
                                                <Text className='orderNum_cancel'>订单号：{item_0.orderSn}（已取消）</Text> : 
                                                <Text className='orderNum'>订单号：{item_0.orderSn}</Text>
                                            }
                                            <View className='goods_wrapper'>
                                                {
                                                    JSON.stringify(goodsList) !== '{}' && goodsList[item_0.id].map(item_1 => {
                                                        return <Goods data={item_1} key={item_1.id} />
                                                    })
                                                }
                                            </View>  
                                            <Text className='total'>订单总金额（含配送费 打包费）</Text>
                                            <View className='total_price'>
                                                <Text className='text'>共计：</Text>
                                                <Text className='price'>￥{item_0.goodsPrice}</Text>
                                            </View>
                                            <Remarks data={item_0.message} />
                                        </View>
                                    )
                                })
                            }
                            {
                                item.status === 21 ? <Button 
                                                        className='orderTake_btn'
                                                        onClick={() => {receiveOrder({'mergeId': item.id})}}
                                                    >立即接单</Button> : 
                                                    <Button className='receive'>已接单</Button>
                            }
                            
                        </View>
                    )
                }) : <View className='none_wrapper'>
                    <Image className="none_order" src={NoneOrder} />
                    <Text className='fontColor1 topRange'>当前无订单~</Text>
                </View>
            }
        </View>
    )
}

export default connect(
    state => ({
        loginFlag: state.user.loginFlag,
        orderList: state.order.orderList,
        merchantInfo: state.user.merchantInfo,
        goodsList: state.order.goodsList,
        updateOrderListFlag: state.order.updateOrderListFlag
    }),
    dispatch => ({
        fetchOrderList(args) {
            dispatch(order.fetchOrderList(args))
        },
        sendTotalOrderInfo(args) {
            dispatch(order.sendTotalOrderInfo(args))
        },
        fetchOrderDetail(args) {
            dispatch(order.fetchOrderDetail(args))
        },
        sendTotalOrderNum(args) {
            dispatch(order.sendTotalOrderNum(args))
        },
        sendDeliveryId(args) {
            dispatch(order.sendDeliveryId(args))
        },
        sendMergeId(args) {
            dispatch(order.sendMergeId(args))
        },
        receiveOrder(args) {
            dispatch(order.receiveOrder(args))
        }
    })
)(Workbench)