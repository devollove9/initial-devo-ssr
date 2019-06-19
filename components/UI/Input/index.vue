<script>
export default {
  name: 'Input',
  props: {
    type: String,
    value: String,
    placeholder: String,
    styles: Object,
    w: Number,
    h: Number
  },
  data () {
    return {
    }
  },
  methods: {
    keyDownEnter (e) {
      if (e.keyCode === 13) {
        this.$listeners.keydownEnter(e)
      }
    }
  },
  render () {
    if (this.styles.height) {
      this.styles.paddingLeft = this.styles.height
    }
    return (
      <input
        style={this.styles}
        class={`ui-input ${this.type}`}
        type={this.type}
        value={this.value}
        onInput={this.$listeners.input}// this.$listeners.input}
        onKeydown={ e => this.keyDownEnter(e)}
        placeholder={this.placeholder}
      />
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
