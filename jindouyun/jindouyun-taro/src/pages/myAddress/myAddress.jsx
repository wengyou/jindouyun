import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import * as user from '../../actions/userInfo';
import Address from '../../components/address/address'
import './myAddress.scss'

const MyAddress = props => {
    const {addressList, sendAddFlag, loginFlag, fetchAddress, saveAddressFlag} = props;
    useEffect(() => {
        fetchAddress();
    }, [saveAddressFlag])
    return(
        <View>
            {
                addressList.length !==0 && addressList.map((item, index) => {
                    return(
                        <Address 
                            parent={'myAddress'} 
                            data={item}
                            index={index}
                        />
                    )
                })
            } 
            <View 
                className='add-address'
                onClick={() => {
                    sendAddFlag('newAddress')
                    Taro.navigateTo({url: '../editAddress/editAddress'})}
                }
            >添加地址</View> 
            
        </View>
    )
}

export default connect(
    state => ({
        addressList: state.userInfo.addressList,
        loginFlag: state.userInfo.loginFlag,
        saveAddressFlag: state.userInfo.saveAddressFlag
    }),
    dispatch => ({
        sendAddFlag(args) {
            dispatch(user.sendAddFlag(args))
        },
        fetchAddress() {
            dispatch(user.fetchAddress())
        },
    })
)(MyAddress);