export default function ({ isHMR, app, store, route, params, error, redirect }) {
  // const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // const locale = store.getters.getActiveLocale || defaultLocale
  // if (store.state.locale.locales.indexOf(locale) === -1) {
  //   return error({ message: 'This page could not be found.', statusCode: 404 })
  // }
  const payload = {
    target: app.i18n,
    activeLocale: store.getters.getActiveLocale
  }
  store.commit('changeLocale', payload)
  // Set locale from the query string '?lang='**''
  app.i18n.locale = store.getters.getActiveLocale || app.i18n.fallbackLocale
}
