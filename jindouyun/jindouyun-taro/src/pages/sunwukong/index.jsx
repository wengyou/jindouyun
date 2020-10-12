import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image, Input, Picker, Textarea  } from '@tarojs/components'
import { AtRadio, AtTextarea, AtList, AtInput, AtListItem } from 'taro-ui'
import * as user from '../../actions/userInfo';
import './index.scss'
import Address from '../../components/address/address'
import Contact from '../../components/contact/contact'

const Sunwukong = props => {
    const {addressList, fetchAddress, saveAddressFlag, checked_address, loginFlag} = props;
    const [down, setDown] = useState(false);
    const [flag, setFlag] = useState({
        flag1: false,
        flag2: false,
        flag3: false,
        flag4: false,
        flag5: false,
    })
    let typeConfig = [{
        type: "京东",
        flag: flag.flag1,
        id: 0
    }, {
        type: "顺丰",
        flag: flag.flag2,
        id: 1
    },{
        type: "中通",
        flag: flag.flag3,
        id: 2
    },{
        type: "韵达",
        flag: flag.flag4,
        id: 3
    },{
        type: "其他",
        flag: flag.flag5,
        id: 4
    }]
    const option = [{
        value: 'option1',
        label: '5kg以下',
      },{
        value: 'option2',
        label: '5kg以上'
      }]
    //   const [optionValue, setOptionValue] = useState('')
    //   const [remarks, setRemarks] = useState('');
    const type = ['京东', '中通', '顺丰', '百世', '其他'];
    const timeList = ['立即送达', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00']
    const [form, setForm] = useState({
        selectedType: '京东',
        weight: 'option1',
        remarks: '',
        pickCode: '',
        name: '',
        phone: '',
        date: new Date().toLocaleDateString(),
        time: '立即送达'
    })
    const [addressId, setAddressId] = useState('');
    useEffect(() => {
        fetchAddress();
    }, [saveAddressFlag, loginFlag]);
    useEffect(() => {
        addressList.length !== 0 && JSON.stringify(checked_address) === '{}' && addressList.map(item => {
            return item.isDefault && setAddressId(item.id);
        }) 
    }, [addressList])
    return (
        <View>
            <View className='sunwukong-container'>
                {
                    addressList.length !== 0 && JSON.stringify(checked_address) === '{}' && addressList.map(item => {
                        return (
                            item.isDefault && 
                            <Address data={item} parent={'pickAddress'} />
                        )
                    })
                }
                {
                    JSON.stringify(checked_address) !== '{}' && 
                    <Address data={checked_address} parent={'pickAddress'}  />
                }
                {/* 快递类型 */}
                <View className='item'>
                    <Text className='title' >快递类型：</Text>
                    <Picker 
                        className='type-pick'
                        mode='selector' 
                        range={type} 
                        onChange={e => setForm({...form, selectedType: type[e.detail.value]})}
                    >
                        <AtList>
                        <AtListItem
                            extraText={form.selectedType}
                        />
                        </AtList>
                    </Picker>
                </View>
                {/* 重量 */}
                <View className='item'>
                    <Text className='title' >快递重量：</Text>
                    <AtRadio
                        options={option}
                        value={form.weight}
                        onClick={e => setForm({...form, weight: e})}
                    />
                </View>
                {/* 取件码 */}
                <View className='item itemForm'>
                    <Text className='title' >快递取件码：</Text>   
                    <AtInput
                        name='pickCode'
                        value={form.pickCode}
                        onChange={e => setForm({...form, pickCode: e})}
                    /> 
                </View>
                {/* 姓名 */}
                <View className='item itemForm'>
                    <Text className='title' >收件人姓名：</Text>  
                    <AtInput
                        name='name'
                        value={form.name}
                        onChange={e => setForm({...form, name: e})}
                    /> 
                </View>
                {/* 电话 */}
                <View className='item itemForm'>
                    <Text className='title' >收件人电话：</Text>  
                    <AtInput
                        name='phone'
                        type='text'
                        value={form.phone}
                        onChange={e => setForm({...form, phone: e})}
                    /> 
                </View>
                {/* 送达时间 */}
                <View className='item'>
                    <Text className='title' >送达时间：</Text>  
                    {/* <Picker mode='date' onChange={e => setForm({...form, date: e.detail.value})}>
                        <AtList>
                            <AtListItem extraText={form.date} />
                        </AtList>
                    </Picker> */}
                    <Picker 
                        mode='selector' 
                        range={timeList}
                        onChange={e => setForm({...form, time: timeList[e.detail.value]})}
                    >
                        <AtList>
                            <AtListItem extraText={form.time} />
                        </AtList>
                    </Picker>
                </View>
                {/* 买家备注 */}
                <View className='item itemForm'>
                    <Text className='title' >买家备注：</Text>
                    <AtTextarea 
                        count={false}
                        value={form.remarks}
                        onChange={e => setForm({...form, remarks:e})}
                        placeholder='若快递类型没有您需要的类型，请选择其他并填写在此'
                    />
                </View>
            </View>
            <Contact 
                price={form.weight === 'option1'? '4' : '7'} 
                parent={'confirmOrder'} 
                flag={'express'} 
                express={{
                    'addressId': checked_address.id ? checked_address.id : addressId,
                    'expressType': form.selectedType,
                    'isweight': form.weight === 'option1' ? 0 : 1,
                    'message': form.remarks,
                    'pikeupCode': form.pickCode,
                    'consignee': form.name,
                    'mobile': form.phone,
                    'deliveryTime': form.time
                }}
            />
        </View>
        
    )
}

export default connect(
    state => ({
        addressList: state.userInfo.addressList,
        saveAddressFlag: state.userInfo.saveAddressFlag,
        checked_address: state.userInfo.checked_address,
        loginFlag: state.userInfo.loginFlag
    }),
    dispatch => ({
        fetchAddress() {
            dispatch(user.fetchAddress())
        },
    })
)(
    Sunwukong
);

