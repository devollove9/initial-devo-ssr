import BaseApi from './BaseApi.js'

const StoreApplicationApi = {
  sendInformation: (body) => BaseApi.post('/request/application/store', body)
}

export default StoreApplicationApi
