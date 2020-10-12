import Taro from "@tarojs/taro";

export const showLoading = (status) => {
  status ?
    Taro.showLoading({
      title: 'loading'
    })
    :
    Taro.hideLoading()
};

export const showMessage = (info, type) => {
  Taro.showToast({
    title: info,
    icon: type,
    duration: 2000
  })
};

//防抖函数
export const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if(timeout) clearTimeout(timeout);
    if(immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args)
    }
    else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait)
    }
  }
}

//节流函数
export const throttle = (func, wait ,type) => {
  if(type===1){
    var previous = 0;
  }else if(type===2){
    var timeout;
  }

  return function() {
    var context = this;
    var args = arguments;
    if(type===1){
      var now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    }else if(type===2){
      if (!timeout) {
        timeout = setTimeout(function() {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }

  }
}
