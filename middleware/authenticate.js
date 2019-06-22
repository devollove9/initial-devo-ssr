export default function ({ store, error }) {
  if (!store.state.user.authenticated) {
    if (process.client) store.commit('tryAuth')
  }
}
