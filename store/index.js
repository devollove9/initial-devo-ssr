/**
 * Created by devollove9 on 2017/10/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { locale, user } from './modules'

Vue.use(Vuex)

const index = () => new Vuex.Store({
  modules: {
    locale,
    user
  }
})

export default index
