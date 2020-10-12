import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon, AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import * as user from '../../actions/userInfo';
import * as cart from '../../actions/cart'
import './checkbox.scss'

const Checkbox = props => {
    const {goodsChecked, cartList} = props;
    return(
        <View 
            className={props.data && props.data.checked ? 'checkbox-action' : 'checkbox-container'}
            onClick={() => {
                props.data && goodsChecked({"productIds": [props.data.productId], "isChecked": props.data.checked ? 0 : 1});
            }}
        >
            ﹀
        </View>
    )
}

export default connect(
    state => ({
        cartList: state.cart.cartList
    }),
    dispatch => ({
        goodsChecked(args) {
            dispatch(cart.goodsChecked(args))
        }
    })
)(Checkbox);