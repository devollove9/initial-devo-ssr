<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import { Popover } from '~/components/UI'
import UserDropDown from '~/components/Header/UserDropDown'

export default {
  components: {
    Popover
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
        <Popover
          mode="hover"
          offset="-95px,5px"
          delayTimeOut={100}
        >
          <div class="userAvatarDropDown">
            <UserDropDown />
          </div>
          <div slot="trigger" >
            {!!this.isAuthenticated && <div class="user-avatar">
              <a>
                <div class="avatar-wrap" title={this.username}>
                  {this.username[0].toUpperCase()}
                </div>
              </a>
            </div>}
          </div>
        </Popover>
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
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
