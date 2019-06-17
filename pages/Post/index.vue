<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import InfoTag from '~/components/Article/InfoTag'
import { Card } from '~/components/UI'

import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import ArticleApi from '~/services/api/ArticleApi'

export default {
  name: 'Post',
  components: {
  },
  data () {
    return {
      title: 'Post',
      articles: []
    }
  },
  async asyncData () {
    let articles
    const res = await ArticleApi.getInfo({})
    if (!res.data) articles = []
    else {
      articles = res.data
    }
    return { articles: articles }
  },
  beforeCreate () {
    i18n(localeMessage, this.$store)
  },
  methods: {
    chooseArticle (articleId) {
      this.$router.push({ path: '/a/' + articleId })
    }
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
    const cards = this.articles.map((article) => {
      // const d = new Date(article.publishDate)
      // const date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
      return (
        <Card class="Card" nativeOnClick={() => this.chooseArticle(article.articleId)}>
          <div class="content" >
            <h1 class="title">{article.title}</h1>
          </div>
          <div class="description" style={ { color: this.textColor } }>
            <InfoTag articleInfo={article} />
          </div>
        </Card>
      )
    })
    return (
      <div class="Post">
        <Header />
        <div class="container">
          {cards}
        </div>
        <Footer />
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
