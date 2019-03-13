import config from './config'

export const formatImg = (src) => {
  const newSrc = src.indexOf('statics.zhuishushenqi.com') >= 0 ? src : `${config.imgBaseUrl}${src}`
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
