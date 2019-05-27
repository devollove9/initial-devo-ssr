module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    '@vue/standard',
  ],
  // add your custom rules here
  rules: {
    "no-console": "off",
    'nuxt/no-cjs-in-config': 'off',
    "vue/attribute-hyphenation": 'never',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/require-default-prop': 'off',
    'vue/valid-v-model': 'off'
  }
}
