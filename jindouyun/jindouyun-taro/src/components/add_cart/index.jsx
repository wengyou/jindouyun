import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import {View, Image} from '@tarojs/components';
import { AtFloatLayout } from "taro-ui";
import './index.scss';
import SelectBtn from "../select_btn";
import img from '../../assets/images/delete.png';
import { fetchGoodsDetail } from '../../actions/detail';
import { handleCartOrPurchase } from '../../actions/zhubajie';
import number from "../number/number";
import {showLoading, showMessage} from "../../utils/common";


const AddCart = props => {

    const { openAdd, callback, addInfo, productsList, specificationList, dispatchFetchDetail, dispatchCartOrPurchase } = props;
    const { type, info, page } = addInfo;
    const [selected, setSelected] = useState([]);
    const [combineArr, setCombine] = useState({});
    const [currentIndex, setCurrent] = useState(0);
    const [selectNum, setSelectNum] = useState(1);

    useEffect(() => {
        page === 'other' && addInfo !== {} &&
            dispatchFetchDetail({id: addInfo.info.id})
    }, [addInfo]);

    useEffect(() => {
        let temp = [];
        temp = productsList.map(e => {
            return e.specifications;
        });
        setCombine([...temp]);
        temp.length !== 0 && setSelected(temp[0]);
    }, [productsList]);


    useEffect(() => {
        console.log(info);
    }, [info])

    const changeColor = (index, valueIndex) => {
        selected[index] = specificationList[index].valueList[valueIndex].value;
        setSelected([...selected]);
        selected.length > index &&
        combineArr.map((e, index) => {
            if(e === selected){
                setCurrent(index);
            }
        })
    }

    const cartOrPurchase = (type) => {
        showLoading(true);
        if(selectNum !== 0 && productsList[currentIndex].id && selectNum <= productsList[currentIndex].number) {
            dispatchCartOrPurchase({
                type,
                goodsId: addInfo.info.id,
                productId: productsList[currentIndex].id,
                number: selectNum,
                closeFloatCallback: () => (closeFloat())
            })
        } else if(selectNum > productsList[currentIndex].number){
            showMessage('库存不足！', 'none');
        } else if(selectNum === 0) {
            showMessage('您还没有选择商品数量哦～', 'none');
        } else if(!productsList[currentIndex].id){
            showMessage('您还没有选择商品规格哦～', 'none');
        } else {
            showMessage('请选择商品！', 'none');
        }

    };
    //关闭悬浮窗
    const closeFloat = () => {
        callback(false);
        setSelected([]);
        setCurrent(0);
        setSelectNum(1);
    }

    return (
        <AtFloatLayout
            key={info}
            isOpened={openAdd}
            scrollY={true}
            title='选择规格'
            onClose={closeFloat}
        >
            <View className='add_cart_wrap'>
                <View className='flex center_column'>
                    <Image className='add_cart_img' src={info && info.picUrl} />
                    <View className='padding_row_s flex direction_column'>
                        <View className='fontS_36 fontC_orange'>价格:{productsList.length !== 0 && productsList[currentIndex].price}</View>
                        <View className='fontS_20 fontC_91'>库存:{productsList.length !== 0 && productsList[currentIndex].number}</View>
                    </View>
                </View>
                {
                    specificationList.map((e, index) =>{
                        return (
                            <View>
                                <View className='padding_column_xxs'>{e.name}</View>
                                <View className='flex flex_wrap'>
                                    {
                                        e.valueList.map((value, valueIndex) => {
                                            return (
                                                <View
                                                    key={valueIndex}
                                                    onClick={() => (changeColor(index, valueIndex))}
                                                    className={`add_cart_type padding_column_xxs padding_row_xs fontS_24 ${selected[index] === value.value ? 'add_cart_active' : 'add_cart_default'}`}
                                                >
                                                    {value.value}
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )
                    })
                }
                <View className='padding_column_xxs'>数量</View>
                <View className='flex'>
                    <SelectBtn num={selectNum} numcallBack={(e) =>(setSelectNum(e))} />
                </View>
            </View>
            {
                type === 'add' ?
                    <View onClick={() => (cartOrPurchase('cart'))} className='fixed add_cart_btn bgc_yellow fontS_30 fontC_white full_width flex center_row padding_column_s'>加入购物车</View>
                    :
                    <View
                        onClick={() => {(cartOrPurchase('purchase'))}}
                        className='fixed add_cart_btn bgc_orange fontS_30 padding_column_s fontC_white full_width flex center_row padding_column_s'
                    >
                        立即购买
                    </View>
            }
        </AtFloatLayout>
    )
}

export default connect(
    state => ({
        productsList: state.detail.productsList,
        specificationList: state.detail.specificationList
    }),
    dispatch => ({
        dispatchFetchDetail(args){
            dispatch(fetchGoodsDetail(args))
        },
        dispatchCartOrPurchase(args){
            dispatch(handleCartOrPurchase(args))
        }
    })
)(
    AddCart
);

