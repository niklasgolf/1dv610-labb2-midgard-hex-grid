import { describe, expect, it } from 'vitest'
import { HexGrid } from '../src/hex-grid.js'

describe('HexGrid', () => {
  describe('createSingleHexagon', () => {
    it('creates one x-dominated hexagon without surrounding fill', () => {
      const grid = new HexGrid('x-dominated')

      const hexagon = grid.createSingleHexagon({
        hexDiameter: 100
      })

      expect(hexagon.coordinate).toEqual({
        x: 2,
        y: 2
      })

      expect(hexagon.center.x).toBeCloseTo(100)
      expect(hexagon.center.y).toBeCloseTo(
        100 * Math.sqrt(3)
      )

      expect(hexagon.points).toHaveLength(6)
    })

    it('uses hexDiameter as height for a y-dominated hexagon', () => {
      const grid = new HexGrid('y-dominated')

      const hexagon = grid.createSingleHexagon({
        hexDiameter: 100
      })

      expect(hexagon.coordinate).toEqual({
        x: 2,
        y: 2
      })

      expect(hexagon.points).toHaveLength(6)

      const yValues = hexagon.points.map(
        (point) => point.y
      )

      const height =
        Math.max(...yValues) -
        Math.min(...yValues)

      expect(height).toBeCloseTo(100)
    })
  })

  describe('createGrid', () => {
    it('creates seven layered hexagons from a 1 by 1 skeleton', () => {
      const grid = new HexGrid('x-dominated')

      const hexagons = grid.createGrid({
        hexDiameter: 100,
        skeletonWidth: 1,
        skeletonHeight: 1
      })

      expect(hexagons).toHaveLength(7)

      expect(
        hexagons.map((hexagon) => ({
          ...hexagon.coordinate,
          zIndex: hexagon.zIndex
        }))
      ).toEqual([
        { x: 1, y: 1, zIndex: 100 },
        { x: 3, y: 1, zIndex: 100 },

        { x: 0, y: 2, zIndex: 200 },
        { x: 2, y: 2, zIndex: 200 },
        { x: 4, y: 2, zIndex: 200 },

        { x: 1, y: 3, zIndex: 300 },
        { x: 3, y: 3, zIndex: 300 }
      ])
    })

    it('creates a filled and layered grid from a 3 by 2 skeleton', () => {
      const grid = new HexGrid('x-dominated')

      const expectedCoordinates =
        grid.getLayeredCoordinateRange(
          {
            width: 3,
            height: 2
          },
          {
            fillAround: true
          }
        )

      const hexagons = grid.createGrid({
        hexDiameter: 100,
        skeletonWidth: 3,
        skeletonHeight: 2
      })

      expect(hexagons).toHaveLength(
        expectedCoordinates.length
      )

      expect(
        hexagons.map((hexagon) => ({
          ...hexagon.coordinate,
          zIndex: hexagon.zIndex
        }))
      ).toEqual(expectedCoordinates)

      for (const hexagon of hexagons) {
        expect(hexagon.points).toHaveLength(6)
      }
    })
  })

  it('returns x-dominated neighbours for an x-dominated grid', () => {
    const grid = new HexGrid('x-dominated')

    const coordinate = {
      x: 10,
      y: 10
    }

    const neighbours = grid.getNeighbours(coordinate)

    expect(neighbours).toEqual([
      { x: 8, y: 10 },
      { x: 12, y: 10 },
      { x: 9, y: 9 },
      { x: 11, y: 9 },
      { x: 9, y: 11 },
      { x: 11, y: 11 }
    ])
  })

  it('returns y-dominated neighbours for a y-dominated grid', () => {
    const grid = new HexGrid('y-dominated')

    const coordinate = {
      x: 10,
      y: 10
    }

    const neighbours = grid.getNeighbours(coordinate)

    expect(neighbours).toEqual([
      { x: 10, y: 8 },
      { x: 10, y: 12 },
      { x: 9, y: 9 },
      { x: 11, y: 9 },
      { x: 9, y: 11 },
      { x: 11, y: 11 }
    ])
  })

  it('validates a valid coordinate', () => {
    const grid = new HexGrid('x-dominated')

    const coordinate = {
      x: 10,
      y: 10
    }

    const result = grid.isValidCoordinate(coordinate)

    expect(result).toBe(true)
  })

  it('rejects an invalid coordinate', () => {
    const grid = new HexGrid('x-dominated')

    const coordinate = {
      x: 10,
      y: 11
    }

    const result = grid.isValidCoordinate(coordinate)

    expect(result).toBe(false)
  })

  it('creates a coordinate range using the grid orientation', () => {
    const grid = new HexGrid('x-dominated')

    const range = {
      width: 1,
      height: 1
    }

    const result = grid.getCoordinateRange(
      range,
      {
        fillAround: true
      }
    )

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

  it('creates a y-dominated coordinate range using the grid orientation', () => {
    const grid = new HexGrid('y-dominated')

    const range = {
      width: 1,
      height: 1
    }

    const result = grid.getCoordinateRange(
      range,
      {
        fillAround: true
      }
    )

    expect(result).toEqual([
      { x: 2, y: 2 },
      { x: 2, y: 0 },
      { x: 2, y: 4 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 3 },
      { x: 3, y: 3 }
    ])
  })

  it('creates a layered coordinate range with z-index values', () => {
    const grid = new HexGrid('x-dominated')

    const range = {
      width: 1,
      height: 1
    }

    const result = grid.getLayeredCoordinateRange(
      range,
      {
        fillAround: true
      }
    )

    expect(result).toEqual([
      { x: 1, y: 1, zIndex: 100 },
      { x: 3, y: 1, zIndex: 100 },

      { x: 0, y: 2, zIndex: 200 },
      { x: 2, y: 2, zIndex: 200 },
      { x: 4, y: 2, zIndex: 200 },

      { x: 1, y: 3, zIndex: 300 },
      { x: 3, y: 3, zIndex: 300 }
    ])
  })

  it('calculates a center position for an x-dominated coordinate', () => {
    const grid = new HexGrid('x-dominated')

    const result = grid.getCenterPosition(
      {
        x: 2,
        y: 2
      },
      100
    )

    expect(result.x).toBeCloseTo(100)
    expect(result.y).toBeCloseTo(
      100 * Math.sqrt(3)
    )
  })

  it('calculates a center position for a y-dominated coordinate', () => {
    const grid = new HexGrid('y-dominated')

    const result = grid.getCenterPosition(
      {
        x: 2,
        y: 2
      },
      100
    )

    expect(result.x).toBeCloseTo(
      100 * Math.sqrt(3)
    )
    expect(result.y).toBeCloseTo(100)
  })

  describe('getGridBounds', () => {
    it('calculates bounds for one x-dominated hexagon', () => {
      const grid = new HexGrid('x-dominated')

      const bounds = grid.getGridBounds(
        [
          {
            x: 2,
            y: 2
          }
        ],
        100
      )

      expect(bounds.minX).toBeCloseTo(50)
      expect(bounds.maxX).toBeCloseTo(150)
      expect(bounds.width).toBeCloseTo(100)

      expect(bounds.minY).toBeCloseTo(
        100 * Math.sqrt(3) -
          100 / Math.sqrt(3)
      )

      expect(bounds.maxY).toBeCloseTo(
        100 * Math.sqrt(3) +
          100 / Math.sqrt(3)
      )

      expect(bounds.height).toBeCloseTo(
        200 / Math.sqrt(3)
      )
    })

    it('calculates bounds for one y-dominated hexagon', () => {
      const grid = new HexGrid('y-dominated')

      const bounds = grid.getGridBounds(
        [
          {
            x: 2,
            y: 2
          }
        ],
        100
      )

      expect(bounds.minY).toBeCloseTo(50)
      expect(bounds.maxY).toBeCloseTo(150)
      expect(bounds.height).toBeCloseTo(100)

      expect(bounds.minX).toBeCloseTo(
        100 * Math.sqrt(3) -
          100 / Math.sqrt(3)
      )

      expect(bounds.maxX).toBeCloseTo(
        100 * Math.sqrt(3) +
          100 / Math.sqrt(3)
      )

      expect(bounds.width).toBeCloseTo(
        200 / Math.sqrt(3)
      )
    })

    it('calculates combined bounds for multiple hexagons', () => {
      const grid = new HexGrid('x-dominated')

      const coordinates = grid.getCoordinateRange({
        width: 3,
        height: 2
      })

      const bounds = grid.getGridBounds(
        coordinates,
        100
      )

      expect(bounds.minX).toBeCloseTo(-50)
      expect(bounds.maxX).toBeCloseTo(450)
      expect(bounds.width).toBeCloseTo(500)

      expect(bounds.minY).toBeCloseTo(
        50 / Math.sqrt(3)
      )

      expect(bounds.maxY).toBeCloseTo(
        850 / Math.sqrt(3)
      )

      expect(bounds.height).toBeCloseTo(
        800 / Math.sqrt(3)
      )
    })
  })
})