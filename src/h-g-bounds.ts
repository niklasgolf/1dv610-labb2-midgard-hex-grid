import type { Coordinate } from './coordinate.js'

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
  private readonly positioner: CoordinatePositioner
  private readonly geometry: HexagonGeometry

  /**
   * Creates a new grid bounds calculator using existing
   * geometric helper objects.
   *
   * @param positioner - Calculates hexagon center positions.
   * @param geometry - Calculates hexagon corner points and bounds.
   */
  constructor(
    positioner: CoordinatePositioner,
    geometry: HexagonGeometry
  ) {
    this.positioner = positioner
    this.geometry = geometry
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
    const points: Point[] = []

    for (const coordinate of coordinates) {
      const center = this.positioner.getCenterPosition(
        coordinate,
        size
      )

      const hexagonPoints =
        this.geometry.getHexagonPoints(
          center,
          size
        )

      points.push(...hexagonPoints)
    }

    return this.geometry.getBounds(points)
  }
}