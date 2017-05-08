module.exports = function (s, size = 0) {
  while (`${s}`.length < size) {
    s = `0${s}`
  }
  return s
}
