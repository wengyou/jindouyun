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

//获取当前时间，格式YYYY-MM-DD
export const getNowFormatDate = () => {
  let date = new Date();
  let seperator = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentdate = year + seperator + month + seperator + strDate;
  return currentdate;
}

// 全排列
export function processData(data) {
  const matrix = [];
  const map = new Map([]);
  const target = [];
  
  data.forEach(item => {
    if (!map.has(item['specification'])) {
      map.set(item['specification'], [])
    }
    map.get(item['specification']).push(item['value']);
  });
  map.forEach(value => {
    matrix.push(value)
  });
  
  const permutate = function (matrixIndex, prev) {
    const part = matrix[matrixIndex];
    let isLast = matrixIndex === matrix.length - 1;
    part.forEach(item => {
      const current = prev.concat(item);
      if (isLast) {
        target.push(current);
      } else {
        permutate(matrixIndex + 1, current);
      }
    })
  };
  
  permutate(0, []);
  return target;
}

//取出数组对象中的value值
export function getObjectValues(object){
    var values = [];
    for (var property in object){
      values.push(object[property].url);
    }
    return values;
}