const monthNames = {
  'en-US': ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  'zh-CN': ['一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ]
}
const getDiffDate = (d1, d2, type) => {
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000
  let divider = oneDay
  switch (type) {
    case 'days':
      divider = oneDay
      break
    case 'hours':
      divider = oneHour
      break
    case 'minutes':
      divider = oneMinute
      break
  }
  return Math.round(Math.abs((d1.getTime() - d2.getTime()) / (divider)))
}

const getDate = (locale, timestamp, timestamp2) => {
  const date = new Date(timestamp)
  let date2
  if (timestamp2) date2 = new Date(timestamp2)
  else date2 = new Date()
  const diffDays = getDiffDate(date2, date, 'days')
  const diffHours = getDiffDate(date2, date, 'hours')
  const diffMinutes = getDiffDate(date2, date, 'minutes')
  const month = monthNames[locale][date.getMonth()]
  const year = (date.getFullYear() === date2.getFullYear()) ? '' : date.getFullYear()

  let day = date.getDate()
  if (locale === 'en-US') {
    if (day === 1) day += 'st'
    if (day === 2) day += 'nd'
    if (day === 3) day += 'rd'
    if (day === 4) day += 'th'
  } else {
    day += '日'
  }
  let fd = ''
  if (locale === 'en-US') {
    if (diffMinutes < 1) fd = 'just now'
    else if (diffMinutes === 1) fd = diffMinutes + 'minute ago'
    else if (diffMinutes < 60) fd = diffMinutes + ' minutes ago'
    else if (diffHours === 1) fd = diffHours + ' hour ago'
    else if (diffHours < 24) fd = diffHours + ' hours ago'
    else if (diffDays === 1) fd = 'Yesterday'
    else if (diffDays < 20) fd = diffDays + ' days ago'
    else if (!year) fd = month + day
    else fd = month + ' ' + day + ' ' + year
  } else if (locale === 'zh-CN') {
    if (diffMinutes < 1) fd = '刚刚'
    else if (diffMinutes < 60) fd = diffMinutes + '分钟前'
    else if (diffHours < 24) fd = diffHours + '小时前'
    else if (diffDays === 1) fd = '昨天'
    else if (diffDays === 2) fd = '前天'
    else if (diffDays < 20) fd = diffDays + '天前'
    else if (!year) fd = month + day
    else fd = year + '年' + month + day
  }
  return fd
}

export default getDate
