const rotation = require('./index')

describe('rotation', () => {
  test('should work', () => {
    let inputDate = new Date(10000000000)
    expect(rotation(inputDate)).toBe('20010')
  })
})
