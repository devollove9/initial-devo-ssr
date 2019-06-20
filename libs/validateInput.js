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
    case 'alphabetic':
      re = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/
      break
  }
  const valid = re.test(inputValue)
  return valid
}

export default validateInput
