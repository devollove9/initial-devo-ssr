const IndexI18n = {
  'en-US': {
    signInForm: {
      title: 'Sign in to your account',
      label: {
        username: 'Email address',
        password: 'Password'
      },
      error: {
        enterUsername: 'Please enter email address',
        enterValidUsername: 'Please enter a valid email',
        usernameInvalid: 'Unknown error, please try again',
        enterPass: 'Please enter a password',
        enterAgain: 'Please enter password again',
        enterPassAgain: 'Make sure it\'s at least 8 characters and at most 32 characters, please enter again!',
        code: {
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
        enterUsername: '请输入邮箱',
        enterValidUsername: '请输入有效邮箱',
        usernameInvalid: '未知错误，请再次尝试',
        usernameExist: '该用户名已存在，请再次尝试',
        enterPass: '请输入密码',
        enterAgain: '请再次输入密码',
        enterPassAgain: '确保密码长度为8-32位之间，请再次输入密码',
        code: {
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
