const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#333333',
    failedColor: 'red'
  },

  env: {
    baseApiUrl: 'http://api.yaxingli.com',
    domain: 'yaxingli.com',
    appName: 'initial-devo'
  },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'sass/_element.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
    'highlight.js/styles/github.css',
    'sass/_highlightjs.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '~/plugins/vue-i18n.js',
    { src: '~/plugins/vue-quill-editor.js', ssr: false }
  ],

  router: {
    middleware: ['vue-i18n', 'authenticate', 'router-delay']
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  styleResources: {
    scss: [
      'sass/_variables.scss',
      'sass/_global.scss'
    ]
  },
  /*
  ** Axios module configuration
  */
  axios: {
    middleware: ['axios-delay']
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/, 'vue-i18n'],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  render: {
    // see Nuxt.js docs: https://nuxtjs.org/api/configuration-render#bundleRenderer
    // bundleRenderer: {
    //   directives: {
    //     t: i18nExtensions.directive
    //   }
    // }
  }
}
