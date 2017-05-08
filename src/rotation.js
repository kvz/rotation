const utcWeekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const utcMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

const zeropad = require('./zeropad')

module.exports = function rotation (d = new Date(), opts = {}) {
  let ret = []

  // between 1 and 31
  if (d.getUTCDate() === 1) {
    // between 0 and 11
    if (d.getUTCMonth() === 0) {
      ret.push(zeropad(d.getUTCFullYear(), 4))
    }

    // ret.push(zeropad(d.getUTCMonth() + 1), 2)
    ret.push(utcMonths[d.getUTCMonth()])
  }

  if (!ret.length) {
    ret.push(utcWeekdays[d.getUTCDay()]) // 0 = sunday
  }

  return ret.join('-')
}
