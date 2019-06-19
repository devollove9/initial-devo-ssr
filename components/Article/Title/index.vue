<script>
import InfoTag from '~/components/Article/InfoTag'

export default {
  name: 'ArticleTitle',
  components: {
  },
  props: {
    className: String,
    articleInfo: Object,
    onClick: Function,
    serverTime: Number
  },
  data () {
    return {
    }
  },

  beforeCreate () {
    // i18n(localeMessage, this.$store)
  },
  methods: {
  },
  render () {
    return (
      <div class="ArticleTitle" >
        <div class="container" >
          <h1 class="title">{this.articleInfo.title}</h1>
          <InfoTag serverTime={this.serverTime} articleInfo={this.articleInfo} />
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
