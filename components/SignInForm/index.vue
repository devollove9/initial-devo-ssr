<template>
  <div class="SignInForm">
    <p class="description">
      <span>{{ $t('signInForm.title') }}</span>
    </p>
    <el-form
      class="signin-container"
      :model="user"
      status-icon
      label-position="top"
      label-width="auto"
    >
      <el-form-item class="form-label" :label="$t('signInForm.label.username')" prop="username">
        <el-input v-model="user.username" type="email" />
      </el-form-item>
      <div class="forget-password">
        <span class="hyperlink" @click="jumpTo('forget')">{{ $t('signInForm.forgetPassword') }}</span>
      </div>
      <el-form-item class="form-label" :label="$t('signInForm.label.password')" prop="pass">
        <el-input v-model="user.pass" type="password" size="large" @keydown.enter.native="onSubmit" />
      </el-form-item>
      <transition name="signinError">
        <div v-show="showError" class="error-message">
          <span class="error-detail"> {{ errorMessage }}</span>
        </div>
      </transition>
      <el-form-item class="form-button">
        <el-button :disabled="submitDisabled === true" class="form-button-submit" type="primary" @click.prevent="onSubmit">{{ $t('signInForm.submit') }}</el-button>
      </el-form-item>
      <div class="new-user-signup">
        <span>{{ $t('signInForm.createAccount') }}</span>
        <span class="hyperlink" @click="jumpTo('signup')">{{ $t('signInForm.signUpNow') }}</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import i18n from '~/libs/i18n'
import validateInput from '~/libs/validateInput'
import sleep from '~/libs/sleep'
import localeMessage from './index.i18n.js'
import AuthEmailApi from '~/services/api/AuthEmailApi'
import md5 from 'md5'

export default {
  name: 'SignIn',
  components: {
  },
  data () {
    return {
      showError: false,
      errorCode: '',
      submitDisabled: false,
      pageJumpCountDown: 10,
      manuallySwitched: false,
      signInSuccess: false,
      running: false,
      checked: 0,
      checkedTime: 0,
      user: {
        pass: '',
        username: ''
      }
    }
  },
  computed: {
    errorMessage () {
      return this.errorCode ? this.$t('signInForm.error.code.' + this.errorCode) : ''
    }
  },
  async beforeCreate () {
    await i18n(localeMessage, this.$store)
  },
  methods: {
    jumpTo (target) {
      if (!window) return
      if (target === 'forget') window.open(window.location.origin + '/forget', '_self')
      if (target === 'signup') window.open(window.location.origin + '/signup?source=signin-page', '_self')
      if (target === 'home') window.open(window.location.origin, '_self')
    },
    async setErrorCode (code, sleepMs = 200) {
      this.$nuxt.$loading.finish()
      this.showError = true
      await sleep(sleepMs)
      this.errorCode = code
      this.submitDisabled = false
    },
    async onSubmit () {
      this.showError = false
      await sleep(200)
      this.errorCode = ''
      this.$nuxt.$loading.start()
      if (this.submitDisabled) return
      this.submitDisabled = true
      if (!this.user.username) {
        this.setErrorCode('0')
        return
      } else if (!validateInput('email', this.user.username)) {
        this.setErrorCode('2')
        return
      }
      if (!this.user.pass) {
        this.setErrorCode('1')
        return
      } else if (this.user.pass.length < 8 || this.user.pass.length > 32) {
        this.setErrorCode('3')
        return
      }
      const res = await AuthEmailApi.login(
        {
          username: this.user.username,
          password: md5(this.user.pass),
          maxAge: 604800
        },
        null,
        1500
      )
      if (!res.data) {
        let errorCode = '2002'
        if (res.error.errorCode) {
          if (res.error.errorCode.toString() !== errorCode) errorCode = '2004'
        }
        this.showError = true
        await sleep(200)
        this.errorCode = errorCode
        this.submitDisabled = false
        this.$nuxt.$loading.finish()
      } else {
        // Login success? false?
        this.$nuxt.$loading.finish()
        await this.$router.push('/')
        await sleep(300)
        this.$store.commit('updateUserInfo', res.data)
        this.submitDisabled = false
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
