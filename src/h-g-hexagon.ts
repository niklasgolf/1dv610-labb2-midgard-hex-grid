import type { Coordinate } from './coordinate.js'

import type { Point } from './geometry.js'

import { CoordinatePositioner } from './coordinate-positioner.js'

import { HexagonGeometry } from './geometry.js'

/**
 * Represents one complete hexagon created from
 * a Midgard coordinate.
 */
export type CreatedHexagon = {
  coordinate: Coordinate
  center: Point
  points: Point[]
}

/**
 * Creates complete hexagons from Midgard coordinates.
 *
 * The injected positioner and geometry determine how
 * the center position and hexagon points are calculated.
 */
export class HexGridHexagonCreator {
  readonly #positioner: CoordinatePositioner
  readonly #geometry: HexagonGeometry

  /**
   * Creates a new hexagon creator using existing
   * geometric helper objects.
   *
   * @param positioner - Calculates hexagon center positions.
   * @param geometry - Calculates hexagon corner points.
   */
  constructor(
    positioner: CoordinatePositioner,
    geometry: HexagonGeometry
  ) {
    this.#positioner = positioner
    this.#geometry = geometry
  }

  /**
   * Validates the geometric size of a hexagon.
   *
   * The diameter must be a positive, finite number.
   * Decimal values are allowed.
   *
   * @param hexDiameter - The geometric size to validate.
   * @throws RangeError If the diameter is not positive and finite.
   */
  static validateHexDiameter(
    hexDiameter: number
  ): void {
    if (
      !Number.isFinite(hexDiameter) ||
      hexDiameter <= 0
    ) {
      throw new RangeError(
        'Hexagon diameter must be a positive, finite number.'
      )
    }
  }

  /**
   * Creates the geometry for one Midgard coordinate.
   *
   * @param coordinate - The coordinate of the hexagon.
   * @param hexDiameter - The geometric size of the hexagon.
   * @returns One complete hexagon prepared for rendering.
   * @throws RangeError If the diameter is not positive and finite.
   */
  createHexagon(
    coordinate: Coordinate,
    hexDiameter: number
  ): CreatedHexagon {
    HexGridHexagonCreator.validateHexDiameter(hexDiameter)

    const center = this.#positioner.getCenterPosition(
      coordinate,
      hexDiameter
    )

    const points = this.#geometry.getHexagonPoints(
      center,
      hexDiameter
    )

    return {
      coordinate: {
        x: coordinate.x,
        y: coordinate.y
      },
      center,
      points
    }
  }
}