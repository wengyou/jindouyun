import React, { useEffect, useState } from 'react';
import { getCurrentInstance } from '@tarojs/taro';
import { connect } from 'react-redux';
import {View, Image, Swiper, SwiperItem} from '@tarojs/components';
import './index.scss';
import cart from '../../assets/images/cart_0.png';
import { fetchGoodsDetail } from "../../actions/detail";
import AddCart from "../../components/add_cart";
import {showLoading} from "../../utils/common";

const Detail = props => {

    const { goodsDetail, goodsGallery, goodsInfo,  dispatchFetchGoodsDetail } = props;

    const [openAdd, setOpenAdd] = useState(false);
    const [addInfo, setAddInfo] = useState({});
    const [imgList, setImgList] = useState([]);

    useEffect(() => {
        showLoading(true);
        dispatchFetchGoodsDetail({
            id: getCurrentInstance().router.params.id
        })
    }, []);
    useEffect(() => {
        setImgList([...goodsGallery])
    }, [goodsGallery]);

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
        <View className='flex direction_column detail_wrap'>
            <Swiper
                className='margin_row_s'
                indicatorDots={true}
                indicatorActiveColor='#fdb200'
            >
                {
                    goodsGallery.map((e,index) => {
                        return (
                            <SwiperItem
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    transform: 'translate(0%, 0%)'

                                }}
                                key={e}
                            >
                                <Image lazyLoad={true} className='detail_banner' src={e}/>
                            </SwiperItem>
                        )
                    })
                }
            </Swiper>
            <View className='flex between bgc_white padding_column_xxs padding_row_xs  margin_row_s'>
                <View>
                    <View className='fontS_36'>{goodsInfo.name}</View>
                    <View className='fontS_20 fontC_gray_c6' >{goodsInfo.brief}</View>
                </View>
                <View className='fontC_orange fontS_36'>¥{goodsInfo.nowPrice}</View>
            </View>
            <View className='margin_row_s padding_xs border_10 margin_column_xxs bgc_white'>
                <View className='fontS_36 padding_column_xs'>图文详情</View>
                <View className='flex direction_column center_row'>
                    {
                        imgList.map((e) => {
                            return (
                                <Image className='detail_img' key={e} src={e} />
                            )
                        })
                    }
                </View>
            </View>
            <View className='detail_footer fixed full_width'>
                <View className='flex'>
                    <View className='detail_footer_item detail_icon_wrap flex center bgc_yellow'>
                        <Image onClick={() => (addToCart('add', goodsInfo))} className='detail_icon' src={cart}/>
                    </View>
                    <View onClick={() => (addToCart('purchase', goodsInfo))} className='detail_footer_item fontS_36 fontC_white bgc_orange flex center flex_grow'>直接购买</View>
                </View>
            </View>
            <AddCart openAdd={openAdd} callback={(e) =>(closeCart(e))} addInfo={addInfo} />
        </View>
    )
}

export default connect(
    state => ({
        goodsDetail: state.detail.goodsDetail,
        goodsInfo: state.detail.goodsInfo,
        goodsGallery: state.detail.goodsGallery
    }),
    dispatch => ({
        dispatchFetchGoodsDetail(args){
            dispatch(fetchGoodsDetail(args));
        }
    })
)(
    Detail
);


