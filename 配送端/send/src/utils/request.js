import Taro from '@tarojs/taro';
import {showLoading} from "./common";

// const baseUrl = 'http://49.235.20.228:8000/';
const baseUrl = 'https://www.jindouyun.ink:8080/';
export default (method, url, payload)=> {
  const token = Taro.getStorageSync('token');
  return Taro.request({
    url: baseUrl + url,
    data: JSON.stringify(payload),
    header: {
      'Content-Type': 'application/json',
      'X-Jindouyun-Token': token || '',
    },
    method: method.toUpperCase(),
    timeout: 10000,
    fail: (res)=>{
      showLoading(false);
      Taro.showToast({
        title: `${res.errMsg}`,
        icon: 'none',
      });
    }
  }).then(res => {
    const {statusCode, data} = res;
    if (statusCode >= 200 && statusCode < 300) {
      data.error === '0' &&
        Taro.showToast({
          title: data.msg,
          icon: 'none',
        });
      return data;
    } else {
      showLoading(false);
      throw new Error(`网络请求错误，状态码${statusCode}`);
      return true;
    }
  })
};
