import { describe, expect, it } from 'vitest'

import { CoordinateRange } from '../src/coordinate-range.js'

import {
  CoordinateRangeFiller
} from '../src/coordinate-range-fill.js'

describe('CoordinateRangeFiller', () => {
  describe('getCoordinatesAround', () => {
    it('returns the six surrounding coordinates for an x-dominated grid', () => {
      const range = new CoordinateRange({
        width: 1,
        height: 1,
        orientation: 'x-dominated'
      })

      const filler = new CoordinateRangeFiller(range)

      const result = filler.getCoordinatesAround({
        x: 2,
        y: 2
      })

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
      const range = new CoordinateRange({
        width: 1,
        height: 1,
        orientation: 'y-dominated'
      })

      const filler = new CoordinateRangeFiller(range)

      const result = filler.getCoordinatesAround({
        x: 2,
        y: 2
      })

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
      const range = new CoordinateRange({
        width: 1,
        height: 1,
        orientation: 'x-dominated'
      })

      const filler = new CoordinateRangeFiller(range)

      const result = filler.getCoordinateRange()

      expect(result).toEqual([
        { x: 2, y: 2 }
      ])
    })

    it('fills around a 1 by 1 range when fillAround is true', () => {
      const range = new CoordinateRange({
        width: 1,
        height: 1,
        orientation: 'x-dominated'
      })

      const filler = new CoordinateRangeFiller(range)

      const result = filler.getCoordinateRange({
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

    it('automatically fills around a wider range without duplicates', () => {
      const range = new CoordinateRange({
        width: 2,
        height: 1,
        orientation: 'x-dominated'
      })

      const filler = new CoordinateRangeFiller(range)

      const result = filler.getCoordinateRange()

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

    it('automatically fills around a wider y-dominated range without duplicates', () => {
      const range = new CoordinateRange({
        width: 2,
        height: 1,
        orientation: 'y-dominated'
      })

      const filler = new CoordinateRangeFiller(range)

      const result = filler.getCoordinateRange()

      expect(result).toEqual([
        { x: 2, y: 2 },
        { x: 4, y: 2 },

        { x: 2, y: 0 },
        { x: 2, y: 4 },
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 1, y: 3 },
        { x: 3, y: 3 },

        { x: 4, y: 0 },
        { x: 4, y: 4 },
        { x: 5, y: 1 },
        { x: 5, y: 3 }
      ])

      expect(result).toHaveLength(12)
    })
  })
})