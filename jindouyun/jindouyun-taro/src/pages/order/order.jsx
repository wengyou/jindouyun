import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image, Input, ScrollView  } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar, AtTabs, AtTabsPane, AtTextarea  } from 'taro-ui'
import * as user from '../../actions/userInfo';
import './order.scss'
import OrderGoods from '../../components/orderDoods/orderGoods'
import Address from '../../components/address/address'
import Checkbox from '../../components/checkbox/checkbox'
import OrderInfo from '../../components/orderInfo/orderInfo'
import OrderTotal from '../../components/orderTotal/orderTotal'
import None from '../../assets/images/none.png'
import ToBePaid from '../../assets/images/to-be-paid.png'
import UnReceived from '../../assets/images/unReceived.png'

const Order = props => {
    const {searchOrderList, orderList, fetchOrderList, tabCurrent, addressList, fetchOrderDetail, orderPage, orderPages, searchOrder} = props;
    const tabList = [{ title: '全部' }, { title: '待付款' }, { title: '待收货' }]
    const [current, setCurrent] = useState(tabCurrent);
    const [flag, setFlag] = useState('');
    useEffect(() => {
        fetchOrderList();
    }, []);
    useEffect(() => {
        current === 0 && setFlag('all');
        current === 1 && setFlag('to-be-paid');
        current === 2 && setFlag('address')
    }, [current])
    const [unPaid, setUnpaid] = useState('');
    const [unReceived, setUnreceived] = useState('');
    useEffect(() => {
        orderList.length !== 0 && orderList.map(item => {
            item.orderStatusText === "未付款" && setUnpaid('have');
            item.orderStatusText === ("已发货" || "已付款") && setUnreceived('have')
        })
    }, [orderList])
    const [searchValue, setSearchValue] = useState('');
    return(
        <View className='order-container'>
            <AtSearchBar
                value={searchValue}
                placeholder='搜索订单'
                onChange={(e) => setSearchValue(e)}
                onActionClick={() => {
                    searchOrder(searchValue)
                }}
            />
            {/* 搜索订单 */}
            {
                searchOrderList.length !== 0 ? <View>
                    <ScrollView 
                            className='all item'
                            scrollY
                            scrollTop='0'
                            style={{height: '200vh'}}
                            scrollWithAnimation
                            lowerThreshold='50'
                        >
                            {
                                searchOrderList.list.map(item => {
                                    return ( 
                                        <View 
                                            className='wrapper' 
                                            key={item.id} 
                                            onClick={() => {
                                                fetchOrderDetail(item.id)
                                                Taro.navigateTo({url: '../orderDetail/orderDetail'})
                                            }}
                                        >
                                            <View className='box'
                                                onClick={() => {
                                                    fetchOrderDetail(item.id)
                                                    Taro.navigateTo({url: '../orderDetail/orderDetail'})
                                                }}
                                            >
                                                <Text className='num'>订单号：{item.orderSn}</Text>
                                                {
                                                    item.orderStatusText === "已收货" && <Text className='status'>交易成功</Text>
                                                }
                                                {
                                                    item.orderStatusText === "未付款" && <Text className='status'>未付款</Text>
                                                }
                                                {
                                                    item.orderStatusText === "已发货" && <Text className='status'>待收货</Text>
                                                }
                                            </View>                                            
                                            {
                                                item.goodsList.map(smallItem => {
                                                    return(
                                                        <OrderGoods key={smallItem.id} data={smallItem} />
                                                    )
                                                })
                                            }
                                            <Text className='pay'>实付款：<Text className='price'>￥{item.actualPrice}</Text></Text>
                                        </View>
                                    )
                                })
                            }
                            
                        </ScrollView>
                </View> :
                <AtTabs current={current} tabList={tabList} onClick={(value) => setCurrent(value)}>
                    {/* 全部 */}
                    <AtTabsPane current={current} index={0} >
                        <ScrollView 
                            className='all item'
                            scrollY
                            scrollTop='0'
                            style={{height: '200vh'}}
                            scrollWithAnimation
                            lowerThreshold='50'
                            onScrollToLower={() => {
                                if(orderPage+1 <= orderPages) {
                                    const page = orderPage + 1;
                                    fetchOrderList({"page": page})
                                } else {
                                    // console.log('没有了')
                                }
                            }}
                        >
                            {
                                orderList.length === 0 && <View className='none-wrapper'>
                                    <Image className='none-icon' src={None}  />
                                    <Text className='text'>您还没有订单~~</Text>
                                </View>
                            }
                            {
                                orderList.length !== 0 && orderList.map(item => {
                                    return ( 
                                        <View 
                                            className='wrapper' 
                                            key={item.id} 
                                            onClick={() => {
                                                fetchOrderDetail(item.id)
                                                Taro.navigateTo({url: '../orderDetail/orderDetail'})
                                            }}
                                        >
                                            <View className='box'>
                                                <Text className='num'>订单号：{item.orderSn}</Text>
                                                {
                                                    item.orderStatusText === "已收货" && <Text className='status'>交易成功</Text>
                                                }
                                                {
                                                    item.orderStatusText === "未付款" && <Text className='status'>未付款</Text>
                                                }
                                                {
                                                    item.orderStatusText === ("已发货" || "已付款") && <Text className='status'>待收货</Text>
                                                }
                                            </View>
                                            
                                            {
                                                item.goodsList.map(smallItem => {
                                                    return(
                                                        <OrderGoods key={smallItem.id} data={smallItem} />
                                                    )
                                                })
                                            }
                                            {
                                                item.orderStatusText === "已收货" && 
                                                <Text className='pay'>实付款：<Text className='price'>￥{item.actualPrice}</Text></Text>
                                            }
                                            {
                                                item.orderStatusText === "未付款" && 
                                                <Text className='pay'>应付款：<Text className='price'>￥{item.actualPrice}</Text></Text>
                                            }
                                            {
                                                item.orderStatusText === ("已发货" || "已付款") && 
                                                <Text className='pay'>实付款：<Text className='price'>￥{item.actualPrice}</Text></Text>
                                            }
                                        </View>
                                    )
                                })
                            }
                            
                        </ScrollView>
                    </AtTabsPane>
                    {/* 待付款 */}
                    <AtTabsPane current={current} index={1}>
                        <ScrollView 
                            className='paid item'
                            scrollY
                            scrollTop='0'
                            style={{height: '200vh'}}
                            scrollWithAnimation
                            lowerThreshold='70'
                            onScrollToLower={() => {
                                if(orderPage+1 <= orderPages) {
                                    const page = orderPage + 1;
                                    fetchOrderList({"page": page})
                                } else {
                                    console.log('没有了')
                                }
                            }}
                        >
                            {/* {
                                addressList.length !== 0 && addressList.map(item => {
                                    return (
                                        item.isDefault && 
                                        <Address data={item} />
                                    )
                                })
                            } */}
                            {
                                orderList.length !== 0 && orderList.map(item => {
                                    return(
                                        item.orderStatusText === "未付款" &&
                                        <View 
                                            className='content' 
                                            key={item.id} 
                                            onClick={() => {
                                                fetchOrderDetail(item.id)
                                                Taro.navigateTo({url: '../orderDetail/orderDetail'})
                                            }}
                                        >
                                            {
                                                item.goodsList.map(smallItem => {
                                                    return <OrderGoods key={smallItem.id} data={smallItem} parent={flag} /> 
                                                })
                                            }  
                                            <OrderTotal parent={flag} data={item} />                     
                                        </View>
                                    )
                                })
                            }  
                            {
                                unPaid !== 'have' && <View className='none-wrapper'>
                                    <Image className='none-icon' src={ToBePaid}  />
                                    <Text className='text'>您还没有待付款订单~~</Text>
                                </View>
                            }    
                        </ScrollView>
                    </AtTabsPane>
                    {/* 待收货 */}
                    <AtTabsPane current={current} index={2}>
                        <ScrollView 
                            className='receive item'
                            scrollY
                            scrollTop='0'
                            style={{height: '200vh'}}
                            scrollWithAnimation
                            lowerThreshold='50'
                            onScrollToLower={() => {
                                if(orderPage+1 <= orderPages) {
                                    const page = orderPage + 1;
                                    fetchOrderList({"page": page})
                                } else {
                                    console.log('没有了')
                                }
                            }}
                        >
                            {/* {
                                addressList.length !== 0 && addressList.map(item => {
                                    return (
                                        item.isDefault && 
                                        <Address data={item} />
                                    )
                                })
                            } */}
                            {/* {
                                unReceived === 'have' && 
                                <View className='distributor-phone'>
                                    <Text style={{marginLeft: '2vw'}}>配送员：小明</Text>
                                    <Text style={{marginLeft: '2vw'}}>联系电话：13637937511</Text>
                                </View>
                            }  */}
                            {
                                orderList.length !== 0 && orderList.map(item => {
                                    return(
                                        item.orderStatusText === ("已发货" || "已付款") && 
                                        <View 
                                            className='content' 
                                            key={item.id} 
                                            onClick={() => {
                                                fetchOrderDetail(item.id)
                                                Taro.navigateTo({url: '../orderDetail/orderDetail'})
                                            }}
                                        >
                                            {
                                                item.goodsList.map(smallItem => {
                                                    return <OrderGoods key={smallItem.id} data={smallItem} parent={flag} /> 
                                                })
                                            }  
                                            <OrderTotal parent={flag} data={item} />                     
                                        </View>  
                                    )
                                })
                            }   
                            {
                                unReceived !== 'have' && <View className='none-wrapper'>
                                    <Image className='none-icon' src={UnReceived}  />
                                    <Text className='text'>您还没有待收货订单~~</Text>
                                </View>
                            }  
                        </ScrollView>
                    </AtTabsPane>
                </AtTabs>
            }
            
            
        </View>
    )
}

export default connect(
    state => ({
        orderList: state.userInfo.orderList,
        tabCurrent: state.userInfo.current,
        addressList: state.userInfo.addressList,
        orderPage: state.userInfo.orderPage,
        orderPages: state.userInfo.orderPages,
        searchOrderList: state.userInfo.searchOrderList
    }),
    dispatch => ({
        fetchOrderList(args) {
            dispatch(user.fetchOrderList(args))
        },
        fetchOrderDetail(args) {
            dispatch(user.fetchOrderDetail(args))
        },
        searchOrder(args) {
            dispatch(user.searchOrder(args))
        }
    })
)(Order)