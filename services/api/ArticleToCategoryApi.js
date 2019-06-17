import BaseApi from './BaseApi.js'
const baseUrl = '/article/articleToCategory'
const api = {
  postInfo: body => BaseApi.post(baseUrl, body),
  deleteInfo: body => BaseApi.del(baseUrl, body),
  getInfo: query => BaseApi.get(baseUrl, query)
}

export default api
