import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import * as user from '../../actions/userInfo';
import './afterSale.scss'

const AfterSale = props => {
    const data = [[
        "客服1","VX:HYUL,L25"
    ], [
        "客服2", "VX:HYUL,L25"
    ], [
        "客服3", "VX:HYUL,L25"
    ], [
        "服务热线", "234567890-678（服务时间:8:00-22:00）"                 
    ]]
    return(
        <View className='afterSale-container'>
            {
                data.map(item => {
                    return(
                        <View className='wrapper'>
                            <Text className='item1'>{item[0]}</Text>
                            <Text 
                                className='item2'
                                selectable={true}
                                onClick={() => {
                                    Taro.setClipboardData({
                                        data: item[1],
                                        success: function (res) {
                                          Taro.getClipboardData({
                                            success: function (res) {
                                              console.log(res.data)
                                            }
                                          })
                                        }
                                      })
                                }}
                            >{item[1]}</Text>
                        </View>
                    )
                })
            }
            
        </View>
    )
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(AfterSale)