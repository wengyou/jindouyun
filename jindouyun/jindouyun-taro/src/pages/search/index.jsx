import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { View, Image, Text} from '@tarojs/components';
import {AtIcon, AtSearchBar} from 'taro-ui';
import test from '../../assets/images/mine/2.png';
import delete_png from '../../assets/images/delete.png';
import { showMessage } from '../../utils/common';
import './index.scss';
import {handleClearSearch, handleDeleteHistory, handleFetchHistory, handleSearch} from "../../actions/search";
import LoadMore from "../../components/loadMore";
import {useReachBottom} from "@tarojs/taro";
import search_0 from '../../assets/images/search_0.png';
import AddCart from "../../components/add_cart";
import {toDetail} from "../../utils/route";

const Search = props => {

    const { dispatchDeleteHistory,dispatchClearSearch, dispatchFetchHistory, dispatchSearch, historyList, searchList, nowPage, maxPage  } = props;

    const [searchInput, setSearchInput] = useState('');
    const [showLoad, setShowLoad] = useState(false);
    const [showNoMore, setShowNoMore] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [addInfo, setAddInfo] = useState({});


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

    useEffect(() => {
        dispatchFetchHistory();
    }, []);

    useReachBottom(() => {
        if(nowPage < maxPage){
            setShowLoad(true);
            setShowNoMore(false);
            dispatchSearch({
                page: nowPage + 1,
                keyword: searchInput,
                callback: (e) => (setShowLoad(e))
            });
        } else {
            setShowLoad(true);
            setShowNoMore(true);
        }
    });

    const deleteHistory = () => {
        dispatchDeleteHistory();
    }

    const search = () => {
        searchInput.trim().length !== 0 &&
        dispatchSearch({
            page: 1,
            keyword: searchInput,
            callback: (e) => (setShowLoad(e))
        });
    }

    const changeInput = (e) => {
        dispatchClearSearch();
        setSearchInput(e);
    }

    return (
        <View>

            <View className='search_wrap bgc_yellow'>
                <AtSearchBar
                    focus
                    value={searchInput}
                    onChange={changeInput}
                    onConfirm={search}
                    onActionClick={search}
                />
            </View>

            {
                searchInput.length === 0 ?
                    <View>
                        <View className='flex between padding_xs'>
                            <View className='search_tit fontS_36 fontC_70'>历史搜索</View>
                            <Image onClick={deleteHistory} className='search_delete' src={delete_png} />
                        </View>
                        <View className='flex flex_wrap padding_row_xs'>
                            {
                                historyList.map((e) => {
                                    return (
                                        <View className='search_history fontS_20 border_10 fontC_white padding_row_xxs margin_xxs'>{e.keyword}</View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    :
                    <View className='padding_row_s padding_column_xxs flex direction_column'>
                        {
                            searchList.length !== 0 ?
                                searchList.map((e) => {
                                    return (
                                        <View key={e.id} className='flex center_column padding_column_xxs padding_row_xs search_item_wrap bgc_white border_10'>
                                            <Image className='search_item_img flex_grow_shrink bgc_f4' onClick={()=>(toDetail(e.id))} src={e.picUrl} />
                                            <View className='flex_grow flex direction_column min-width'>
                                                <View className='flex_grow'>
                                                    <View>
                                                        <View className='padding_row_xs fontC_26px flex'>
                                                            <Text className='ellipsis'>{e.name}</Text>
                                                        </View>
                                                        <View className='padding_row_xs fontS_20 fontC_91 flex'>
                                                            <Text className='ellipsis'>{e.brief}</Text>
                                                        </View>
                                                    </View>
                                                    <View className='padding_xs flex between center_column'>
                                                        <Text className='fontC_orange fontS_36'>¥ {e.nowPrice}</Text>
                                                    </View>
                                                </View>
                                                <View className='flex direction_row_reverse'>
                                                    <View className='search_item_btn bgc_orange fontC_white fontS_24 border_10 flex center' onClick={() => (addToCart('purchase', e))}>购买</View>
                                                    <View className='search_item_btn bgc_yellow fontC_white fontS_24 border_10 flex center margin_row_xs' onClick={() => (addToCart('add', e))}>添加</View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }):
                                <View className='search_null_img_wrap flex direction_column center'>
                                    <Image className='search_null_img'  src={search_0}/>
                                    <Text className='fontS_24 fontC_gray_c6'>换个词语试试吧~</Text>
                                </View>
                        }
                        <AddCart openAdd={openAdd} callback={(e) =>(closeCart(e))} addInfo={addInfo} />
                        <LoadMore showLoad={showLoad} showNoMore={showNoMore} />
                    </View>
            }
        </View>
    )
}

export default connect(
    state => ({
        historyList: state.search.historyList,
        searchList: state.search.searchList,
        nowPage: state.search.nowPage,
        maxPage: state.search.maxPage
    }),
    dispatch => ({
        dispatchDeleteHistory(){
            dispatch(handleDeleteHistory());
        },
        dispatchFetchHistory(){
            dispatch(handleFetchHistory());
        },
        dispatchSearch(args){
            dispatch(handleSearch(args));
        },
        dispatchClearSearch(){
            dispatch(handleClearSearch());
        }

    })
)(
    Search
);


