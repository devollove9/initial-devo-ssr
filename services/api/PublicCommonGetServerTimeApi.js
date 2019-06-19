import BaseApi from './BaseApi.js'
const baseUrl = '/public/common/getServerTime'
const api = {
  getInfo: query => BaseApi.get(baseUrl, query)
}

export default api
