const rotation = require('./rotation')
const isodate = require('./isodate')

describe('rotation', () => {
  test('should match snapshot for every day from 2017-01-01 to 2019-01-01', () => {
    let msgs = []
    for (let i = 1483232461; i <= 1546304461; i = i + 86400) {
      let d = new Date(i * 1000)
      let res = rotation(d)
      let id = isodate(d)
      let msg = `${id}: ${res}`
      msgs.push(msg)
    }
    expect(msgs).toMatchSnapshot()
    // expect(rotation(new Date('2017-05-01T15:01:01'))).toBe('saturday')
    // expect(rotation(new Date('2017-05-06T15:01:01'))).toBe('saturday')
    // expect(rotation(new Date('2017-05-07T15:01:01'))).toBe('sunday')
    // expect(rotation(new Date('2017-05-08T15:01:01'))).toBe('monday')
  })
})
