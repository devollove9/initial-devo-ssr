import VueCookie from 'vue-cookies'
import AuthUserApi from '~/services/api/AuthUserApi'
const newModule = {
  state: {
    userInfo: {},
    token: '',
    authenticated: false
  },
  mutations: {
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
      state.token = userInfo.token
      console.log(userInfo, state.userInfo)
      state.authenticated = true
      const domain = (process.env.NODE_ENV === 'production') ? process.env.domain : 'localhost'
      const cookieKey = domain + '-y-' + process.env.appName
      const cookieVal = state.userInfo.token
      VueCookie.set(cookieKey, cookieVal, state.userInfo.maxAge, null, domain)
    },
    signOutUser (state) {
      const domain = (process.env.NODE_ENV === 'production') ? process.env.domain : 'localhost'
      const cookieKey = domain + '-y-' + process.env.appName
      VueCookie.remove(cookieKey)
      state.authenticated = false
      state.token = ''
      state.userInfo = {}
    },
    async tryAuth (state) {
      const domain = (process.env.NODE_ENV === 'production') ? process.env.domain : 'localhost'
      const cookieKey = domain + '-y-' + process.env.appName
      let userToken
      try {
        userToken = VueCookie.get(cookieKey)
      } catch (e) {
      }
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
      return VueCookie.get(cookieKey)
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
