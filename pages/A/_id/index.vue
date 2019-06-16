<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import ArticleApi from '~/services/api/ArticleApi'
import hljs from 'highlight.js'

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
    editor () {
      return this.myQuillEditor
    },
    contentCode () {
      return hljs.highlightAuto(this.content).value
    }
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
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Article' }
      ]
    }
  },
  render () {
    return (
      <div class="Article" >
        <Header/>
        <div class="container" >
          <div class="content" domPropsInnerHTML={this.articleInfo.content}>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
