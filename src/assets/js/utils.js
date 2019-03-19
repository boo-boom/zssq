import { baseUrl } from './config'

export const formatImg = (src) => {
  const newSrc = src.indexOf('statics.zhuishushenqi.com') >= 0 ? src : `${baseUrl.imgBaseUrl}${src}`
  return decodeURIComponent(newSrc);
}

export const formatNumUnit = (num) => {
  const newNum = Number(num)
  if(newNum >= 10000) {
    return `${(newNum / 10000).toFixed(1)}万字`
  }
  return `${newNum}字`;
}

export const formatScore = (num) => {
  const newNum = Number(num)
  if(newNum > 0) {
    return Math.round(newNum * 10) / 10
  } else {
    return '0.00'
  }
}

export const highlight = (str, highArr) => {
  // console.log(str, highArr)
  const strArr = str.split('')
  for (let i = 0; i < strArr.length; i++) {
    for (let j = 0; j < highArr.length; j++) {
      if (strArr[i] === highArr[j]) {
        strArr.splice(i, 1, `<span class="highlight">${strArr[i]}</span>`)
      }
    }
  }
  return strArr.join('')
}

export const debounce = (func, delay) => {
  var timer = null;
  return function () {
    var _arg = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(_arg);
    }, delay);
  };
}

export const devDebug = () => {
  const href = window.location.href;
  if(href.match(/http(s)?:\/\/(192\.168\.\d{1,3}\.\d{1,3})/)) {
    const VConsole = require('vconsole/dist/vconsole.min.js');
    new VConsole();
  }
}
