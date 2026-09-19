import type { GridOrientation } from './orientation.js'

/**
 * Represents a two-dimensional point used for geometric calculations.
 *
 * The x and y values can for example represent a position
 * in an SVG coordinate system.
 */
export type Point = {
  x: number
  y: number
}

/**
 * Calculates the six corner points of an x-dominated hexagon.
 *
 * An x-dominated hexagon has a corner at the top and bottom.
 *
 * @param center - The center point of the hexagon.
 * @param size - The distance from the center to each corner.
 * @returns The six corner points of the hexagon.
 */
export function getXDominatedHexagonPoints(
  center: Point,
  size: number
): Point[] {
  const halfWidth = Math.sqrt(3) * size / 2
  const halfHeight = size / 2

  const top: Point = {
    x: center.x,
    y: center.y - size
  }

  const upperRight: Point = {
    x: center.x + halfWidth,
    y: center.y - halfHeight
  }

  const lowerRight: Point = {
    x: center.x + halfWidth,
    y: center.y + halfHeight
  }

  const bottom: Point = {
    x: center.x,
    y: center.y + size
  }

  const lowerLeft: Point = {
    x: center.x - halfWidth,
    y: center.y + halfHeight
  }

  const upperLeft: Point = {
    x: center.x - halfWidth,
    y: center.y - halfHeight
  }

  return [
    top,
    upperRight,
    lowerRight,
    bottom,
    lowerLeft,
    upperLeft
  ]
}

/**
 * Calculates the six corner points of a y-dominated hexagon.
 *
 * A y-dominated hexagon has a corner at the left and right.
 *
 * @param center - The center point of the hexagon.
 * @param size - The distance from the center to each corner.
 * @returns The six corner points of the hexagon.
 */
export function getYDominatedHexagonPoints(
  center: Point,
  size: number
): Point[] {
  const halfWidth = size / 2
  const halfHeight = Math.sqrt(3) * size / 2

  const upperLeft: Point = {
    x: center.x - halfWidth,
    y: center.y - halfHeight
  }

  const upperRight: Point = {
    x: center.x + halfWidth,
    y: center.y - halfHeight
  }

  const right: Point = {
    x: center.x + size,
    y: center.y
  }

  const lowerRight: Point = {
    x: center.x + halfWidth,
    y: center.y + halfHeight
  }

  const lowerLeft: Point = {
    x: center.x - halfWidth,
    y: center.y + halfHeight
  }

  const left: Point = {
    x: center.x - size,
    y: center.y
  }

  return [
    upperLeft,
    upperRight,
    right,
    lowerRight,
    lowerLeft,
    left
  ]
}

/**
 * Calculates the six corner points of a hexagon
 * for the selected grid orientation.
 *
 * @param center - The center point of the hexagon.
 * @param size - The distance from the center to each corner.
 * @param orientation - The orientation of the hex grid.
 * @returns The six corner points of the hexagon.
 */
export function getHexagonPoints(
  center: Point,
  size: number,
  orientation: GridOrientation
): Point[] {
  if (orientation === 'x-dominated') {
    return getXDominatedHexagonPoints(center, size)
  }

  return getYDominatedHexagonPoints(center, size)
}