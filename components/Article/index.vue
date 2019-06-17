<script>

import ArticleTitle from '~/components/Article/Title'
export default {
  name: 'Article',
  components: {
    ArticleTitle
  },
  props: {
    className: String,
    articleInfo: Object,
    onClick: Function,
    w: Number,
    h: Number
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
      <div class="Article" >
        <div class="container" >
          <ArticleTitle articleInfo = {this.articleInfo} />
          <div class="content" domPropsInnerHTML={this.articleInfo.content}>
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
