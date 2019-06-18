<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import InfoTag from '~/components/Article/InfoTag'
import { Card, Input } from '~/components/UI'

import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import ArticleSearchApi from '~/services/api/ArticleSearchApi'

export default {
  name: 'Post',
  components: {
  },
  data () {
    return {
      title: 'Post',
      articles: [],
      searchText: ''
    }
  },
  watch: {
    '$route' (to, from) {
      window.location.reload(true)
    }
  },
  async asyncData ({ app }) {
    let articles
    const query = {}
    if (app.router.history.current.query) {
      const categories = app.router.history.current.query
      for (const k in categories) {
        if (categories.hasOwnProperty(k)) {
          query[k] = categories[k].split(',')
        }
      }
    }
    const res = await ArticleSearchApi.postInfo(query)
    if (!res.data) articles = []
    else {
      articles = res.data
    }
    return { articles: articles, query: query }
  },
  beforeCreate () {
    i18n(localeMessage, this.$store)
  },
  methods: {
    onChangeInput (e) {
      this.searchText = e.target.value
    },
    chooseArticle (articleId) {
      // this.$router.push({ path: '/a/' + articleId })
      if (!window) return
      window.open(window.location.origin + '/a/' + articleId, '_blank')
    },
    async searchArticle () {
      if (this.searchText) {
        this.query.text = this.searchText
        this.query.searchArticle = true
        const res = await ArticleSearchApi.postInfo(this.query)
        if (!res.data) this.articles = []
        else {
          this.articles = res.data
        }
      }
      await console.log(this.searchText)
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
        <Card className="articles" nativeOnClick={() => this.chooseArticle(article.articleId)}>
          <div class="content" >
            <h1 class="title">{article.title}</h1>
          </div>
          <div class="description">
            <InfoTag articleInfo={article} />
          </div>
        </Card>
      )
    })
    return (
      <div class="Post">
        <Header />
        <div class="container">
          <div>
            <Card className="searchArticle" >
              <Input
                type="searchText"
                onInput={this.onChangeInput}
                value={this.searchText}
                onKeydownEnter={this.searchArticle}
              />
            </Card>
          </div>
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
