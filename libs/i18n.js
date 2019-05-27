
const i18n = (locales, store) => {
  store.commit('addLocale', { locales: locales })
}

export default i18n
