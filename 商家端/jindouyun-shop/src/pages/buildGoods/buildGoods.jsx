import React, { useState, useEffect } from 'react';
import Taro, { connectSocket } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtInput, AtImagePicker, AtSwitch, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtCard, AtButton } from 'taro-ui';
import './buildGoods.scss'
import * as common from '../../utils/common'
import * as user from '../../actions/user'
import * as order from '../../actions/order'

const BuildGoods = props => {
    const {createGoods, loginFlag, goodsInfo, goodsDetail, isBuild, updateGoods} = props;
    const [goods, setGoods] = useState({
            "picUrl":[],
            "gallery":[],
            "isHot":false,
            "isNew":true,
            "isOnSale":true,
            "goodsSn":"111",
            "name": "",
            "originPrice":"",
            "nowPrice": "",
            "categoryId":1010003,
            "keyword":"",
            "brandId":1,
            "brief":  ""
    })
    const [galleryArr, setGalleryArr] = useState([])
    useEffect(() => {
        goods.gallery.length !== 0 && goods.gallery.map(item => {
            setGalleryArr(galleryArr.concat(item.url));
        })
    }, [goods.gallery])
    //规格
    const [specsUrl, setSpecsUrl] = useState([])
    const [specs, setSpecs] = useState({
        'specification': '',
        'value': '',
        'picUrl': specsUrl.length !== 0 ? specsUrl[0].url : ''
    })
    //库存
    const [productsUrl, setProductsUrl] = useState([])
    const [productsObj, setProductsObj] = useState({
        'id': '',
        "specifications": [],
        "price":"",
        "number":"",
        "url": productsUrl.length !==0 ? productsUrl[0].url : ''
    })
    const [specsArr, setSpecsArr] = useState([])
    const [standard, setStandard] = useState(true)
    const [specsVisible, setSpecsVisible] = useState(false)
    const [addVisible, setAddVisible] = useState(false);
    const [specsArrIndex, setSpecsArrIndex] = useState(0);
    const [productsArr, setProductsArr] = useState([]);
    useEffect(() => {
        specsArr.length !==0 && setProductsArr(common.processData(specsArr));
    }, [specsArr])
    const [products, setProducts] = useState([])
    console.log(products)
    return(
        <View className='buildGoods_container bgColor'>
            <View className='white_box'>
                {/* 商品信息 */}
                <View>
                    <AtInput
                        name='goodsName'
                        title='商品名称'
                        type='text'
                        placeholder='请输入商品名称'
                        value={goods.name}
                        onChange={e => {setGoods({...goods, name: e})}}
                    />
                    <AtInput
                        name='originPrice'
                        title='商品原价'
                        type='text'
                        placeholder=''
                        value={goods.originPrice}
                        onChange={e => {setGoods({...goods, 'originPrice': e})}}
                    />
                    <AtInput
                        name='nowPrice'
                        title='商品现价'
                        type='text'
                        placeholder=''
                        value={goods.nowPrice}
                        onChange={e => {setGoods({...goods, 'nowPrice': e})}}
                    />
                    {/* <AtRadio
                        options={[
                            { label: '在售', value: true,},
                            { label: '未售', value: false},
                        ]}
                        value={form.isOnSale}
                        onClick={e => setForm({...form, 'isOnSale': e})}
                    /> */}
                    <AtInput
                        name='desc'
                        title='商品简介'
                        type='text'
                        placeholder='请输入对商品描述'
                        value={goods.brief}
                        onChange={e => {setGoods({...goods, 'brief': e})}}
                    />
                    {/* 选择图片 */}
                    <Text className='uploadImg'>商品图片（只需传一张）</Text>
                    <AtImagePicker
                        files={goods.picUrl}
                        onChange={(files) => setGoods({...goods, picUrl: files})}
                        onFail={mes => console.log(mes)}
                        onImageClick={(index, file) => console.log(index,file)}
                        count={1}
                    />
                    <Text className='uploadImg'>商品详情图片</Text>
                    <AtImagePicker
                        files={goods.gallery}
                        onChange={(files) => setGoods({...goods, gallery: files})}
                        onFail={mes => console.log(mes)}
                        onImageClick={(index, file) => console.log(index,file)}
                    />
                </View>
                {/* 规格 */}
                <View>
                    <View className='title'>商品规格</View>
                    <AtSwitch title='默认标准规格' checked={standard} onChange={() => setStandard(!standard)} />
                    {
                        !standard && <Button className='addBtn' onClick={() => setSpecsVisible(true)}>添加规格</Button>
                    }
                    {/* 设置商品规格 */}
                    <AtModal isOpened={specsVisible}>
                        <AtModalHeader>设置规格</AtModalHeader>
                        <AtModalContent>
                            <AtInput 
                                name='specification' 
                                title='规格名' 
                                type='text' 
                                placeholder='' 
                                value={specs.specification} 
                                onChange={(e) => setSpecs({...specs, specification: e})} 
                            />
                            <AtInput 
                                name='value' 
                                title='规格值' 
                                type='text' 
                                placeholder='' 
                                value={specs.value} 
                                onChange={(e) => setSpecs({...specs, value: e})} 
                            />
                            <AtImagePicker
                                files={specsUrl}
                                onChange={(files) => {setSpecsUrl(files)}}
                            />
                        </AtModalContent>
                        <AtModalAction> 
                            <Button 
                                onClick={() => {
                                    setSpecsVisible(false)
                                    setSpecs({
                                        'specification': '',
                                        'value': '',
                                        'picUrl': ''
                                    })
                                }}
                            >
                                取消
                            </Button> 
                            <Button
                                onClick={() => {
                                    if(specs.specification === '') {
                                        Taro.showToast({title: '填写规格名'})
                                    } else if(specs.value === '') {
                                        Taro.showToast({title: '填写规格值'})
                                    } else if(specsUrl === '') {
                                        Taro.showToast({title: '添加图片'})
                                    } else {
                                        const newSpecs = {
                                            'specification': specs.specification,
                                            'value': specs.value,
                                            'picUrl': specsUrl[0].url
                                        }
                                        setSpecsArr(specsArr.concat(newSpecs))
                                        setSpecsVisible(false)
                                        setSpecs({
                                            'specification': '',
                                            'value': '',
                                            'picUrl': ''
                                        })
                                    }
                                }}
                            >
                                确定
                            </Button> 
                        </AtModalAction>
                    </AtModal>
                    {/* 显示商品规格信息 */}
                    {
                        specsArr.length !==0 && specsArr.map((item, index) => {
                            return (
                                <AtCard
                                    key={index}
                                    title={item.specification}
                                    thumb={item.picUrl}
                                >
                                    <View className='flexRow_wd'>
                                        <Text>规格值：{item.value}</Text>
                                        <Button 
                                            className='deleteBtn'
                                            type='primary' 
                                            size='small'
                                            onClick={() => {
                                                specsArr.splice(index, 1);
                                                setSpecsArr(specsArr)
                                            }}
                                        >
                                            删除
                                        </Button>
                                    </View>
                                </AtCard>
                            )
                        })
                    }
                </View>
                {/* 库存 */}
                <View>
                    {
                         (productsArr.length !==0 || standard) && <View className='title'>商品库存</View>
                    }
                    {
                        standard &&
                        <AtCard title='标准'>
                            <View className='flexCol_wd'>
                                <Text>货品售价：{(products.length !==0 && products[0].price) || '0' }</Text>
                                <Text>货品数量：{(products.length !==0 && products[0].number || '0')}</Text>
                                <Image style={{width: '100px', height: '100px', margin: '10px'}} src={products.length !==0 && products[0].url} />
                                <Button 
                                    className='setBtn'
                                    type='primary' 
                                    size='small'
                                    onClick={() => {
                                        setAddVisible(true);
                                    }}
                                >
                                    设置
                                </Button>
                            </View>
                        </AtCard> 
                    }
                    {/* 显示货品信息 */}
                    {
                        productsArr.length !==0 && productsArr.map((item, index) => {
                            return(
                                <AtCard
                                    key={index}
                                    title={item.toString()}
                                >
                                    <View className='flexCol_wd'>
                                        <Text>货品售价：{(products[index] && products[index].price) || '0'}</Text>
                                        <Text>货品数量：{(products[index] && products[index].number) || '0'}</Text>
                                        <Image style={{width: '100px', height: '100px'}} src={products[index] && products[index].url} />
                                        <Button 
                                            className='setBtn'
                                            type='primary' 
                                            size='small'
                                            onClick={() => {
                                                setAddVisible(true);
                                                setSpecsArrIndex(index);
                                            }}
                                        >
                                            设置
                                        </Button>
                                    </View>
                                </AtCard> 
                            )
                        })
                    }
                   
                    {/* 添加货品 */}
                    <AtModal isOpened={addVisible}>
                        <AtModalHeader>添加货品</AtModalHeader>
                        <AtModalContent>
                            <AtInput 
                                name='speci' 
                                title='货品规格列' 
                                type='text' 
                                placeholder='' 
                                value={productsArr[specsArrIndex] || '标准'} 
                                onChange={(e) => {setProductsObj({...productsObj, specification: e})}} 
                                disabled={true}
                            />
                            <AtInput 
                                name='price' 
                                title='货品售价' 
                                type='text' 
                                placeholder='' 
                                value={productsObj.price} 
                                onChange={(e) => setProductsObj({...productsObj, price: e})} 
                            />
                            <AtInput 
                                name='number' 
                                title='货品数量' 
                                type='text' 
                                placeholder='' 
                                value={productsObj.number} 
                                onChange={(e) => setProductsObj({...productsObj, number: e})} 
                            />
                            <AtImagePicker
                                files={productsUrl}
                                onChange={(files) => {setProductsUrl(files)}}
                            />
                        </AtModalContent>
                        <AtModalAction> 
                            <Button 
                                onClick={() => {
                                    setAddVisible(false);
                                    setProductsObj({
                                        'id': '',
                                        "specifications": productsArr[specsArrIndex],
                                        "price":"",
                                        "number":"",
                                        "url":''
                                    })
                                }}
                            >
                                取消
                            </Button> 
                            <Button
                                onClick={() => {
                                    const newProductsObj = {
                                        'id': 0,
                                        "specifications": productsArr[specsArrIndex] || ['标准'],
                                        "price":productsObj.price,
                                        "number":productsObj.number,
                                        "url":productsUrl[0].url
                                    }
                                    setProducts(products.concat(newProductsObj))
                                    setAddVisible(false);
                                    setProductsObj({
                                        'id': '',
                                        "specifications": productsArr[specsArrIndex] || ['标准'],
                                        "price":"",
                                        "number":"",
                                        "url":""
                                    })
                                }}
                            >
                                确定
                            </Button> 
                        </AtModalAction>
                    </AtModal>
                </View>
                <Button 
                    className='addBtn'
                    onClick={() => {
                        createGoods({
                            'goods': {
                                "picUrl":goods.picUrl[0].url,
                                "gallery": galleryArr,
                                "isHot":goods.isHot,
                                "isNew":goods.isNew,
                                "isOnSale":goods.isOnSale,
                                "goodsSn":goods.goodsSn,
                                "name":goods.name,
                                "originPrice":goods.originPrice,
                                "nowPrice":goods.nowPrice,
                                "categoryId":1010003,
                                "keyword":"",
                                "brandId":1,
                                "brief":goods.brief
                            },
                            'specifications': specsArr.length === 0 ? [{specification: "规格", value: "标准", picUrl: ""}] : specsArr,
                            'products': products,
                            'attributes': []
                        });
                    }}
                >
                    上传商品
                </Button> 
            </View>
        </View>
    )
}

export default connect(
    state => ({
        loginFlag: state.user.loginFlag,
        goodsInfo: state.user.goodsInfo,
        goodsDetail: state.order.goodsDetail,
        isBuild: state.user.isBuild
    }),
    dispatch => ({
        createGoods(args) {
            dispatch(user.createGoods(args))
        },
        updateGoods(args) {
            dispatch(order.updateGoods(args))
        }
    })
)(BuildGoods)