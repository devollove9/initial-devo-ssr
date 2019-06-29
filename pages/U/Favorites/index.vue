<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  layout: 'userCenter',
  name: 'Favorites',
  components: {
  },
  data () {
    return {
      title: 'Favorites'
    }
  },
  computed: {
  },
  async asyncData ({ app, params, redirect }) {
    await console.log('In Favorites')
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
        { hid: 'description', name: 'description', content: 'Favorites' }
      ]
    }
  },
  render () {
    return (
      <div class="Favorites" >
          Favorites Information
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
