<script>
import SignInForm from '~/components/SignInForm'
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  name: 'SignIn',
  method: {
  },
  async beforeCreate () {
    await i18n(localeMessage, this.$store)
  },
  render () {
    return (
      <div class='SignIn'>
        <Header />
        <div class='container'>
          <div class='signin-header'>
            <h1 class='title'>{this.$t('signin.title')}</h1>
          </div>
          <div class='form'>
            <SignInForm />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
