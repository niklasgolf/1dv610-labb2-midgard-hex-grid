import type { Coordinate } from './coordinate.js'
import type { GridOrientation } from './orientation.js'

import { getNeighbours } from './neighbours.js'

import type {
  CoordinateRangeOptions
} from './coordinate-range.js'

import {
  CoordinateRange
} from './coordinate-range.js'

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

/**
 * Checks whether a coordinate already exists in a list of coordinates.
 *
 * @param coordinates - The coordinates to search.
 * @param coordinate - The coordinate to look for.
 * @returns True if the coordinate already exists.
 */
function containsCoordinate(
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
 * Creates all coordinates belonging to a Midgard coordinate range.
 *
 * The basic skeleton is always included. If the range should be
 * filled around, the neighbouring coordinates surrounding every
 * skeleton coordinate are also included.
 *
 * Duplicate coordinates are only included once.
 *
 * @param range - The coordinate range to create.
 * @param options - Options controlling how the range is created.
 * @returns All coordinates belonging to the range.
 */
export function getCoordinateRange(
  range: CoordinateRange,
  options: CoordinateRangeOptions = {}
): Coordinate[] {
  const skeleton = range.getSkeleton()

  if (!range.shouldFillAround(options)) {
    return skeleton
  }

  const coordinates: Coordinate[] = [...skeleton]

  for (const skeletonCoordinate of skeleton) {
    const surroundingCoordinates = getCoordinatesAround(
      skeletonCoordinate,
      range.orientation
    )

    for (const surroundingCoordinate of surroundingCoordinates) {
      if (!containsCoordinate(coordinates, surroundingCoordinate)) {
        coordinates.push(surroundingCoordinate)
      }
    }
  }

  return coordinates
}