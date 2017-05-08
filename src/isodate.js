module.exports = function (d = new Date()) {
  return d
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')
    .split(' ')[0]
}
