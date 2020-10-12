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

const OrderDetail = props => {
    const {orderDetail} = props;
    const [addressInfo, setAddressInfo] = useState('')
    console.log(orderDetail)
    useEffect(() => {
        JSON.stringify(orderDetail) !== '{}' && setAddressInfo(orderDetail.orderSplit)
    },[orderDetail])
    return(
        <View className='bgColor flexCol_wd'>
            <View className='white_box orderDetail_container flexCol_wd'>
                <Text className='totalOrder_num'>合单单号：5694561</Text>
                <Address data={addressInfo} />
                {/* <Distribution /> */}
                {/* 一个订单详情 */}
                <View className='orderItem flexCol_wd'>
                    <Text className='orderNum'>订单号：{orderDetail.orderSplit && orderDetail.orderSplit.orderSn}</Text>
                    {/* <Text className='orderTime'>订单时间：2020年10月1日15：00</Text> */}
                    <View className='goods_wrapper'>
                        {
                            orderDetail.orderGoods && orderDetail.orderGoods.map(item => {
                                return(
                                    <Goods data={item} key={item.id} />
                                )
                            })
                        }
                    </View>  
                    <View className='cost flexRow_wd'>
                        <Text className='fontColor1'>配送费用：</Text>
                        <Text className='fontColor2'>￥10</Text>
                    </View>
                    <View className='cost flexRow_wd'>
                        <Text className='fontColor1'>打包费用：</Text>
                        <Text className='fontColor2'>￥10</Text>
                    </View>
                    <View className='cost flexRow_wd'>
                        <Text className='fontColor1'>配送时间：</Text>
                        <Text className='fontColor1'>{orderDetail.orderSplit && orderDetail.orderSplit.updateTime}</Text>
                    </View>
                    <View className='total_price'>
                        <Text className='text'>共计：</Text>
                        <Text className='price'>￥{orderDetail.orderSplit && orderDetail.orderSplit.goodsPrice}</Text>
                    </View>
                    <Remarks data={orderDetail.orderSplit && orderDetail.orderSplit.message} />
                </View>
            </View>
            {/* <OrderBtn /> */}
        </View>
    )
}

export default connect(
    state => ({
        orderDetail: state.order.orderDetail
    }),
    dispatch => ({

    })
)(OrderDetail)