# JinDouYun 商家端

## 鉴权

### 接口 /merchant/auth/login

账号密码登录

POST

| 参数     | 类型 | 是否必须 | 说明   |
| -------- | ---- | -------- | ------ |
| username | str  | 是       | 用户名 |
| password | str  | 是       | 密码   |

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "merchant": {
            "brandInfo": {
                "id": 2,
                "name": "奶茶",
                "desc": "好喝",
                "picUrl": "",
                "start_time": 9,
                "end_time": 22,
                "delivery_price": 10.00,
                "average_price": 0,
                "today_order": 0,
                "status": 0
            },
            "userInfo": {
                "nickName": "user123",
                "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/xDReHukEe6LYUrEfL54FibRic2PrHJlc16kHXVQhicWrBLq750xcBFv4TZuRXDsww1giaBHsEMt7wwFspHxW1xS9zA/132",
                "country": "269",
                "province": "22",
                "city": "22",
                "gender": 2
            },
            "address": {
                "id": 2,
                "name": "admin",
                "userId": 1,
                "province": "22",
                "city": "22",
                "county": "269",
                "building": 12,
                "addressDetail": "111122222",
                "areaCode": "500100",
                "postalCode": "",
                "tel": "18723746541",
                "isDefault": false,
                "addTime": "2020-07-26 07:41:23",
                "updateTime": "2020-07-31 06:57:42",
                "deleted": false
            },
            "auth": true,
            "apply": false
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGxpdGVtYWxsIHRva2VuIiwiYXVkIjoiTUlOSUFQUCIsImlzcyI6IkxJVEVNQUxMIiwiZXhwIjoxNTk3NzQzOTcxLCJ1c2VySWQiOjEwMDAwMDksImlhdCI6MTU5NzczNjc3MX0.xp5QYUksb2c1HZpofPBGtg8mQwldMlDeLGrCGFj4rZU"
    },
    "errmsg": "成功"
}
~~~



### 接口/merchant/auth/login_by_weixin

微信登录

POST

| 参数     | 类型     | 是否必须 | 说明         |
| -------- | -------- | -------- | ------------ |
| code     | str      | 是       | jscode       |
| userInfo | userInfo | 是       | 用户信息对象 |

#### userInfo对象

| 属性      | 类型 | 说明     |
| --------- | ---- | -------- |
| nickName  | str  | 昵称     |
| avatarUrl | str  | 头像链接 |
| country   | str  | 国家     |
| province  | str  | 省份     |
| city      | str  | 城市     |
| language  | str  | 语言     |
| gender    | byte | 性别     |

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "merchant": {
            "brandInfo": {
                "id": 2,
                "name": "奶茶",
                "desc": "好喝",
                "picUrl": "",
                "start_time": 9,
                "end_time": 22,
                "delivery_price": 10.00,
                "average_price": 0,
                "today_order": 0,
                "status": 0
            },
            "userInfo": {
                "nickName": "user123",
                "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/xDReHukEe6LYUrEfL54FibRic2PrHJlc16kHXVQhicWrBLq750xcBFv4TZuRXDsww1giaBHsEMt7wwFspHxW1xS9zA/132",
                "country": "269",
                "province": "22",
                "city": "22",
                "gender": 2
            },
            "address": {
                "id": 2,
                "name": "admin",
                "userId": 1,
                "province": "22",
                "city": "22",
                "county": "269",
                "building": 12,
                "addressDetail": "111122222",
                "areaCode": "500100",
                "postalCode": "",
                "tel": "18723746541",
                "isDefault": false,
                "addTime": "2020-07-26 07:41:23",
                "updateTime": "2020-07-31 06:57:42",
                "deleted": false
            },
            "auth": true,
            "apply": false
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGxpdGVtYWxsIHRva2VuIiwiYXVkIjoiTUlOSUFQUCIsImlzcyI6IkxJVEVNQUxMIiwiZXhwIjoxNTk3NzQzOTcxLCJ1c2VySWQiOjEwMDAwMDksImlhdCI6MTU5NzczNjc3MX0.xp5QYUksb2c1HZpofPBGtg8mQwldMlDeLGrCGFj4rZU"
    },
    "errmsg": "成功"
}
~~~



### 接口 /merchant/auth/register

申请注册为商家

POST

| 参数    | 类型 | 是否必须 | 说明     |
| ------- | ---- | -------- | -------- |
| name    | str  | 是       | 店铺名称 |
| desc    | str  | 否       | 描述     |
| picUrl  | str  | 否       | 店铺头像 |
| address | str  | 是       | 地址     |
| phone   | str  | 是       | 电话     |

返回示例

~~~json
{
    "errno": 0,
    "errmsg": "成功"
}
~~~



### 接口/merchant/auth/info

获取详情

GET

参数：无

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "merchant": {
            "brandInfo": {
                "id": 2,
                "name": "奶茶",
                "desc": "好喝",
                "picUrl": "",
                "start_time": 9,
                "end_time": 22,
                "delivery_price": 10.00,
                "average_price": 0,
                "today_order": 0,
                "status": 0
            },
            "userInfo": {
                "nickName": "user123",
                "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/xDReHukEe6LYUrEfL54FibRic2PrHJlc16kHXVQhicWrBLq750xcBFv4TZuRXDsww1giaBHsEMt7wwFspHxW1xS9zA/132",
                "country": "269",
                "province": "22",
                "city": "22",
                "gender": 2
            },
            "address": {
                "id": 2,
                "name": "admin",
                "userId": 1,
                "province": "22",
                "city": "22",
                "county": "269",
                "building": 12,
                "addressDetail": "111122222",
                "areaCode": "500100",
                "postalCode": "",
                "tel": "18723746541",
                "isDefault": false,
                "addTime": "2020-07-26 07:41:23",
                "updateTime": "2020-07-31 06:57:42",
                "deleted": false
            },
            "auth": true,
            "apply": false
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGxpdGVtYWxsIHRva2VuIiwiYXVkIjoiTUlOSUFQUCIsImlzcyI6IkxJVEVNQUxMIiwiZXhwIjoxNTk3NzQzOTcxLCJ1c2VySWQiOjEwMDAwMDksImlhdCI6MTU5NzczNjc3MX0.xp5QYUksb2c1HZpofPBGtg8mQwldMlDeLGrCGFj4rZU"
    },
    "errmsg": "成功"
}
~~~



### 接口 /merchant/auth/logout

退出登录

POST

返回示例

~~~json
{
    "errno": 0,
    "errmsg": "成功"
}
~~~



## 店铺管理

### 接口 /merchant/brand/update

更新店铺信息

POST

| 参数          | 类型 | 是否必须 | 说明         |
| ------------- | ---- | -------- | ------------ |
| name          | str  | 否       | 店铺名称     |
| notice        | str  | 否       | 公告         |
| startTime     | byte | 否       | 营业开始时间 |
| endTime       | byte | 否       | 营业结束时间 |
| phone         | str  | 否       | 电话         |
| addressDetail | str  | 否       | 详细地址     |
| deliveryPrice | str  | 否       | 起送费       |

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "merchant": {
            "brandInfo": {
                "id": 2,
                "name": "奶茶",
                "desc": "好喝",
                "picUrl": "",
                "start_time": 9,
                "end_time": 22,
                "delivery_price": 10.00,
                "average_price": 0,
                "today_order": 0,
                "status": 0
            },
            "userInfo": {
                "nickName": "user123",
                "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/xDReHukEe6LYUrEfL54FibRic2PrHJlc16kHXVQhicWrBLq750xcBFv4TZuRXDsww1giaBHsEMt7wwFspHxW1xS9zA/132",
                "country": "269",
                "province": "22",
                "city": "22",
                "gender": 2
            },
            "address": {
                "id": 2,
                "name": "admin",
                "userId": 1,
                "province": "22",
                "city": "22",
                "county": "269",
                "building": 12,
                "addressDetail": "111122222",
                "areaCode": "500100",
                "postalCode": "",
                "tel": "18723746541",
                "isDefault": false,
                "addTime": "2020-07-26 07:41:23",
                "updateTime": "2020-07-31 06:57:42",
                "deleted": false
            },
            "auth": true,
            "apply": false
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGxpdGVtYWxsIHRva2VuIiwiYXVkIjoiTUlOSUFQUCIsImlzcyI6IkxJVEVNQUxMIiwiZXhwIjoxNTk3NzQzOTcxLCJ1c2VySWQiOjEwMDAwMDksImlhdCI6MTU5NzczNjc3MX0.xp5QYUksb2c1HZpofPBGtg8mQwldMlDeLGrCGFj4rZU"
    },
    "errmsg": "成功"
}
~~~



### 接口 /merchant/brand/updateStatus

更改营业状态 0：打烊，1：营业

POST

| 参数   | 类型 | 是否必须 | 说明                   |
| ------ | ---- | -------- | ---------------------- |
| status | byte | 是       | 状态，0：打烊，1：营业 |

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "brandInfo": {
            "id": 2,
            "name": "name",
            "desc": "好喝",
            "notice": "notice",
            "picUrl": "",
            "start_time": 9,
            "end_time": 22,
            "delivery_price": 10.00,
            "average_price": 0,
            "today_order": 0,
            "status": 0
        },
        "userInfo": {
            "nickName": "user123",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/xDReHukEe6LYUrEfL54FibRic2PrHJlc16kHXVQhicWrBLq750xcBFv4TZuRXDsww1giaBHsEMt7wwFspHxW1xS9zA/132",
            "country": "269",
            "province": "22",
            "city": "22",
            "gender": 2
        },
        "address": {
            "id": 2,
            "name": "admin",
            "userId": 1,
            "province": "22",
            "city": "22",
            "county": "269",
            "building": 12,
            "addressDetail": "addressDetail",
            "areaCode": "500100",
            "postalCode": "",
            "tel": "18723746541",
            "isDefault": false,
            "addTime": "2020-07-26 07:41:23",
            "updateTime": "2020-08-18 15:47:10",
            "deleted": false
        },
        "auth": true,
        "apply": false
    },
    "errmsg": "成功"
}
~~~



## 订单管理

### 接口 /merchant/order/list

订单列表

GET

| 参数            | 类型         | 是否必须 | 说明           |
| --------------- | ------------ | -------- | -------------- |
| orderStatusList | List\<Short> | 否       | 订单状态列表   |
| brandId         | int          | 是       | 商家id         |
| mergeId         | int          | 否       | 合单id         |
| date            | time         | 否       | 时间，默认今天 |
| page            | int          | 否       | 默认1          |
| limit           | int          | 否       | 默认10         |
| sort            | str          | 否       | 默认add_time   |
| order           | str          | 否       | 默认desc       |

工作台订单

~~~
orderStatusList = 21,22
brandId = 当前商家id
~~~

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "total": 6,
        "pages": 1,
        "mergeInfo": [
            {
                "id": 9,
                "orderSn": "20200813197909",
                "message": "哈哈哈哈哈",
                "allPrice": 0,
                "num": 1,
                "type": 1,
                "release": 1,
                "status": 31,
                "releaseTime": "2020-08-16 20:02:28",
                "receiveTime": "2020-08-20 13:57:22",
                "brandOrder": {
                    "id": 1,
                    "orderId": 9,
                    "brandId": 1,
                    "userId": -1,
                    "deliveryId": 1000001,
                    "status": 31,
                    "addTime": "2020-08-20 11:49:25",
                    "updateTime": "2020-08-20 11:49:29",
                    "deleted": false
                },
                "splitOrder": []
            },
            {
                "id": 13,
                "orderSn": "20200813197909",
                "message": "哈哈哈哈哈",
                "allPrice": 0,
                "num": 1,
                "type": 1,
                "release": 1,
                "status": 21,
                "releaseTime": "2020-08-16 20:02:28",
                "brandOrder": {
                    "id": 2,
                    "orderId": 13,
                    "brandId": 1,
                    "userId": -1,
                    "deliveryId": -1,
                    "status": 21,
                    "addTime": "2020-08-20 11:49:25",
                    "updateTime": "2020-08-20 11:49:25",
                    "deleted": false
                },
                "splitOrder": []
            },
            {
                "id": 16,
                "orderSn": "20200813197909",
                "message": "哈哈哈哈哈",
                "allPrice": 0,
                "num": 1,
                "type": 1,
                "release": 1,
                "status": 21,
                "releaseTime": "2020-08-16 20:02:28",
                "brandOrder": {
                    "id": 3,
                    "orderId": 16,
                    "brandId": 1,
                    "userId": -1,
                    "deliveryId": -1,
                    "status": 21,
                    "addTime": "2020-08-20 11:49:25",
                    "updateTime": "2020-08-20 11:49:25",
                    "deleted": false
                },
                "splitOrder": []
            },
            {
                "id": 19,
                "orderSn": "20200813197909",
                "message": "哈哈哈哈哈",
                "allPrice": 0,
                "num": 1,
                "type": 1,
                "release": 1,
                "status": 21,
                "releaseTime": "2020-08-16 20:02:28",
                "brandOrder": {
                    "id": 4,
                    "orderId": 19,
                    "brandId": 1,
                    "userId": -1,
                    "deliveryId": -1,
                    "status": 21,
                    "addTime": "2020-08-20 11:49:25",
                    "updateTime": "2020-08-20 11:49:25",
                    "deleted": false
                },
                "splitOrder": []
            },
            {
                "id": 22,
                "orderSn": "20200813197909",
                "message": "哈哈哈哈哈",
                "allPrice": 0,
                "num": 1,
                "type": 1,
                "release": 1,
                "status": 21,
                "releaseTime": "2020-08-16 20:02:28",
                "brandOrder": {
                    "id": 5,
                    "orderId": 22,
                    "brandId": 1,
                    "userId": -1,
                    "deliveryId": -1,
                    "status": 21,
                    "addTime": "2020-08-20 11:49:25",
                    "updateTime": "2020-08-20 11:49:25",
                    "deleted": false
                },
                "splitOrder": []
            },
            {
                "id": 25,
                "orderSn": "20200813197909",
                "message": "哈哈哈哈哈",
                "allPrice": 0,
                "num": 1,
                "type": 1,
                "release": 1,
                "status": 21,
                "releaseTime": "2020-08-16 20:02:28",
                "brandOrder": {
                    "id": 6,
                    "orderId": 25,
                    "brandId": 1,
                    "userId": -1,
                    "deliveryId": -1,
                    "status": 21,
                    "addTime": "2020-08-20 11:49:25",
                    "updateTime": "2020-08-20 11:49:25",
                    "deleted": false
                },
                "splitOrder": []
            }
        ],
        "limit": 10,
        "page": 1
    },
    "errmsg": "成功"
}
~~~



### 接口 /merchant/order/detail

子订单详情

GET

| 参数         | 类型 | 是否必须 | 说明     |
| ------------ | ---- | -------- | -------- |
| splitOrderId | int  | 是       | 子订单id |

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "brandVo": {
            "id": 2,
            "name": "奶茶"
        },
        "orderSplit": {
            "id": 12,
            "userId": 2,
            "brandId": 2,
            "orderId": 11,
            "mergeId": 9,
            "orderSn": "2020081200102",
            "orderStatus": 101,
            "consignee": "zhangsan",
            "mobile": "187238747734",
            "building": 0,
            "address": "aaa",
            "message": "aaa",
            "goodsPrice": 100,
            "addTime": "2020-08-12 12:55:44",
            "updateTime": "2020-08-12 14:45:32",
            "deleted": false
        },
        "orderGoods": [
            {
                "id": 15,
                "goodsName": "B-外卖1",
                "goodsSn": "0812007",
                "number": 1,
                "specifications": [
                    "标准"
                ]
            },
            {
                "id": 16,
                "goodsName": "B-外卖2",
                "goodsSn": "0812008",
                "number": 1,
                "specifications": [
                    "标准"
                ]
            },
            {
                "id": 17,
                "goodsName": "B-外卖3",
                "goodsSn": "0812009",
                "number": 1,
                "specifications": [
                    "标准"
                ]
            }
        ]
    },
    "errmsg": "成功"
}
~~~



### 接口 /merchant/order/completed

已完成、取消的子订单

GET

| 参数      | 类型    | 是否必须 | 说明                                  |
| --------- | ------- | -------- | ------------------------------------- |
| completed | boolean | 否       | true：已完成，false：以取消，默认true |
| page      | int     | 否       | 默认1                                 |
| limit     | int     | 否       | 默认10                                |
| sort      | str     | 否       | 默认add_time                          |
| order     | str     | 否       | 默认desc                              |

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "total": 1,
        "orderSplits": [
            {
                "orderSplit": {
                    "id": 11,
                    "userId": 2,
                    "brandId": 1,
                    "orderId": 11,
                    "mergeId": 8,
                    "orderSn": "20200812000101",
                    "orderStatus": 302,
                    "consignee": "zhangsan",
                    "mobile": "187238747734",
                    "building": 0,
                    "address": "aaa",
                    "message": "aaa",
                    "goodsPrice": 55.00,
                    "receiveTime": "2020-08-12 12:52:46",
                    "pickupTime": "2020-08-21 14:06:41",
                    "arriveTime": "2020-08-12 12:52:46",
                    "addTime": "2020-08-12 12:54:56",
                    "updateTime": "2020-08-14 15:49:47",
                    "deleted": false
                },
                "goods": [
                    {
                        "id": 12,
                        "goodsName": "A-外卖1",
                        "goodsSn": "0812004",
                        "number": 1,
                        "price": 18.00,
                        "specifications": [
                            "标准"
                        ],
                        "picUrl": "http://yanxuan.nosdn.127.net/66425d1ed50b3968fed27c822fdd32e0.png",
                        "isArrive": "2020-08-21 14:18:18"
                    },
                    {
                        "id": 13,
                        "goodsName": "A-外卖2",
                        "goodsSn": "0812005",
                        "number": 1,
                        "price": 12.00,
                        "specifications": [
                            "标准"
                        ],
                        "picUrl": "http://yanxuan.nosdn.127.net/66425d1ed50b3968fed27c822fdd32e0.png",
                        "isArrive": "2020-08-21 14:18:18"
                    },
                    {
                        "id": 14,
                        "goodsName": "A-外卖3",
                        "goodsSn": "0812006",
                        "number": 1,
                        "price": 25.00,
                        "specifications": [
                            "标准"
                        ],
                        "picUrl": "http://yanxuan.nosdn.127.net/66425d1ed50b3968fed27c822fdd32e0.png",
                        "isArrive": "2020-08-21 14:18:18"
                    }
                ]
            }
        ],
        "pages": 1,
        "limit": 10,
        "page": 1
    },
    "errmsg": "成功"
}
~~~



### 接口 /merchant/order/queryDelivery

根据合单id，查询配送员

GET

| 参数    | 类型 | 是否必须 | 说明   |
| ------- | ---- | -------- | ------ |
| mergeId | int  | 是       | 合单id |

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "id": 3,
        "user": {
            "id": 1000001,
            "nickname": "尤宫羽",
            "avatar": "https://wx.qlogo.cn/mmopen/vi_32/ibXbRJ3yOT4icbId3dVGK18SbhetzrtqouiazUBUm1KCfunoNX7Tt1YXnmeX2DpAvmvcH1unpKJ3scNH3ZC4TCWsA/132",
            "mobile": ""
        },
        "todayStatus": 0,
        "workType": 1,
        "workStatus": 1
    },
    "errmsg": "成功"
}
~~~





### 接口 /merchant/order/receive

接单

POST

| 参数    | 类型 | 是否必须 | 说明   |
| ------- | ---- | -------- | ------ |
| mergeId | int  | 是       | 合单id |

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "id": 9,
        "adminId": 1,
        "orderSn": "20200813197909",
        "message": "哈哈哈哈哈",
        "num": 1,
        "allPrice": 0.00,
        "type": 1,
        "release": 1,
        "status": 22,
        "releaseTime": "2020-08-16 20:02:28",
        "addTime": "2020-08-13 09:17:36",
        "updateTime": "2020-08-21 17:12:53",
        "deleted": true
    },
    "errmsg": "成功"
}
~~~



### 接口 /merchant/order/cancel

取消子订单

POST

| 参数         | 类型 | 是否必须 | 说明     |
| ------------ | ---- | -------- | -------- |
| splitOrderId | int  | 是       | 子订单id |

返回示例

~~~json
{
    "errno": 0,
    "errmsg": "成功"
}
~~~



### 接口 /merchant/goods/list

获取所有商品

POST

参数：无

返回示例

~~~json
{
    "errno": 0,
    "data": [
        {
            "id": 1036003,
            "goodsSn": "1036002",
            "name": "高山苦荞麦枕",
            "categoryId": 1008008,
            "brandId": 1,
            "gallery": [
                "http://yanxuan.nosdn.127.net/1c3acbfaa67a1a2034c53d6a12b87b5b.jpg",
                "http://yanxuan.nosdn.127.net/49366cac271c5614501660ccf2c886a6.jpg",
                "http://yanxuan.nosdn.127.net/6def3e5d0f22d46c20f88304f2dd1f23.jpg",
                "http://yanxuan.nosdn.127.net/49844b0d390c2a1cf6147e80de8c2e51.jpg"
            ],
            "keywords": "",
            "brief": "原生苦荞，健康护颈",
            "isOnSale": true,
            "sortOrder": 5,
            "picUrl": "http://yanxuan.nosdn.127.net/ffd7efe9d5225dff9f36d5110b027caa.png",
            "originPrice": 119.00,
            "nowPrice": 99.00,
            "addTime": "2018-02-01 00:00:00",
            "updateTime": "2018-02-01 00:00:00",
            "deleted": false
        },
        {
            "id": 1036004,
            "goodsSn": "1036002",
            "name": "高山苦荞麦枕",
            "categoryId": 1008008,
            "brandId": 1,
            "gallery": [
                "http://yanxuan.nosdn.127.net/1c3acbfaa67a1a2034c53d6a12b87b5b.jpg",
                "http://yanxuan.nosdn.127.net/49366cac271c5614501660ccf2c886a6.jpg",
                "http://yanxuan.nosdn.127.net/6def3e5d0f22d46c20f88304f2dd1f23.jpg",
                "http://yanxuan.nosdn.127.net/49844b0d390c2a1cf6147e80de8c2e51.jpg"
            ],
            "keywords": "",
            "brief": "原生苦荞，健康护颈",
            "isOnSale": true,
            "sortOrder": 5,
            "picUrl": "http://yanxuan.nosdn.127.net/ffd7efe9d5225dff9f36d5110b027caa.png",
            "originPrice": 119.00,
            "nowPrice": 99.00,
            "addTime": "2018-02-01 00:00:00",
            "updateTime": "2018-02-01 00:00:00",
            "deleted": false
        },
        {
            "id": 1036005,
            "goodsSn": "1030004",
            "name": "日式穿线绣四件套",
            "categoryId": 1008009,
            "brandId": 1,
            "gallery": [
                "http://yanxuan.nosdn.127.net/ff71d72ea77f23c6ebc7f77dd88ab947.jpg",
                "http://yanxuan.nosdn.127.net/a846819b20cde76700c3e6c9179fff03.jpg",
                "http://yanxuan.nosdn.127.net/8862d704f5590dc42c538a85120e1525.jpg",
                "http://yanxuan.nosdn.127.net/cc182d01d83a3aea2f2928190ce523b6.jpg"
            ],
            "keywords": "",
            "brief": "源自日本的刺子绣工艺",
            "isOnSale": true,
            "sortOrder": 19,
            "picUrl": "http://yanxuan.nosdn.127.net/e84f2e3b3d39cfdc8af5c3954a877aae.png",
            "originPrice": 419.00,
            "nowPrice": 399.00,
            "addTime": "2018-02-01 00:00:00",
            "updateTime": "2018-02-01 00:00:00",
            "deleted": false
        },
        {
            "id": 1036006,
            "goodsSn": "1030004",
            "name": "日式穿线绣四件套",
            "categoryId": 1008009,
            "brandId": 1,
            "gallery": [
                "http://yanxuan.nosdn.127.net/ff71d72ea77f23c6ebc7f77dd88ab947.jpg",
                "http://yanxuan.nosdn.127.net/a846819b20cde76700c3e6c9179fff03.jpg",
                "http://yanxuan.nosdn.127.net/8862d704f5590dc42c538a85120e1525.jpg",
                "http://yanxuan.nosdn.127.net/cc182d01d83a3aea2f2928190ce523b6.jpg"
            ],
            "keywords": "",
            "brief": "源自日本的刺子绣工艺",
            "isOnSale": true,
            "sortOrder": 19,
            "picUrl": "http://yanxuan.nosdn.127.net/e84f2e3b3d39cfdc8af5c3954a877aae.png",
            "originPrice": 419.00,
            "nowPrice": 399.00,
            "addTime": "2018-02-01 00:00:00",
            "updateTime": "2018-02-01 00:00:00",
            "deleted": false
        },
        {
            "id": 1181010,
            "goodsSn": "0812004",
            "name": "A-外卖1",
            "categoryId": 1005002,
            "brandId": 1,
            "keywords": "",
            "brief": "",
            "isOnSale": true,
            "sortOrder": 100,
            "originPrice": 20.00,
            "nowPrice": 18.00,
            "addTime": "2020-08-12 12:38:10",
            "updateTime": "2020-08-12 12:38:12",
            "deleted": false
        },
        {
            "id": 1181011,
            "goodsSn": "0812005",
            "name": "A-外卖2",
            "categoryId": 1005002,
            "brandId": 1,
            "keywords": "",
            "brief": "",
            "isOnSale": true,
            "sortOrder": 100,
            "originPrice": 15.00,
            "nowPrice": 12.00,
            "addTime": "2020-08-12 12:38:51",
            "updateTime": "2020-08-12 12:38:53",
            "deleted": false
        },
        {
            "id": 1181012,
            "goodsSn": "0812006",
            "name": "A-外卖3",
            "categoryId": 1005002,
            "brandId": 1,
            "keywords": "",
            "brief": "",
            "isOnSale": true,
            "sortOrder": 100,
            "originPrice": 30.00,
            "nowPrice": 25.00,
            "addTime": "2020-08-12 12:39:30",
            "updateTime": "2020-08-12 12:39:33",
            "deleted": false
        }
    ],
    "errmsg": "成功"
}
~~~



### 接口 /merchant/goods/detail

商品详情

GET

| 参数   | 类型 | 是否必须 | 说明   |
| ------ | ---- | -------- | ------ |
| goodId | int  | 是       | 商品id |

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "categoryIds": [
            1005000,
            1008009
        ],
        "goods": {
            "id": 1030004,
            "goodsSn": "1030004",
            "name": "日式穿线绣四件套",
            "categoryId": 1008009,
            "brandId": 1001020,
            "gallery": [
                "http://yanxuan.nosdn.127.net/ff71d72ea77f23c6ebc7f77dd88ab947.jpg",
                "http://yanxuan.nosdn.127.net/a846819b20cde76700c3e6c9179fff03.jpg",
                "http://yanxuan.nosdn.127.net/8862d704f5590dc42c538a85120e1525.jpg",
                "http://yanxuan.nosdn.127.net/cc182d01d83a3aea2f2928190ce523b6.jpg"
            ],
            "keywords": "",
            "brief": "源自日本的刺子绣工艺",
            "isOnSale": true,
            "picUrl": "http://yanxuan.nosdn.127.net/e84f2e3b3d39cfdc8af5c3954a877aae.png",
            "originPrice": 419.00,
            "nowPrice": 399.00
        },
        "attributes": [
            {
                "id": 168,
                "goodsId": 1030004,
                "attribute": "材质",
                "value": "100%棉",
                "addTime": "2018-02-01 00:00:00",
                "updateTime": "2018-02-01 00:00:00",
                "deleted": false
            },
            {
                "id": 169,
                "goodsId": 1030004,
                "attribute": "执行标准",
                "value": "GB/T 22844-2009",
                "addTime": "2018-02-01 00:00:00",
                "updateTime": "2018-02-01 00:00:00",
                "deleted": false
            },
            {
                "id": 170,
                "goodsId": 1030004,
                "attribute": "尺寸",
                "value": "1.5米床品： 被套 200*230cm/ 枕套：48*74cm*2/ 床单：245*250cm\n1.8米床品：被套 220*240cm/ 枕套：48*74cm*2/ 床单：245*270cm",
                "addTime": "2018-02-01 00:00:00",
                "updateTime": "2018-02-01 00:00:00",
                "deleted": false
            },
            {
                "id": 171,
                "goodsId": 1030004,
                "attribute": "产地",
                "value": "中国山东",
                "addTime": "2018-02-01 00:00:00",
                "updateTime": "2018-02-01 00:00:00",
                "deleted": false
            },
            {
                "id": 172,
                "goodsId": 1030004,
                "attribute": "颜色",
                "value": "蓝色/ 灰色",
                "addTime": "2018-02-01 00:00:00",
                "updateTime": "2018-02-01 00:00:00",
                "deleted": false
            },
            {
                "id": 173,
                "goodsId": 1030004,
                "attribute": "温馨提示",
                "value": "纺织品经历印染、织造等多道环节，产品初次拿到可能有些许味道，清水漂洗、晾干后味道即可散去。\n严选面料全部经过国标检测认证，选用环保活性染料，请放心使用。",
                "addTime": "2018-02-01 00:00:00",
                "updateTime": "2018-02-01 00:00:00",
                "deleted": false
            }
        ],
        "specifications": [
            {
                "id": 42,
                "goodsId": 1030004,
                "specification": "规格",
                "value": "标准",
                "picUrl": "",
                "addTime": "2018-02-01 00:00:00",
                "updateTime": "2018-02-01 00:00:00",
                "deleted": false
            }
        ],
        "products": [
            {
                "id": 43,
                "goodsId": 1030004,
                "specifications": [
                    "标准"
                ],
                "price": 399.00,
                "number": 100,
                "url": "http://yanxuan.nosdn.127.net/e84f2e3b3d39cfdc8af5c3954a877aae.png",
                "addTime": "2018-02-01 00:00:00",
                "updateTime": "2018-02-01 00:00:00",
                "deleted": false
            }
        ]
    },
    "errmsg": "成功"
}
~~~



### 接口 /merchant/data/incomeDetails

对账

GET

| 参数 | 类型 | 是否必须 | 说明                         |
| ---- | ---- | -------- | ---------------------------- |
| data | data | 是       | “2020-8-1 00:00:00”,默认当天 |

返回示例

~~~
{
    "errno": 0,
    "data": {
        "8月12日": [
            {
                "date": "8月12日",
                "orderSn": "20200812000101",
                "price": 55.00
            }
        ]
    },
    "errmsg": "成功"
}
~~~



### 接口 /merchant/data/todayData

今日数据

GET

参数：无

返回示例

~~~json
{
    "errno": 0,
    "data": {
        "id": 1,
        "userId": 1000010,
        "todayTurnover": 55.00,
        "todayOrder": 1,
        "addTime": "2020-08-21 12:15:56",
        "updateTime": "2020-08-21 12:15:59",
        "deleted": false
    },
    "errmsg": "成功"
}
~~~



### 接口 /merchant/goods/create

新建商品

POST

参数：JSON对象

注：

isHot一律为false，isNew一律为false，isOnSale一律为true，nowPrice可以为空，categortyId先传1010003，keyword为空，attributes可为空

~~~JSON
{
    "goods":
        {
            "picUrl":"http://59.110.153.227:9000/jindouyun/22fc0wo6mjpyxaitvjz2.gif",
            "gallery":[
                "http://59.110.153.227:9000/jindouyun/wxakgn4yp49q5exi2rm5.gif",
                "http://59.110.153.227:9000/jindouyun/u5w17ztvdk06sllf3ivm.gif"
                ],
            "isHot":false,
            "isNew":true,
            "isOnSale":true,
            "goodsSn":"111",
            "name":"111",
            "originPrice":"1.0",
            "nowPrice":"1.0",
            "categoryId":1010003,
            "keyword":"",
            "brandId":1,
            "brief":"1122"
        },
    "specifications":
        [
            {
                "specification":"分量",
                "value":"大",
                "picUrl":""
            },{
                "specification":"分量",
                "value":"中",
                "picUrl":""
            },{
                "specification":"分量",
                "value":"小",
                "picUrl":""
            },{
                "specification":"口味",
                "value":"微辣",
                "picUrl":""
            },{
                "specification":"口味",
                "value":"变态辣",
                "picUrl":""
            }
        ],
    "products":
        [
            {
                "id":0,
                "specifications":["大","微辣"],
                "price":"10",
                "number":0,
                "url":""
            },{
                "id":1,
                "specifications":["大","变态辣"],
                "price":"10",
                "number":0,
                "url":""
            },{
                "id":2,
                "specifications":["中","微辣"],
                "price":"8",
                "number":0,
                "url":""
            },{
                "id":3,
                "specifications":["中","变态辣"],
                "price":"8",
                "number":0,
                "url":""
            },{
                "id":4,
                "specifications":["小","微辣"],
                "price":"6",
                "number":0,
                "url":""
            },{
                "id":5,
                "specifications":["小","变态辣"],
                "price":"6",
                "number":0,
                "url":""
            }
        ],
    "attributes":
        [
            {
                "attribute":"用料",
                "value":"12345"
            },{
                "attribute":"制作方法",
                "value":"12234567"
            }
        ]
}
~~~

返回示例

见postman



### 接口 /merchant/goods/update

更新商品信息

POST

参数：JSON对象

注：

isHot一律为false，isNew一律为false，isOnSale一律为true，nowPrice可以为空，categortyId先传1010003，keyword为空，attributes可为空

~~~JSON
{
    "goods":
        {
            "id":1181018,
            "picUrl":"http://59.110.153.227:9000/jindouyun/22fc0wo6mjpyxaitvjz2.gif",
            "gallery":[
                "http://59.110.153.227:9000/jindouyun/wxakgn4yp49q5exi2rm5.gif",
                "http://59.110.153.227:9000/jindouyun/u5w17ztvdk06sllf3ivm.gif"
                ],
            "isHot":false,
            "isNew":true,
            "isOnSale":true,
            "goodsSn":"111",
            "name":"111",
            "originPrice":"1.0",
            "nowPrice":"1.0",
            "categoryId":1010003,
            "keyword":"",
            "brandId":1,
            "brief":"1122"
        },
    "specifications":
        [
            {
                "specification":"分量",
                "value":"大",
                "picUrl":""
            },{
                "specification":"分量",
                "value":"中",
                "picUrl":""
            },{
                "specification":"分量",
                "value":"小",
                "picUrl":""
            },{
                "specification":"口味",
                "value":"微辣",
                "picUrl":""
            },{
                "specification":"口味",
                "value":"变态辣",
                "picUrl":""
            }
        ],
    "products":
        [
            {
                "id":0,
                "specifications":["大","微辣"],
                "price":"10",
                "number":0,
                "url":""
            },{
                "id":1,
                "specifications":["大","变态辣"],
                "price":"10",
                "number":0,
                "url":""
            },{
                "id":2,
                "specifications":["中","微辣"],
                "price":"8",
                "number":0,
                "url":""
            },{
                "id":3,
                "specifications":["中","变态辣"],
                "price":"8",
                "number":0,
                "url":""
            },{
                "id":4,
                "specifications":["小","微辣"],
                "price":"6",
                "number":0,
                "url":""
            },{
                "id":5,
                "specifications":["小","变态辣"],
                "price":"6",
                "number":0,
                "url":""
            }
        ],
    "attributes":
        [
            {
                "attribute":"用料",
                "value":"12345"
            },{
                "attribute":"制作方法",
                "value":"12234567"
            }
        ]
}
~~~



### 接口 /merchant/goods/delete

更新商品信息

POST

参数：JSON对象

注：

isHot一律为false，isNew一律为false，isOnSale一律为true，nowPrice可以为空，categortyId先传1010003，keyword为空，attributes可为空

~~~JSON
{
    "goods":
        {
            "id":1181018,
            "picUrl":"http://59.110.153.227:9000/jindouyun/22fc0wo6mjpyxaitvjz2.gif",
            "gallery":[
                "http://59.110.153.227:9000/jindouyun/wxakgn4yp49q5exi2rm5.gif",
                "http://59.110.153.227:9000/jindouyun/u5w17ztvdk06sllf3ivm.gif"
                ],
            "isHot":false,
            "isNew":true,
            "isOnSale":true,
            "goodsSn":"111",
            "name":"111",
            "originPrice":"1.0",
            "nowPrice":"1.0",
            "categoryId":1010003,
            "keyword":"",
            "brandId":1,
            "brief":"1122"
        }
}
~~~











