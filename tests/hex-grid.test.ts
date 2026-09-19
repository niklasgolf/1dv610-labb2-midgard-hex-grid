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
})