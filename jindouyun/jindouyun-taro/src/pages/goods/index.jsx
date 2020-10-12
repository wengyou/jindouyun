import React, {useEffect, useState} from 'react';
import {getCurrentInstance, useReachBottom} from '@tarojs/taro';
import { connect } from 'react-redux'
import {Image, Text, View} from '@tarojs/components';
import {AtTabs, AtTabsPane} from "taro-ui";
import GoodsList from "../../components/goods_list";
import GoodsHeader from "../../components/goods_header";
import LoadMore from "../../components/loadMore";
import {
    clearSecondCategory,
    handleFetchGoodsList,
    handleFetchSecondCategory
} from "../../actions/zhubajie";
import './index.scss';
import none from "../../assets/images/none.png";

const Goods = (props) => {

    const { nowPage, maxPage, tablist, goodsList, secondCategory, dispatchFetchSecondCategory, dispatchFetchGoodsList, dispatchClearSecondCategory } = props;
    const [showLoad, setShowLoad] = useState(false);
    const [showNoMore, setShowNoMore] = useState(false);
    const [current, setCurrent] = useState(0);
    const [goodsListId, setGoodsListId] = useState(0);

    const changeCurrent = (value) => {
        setCurrent(value);
        setGoodsListId(secondCategory[value].id);
    }

    useEffect(() => {
        dispatchClearSecondCategory();
        dispatchFetchSecondCategory({
            id: getCurrentInstance().router.params.id
        });
    }, []);


    useReachBottom(() => {
        if(nowPage < maxPage){
            setShowLoad(true);
            setShowNoMore(false);
            dispatchFetchGoodsList({
                page: nowPage + 1,
                id: secondCategory[current].id,
                type: 'goods',
                callback: (e) => (setShowLoad(false))
            });
        } else {
            setShowLoad(true);
            setShowNoMore(true);
        }
    });

    return (
        <View className='goods_wrap'>
            <GoodsHeader title={getCurrentInstance().router.params.title} />
            <View>
                <AtTabs current={current} tabList={tablist} onClick={changeCurrent} scroll >
                </AtTabs>
            </View>
            <View className='padding_row_s padding_column_xxs'>
                <GoodsList type='goods' id={goodsListId} />
                <View style={{display: goodsList.length !== 0 && 'none'}} className='goods_list_none_wrap flex direction_column center'>
                    <Image className='goods_list_none_img' src={none}/>
                    <Text className='fontS_24 fontC_gray_c6'>还没有相关商品哦～</Text>
                </View>
                <LoadMore showLoad={showLoad} showNoMore={showNoMore} />
            </View>
        </View>
    )
}

export default connect(
    state => ({
        goodsList: state.zhubajie.goodsList,
        secondCategory: state.zhubajie.secondCategory,
        tablist: state.zhubajie.tablist,
        nowPage: state.zhubajie.nowPage,
        maxPage: state.zhubajie.maxPage
    }),
    dispatch => ({
        dispatchFetchSecondCategory(args){
            dispatch(handleFetchSecondCategory(args));
        },
        dispatchFetchGoodsList(args){
            dispatch(handleFetchGoodsList(args));
        },
        dispatchClearSecondCategory(){
            dispatch(clearSecondCategory());
        }
    })
)(
    Goods
);

