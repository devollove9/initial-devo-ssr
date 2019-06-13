import axios from 'axios'

class BaseApiClass {
  constructor () {
    this.HOST = 'http://api.yaxingli.com'
    this.header = {
      'Content-Type': 'application/json'
    }
    if (process.env.NODE_ENV !== 'production') {
      this.header['x-response-errordetail'] = 1
    }
  }

  async get (path, query) {
    let params = '?'
    let first = true
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        if (first === true) {
          first = false
          params += key + '=' + query[key]
        } else {
          params += '&' + key + '=' + query[key]
        }
      }
    }
    const response = await axios
      .get(
        this.HOST + path + params,
        {
          headers: this.header
        }
      )
    if (process.env.NODE_ENV !== 'production') {
      console.log(response.data)
    }
    return response.data
  }

  async post (path, body = null) {
    const response = await axios
      .post(
        this.HOST + path,
        body,
        {
          headers: this.header
        }
      )
    if (process.env.NODE_ENV !== 'production') {
      console.log(response.data)
    }
    return response.data
  }
}

const BaseApi = new BaseApiClass()
export default BaseApi
