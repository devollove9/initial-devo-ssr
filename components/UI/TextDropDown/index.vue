<script>
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
  name: 'TextDropDown',
  props: {
    className: String,
    defaultVal: String,
    w: Number,
    h: Number,
    placeHolder: Object,
    trigger: String,
    items: Array
  },
  data () {
    const d = this.items || [ { value: 'Menu' } ]
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
    const dropDowns = this.items || [ { value: 'Menu' } ]
    const dropDownItems = dropDowns.map((item) => {
      return (
        <el-dropdown-item class="items" command={item.key} >{item.value}</el-dropdown-item>
      )
    })
    return (
      <div class={'TextDropDown ' + this.className}>
        <el-dropdown v-on:command={this.onSelectEvent} trigger={this.trigger}>
          <span class="el-dropdown-link dropDownMenu">
            {this.defaultValue}<i class="el-icon-arrow-down el-icon--right"></i>
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
