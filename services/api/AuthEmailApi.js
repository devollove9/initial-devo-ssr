import BaseApi from './BaseApi.js'
const baseUrl = '/public/auth/email'
const api = {
  postInfo: body => BaseApi.post(baseUrl, body),
  deleteInfo: body => BaseApi.del(baseUrl, body),
  login: (query, token) => BaseApi.get(baseUrl + '/signin', query, token),
  checkInfo: query => BaseApi.get(baseUrl, query)
}

export default api
