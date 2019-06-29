<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  layout: 'userCenter',
  name: 'Coupons',
  components: {
  },
  data () {
    return {
      title: 'Coupons'
    }
  },
  computed: {
  },
  async asyncData ({ app, params, redirect }) {
    await console.log('In Coupons')
  },
  beforeCreate () {
    i18n(localeMessage, this.$store)
  },
  methods: {
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Coupons' }
      ]
    }
  },
  render () {
    return (
      <div class="Coupons" >
          Coupons Information
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
