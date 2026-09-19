import { describe, expect, it } from 'vitest'
import {
  getLayeredCoordinates,
  sortCoordinates
} from '../src/coordinate-layer.js'

describe('sortCoordinates', () => {
  it('sorts coordinates by y first and x second', () => {
    const coordinates = [
      { x: 4, y: 2 },
      { x: 3, y: 1 },
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 }
    ]

    const result = sortCoordinates(coordinates)

    expect(result).toEqual([
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 2, y: 2 },
      { x: 4, y: 2 }
    ])
  })

  it('does not change the original coordinate array', () => {
    const coordinates = [
      { x: 4, y: 2 },
      { x: 2, y: 0 }
    ]

    sortCoordinates(coordinates)

    expect(coordinates).toEqual([
      { x: 4, y: 2 },
      { x: 2, y: 0 }
    ])
  })
})

describe('getLayeredCoordinates', () => {
  it('assigns the same z-index to coordinates on the same y row', () => {
    const coordinates = [
      { x: 4, y: 2 },
      { x: 3, y: 1 },
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 }
    ]

    const result = getLayeredCoordinates(coordinates)

    expect(result).toEqual([
      { x: 2, y: 0, zIndex: 100 },
      { x: 1, y: 1, zIndex: 200 },
      { x: 3, y: 1, zIndex: 200 },
      { x: 2, y: 2, zIndex: 300 },
      { x: 4, y: 2, zIndex: 300 }
    ])
  })

  it('increases the z-index by 100 for every new y row', () => {
    const coordinates = [
      { x: 2, y: 6 },
      { x: 2, y: 2 },
      { x: 2, y: 4 },
      { x: 2, y: 0 }
    ]

    const result = getLayeredCoordinates(coordinates)

    expect(result).toEqual([
      { x: 2, y: 0, zIndex: 100 },
      { x: 2, y: 2, zIndex: 200 },
      { x: 2, y: 4, zIndex: 300 },
      { x: 2, y: 6, zIndex: 400 }
    ])
  })
})