/**
 * Created by devollove9 on 2017/10/22.
 */
import { merge } from 'lodash'
const newModule = {
  state: {
    activeLocale: 'en-US',
    permissions: {}
  },
  mutations: {
    changeLocale (state, payload) {
      state.activeLocale = payload.activeLocale
      payload.target.locale = payload.activeLocale
    },
    addLocale (state, payload) {
      merge(state.locales, state.locales, payload.locales)
    }
  },
  getters: {
    getActiveLocale: function (state) {
      return state.activeLocale
    },
    getLocales: function (state) {
      return state.locales
    },
    getLocale: function (state) {
      return state
    }
  }
}

export default newModule
