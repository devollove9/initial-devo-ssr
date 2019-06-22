import axios from 'axios'

class BaseApiClass {
  constructor () {
    this.HOST = process.env.baseApiUrl
    this.header = {
      'Content-Type': 'application/json'
    }
    if (process.env.NODE_ENV !== 'production') {
      this.header['x-response-errordetail'] = 1
    }
  }

  async get (path, query, token) {
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
    const headers = this.header
    if (token) headers['authentication-token'] = token
    const response = await axios
      .get(
        this.HOST + path + params,
        {
          headers: headers
        }
      )
    if (process.env.NODE_ENV !== 'production') {
      console.log(response.data)
    }
    return response.data
  }

  async post (path, body = null, token) {
    const headers = this.header
    if (token) headers['authentication-token'] = token
    const response = await axios
      .post(
        this.HOST + path,
        body,
        {
          headers: headers
        }
      )
    if (process.env.NODE_ENV !== 'production') {
      console.log(response.data)
    }
    return response.data
  }

  async put (path, body = null, token) {
    const headers = this.header
    if (token) headers['authentication-token'] = token
    const response = await axios
      .put(
        this.HOST + path,
        body,
        {
          headers: headers
        }
      )
    if (process.env.NODE_ENV !== 'production') {
      console.log(response.data)
    }
    return response.data
  }

  async del (path, body = null, token) {
    const headers = this.header
    if (token) headers['authentication-token'] = token
    const response = await axios
      .delete(
        this.HOST + path,
        {
          headers: headers,
          data: body
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
