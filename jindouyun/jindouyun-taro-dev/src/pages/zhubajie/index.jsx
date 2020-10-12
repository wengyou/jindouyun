import React, { useState } from 'react';
import { connect } from 'react-redux'
import { View, Swiper, SwiperItem, Input, Image, Text, Button } from '@tarojs/components'
import { AtIcon, AtTabs, AtTabsPane, AtGrid } from 'taro-ui'
import './index.scss'
import { toSearch } from '../../utils/route';
import waimai from '../../assets/images/waimai.png';
import xuexiyongping from '../../assets/images/xuexiyongping.png';
import yinping from '../../assets/images/yinping.png';
import shenghuoyongping from '../../assets/images/shenghuoyongping.png';
import img from '../../assets/images/login/1.png';

const tabList = [{ title: '麻辣食品' }, { title: '方便食品' }, { title: '膨化食品' }, { title: '酒水饮料' }]

const Zhubajie = () => {

    const [current, setCurrent] = useState(0);

    //切换tab页面
    const changeCurrent = (value) => {
        setCurrent(value);
    }

    return (
        <View>
            {/* <View className='zhu_bg bgc_yellow full_width'></View> */}
            <View className='bgc_yellow flex center_column padding_row_s zhu_searchbar'>
                <Input className='zhu_search bgc_white border_10 flex_grow' onFocus={toSearch} />
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
                    <SwiperItem className='flex center'>
                        <View>11111测试</View>
                    </SwiperItem>
                    <SwiperItem  className='flex center'>
                        <View>22222测试</View>
                    </SwiperItem>
                    <SwiperItem  className='flex center'>
                        <View>3</View>
                    </SwiperItem>
                </Swiper>
                <View className='margin_column_xxs padding_column_xs bgc_white border_10 flex around'>
                    <View className='flex direction_column center'>
                        <Image className='zhu_icon' src={waimai} />
                        <Text className='zhu_icon_text fontC_70'>外卖</Text>
                    </View>
                    <View className='flex direction_column center'>
                        <Image className='zhu_icon' src={yinping} />
                        <Text className='zhu_icon_text fontC_70'>饮品</Text>
                    </View>
                    <View className='flex direction_column center'>
                        <Image className='zhu_icon' src={shenghuoyongping} />
                        <Text className='zhu_icon_text fontC_70'>生活用品</Text>
                    </View>
                    <View className='flex direction_column center'>
                        <Image className='zhu_icon' src={xuexiyongping} />
                        <Text className='zhu_icon_text fontC_70'>学习用品</Text>
                    </View>
                </View>
                <View className='zhu_goods padding_xxs bgc_white border_10'>
                    <View className='zhu_goods_title'>全部商品</View>
                    <View>    
                        <AtTabs current={current} tabList={tabList} onClick={changeCurrent}>
                            <AtTabsPane current={current} index={0}>
                                <View className='zhu_item'>
                                    <View className='flex padding_column_xxs padding_row_xs'>
                                        <Image className='zhu_item_img' src={img} />
                                        <View className='flex_grow flex direction_column'>
                                            <View className='flex_grow'> 
                                                <Text className='padding_row_xs fontC_26px'>撕撕素肉</Text>
                                                <View className='padding_row_xs fontS_20 fontC_91'>就顺遂</View>
                                            </View>
                                            <View className='flex between center_column'>
                                                <View className='padding_row_xs'>
                                                    <Text className='fontC_orange fontS_36'>¥ 5</Text>
                                                    <Text className='fontC_yellow fontS_20 padding_row_xxs'>月销 120</Text>
                                                </View>
                                                <View className='flex'>
                                                    <View className='zhu_item_btn bgc_yellow fontC_white fontS_24 border_10 flex center margin_row_xs'>添加</View>
                                                    <View className='zhu_item_btn bgc_orange fontC_white fontS_24 border_10 flex center'>购买</View>
                                                </View>
                                            </View>
                                        </View>    
                                    </View>
                                    <View className='flex padding_column_xxs padding_row_xs'>
                                        <Image className='zhu_item_img' src={img} />
                                        <View className='flex_grow flex direction_column'>
                                            <View className='flex_grow'> 
                                                <Text className='padding_row_xs fontC_26px'>撕撕素肉</Text>
                                                <View className='padding_row_xs fontS_20 fontC_91'>就顺遂</View>
                                            </View>
                                            <View className='flex between center_column'>
                                                <View className='padding_row_xs'>
                                                    <Text className='fontC_orange fontS_36'>¥ 5</Text>
                                                    <Text className='fontC_yellow fontS_20 padding_row_xxs'>月销 120</Text>
                                                </View>
                                                <View className='flex'>
                                                    <View className='zhu_item_btn bgc_yellow fontC_white fontS_24 border_10 flex center margin_row_xs'>添加</View>
                                                    <View className='zhu_item_btn bgc_orange fontC_white fontS_24 border_10 flex center'>购买</View>
                                                </View>
                                            </View>
                                        </View>    
                                    </View> 
                                    <View className='flex padding_column_xxs padding_row_xs'>
                                        <Image className='zhu_item_img' src={img} />
                                        <View className='flex_grow flex direction_column'>
                                            <View className='flex_grow'> 
                                                <Text className='padding_row_xs fontC_26px'>撕撕素肉</Text>
                                                <View className='padding_row_xs fontS_20 fontC_91'>就顺遂</View>
                                            </View>
                                            <View className='flex between center_column'>
                                                <View className='padding_row_xs'>
                                                    <Text className='fontC_orange fontS_36'>¥ 5</Text>
                                                    <Text className='fontC_yellow fontS_20 padding_row_xxs'>月销 120</Text>
                                                </View>
                                                <View className='flex'>
                                                    <View className='zhu_item_btn bgc_yellow fontC_white fontS_24 border_10 flex center margin_row_xs'>添加</View>
                                                    <View className='zhu_item_btn bgc_orange fontC_white fontS_24 border_10 flex center'>购买</View>
                                                </View>
                                            </View>
                                        </View>    
                                    </View>  
                                </View>
                            </AtTabsPane>
                            <AtTabsPane current={current} index={1}>111</AtTabsPane>
                            <AtTabsPane current={current} index={2}>111</AtTabsPane>
                            <AtTabsPane current={current} index={3}>111</AtTabsPane>
                        </AtTabs>
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
    Zhubajie
);

