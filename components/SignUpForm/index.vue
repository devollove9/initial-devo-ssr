<template>
  <div class="SignUpForm">
    <p class="description">
      <span v-if="!signUpSuccess">{{ $t('signUpForm.titleCreate') }}</span>
      <span v-else>{{ $t('signUpForm.titleSuccess') }}</span>
    </p>
    <el-form
      v-if="!signUpSuccess"
      ref="ruleForm"
      class="signup-container"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-position="top"
      label-width="auto"
      :disabled="submitDisabled === true"
    >
      <el-form-item class="form-label" :label="$t('signUpForm.label.username')" prop="username">
        <el-input v-model="ruleForm.username" type="email" />
      </el-form-item>
      <el-form-item class="form-label" :label="$t('signUpForm.label.password')" prop="pass">
        <el-input v-model="ruleForm.pass" :type="passwordType" size="large">
          <div slot="suffix" class="iconGroup">
            <i
              slot="suffix"
              :class="iconClass"
              :title="$t('signUpForm.showPassword')"
              style="cursor:pointer;}"
              @click="changePassType"
            />
            <i
              slot="suffix"
              :class="iconClass2"
              :title="$t('signUpForm.hidePassword')"
              style="cursor:pointer;}"
              @click="changePassType"
            />
          </div>
        </el-input>
      </el-form-item>
      <el-form-item class="form-label" :label="$t('signUpForm.label.confirmPassword')" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" />
      </el-form-item>
      <div class="privacyAndTerms-container">
        <p>
          {{ $t('signUpForm.statement.p1') + $t('signUpForm.submit') + $t('signUpForm.statement.p2') }}
          <span class="hyperlink" @click="jumpTo('terms')">{{ $t('signUpForm.statement.termsAndService') }}</span>
          {{ $t('signUpForm.statement.and') }}
          <span class="hyperlink" @click="jumpTo('privacy')">{{ $t('signUpForm.statement.privacyStatement') }}</span>
          {{ $t('signUpForm.statement.end') }}
        </p>
      </div>
      <el-form-item class="form-button">
        <el-button :disabled="submitDisabled === true" class="form-button-submit" type="primary" @click.prevent="onSubmit">{{ $t('signUpForm.submit') }}</el-button>
        <div class="form-button-signin">
          <span>{{ $t('signUpForm.haveAccount') }}</span>
          <br>
          <span class="hyperlink signin" @click="jumpTo('signin')">{{ $t('signUpForm.signInNow') }}</span>
        </div>
      </el-form-item>
    </el-form>
    <div v-else class="signup-success-container">
      <div class="successAnim">
        <ProgressCircle />
      </div>
      <p class="description">
        <span>{{ $t('signUpForm.redirect') + ' ' + pageJumpCountDown + ' ' + $t('signUpForm.seconds') }}</span>
        <br>
        <span>{{ $t('signUpForm.goto') }}</span>
        <span class="hyperlink" @click="jumpTo('home')">{{ $t('signUpForm.homePage') }}</span>
        <span>{{ $t('signUpForm.or') }}</span>
        <span class="hyperlink" @click="jumpTo('signin')">{{ $t('signUpForm.signInPage') }}</span>
        <span>{{ $t('signUpForm.now') }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import validateInput from '~/libs/validateInput'
import AuthEmailApi from '~/services/api/AuthEmailApi'
import { ProgressCircle } from '~/components/UI'
import md5 from 'md5'

export default {
  name: 'SignUp',
  components: {
    ProgressCircle
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(this.$t('signUpForm.error.enterPass')))
      } else {
        if (this.ruleForm.pass.length < 8 || this.ruleForm.pass.length > 32) {
          return callback(new Error(this.$t('signUpForm.error.enterPassAgain')))
        } else if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        return callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(this.$t('signUpForm.error.enterAgain')))
      } else if (value.length < 8 || value.length > 32) {
        return callback(new Error(this.$t('signUpForm.error.enterPassAgain')))
      } else if (value !== this.ruleForm.pass) {
        return callback(new Error(this.$t('signUpForm.error.passNoMatch')))
      } else {
        return callback()
      }
    }
    return {
      checkedEmail: '',
      submitDisabled: false,
      pageJumpCountDown: 10,
      manuallySwitched: false,
      signUpSuccess: false,
      running: false,
      checked: 0,
      checkedTime: 0,
      iconClass: 'el-icon-view show-password',
      iconClass2: 'el-icon-close hide-password-hide',
      passwordType: 'password',
      ruleForm: {
        pass: '',
        checkPass: '',
        username: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'change' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'change' }
        ],
        username: [
          { validator: this.checkEmail, trigger: 'change' }
        ]
      }
    }
  },
  async beforeCreate () {
    await i18n(localeMessage, this.$store)
  },
  methods: {
    switchSuccess () {
      this.signUpSuccess = true
      this.pageJumpCountDown = 10
      setInterval(() => { this.pageJumpCountDown-- }, 1000)
      setTimeout(() => {
        if (window && !this.manuallySwitched) window.open(window.location.origin, '_self')
      }, 10000)
    },
    jumpTo (target) {
      if (!window) return
      if (target === 'terms') window.open(window.location.origin + '/terms-of-service', '_blank')
      if (target === 'privacy') window.open(window.location.origin + '/privacy-statement', '_blank')
      if (target === 'home') {
        this.manuallySwitched = true
        window.open(window.location.origin, '_self')
      }
      if (target === 'signin') {
        this.manuallySwitched = true
        window.open(window.location.origin + '/signin', '_self')
      }
    },
    onSubmit () {
      if (this.submitDisabled || this.running) return
      this.submitDisabled = true
      this.$nuxt.$loading.start()
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await AuthEmailApi.postInfo({ username: this.ruleForm.username, password: md5(this.ruleForm.pass) })
          if (!res.data) {
            this.$message({
              showClose: true,
              message: this.$t('signUpForm.warning'),
              type: 'warning',
              duration: 6000
            })
          } else {
            this.switchSuccess()
          }
          this.submitDisabled = false
          this.$nuxt.$loading.finish()
        } else {
          this.submitDisabled = false
          this.$nuxt.$loading.finish()
        }
      })
    },
    changePassType () {
      if (this.passwordType === 'text') {
        this.passwordType = 'password'
        this.iconClass2 = 'el-icon-close hide-password-hide'
      } else {
        this.passwordType = 'text'
        this.iconClass2 = 'el-icon-close hide-password'
      }
    },
    checkEmail (rule, value, callback) {
      if (this.checkedEmail !== '' && this.checkedEmail === value) return callback()
      if (value === '') {
        this.running = false
        return callback(new Error(this.$t('signUpForm.error.enterUsername')))
      } else if (!validateInput('email', value)) {
        this.running = false
        return callback(new Error(this.$t('signUpForm.error.enterValidUsername')))
      }
      if (this.running === false) {
        this.running = true
        setTimeout(async () => {
          if (!this.ruleForm.username) {
            this.running = false
            return callback(new Error(this.$t('signUpForm.error.enterUsername')))
          }
          if (!validateInput('email', this.ruleForm.username)) {
            this.running = false
            return callback(new Error(this.$t('signUpForm.error.enterValidUsername')))
          }
          const checkedEmail = this.ruleForm.username
          const res = await AuthEmailApi.checkInfo({ username: this.ruleForm.username })
          if (!res.data) {
            this.running = false
            this.$message({
              showClose: true,
              message: this.$t('signUpForm.warning'),
              type: 'warning',
              duration: 4000
            })
            this.checkedEmail = ''
            return callback(new Error(this.$t('signUpForm.error.usernameInvalid')))
          } else if (res.data.exist === true) {
            this.checkedEmail = ''
            this.running = false
            return callback(new Error(this.$t('signUpForm.error.usernameExist')))
          } else {
            this.checkedEmail = checkedEmail
            this.running = false
            return callback()
          }
        }, 1500)
      }
    }
  }
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
