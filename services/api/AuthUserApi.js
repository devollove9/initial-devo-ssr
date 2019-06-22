import BaseApi from './BaseApi.js'
const baseUrl = '/auth'
const api = {
  renew: (query, token) => BaseApi.get(baseUrl + '/renew', query, token)
}

export default api
