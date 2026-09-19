import type { Coordinate } from './coordinate.js'
import type { GridOrientation } from './orientation.js'
import { getNeighbours } from './neighbours.js'

/**
 * Describes the basic rectangular skeleton of a Midgard hex grid area.
 *
 * The top-left corner is the first coordinate in the skeleton.
 * The x width and y height describe the number of skeleton
 * coordinates in each direction.
 *
 * The orientation determines how the surrounding coordinates
 * will be generated when the skeleton is filled around.
 */
export type CoordinateRange = {
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
 * Checks whether a coordinate range has valid values.
 *
 * The top-left corner must be a true Midgard skeleton coordinate.
 * Both x and y must be even and at least 2.
 *
 * The x width and y height describe numbers of skeleton coordinates
 * and must therefore be positive integers.
 *
 * @param range - The coordinate range to validate.
 * @returns True if the coordinate range is valid.
 */
export function isValidCoordinateRange(
  range: CoordinateRange
): boolean {
  if (!Number.isInteger(range.topLeftCorner.x)) {
    return false
  }

  if (!Number.isInteger(range.topLeftCorner.y)) {
    return false
  }

  if (range.topLeftCorner.x < 2) {
    return false
  }

  if (range.topLeftCorner.y < 2) {
    return false
  }

  if (range.topLeftCorner.x % 2 !== 0) {
    return false
  }

  if (range.topLeftCorner.y % 2 !== 0) {
    return false
  }

  if (!Number.isInteger(range.xWidth)) {
    return false
  }

  if (!Number.isInteger(range.yHeight)) {
    return false
  }

  if (range.xWidth < 1) {
    return false
  }

  if (range.yHeight < 1) {
    return false
  }

  return true
}

/**
 * Creates the skeleton coordinates for a Midgard coordinate range.
 *
 * Skeleton coordinates are placed on the true rows and columns
 * of the Midgard coordinate system, using steps of two.
 *
 * @param range - The coordinate range used to create the skeleton.
 * @returns The coordinates that form the skeleton.
 */
export function getCoordinateRangeSkeleton(
  range: CoordinateRange
): Coordinate[] {
  const coordinates: Coordinate[] = []

  for (let yIndex = 0; yIndex < range.yHeight; yIndex++) {
    const y = range.topLeftCorner.y + yIndex * 2

    for (let xIndex = 0; xIndex < range.xWidth; xIndex++) {
      const x = range.topLeftCorner.x + xIndex * 2

      coordinates.push({
        x,
        y
      })
    }
  }

  return coordinates
}

/**
 * Determines whether a Midgard coordinate range should be filled
 * around its skeleton.
 *
 * A single-coordinate range can choose whether to use fillAround.
 * A range containing more than one skeleton coordinate is always
 * filled around automatically.
 *
 * @param range - The coordinate range.
 * @param options - Options for creating the coordinate range.
 * @returns True if the range should be filled around.
 */
export function shouldFillAround(
  range: CoordinateRange,
  options: CoordinateRangeOptions = {}
): boolean {
  const isSingleCoordinate =
    range.xWidth === 1 && range.yHeight === 1

  if (!isSingleCoordinate) {
    return true
  }

  if (options.fillAround === true) {
    return true
  }

  return false
}

/**
 * Returns the coordinates surrounding one skeleton coordinate.
 *
 * The surrounding coordinates depend on the orientation
 * of the Midgard hex grid.
 *
 * @param coordinate - The skeleton coordinate.
 * @param orientation - The orientation of the grid.
 * @returns The six neighbouring coordinates.
 */
export function getCoordinatesAround(
  coordinate: Coordinate,
  orientation: GridOrientation
): Coordinate[] {
  return getNeighbours(coordinate, orientation)
}