module.exports = function rotation (d = null, opts = {}) {
  if (d === null) {
    d = new Date()
  }

  console.log(Object.keys(d))

  return `${d}`
}
