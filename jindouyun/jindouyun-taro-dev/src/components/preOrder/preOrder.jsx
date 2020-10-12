import React, { useState, UseEffect } from 'react';
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components';
import { AtInputNumber  } from 'taro-ui'
import './preOrder.scss'

const PreOrder = () => {
    const [number, setNumber] = useState('1');
    return(
        <View>
            <View className='preOrder-wrapper'>
                <View className='checkbox'>✔</View>
                <Image className='img' />
                <View className='desc-wrapper'></View>
                <AtInputNumber
                    className='number'
                    min={0}
                    step={1}
                    value={number}
                    onChange={value => setNumber(value)}
                />
            </View>
        </View>
    )
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(PreOrder);