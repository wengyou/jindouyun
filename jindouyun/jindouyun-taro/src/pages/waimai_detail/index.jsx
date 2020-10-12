import React, { useEffect } from 'react';
import { getCurrentInstance } from '@tarojs/taro';
import { connect } from 'react-redux'
import {View, Text, Image} from '@tarojs/components';
import GoodsList from "../../components/goods_list";
import GoodsHeader from "../../components/goods_header";
import {AtIcon} from "taro-ui";
import './index.scss';
import { handleFetchBrandDetail } from '../../actions/waimai';
import {showLoading} from "../../utils/common";
import LoadMore from "../../components/loadMore";

const WaimaiDetail = (props) => {

    const { brandDetail, goodsList, dispatchFetchBrandDetail } = props;
    const { couponList } = brandDetail;

    useEffect(() => {
        showLoading(true);
        dispatchFetchBrandDetail({
            id: getCurrentInstance().router.params.id
        });

    }, []);

    return (
        <View>
            <GoodsHeader title={getCurrentInstance().router.params.title}/>
            <View className='padding_row_s'>

                <View className='padding_xxs margin_column_xxs bgc_white border_10' >
                    <View className='flex'>
                        <Image className='wai_detail_img flex_grow_shrink bgc_f4' src={brandDetail.picUrl}/>
                        <View className='flex_grow padding_row_xs padding_column_xxs flex direction_column'>
                            <View className='flex_grow'>
                                <View className='flex between'>
                                    <View className='fontS_28'>{brandDetail.name}</View>
                                    <View className='flex center'>
                                        <AtIcon value='star-2' size='8' color='#fdb200'/>
                                        <View className='fontC_orange fontS_20'>5.0</View>
                                    </View>
                                </View>

                                <View className='fontC_91 fontS_20'>{brandDetail.desc}</View>

                                <View className='fontS_20 flex between'>
                                    <View className='fontC_orange'>
                                        <Text>起送 ¥{brandDetail.deliveryPrice}</Text>
                                        <Text className='padding_row_xxs'>人均 ¥{brandDetail.totalOrder === 0 ? 0 : Math.floor(brandDetail.totalTurnover / brandDetail.totalOrder)}</Text>
                                    </View>
                                    <View className='fontC_91'>
                                        {/*<Text className='padding_row_xxs'>40分钟</Text>*/}
                                        {/*<Text>600m</Text>*/}
                                        <Text>营业时间 {brandDetail.startTime}:00 - {brandDetail.endTime}:00</Text>
                                    </View>
                                </View>

                            </View>

                            <View className='flex' >
                                {
                                    Array.isArray(couponList) && couponList.map(coupon => {
                                        return (
                                            <View key={coupon.name} className='border_yellow border_10 padding_row_xxs wai_detail_tag fontS_20 fontC_yellow flex center'>{coupon.name}</View>
                                        )
                                    })
                                }
                            </View>

                        </View>
                    </View>

                    <View className='fontC_gray_c6 fontS_20 padding_column_xxs'>公告： {brandDetail.notice}</View>
                </View>
                <View style={{
                    paddingBottom: '20px'
                }}>
                    <GoodsList type={'waimai'} tabList={[]} id={getCurrentInstance().router.params.id} />
                </View>
            </View>

        </View>
    )
}

export default connect(
    state => ({
        brandDetail: state.waimai.brandDetail,
        goodsList: state.zhubajie.goodsList
    }),
    dispatch => ({
        dispatchFetchBrandDetail(args){
            dispatch(handleFetchBrandDetail(args))
        },
    })
)(
    WaimaiDetail
);

