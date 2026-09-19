import { describe, expect, it } from 'vitest'
import {
  getCoordinateRangeSkeleton,
  isValidCoordinateRange,
  shouldFillAround
} from '../src/coordinate-range.js'

describe('isValidCoordinateRange', () => {
  it('returns true for the smallest valid coordinate range', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1
    }

    const result = isValidCoordinateRange(range)

    expect(result).toBe(true)
  })

  it('returns true for a larger valid coordinate range', () => {
    const range = {
      topLeftCorner: {
        x: 10,
        y: 14
      },
      xWidth: 3,
      yHeight: 2
    }

    const result = isValidCoordinateRange(range)

    expect(result).toBe(true)
  })

  it('returns false when the top-left x coordinate is less than 2', () => {
    const range = {
      topLeftCorner: {
        x: 0,
        y: 2
      },
      xWidth: 1,
      yHeight: 1
    }

    const result = isValidCoordinateRange(range)

    expect(result).toBe(false)
  })

  it('returns false when the top-left y coordinate is less than 2', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 0
      },
      xWidth: 1,
      yHeight: 1
    }

    const result = isValidCoordinateRange(range)

    expect(result).toBe(false)
  })

  it('returns false when the top-left x coordinate is odd', () => {
    const range = {
      topLeftCorner: {
        x: 3,
        y: 2
      },
      xWidth: 1,
      yHeight: 1
    }

    const result = isValidCoordinateRange(range)

    expect(result).toBe(false)
  })

  it('returns false when the top-left y coordinate is odd', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 3
      },
      xWidth: 1,
      yHeight: 1
    }

    const result = isValidCoordinateRange(range)

    expect(result).toBe(false)
  })

  it('returns false when x width is not an integer', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1.5,
      yHeight: 1
    }

    const result = isValidCoordinateRange(range)

    expect(result).toBe(false)
  })

  it('returns false when y height is not an integer', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1.5
    }

    const result = isValidCoordinateRange(range)

    expect(result).toBe(false)
  })

  it('returns false when x width is less than 1', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 0,
      yHeight: 1
    }

    const result = isValidCoordinateRange(range)

    expect(result).toBe(false)
  })

  it('returns false when y height is less than 1', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 0
    }

    const result = isValidCoordinateRange(range)

    expect(result).toBe(false)
  })
})

describe('getCoordinateRangeSkeleton', () => {
  it('creates a single skeleton coordinate for a 1 by 1 range', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1
    }

    const result = getCoordinateRangeSkeleton(range)

    expect(result).toEqual([
      { x: 2, y: 2 }
    ])
  })

  it('creates a 3 by 2 skeleton using true Midgard coordinates', () => {
    const range = {
      topLeftCorner: {
        x: 10,
        y: 10
      },
      xWidth: 3,
      yHeight: 2
    }

    const result = getCoordinateRangeSkeleton(range)

    expect(result).toEqual([
      { x: 10, y: 10 },
      { x: 12, y: 10 },
      { x: 14, y: 10 },
      { x: 10, y: 12 },
      { x: 12, y: 12 },
      { x: 14, y: 12 }
    ])
  })
})

describe('shouldFillAround', () => {
  it('returns false for a 1 by 1 range when fillAround is not specified', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1
    }

    const result = shouldFillAround(range)

    expect(result).toBe(false)
  })

  it('returns false for a 1 by 1 range when fillAround is false', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1
    }

    const result = shouldFillAround(range, {
      fillAround: false
    })

    expect(result).toBe(false)
  })

  it('returns true for a 1 by 1 range when fillAround is true', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1
    }

    const result = shouldFillAround(range, {
      fillAround: true
    })

    expect(result).toBe(true)
  })

  it('returns true automatically for a range larger than 1 by 1', () => {
    const range = {
      topLeftCorner: {
        x: 10,
        y: 10
      },
      xWidth: 3,
      yHeight: 2
    }

    const result = shouldFillAround(range)

    expect(result).toBe(true)
  })

  it('returns true for a larger range even when fillAround is false', () => {
    const range = {
      topLeftCorner: {
        x: 10,
        y: 10
      },
      xWidth: 3,
      yHeight: 2
    }

    const result = shouldFillAround(range, {
      fillAround: false
    })

    expect(result).toBe(true)
  })
})