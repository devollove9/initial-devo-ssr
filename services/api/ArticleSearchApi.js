import BaseApi from './BaseApi.js'
const baseUrl = '/article/search'
const api = {
  postInfo: body => BaseApi.post(baseUrl, body)
}

export default api
