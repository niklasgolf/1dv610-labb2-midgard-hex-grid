import type { Point } from './geometry.js'

/**
 * Calculates geometric points for y-dominated hexagons.
 */
export class YDominatedHexagonGeometry {
  /**
   * Calculates the six corner points
   * of a y-dominated hexagon.
   *
   * The height represents the complete vertical height
   * of the hexagon.
   *
   * @param center - The center point of the hexagon.
   * @param height - The complete height of the hexagon.
   * @returns The six corner points of the hexagon.
   */
  getHexagonPoints(
    center: Point,
    height: number
  ): Point[] {
    const halfHeight = height / 2
    const radius = height / Math.sqrt(3)
    const halfRadius = radius / 2

    const upperLeft: Point = {
      x: center.x - halfRadius,
      y: center.y - halfHeight
    }

    const upperRight: Point = {
      x: center.x + halfRadius,
      y: center.y - halfHeight
    }

    const right: Point = {
      x: center.x + radius,
      y: center.y
    }

    const lowerRight: Point = {
      x: center.x + halfRadius,
      y: center.y + halfHeight
    }

    const lowerLeft: Point = {
      x: center.x - halfRadius,
      y: center.y + halfHeight
    }

    const left: Point = {
      x: center.x - radius,
      y: center.y
    }

    return [
      upperLeft,
      upperRight,
      right,
      lowerRight,
      lowerLeft,
      left
    ]
  }
}