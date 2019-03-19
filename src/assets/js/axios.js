import axios from 'axios';

const formatParams = (opt) => {
  const requestData = {
    url: opt.url,
    method: opt.method || 'get',
    baseURL: process.env.NODE_ENV === 'development' ? 'http://192.168.140.73:3005/api' : 'http://zssq.hoohmm.com/api'
  }
  if (requestData.method === 'get') {
    requestData.params = opt.data;
  } else {
    requestData.data = opt.data;
  }
  return requestData;
}

const $axios = (opt) => {
  if (Object.prototype.toString.call(opt) !== '[object Array]') {
    return new Promise((resolve, reject) => {
      axios(formatParams(opt)).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  } else {
    const requestArr = opt.map(item => {
      return axios(formatParams(item))
    });
    return new Promise((resolve, reject) => {
      axios.all(requestArr).then(axios.spread((...arg) => {
        const content = arg.map(item => {
          if(item.data.ok) {
            return item.data
          }
          return {}
        })
        resolve(content)
      })).catch(err => {
        reject(err)
      })
    })
  }
}

export default $axios;
