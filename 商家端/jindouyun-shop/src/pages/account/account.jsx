import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image, Picker } from '@tarojs/components'
import { AtAvatar, AtIcon, AtList, AtListItem  } from 'taro-ui';
import *as common from '../../utils/common'
import './account.scss'

const Account = props => {
    const [date, setDate] = useState(common.getNowFormatDate())
    return(
        <View className='account_container bgColor'>
            <View className='page-section'>
                <View>
                    <Picker mode='date' onChange={e => setDate(e.detail.value)}>
                        <AtList>
                            <AtListItem title='请选择日期' extraText={date} />
                        </AtList>
                    </Picker>
                </View>
            </View>
            <View className='white_box flexCol_wd topRange'>
                <View className='bottom_line'>
                    <Text className='bottom_line date fontSize4 fontColor1 leftRange'>1月7日</Text>
                    <View className='leftRange rightRange bottomRange topRange'>
                        <View className='item flexRow_wd'>
                            <Text className='fontSize2 fontColor1'>订单号：16885125</Text>
                            <Text className='fontSize3 fontColor2'>+123</Text>
                        </View>
                        <View className='item flexRow_wd'>
                            <Text className='fontSize2 fontColor1'>订单号：16885125</Text>
                            <Text className='fontSize3 fontColor2'>+123</Text>
                        </View>
                    </View>
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
)(Account)