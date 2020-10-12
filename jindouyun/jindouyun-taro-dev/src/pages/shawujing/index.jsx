import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components';
import PreOrder from '../../components/preOrder/preOrder';
import './index.scss';

class Shawujing extends Component {
    render() {
        return (
            <View className='cart-container'>
                <View className='header'>
                    <Text className='item1'>购物车</Text>
                    <View className='item2'>管理</View>
                </View>
                <PreOrder />
            </View>
        )
    }
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(
    Shawujing
);


