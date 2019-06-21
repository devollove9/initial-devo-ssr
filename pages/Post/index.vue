<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import InfoTag from '~/components/Article/InfoTag'
import FloatingGroup from '~/components/FloatingGroup'
import { Card, Input } from '~/components/UI'

import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import ArticleSearchApi from '~/services/api/ArticleSearchApi'
import PublicCommonGetServerTimeApi from '~/services/api/PublicCommonGetServerTimeApi'

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
  computed: {
    totalRecords () {
      let totalRecords = 0
      if (this.articles.length > 0) totalRecords = this.articles[0].total
      return totalRecords
    },
    totalPages () {
      let totalPages = 1
      if (this.totalRecords > this.articles.length) {
        totalPages = Math.ceil(this.totalRecords / this.query.limit)
      }
      return totalPages
    },
    pages () {
      const pages = []
      let start = 1
      let end = this.totalPages
      let offset = 0
      start = this.query.page - 4
      if (start < 1) {
        offset = -start + 1
        start = 1
      }
      end = this.query.page + 3 + offset
      if (end > this.totalPages) {
        start -= end - this.totalPages
        end = this.totalPages
        if (start < 1) start = 1
      }
      for (let i = start; i <= end; i++) {
        if (i === this.query.page) pages.push({ page: i, selected: 'selected' })
        else pages.push({ page: i, selected: '' })
      }
      return pages
    }
  },
  watch: {
    '$route' () {
      window.location.reload(true)
    }
  },
  async asyncData ({ app }) {
    let serverTime = new Date().getTime()
    let searched = false
    const s = await PublicCommonGetServerTimeApi.getInfo({})
    if (s.data) {
      serverTime = s.data.timestamp
    }
    let articles
    const query = {}
    if (app.router.history.current.query) {
      const categories = app.router.history.current.query
      for (const k in categories) {
        searched = true
        if (categories.hasOwnProperty(k)) {
          if (k === 'name') query[k] = categories[k].split(',')
          else if (k === 'page' || k === 'limit')query[k] = categories[k]
        }
      }
    }
    if (!query.page) {
      query.page = 1
    }
    const res = await ArticleSearchApi.postInfo(query)

    if (!res.data) articles = []
    else articles = res.data
    const pageSize = [
      { size: 10, selected: 'selected' },
      { size: 5, selected: '' },
      { size: 25, selected: '' },
      { size: 50, selected: '' },
      { size: 0, selected: '' }
    ]
    if (!query.limit) {
      query.limit = pageSize[0].size
    }
    return {
      articles: articles,
      query: query,
      serverTime: serverTime,
      pageSize: pageSize,
      searched: searched
    }
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
    changePage (e, page) {
      this.$nuxt.$loading.start()
      if (window) window.scrollTo(0, 0)
      if (page === 'previous') this.query.page = this.query.page - 1
      else if (page === 'next') this.query.page = this.query.page + 1
      else this.query.page = page
      this.performArticleSearch()
      this.$nuxt.$loading.finish()
    },
    handleSearchText () {
      if (this.searchText) this.query.text = this.searchText
      else {
        delete this.query.text
        delete this.query.searchArticle
      }
    },
    selectPageSize () {
      for (let i = 0; i < this.pageSize.length; i++) {
        this.pageSize[i].selected = ''
        if (this.pageSize[i].size === this.query.limit) this.pageSize[i].selected = 'selected'
      }
    },
    async changePageSize (e, pageSize) {
      this.$nuxt.$loading.start()
      this.serverTime = new Date().getTime()
      const s = await PublicCommonGetServerTimeApi.getInfo({})
      if (s.data) {
        this.serverTime = s.data.timestamp
      }
      this.query.limit = pageSize
      this.query.page = 1
      this.selectPageSize()
      this.handleSearchText()
      this.performArticleSearch()
      this.$nuxt.$loading.finish()
    },
    searchArticle () {
      if (this.searchText) {
        this.$nuxt.$loading.start()
        this.query.text = this.searchText
        this.query.searchArticle = true
        this.query.limit = this.pageSize[0].size
        this.query.page = 1
        const res = this.performArticleSearch()
        if (res) {
          this.searched = true
          this.selectPageSize()
        }
        this.$nuxt.$loading.finish()
      } else {
        delete this.query.text
        delete this.query.searchArticle
      }
    },
    async performArticleSearch () {
      const res = await ArticleSearchApi.postInfo(this.query)
      if (!res.data) {
        this.articles = []
        return false
      } else {
        this.articles = res.data
        this.searchText = this.query.text
      }
      return true
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
      return (
        <Card className="articles" nativeOnClick={() => this.chooseArticle(article.articleId)}>
          <div class="content" >
            <h1 class="title">{article.title}</h1>
          </div>
          <div class="description">
            <InfoTag serverTime={this.serverTime} articleInfo={article} />
          </div>
        </Card>
      )
    })
    const pageSizes = this.pageSize.map((p) => {
      return (
        <span
          class={'choice ' + p.selected}
          onClick={e => this.changePageSize(e, p.size)}
        >
          {p.size === 0 ? this.$t('post.all') : p.size}
        </span>
      )
    })
    const pageIndexes = this.pages.map((p) => {
      return (
        <span
          class={'pageSelect ' + p.selected}
          onClick={e => this.changePage(e, p.page)}
        >{p.page}</span>
      )
    })
    return (
      <div class="Post">
        <Header />
        <div class="container">
          <div class="searchContainer">
            <Card className="searchArticle" >
              <Input
                type="searchText"
                onInput={this.onChangeInput}
                value={this.searchText}
                styles={{ height: '45px' }}
                onKeydownEnter={this.searchArticle}
              />
            </Card>
            <div class="searchToolBox">
              <div class="collapse-searchDetail">
                <div class="advancedSearch" >{this.$t('post.advanced')}</div>
                <div class="choosePageLimit">
                  {this.$t('post.show')}
                  {pageSizes}
                  {this.$t('post.result')}
                </div>
              </div>
            </div>
          </div>
          {(this.searched || this.query.name) && <div class="searchResult">
            <span>{this.totalRecords > 0 ? this.$t('post.found') + ' ' + this.totalRecords + ' ' + this.$t('post.recordFound') : this.$t('post.noRecord')}</span>
          </div>}
          <div class="contentItems">
            {cards}
          </div>
          {this.totalPages > 1 &&
            <div class='pager'>
              {this.query.page !== 1 && <span class='pageSelect previous' onClick={e => this.changePage(e, 'previous')}>{this.$t('post.previous')}</span>}
              {pageIndexes}
              {this.query.page !== this.totalPages && <span class='pageSelect next' onClick={e => this.changePage(e, 'next')}>{this.$t('post.next')}</span>}
            </div>
          }
        </div>
        <FloatingGroup />
        <Footer />
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
