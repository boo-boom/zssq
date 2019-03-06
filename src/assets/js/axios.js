import axios from 'axios';

const $axios = (opt) => {
  const requestData = {
    url: opt.url,
    method: opt.method || 'get',
    baseURL: `http://localhost:3005/api`
  }
  if(requestData.method === 'get') {
    requestData.params = opt.data;
  } else {
    requestData.data = opt.data;
  }
  return axios(requestData)
}

export default $axios;
