import { describe, expect, it } from 'vitest'
import { isValidCoordinate } from '../src/coordinate.js'

describe('isValidCoordinate', () => {
  it('returns true when x and y are both even', () => {
    const coordinate = {
      x: 10,
      y: 10
    }

    const result = isValidCoordinate(coordinate)

    expect(result).toBe(true)
  })

  it('returns true when x and y are both odd', () => {
    const coordinate = {
      x: 11,
      y: 11
    }

    const result = isValidCoordinate(coordinate)

    expect(result).toBe(true)
  })

  it('returns false when x is even and y is odd', () => {
    const coordinate = {
      x: 10,
      y: 11
    }

    const result = isValidCoordinate(coordinate)

    expect(result).toBe(false)
  })

  it('returns false when x is odd and y is even', () => {
    const coordinate = {
      x: 11,
      y: 12
    }

    const result = isValidCoordinate(coordinate)

    expect(result).toBe(false)
  })

  it('returns false when coordinates contain decimals', () => {
    const coordinate = {
      x: 10.5,
      y: 10.5
    }

    const result = isValidCoordinate(coordinate)

    expect(result).toBe(false)
  })
})