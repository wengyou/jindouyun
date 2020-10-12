import React, { useState, useEffect } from 'react';
import Taro, { connectSocket } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtInput, AtImagePicker, AtSwitch, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtCard, AtButton } from 'taro-ui';
import './updateGoods.scss'
import * as common from '../../utils/common'
import * as user from '../../actions/user'
import * as order from '../../actions/order'

const UpdateGoods = props => {
    const {goodsDetail, updateGoods} = props;
    const [goods, setGoods] = useState({});
    const [gallery , setGallery] = useState([])
    const [specifications, setSpecifications] = useState([]);
    const [products, setProducts] = useState([]);
    const [standard, setStandard] = useState(true);
    const [addVisible, setAddVisible] = useState(false);
    const [specsVisible, setSpecsVisible] = useState(false);
    const [productsIndex, setProductsIndex] = useState(0);
    const [updateSpesc, setUpdateSpesc] = useState('1');
    const [updateProducts, setUpdateProducts] = useState('2');
    const [deleteSpecs, setDeleteSpecs] = useState('');
    //规格
    const [specsUrl, setSpecsUrl] = useState([])
    const [specs, setSpecs] = useState({
        'specification': '',
        'value': '',
        'picUrl': specsUrl.length !== 0 ? specsUrl[0].url : ''
    })
    useEffect(() => {
        if(Object.keys(goodsDetail).length !==0) {
            setGoods(goodsDetail.goods);
            setSpecifications(goodsDetail.specifications);
            setProducts(goodsDetail.products)
            goodsDetail.specifications.length <= 1 && setStandard(true)
            goodsDetail.specifications.length > 1 && setStandard(false)
            goodsDetail.goods.gallery = goodsDetail.goods.gallery.map(item => ({"url": item}));
            setGallery(goodsDetail.goods.gallery)
        }
    }, [goodsDetail])
    useEffect(() => {
        if(specifications.length !==0) {
            let specsObj = {}
            const specsArr = common.processData(specifications);
            specsArr.map((item, index) => {
                if(specsArr.length > products.length && index >= products.length) {
                    specsObj = {
                        "id" : index, 
                        "specifications":item,
                        "price":0,
                        "number":0,
                        "url": ''
                    }
                    return setProducts(products.concat(specsObj))
                }
                setUpdateProducts(new Date())
            })
        }
    }, [specifications])
    useEffect(() => {
        setDeleteSpecs(new Date())
    }, [updateSpesc])
    useEffect(() => {
        if(deleteSpecs !== '' && specifications.length !== 0) {
            let specsObj = {}
            let productsArr = []
            const specsArr = common.processData(specifications);
            console.log(specsArr)
            specsArr.map((item, index) => {
                specsObj = {
                    "id" : index, 
                    "specifications":item,
                    "price":0,
                    "number":0,
                    "url": ''
                }
                return productsArr.push(specsObj)
            })
            setProducts(productsArr)
            setUpdateProducts(new Date())
        }
    }, [deleteSpecs])
    // useEffect(() => {
    //     setUpdateProducts(new Date())
    // }, [products.length])
    return (
        <View className='updateGoods_container bgColor'>
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
                        files={[{'url' : goods.picUrl}]}
                        onChange={(files) => setGoods({...goods, picUrl: files})}
                        onFail={mes => console.log(mes)}
                        onImageClick={(index, file) => console.log(index,file)}
                    />
                    <Text className='uploadImg'>商品详情图片</Text>
                    <AtImagePicker
                        files={gallery}
                        onChange={(files) => setGallery(files)}
                        onFail={mes => console.log(mes)}
                        onImageClick={(index, file) => console.log(index,file)}
                    />
                </View>
                <View key = {updateSpesc}>
                    <View className='title'>商品规格</View>
                    <AtSwitch title='默认标准规格' checked={standard} />
                    {
                        !standard && <Button className='addBtn' onClick={() => setSpecsVisible(true)}>添加规格</Button>
                    }
                    {/* 显示商品规格信息 */}
                    {
                        specifications.length !==0 && specifications.map((item, index) => {
                            return (
                                <AtCard
                                    key={index}
                                    title={item.specification || '标准'}
                                    thumb={item.picUrl || ''}
                                >
                                    <View className='flexRow_wd'>
                                        <Text>规格值：{item.value}</Text>
                                        <Button 
                                            className='deleteBtn'
                                            type='primary' 
                                            size='small'
                                            onClick={() => {
                                                specifications.splice(index, 1);
                                                setSpecifications(specifications)
                                                setUpdateSpesc(new Date())
                                            }}
                                        >
                                            删除
                                        </Button>
                                    </View>
                                </AtCard>
                            )
                        })
                    }
                    {/* 添加商品规格 */}
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
                                        setSpecifications(specifications.concat(newSpecs))
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
                </View>
                {/* 商品库存 */}
                <View key={updateProducts}>
                    <View className='title'>商品库存</View>
                    {/* 显示货品信息 */}
                    {
                        products.length !==0 && products.map((item, index) => {
                            console.log(item)
                            return(
                                <AtCard
                                    key={index}
                                    title={item.specifications.toString()}
                                    // thumb={item.url || ''}
                                >
                                    <View className='flexCol_wd'>
                                        <Text>货品售价：{item.price}</Text>
                                        <Text>货品数量：{item.number}</Text>
                                        <Text>货品图片：</Text>
                                        <Image style={{width: '100px', height: '100px'}} src={item.url} />
                                        <Button 
                                            className='setBtn'
                                            type='primary' 
                                            size='small'
                                            onClick={() => {
                                                // setAddVisible(true);
                                                // setSpecsArrIndex(index)
                                                setAddVisible(true)
                                                setProductsIndex(index)
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
                                value={products.length !== 0 && products[productsIndex].specification} 
                                disabled={true}
                            />
                            <AtInput 
                                name='price' 
                                title='货品售价' 
                                type='text' 
                                placeholder='' 
                                value={products.length !== 0 && products[productsIndex].price} 
                                onChange={(e) => {
                                    products[productsIndex].price = e;
                                    setProducts(products)
                                }} 
                            />
                            <AtInput 
                                name='number' 
                                title='货品数量' 
                                type='text' 
                                placeholder='' 
                                value={products.length !== 0 && products[productsIndex].number} 
                                onChange={(e) => {
                                    products[productsIndex].number = e;
                                    setProducts(products)
                                }} 
                            />
                            <AtImagePicker
                                files={[{'url' : (products.length !== 0 && products[productsIndex].url) || ''}]}
                                onChange={(files) => {
                                        products[productsIndex].url = files[0].url;
                                        setProducts(products)
                                    }
                                }
                                count={1}
                            />
                        </AtModalContent>
                        <AtModalAction> 
                            <Button 
                                onClick={() => {
                                    setAddVisible(false)
                                }}
                            >
                                取消
                            </Button> 
                            <Button
                                onClick={() => {
                                    setAddVisible(false);
                                }}
                            >
                                确定
                            </Button> 
                        </AtModalAction>
                    </AtModal>
                </View>
                {/* 更新商品 */}
                <Button 
                    className='addBtn'
                    onClick={() => {
                        updateGoods({
                            'goods': {
                                "id": goods.id,
                                "picUrl":goods.picUrl,
                                "gallery": common.getObjectValues(gallery),
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
                            'specifications': specifications,
                            'products': products,
                            'attributes': []
                        });
                    }}
                >
                    修改商品信息
                </Button>
            </View>
        </View>
    )
}

export default connect(
    state => ({
        goodsDetail: state.order.goodsDetail,
    }),
    dispatch => ({
        updateGoods(args) {
            dispatch(order.updateGoods(args))
        }
    })
)(UpdateGoods)