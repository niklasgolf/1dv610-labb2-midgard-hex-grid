import type { Coordinate } from './coordinate.js'

/**
 * Represents a Midgard coordinate with a z-index for rendering.
 *
 * The z-index is based on the coordinate's y row.
 * The row with the lowest y value starts at 100,
 * and each following row increases by 100.
 */
export type LayeredCoordinate = {
  x: number
  y: number
  zIndex: number
}

/**
 * Sorts coordinates by y first and x second.
 *
 * Coordinates with the lowest y value come first.
 * Coordinates on the same y row are ordered from
 * the lowest x value to the highest x value.
 *
 * @param coordinates - The coordinates to sort.
 * @returns A new array containing the sorted coordinates.
 */
export function sortCoordinates(
  coordinates: Coordinate[]
): Coordinate[] {
  const sortedCoordinates = [...coordinates]

  sortedCoordinates.sort((firstCoordinate, secondCoordinate) => {
    if (firstCoordinate.y !== secondCoordinate.y) {
      return firstCoordinate.y - secondCoordinate.y
    }

    return firstCoordinate.x - secondCoordinate.x
  })

  return sortedCoordinates
}

/**
 * Creates layered coordinates for rendering a Midgard hex grid.
 *
 * Coordinates are ordered by y first and x second.
 * The first y row receives z-index 100.
 * Each following y row increases the z-index by 100.
 *
 * All coordinates on the same y row receive the same z-index.
 *
 * @param coordinates - The coordinates to layer.
 * @returns Sorted coordinates with their calculated z-index.
 */
export function getLayeredCoordinates(
  coordinates: Coordinate[]
): LayeredCoordinate[] {
  const sortedCoordinates = sortCoordinates(coordinates)
  const layeredCoordinates: LayeredCoordinate[] = []

  let previousY: number | undefined
  let zIndex = 0

  for (const coordinate of sortedCoordinates) {
    if (coordinate.y !== previousY) {
      zIndex += 100
      previousY = coordinate.y
    }

    layeredCoordinates.push({
      x: coordinate.x,
      y: coordinate.y,
      zIndex
    })
  }

  return layeredCoordinates
}