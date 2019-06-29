<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  layout: 'userCenter',
  name: 'RewardPoints',
  components: {
  },
  data () {
    return {
      title: 'RewardPoints'
    }
  },
  computed: {
  },
  async asyncData ({ app, params, redirect }) {
    await console.log('In RewardPoints')
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
        { hid: 'description', name: 'description', content: 'RewardPoints' }
      ]
    }
  },
  render () {
    return (
      <div class="RewardPoints" >
          RewardPoints Information
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
