const utcWeekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const utcMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

const zeropad = require('./zeropad')

module.exports = function rotation (d = new Date(), opts = {}) {
  let ret = []

  // between 1 and 31
  if (d.getUTCDate() === 1) {
    // between 0 and 11
    if (d.getUTCMonth() === 0) {
      ret.push(`yearly-${zeropad(d.getUTCFullYear(), 4)}`)
    } else {
      ret.push(`monthly-${utcMonths[d.getUTCMonth()]}`)
    }
  } else {
    ret.push(`weekly-${utcWeekdays[d.getUTCDay()]}`) // 0 = sunday
  }

  return ret.join('-')
}
