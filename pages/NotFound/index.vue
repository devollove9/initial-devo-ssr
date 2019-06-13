<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import i18n from '@/libs/i18n'
// import localeMessage from './index.i18n.js'

export default {
  name: 'NotFound',
  components: {
  },
  data () {
    return {
      title: 'Page not found - Initial.Devo'
    }
  },
  beforeCreate () {
    // i18n(localeMessage)
  },
  methods: {
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.title }
      ]
    }
  },
  render () {
    return (
      <div class="NotFound">
        <Header/>
        <div class="container">
          <h1 class="notfound__headline">
            Looking for something?
          </h1>
          <h2 class="notfound__subline">
            Unfortunately it's not here. Good luck on your wanderings.
          </h2>
          <router-link to="/" class="button primary large">
            Back to safety
          </router-link>
        </div>
        <Footer/>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
