import { describe, expect, it } from 'vitest'

import {
  CoordinateValidator
} from '../src/coordinate.js'

describe('CoordinateValidator', () => {
  it('returns true when x and y are both even', () => {
    const coordinate = {
      x: 10,
      y: 10
    }

    const validator = new CoordinateValidator()

    const result =
      validator.isValidCoordinate(coordinate)

    expect(result).toBe(true)
  })

  it('returns true when x and y are both odd', () => {
    const coordinate = {
      x: 11,
      y: 11
    }

    const validator = new CoordinateValidator()

    const result =
      validator.isValidCoordinate(coordinate)

    expect(result).toBe(true)
  })

  it('returns false when x is even and y is odd', () => {
    const coordinate = {
      x: 10,
      y: 11
    }

    const validator = new CoordinateValidator()

    const result =
      validator.isValidCoordinate(coordinate)

    expect(result).toBe(false)
  })

  it('returns false when x is odd and y is even', () => {
    const coordinate = {
      x: 11,
      y: 12
    }

    const validator = new CoordinateValidator()

    const result =
      validator.isValidCoordinate(coordinate)

    expect(result).toBe(false)
  })

  it('returns false when coordinates contain decimals', () => {
    const coordinate = {
      x: 10.5,
      y: 10.5
    }

    const validator = new CoordinateValidator()

    const result =
      validator.isValidCoordinate(coordinate)

    expect(result).toBe(false)
  })

  it('returns false when x is negative', () => {
    const coordinate = {
      x: -2,
      y: 2
    }

    const validator = new CoordinateValidator()

    const result =
      validator.isValidCoordinate(coordinate)

    expect(result).toBe(false)
  })

  it('returns false when y is negative', () => {
    const coordinate = {
      x: 2,
      y: -2
    }

    const validator = new CoordinateValidator()

    const result =
      validator.isValidCoordinate(coordinate)

    expect(result).toBe(false)
  })
})