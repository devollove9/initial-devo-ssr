<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  layout: 'header_footer',
  name: 'Aboutme',
  components: {
  },
  data () {
    return {
      title: 'About Me'
    }
  },
  computed: {
  },
  async asyncData ({ app, params, redirect }) {
    await console.log('In About Me')
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
        { hid: 'description', name: 'description', content: 'About Me' }
      ]
    }
  },
  render () {
    return (
      <div class="Aboutme" >
        My skills:
        <div class="briefIntro">
          (Most) Front-end: mobile, web, vue, react, etc..
          <br />
          (Many) Back-end: nodejs, mongodb, koa, express, etc...
          <br />
          (Some) Android app: gradle, java, etc...
          <br />
          (few) IOS app: swift, learning..
        </div>
        <br />
        <div class="myWorks">
          My works:
          <a href="https://517.today">517.today</a>
          <br/>
          <a href="https://www.impactlink.com/">impactLink.com</a>
          <br/>
          <a href="https://www.funchinaworld.com/">funchinaworld.com</a>
          <br/>
          <a href="http://www.517today.com/">517today.com</a>
          <br />
          others...
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
