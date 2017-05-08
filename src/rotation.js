const utcWeekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const utcMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

const zeropad = require('./zeropad')

module.exports = function rotation (d = new Date(), opts = {}) {
  let ret = []

  // between 1 and 31
  if (d.getUTCDate() === 1) {
    // between 0 and 11
    // if (d.getUTCMonth() === 0) {
    //   ret.push('yearly', d.getUTCFullYear())
    // } else
    if ((d.getUTCMonth() + 1) % 4 === 0) {
      ret.push('quarterly', d.getUTCFullYear(), Math.floor(d.getUTCMonth() / 4))
    } else {
      ret.push('monthly', zeropad(d.getUTCMonth() + 1, 2), utcMonths[d.getUTCMonth()])
    }
  } else if (d.getUTCDate() % 7 === 0) {
    ret.push('weekly', Math.floor(d.getUTCDate() / 7))
  } else {
    ret.push('daily', d.getUTCDay(), utcWeekdays[d.getUTCDay()])
  }

  return ret.join('-')
}
