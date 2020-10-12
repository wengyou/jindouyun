import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import {AtTabs, AtTabsPane } from 'taro-ui';
import './orderManage.scss'
import * as order from '../../actions/order'
import Remarks from '../../components/remarks/remarks'
import None from '../../assets/images/none.png'

const OrderRecord = props => {
    const {fetchCurrentOrder, deliveryInfo, loginFlag, currentOrder, confirmArrive, fetchOrderDetail} = props;
    const tabList = [{ title: '当前订单' }, { title: '已完成' }]
    const [current, setCurrent] = useState(0);
    console.log(currentOrder)
    useEffect(() => {
        loginFlag && current === 0 && fetchCurrentOrder({'orderStatusList': [32], 'deliveryId': deliveryInfo.deliveryStaff.userId})
        loginFlag && current === 1 && fetchCurrentOrder({'orderStatusList': [33], 'deliveryId': deliveryInfo.deliveryStaff.userId})
    }, [current, loginFlag])
    return(
        <View className='orderRecord_container bgColor'>
            <AtTabs current={current} tabList={tabList} onClick={value => setCurrent(value)}>
                <AtTabsPane current={current} index={0} >
                    {
                        currentOrder.length !== 0 ? currentOrder.map(item => {
                            return (
                                <View className='white_box topRange' key={item.id}>
                                    <View className='flexCol_wd title bottom_line'>
                                        <Text className='fontSize1 topRange'>
                                            {item.type === 0 && `超市订单`}
                                            {item.type === 1 && `外卖订单`}
                                            {item.type === 2 && `快递订单`}
                                        </Text>
                                        <Text className='fontSize2 fontColor1 topRange0'>合单单号：{item.orderSn}</Text>
                                    </View>
                                    {
                                        item.splitOrder.map(item_0 => {
                                            return (
                                                <View 
                                                    className='flexCol_wd wrapper bottom_line' 
                                                    key={item_0.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        fetchOrderDetail(item_0.id)
                                                        Taro.navigateTo({url: '../../pages/orderDetail/orderDetail'})
                                                    }}
                                                >
                                                    <View className='item'>
                                                        <Text>订单单号：</Text>
                                                        <Text className='fontColor1'>{item_0.orderSn}</Text>
                                                    </View>
                                                    <View className='item'>
                                                        <Text>接收时间：</Text>
                                                        <Text className='fontColor1'>{item_0.addTime}</Text>
                                                    </View>
                                                    <View className='item'>
                                                        <Text>顾客姓名：</Text>
                                                        <Text className='fontColor1'>{item_0.consignee}</Text>
                                                    </View>
                                                    <View className='item'>
                                                        <Text>顾客电话：</Text>
                                                        <Text className='fontColor1'>{item_0.mobile}</Text>
                                                    </View>
                                                    <View className='item'>
                                                        <Text>顾客地址：</Text>
                                                        <Text className='fontColor1'>{item_0.address}</Text>
                                                    </View>
                                                    <View className='item'>
                                                        <Text>配送时间：</Text>
                                                        <Text className='fontColor1'>{item_0.updateTime}</Text>
                                                    </View>
                                                    <View className='item bottomRange'>
                                                        <Text>买家备注：</Text>
                                                        <Text className='fontColor1'>{item_0.message}</Text>
                                                    </View>
                                                    <View 
                                                        className='confirm_btn'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            confirmArrive({'orderId': item_0.orderId})
                                                        }}
                                                    >确认送达</View>
                                                </View>
                                            )
                                        })
                                    }
                                    
                                </View>
                            )
                        }) : <View className='none_order'>
                                <Image className='none_img' src={None} />
                                <View className='none_content fontColor1'>无已接取订单</View>
                            </View>
                    }
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                    {
                        currentOrder.length !== 0 ? currentOrder.map(item => {
                            return (
                                <View className='white_box topRange' key={item.id}>
                                    <View className='flexCol_wd title bottom_line'>
                                        <Text className='fontSize1 topRange'>
                                            {item.type === 0 && `超市订单`}
                                            {item.type === 1 && `外卖订单`}
                                            {item.type === 2 && `快递订单`}
                                        </Text>
                                        <Text className='fontSize2 fontColor1 topRange0'>合单单号：{item.orderSn}</Text>
                                    </View>
                                    {
                                        item.splitOrder.map(item_0 => {
                                            return (
                                                <View 
                                                    className='flexCol_wd wrapper bottom_line' 
                                                    key={item_0.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        fetchOrderDetail(item_0.id)
                                                        Taro.navigateTo({url: '../../pages/orderDetail/orderDetail'})
                                                    }}
                                                >
                                                    <View className='item'>
                                                        <Text>订单单号：</Text>
                                                        <Text className='fontColor1'>{item_0.orderSn}</Text>
                                                    </View>
                                                    <View className='item'>
                                                        <Text>接收时间：</Text>
                                                        <Text className='fontColor1'>{item_0.addTime}</Text>
                                                    </View>
                                                    <View className='item'>
                                                        <Text>顾客姓名：</Text>
                                                        <Text className='fontColor1'>{item_0.consignee}</Text>
                                                    </View>
                                                    <View className='item'>
                                                        <Text>顾客电话：</Text>
                                                        <Text className='fontColor1'>{item_0.mobile}</Text>
                                                    </View>
                                                    <View className='item'>
                                                        <Text>顾客地址：</Text>
                                                        <Text className='fontColor1'>{item_0.address}</Text>
                                                    </View>
                                                    <View className='item'>
                                                        <Text>配送时间：</Text>
                                                        <Text className='fontColor1'>{item_0.updateTime}</Text>
                                                    </View>
                                                    <View className='item bottomRange'>
                                                        <Text>买家备注：</Text>
                                                        <Text className='fontColor1'>{item_0.message}</Text>
                                                    </View>
                                                    <View 
                                                        className='confirm_btn'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            confirmArrive({'orderId': item_0.orderId})
                                                        }}
                                                    >确认送达</View>
                                                </View>
                                            )
                                        })
                                    }
                                    
                                </View>
                            )
                        }) : <View className='none_order'>
                                <Image className='none_img' src={None} />
                                <View className='none_content fontColor1'>无已完成订单</View>
                            </View>
                    }
                </AtTabsPane>
            </AtTabs>
        </View>
    )
}

export default connect(
    state => ({
        deliveryInfo: state.user.deliveryInfo,
        loginFlag: state.user.loginFlag,
        currentOrder: state.order.currentOrder
    }),
    dispatch => ({
        fetchCurrentOrder(args) {
            dispatch(order.fetchCurrentOrder(args))
        },
        confirmArrive(args) {
            dispatch(order.confirmArrive(args))
        },
        fetchOrderDetail(args) {
            dispatch(order.fetchOrderDetail(args))
        }
    })
)(OrderRecord)