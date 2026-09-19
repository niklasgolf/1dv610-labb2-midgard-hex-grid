import type { Coordinate } from './coordinate.js'
import { isValidCoordinate } from './coordinate.js'
import type { GridOrientation } from './orientation.js'
import { getNeighbours } from './neighbours.js'
import type { Point } from './geometry.js'
import { getHexagonPoints } from './geometry.js'

/**
 * Represents a Midgard hex grid with a specific orientation.
 */
export class HexGrid {
  private readonly orientation: GridOrientation

  /**
   * Creates a new Midgard hex grid.
   *
   * @param orientation - The orientation of the hex grid.
   */
  constructor(orientation: GridOrientation) {
    this.orientation = orientation
  }

  /**
   * Returns the six neighbouring coordinates of a coordinate
   * using this grid's orientation.
   *
   * @param coordinate - The coordinate whose neighbours should be found.
   * @returns The six neighbouring coordinates.
   */
  getNeighbours(coordinate: Coordinate): Coordinate[] {
    return getNeighbours(coordinate, this.orientation)
  }

  /**
   * Checks whether a coordinate is valid in the Midgard hex grid system.
   *
   * @param coordinate - The coordinate to validate.
   * @returns `true` if the coordinate is valid; otherwise `false`.
   */
  isValidCoordinate(coordinate: Coordinate): boolean {
    return isValidCoordinate(coordinate)
  }

  /**
   * Calculates the six corner points of a hexagon
   * using this grid's orientation.
   *
   * @param center - The center point of the hexagon.
   * @param size - The distance from the center to each corner.
   * @returns The six corner points of the hexagon.
   */
  getHexagonPoints(
    center: Point,
    size: number
  ): Point[] {
    return getHexagonPoints(
      center,
      size,
      this.orientation
    )
  }
}