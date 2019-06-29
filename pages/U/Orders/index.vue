<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  layout: 'userCenter',
  name: 'Orders',
  components: {
  },
  data () {
    return {
      title: 'Orders'
    }
  },
  computed: {
  },
  async asyncData ({ app, params, redirect }) {
    await console.log('In Orders')
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
        { hid: 'description', name: 'description', content: 'Orders' }
      ]
    }
  },
  render () {
    return (
      <div class="Orders" >
          Orders Information
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
