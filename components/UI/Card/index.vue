<script>
export default {
  name: 'Card',
  methods: {
    onClickEvent (e) {
      if (this.onClick) {
        this.onClick(e)
      }
    }
  },
  data () {
    return {
    }
  },
  props: {
    className: String,
    defaultVal: String,
    onClick: Function,
    w: Number,
    h: Number
  },
  render () {
    return (
      <div class={'Card ' + this.className} style={{ width: this.w, height: this.h }} onClick={this.onClickEvent}>
        {this.$slots.default}
      </div>
    )
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
