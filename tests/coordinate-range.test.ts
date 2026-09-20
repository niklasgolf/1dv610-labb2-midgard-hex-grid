import { describe, expect, it } from 'vitest'
import { CoordinateRange } from '../src/coordinate-range.js'

describe('CoordinateRange', () => {
  describe('isValid', () => {
    it('returns true for the smallest valid coordinate range', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 2
        },
        xWidth: 1,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(true)
    })

    it('returns true for a larger valid coordinate range', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 10,
          y: 14
        },
        xWidth: 3,
        yHeight: 2,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(true)
    })

    it('returns false when the top-left x coordinate is less than 2', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 0,
          y: 2
        },
        xWidth: 1,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })

    it('returns false when the top-left y coordinate is less than 2', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 0
        },
        xWidth: 1,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })

    it('returns false when the top-left x coordinate is odd', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 3,
          y: 2
        },
        xWidth: 1,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })

    it('returns false when the top-left y coordinate is odd', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 3
        },
        xWidth: 1,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })

    it('returns false when x width is not an integer', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 2
        },
        xWidth: 1.5,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })

    it('returns false when y height is not an integer', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 2
        },
        xWidth: 1,
        yHeight: 1.5,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })

    it('returns false when x width is less than 1', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 2
        },
        xWidth: 0,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })

    it('returns false when y height is less than 1', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 2
        },
        xWidth: 1,
        yHeight: 0,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })
  })

  describe('getSkeleton', () => {
    it('creates a single skeleton coordinate for a 1 by 1 range', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 2
        },
        xWidth: 1,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.getSkeleton()

      expect(result).toEqual([
        { x: 2, y: 2 }
      ])
    })

    it('creates a 3 by 2 skeleton using true Midgard coordinates', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 10,
          y: 10
        },
        xWidth: 3,
        yHeight: 2,
        orientation: 'x-dominated'
      })

      const result = range.getSkeleton()

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
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 2
        },
        xWidth: 1,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround()

      expect(result).toBe(false)
    })

    it('returns false for a 1 by 1 range when fillAround is false', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 2
        },
        xWidth: 1,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround({
        fillAround: false
      })

      expect(result).toBe(false)
    })

    it('returns true for a 1 by 1 range when fillAround is true', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 2,
          y: 2
        },
        xWidth: 1,
        yHeight: 1,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround({
        fillAround: true
      })

      expect(result).toBe(true)
    })

    it('returns true automatically for a range larger than 1 by 1', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 10,
          y: 10
        },
        xWidth: 3,
        yHeight: 2,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround()

      expect(result).toBe(true)
    })

    it('returns true for a larger range even when fillAround is false', () => {
      const range = new CoordinateRange({
        topLeftCorner: {
          x: 10,
          y: 10
        },
        xWidth: 3,
        yHeight: 2,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround({
        fillAround: false
      })

      expect(result).toBe(true)
    })
  })
})