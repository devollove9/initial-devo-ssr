<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import { HyperLink } from '~/components/UI'
const list = [
  { text: 'header.userDropDown.yourAccount', dir: '/u/account' },
  { text: 'header.userDropDown.yourOrder', dir: '/u/orders' },
  { text: 'header.userDropDown.yourFavorites', dir: '/u/favorites' },
  { text: 'header.userDropDown.rewardPoints', dir: '/u/rewardpoints' },
  { text: 'header.userDropDown.coupons', dir: '/u/coupons' },
  { text: 'header.userDropDown.signout', dir: '/signout' }
]

export default {
  components: {
  },
  data () {
    const optionList = list.map((l) => {
      return (
        <div class="options">
          <HyperLink
            title={this.$t(l.text)}
            dir={l.dir}
            text={l.text}
          >
          </HyperLink>
        </div>
      )
    })
    return {
      optionList: optionList
    }
  },
  computed: {
  },
  async beforeCreate () {
    await i18n(localeMessage, this.$store)
  },
  mounted () {
  },
  methods: {
  },
  render () {
    return (
      <div class="UserDropDown">
        <div class="welcome">
          <p class="title">{this.$t('header.userDropDown.welcome')}</p>
          <p class="username">{this.$store.getters.getUsername}</p>
        </div>
        {this.optionList}
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
