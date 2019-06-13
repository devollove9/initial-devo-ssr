import BaseApi from './BaseApi.js'

const api = {
  getItem: query => BaseApi.get(query)
}

export default api
