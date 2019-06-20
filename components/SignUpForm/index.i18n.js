const IndexI18n = {
  'en-US': {
    signUpForm: {
      label: {
        username: 'Email address',
        password: 'Password',
        confirmPassword: 'Confirm password'
      },
      error: {
        enterUsername: 'Please enter email address',
        enterValidUsername: 'Please enter a valid email',
        usernameInvalid: 'Unknown error, please try again',
        usernameExist: 'Username already exist, please try again',
        enterPass: 'Please enter a password',
        enterAgain: 'Please enter password again',
        enterPassAgain: 'Make sure it\'s at least 8 characters and at most 32 characters, please enter again!',
        passNoMatch: 'Password not match, please try again!'
      },
      statement: {
        p1: 'By clicking "',
        p2: '" below, you agree to our ',
        termsAndService: 'Terms of Service',
        and: 'and',
        privacyStatement: 'Privacy Statement',
        end: '.'
      },
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      submit: 'Create my account'
    }
  },
  'zh-CN': {
    signUpForm: {
      label: {
        username: '账号邮箱',
        password: '密码',
        confirmPassword: '确认密码'
      },
      error: {
        enterUsername: '请输入邮箱',
        enterValidUsername: '请输入有效邮箱',
        usernameInvalid: '未知错误，请再次尝试',
        usernameExist: '该用户名已存在，请再次尝试',
        enterPass: '请输入密码',
        enterAgain: '请再次输入密码',
        enterPassAgain: '确保密码长度为8-32位之间，请再次输入密码',
        passNoMatch: '两次输入密码不一致!'
      },
      statement: {
        p1: '点击下方 “',
        p2: '” 按钮，你将同意本网站的',
        termsAndService: '服务协议',
        and: '和',
        privacyStatement: '隐私条款',
        end: '。'
      },
      showPassword: '显示密码',
      hidePassword: '隐藏密码',
      submit: '注册账号'
    }
  }
}

export default IndexI18n
