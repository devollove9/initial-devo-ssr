<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import InfoTag from '~/components/Article/InfoTag'
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
  watch: {
    '$route' (to, from) {
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
          else query[k] = categories[k]
        }
      }
    }
    if (!query.page) {
      query.page = 1
    }
    const res = await ArticleSearchApi.postInfo(query)
    let totalRecords = 0
    if (!res.data) articles = []
    else {
      articles = res.data
      if (res.data.length > 0) {
        totalRecords = res.data[0].total
      }
    }
    const pageSize = [
      { size: 10, selected: 'selected' },
      { size: 1, selected: '' },
      { size: 2, selected: '' },
      { size: 3, selected: '' },
      { size: 25, selected: '' },
      { size: 50, selected: '' },
      { size: 0, selected: '' }
    ]
    if (!query.limit) {
      query.limit = pageSize[0].size
    }
    let totalPages = 1
    if (totalRecords > articles.length) {
      const d = query.limit || pageSize[0].size
      totalPages = Math.ceil(totalRecords / d)
    }
    const pages = []
    let start = 1
    let end = totalPages
    let offset = 0
    start = query.page - 5
    if (start < 1) {
      offset = -start
      start = 1
    }
    end = query.page + 5 + offset
    if (end > totalPages) {
      start -= end - totalPages
      end = totalPages
      if (start < 1) start = 1
    }
    for (let i = start; i <= end; i++) {
      if (i === query.page) pages.push({ page: i, selected: 'selected' })
      else pages.push({ page: i, selected: '' })
    }
    return {
      articles: articles,
      query: query,
      serverTime: serverTime,
      pageSize: pageSize,
      pages: pages,
      totalPages: totalPages,
      totalRecords: totalRecords,
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
    async changePage (e, page) {
      if (page === 'previous') this.query.page = this.query.page - 1
      else if (page === 'next') this.query.page = this.query.page + 1
      else this.query.page = page
      const res = await ArticleSearchApi.postInfo(this.query)
      this.totalRecords = 0
      if (this.searchText) this.query.text = this.searchText
      else {
        delete this.query.text
        delete this.query.searchArticle
      }
      if (!res.data) this.articles = []
      else {
        this.articles = res.data
        if (res.data.length > 0) this.totalRecords = res.data[0].total
      }
      this.totalPages = 1
      if (this.totalRecords > this.articles.length) {
        this.totalPages = Math.ceil(this.totalRecords / this.query.limit)
      }
      const pages = []
      let start = 1
      let end = this.totalPages
      let offset = 0
      start = this.query.page - 5
      if (start < 1) {
        offset = -start
        start = 1
      }
      end = this.query.page + 5 + offset
      if (end > this.totalPages) {
        start -= end - this.totalPages
        end = this.totalPages
        if (start < 1) start = 1
      }
      for (let i = start; i <= end; i++) {
        if (i === this.query.page) pages.push({ page: i, selected: 'selected' })
        else pages.push({ page: i, selected: '' })
      }
      this.pages = pages
    },
    async changePageSize (e, pageSize) {
      for (let i = 0; i < this.pageSize.length; i++) {
        this.pageSize[i].selected = ''
        if (this.pageSize[i].size === pageSize) this.pageSize[i].selected = 'selected'
      }
      this.serverTime = new Date().getTime()
      const s = await PublicCommonGetServerTimeApi.getInfo({})
      if (s.data) {
        this.serverTime = s.data.timestamp
      }
      this.query.limit = pageSize
      this.query.page = 1
      if (this.searchText) this.query.text = this.searchText
      else {
        delete this.query.text
        delete this.query.searchArticle
      }
      const res = await ArticleSearchApi.postInfo(this.query)
      this.totalRecords = 0
      if (!res.data) this.articles = []
      else {
        this.articles = res.data
        if (res.data.length > 0) this.totalRecords = res.data[0].total
      }
      this.totalPages = 1
      if (this.totalRecords > this.articles.length) {
        this.totalPages = Math.ceil(this.totalRecords / this.query.limit)
      }
      const pages = []
      let start = 1
      let end = this.totalPages
      let offset = 0
      start = this.query.page - 5
      if (start < 1) {
        offset = -start
        start = 1
      }
      end = this.query.page + 5 + offset
      if (end > this.totalPages) {
        start -= end - this.totalPages
        end = this.totalPages
        if (start < 1) start = 1
      }
      for (let i = start; i <= end; i++) {
        if (i === this.query.page) pages.push({ page: i, selected: 'selected' })
        else pages.push({ page: i, selected: '' })
      }
      this.pages = pages
    },
    async searchArticle () {
      if (this.searchText) {
        this.query.text = this.searchText
        this.query.searchArticle = true
        this.query.limit = this.pages[0].size
        this.query.page = 1
        const res = await ArticleSearchApi.postInfo(this.query)
        this.totalRecords = 0
        if (!res.data) this.articles = []
        else {
          this.searched = true
          this.articles = res.data
          if (res.data.length > 0) {
            this.totalRecords = res.data[0].total
          }
          for (let i = 0; i < this.pageSize.length; i++) {
            this.pageSize[i].selected = ''
            if (i === 0) this.pageSize[i].selected = 'selected'
          }
        }
        this.totalPages = 1
        if (this.totalRecords > this.articles.length) {
          this.totalPages = Math.ceil(this.totalRecords / this.query.limit)
        }
        const pages = []
        let start = 1
        let end = this.totalPages
        let offset = 0
        start = this.query.page - 5
        if (start < 1) {
          offset = -start
          start = 1
        }
        end = this.query.page + 5 + offset
        if (end > this.totalPages) {
          start -= end - this.totalPages
          end = this.totalPages
          if (start < 1) start = 1
        }
        for (let i = start; i <= end; i++) {
          if (i === this.query.page) pages.push({ page: i, selected: 'selected' })
          else pages.push({ page: i, selected: '' })
        }
        this.pages = pages
      }
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
          {this.searched && <div class="searchResult">
            {this.totalRecords > 0 ? this.$t('post.about') + ' ' + this.totalRecords + ' ' + this.$t('post.recordFound') : this.$t('post.noRecord')}
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
        <Footer />
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
