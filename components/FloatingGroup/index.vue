<script>
export default {
  name: 'FloatingGroup',
  props: {
  },
  data () {
    return {
      floating: 'active'
    }
  },
  mounted () {
    if (!window) return
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleScroll)
    this.handleScroll()
  },
  beforeDestroy () {
    if (!window) return
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
  },
  methods: {
    backToTop () {
      if (!window) return
      let offset = window.pageYOffset
      const scroller = setInterval(() => {
        offset -= 100
        window.scrollTo(0, offset)
        if (offset < 0) clearInterval(scroller)
      }, 10)
    },
    handleScroll () {
      if (!window) return
      if (window.pageYOffset > 150 || window.innerHeight > 604) {
        this.floating = 'active'
      } else {
        this.floating = 'stop'
      }
    },
    popSocial (target) {
      if (!window) return
      let url = window.location.origin + '/' + this.$route.currentRoute
      switch (target) {
        case 'github':
          url = 'https://github.com/devollove9/initial-devo-ssr'
          break
        case 'linkedin':
          url = 'https://www.linkedin.com/in/yaxing-li-540b9483/'
          break
      }
      window.open(url, '_blank')
    }
  },
  render () {
    return (
      <div class={`SocialGroup-floating ${this.floating}`}>
        <button
          class="floating-button linkedin"
          onClick={() => this.popSocial('linkedin')}
        />
        <button
          class="floating-button github"
          onClick={() => this.popSocial('github')}
        />
        <button
          class={`floating-button backToTop`}
          onClick={() => this.backToTop()}
        />
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import "./index.scss";
</style>
