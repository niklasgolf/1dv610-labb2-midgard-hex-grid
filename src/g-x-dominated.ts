import type { Point } from './geometry.js'

/**
 * Calculates geometric points for x-dominated hexagons.
 */
export class XDominatedHexagonGeometry {
  /**
   * Calculates the six corner points
   * of an x-dominated hexagon.
   *
   * The width represents the complete horizontal width
   * of the hexagon.
   *
   * @param center - The center point of the hexagon.
   * @param width - The complete width of the hexagon.
   * @returns The six corner points of the hexagon.
   */
  getHexagonPoints(
    center: Point,
    width: number
  ): Point[] {
    const halfWidth = width / 2
    const radius = width / Math.sqrt(3)
    const halfRadius = radius / 2

    const top: Point = {
      x: center.x,
      y: center.y - radius
    }

    const upperRight: Point = {
      x: center.x + halfWidth,
      y: center.y - halfRadius
    }

    const lowerRight: Point = {
      x: center.x + halfWidth,
      y: center.y + halfRadius
    }

    const bottom: Point = {
      x: center.x,
      y: center.y + radius
    }

    const lowerLeft: Point = {
      x: center.x - halfWidth,
      y: center.y + halfRadius
    }

    const upperLeft: Point = {
      x: center.x - halfWidth,
      y: center.y - halfRadius
    }

    return [
      top,
      upperRight,
      lowerRight,
      bottom,
      lowerLeft,
      upperLeft
    ]
  }
}