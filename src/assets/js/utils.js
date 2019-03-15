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
