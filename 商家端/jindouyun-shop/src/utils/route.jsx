//路由跳转函数
import Taro from '@tarojs/taro';

export const toSearch = () => {
    Taro.navigateTo({
        url: '/pages/search/index'
    })
};

export const toWaimai = () => {
    Taro.navigateTo({
        url: '/pages/waimai/index'
    })
}

export const toCart = () => {
    Taro.switchTab({
        url: '/pages/shawujing/index'
    })
}

export const toWaimaiDetail = (id, title) => {
    console.log(id, title);
    Taro.navigateTo({
        url: `/pages/waimai_detail/index?id=${id}&title=${title}`
    })
}

export const toGoodsList = (id, title) => {
    Taro.navigateTo({
        url: `/pages/goods/index?id=${id}&title=${title}`
    })
}

export const toDetail = (id) => {
    Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
    })
}