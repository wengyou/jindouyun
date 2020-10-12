import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image, Input, Picker  } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar, AtTabs, AtTabsPane, AtTextarea  } from 'taro-ui'
import * as user from '../../actions/userInfo';
import './orderDetail.scss'
import Address from '../../components/address/address'
import OrderGoods from '../../components/orderDoods/orderGoods'
import OrderInfo from '../../components/orderInfo/orderInfo'
import Contact from '../../components/contact/contact'

const OrderDetail = props => {
    const {orderDetail, addressList, fetchAddress, saveAddressFlag, checked_address} = props;
    const [flag, setFlag] = useState('');
    useEffect(() => {
        fetchAddress();
    }, [saveAddressFlag])
    useEffect(() => {
        orderDetail.orderInfo && orderDetail.orderInfo.orderStatusText === '未付款' && setFlag('to-be-paid');
        orderDetail.orderInfo && orderDetail.orderInfo.orderStatusText === ('已发货' || '已付款') && setFlag('address');
        orderDetail.orderInfo && orderDetail.orderInfo.orderStatusText === '已完成' && setFlag('all');
    }, [orderDetail]);
    return(
        <View className='orderDetail-container'>
            {
                addressList.length !== 0 && JSON.stringify(checked_address) === '{}' && addressList.map(item => {
                    return (
                        item.isDefault && 
                        <Address 
                            data={item} 
                            parent={'pickAddress'} 
                        />
                    )
                })
            }
            {
                JSON.stringify(checked_address) !== '{}' && 
                <Address data={checked_address} parent={'pickAddress'}  />
            }
            <View className='white-box'>
                <View className='distributor-phone' style={{marginBottom: '20px', borderRadius: '8px'}}>
                    <Text style={{marginLeft: '2vw'}}>配送员：小明</Text>
                    <Text style={{marginLeft: '2vw'}}>联系电话：13637937511</Text>
                </View>
                {
                    JSON.stringify(orderDetail) !== '{}' && orderDetail.orderGoods.map(item => {
                        return(
                            <OrderGoods key={item.id} data={item} parent={flag} /> 
                        )
                    })
                }
                 <OrderInfo data={ JSON.stringify(orderDetail) !== "{}" && orderDetail.orderInfo} flag={'orderDetail'} />
            </View>
            <Contact data={JSON.stringify(orderDetail) !== "{}" && orderDetail.orderInfo} />
        </View>
    )
}

export default connect(
    state => ({
        orderDetail: state.userInfo.orderDetail,
        addressList: state.userInfo.addressList,
        addressList: state.userInfo.addressList,
        saveAddressFlag: state.userInfo.saveAddressFlag,
        checked_address: state.userInfo.checked_address
    }),
    dispatch => ({
        fetchAddress() {
            dispatch(user.fetchAddress())
        },
    })
)(OrderDetail)