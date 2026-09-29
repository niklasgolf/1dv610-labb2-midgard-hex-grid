import type { Coordinate } from './coordinate.js'

import type { GridOrientation } from './orientation.js'

import type {
  Bounds,
  Point
} from './geometry.js'

import { HexagonGeometry } from './geometry.js'

import { CoordinatePositioner } from './coordinate-positioner.js'

/**
 * Calculates the outer geometric bounds
 * of hexagons in a Midgard grid.
 */
export class HexGridBoundsCalculator {
  private readonly orientation: GridOrientation

  /**
   * Creates a new grid bounds calculator.
   *
   * @param orientation - The orientation of the hex grid.
   */
  constructor(orientation: GridOrientation) {
    this.orientation = orientation
  }

  /**
   * Calculates the outer geometric bounds of hexagons
   * represented by Midgard coordinates.
   *
   * @param coordinates - The coordinates whose bounds should be calculated.
   * @param size - The width or height of one hexagon.
   * @returns The outer bounds of all hexagons.
   */
  getGridBounds(
    coordinates: Coordinate[],
    size: number
  ): Bounds {
    const geometry =
      new HexagonGeometry(this.orientation)

    const positioner =
      new CoordinatePositioner(this.orientation)

    const points: Point[] = []

    for (const coordinate of coordinates) {
      const center = positioner.getCenterPosition(
        coordinate,
        size
      )

      const hexagonPoints =
        geometry.getHexagonPoints(
          center,
          size
        )

      points.push(...hexagonPoints)
    }

    return geometry.getBounds(points)
  }
}