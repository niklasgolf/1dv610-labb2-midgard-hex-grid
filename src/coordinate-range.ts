import type { Coordinate } from './coordinate.js'
import type { GridOrientation } from './orientation.js'

/**
 * Describes the values needed to create a Midgard coordinate range.
 */
export type CoordinateRangeConfig = {
  topLeftCorner: Coordinate
  xWidth: number
  yHeight: number
  orientation: GridOrientation
}

/**
 * Options used when creating a Midgard coordinate range.
 *
 * fillAround is optional because it is only a meaningful choice
 * when the basic range consists of a single coordinate.
 */
export type CoordinateRangeOptions = {
  fillAround?: boolean
}

/**
 * Represents a rectangular skeleton of a Midgard hex grid area.
 *
 * The range knows its starting coordinate, size and orientation,
 * and can validate itself and create its own skeleton coordinates.
 */
export class CoordinateRange {
  readonly topLeftCorner: Coordinate
  readonly xWidth: number
  readonly yHeight: number
  readonly orientation: GridOrientation

  /**
   * Creates a new Midgard coordinate range.
   *
   * @param config - The values describing the coordinate range.
   */
  constructor(config: CoordinateRangeConfig) {
    this.topLeftCorner = config.topLeftCorner
    this.xWidth = config.xWidth
    this.yHeight = config.yHeight
    this.orientation = config.orientation
  }

  /**
   * Checks whether this coordinate range has valid values.
   *
   * The top-left corner must be a true Midgard skeleton coordinate.
   * Both x and y must be even and at least 2.
   *
   * The x width and y height describe numbers of skeleton coordinates
   * and must therefore be positive integers.
   *
   * @returns True if this coordinate range is valid.
   */
  isValid(): boolean {
    if (!Number.isInteger(this.topLeftCorner.x)) {
      return false
    }

    if (!Number.isInteger(this.topLeftCorner.y)) {
      return false
    }

    if (this.topLeftCorner.x < 2) {
      return false
    }

    if (this.topLeftCorner.y < 2) {
      return false
    }

    if (this.topLeftCorner.x % 2 !== 0) {
      return false
    }

    if (this.topLeftCorner.y % 2 !== 0) {
      return false
    }

    if (!Number.isInteger(this.xWidth)) {
      return false
    }

    if (!Number.isInteger(this.yHeight)) {
      return false
    }

    if (this.xWidth < 1) {
      return false
    }

    if (this.yHeight < 1) {
      return false
    }

    return true
  }

  /**
   * Creates the skeleton coordinates for this range.
   *
   * Skeleton coordinates are placed on the true rows and columns
   * of the Midgard coordinate system, using steps of two.
   *
   * @returns The coordinates that form the skeleton.
   */
  getSkeleton(): Coordinate[] {
    const coordinates: Coordinate[] = []

    for (let yIndex = 0; yIndex < this.yHeight; yIndex++) {
      const y = this.topLeftCorner.y + yIndex * 2

      for (let xIndex = 0; xIndex < this.xWidth; xIndex++) {
        const x = this.topLeftCorner.x + xIndex * 2

        coordinates.push({
          x,
          y
        })
      }
    }

    return coordinates
  }

  /**
   * Determines whether this range should be filled
   * around its skeleton.
   *
   * A single-coordinate range can choose whether to use fillAround.
   * A range containing more than one skeleton coordinate is always
   * filled around automatically.
   *
   * @param options - Options for creating the coordinate range.
   * @returns True if this range should be filled around.
   */
  shouldFillAround(
    options: CoordinateRangeOptions = {}
  ): boolean {
    const isSingleCoordinate =
      this.xWidth === 1 && this.yHeight === 1

    if (!isSingleCoordinate) {
      return true
    }

    if (options.fillAround === true) {
      return true
    }

    return false
  }
}