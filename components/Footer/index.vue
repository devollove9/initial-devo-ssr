<script>
import LanguageSelection from '~/components/LanguageSelection'
export default {
  name: 'Footer',
  render () {
    return (
      <footer class="Footer">
        <div class="footer-container">
          <div class="privacyAndRights">
            All right reserved © Initial. Devo. 2015
          </div>
          <div class="languageSelection">
            <LanguageSelection/>
          </div>
        </div>
      </footer>
    )
  }
}
</script>

<style lang="scss">
  @import "./index.scss";
</style>
