<script>
const findItem = (itemArray, key) => {
  let item
  for (let i in itemArray) {
    if (itemArray[i].key === key) {
      item = itemArray[i]
    }
  }
  return item
}

export default {
  name: 'Menu',
  methods: {
    onClickEvent (e) {
      if (this.$listeners.click) {
        this.$listeners.click(e)
      }
    },
    onSelectEvent (e) {
      this.defaultValue = findItem(this.$data.dropDowns, e).value
      if (this.$listeners.select) {
        this.$listeners.click(e)
      }
    }
  },
  data () {
    return {
    }
  },
  props: {
    className: String,
    defaultKey: String,
    onClick: Function,
    onSelect: Function,
    placeHolder: Object,
    w: Number,
    h: Number,
    items: Array,
    trigger: String
  },
  render () {
    const dropDowns = this.items || [{ value: 'Menu' }]
    const dropDownItems = dropDowns.map((item) => {
      return (
        <el-menu-item index={item.key} >{this.$t(item.value)}</el-menu-item>
      )
    })
    return (
      <div class={'Menu ' + this.className}>
        <el-menu v-bind:default-active={this.defaultKey}  mode={this.mode || "horizontal"}>
          <el-menu-item index="1">{this.$t('header.menu.home')}</el-menu-item>
          <el-menu-item index="2">{this.$t('header.menu.post')}</el-menu-item>
          <el-submenu index="3">
            <template slot="title">{this.$t('header.menu.product')}</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项1</el-menu-item>
              <el-menu-item index="3-4-2">选项2</el-menu-item>
              <el-menu-item index="3-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="4">{this.$t('header.menu.resource')}</el-menu-item>
          <el-menu-item index="5">{this.$t('header.menu.about')}</el-menu-item>
        </el-menu>
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
