<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  layout: 'userCenter',
  name: 'PaymentMethods',
  components: {
  },
  data () {
    return {
      title: 'PaymentMethods'
    }
  },
  computed: {
  },
  async asyncData ({ app, params, redirect }) {
    await console.log('In PaymentMethods')
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
        { hid: 'description', name: 'description', content: 'PaymentMethods' }
      ]
    }
  },
  render () {
    return (
      <div class="PaymentMethods" >
          PaymentMethods Information
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
