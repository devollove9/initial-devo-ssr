import BaseApi from './BaseApi.js'
const baseUrl = '/article'
const api = {
  postInfo: body => BaseApi.post(baseUrl, body),
  putInfo: body => BaseApi.put(baseUrl, body),
  getInfo: query => BaseApi.get(baseUrl, query)
}

export default api
