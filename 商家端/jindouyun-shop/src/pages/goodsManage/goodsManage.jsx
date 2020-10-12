import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import './goodsManage.scss'
import Shop from '../../components/shop/shop'
import ShopGoods from '../../components/shopGoods/shopGoods'
import Build from '../../components/build/build'
import * as order from '../../actions/order'
import * as common from '../../utils/common'
import * as user from '../../actions/user'

const GoodsManage = props => {
    const {merchantInfo, fetchAllGoods, allGoodsList, loginFlag} = props;
    useEffect(() => {
        loginFlag && fetchAllGoods();
    }, [loginFlag])
    return(
        <View className='bgColor goodsManage_container'>
            <Shop />
            <View className='topRange white_box flexCol_wd'>
                {
                    allGoodsList.length !== 0 && allGoodsList.map(item => {
                        return <ShopGoods key={item.id} data={item} />
                    })
                }
            </View>
            <Build />
        </View>
    )
}

export default connect(
    state => ({
        merchantInfo: state.user.merchantInfo,
        allGoodsList: state.order.allGoodsList,
        loginFlag: state.user.loginFlag
    }),
    dispatch => ({
        fetchAllGoods() {
            dispatch(order.fetchAllGoods())
        }
    })
)(GoodsManage)