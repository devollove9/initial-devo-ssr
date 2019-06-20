<template>
  <div class="SignUpForm">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-position="top"
      label-width="auto"
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
            ></i>
            <i
              slot="suffix"
              :class="iconClass2"
              :title="$t('signUpForm.hidePassword')"
              style="cursor:pointer;}"
              @click="changePassType"
            ></i>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item class="form-label" :label="$t('signUpForm.label.confirmPassword')" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" />
      </el-form-item>
      <div class="privacyAndTerms-container">
        <p>
          {{ $t('signUpForm.statement.p1') + $t('signUpForm.submit') + $t('signUpForm.statement.p2') }}
          <span class="privacyAndTerms" @click="jumpTo('terms')">{{ $t('signUpForm.statement.termsAndService') }}</span>
          {{ $t('signUpForm.statement.and') }}
          <span class="privacyAndTerms" @click="jumpTo('privacy')">{{ $t('signUpForm.statement.privacyStatement') }}</span>
          {{ $t('signUpForm.statement.end') }}
        </p>
      </div>
      <el-form-item class="form-button">
        <el-button class="form-button-submit" type="primary" @click.prevent="onSubmit">{{ $t('signUpForm.submit') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import validateInput from '~/libs/validateInput'
import AuthEmailApi from '~/services/api/AuthEmailApi'
import md5 from 'md5'
export default {
  name: 'SignIn',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('signUpForm.error.enterPass')))
      } else {
        if (this.ruleForm.pass.length < 8 || this.ruleForm.pass.length > 32) {
          callback(new Error(this.$t('signUpForm.error.enterPassAgain')))
        } else if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('signUpForm.error.enterAgain')))
      } else if (value.length < 8 || value.length > 32) {
        callback(new Error(this.$t('signUpForm.error.enterPassAgain')))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error(this.$t('signUpForm.error.passNoMatch')))
      } else {
        callback()
      }
    }
    return {
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
    jumpTo (target) {
      if (!window) return
      if (target === 'terms') window.open(window.location.origin + '/terms-of-service', '_blank')
      if (target === 'privacy') window.open(window.location.origin + '/privacy-statement', '_blank')
    },
    onSubmit () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await AuthEmailApi.postInfo({ username: this.ruleForm.username, password: md5(this.ruleForm.pass) })
          if (!res.data) {
            alert('Fail to create account')
          } else {
            alert('Success fully created account')
          }
        } else return false
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
          const res = await AuthEmailApi.checkInfo({ username: this.ruleForm.username })
          if (!res.data) {
            this.running = false
            return callback(new Error(this.$t('signUpForm.error.usernameInvalid')))
          } else if (res.data.exist === true) {
            this.running = false
            return callback(new Error(this.$t('signUpForm.error.usernameExist')))
          } else {
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