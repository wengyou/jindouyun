import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import AddressImg from '../../assets/images/address.png'
import '../../assets/style/components.scss'

const Address = props => {
    console.log(props.data)
    return(
        <View className='address_container'>
            <Image className='address_icon rightRange' src={AddressImg} />
            <View className='flexCol_wd leftRange'>
                <Text className='name'>{props.data && props.data.consignee}</Text>
                <View>
                    <Text className='phone fontColor1'>{props.data && props.data.mobile}</Text>
                    <Text className='address fontColor1 leftRange'>{props.data && props.data.address}</Text>
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
)(Address)