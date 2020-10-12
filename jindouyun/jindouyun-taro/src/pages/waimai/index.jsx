import React, { useState, useEffect } from 'react';
import { useReachBottom } from '@tarojs/taro';
import { connect } from 'react-redux'
import {View, Text, Image} from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.scss';
import LoadMore from "../../components/loadMore";
import { handleFetchBrandList } from "../../actions/waimai";
import { toWaimaiDetail } from "../../utils/route";
import {showLoading} from "../../utils/common";

const Waimai = props => {

    const { brandList, nowPage, maxPage, dispatchFetchBrandList } = props;

    //const [selectPart, setSelect] = useState('distance');
    const [showLoad, setShowLoad] = useState(false);
    const [showNoMore, setShowNoMore] = useState(false);

    useEffect(() => {
        showLoading(true);
        dispatchFetchBrandList({
            page: 1,
            sort: 'name',
            callback: (e) => (setShowLoad(e))
        })
    }, []);

    useReachBottom(() => {
        if(nowPage < maxPage){
            setShowLoad(true);
            setShowNoMore(false);
            dispatchFetchBrandList({
                page: nowPage + 1,
                sort: 'name',
                callback: (e) => (setShowLoad(e))
            });
        } else {
            setShowLoad(true);
            setShowNoMore(true);
        }
    });

    // const changePart = (type) => {
    //     dispatchFetchBrandList({
    //         page: 1,
    //         sort: type,
    //         callback: (e) => (setShowLoad(e))
    //     })
    //     setSelect(type);
    // }

    return (
        <View>

            {/*<View className='wai_header bgc_yellow fontC_white flex center_column around'>*/}
            {/*    <View className={`${selectPart === 'distance' ? 'fontS_36' : 'fontS_24'}`} onClick={() => changePart('distance')}>距离最近</View>*/}
            {/*    <View className={selectPart === 'add_time' ? 'fontS_36' : 'fontS_24'} onClick={() => changePart('add_time')}>最新开业</View>*/}
            {/*    <View className={selectPart === 'name' ? 'fontS_36' : 'fontS_24'} onClick={() => changePart('name')}>默认排序</View>*/}
            {/*</View>*/}

            <View className='padding_row_s padding_column_xxs' >
                {
                    brandList.map((brand) => {
                        return (
                            <View
                                key={brand.id}
                                className='padding_xxs margin_column_xxs bgc_white flex border_10'
                                onClick={() => (toWaimaiDetail(brand.id, brand.name))}
                            >
                                <Image className='wai_item_img flex_grow_shrink bgc_f4' src={brand.picUrl}/>
                                <View className='flex_grow padding_xs flex direction_column min-width'>
                                    <View className='flex_grow'>
                                        <View className='flex between'>
                                            <View className='fontS_28'>{brand.name}</View>
                                            <View className='flex center'>
                                                <AtIcon value='star-2' size='8' color='#fdb200'/>
                                                <View className='fontC_orange fontS_20'>5.0</View>
                                            </View>
                                        </View>

                                        <View className='fontC_91 fontS_20 flex'>
                                            <Text className='ellipsis'>{brand.desc}</Text>
                                        </View>

                                        <View className='flex' >
                                            {
                                                brand.couponList. map(coupon => {
                                                    return (
                                                        <View key={coupon.name} className='border_yellow border_10 padding_row_xxs wai_item_tag fontS_20 fontC_yellow flex center'>{coupon.name}</View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>

                                    <View className='fontS_20 flex between'>
                                        <View className='fontC_orange'>
                                            <Text>起送 ¥{brand.deliveryPrice}</Text>
                                            <Text className='padding_row_xxs'>人均 ¥{brand.totalOrder === 0 ? 0 : Math.floor(brand.totalTurnover / brand.totalOrder)}</Text>
                                        </View>
                                        <View className='fontC_91'>
                                            {/*<Text className='padding_row_xxs'>40分钟</Text>*/}
                                            {/*<Text>600m</Text>*/}
                                            <Text>营业时间 {brand.startTime}:00 - {brand.endTime}:00</Text>
                                        </View>

                                    </View>
                                </View>

                            </View>
                        )
                    })
                }

                <LoadMore showLoad={showLoad} showNoMore={showNoMore} />

            </View>

        </View>
    )
}

export default connect(
    state => ({
        brandList: state.waimai.brandList,
        brandTotal: state.waimai.brandTotal,
        nowPage: state.waimai.nowPage,
        maxPage:state.waimai.maxPage
    }),
    dispatch => ({
        dispatchFetchBrandList(args){
            dispatch(handleFetchBrandList(args))
        }
    })
)(
    Waimai
);

