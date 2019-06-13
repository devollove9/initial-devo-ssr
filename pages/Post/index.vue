<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

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
      textColor: 'red',
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
      this.textColor = 'orange'
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
      const d = new Date(article.publishDate)
      const date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
      return (
        <Card className="Card111" nativeOnClick={() => this.chooseArticle(article.articleId)}>
          <div class="content" >
            <div class="Title">
              {article.title}
            </div>
          </div>
          <div class="description" style={ { color: this.textColor } }>
            Posted: {date} Author: {article.authorName} View Count: {article.viewCount}
          </div>
        </Card>
      )
    })
    return (
      <div class="Post">
        <Header />
        <div class="container">
          {cards}
          <Card className="Card111">
            <div class="content" >
              <div class="Title">
                asd
              </div>
            </div>
            <div class="description" style={ { color: this.textColor } }>
              aaaaa
            </div>
          </Card>
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
