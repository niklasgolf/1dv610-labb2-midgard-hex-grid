import { describe, expect, it } from 'vitest'

import {
  CoordinatePositioner
} from '../src/coordinate-positioner.js'

describe('CoordinatePositioner', () => {

  describe('x-dominated positioning', () => {

    it('positions the origin at zero', () => {

      const positioner =
        new CoordinatePositioner('x-dominated')

      const position = positioner.getCenterPosition(
        { x: 0, y: 0 },
        100
      )

      expect(position.x).toBe(0)
      expect(position.y).toBe(0)

    })

    it('positions an x-dominated coordinate correctly', () => {

      const positioner =
        new CoordinatePositioner('x-dominated')

      const position = positioner.getCenterPosition(
        { x: 2, y: 2 },
        100
      )

      expect(position.x).toBe(100)

      expect(position.y).toBeCloseTo(
        100 * Math.sqrt(3)
      )

    })

  })

  describe('y-dominated positioning', () => {

    it('positions the origin at zero', () => {

      const positioner =
        new CoordinatePositioner('y-dominated')

      const position = positioner.getCenterPosition(
        { x: 0, y: 0 },
        100
      )

      expect(position.x).toBe(0)
      expect(position.y).toBe(0)

    })

    it('positions a y-dominated coordinate correctly', () => {

      const positioner =
        new CoordinatePositioner('y-dominated')

      const position = positioner.getCenterPosition(
        { x: 2, y: 2 },
        100
      )

      expect(position.x).toBeCloseTo(
        100 * Math.sqrt(3)
      )

      expect(position.y).toBe(100)

    })

  })

  describe('getCenterPosition', () => {

    it('uses x-dominated positioning', () => {

      const positioner =
        new CoordinatePositioner('x-dominated')

      const position = positioner.getCenterPosition(
        { x: 2, y: 2 },
        100
      )

      expect(position.x).toBe(100)

      expect(position.y).toBeCloseTo(
        100 * Math.sqrt(3)
      )

    })

    it('uses y-dominated positioning', () => {

      const positioner =
        new CoordinatePositioner('y-dominated')

      const position = positioner.getCenterPosition(
        { x: 2, y: 2 },
        100
      )

      expect(position.x).toBeCloseTo(
        100 * Math.sqrt(3)
      )

      expect(position.y).toBe(100)

    })

  })

})