<script>
import { Icon } from '@/components/UI'

const findItem = (itemArray, key) => {
  let item
  for (const i in itemArray) {
    if (itemArray[i].key === key) {
      item = itemArray[i]
    }
  }
  return item
}

export default {
  name: 'IconDropDown',
  props: {
    className: String,
    defaultVal: String,
    placeHolder: Object,
    w: Number,
    h: Number,
    items: Array,
    trigger: String,
    srcPath: String
  },
  data () {
    const d = this.items || [{ value: 'Menu' }]
    return {
      defaultValue: this.defaultVal || d[0].value,
      dropDowns: d
    }
  },
  methods: {
    onClickEvent (e) {
      if (this.$listeners.click) {
        this.$listeners.click(e)
      }
    },
    onSelectEvent (e) {
      this.defaultValue = findItem(this.$data.dropDowns, e).value
      if (this.$listeners.select) {
        this.$listeners.select(e)
      }
    }
  },
  render () {
    const dropDowns = this.items || [{ value: 'Menu' }]
    const dropDownItems = dropDowns.map((item) => {
      return (
        <el-dropdown-item class="items" command={item.key}>{this.$t(item.value)}</el-dropdown-item>
      )
    })
    return (
      <div class={'IconDropDown ' + this.className} onClick={this.onClickEvent}>
        <el-dropdown v-on:command={this.onSelectEvent} trigger={this.trigger}>
          <span class="el-dropdown-link">
            <Icon className={'icon-' + this.className} srcPath={this.srcPath} w={this.w} h={this.h}/>
          </span>
          <el-dropdown-menu slot="dropdown">
            {dropDownItems}
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
