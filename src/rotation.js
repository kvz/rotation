const utcWeekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const utcMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
const zeropad = require('./zeropad')

module.exports = function rotation (opts = {}) {
  if (!opts.date) {
    opts.date = new Date()
  }
  if (opts.date === `${opts.date}`) {
    opts.date = new Date(opts.date)
  }

  opts.suffix = opts.suffix || ''
  opts.prefix = opts.prefix || ''

  let ret = []

  // between 1 and 31
  if (opts.date.getUTCDate() === 1) {
    // between 0 and 11
    // if (opts.date.getUTCMonth() === 0) {
    //   ret.push('yearly', opts.date.getUTCFullYear())
    // } else
    if ((opts.date.getUTCMonth() + 1) % 4 === 0) {
      ret.push('quarterly', opts.date.getUTCFullYear(), Math.floor(opts.date.getUTCMonth() / 4))
    } else {
      ret.push('monthly', zeropad(opts.date.getUTCMonth() + 1, 2), utcMonths[opts.date.getUTCMonth()])
    }
  } else if (opts.date.getUTCDate() % 7 === 0) {
    ret.push('weekly', Math.floor(opts.date.getUTCDate() / 7))
  } else {
    ret.push('daily', opts.date.getUTCDay(), utcWeekdays[opts.date.getUTCDay()])
  }

  return opts.prefix + ret.join('-') + opts.suffix
}
