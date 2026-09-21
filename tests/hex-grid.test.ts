import { describe, expect, it } from 'vitest'
import { HexGrid } from '../src/hex-grid.js'

describe('HexGrid', () => {
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
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1
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
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1
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
      topLeftCorner: {
        x: 2,
        y: 2
      },
      xWidth: 1,
      yHeight: 1
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
})