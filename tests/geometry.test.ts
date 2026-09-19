import { describe, expect, it } from 'vitest'
import {
  getXDominatedHexagonPoints,
  getYDominatedHexagonPoints,
  getHexagonPoints
} from '../src/geometry.js'

describe('getXDominatedHexagonPoints', () => {
  it('returns six corner points', () => {
    const center = {
      x: 100,
      y: 100
    }

    const points = getXDominatedHexagonPoints(center, 100)

    expect(points).toHaveLength(6)
  })

  it('uses the given width as the complete hexagon width', () => {
    const center = {
      x: 100,
      y: 100
    }

    const points = getXDominatedHexagonPoints(center, 100)

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

    const points = getYDominatedHexagonPoints(center, 100)

    expect(points).toHaveLength(6)
  })

  it('uses the given height as the complete hexagon height', () => {
    const center = {
      x: 100,
      y: 100
    }

    const points = getYDominatedHexagonPoints(center, 100)

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

    const points = getHexagonPoints(
      center,
      100,
      'x-dominated'
    )

    expect(points[1]?.x).toBe(150)
    expect(points[5]?.x).toBe(50)
  })

  it('uses height for a y-dominated grid', () => {
    const center = {
      x: 100,
      y: 100
    }

    const points = getHexagonPoints(
      center,
      100,
      'y-dominated'
    )

    expect(points[0]?.y).toBe(50)
    expect(points[4]?.y).toBe(150)
  })
})