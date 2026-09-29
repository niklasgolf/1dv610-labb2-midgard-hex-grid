import type { Coordinate } from './coordinate.js'

/**
 * Creates the skeleton coordinates for a Midgard coordinate range.
 *
 * The upper-left skeleton coordinate is always (2, 2).
 * Skeleton coordinates use steps of two in both directions.
 */
export class CoordinateRangeSkeleton {
  /**
   * Creates a rectangular skeleton of coordinates.
   *
   * @param width - The number of skeleton coordinates horizontally.
   * @param height - The number of skeleton coordinates vertically.
   * @returns The coordinates that form the skeleton.
   */
  create(
    width: number,
    height: number
  ): Coordinate[] {
    const coordinates: Coordinate[] = []

    const startX = 2
    const startY = 2

    for (let yIndex = 0; yIndex < height; yIndex++) {
      const y = startY + yIndex * 2

      for (let xIndex = 0; xIndex < width; xIndex++) {
        const x = startX + xIndex * 2

        coordinates.push({
          x,
          y
        })
      }
    }

    return coordinates
  }
}