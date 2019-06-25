const IndexI18n = {
  'en-US': {
    signInForm: {
      title: 'Sign in to your account',
      label: {
        username: 'Email address',
        password: 'Password'
      },
      error: {
        code: {
          '0': 'Please enter email address',
          '1': 'Please enter a password',
          '2': 'Please enter a valid email',
          '3': 'Password must be 8 to 32 characters',
          '2002': 'Incorrect username or password',
          '2004': 'Unknown error, please try again'
        }
      },
      forgetPassword: 'Forget password?',
      createAccount: 'New to us?',
      signUpNow: 'Sign Up',
      submit: 'Sign In',
      warning: 'Unknown error, please try again later'
    }
  },
  'zh-CN': {
    signInForm: {
      title: '用户登录',
      label: {
        username: '账号邮箱',
        password: '密码'
      },
      error: {
        enterPassAgain: '确保密码长度为8-32位之间，请再次输入密码',
        code: {
          '0': '请填写邮箱',
          '1': '请填写密码',
          '2': '请输入有效邮箱',
          '3': '密码长度应为8-32位之间',
          '2000': '请填写邮箱',
          '2001': '请填写密码',
          '2002': '用户名或者密码不正确',
          '2004': '未知错误，请稍后尝试'
        }
      },
      forgetPassword: '忘记密码？',
      createAccount: '新用户？',
      signUpNow: '注册账号',
      submit: '登录',
      warning: '未知错误，请稍后再尝试'
    }
  }
}

export default IndexI18n
