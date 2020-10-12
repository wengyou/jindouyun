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



