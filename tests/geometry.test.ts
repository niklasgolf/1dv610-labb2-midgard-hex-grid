import { describe, expect, it } from 'vitest'
import { HexagonGeometry } from '../src/geometry.js'

describe('HexagonGeometry', () => {
  describe('getXDominatedHexagonPoints', () => {
    it('returns six corner points', () => {
      const center = {
        x: 100,
        y: 100
      }

      const geometry =
        new HexagonGeometry('x-dominated')

      const points =
        geometry.getXDominatedHexagonPoints(center, 100)

      expect(points).toHaveLength(6)
    })

    it('uses the given width as the complete hexagon width', () => {
      const center = {
        x: 100,
        y: 100
      }

      const geometry =
        new HexagonGeometry('x-dominated')

      const points =
        geometry.getXDominatedHexagonPoints(center, 100)

      const upperRight = points[1]
      const upperLeft = points[5]

      expect(upperRight?.x).toBe(150)
      expect(upperLeft?.x).toBe(50)
    })
  })

  describe('getYDominatedHexagonPoints', () => {
    it('returns six corner points', () => {
      const center = {
        x: 100,
        y: 100
      }

      const geometry =
        new HexagonGeometry('y-dominated')

      const points =
        geometry.getYDominatedHexagonPoints(center, 100)

      expect(points).toHaveLength(6)
    })

    it('uses the given height as the complete hexagon height', () => {
      const center = {
        x: 100,
        y: 100
      }

      const geometry =
        new HexagonGeometry('y-dominated')

      const points =
        geometry.getYDominatedHexagonPoints(center, 100)

      const upperLeft = points[0]
      const lowerLeft = points[4]

      expect(upperLeft?.y).toBe(50)
      expect(lowerLeft?.y).toBe(150)
    })
  })

  describe('getHexagonPoints', () => {
    it('uses width for an x-dominated grid', () => {
      const center = {
        x: 100,
        y: 100
      }

      const geometry =
        new HexagonGeometry('x-dominated')

      const points =
        geometry.getHexagonPoints(center, 100)

      expect(points[1]?.x).toBe(150)
      expect(points[5]?.x).toBe(50)
    })

    it('uses height for a y-dominated grid', () => {
      const center = {
        x: 100,
        y: 100
      }

      const geometry =
        new HexagonGeometry('y-dominated')

      const points =
        geometry.getHexagonPoints(center, 100)

      expect(points[0]?.y).toBe(50)
      expect(points[4]?.y).toBe(150)
    })
  })

  describe('getBounds', () => {
    it('calculates the outer bounds of points', () => {
      const geometry =
        new HexagonGeometry('x-dominated')

      const points = [
        { x: 50, y: 75 },
        { x: 250, y: 25 },
        { x: 300, y: 200 },
        { x: 100, y: 250 }
      ]

      const bounds = geometry.getBounds(points)

      expect(bounds).toEqual({
        minX: 50,
        minY: 25,
        maxX: 300,
        maxY: 250,
        width: 250,
        height: 225
      })
    })

    it('returns zero bounds when there are no points', () => {
      const geometry =
        new HexagonGeometry('x-dominated')

      const bounds = geometry.getBounds([])

      expect(bounds).toEqual({
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
        width: 0,
        height: 0
      })
    })
  })
})