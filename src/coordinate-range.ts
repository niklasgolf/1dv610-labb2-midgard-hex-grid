import type { Coordinate } from './coordinate.js'

import type { GridOrientation } from './orientation.js'

import { CoordinateRangeSkeleton } from './c-r-skeleton.js'

import { CoordinateRangeValidator } from './c-r-validation.js'

/**
 * Describes the values needed to create a Midgard coordinate range.
 *
 * Width and height describe the number of skeleton hexagons.
 * Every Midgard coordinate range starts internally at coordinate (2, 2).
 */
export type CoordinateRangeConfig = {
  width: number
  height: number
  orientation: GridOrientation
}

/**
 * Options used when creating a Midgard coordinate range.
 *
 * fillAround is only a meaningful choice for a 1 by 1 skeleton.
 * Larger skeletons are always filled around automatically.
 */
export type CoordinateRangeOptions = {
  fillAround?: boolean
}

/**
 * Represents a rectangular skeleton of a Midgard hex grid area.
 *
 * Every skeleton starts at Midgard coordinate (2, 2).
 * The user only chooses the width and height of the skeleton.
 */
export class CoordinateRange {

  readonly width: number

  readonly height: number

  readonly orientation: GridOrientation

  /**
   * Creates a new Midgard coordinate range.
   *
   * @param config - The values describing the coordinate range.
   */
  constructor(config: CoordinateRangeConfig) {

    this.width = config.width

    this.height = config.height

    this.orientation = config.orientation

  }

  /**
   * Checks whether this coordinate range has valid dimensions.
   *
   * Width and height describe numbers of skeleton hexagons.
   * Both values must therefore be positive integers.
   *
   * @returns True if this coordinate range is valid.
   */
  isValid(): boolean {

    const validator = new CoordinateRangeValidator()

    return validator.isValid(
      this.width,
      this.height
    )

  }

  /**
   * Creates the skeleton coordinates for this range.
   *
   * The upper-left skeleton coordinate is always (2, 2).
   * Skeleton coordinates use steps of two in both directions.
   *
   * @returns The coordinates that form the skeleton.
   */
  getSkeleton(): Coordinate[] {

    const skeleton = new CoordinateRangeSkeleton()

    return skeleton.create(
      this.width,
      this.height
    )

  }

  /**
   * Determines whether this range should be filled
   * around its skeleton.
   *
   * A 1 by 1 skeleton can choose whether to use fillAround.
   * Any larger skeleton is always filled around automatically.
   *
   * @param options - Options for creating the coordinate range.
   * @returns True if this range should be filled around.
   */
  shouldFillAround(
    options: CoordinateRangeOptions = {}
  ): boolean {

    const isSingleCoordinate =
      this.width === 1 && this.height === 1

    if (!isSingleCoordinate) {

      return true

    }

    if (options.fillAround === true) {

      return true

    }

    return false

  }

}