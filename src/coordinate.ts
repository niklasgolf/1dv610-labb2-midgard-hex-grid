/**
 * Represents a coordinate in the Midgard hex grid system.
 *
 * A valid Midgard coordinate uses non-negative integers where x and y
 * have the same parity: both are even or both are odd.
 */
export type Coordinate = {
  x: number
  y: number
}

/**
 * Checks whether a coordinate is valid in the Midgard hex grid system.
 *
 * Both x and y must be non-negative integers.
 * A coordinate is valid when x and y have the same parity:
 * both are even or both are odd.
 *
 * For example, (10, 10), (11, 11), and (0, 2) are valid,
 * while (10, 11), (-1, -1), and (10.5, 10.5) are invalid.
 *
 * @param coordinate - The coordinate to validate.
 * @returns `true` if the coordinate is valid; otherwise `false`.
 */
export function isValidCoordinate(coordinate: Coordinate): boolean {
  if (!Number.isInteger(coordinate.x) || !Number.isInteger(coordinate.y)) {
    return false
  }

  if (coordinate.x < 0 || coordinate.y < 0) {
    return false
  }

  const xIsEven = coordinate.x % 2 === 0
  const yIsEven = coordinate.y % 2 === 0

  const xIsOdd = coordinate.x % 2 !== 0
  const yIsOdd = coordinate.y % 2 !== 0

  if (xIsEven && yIsEven) {
    return true
  }

  if (xIsOdd && yIsOdd) {
    return true
  }

  return false
}