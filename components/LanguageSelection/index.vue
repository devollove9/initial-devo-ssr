<script>
import { TextDropDown } from '~/components/UI'

const localeOptions = [
  { key: 'en-US', value: 'English' },
  { key: 'zh-CN', value: '中文' }
]

export default {
  name: 'LanguageSelection',
  props: {
    className: String
  },
  data () {
    const initialLocale = this.$store.getters.getActiveLocale
    return {
      activeLocale: this.getLanguageLocaleContent(initialLocale),
      languageLocales: localeOptions
    }
  },
  methods: {
    getLanguageLocaleContent (k) {
      for (const idx in localeOptions) {
        if (localeOptions[idx].key === k) {
          return localeOptions[idx].value
        }
      }
      return 'en-US'
    },
    onSelectLocale (e) {
      const payload = {
        target: this.$i18n,
        activeLocale: e
      }
      this.$store.commit('changeLocale', payload)
    }
  },
  render () {
    return (
      <div class={'language-select ' + this.className}>
        <TextDropDown
          defaultVal={this.activeLocale}
          onSelect={this.onSelectLocale}
          items={this.languageLocales}
        />
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
