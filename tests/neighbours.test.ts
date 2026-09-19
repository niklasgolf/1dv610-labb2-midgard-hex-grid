import { describe, expect, it } from 'vitest'
import {
  getXDominatedNeighbours,
  getYDominatedNeighbours,
  getNeighbours
} from '../src/neighbours.js'

describe('getXDominatedNeighbours', () => {
  it('returns six neighbours', () => {
    const coordinate = {
      x: 10,
      y: 10
    }

    const neighbours = getXDominatedNeighbours(coordinate)

    expect(neighbours).toHaveLength(6)
  })

  it('returns the correct neighbours', () => {
    const coordinate = {
      x: 10,
      y: 10
    }

    const neighbours = getXDominatedNeighbours(coordinate)

    expect(neighbours).toEqual([
      { x: 8, y: 10 },
      { x: 12, y: 10 },
      { x: 9, y: 9 },
      { x: 11, y: 9 },
      { x: 9, y: 11 },
      { x: 11, y: 11 }
    ])
  })
})

describe('getYDominatedNeighbours', () => {
  it('returns six neighbours', () => {
    const coordinate = {
      x: 10,
      y: 10
    }

    const neighbours = getYDominatedNeighbours(coordinate)

    expect(neighbours).toHaveLength(6)
  })

  it('returns the correct neighbours', () => {
    const coordinate = {
      x: 10,
      y: 10
    }

    const neighbours = getYDominatedNeighbours(coordinate)

    expect(neighbours).toEqual([
      { x: 10, y: 8 },
      { x: 10, y: 12 },
      { x: 9, y: 9 },
      { x: 11, y: 9 },
      { x: 9, y: 11 },
      { x: 11, y: 11 }
    ])
  })
})

describe('getNeighbours', () => {
  it('uses x-dominated neighbour calculation', () => {
    const coordinate = {
      x: 10,
      y: 10
    }

    const neighbours = getNeighbours(
      coordinate,
      'x-dominated'
    )

    expect(neighbours).toEqual([
      { x: 8, y: 10 },
      { x: 12, y: 10 },
      { x: 9, y: 9 },
      { x: 11, y: 9 },
      { x: 9, y: 11 },
      { x: 11, y: 11 }
    ])
  })

  it('uses y-dominated neighbour calculation', () => {
    const coordinate = {
      x: 10,
      y: 10
    }

    const neighbours = getNeighbours(
      coordinate,
      'y-dominated'
    )

    expect(neighbours).toEqual([
      { x: 10, y: 8 },
      { x: 10, y: 12 },
      { x: 9, y: 9 },
      { x: 11, y: 9 },
      { x: 9, y: 11 },
      { x: 11, y: 11 }
    ])
  })
})