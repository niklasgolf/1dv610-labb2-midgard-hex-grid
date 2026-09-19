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
})