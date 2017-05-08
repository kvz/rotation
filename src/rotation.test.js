const rotation = require('./rotation')
const isodate = require('./isodate')

describe('rotation', () => {
  test('should match snapshot for every day from 2017-01-01 to 2019-01-01', () => {
    const files = {}
    for (let i = 1483232461; i <= 1546304461; i = i + 86400) {
      let dateJs      = new Date(i * 1000)
      let filename    = rotation(dateJs)
      let dateIso     = isodate(dateJs)
      files[filename] = dateIso
    }
    expect(files).toMatchSnapshot()
  })
})
