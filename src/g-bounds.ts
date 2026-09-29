import type { Point } from './geometry.js'

/**
 * Represents the outer bounds of geometric points.
 */
export type Bounds = {
  minX: number
  minY: number
  maxX: number
  maxY: number
  width: number
  height: number
}

/**
 * Calculates the outer bounds of geometric points.
 */
export class BoundsCalculator {
  /**
   * Calculates the outer bounds of geometric points.
   *
   * @param points - The points whose bounds should be calculated.
   * @returns The minimum and maximum positions and total dimensions.
   */
  getBounds(points: Point[]): Bounds {
    const firstPoint = points[0]

    if (firstPoint === undefined) {
      return {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
        width: 0,
        height: 0
      }
    }

    let minX = firstPoint.x
    let minY = firstPoint.y
    let maxX = firstPoint.x
    let maxY = firstPoint.y

    for (const point of points) {
      if (point.x < minX) {
        minX = point.x
      }

      if (point.y < minY) {
        minY = point.y
      }

      if (point.x > maxX) {
        maxX = point.x
      }

      if (point.y > maxY) {
        maxY = point.y
      }
    }

    return {
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY
    }
  }
}