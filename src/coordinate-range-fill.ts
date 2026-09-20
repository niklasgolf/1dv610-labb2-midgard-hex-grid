import type { Coordinate } from './coordinate.js'

import { NeighbourCalculator } from './neighbours.js'

import type {
  CoordinateRangeOptions
} from './coordinate-range.js'

import {
  CoordinateRange
} from './coordinate-range.js'

/**
 * Creates the complete coordinate area belonging
 * to a Midgard coordinate range.
 *
 * The range skeleton is always included.
 * When fill-around is active, neighbouring coordinates
 * around every skeleton coordinate are also included.
 */
export class CoordinateRangeFiller {
  private readonly range: CoordinateRange

  /**
   * Creates a new coordinate range filler.
   *
   * @param range - The coordinate range to fill.
   */
  constructor(range: CoordinateRange) {
    this.range = range
  }

  /**
   * Returns the coordinates surrounding one skeleton coordinate.
   *
   * The surrounding coordinates use the orientation
   * of this coordinate range.
   *
   * @param coordinate - The skeleton coordinate.
   * @returns The six neighbouring coordinates.
   */
  getCoordinatesAround(
    coordinate: Coordinate
  ): Coordinate[] {
    const neighbourCalculator =
      new NeighbourCalculator(this.range.orientation)

    return neighbourCalculator.getNeighbours(coordinate)
  }

  /**
   * Checks whether a coordinate already exists
   * in a list of coordinates.
   *
   * @param coordinates - The coordinates to search.
   * @param coordinate - The coordinate to look for.
   * @returns True if the coordinate already exists.
   */
  containsCoordinate(
    coordinates: Coordinate[],
    coordinate: Coordinate
  ): boolean {
    for (const existingCoordinate of coordinates) {
      if (
        existingCoordinate.x === coordinate.x &&
        existingCoordinate.y === coordinate.y
      ) {
        return true
      }
    }

    return false
  }

  /**
   * Creates all coordinates belonging to this
   * Midgard coordinate range.
   *
   * The basic skeleton is always included. If the range should be
   * filled around, the neighbouring coordinates surrounding every
   * skeleton coordinate are also included.
   *
   * Duplicate coordinates are only included once.
   *
   * @param options - Options controlling how the range is created.
   * @returns All coordinates belonging to the range.
   */
  getCoordinateRange(
    options: CoordinateRangeOptions = {}
  ): Coordinate[] {
    const skeleton = this.range.getSkeleton()

    if (!this.range.shouldFillAround(options)) {
      return skeleton
    }

    const coordinates: Coordinate[] = [...skeleton]

    for (const skeletonCoordinate of skeleton) {
      const surroundingCoordinates =
        this.getCoordinatesAround(skeletonCoordinate)

      for (const surroundingCoordinate of surroundingCoordinates) {
        if (
          !this.containsCoordinate(
            coordinates,
            surroundingCoordinate
          )
        ) {
          coordinates.push(surroundingCoordinate)
        }
      }
    }

    return coordinates
  }
}