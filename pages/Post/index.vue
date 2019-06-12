<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { Card } from '@/components/UI'

import i18n from '@/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  name: 'Post',
  components: {
  },
  data () {
    return {
      textColor: 'red'
    }
  },
  beforeCreate () {
    i18n(localeMessage, this.$store)
  },
  methods: {
    testAAA (a) {
      console.log(a)
      this.textColor = 'orange'
    }
  },
  render () {
    const articles = [
      {
        articleId: '1',
        title: 'How to quickly understand java',
        authorName: 'Yaxing Li',
        publishDate: 1557641755000,
        viewCount: 25,
        uniqueViewCount: 1,
        rating: 5,
        contentId: '2'
      }, {
        articleId: '1',
        title: 'How to quickly understand java',
        authorName: 'Yaxing Li',
        publishDate: 1557641755000,
        viewCount: 25,
        uniqueViewCount: 1,
        rating: 5,
        contentId: '2'
      }]
    const cards = articles.map((article) => {
      return (
        <Card className="Card111" nativeOnClick={() => this.testAAA(article.articleId)}>
          <div class="content" >
            <div class="Title">
              {article.title}
            </div>
          </div>
          <div class="description" style={ { color: this.textColor } }>
            Posted: {new Date(article.publishDate)} Author: {article.authorName} View Count: {article.viewCount}
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
