<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Article from '~/components/Article'
import ArticleApi from '~/services/api/ArticleApi'

export default {
  name: 'A',
  components: {
  },
  data () {
    return {
      title: 'Article',
      articleInfo: {}
    }
  },
  computed: {
  },
  async asyncData ({ app, params }) {
    const res = await ArticleApi.getInfo({ articleId: params.id })
    if (!res.data) app.router.push({ path: '/notfound' })
    else {
      const articleInfo = res.data[0]
      return { articleInfo: articleInfo }
    }
  },
  validate ({ params }) {
    return /^[a-f0-9]{22}$/.test(params.id)
  },
  beforeCreate () {
    i18n(localeMessage, this.$store)
  },
  methods: {
  },
  head () {
    return {
      title: this.articleInfo.title || this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Article' }
      ]
    }
  },
  render () {
    return (
      <div class="A" >
        <Header/>
        <Article articleInfo = {this.articleInfo} />
        <Footer/>
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
