import { describe, expect, it } from 'vitest'
import {
  getCoordinateRange,
  getCoordinatesAround
} from '../src/coordinate-range-fill.js'

describe('getCoordinatesAround', () => {
  it('returns the six surrounding coordinates for an x-dominated grid', () => {
    const coordinate = {
      x: 2,
      y: 2
    }

    const result = getCoordinatesAround(
      coordinate,
      'x-dominated'
    )

    expect(result).toEqual([
      { x: 0, y: 2 },
      { x: 4, y: 2 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 3 },
      { x: 3, y: 3 }
    ])
  })

  it('returns the six surrounding coordinates for a y-dominated grid', () => {
    const coordinate = {
      x: 2,
      y: 2
    }

    const result = getCoordinatesAround(
      coordinate,
      'y-dominated'
    )

    expect(result).toEqual([
      { x: 2, y: 0 },
      { x: 2, y: 4 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 3 },
      { x: 3, y: 3 }
    ])
  })
})

describe('getCoordinateRange', () => {
  it('returns only the skeleton for a 1 by 1 range without fillAround', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1,
      orientation: 'x-dominated' as const
    }

    const result = getCoordinateRange(range)

    expect(result).toEqual([
      { x: 2, y: 2 }
    ])
  })

  it('fills around a 1 by 1 range when fillAround is true', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1,
      orientation: 'x-dominated' as const
    }

    const result = getCoordinateRange(range, {
      fillAround: true
    })

    expect(result).toEqual([
      { x: 2, y: 2 },
      { x: 0, y: 2 },
      { x: 4, y: 2 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 3 },
      { x: 3, y: 3 }
    ])
  })

  it('automatically fills around a larger range without duplicates', () => {
    const range = {
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 2,
      yHeight: 1,
      orientation: 'x-dominated' as const
    }

    const result = getCoordinateRange(range)

    expect(result).toEqual([
      { x: 2, y: 2 },
      { x: 4, y: 2 },
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 3 },
      { x: 3, y: 3 },
      { x: 6, y: 2 },
      { x: 5, y: 1 },
      { x: 5, y: 3 }
    ])

    expect(result).toHaveLength(10)
  })
})