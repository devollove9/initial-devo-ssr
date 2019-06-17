<script>
import Category from '~/components/Article/Category'

export default {
  name: 'InfoTag',
  props: {
    className: String,
    articleInfo: Object
  },
  data () {
    const date = new Date(this.articleInfo.publishDate)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const date2 = new Date()
    let updateDate = ''
    if (this.articleInfo.updateDate) {
      const dateUpdate = new Date(this.articleInfo.updateDate)
      const monthU = monthNames[dateUpdate.getMonth()]
      const yearU = (dateUpdate.getFullYear() === date2.getFullYear()) ? '' : dateUpdate.getFullYear()
      let dayU = dateUpdate.getDate()
      if (dayU === 1) dayU += 'st'
      if (dayU === 2) dayU += 'nd'
      if (dayU === 3) dayU += 'rd'
      if (dayU === 4) dayU += 'th'
      updateDate = monthU + ' ' + dayU + ' ' + yearU
    }
    const month = monthNames[date.getMonth()]
    const year = (date.getFullYear() === date2.getFullYear()) ? '' : date.getFullYear()
    let day = date.getDate()
    if (day === 1) day += 'st'
    if (day === 2) day += 'nd'
    if (day === 3) day += 'rd'
    if (day === 4) day += 'th'

    const categoryInfo = this.articleInfo.categories.map((category) => {
      return (<Category categoryInfo = {category} />)
    })
    return {
      publishDate: month + ' ' + day + ' ' + year,
      categories: categoryInfo,
      updateDate: updateDate
    }
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
            <span class="tagContent grey"> {(this.updateDate === this.publishDate) ? ` updated on ` : ` published on `}</span>
            <span class="tagContent publishdate"> {(this.updateDate === this.publishDate) ? this.updateDate : this.publishDate} </span>
          </div>
          <div class="secondrow">
            {this.categories}
            <span class="tabContent views"> {this.articleInfo.viewCount} views</span>
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
