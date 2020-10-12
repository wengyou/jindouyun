import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon, AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import * as user from '../../actions/userInfo';
import './address.scss'
import Address_icon from '../../assets/images/address.png'
import Right from '../../assets/images/right.png'

const Address = props => {
    const { deleteAddress, addressList, checkedAddress, sendAddressId, sendAddFlag} = props;
    return(
        <View 
            className='address-container'
        >
            {
                props.parent !== 'myAddress' && <Image className='address' src={Address_icon} />
            }
            {
                props.parent === 'myAddress' &&
                <View>
                    <Text 
                        className='del'
                        onClick={() => deleteAddress({"id":props.data && props.data.id})}
                    >删除</Text>
                </View>
                
            }
            {
                props.data && props.data.isDefault ? <Text className='default'>默认</Text> :
                // props.parent === 'pickAddress' && 
                <Text 
                    className='default'
                    onClick={() => {
                        checkedAddress(props.data)
                    }}
                >设置</Text>
            }
            <View className='wrapper'>
                <View>
                    <Text className='name'>{props.data && props.data.name}</Text>
                    <Text className='phone'>{props.data && props.data.tel}</Text>
                </View>
                <View>
                    <Text className='build'>{props.data && props.data.building}栋</Text>
                    <Text className='dorm'>{props.data && props.data.addressDetail}</Text>
                </View>
            </View>
            {
                props.parent !== 'address' && <Image 
                    className='right' 
                    src={Right} 
                    onClick={() => {
                        sendAddFlag('myAddress')
                        if(props.parent && props.parent === 'pickAddress') {
                            Taro.navigateTo({url: '../../pages/myAddress/myAddress'})
                        } else {
                            sendAddressId(props.data.id)
                            Taro.navigateTo({url: '../editAddress/editAddress'})
                        }
                    }} 
                />
            }
            
        </View>
    )
}

export default connect(
    state => ({
        addressList: state.userInfo.addressList
    }),
    dispatch => ({
        deleteAddress(args) {
            dispatch(user.deleteAddress(args))
        },
        checkedAddress(args) {
            dispatch(user.checkedAddress(args))
        },
        fetchAddressDetail(args) {
            dispatch(user.fetchAddressDetail(args))
        },
        sendAddFlag(args) {
            dispatch(user.sendAddFlag(args))
        },
        sendAddressId(args) {
            dispatch(user.sendAddressId(args))
        }
    })
)(Address)