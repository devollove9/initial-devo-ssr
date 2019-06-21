<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  components: {
  },
  data () {
    return {
    }
  },
  async beforeCreate () {
    await i18n(localeMessage, this.$store)
  },
  methods: {
  },
  render () {
    return (
      <div class="UserPanel">
        <div class="sign-in-sign-out">
          <a
            class="panel-button signin"
            href={'/signin?source=header-signin'}
          >
            {this.$t('header.userpanel.signin')}
          </a>
          <a
            class="panel-button signup"
            href={'/signup?source=header-signup'}
          >
            {this.$t('header.userpanel.signup')}
          </a>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
