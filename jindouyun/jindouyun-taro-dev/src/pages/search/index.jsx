import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Image} from '@tarojs/components';
import { AtSearchBar,AtIcon } from 'taro-ui';
import test from '../../assets/images/mine/2.png';
import './index.scss';

const Search = () => {
    return (
        <View>
            <View className='search_bg bgc_yellow full_width'></View>
            <AtSearchBar
                focus={true}
            />
            <View>
                <View className='flex between padding_xs'>
                    <View>历史搜索</View>
                    <AtIcon value='add-circle' size='20' color='#F00'/>
                </View>
                <View className='flex flex_wrap'>
                    <View className='padding_xs margin_xxs'>xxxxx</View>
                    <View className='padding_xs margin_xxs'>xxxxx</View>
                    <View className='padding_xs margin_xxs'>xxxxx</View>
                    <View className='padding_xs margin_xxs'>xxxxxsdfghjk</View>
                    <View className='padding_xs margin_xxs'>xxxxx</View>
                    <View className='padding_xs margin_xxs'>xxxxx</View>
                    <View className='padding_xs margin_xxs'>xxxvvxx</View>
                    <View className='padding_xs margin_xxs'>xxxxx</View>
                    <View className='padding_xs margin_xxs'>xxxxnx</View>
                    <View className='padding_xs margin_xxs'>xxxxx</View>
                    <View className='padding_xs margin_xxs'>xxxxx</View>
                    <View className='padding_xs margin_xxs'>xxxxhhhhhjx</View>
                </View>
                <View>
                <View className='flex center_column padding_xs'>
                    <Image className='search_list_img' src={test} />
                    <View className='flex flex_grow direction_column'>
                        <View className='elipsis'>啊就这不会吧不会吧不会吧</View>
                        <View>¥10元</View>
                        <View className='flex direction_row_reverse' >
                            <View>11</View>
                        </View>
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
)(
    Search
);


