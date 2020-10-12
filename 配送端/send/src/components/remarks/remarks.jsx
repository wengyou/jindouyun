import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtInput } from 'taro-ui';
import '../../assets/style/components.scss'

const Remarks = props => {
    const [remarksValue, setRemarksValue] = useState(props.data || '');
    useEffect(() => {setRemarksValue(props.data)}, [props.data])
    return(
        <View className='remarks_container'>
            <View className='flexRow_wd'>
                <Text className='text'>备注：</Text>
                <AtInput
                    name='remarks'
                    type='text'
                    // placeholder='单行文本'
                    value={remarksValue}
                    onChange={(e) => setRemarksValue(e)}
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
)(Remarks)