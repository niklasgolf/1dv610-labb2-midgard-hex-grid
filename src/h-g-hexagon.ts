import type { Coordinate } from './coordinate.js'

import type { GridOrientation } from './orientation.js'

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
 * The grid orientation determines how the center position
 * and hexagon geometry are calculated.
 */
export class HexGridHexagonCreator {
  private readonly orientation: GridOrientation

  /**
   * Creates a new hexagon creator.
   *
   * @param orientation - The orientation of the hex grid.
   */
  constructor(orientation: GridOrientation) {
    this.orientation = orientation
  }

  /**
   * Creates the geometry for one Midgard coordinate.
   *
   * @param coordinate - The coordinate of the hexagon.
   * @param hexDiameter - The geometric size of the hexagon.
   * @returns One complete hexagon prepared for rendering.
   */
  createHexagon(
    coordinate: Coordinate,
    hexDiameter: number
  ): CreatedHexagon {
    const positioner =
      new CoordinatePositioner(this.orientation)

    const center = positioner.getCenterPosition(
      coordinate,
      hexDiameter
    )

    const geometry =
      new HexagonGeometry(this.orientation)

    const points = geometry.getHexagonPoints(
      center,
      hexDiameter
    )

    return {
      coordinate,
      center,
      points
    }
  }
}