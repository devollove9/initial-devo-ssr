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
        <div class="briefIntro">
          (Most) Front-end: mobile, web, vue, react, etc..
          <br />
          (Many) Back-end: nodejs, mongodb, koa, express, etc...
          <br />
          (Some) Android app: gradle, java, etc...
          <br />
          (few) IOS app: swift, learning..
        </div>
        <div class="myWorks">
          517.today
          <br/>
          impactLink
          <br/>
          funchinaworld
          <br/>
          employee
          <br />
          517today.com, other...
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
