import { describe, expect, it } from 'vitest'
import { CoordinateRange } from '../src/coordinate-range.js'

describe('CoordinateRange', () => {
  describe('isValid', () => {
    it('returns true for the smallest valid coordinate range', () => {
      const range = new CoordinateRange({
        width: 1,
        height: 1,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(true)
    })

    it('returns true for a larger valid coordinate range', () => {
      const range = new CoordinateRange({
        width: 3,
        height: 2,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(true)
    })

    it('returns false when width is not an integer', () => {
      const range = new CoordinateRange({
        width: 1.5,
        height: 1,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })

    it('returns false when height is not an integer', () => {
      const range = new CoordinateRange({
        width: 1,
        height: 1.5,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })

    it('returns false when width is less than 1', () => {
      const range = new CoordinateRange({
        width: 0,
        height: 1,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })

    it('returns false when height is less than 1', () => {
      const range = new CoordinateRange({
        width: 1,
        height: 0,
        orientation: 'x-dominated'
      })

      const result = range.isValid()

      expect(result).toBe(false)
    })
  })

  describe('getSkeleton', () => {
    it('creates coordinate 2,2 for a 1 by 1 range', () => {
      const range = new CoordinateRange({
        width: 1,
        height: 1,
        orientation: 'x-dominated'
      })

      const result = range.getSkeleton()

      expect(result).toEqual([
        { x: 2, y: 2 }
      ])
    })

    it('creates a 3 by 2 skeleton starting at coordinate 2,2', () => {
      const range = new CoordinateRange({
        width: 3,
        height: 2,
        orientation: 'x-dominated'
      })

      const result = range.getSkeleton()

      expect(result).toEqual([
        { x: 2, y: 2 },
        { x: 4, y: 2 },
        { x: 6, y: 2 },

        { x: 2, y: 4 },
        { x: 4, y: 4 },
        { x: 6, y: 4 }
      ])
    })
  })

  describe('shouldFillAround', () => {
    it('returns false for a 1 by 1 range when fillAround is not specified', () => {
      const range = new CoordinateRange({
        width: 1,
        height: 1,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround()

      expect(result).toBe(false)
    })

    it('returns false for a 1 by 1 range when fillAround is false', () => {
      const range = new CoordinateRange({
        width: 1,
        height: 1,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround({
        fillAround: false
      })

      expect(result).toBe(false)
    })

    it('returns true for a 1 by 1 range when fillAround is true', () => {
      const range = new CoordinateRange({
        width: 1,
        height: 1,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround({
        fillAround: true
      })

      expect(result).toBe(true)
    })

    it('returns true automatically when width is greater than 1', () => {
      const range = new CoordinateRange({
        width: 3,
        height: 1,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround()

      expect(result).toBe(true)
    })

    it('returns true automatically when height is greater than 1', () => {
      const range = new CoordinateRange({
        width: 1,
        height: 2,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround()

      expect(result).toBe(true)
    })

    it('returns true for a larger range even when fillAround is false', () => {
      const range = new CoordinateRange({
        width: 3,
        height: 2,
        orientation: 'x-dominated'
      })

      const result = range.shouldFillAround({
        fillAround: false
      })

      expect(result).toBe(true)
    })
  })
})