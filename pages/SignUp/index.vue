<script>
import { Logo } from '~/components/UI'
import SignUpForm from '~/components/SignUpForm'
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  name: 'SignIn',
  method: {
    backToRoot () {
      this.$router.push('/')
    }
  },
  async beforeCreate () {
    await i18n(localeMessage, this.$store)
  },
  render () {
    return (
      <div class='SignUp'>
        <div class='container'>
          <div class='header'>
            <Logo className='logoSignUp' onClick={() => this.backToRoot}/>
            <h1 class='title'>Join Now</h1>
            <p class='description'>
              <span>Whatever reason you doing this, do it!</span>
              <br/>
              <span>Create your account now</span>
            </p>
          </div>
          <div class='form'>
            <SignUpForm />
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
