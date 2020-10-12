import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Button, Text, Swiper, SwiperItem } from '@tarojs/components'
import './index.scss';

const Detail = () => {
    return (
        <View>
            <Swiper
                className='zhu_swiper'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay
            >
                <SwiperItem className='flex center'>
                <View>11111测试</View>
                </SwiperItem>
                <SwiperItem  className='flex center'>
                <View>22222测试</View>
                </SwiperItem>
                <SwiperItem  className='flex center'>
                <View>3</View>
                </SwiperItem>
            </Swiper>
            <View className='detail_footer absolute full_width'>
                <View className='flex between padding_xs'>
                    <View>购物车</View>
                    <View>¥15</View>                
                    <View>加入购物车</View>
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
)(
    Detail
);


