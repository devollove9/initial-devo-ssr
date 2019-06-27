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
      state.userInfo = userInfo
      state.token = userInfo.token
      state.authenticated = true
      const domain = (process.env.NODE_ENV === 'production') ? process.env.domain : 'localhost'
      const cookieKey = domain + '-y-' + process.env.appName
      const cookieVal = state.userInfo.token
      try {
        Cookie.set(cookieKey, cookieVal, { expires: state.userInfo.maxAge })
      } catch (e) {
      }
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
      const domain = (process.env.NODE_ENV === 'production') ? process.env.domain : 'localhost'
      const cookieKey = domain + '-y-' + process.env.appName
      let userToken
      try {
        userToken = Cookie.get(cookieKey)
      } catch (e) {
      }
      if (userToken) {
        const res = await AuthUserApi.renew({ maxAge: 144000 }, userToken)
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
      const cookieKey = domain + '-y-' + process.env.appName
      return Cookie.get(cookieKey)
    },
    getUserToken (state) {
      return state.token
    },
    getUserInfo: function (state) {
      return state.userInfo
    },
    getUsername: function (state) {
      return state.userInfo.username
    },
    isAuthenticated: (state) => {
      return state.authenticated
    }
  }
}

export default newModule
