<script>
import Category from '~/components/Article/Category'
import i18n from '~/libs/i18n'
import getDate from '~/libs/getDate'
import localeMessage from './index.i18n.js'

export default {
  name: 'InfoTag',
  props: {
    className: String,
    articleInfo: Object,
    serverTime: Number
  },
  data () {
    const categoryInfo = this.articleInfo.categories.map((category) => {
      return (<Category categoryInfo = {category} />)
    })
    return {
      publishDate: getDate(this.$store.getters.getActiveLocale, this.articleInfo.publishDate),
      categories: categoryInfo,
      updateDate: getDate(this.$store.getters.getActiveLocale, this.articleInfo.updateDate)
    }
  },
  async beforeCreate () {
    await i18n(localeMessage, this.$store)
  },
  methods: {
    onClickEvent (e) {
      if (this.onClick) {
        this.onClick(e)
      }
    }
  },
  render () {
    return (
      <div class='InfoTag'>
        <div class="center">
          <div class="firstrow">
            <span class="tagContent arthorName"> {this.articleInfo.authorName} </span>
            <span class="tagContent grey"> {(this.articleInfo.updateDate === this.articleInfo.publishDate) ? ` ${this.$t('article.infoTag.publishedOn')} ` : ` ${this.$t('article.infoTag.updatedOn')} `}{(this.serverTime - this.articleInfo.updateDate > 1728000000 && this.$store.getters.getActiveLocale === 'en-US') ? 'on' : ''}</span>
            <span class="tagContent publishdate">
              {(this.articleInfo.updateDate === this.articleInfo.publishDate) ? getDate(this.$store.getters.getActiveLocale, this.articleInfo.publishDate, this.serverTime) : getDate(this.$store.getters.getActiveLocale, this.articleInfo.updateDate, this.serverTime)},</span>
            <span class="tabContent views"> {this.articleInfo.viewCount}{(this.$store.getters.getActiveLocale === 'en-US') ? ' ' : ''}{this.$t('article.infoTag.views')}</span>
          </div>
          <div class="secondrow">
            {this.categories}
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
