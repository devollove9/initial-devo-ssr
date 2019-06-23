/**
 * Created by devollove9 on 2017/10/22.
 */
import { merge } from 'lodash'
const localeModule = {
  state () {
    return {
      activeLocale: 'en-US',
      locales: {}
    }
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
    }
  }
}

export default localeModule
