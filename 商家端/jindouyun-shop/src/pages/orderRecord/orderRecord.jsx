import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import {AtTabs, AtTabsPane } from 'taro-ui';
import './orderRecord.scss'
import * as order from '../../actions/order'
import Goods from '../../components/goods/goods'
import Remarks from '../../components/remarks/remarks'
import NoneOrder from '../../assets/images/none_order.png'

const OrderRecord = props => {
    const {fetchCompletedOrder, completedOrder, fetchOrderDetail, sendMergeId} = props;
    const tabList = [{ title: '已完成' }, { title: '已取消' }]
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        fetchCompletedOrder({
            'completed': current === 0 ? true : false
        })
    },[current])
    return(
        <View className='orderRecord_container bgColor'>
            <AtTabs current={current} tabList={tabList} onClick={value => setCurrent(value)}>
                <AtTabsPane current={current} index={0} >
                    {
                        completedOrder.length !== 0 ? completedOrder.map(item => {
                            return (
                                <View 
                                    className='orderItem flexCol_wd white_box' 
                                    key={item.orderSplit.id}
                                >
                                    <View className='wrapper_order'>
                                        <View className='flexRow_wd leftRange'>
                                            <Text className='orderNum fontSize1'>订单号：{item.orderSplit.orderSn}</Text>
                                            <Text 
                                                className='right rightRange' 
                                                onClick={() => {
                                                    fetchOrderDetail(item.orderSplit.id)
                                                    // sendTotalOrderNum(item.orderSn)
                                                    // sendDeliveryId(item.brandOrder.deliveryId);
                                                    sendMergeId(item.orderSplit.mergeId)
                                                    Taro.navigateTo({url: '../orderDetail/orderDetail'})
                                                }} 
                                            >›</Text>
                                        </View>
                                        <Text className='leftRange fontColor1'>合单时间</Text>
                                    </View>
                                    
                                    <View className='goods_wrapper'>
                                        {
                                            item.goods.map(item_0 => {
                                                return <Goods key={item_0.id} data={item_0} />
                                            })
                                        }
                                    </View>  
                                    <Text className='total fontColor1 leftRange'>订单总金额（含配送费 打包费）</Text>
                                    <View className='total_price'>
                                        <Text className='text'>共计：</Text>
                                        <Text className='price fontColor2 rightRange'>￥{item.orderSplit.goodsPrice}</Text>
                                    </View>
                                    <Remarks data={item.orderSplit.message} />
                                </View>
                            )
                        }) : <View className='none_wrapper'>
                        <Image className="none_order" src={NoneOrder} />
                        <Text className='fontColor1 topRange'>无已完成订单~</Text>
                    </View>
                    }
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                    {
                        completedOrder.length !== 0 ? completedOrder.map(item => {
                            return (
                                <View 
                                    className='orderItem flexCol_wd white_box' 
                                    key={item.orderSplit.id}
                                >
                                    <View className='wrapper_order'>
                                        <View className='flexRow_wd leftRange'>
                                            <Text className='orderNum fontSize1'>订单号：{item.orderSplit.orderSn}</Text>
                                            <Text 
                                                className='right rightRange' 
                                                onClick={() => {
                                                    fetchOrderDetail(item.orderSplit.id)
                                                    // sendTotalOrderNum(item.orderSn)
                                                    // sendDeliveryId(item.brandOrder.deliveryId);
                                                    sendMergeId(item.orderSplit.mergeId)
                                                    Taro.navigateTo({url: '../orderDetail/orderDetail'})
                                                }} 
                                            >›</Text>
                                        </View>
                                        <Text className='leftRange fontColor1'>合单时间</Text>
                                    </View>
                                    
                                    <View className='goods_wrapper'>
                                        {
                                            item.goods.map(item_0 => {
                                                return <Goods key={item_0.id} data={item_0} />
                                            })
                                        }
                                    </View>  
                                    <Text className='total fontColor1 leftRange'>订单总金额（含配送费 打包费）</Text>
                                    <View className='total_price'>
                                        <Text className='text'>共计：</Text>
                                        <Text className='price fontColor2 rightRange'>￥{item.orderSplit.goodsPrice}</Text>
                                    </View>
                                    <Remarks data={item.orderSplit.message} />
                                </View>
                            )
                        }) : <View className='none_wrapper'>
                                <Image className="none_order" src={NoneOrder} />
                                <Text className='fontColor1 topRange'>无已取消订单~</Text>
                            </View>
                    }
                </AtTabsPane>
            </AtTabs>
        </View>
    )
}

export default connect(
    state => ({
        completedOrder: state.order.completedOrder
    }),
    dispatch => ({
        fetchCompletedOrder(args) {
            dispatch(order.fetchCompletedOrder(args))
        },
        fetchOrderDetail(args) {
            dispatch(order.fetchOrderDetail(args))
        },
        sendMergeId(args) {
            dispatch(order.sendMergeId(args))
        }
    })
)(OrderRecord)