<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import { HyperLink } from '~/components/UI'
const list = [
  { text: 'userCenterNavigation.yourAccount', dir: '/u/account' },
  { text: 'userCenterNavigation.yourOrder', dir: '/u/orders' },
  { text: 'userCenterNavigation.yourFavorites', dir: '/u/favorites' },
  { text: 'userCenterNavigation.rewardPoints', dir: '/u/rewardpoints' },
  { text: 'userCenterNavigation.coupons', dir: '/u/coupons' },
  { text: 'userCenterNavigation.address', dir: '/u/address' },
  { text: 'userCenterNavigation.billing', dir: '/u/paymentmethods' }
]

export default {
  name: 'UserCenterNavigation',
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
      menuList: optionList
    }
  },
  computed: {
  },
  beforeCreate () {
    i18n(localeMessage, this.$store)
  },
  methods: {
  },
  render () {
    return (
      <div class="UserCenterNavigation" >
        {this.menuList}
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
