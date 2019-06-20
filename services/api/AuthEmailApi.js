import BaseApi from './BaseApi.js'
const baseUrl = '/public/auth/email'
const api = {
  postInfo: body => BaseApi.post(baseUrl, body),
  deleteInfo: body => BaseApi.del(baseUrl, body),
  getInfo: query => BaseApi.get(baseUrl, query),
  checkInfo: query => BaseApi.get(baseUrl, query)
}

export default api
