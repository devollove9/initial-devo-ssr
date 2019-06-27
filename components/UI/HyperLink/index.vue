<script>
export default {
  name: 'HyperLink',
  props: {
    className: String,
    styles: {
      type: Object,
      default: () => { return {} }
    },
    text: String,
    dir: String,
    title: String,
    target: {
      type: String,
      default: '_self'
    }
  },
  methods: {
  },
  render () {
    return (
      <a
        class={'hyperLink ' + this.className}
        style={this.styles}
        title={this.title}
        href={this.dir}
        target={this.target}
      >
        {this.$slots.default ? this.$slots.default[0] : (this.$t(this.text) || '')}
      </a>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
