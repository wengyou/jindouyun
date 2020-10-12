import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux'
import {View, Button, Text, Image, Ad} from '@tarojs/components'
import './index.scss';
import { handleFetchGoodsList } from "../../actions/zhubajie";
import LoadMore from "../loadMore";
import AddCart from "../add_cart";

import { toDetail } from "../../utils/route";
import {showLoading} from "../../utils/common";

const GoodsList = props => {

    const { type, goodsList, id, dispatchFetchGoodsList } = props;

    const [showLoad, setShowLoad] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [addInfo, setAddInfo] = useState({});



    useEffect(() => {
        id !== 0 &&
            dispatchFetchGoodsList({
                page: 1,
                id,
                type,
                callback: (e) => (setShowLoad(false))
            })
    }, [id]);

    const addToCart = (type, info) => {
        setAddInfo({
            type,
            info,
            page: 'other'
        });
        setOpenAdd(true);
    };

    const closeCart = (e) => {
        setOpenAdd(e)
    }

    return (
        <View className='bgc_white border_10'>
            {
                goodsList.map((e) => {
                    return (
                        <View key={e.id} className='goods_list'>
                            <View className='flex padding_column_xs  padding_row_xs'>
                                <Image onClick={() => (toDetail(e.id))} className='border_10 goods_list_img flex_grow_shrink bgc_f4' src={e.picUrl} />
                                <View className='flex_grow flex direction_column min-width'>
                                    <View className='flex_grow'>
                                        <View className='padding_row_xs fontS_26 flex'>
                                            <Text className='ellipsis'>{e.name}</Text>
                                            </View>
                                        <View className='padding_row_xs fontS_20 fontC_91 flex'>
                                            <Text className='ellipsis'>{e.brief}</Text>
                                        </View>
                                    </View>
                                    <View className='flex between center_column'>
                                        <View className='padding_row_xs'>
                                            <View className='fontC_orange fontS_36'>¥ {e.nowPrice}</View>
                                        </View>
                                        <View className='flex'>
                                            <View onClick={() => addToCart('add', e)} className='goods_list_btn bgc_yellow fontC_white fontS_24 border_10 flex center margin_row_s'>添加</View>
                                            <View onClick={() => addToCart('purchase', e)} className='goods_list_btn goods_list_btn_right bgc_orange fontC_white fontS_24 border_10 flex center'>购买</View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
            )
            }
            <AddCart openAdd={openAdd} callback={(e) =>(closeCart(e))} addInfo={addInfo} />
        </View>
    )
}

export default connect(
    state => ({
        goodsList: state.zhubajie.goodsList
    }),
    dispatch => ({
        dispatchFetchGoodsList(args){
            dispatch(handleFetchGoodsList(args));
        }
    })
)(
    GoodsList
);

