const validateInput = (inputType, inputValue) => {
  let re
  switch (inputType) {
    case 'email':
      inputValue = inputValue.toLowerCase()
      re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      break
    case 'phone':
      re = /^[0-9]{10,}$/
      break
    case 'password':
      break
    case 'alphabetic':
      re = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/
      break
  }
  return re.test(inputValue)
}

export default validateInput
