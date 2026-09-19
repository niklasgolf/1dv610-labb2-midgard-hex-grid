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

    const points = getXDominatedHexagonPoints(center, 40)

    expect(points).toHaveLength(6)
  })

  it('has a top and bottom corner', () => {
    const center = {
      x: 100,
      y: 100
    }

    const points = getXDominatedHexagonPoints(center, 40)

    expect(points[0]).toEqual({
      x: 100,
      y: 60
    })

    expect(points[3]).toEqual({
      x: 100,
      y: 140
    })
  })
})

describe('getYDominatedHexagonPoints', () => {
  it('returns six corner points', () => {
    const center = {
      x: 100,
      y: 100
    }

    const points = getYDominatedHexagonPoints(center, 40)

    expect(points).toHaveLength(6)
  })

  it('has a left and right corner', () => {
    const center = {
      x: 100,
      y: 100
    }

    const points = getYDominatedHexagonPoints(center, 40)

    expect(points[2]).toEqual({
      x: 140,
      y: 100
    })

    expect(points[5]).toEqual({
      x: 60,
      y: 100
    })
  })
})

describe('getHexagonPoints', () => {
  it('uses the selected grid orientation', () => {
    const center = {
      x: 100,
      y: 100
    }

    const xPoints = getHexagonPoints(
      center,
      40,
      'x-dominated'
    )

    const yPoints = getHexagonPoints(
      center,
      40,
      'y-dominated'
    )

    expect(xPoints[0]).toEqual({
      x: 100,
      y: 60
    })

    expect(yPoints[2]).toEqual({
      x: 140,
      y: 100
    })
  })
})