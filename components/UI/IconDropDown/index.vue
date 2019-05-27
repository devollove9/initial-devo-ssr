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
  methods: {
    onClickEvent (e) {
      if (this.onClick) {
        this.onClick(e)
      }
    },
    onSelectEvent (e) {
      this.defaultValue = findItem(this.$data.dropDowns, e).value
      if (this.onSelect) {
        this.onSelect(e)
      }
    }
  },
  data () {
    const d = this.items || [{ value: 'Menu' }]
    return {
      defaultValue: this.defaultVal || d[0].value,
      dropDowns: d
    }
  },
  props: {
    className: String,
    defaultVal: String,
    onClick: Function,
    onSelect: Function,
    placeHolder: Object,
    w: Number,
    h: Number,
    items: Array,
    trigger: String,
    srcPath: String
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
