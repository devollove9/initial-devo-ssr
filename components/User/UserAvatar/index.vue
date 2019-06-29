<script>

export default {
  name: 'UserAvatar',
  components: {
  },
  props: {
    className: String,
    username: String
  },
  computed: {
  },
  beforeCreate () {
  },
  methods: {
  },
  render () {
    return (
      <div class={'UserAvatar ' + this.className}>
        <a>
          <div class="avatar-wrap" title={this.username}>
            {this.username[0].toUpperCase()}
          </div>
        </a>
      </div>
    )
  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
