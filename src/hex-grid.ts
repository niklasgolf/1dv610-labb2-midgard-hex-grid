import type { Coordinate } from './coordinate.js'
import type { GridOrientation } from './orientation.js'
import { getNeighbours } from './neighbours.js'

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
}