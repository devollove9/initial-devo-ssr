<script>
export default {
  name: 'Logo',
  props: {
    className: String,
    width: Number,
    height: Number
  },
  methods: {
  },
  render () {
    return (
      <div class={'logo ' + this.className} onClick={this.$listeners.click}>
        <div className="circle"/>
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
