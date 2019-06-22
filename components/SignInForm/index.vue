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
        <el-input v-model="user.pass" type="password" size="large" />
      </el-form-item>
      <el-form-item class="form-button">
        <el-button :disalbed="submitDisabled" class="form-button-submit" type="primary" @click.prevent="onSubmit">{{ $t('signInForm.submit') }}</el-button>
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
import localeMessage from './index.i18n.js'
import AuthEmailApi from '~/services/api/AuthEmailApi'
import md5 from 'md5'

export default {
  name: 'SignIn',
  components: {
  },
  data () {
    return {
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
    async onSubmit () {
      this.$nuxt.$loading.start()
      this.submitDisabled = true
      const res = await AuthEmailApi.login(
        {
          username: this.user.username,
          password: md5(this.user.pass),
          maxAge: 604800
        }
      )
      if (!res.data) {
        let errorCode = '2002'
        if (res.error.errorCode) {
          if (res.error.errorCode.toString() !== errorCode) errorCode = '2004'
        }
        this.$message({
          showClose: true,
          message: this.$t('signInForm.error.code.' + errorCode),
          type: 'warning',
          duration: 6000
        })
        this.submitDisabled = false
        this.$nuxt.$loading.finish()
      } else {
        // Login success? false?
        this.$router.push('/')
        this.$store.commit('updateUserInfo', res.data)
        this.submitDisabled = false
        this.$nuxt.$loading.finish()
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
