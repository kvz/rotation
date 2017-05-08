const zeropad = require('./zeropad')

describe('zeropad', () => {
  test('should pad with leading zeros', () => {
    let padded = zeropad(1, 2)
    expect(padded).toBe('01')
  })
})
