import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import './orderGoods.scss'
import Number from '../../components/number/number'
import Goods from '../../assets/images/goods.png'

const OrderGoods = props => {
    return(
        <View className='orderGoods-container'>
            {/* 商品图片 */}
            <Image className='orderGoods-img' src={props.data && props.data.picUrl || Goods} />

            {/* 商品名字 */}
            <View className='name'>
                <Text>{props.data && props.data.goodsName}</Text>
                {/* <Text className='weight'></Text> */}
                <View style={{display: 'flex', marginTop: '30px'}}>
                    <Text className='paid-price'>￥ {props.data && props.data.price}</Text>
                    {props.parent !== 'cart' && <Text>x{props.data && props.data.number}</Text>}
                    {/* <View className='num'>{props.data.number}</View> */}
                </View>
            </View>
            {
                props.parent == 'all' && <View className='price'>
                                            <Text>￥{props.data && props.data.price}</Text>
                                            <Text className='number'>x{props.data && props.data.number}</Text>
                                        </View>
            }
            {
                props.parent == 'to-be-paid' && <Number className='number' parent={props.parent} data={props.data} />
            }
            {
                props.parent == 'cart' && <Number className='number' parent={props.parent} data={props.data} />
            }
            {/* {
                props.parent == 'address' && <View className='num_goods'>{props.data.number}</View>
            } */}
        </View>
    )
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(OrderGoods);