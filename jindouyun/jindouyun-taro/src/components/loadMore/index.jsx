import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View} from '@tarojs/components';
import './index.scss';

const LoadMore = (props) => {

    const { showLoad, showNoMore } = props;

    return (
        <View
            style={{
            display: showLoad ? 'block' : 'none'
        }}
              className='padding_column_xs'
        >
            {
                showNoMore ?
                    <View className='fontS_24 fontC_91 flex center'>{`已经到底了哦>_<~`}</View>
                    :
                    <View className='load between flex margin_auto'>
                        <View className='rect1 load_item'></View>
                        <View className='rect2 load_item'></View>
                        <View className='rect3 load_item'></View>
                        <View className='rect4 load_item'></View>
                        <View className='rect5 load_item'></View>
                    </View>
            }
        </View>
    )
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(
    LoadMore
);

