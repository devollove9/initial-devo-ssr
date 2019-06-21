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
        <el-button class="form-button-submit" type="primary" @click.prevent="onSubmit">{{ $t('signInForm.submit') }}</el-button>
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
      if (target === 'forget') window.open(window.location.origin + '/forget', '_blank')
      if (target === 'signup') window.open(window.location.origin + '/signup?source=signin-page', '_blank')
      if (target === 'home') window.open(window.location.origin, '_self')
    },
    async onSubmit () {
      this.$nuxt.$loading.start()
      const res = await AuthEmailApi.login(
        {
          username: this.user.username,
          password: md5(this.user.pass),
          maxAge: 144000
        })
      if (!res.data) {
        // Server return an error
        this.$message({
          showClose: true,
          message: this.$t('signInForm.warning'),
          type: 'warning',
          duration: 6000
        })
      } else {
        // Login success? false?
      }
      this.$nuxt.$loading.finish()
    }
  }
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
