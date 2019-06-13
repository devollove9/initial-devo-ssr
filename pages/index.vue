<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      title: 'Home - Initial.Devo'
    }
  },
  async beforeCreate () {
    await i18n(localeMessage, this.$store)
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
      <div class="Home">
        <Header />
        <div>
        Homed<br />
        Homed<br />Homed<br />Homed<br />Homed<br />Homed<br />Homed<br />Homed<br />Homed<br />
        </div>

        <Footer/>
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
