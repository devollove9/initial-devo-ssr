<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  layout: 'userCenter',
  name: 'Account',
  components: {
  },
  data () {
    return {
      title: 'Account'
    }
  },
  computed: {
  },
  async asyncData ({ app, params, redirect }) {
    await console.log('In Account')
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
        { hid: 'description', name: 'description', content: 'Account' }
      ]
    }
  },
  render () {
    return (
      <div class="Account" >
          Account Information
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
