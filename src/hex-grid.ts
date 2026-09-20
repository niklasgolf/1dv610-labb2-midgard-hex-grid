import type { Coordinate } from './coordinate.js'
import { isValidCoordinate } from './coordinate.js'

import type { GridOrientation } from './orientation.js'

import { getNeighbours } from './neighbours.js'

import type { Point } from './geometry.js'
import { getHexagonPoints } from './geometry.js'

import type {
  CoordinateRange,
  CoordinateRangeOptions
} from './coordinate-range.js'

import {
  getCoordinateRange
} from './coordinate-range-fill.js'

import type {
  LayeredCoordinate
} from './coordinate-layer.js'

import {
  getLayeredCoordinates
} from './coordinate-layer.js'

/**
 * Describes a coordinate range when using a HexGrid instance.
 *
 * The orientation is not included because the HexGrid instance
 * already has its own orientation.
 */
export type HexGridRange = Omit<CoordinateRange, 'orientation'>

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
   * @param size - The dimension used to calculate the hexagon.
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

  /**
   * Creates all coordinates belonging to a coordinate range
   * using this grid's orientation.
   *
   * @param range - The range skeleton to create.
   * @param options - Options controlling how the range is created.
   * @returns All coordinates belonging to the range.
   */
  getCoordinateRange(
    range: HexGridRange,
    options: CoordinateRangeOptions = {}
  ): Coordinate[] {
    const coordinateRange: CoordinateRange = {
      ...range,
      orientation: this.orientation
    }

    return getCoordinateRange(
      coordinateRange,
      options
    )
  }

  /**
   * Creates a coordinate range prepared for rendering.
   *
   * The coordinates are sorted by y and then x.
   * The first y row receives z-index 100 and each
   * following row increases the z-index by 100.
   *
   * @param range - The range skeleton to create.
   * @param options - Options controlling how the range is created.
   * @returns The sorted coordinates with calculated z-index values.
   */
  getLayeredCoordinateRange(
    range: HexGridRange,
    options: CoordinateRangeOptions = {}
  ): LayeredCoordinate[] {
    const coordinates = this.getCoordinateRange(
      range,
      options
    )

    return getLayeredCoordinates(coordinates)
  }
}