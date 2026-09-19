import type { Coordinate } from './coordinate.js'

/**
 * Returns the six neighbouring coordinates in an x-dominated hex grid.
 *
 * Horizontal neighbours are two x-units away.
 * Diagonal neighbours are one x-unit and one y-unit away.
 *
 * @param coordinate - The coordinate whose neighbours should be found.
 * @returns The six neighbouring coordinates.
 */
export function getXDominatedNeighbours(
  coordinate: Coordinate
): Coordinate[] {
  const left: Coordinate = {
    x: coordinate.x - 2,
    y: coordinate.y
  }

  const right: Coordinate = {
    x: coordinate.x + 2,
    y: coordinate.y
  }

  const upperLeft: Coordinate = {
    x: coordinate.x - 1,
    y: coordinate.y - 1
  }

  const upperRight: Coordinate = {
    x: coordinate.x + 1,
    y: coordinate.y - 1
  }

  const lowerLeft: Coordinate = {
    x: coordinate.x - 1,
    y: coordinate.y + 1
  }

  const lowerRight: Coordinate = {
    x: coordinate.x + 1,
    y: coordinate.y + 1
  }

  return [
    left,
    right,
    upperLeft,
    upperRight,
    lowerLeft,
    lowerRight
  ]
}