//路由跳转函数

import Taro from '@tarojs/taro';

export const toSearch = () => {
    Taro.navigateTo({
        url: '/pages/search/index'
    })
};
