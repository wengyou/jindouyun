import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image, Input, Picker  } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar, AtTabs, AtTabsPane, AtTextarea  } from 'taro-ui'
import * as user from '../../actions/userInfo';
import * as cart from '../../actions/cart'
import './confirmOrder.scss'
import Address from '../../components/address/address'
import OrderGoods from '../../components/orderDoods/orderGoods'
import OrderInfo from '../../components/orderInfo/orderInfo'
import Contact from '../../components/contact/contact'

const ConfirmOrder = props => {
    const {
        cartList, 
        addressList, 
        saveAddressFlag, 
        fetchAddress, 
        fetchCartCheckout, 
        newOrderInfo, 
        buyNowFlag,
        checked_address
    } = props;
    const [cartId, setCartId] = useState([]);
    const [addressId, setAddressId] = useState('');
    useEffect(() => {
        !buyNowFlag && cartList.map(item => {
            item.checked && cartId.push(item.id);
            setCartId(cartId)
        })
    }, [cartList])
    useEffect(() => {
        !buyNowFlag && addressList.map(item => {
            return item.isDefault && setAddressId(item.id);
        })
    }, [addressList])
    useEffect(() => {
        !buyNowFlag && fetchCartCheckout({"cartId": cartId, "addressId": addressId})
    }, [cartId, addressId])
    useEffect(() => {
        fetchAddress();
    }, [saveAddressFlag])
    return(
        <View className='confirmOrder-container'>
            {
                newOrderInfo.checkedAddress && JSON.stringify(checked_address) === '{}' &&
                <Address data={newOrderInfo.checkedAddress} parent={'pickAddress'} />
            }
            {
                JSON.stringify(checked_address) !== '{}' && 
                <Address data={checked_address} parent={'pickAddress'}  />
            }
            <View className='white-box' style={{marginBottom: '10rem'}}>
                {
                    newOrderInfo.checkedGoodsList && newOrderInfo.checkedGoodsList.length !==0 && newOrderInfo.checkedGoodsList.map(item => {
                        return (
                            buyNowFlag ? <View style={{marginTop: '2vh'}}>
                                    <OrderGoods parent={'cart'} key={item.id} data={item} />
                                </View> : 
                            item.checked && <View style={{marginTop: '2vh'}}>
                                <OrderGoods key={item.id} data={item} />
                            </View>
                        )
                    })
                }
                {
                    newOrderInfo && <OrderInfo data={newOrderInfo} parent={'confirmOrder'} />
                }
                
            </View>
            <Contact parent={'confirmOrder'} data={newOrderInfo} />
        </View>
    )
}

export default connect(
    state => ({
        cartList: state.cart.cartList,
        addressList: state.userInfo.addressList,
        newOrderInfo: state.cart.newOrderInfo,
        buyNowFlag: state.cart.buyNowFlag,
        checked_address: state.userInfo.checked_address
    }),
    dispatch => ({
        fetchAddress() {
            dispatch(user.fetchAddress())
        },
        fetchCartCheckout(args) {
            dispatch(cart.fetchCartCheckout(args))
        }
    })
)(ConfirmOrder)