<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  layout: 'userCenter',
  name: 'Address',
  components: {
  },
  data () {
    return {
      title: 'Address'
    }
  },
  computed: {
  },
  async asyncData ({ app, params, redirect }) {
    await console.log('In Address')
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
        { hid: 'description', name: 'description', content: 'Address' }
      ]
    }
  },
  render () {
    return (
      <div class="Address" >
          Address Information
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
