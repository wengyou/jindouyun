import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image, Input, Picker  } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar, AtTabs, AtTabsPane, AtTextarea  } from 'taro-ui'
import * as user from '../../actions/userInfo';
import './orderInfo.scss'
import * as common from '../../utils/common'

const OrderInfo = props => {
    const [date, setDate] = useState(common.getNowFormatDate());
    const [time, setTime] = useState('立即送达');
    const timeList = ['立即送达', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00']
    const [remarks, setRemarks] = useState('');
    return(
        <View className='orderInfo-container'>
            {
                props.parent !== 'confirmOrder' && <Text className='item'>订单号: {props.data && props.data.orderSn}</Text>
            } 
            <View className='item'>
                <Text>配送费:</Text>
                <Text className={props.parent === 'confirmOrder'? 'action' : ''}>￥{props.data && props.data.freightPrice}</Text>
            </View> 
            <View className='delivery-time item'>
                <Text>配送时间：</Text>
                {
                    props.flag && props.flag === 'orderDetail' ? <Text>{props.data && props.data.addTime}</Text> :
                    <View style={{display: 'flex'}}>
                        <Picker mode='date' onChange={e => setDate(e.detail.value)}>
                            <AtList>
                                <AtListItem extraText={date} />
                            </AtList>
                        </Picker>
                        <Picker 
                            mode='selector' 
                            range={timeList}
                            onChange={e => setTime(timeList[e.detail.value]) }
                        >
                            <AtList>
                                <AtListItem extraText={time} />
                            </AtList>
                        </Picker>
                    </View>
                }
            </View>
            <View className={props.parent === 'confirmOrder'? 'item remarks_action' : 'item remarks'}>
                <Text>买家备注：</Text>
                <AtTextarea 
                    value={remarks}
                    onChange={value => setRemarks(value)}
                    maxLength={200}
                    placeholder={props.data ? props.data.message : ''}
                    count={false}
                />
            </View>
            <View className='num-price'>
                {/* <Text>共6件</Text> */}
                <View>
                    <Text>小计：</Text>
                    <Text className='price'>￥{props.data && (props.data.goodsPrice || props.data.goodsTotalPrice)}</Text>
                </View>
                <View>
                    <Text>合计：</Text>
                    <Text className='total'>￥{props.data && props.data.actualPrice}</Text>
                </View>
            </View>
        </View>
    )
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(OrderInfo);