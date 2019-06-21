<script>
export default {
  name: 'ProgressCircle',
  props: {
    className: String,
    width: Number,
    height: Number
  },
  methods: {
  },
  render () {
    return (
      <div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
