/**
 * Created by devo on 2/27/2018.
 */
// import axios from 'axios'
const localeModule = {
  state: {
    requestDetail: {},
    data: {}
  },
  actions: {
    http (context, payload) {
      // console.log(context)
      // console.log(payload)
    },
    async https ({ dispatch, commit }) {
      await dispatch('http')
    }
  }
}

export default localeModule
