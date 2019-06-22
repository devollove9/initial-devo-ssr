<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  components: {
  },
  data () {
    return {
      finishedAuth: false
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.user.authenticated
    },
    username () {
      return this.$store.state.user.userInfo.username
    }
  },
  async beforeCreate () {
    i18n(localeMessage, this.$store)
    await this.$store.commit('tryAuth')
    setTimeout(() => { this.finishedAuth = true }, 500)
  },
  methods: {
  },
  render () {
    return (
      <div class="UserPanel">
        {!this.isAuthenticated && this.finishedAuth && <div class="sign-in-sign-out">
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
        </div>}
        {!!this.isAuthenticated && <div class="user-avatar">
          {this.username}
        </div>}
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
