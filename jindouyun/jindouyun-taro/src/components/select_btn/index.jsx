import React, {Component, useEffect, useState} from 'react';
import {View, Button, Text, Image, Input} from '@tarojs/components';
import { AtInput } from "taro-ui";
import './index.scss';
import {showMessage} from "../../utils/common";

const SelectBtn = props => {

    const { numcallBack, num } = props;

    // const [selectNum, setSelectNum] = useState(0);

    const changNum = (type) => {
        if(type === 'plus') {
            numcallBack(num + 1);
        } else if(type === 'minus' && num !== 1) {
            numcallBack(num - 1);
        } else {
            showMessage('>_<不能再减少了哦~', 'none')
        }
    }

    return (
        <View className='select_wrap flex fontC_24'>
            <View className='select_btn bgc_yellow fontC_white padding_row_xs flex center' onClick={() => changNum('minus')} >-</View>
            {/*<AtInput type='number' className='select_num flex center fontC_orange' onChange={(e) =>{numcallBack(e)}} value={num} />*/}
            <Input type='number'
                   className='select_num flex center fontC_orange'
                   onInput={(e) =>{
                       console.log(e.detail.value.match("^[0-9]*$"));
                       console.log(e.detail.value.match("^[0-9]*$") !== null);
                       if(e.detail.value.match("^[0-9]*$") !== null){
                           numcallBack(e.detail.value);
                       } else {
                           numcallBack(1);
                       }
                   }}
                   value={num}
            />
            <View className='select_btn bgc_yellow fontC_white padding_row_xs flex center' onClick={() => changNum('plus')}>+</View>
        </View>
    )
}

export default SelectBtn;

