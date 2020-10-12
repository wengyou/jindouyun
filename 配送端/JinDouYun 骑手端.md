# JinDouYun 骑手端

### 接口 /delivery/manage/list



查询可接合单，已完成，未完成

| 参数            | 类型        | 是否必须 | 说明                                                         |
| --------------- | ----------- | -------- | ------------------------------------------------------------ |
| orderStatusList | List\<Byte> | 否       | 31：商家发货，等待骑手接单<br/>32：骑手接单，派送中<br/>33：已送达<br> 默认31 |
| type            | Byte        | 否       | 类型，0：商品，1：外卖，2：快递                              |
| deliveryId      | int         | 否       | 派送员id                                                     |
| mergeId         | int         | 否       | 合单id                                                       |
| force           | boolean     | 否       | 是否为强制派单，0：不是，1：强制                             |
| date            | time        | 否       | 日期，默认当天                                               |
| page            | int         | 否       | 默认1                                                        |
| limit           | int         | 否       | 默认10                                                       |
| sort            | str         | 否       | 默认add_time                                                 |
| order           | str         | 否       | 默认desc                                                     |

返回示例见postman



### 接口/delivery/manage/detail

GET

返回合单中小单的详情

| 参数         | 类型 | 是否必须 | 说明     |
| ------------ | ---- | -------- | -------- |
| splitOrderId | int  | 是       | 子订单id |

返回示例见postman