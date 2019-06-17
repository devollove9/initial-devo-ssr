<script>
import WriteArticle from '~/components/WriteArticle'
import ArticleCategoryApi from '~/services/api/ArticleCategoryApi'

export default {
  components: {
  },
  async asyncData ({ app }) {
    const res = await ArticleCategoryApi.getInfo({})
    let data
    if (!res.data) app.router.push({ path: '/notfound' })
    else {
      data = res.data
    }
    return {
      categoryInfo: data
    }
  },
  render () {
    return (
      <div className="Test1">
        <div className="container">
          <WriteArticle categoryInfo={this.categoryInfo}/>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
