import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { useReachBottom } from '@tarojs/taro';
import { connect } from 'react-redux'
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import {AtIcon, AtSearchBar} from 'taro-ui';
import './index.scss'
import {toGoodsList, toSearch, toWaimai, toDetail} from '../../utils/route';
import LoadMore from "../../components/loadMore";
import AddCart from "../../components/add_cart";
import {
    handleFetchBanner,
    handleAddToCart,
    handleFetchFirstCategory,
    handleFetchRecommendList
} from "../../actions/zhubajie";

const Zhubajie = props => {

    const { banners, recommendList, recommendNowPage, recommendMaxPage, firstCategory, dispatchFetchBanner, dispatchAddToCart, dispatchFetchFirstCategory, dispatchFetchHotRecommend} = props;
    const [showLoad, setShowLoad] = useState(false);
    const [showNoMore, setShowNoMore] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [addInfo, setAddInfo] = useState({});

    useEffect(() => {
        dispatchFetchBanner();
        dispatchFetchFirstCategory();
        dispatchFetchHotRecommend({
            page: 1,
            callback: (e) => (setShowLoad(e))
        });
    }, []);

    useReachBottom(() => {
        if(recommendNowPage < recommendMaxPage){
            setShowLoad(true);
            setShowNoMore(false);
            dispatchFetchHotRecommend({
                page: recommendNowPage + 1,
                callback: (e) => (setShowLoad(e))
            });
        } else {
            setShowLoad(true);
            setShowNoMore(true);
        }
    });

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
        <View>
            <View className='bgc_yellow flex center_column padding_row_s zhu_searchbar'>
                <View onClick={toSearch} className='zhu_search border_10 flex_grow flex center fontS_24 fontC_70'>
                    <AtIcon value={'search'} size='12'/>
                    <Text className='padding_row_xxs'>搜索</Text>
                </View>
            </View>
            <View className='padding_row_s'>
                <Swiper
                    className='zhu_swiper border_10 margin_column_xxs'
                    indicatorColor='#999'
                    indicatorActiveColor='#FBB300'
                    circular
                    indicatorDots
                    autoplay
                >
                    {
                        banners.map(img => {
                            return (
                                <SwiperItem key={img.url}>
                                    <Image className='zhu_banner_img' src={img.url} />
                                </SwiperItem>
                            )
                        })
                    }
                </Swiper>
                <View className='margin_column_xxs padding_column_xs bgc_white border_10 flex around'>
                    {
                        firstCategory.slice(0, 4).map((e, index) => {
                            return (
                                <View key={e.id} className='flex direction_column center' onClick={index === 0 ? toWaimai : () =>(toGoodsList(e.id, e.name))}>
                                    <Image className='zhu_icon' src={e.iconUrl} />
                                    <Text className='zhu_icon_text fontC_70'>{e.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <View className='zhu_goods padding_xxs bgc_white border_10'>
                    <View className='zhu_goods_title'>热门推荐</View>
                    <View>
                        <View className='zhu_item'>
                            {
                                recommendList.map((recommend) => {
                                    return (
                                        <View className='flex padding_column_xs padding_row_xs'>
                                            <Image className='zhu_item_img border_10 flex_grow_shrink bgc_f4' onClick={() => (toDetail(recommend.id))}  src={recommend.picUrl} />
                                            <View className='flex_grow flex direction_column min-width'>
                                                <View className='flex_grow'>
                                                    <View className='padding_row_xs fontS_26 flex'>
                                                        <Text className='ellipsis'>{recommend.name}</Text>
                                                    </View>
                                                    <View className='padding_row_xs fontS_20 fontC_91 flex'>
                                                        <Text className='ellipsis'>{recommend.brief}</Text>
                                                    </View>
                                                </View>
                                                <View className='flex between center_column'>
                                                    <View className='padding_row_xs'>
                                                        <Text className='fontC_orange fontS_36'>¥ {recommend.nowPrice}</Text>
                                                        {/*<Text className='fontC_yellow fontS_20 padding_row_xxs'>月销 120</Text>*/}
                                                    </View>
                                                    <View className='flex'>
                                                        <View className='zhu_item_btn bgc_yellow fontC_white fontS_24 border_10 flex center margin_row_xs' onClick={() => (addToCart('add', recommend))}>添加</View>
                                                        <View className='zhu_item_btn bgc_orange fontC_white fontS_24 border_10 flex center' onClick={() => (addToCart('purchase', recommend))}>购买</View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            <LoadMore showLoad={showLoad} showNoMore={showNoMore} />
                            <AddCart openAdd={openAdd} callback={(e) =>(closeCart(e))} addInfo={addInfo} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default connect(
    state => ({
        banners: state.zhubajie.banners,
        firstCategory: state.zhubajie.firstCategory,

        recommendNowPage: state.zhubajie.recommendNowPage,
        recommendMaxPage: state.zhubajie.recommendMaxPage,
        recommendList: state.zhubajie.recommendList
    }),
    dispatch => ({
        dispatchFetchBanner(){
            dispatch(handleFetchBanner());
        },
        dispatchAddToCart(args){
            dispatch(handleAddToCart(args))
        },
        dispatchFetchFirstCategory(){
            dispatch(handleFetchFirstCategory());
        },
        dispatchFetchHotRecommend(args){
            dispatch(handleFetchRecommendList(args))
        }

    })
)(
    Zhubajie
);

