import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon, AtInput, AtForm, AtRadio } from 'taro-ui';
import * as user from '../../actions/userInfo';
import address from '../../components/address/address';
import './editAddress.scss'

const EditAddress = props => {
    const {
        addressIndex, 
        addressList, 
        saveAddress, 
        addAddressFlag, 
        fetchAddress, 
        saveAddressFlag, 
        addressDetail,
        addressId,
        fetchAddressDetail
    } = props;
    useEffect(() => {
        fetchAddress();
    }, [saveAddressFlag])
    useEffect(() => {
        addressId !== '' && fetchAddressDetail(addressId)
    }, [addressId])
    let [form, setForm] = useState({
        name: addAddressFlag !== 'newAddress' ? addressDetail.name : '',
        tel: addAddressFlag !== 'newAddress' ? addressDetail.tel : '',
        building: addAddressFlag !== 'newAddress' ? addressDetail.building : '',
        addressDetail: addAddressFlag !== 'newAddress' ? addressDetail.addressDetail : '',
        isDefault: addAddressFlag !== 'newAddress' ? addressDetail.isDefault : true,
        // id: addAddressFlag !== 'newAddress' ? addressList[addressIndex].id : "",
    })
    useEffect(() => {
        JSON.stringify(addressDetail) !== '{}' && setForm({
            'name': addressDetail.name,
            'tel': addressDetail.tel,
            'building': addressDetail.building,
            'addressDetail': addressDetail.addressDetail,
            'isDefault': addressDetail.isDefault
        })
    }, [addressDetail])
    // console.log(form.tel !== '' && form.tel.toString().length)
    return(
        <View>
            <AtForm key={addressDetail.id}>
                <AtInput
                    name='name'
                    title='收件人'
                    type='text'
                    value={form.name}
                    onChange={(e) => {setForm({...form, name: e})}}
                />
                <AtInput
                    name='phone'
                    title='电话号码'
                    type='phone'
                    value={form.tel}
                    onChange={(e) => {setForm({...form, tel: e})}}
                />
                <AtInput
                    name='building'
                    title='楼栋号'
                    type='number'
                    value={form.building}
                    placeholder='只填数字即可，例如19栋，填写19'
                    onChange={(e) => {setForm({...form, building: e})}}
                />
                <AtInput
                    name='address'
                    title='收货地址'
                    type='text'
                    value={form.addressDetail}
                    placeholder='例：19栋兴业苑3舍606'
                    onChange={(e) => {setForm({...form, addressDetail: e})}}
                />
            </AtForm>
            <AtRadio
                options={[
                { label: '设置为默认地址', value: true, },
                { label: '不设置为默认地址', value: false },
                ]}
                value={form.isDefault}
                onClick={e => setForm({...form, isDefault: e})}
            />
            <View 
                className='save-address'
                onClick={
                    () => {
                        form.addressDetail === '' && Taro.showToast({title: '收货地址为空'})
                        form.building === '' && Taro.showToast({title: '楼栋为空'})
                        form.tel.toString().length !== 11 && Taro.showToast({title: '手机号错误'});
                        form.tel === '' && Taro.showToast({title: '手机号为空'})
                        form.name === '' && Taro.showToast({title: '收件人为空'})
                        if(addAddressFlag !== 'newAddress') {
                            saveAddress({
                                name: form.name,
                                tel: form.tel,
                                building: form.building,
                                addressDetail: form.addressDetail,
                                isDefault: form.isDefault,
                                id: addressList[addressIndex].id
                            })
                        } else {
                            saveAddress(form)
                        }
                        
                    }
                }
            >保存</View>
        </View>
    )
}

export default connect(
    state => ({
        addressIndex: state.userInfo.addressIndex,
        addressList: state.userInfo.addressList,
        addAddressFlag: state.userInfo.addAddressFlag,
        saveAddressFlag: state.userInfo.saveAddressFlag,
        addressDetail: state.userInfo.addressDetail,
        addressId: state.userInfo.addressId
    }),
    dispatch => ({
        saveAddress(args) {
            dispatch(user.saveAddress(args))
        },
        fetchAddress() {
            dispatch(user.fetchAddress())
        },
        fetchAddressDetail(args) {
            dispatch(user.fetchAddressDetail(args))
        },
    })
)(EditAddress)