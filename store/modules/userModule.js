import Cookie from 'js-cookie'
import AuthUserApi from '~/services/api/AuthUserApi'

const newModule = {
  state () {
    return {
      userInfo: {},
      token: '',
      authenticated: false
    }
  },
  mutations: {
    updateUserInfo (state, userInfo) {
      console.log('in update userinfo')
      state.userInfo = userInfo
      state.token = userInfo.token
      console.log(userInfo, state.userInfo)
      state.authenticated = true
      const domain = (process.env.NODE_ENV === 'production') ? process.env.domain : 'localhost'
      const cookieKey = domain + '-y-' + process.env.appName
      const cookieVal = state.userInfo.token
      let userToken
      try {
        userToken = Cookie.set(cookieKey, cookieVal, state.userInfo.maxAge, null, domain)
      } catch (e) {
        console.log(e)
      }
      console.log(userToken)
      console.log(cookieKey)
      console.log(Cookie.get(cookieKey))
      console.log(domain)
    },
    signOutUser (state) {
      const domain = (process.env.NODE_ENV === 'production') ? process.env.domain : 'localhost'
      const cookieKey = domain + '-y-' + process.env.appName
      Cookie.remove(cookieKey)
      state.authenticated = false
      state.token = ''
      state.userInfo = {}
    },
    async tryAuth (state) {
      console.log('In try auth')
      const domain = (process.env.NODE_ENV === 'production') ? process.env.domain : 'localhost'
      const cookieKey = domain + '-y-' + process.env.appName
      let userToken
      try {
        userToken = Cookie.get(cookieKey)
      } catch (e) {
      }
      console.log(userToken)
      if (userToken) {
        const res = await AuthUserApi.renew({ maxAge: 14400 }, userToken)
        if (!res.data) {
        } else {
          state.authenticated = true
          state.userInfo = res.data
        }
      }
    }
  },
  getters: {
    getTokenFromCooke (state) {
      const domain = (process.env.NODE_ENV === 'production') ? process.env.domain : 'localhost'
      const cookieKey = domain + '::y::'
      return Cookie.get(cookieKey)
    },
    getUserToken (state) {
      return state.token
    },
    getUserInfo: function (state) {
      return state.userInfo
    },
    isAuthenticated: (state) => {
      return state.authenticated
    }
  }
}

export default newModule
