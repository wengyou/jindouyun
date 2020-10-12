import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image, Picker  } from '@tarojs/components'
import { AtAvatar, AtIcon, AtForm, AtInput, AtButton, AtList, AtListItem } from 'taro-ui'

const UserInfo = () => {
    const [form, setForms] = useState({
        username: '',
        fullname: '',
        sex: '',
        birthday: '',
        number: '',
        college: ''
    });
    const sex = ['男', '女'];
    const [sexChecked, setSexChecked] = useState('男');
    const [dateSel, setDateSel] = useState('2020-8-1');
    const college = ['经济管理学院','计算机学院', '通信学院','传媒学院', '国际学院', '自动化学院', '现代邮政学院']
    const [collegeChecked, setCollegeChecked] = useState('经济管理学院');
    return(
        <View>
            <AtForm
                onSubmit={() => {}}
                onReset={() => {}}
            >
                <AtInput 
                    name='value' 
                    title='用户名' 
                    type='text' 
                    // onChange={} 
                />
                <AtInput 
                    name='value' 
                    title='真实姓名' 
                    type='text' 
                    // onChange={} 
                />
                <Picker 
                    mode='selector' 
                    range={sex} 
                    onChange={e => {
                        e.detail.value === '0' && setSexChecked('男');
                        e.detail.value === '1' && setSexChecked('女')
                    }}>
                <AtList>
                  <AtListItem
                    title='性别'
                    extraText={sexChecked}
                  />
                </AtList>
                </Picker>
                <Picker mode='date' onChange={e => {setDateSel(e.detail.value)}} >
                    <AtList>
                    <AtListItem title='请选择日期' extraText={dateSel} />
                    </AtList>
                </Picker>
                <AtInput
                    name='number'
                    title='学号'
                    type='number'
                    value={form.number}
                    onChange={() => {}}
                />
                <Picker 
                    mode='selector' 
                    range={college} 
                    onChange={e => {
                        console.log(e.detail.value)
                        e.detail.value === '0' && setCollegeChecked('经济管理学院');
                        e.detail.value === '1' && setCollegeChecked('计算机学院');
                        e.detail.value === '2' && setCollegeChecked('通信学院');
                        e.detail.value === '3' && setCollegeChecked('传媒学院');
                        e.detail.value === '4' && setCollegeChecked('国际学院');
                        e.detail.value === '5' && setCollegeChecked('自动化学院');
                        e.detail.value === '6' && setCollegeChecked('现代邮政学院');
                    }}>
                <AtList>
                    <AtListItem
                    title='学院'
                    extraText={collegeChecked}
                    />
                </AtList>
                </Picker>
                <AtButton formType='submit'>提交</AtButton>
                <AtButton formType='reset'>重置</AtButton>
            </AtForm>
        </View>
    )
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(UserInfo)