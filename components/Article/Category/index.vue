<script>
export default {
  name: 'Category',
  components: {
  },
  props: {
    className: String,
    categoryInfo: Object,
    onClick: Function
  },
  data () {
    return {
    }
  },

  beforeCreate () {
    // i18n(localeMessage, this.$store)
  },
  methods: {
  },
  render () {
    return (
      <div class="Category" >
        <div class="categoryInfo">
          <span>
            {(this.$store.getters.getActiveLocale === 'en-US') ? this.categoryInfo.name : this.categoryInfo.nameCN }
          </span>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
