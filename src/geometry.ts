import type { GridOrientation } from './orientation.js'

import type { Bounds } from './g-bounds.js'

export type { Bounds } from './g-bounds.js'

import { BoundsCalculator } from './g-bounds.js'

import {
  XDominatedHexagonGeometry
} from './g-x-dominated.js'

import {
  YDominatedHexagonGeometry
} from './g-y-dominated.js'

/**
 * Represents a two-dimensional point used for geometric calculations.
 *
 * The x and y values can for example represent a position
 * in an SVG coordinate system.
 */
export type Point = {
  x: number
  y: number
}

/**
 * Calculates geometric values for hexagons
 * in a Midgard hex grid.
 *
 * The orientation determines whether the main dimension
 * of a hexagon represents its width or height.
 */
export class HexagonGeometry {
  private readonly orientation: GridOrientation

  /**
   * Creates a new hexagon geometry calculator.
   *
   * @param orientation - The orientation of the hex grid.
   */
  constructor(orientation: GridOrientation) {
    this.orientation = orientation
  }

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
  getXDominatedHexagonPoints(
    center: Point,
    width: number
  ): Point[] {
    const geometry = new XDominatedHexagonGeometry()

    return geometry.getHexagonPoints(
      center,
      width
    )
  }

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
  getYDominatedHexagonPoints(
    center: Point,
    height: number
  ): Point[] {
    const geometry = new YDominatedHexagonGeometry()

    return geometry.getHexagonPoints(
      center,
      height
    )
  }

  /**
   * Calculates the six corner points of a hexagon
   * using this geometry's grid orientation.
   *
   * For an x-dominated grid, dimension represents the width.
   * For a y-dominated grid, dimension represents the height.
   *
   * @param center - The center point of the hexagon.
   * @param dimension - The width or height, depending on orientation.
   * @returns The six corner points of the hexagon.
   */
  getHexagonPoints(
    center: Point,
    dimension: number
  ): Point[] {
    if (this.orientation === 'x-dominated') {
      return this.getXDominatedHexagonPoints(
        center,
        dimension
      )
    }

    return this.getYDominatedHexagonPoints(
      center,
      dimension
    )
  }

  /**
   * Calculates the outer bounds of geometric points.
   *
   * @param points - The points whose bounds should be calculated.
   * @returns The minimum and maximum positions and total dimensions.
   */
  getBounds(points: Point[]): Bounds {
    const boundsCalculator = new BoundsCalculator()

    return boundsCalculator.getBounds(points)
  }
}